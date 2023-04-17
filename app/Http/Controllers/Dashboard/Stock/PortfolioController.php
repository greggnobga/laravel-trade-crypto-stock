<?php

namespace App\Http\Controllers\Dashboard\Stock;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class PortfolioController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function init(Request $request) {
        // /** check if request contains method equal to post. */
        if ($request->method() === 'POST') {
            /** forward insert command. */
            if ($request->input('table') === 'portfolio' && $request->input('statement') === 'insert') {
                if (strtolower($request->input('input.order')) === 'buy') {
                    return $this->store(['table' => 'portfolio', 'input' => $request->input('input')]);
                } else {
                    return response(['message' => 'No sell order allowed, just BTFD and HODL.'], 200);
                }
            }
            /** forward update command. */
            if ($request->input('table') === 'portfolio' && $request->input('statement') === 'update') {
                if (strtolower($request->input('input.order')) === 'buy') {
                    return $this->update(['table' => 'portfolio', 'input' => $request->input('input')]);
                } else {
                    return response(['message' => 'No sell order allowed, just BTFD and HODL.'], 200);
                }
            }
            /** forward destroy command. */
            if ($request->input('table') === 'portfolio' && $request->input('statement') === 'destroy') {
                if (strtolower($request->input('input.order')) === 'buy') {
                    return $this->destroy(['table' => 'portfolio', 'input' => $request->input('input')]);
                } else {
                    return response(['message' => 'No sell order allowed, just BTFD and HODL.'], 200);
                }
            }
        }

