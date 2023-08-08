<?php

namespace App\Http\Controllers\Dashboard\Stock;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class PortfolioController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function init(Request $request) {
        /** check if request method equal to post. */
        if ($request->method() === 'POST') {
            /** forward store function. */
            if ($request->input('section') === 'store') {
                if (strtolower($request->input('order')) === 'buy') {
                    return $this->store($request->all());
                } else {
                    return response(['message' => 'No sell order allowed, just BTFD and HODL.'], 200);
                }
            }

            // /** forward update command. */
            // if ($request->input('table') === 'portfolio' && $request->input('section') === 'update') {
            //     if (strtolower($request->input('input.order')) === 'buy') {
            //         return $this->update(['table' => 'portfolio', 'input' => $request->input('input')]);
            //     } else {
            //         return response(['message' => 'No sell order allowed, just BTFD and HODL.'], 200);
            //     }
            // }
            // /** forward destroy command. */
            // if ($request->input('table') === 'portfolio' && $request->input('section') === 'destroy') {
            //     return $this->destroy(['table' => 'portfolio', 'input' => $request->input('input')]);
            // }
        }

        /** check if request method equal to get. */
        if ($request->method() === 'GET') {
            /** forward fetch function. */
            if ($request->input('section') === 'fetch') {
                return $this->fetch($request->all());
            }
        }
    }

    /** Fetch portfolio. */
    public function fetch($data) {
        /** check if section match. */
        if ($data['section'] === 'fetch') {
            /** repository. */
            $result = [];

            /** check record. */
            $check = DB::table('stock_portfolios')
                ->select('symbol')
                ->where('userid', '=', Auth::id())
                ->first();

            if (!is_null($check)) {
                /** fetch stocks. */
                $chart['stocks']['object'] = DB::table('stock_portfolios')->select('symbol', 'capital')->get();
                foreach ($chart['stocks']['object'] as $key => $value) {
                    $chart['stocks']['array'][$key]['symbol'] = $value->symbol;
                    $chart['stocks']['array'][$key]['capital'] = $value->capital;
                }

                /** append to result. */
                $result['chart']['stocks'] = $chart['stocks']['array'];

                /** plot month and year. */
                $chart['plot'] = array();
                for ($i = 11; $i >= 0; $i--) {
                    $month = Carbon::today()->startOfMonth()->subMonth($i);
                    $year = Carbon::today()->startOfMonth()->subMonth($i)->format('Y');
                    array_push($chart['plot'], array(
                        'id' => $month->format('m'),
                        'month' => $month->shortMonthName,
                        'year' => $year
                    ));
                }

                /** get data by month and year. */
                $chart['data'] = array();
                foreach ($chart['plot'] as $key => $value) {
                    $chart['data'][$value['month']] = DB::table('stock_portfolios')
                        ->select('capital')
                        ->whereYear('created_at', $value['year'])
                        ->whereMonth('created_at', $value['id'])
                        ->orderBy('created_at')
                        ->get();
                }

                /** format chart data. */
                $chart['capital'] = array();
                foreach ($chart['data'] as $key => $value) {
                    if ($value->isEmpty()) {
                        $chart['capital'][$key]['month'] = $key;
                        $chart['capital'][$key]['capital'] = number_format(0.00, 2, '.', '');
                    }
                    if ($value->isNotEmpty()) {
                        $chart['capital'][$key]['month'] = $key;
                        $chart['capital'][$key]['capital'] = number_format($value->sum('capital'), 2, '.', '');
                    }
                }

                /** resequence array keys*/
                $result['chart']['capital'] = array_values($chart['capital']);

                /** get asset summary. */
                $chart['sum']['capital'] = DB::table('stock_portfolios')->select('capital')->get()->sum('capital');
                $chart['sum']['fee'] = DB::table('stock_portfolios')->select('fee')->get()->sum('fee');
                $chart['sum']['share'] = DB::table('stock_portfolios')->select('share')->get()->sum('share');

                /** format chart data. */
                $chart['total'] = array();
                foreach ($chart['sum'] as $key => $value) {
                    if ($value >= 0) {
                        $chart['total'][$key]['label'] = ucfirst($key);
                        $chart['total'][$key]['amount'] = number_format($value, 2, '.', '');
                    }
                }

                /** append to result. */
                $result['chart']['total'] = array_values($chart['total']);

                /** order data. */
                $stocks = DB::table('stock_portfolios')
                    ->select('id', 'created_at as date', 'order', 'symbol', 'fee', 'share', 'capital')
                    ->where('userid', '=', Auth::id())
                    ->get();

                if ($stocks->isNotEmpty()) {
                    $result['order'] = $this->helpers(['purpose' => 'format', 'source' => 'order', 'stock' => $stocks]);
                }

                /** hold data. */
                $hold = array();
                $symbol = DB::table('stock_portfolios')
                    ->select('symbol')
                    ->where('userid', '=', Auth::id())
                    ->get()
                    ->unique();

                /** if not empty. */
                if ($symbol->isNotEmpty()) {
                    foreach ($symbol as $key => $value) {
                        /** build buy data. */
                        $buy = DB::table('stock_portfolios')
                            ->select('symbol', 'fee', 'share', 'capital')
                            ->where('order', '=', 'buy')
                            ->where('userid', '=', Auth::id())
                            ->get();

                        $hold['buy'][$key]['symbol'] = $value->symbol;
                        $hold['buy'][$key]['share'] = number_format($buy->where('symbol', $value->symbol)->sum('share'), '2', '.', ',');
                        $hold['buy'][$key]['fee'] = number_format($buy->where('symbol', $value->symbol)->sum('fee'), '2', '.', ',');
                        $hold['buy'][$key]['capital'] = number_format($buy->where('symbol', $value->symbol)->sum('capital'), '2', '.', ',');

                        /** build sell data. */
                        $sell = DB::table('stock_portfolios')
                            ->select('symbol', 'fee', 'share', 'capital')
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

                        /** fetch price. */
                        $price = DB::table('stock_trades')->where('symbol', $value->symbol)->select('price')->first();
                        if (!is_null($price)) {
                            /** add price to array with proper decimal points. */
                            $hold['total'][$key]['price'] = number_format($price->price, '2', '.', ',');
                            /** add prospective direction. */
                            $hold['total'][$key]['prospect'] = number_format($hold['total'][$key]['price'] - $hold['total'][$key]['average'], '2', '.', ',');
                        }
                    }

                    /** resequence array keys*/
                    $result['hold']['buy'] = array_values($hold['buy']);
                    $result['hold']['sell'] = array_values($hold['sell']);
                    $result['hold']['total'] = array_values($hold['total']);
                }
                /** return if record found. */
                return response(['message' => 'Please wait while we process your request.', 'order' => $result['order'], 'hold' => $result['hold'], 'chart' => $result['chart']], 200);
            } else {
                /** return if no record. */
                return response(['message' => 'No record found so far.'], 200);
            }
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($data) {
        if ($data['section'] === 'store') {
            /** insert with appropriate data. */
            $insert = DB::table('stock_portfolios')
                ->insert([
                    'userid' => Auth::id(),
                    'order' => strip_tags(strtolower($data['order'])),
                    'symbol' => strip_tags($data['symbol']),
                    'share' => strip_tags($data['share']),
                    'capital' => strip_tags($data['capital']),
                    'fee' => strip_tags($data['fee']),
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                ]);
            /** if successfull return response. */
            if ($insert) {
                return response(['message' => $data['symbol'] . ' has been added to the database.'], 200);
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
                    'fee' => strip_tags($data['input']['fee']),
                    'share' => strip_tags($data['input']['share']),
                    'capital' => strip_tags($data['input']['capital']),
                    'updated_at' => date('Y-m-d H:i:s'),
                ]);
            /** if update not empty.*/
            if ($update) {
                $stocks = DB::table('stock_portfolios')
                    ->select('id', 'order', 'symbol', 'fee', 'share', 'capital')
                    ->where('id', '=', $data['input']['id'])
                    ->where('userid', '=', Auth::id())
                    ->get();
                $result = $this->helpers(['purpose' => 'format', 'source' => 'order', 'stock' => $stocks]);
                return response(['message' => $data['input']['symbol'] . ' successfully updated.', 'stock' => $result], 200);
            } else {
                return response(['message' => $data['input']['symbol'] . ' no changes made.'], 200);
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
                return response(['message' => $data['input']['symbol'] . ' has been deleted.']);
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
                    if ($k === 'date') {
                        $date = ucfirst($v);
                        $format = Carbon::parse($date)->format('m-d-Y');
                        $result->forget('date');
                        $result->put('date', $format);
                    }
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
