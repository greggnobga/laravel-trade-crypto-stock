<?php

namespace App\Http\Controllers\Dashboard\Stock;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class PortfolioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function init(Request $request)
    {
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

            /** forward update function. */
            if ($request->input('section') === 'update') {
                if (strtolower($request->input('order')) === 'buy') {
                    return $this->update($request->all());
                } else {
                    return response(['message' => 'No sell order allowed, just BTFD and HODL.'], 200);
                }
            }

            /** forward destroy function. */
            if ($request->input('section') === 'destroy') {
                return $this->destroy($request->all());
            }
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
    public function fetch($data)
    {
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
                /** Item per page. */
                $itemPerPage = 15;

                /** Get total number of records. */
                $totalRecords = DB::table('stock_portfolios')
                    ->select('symbol')
                    ->where('userid', '=', Auth::id())
                    ->count();

                /** Calculate the number of pages */
                $numberOfPages = ceil($totalRecords / $itemPerPage);

                /** Check if given pages is greater than number of pages. If true then set the page to number of pages. */
                if ($data['page'] > $numberOfPages) {
                    $data['page'] = $numberOfPages;
                }

                /** order data. */
                $stocks = DB::table('stock_portfolios')
                    ->select('created_at as date', 'order', 'symbol', 'fee', 'share', 'capital')
                    ->where('userid', '=', Auth::id())
                    ->paginate($itemPerPage, '*', 'page', $data['page'])
                    ->toArray();

                if (!is_null($stocks['data'])) {
                    /** Format order array. */
                    $result['order'] = $this->helpers(['purpose' => 'format', 'source' => 'order', 'stock' => $stocks['data']]);
                }

                /** hold data. */
                $hold = [];
                $distinct = DB::table('stock_portfolios')
                    ->select('symbol')
                    ->where('userid', '=', Auth::id())
                    ->distinct(['stock_portfolios.symbol'])
                    ->paginate($itemPerPage, '*', 'page', $data['page'])
                    ->toArray();

                /** if not empty. */
                if (!is_null($distinct['data'])) {
                    foreach ($distinct['data'] as $key => $value) {
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

                    /** resequence array keys. */
                    $result['hold'] = array_values($hold['total']);
                }
                /** return if record found. */
                return response(['message' => 'Please wait while we process your request.', 'order' => $result['order'], 'hold' => $result['hold'], 'pages' => $numberOfPages, 'show_message' => true], 200);
            } else {
                /** return if no record. */
                return response(['message' => 'No record found so far.', 'order' => [], 'hold' => [], 'show_message' => true], 200);
            }
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($data)
    {
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
    public function update($data)
    {
        if ($data['section'] === 'update') {
            /** run update query.*/
            $update = DB::table('stock_portfolios')
                ->where('symbol', $data['symbol'])
                ->where('userid', Auth::id())
                ->update([
                    'order' => strip_tags(strtolower($data['order'])),
                    'symbol' => strip_tags($data['symbol']),
                    'fee' => strip_tags($data['fee']),
                    'share' => strip_tags($data['share']),
                    'capital' => strip_tags($data['capital']),
                    'updated_at' => date('Y-m-d H:i:s'),
                ]);

            /** if update not empty.*/
            if ($update) {
                /** return something.*/
                return ['message' => 'The ' . $data['symbol'] . ' information was successfully updated.'];
            } else {
                /** return something.*/
                return ['message' => 'No modifications were made to the' . $data['symbol'] . ' data.'];
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($data)
    {
        if ($data['section'] === 'destroy') {
            $delete = DB::table('stock_portfolios')
                ->where('symbol', '=', $data['symbol'])
                ->where('userid', '=', Auth::id())
                ->delete();
            if ($delete) {
                return response(['message' => $data['symbol'] . ' has been deleted.']);
            } else {
                /** return something.*/
                return ['message' => 'No modifications were made to the' . $data['symbol'] . ' data.'];
            }
        }
    }

    /**
     * Helper function,.
     */
    private function helpers($data)
    {
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
                    if ($k === 'share') {
                        $share = number_format($v, '2', '.', ',');
                        $result->forget('share');
                        $result->put('share', $share);
                    }
                    if ($k === 'capital') {
                        $price = number_format($v, '2', '.', ',');
                        $result->forget('capital');
                        $result->put('capital', $price);
                    }
                    if ($k === 'fee') {
                        $fee = number_format($v, '2', '.', ',');
                        $result->forget('fee');
                        $result->put('fee', $fee);
                    }
                }
                $return[$key] = $result;
            }

            /** Return something. */
            return $return;
        }
    }
}