        /** check if request contains method equal to get. */
        if ($request->method() === 'GET') {
            if ($request->input('table') === 'portfolio') {
                return $this->fetch(['table' => 'portfolio']);
            } else {
                return ['message' => 'Unable to determine the request.'];
            }
        }
    }
    /** Fetch portfolio. */
    public function fetch() {
        /** repository. */
        $result = [];
        $order = [];
        $hold = [];

        /** check record. */
        $check = DB::table('stock_portfolios')
            ->select('symbol')
            ->where('userid', '=', Auth::id())
            ->get();

        if ($check->isNotEmpty()) {
            /** order data. */
            $stocks = DB::table('stock_portfolios')
                ->select('id', 'created_at as date', 'order', 'symbol', 'name', 'fee', 'share', 'capital')
                ->where('userid', '=', Auth::id())
                ->get();

            if ($stocks->isNotEmpty()) {
                $result['order'] = $this->helpers(['purpose' => 'format', 'source' => 'order', 'stock' => $stocks]);
            }

            /** hold data. */
            $symbol = DB::table('stock_portfolios')
                ->select('symbol')
                ->where('userid', '=', Auth::id())
                ->get()
                ->unique();

            if ($symbol->isNotEmpty()) {
                foreach ($symbol as $key => $value) {
                    /** build buy data. */
                    $buy = DB::table('stock_portfolios')
                        ->select('name', 'symbol', 'fee', 'share', 'capital')
                        ->where('order', '=', 'buy')
                        ->where('userid', '=', Auth::id())
                        ->get();

                    $hold['buy'][$key]['symbol'] = $value->symbol;
                    $hold['buy'][$key]['share'] = number_format($buy->where('symbol', $value->symbol)->sum('share'), '2', '.', ',');
                    $hold['buy'][$key]['fee'] = number_format($buy->where('symbol', $value->symbol)->sum('fee'), '2', '.', ',');
                    $hold['buy'][$key]['capital'] = number_format($buy->where('symbol', $value->symbol)->sum('capital'), '2', '.', ',');

                    /** build sell data. */
                    $sell = DB::table('stock_portfolios')
                        ->select('name', 'symbol', 'fee', 'share', 'capital')
                        ->where('order', '=', 'sell')
                        ->where('userid', '=', Auth::id())
                        ->get();

                    $hold['sell'][$key]['symbol'] = $value->symbol;
                    $hold['sell'][$key]['share'] = number_format($sell->where('symbol', $value->symbol)->sum('share'), '2', '.', ',');
                    $hold['sell'][$key]['fee'] = number_format($sell->where('symbol', $value->symbol)->sum('fee'), '2', '.', ',');
                    $hold['sell'][$key]['capital'] = number_format($sell->where('symbol', $value->symbol)->sum('capital'), '2', '.', ',');

                    /** build total data. */
                    $hold['total'][$key]['symbol'] = $value->symbol;
                    $hold['total'][$key]['share'] =  number_format($buy->where('symbol', $value->symbol)->sum('share') - $sell->where('symbol', $value->symbol)->sum('share'), '2', '.', ',');
                    $hold['total'][$key]['fee'] = number_format($buy->where('symbol', $value->symbol)->sum('fee') - $sell->where('symbol', $value->symbol)->sum('fee'), '2', '.', ',');
                    $hold['total'][$key]['capital'] = number_format($buy->where('symbol', $value->symbol)->sum('capital') - $sell->where('symbol', $value->symbol)->sum('capital'), '2', '.', ',');
                    $hold['total'][$key]['average'] = number_format($buy->where('symbol', $value->symbol)->sum('capital') / $buy->where('symbol', $value->symbol)->sum('share'), '2', '.', ',');

                    /** add last trded price. */
                    $price = DB::table('stock_trades')->where('symbol', $value->symbol)->select('price')->first();
                    $hold['total'][$key]['price'] = number_format($price->price, '2', '.', ',');

                    /** add prospective direction. */
                    $hold['total'][$key]['prospect'] = number_format($hold['total'][$key]['price'] - $hold['total'][$key]['average'], '2', '.', ',');
                }

                /** resequence array keys*/
                $result['hold']['buy'] = array_values($hold['buy']);
                $result['hold']['sell'] = array_values($hold['sell']);
                $result['hold']['total'] = array_values($hold['total']);
            }
            /** return if record found. */
            return ['message' => 'Please wait while we process your request.', 'order' => $result['order'], 'hold' => $result['hold']];
        } else {
            /** return if no record. */
            return ['message' => 'No record found so far.'];
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($data) {
        if ($data['table'] === 'portfolio') {
            /** insert with appropriate data. */
            $insert = DB::table('stock_portfolios')
                ->insertGetId([
                    'userid' => Auth::id(),
                    'order' => strip_tags(strtolower($data['input']['order'])),
                    'symbol' => strip_tags($data['input']['symbol']),
                    'name' => strip_tags($data['input']['name']),
                    'fee' => strip_tags($data['input']['fee']),
                    'share' => strip_tags($data['input']['share']),
                    'capital' => strip_tags($data['input']['capital']),
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                ]);
            if ($insert) {
                $stock = DB::table('stock_portfolios')
                    ->select('id', 'created_at as date', 'order', 'symbol', 'name', 'fee', 'share', 'capital')
                    ->where('id', '=', $insert)
                    ->where('userid', '=', Auth::id())
                    ->get();
                $result = $this->helpers(['purpose' => 'format', 'source' => 'order', 'stock' => $stock]);
                return response(['message' => $stock[0]->name . ' has been added to the database.', 'stock' => $result], 200);
            }
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($data) {
        if ($data['table'] === 'portfolio') {
            /** run update query.*/
            $update = DB::table('stock_portfolios')
                ->where('id', $data['input']['id'])
                ->where('userid', Auth::id())
                ->update([
                    'order' => strip_tags(strtolower($data['input']['order'])),
                    'symbol' => strip_tags($data['input']['symbol']),
                    'name' => strip_tags($data['input']['name']),
                    'fee' => strip_tags($data['input']['fee']),
                    'share' => strip_tags($data['input']['share']),
                    'capital' => strip_tags($data['input']['capital']),
                    'updated_at' => date('Y-m-d H:i:s'),
                ]);
            /** if update not empty.*/
            if ($update) {
                $stocks = DB::table('stock_portfolios')
                    ->select('id', 'order', 'symbol', 'name', 'fee', 'share', 'capital')
                    ->where('id', '=', $data['input']['id'])
                    ->where('userid', '=', Auth::id())
                    ->get();
                $result = $this->helpers(['purpose' => 'format', 'source' => 'order', 'stock' => $stocks]);
                return response(['message' => $data['input']['name'] . ' successfully updated.', 'stock' => $result], 200);
            } else {
                return response(['message' => $data['input']['name'] . ' no changes made.'], 200);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($data) {
        if ($data['table'] === 'portfolio') {
            $delete = DB::table('stock_portfolios')
                ->where('id', '=', $data['input']['id'])
                ->where('userid', '=', Auth::id())
                ->delete();
            if ($delete) {
                return response(['message' => $data['input']['name'] . ' has been deleted.', 'stock' => $data['input']['id']]);
            } else {
                return response(['message' => 'No changes made.']);
            }
        }
    }

    /**
     * Helper function,.
     */
    private function helpers($data) {
        if ($data['purpose'] === 'format' && $data['source'] === 'order') {
            $return = [];
            foreach ($data['stock'] as $key => $value) {
                $result = collect($value);
                foreach ($value as $k => $v) {
                    if ($k === 'order') {
                        $order = ucfirst($v);
                        $result->forget('order');
                        $result->put('order', $order);
                    }
                    if ($k === 'capital') {
                        $price = number_format($v, '2', '.', ',');
                        $result->forget('capital');
                        $result->put('capital', $price);
                    }
                    if ($k === 'share') {
                        $share = number_format($v, '2', '.', ',');
                        $result->forget('share');
                        $result->put('share', $share);
                    }
                    if ($k === 'fee') {
                        $fee = number_format($v, '2', '.', ',');
                        $result->forget('fee');
                        $result->put('fee', $fee);
                    }
                }
                $return[$key] = $result;
            }
            return $return;
        }
    }
}
