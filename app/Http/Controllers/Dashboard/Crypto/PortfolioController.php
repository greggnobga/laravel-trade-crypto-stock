<?php
namespace App\Http\Controllers\Dashboard\Crypto;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class PortfolioController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function init(Request $request) {
        /** check if request contains method equal to post. */
        if ($request->method() === 'POST') {
            /** forward insert command. */
            if ($request->input('table') === 'portfolio' && $request->input('statement') === 'insert') {
                if ($request->input('order') === 'buy') {
                    return $this->store(['table' => 'portfolio', 'input' => $request->input('input')]);
                } else {
                    return ['status' =>  false, 'sql' => 'insert', 'message' => 'No sell order allowed, just BTFD and HODL.', 'coin' => '' ];
                }
            }

            /** forward update command. */
            if ($request->input('table') === 'portfolio' && $request->input('statement') === 'update') {
                if ($request->input('order') === 'buy') {
                    return $this->update(['table' => 'portfolio', 'input' => $request->input('input')]);
                } else {
                    return ['status' =>  false, 'sql' => 'update', 'message' => 'No sell order allowed, just BTFD and HODL.', 'coin' => '' ];
                }
            }

            /** forward destroy command. */
            if ($request->input('table') === 'portfolio' && $request->input('statement') === 'destroy') {
                return $this->destroy(['table' => 'portfolio', 'input' => $request->input('input')]);
            }
        }
        /** check if request contains method equal to get. */
        if ($request->method() === 'GET') {
            if ($request->input('table') === 'portfolio') {
                /** repository. */
                $result = [];
                $order = [];
                $hold = [];
                $fund = [];

                /** check record. */
                $check = DB::table('crypto_portfolios')
                    ->select('coin')
                    ->where('userid', '=', Auth::id())
                    ->get();

                  if ($check->isNotEmpty()) {
                    /** order data. */
                    $orders = DB::table('crypto_portfolios')
                        ->select('id', 'created_at as date', 'order', 'wallet', 'name', 'coin', 'quantity', 'capital')
                        ->where('userid', '=', Auth::id())
                        ->get();

                    if ($orders->isNotEmpty()) {
                        $result['order']  = $this->helpers(['purpose' => 'format', 'source' => 'order', 'coin' => $orders]);
                    }

                    /** hold data. */
                    $holds = DB::table('crypto_portfolios')
                        ->select('coin', 'name')
                        ->where('userid', '=', Auth::id())
                        ->get()
                        ->unique();

                    if ($holds->isNotEmpty()) {
                        foreach ($holds as $key => $value) {
                          /** build buy data. */
                            $buy = DB::table('crypto_portfolios')
                                ->select('wallet', 'name', 'coin', 'quantity', 'capital')
                                ->where('order', '=', 'buy')
                                ->where('userid', '=', Auth::id())
                                ->get();

                            $hold['buy'][$key]['name'] = $value->name;
                            $hold['buy'][$key]['order'] = 'Buy';
                            $hold['buy'][$key]['coin'] = $value->coin;
                            $hold['buy'][$key]['quantity'] = number_format($buy->where('coin', $value->coin)->sum('quantity'), '2', '.', ',');
                            $hold['buy'][$key]['capital'] = number_format($buy->where('coin', $value->coin)->sum('capital'), '2', '.', ',');

                          /** build buy data. */
                            $sell = DB::table('crypto_portfolios')
                              ->select('wallet', 'name', 'coin', 'quantity', 'capital')
                              ->where('order', '=', 'sell')
                              ->where('userid', '=', Auth::id())
                              ->get();

                            $hold['sell'][$key]['name'] = $value->name;
                            $hold['sell'][$key]['order'] = 'Sell';
                            $hold['sell'][$key]['coin'] = $value->coin;
                            $hold['sell'][$key]['quantity'] = number_format($sell->where('coin', $value->coin)->sum('quantity'), '2', '.', ',');
                            $hold['sell'][$key]['capital'] = number_format($sell->where('coin', $value->coin)->sum('capital'), '2', '.', ',');

                            /** build total data. */
                            $hold['total'][$key]['name'] = $value->name;
                            $hold['total'][$key]['ticker'] = $value->coin;
                            $hold['total'][$key]['quantity'] =  number_format($buy->where('coin', $value->coin)->sum('quantity') - $sell->where('coin', $value->coin)->sum('quantity'), '2', '.', ',');
                            $hold['total'][$key]['capital'] = number_format($buy->where('coin', $value->coin)->sum('capital') - $sell->where('coin', $value->coin)->sum('capital'), '2', '.', ',');
                        }

                        /** resequence array keys*/
                        $result['hold']['buy'] = array_values($hold['buy']);
                        $result['hold']['sell'] = array_values($hold['sell']);
                        $result['hold']['total'] = array_values($hold['total']);
                    }

                    /** fund data. */
                    $funds = DB::table('crypto_portfolios')
                        ->select('wallet')
                        ->where('userid', '=', Auth::id())
                        ->get()
                        ->unique();

                    if ($funds->isNotEmpty()) {
                        foreach ($funds as $key => $value) {
                          /** build buy data. */
                            $buy = DB::table('crypto_portfolios')
                              ->select('capital', 'wallet')
                              ->where('order', '=', 'buy')
                              ->where('userid', '=', Auth::id())
                              ->get();

                          $fund['buy'][$key]['wallet'] = $value->wallet;
                          $fund['buy'][$key]['capital'] = number_format($buy->where('wallet', $value->wallet)->sum('capital'), '2', '.', ',');

                          /** build sell data. */
                            $sell = DB::table('crypto_portfolios')
                              ->select('capital', 'wallet')
                              ->where('order', '=', 'sell')
                              ->where('userid', '=', Auth::id())
                              ->get();

                          $fund['sell'][$key]['wallet'] = $value->wallet;
                          $fund['sell'][$key]['capital'] = number_format($sell->where('wallet', $value->wallet)->sum('capital'), '2', '.', ',');

                          /** build total data. */
                          $fund['total'][$key]['wallet'] = $value->wallet;
                          $fund['total'][$key]['capital'] = number_format($buy->where('wallet', $value->wallet)->sum('capital') - $sell->where('wallet', $value->wallet)->sum('capital'), '2', '.', ',');
                        }
                        /** resequence array keys*/
                        $result['fund']['buy'] = array_values($fund['buy']);
                        $result['fund']['sell'] = array_values($fund['sell']);
                        $result['fund']['total'] = array_values($fund['total']);
                    }
                    /** return something. */
                    return ['status' => true, 'sql' => 'select', 'order' => $result['order'], 'hold' => $result['hold'], 'fund' => $result['fund']];
                  } else {
                    return ['status' => false, 'sql' => 'select', 'order' => [], 'hold' => [], 'fund' => []];
                  }
            }
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($data) {
        if ($data['table'] === 'portfolio') {
            /** insert with appropriate data. */
            $insert = DB::table('crypto_portfolios')
                ->insertGetId([
                    'userid' => Auth::id(),
                    'order' => strip_tags($data['input']['order']),
                    'wallet' => strip_tags($data['input']['wallet']),
                    'name' => strip_tags($data['input']['name']),
                    'coin' => strip_tags($data['input']['coin']),
                    'quantity' => strip_tags($data['input']['quantity']),
                    'capital' => strip_tags($data['input']['capital']),
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                ]);
            if ($insert) {
                $coins = DB::table('crypto_portfolios')
                    ->select('id', 'created_at as date', 'order', 'wallet', 'name', 'coin', 'quantity', 'capital')
                    ->where('id', '=', $insert)
                    ->where('userid', '=', Auth::id())
                    ->get();
                $result = $this->helpers(['purpose' => 'format', 'source' => 'order', 'coin' => $coins]);
                return ['status' =>  true, 'sql' => 'select', 'message' => $coins[0]->name . ' has been added to the database.', 'coin' => $result ];
            } else {
                return ['status' =>  false, 'sql' => 'select', 'message' => 'No changes made.', 'coin' => '' ];
            }
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($data) {
        if ($data['table'] === 'portfolio') {
            /** run update query.*/
            $update = DB::table('crypto_portfolios')
                ->where('id', $data['input']['id'])
                ->where('userid', Auth::id())
                ->update([
                    'order' => strip_tags($data['input']['order']),
                    'wallet' => strip_tags($data['input']['wallet']),
                    'name' => strip_tags($data['input']['name']),
                    'coin' => strip_tags($data['input']['coin']),
                    'quantity' => strip_tags($data['input']['quantity']),
                    'capital' => strip_tags($data['input']['capital']),
                    'updated_at' => date('Y-m-d H:i:s'),
                ]);
            if ($update) {
                $coins = DB::table('crypto_portfolios')
                    ->select('id', 'order', 'wallet', 'name', 'coin', 'quantity', 'capital')
                    ->where('id', '=', $data['input']['id'])
                    ->where('userid', '=', Auth::id())
                    ->get();
                $result = $this->helpers(['purpose' => 'format', 'source' => 'order', 'coin' => $coins]);
                return ['status' =>  true, 'sql' => 'update', 'message' => $data['input']['name'] . ' successfully updated.', 'coin' => $result];
            } else {
                return ['status' =>  false, 'sql' => 'update', 'message' => 'No changes made.', 'coin' => '' ];
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($data) {
        if ($data['table'] === 'portfolio') {
            $delete = DB::table('crypto_portfolios')
                ->where('id', '=', $data['input']['id'])
                ->where('userid', '=', Auth::id())
                ->delete();
            if ($delete) {
                return ['status' =>  true, 'sql' => 'destroy', 'message' => $data['input']['name'] . ' has been deleted.', 'coin' => $data['input']['id']];
            } else {
                return ['status' =>  false, 'sql' => 'destroy', 'message' => 'No changes made.', 'coin' => '' ];
            }
        }
    }

    private function helpers($data) {
        if ($data['purpose'] === 'format' && $data['source'] === 'order') {
            $return = [];
            foreach ($data['coin'] as $key => $value) {
                $result = collect($value);
                foreach ($value as $k => $v) {
                    if ($k === 'capital') {
                        $price = number_format($v, '2','.', ',');
                        $result->forget('capital');
                        $result->put('capital', $price);
                        $result->put('action', 'Update Destroy');
                    }
                    if ($k === 'quantity') {
                        $quantity = number_format($v, '2', '.', ',');
                        $result->forget('quantity');
                        $result->put('quantity', $quantity);
                    }
                }
                $return[$key] = $result;
            }
            return $return;
        }
    }
}
