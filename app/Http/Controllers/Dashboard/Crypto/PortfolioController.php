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
            if ($request->input('table') === 'portfolio' && $request->input('statement') === 'insert') {
                return $this->store(['table' => 'portfolio', 'input' => $request->input('input')]);
            }
            if ($request->input('table') === 'portfolio' && $request->input('statement') === 'update') {
                return $this->update(['table' => 'portfolio', 'input' => $request->input('input')]);
            }
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

                /** order data. */
                $coin = DB::table('crypto_portfolios')
                    ->select('id', 'created_at as date', 'order', 'wallet', 'name', 'coin', 'quantity', 'capital')
                    ->where('userid', '=', Auth::id())
                    ->get();

                if ($coin) {
                    $order = $this->helpers(['purpose' => 'format', 'source' => 'order', 'coin' => $coin]);
                }

                /** deposit data. */
                $result['order'] = $order;

                /** create coin buy list. */
                $diamond['buy'] = DB::table('crypto_portfolios')
                    ->select('coin')
                    ->where('order', '=', 'buy')
                    ->where('userid', '=', Auth::id())
                    ->get()
                    ->unique();

                if ($diamond['buy']) {
                    $hold['buy'] = $this->helpers(['purpose' => 'compute', 'condition' => 'buy', 'source' => 'hold', 'coin' => $diamond['buy']]);
                }
                /** create coin sell list. */
                $diamond['sell'] = DB::table('crypto_portfolios')
                    ->select('coin')
                    ->where('order', '=', 'sell')
                    ->where('userid', '=', Auth::id())
                    ->get()
                    ->unique();

                if ($diamond['sell']) {
                    $hold['sell'] = $this->helpers(['purpose' => 'compute', 'condition' => 'sell', 'source' => 'hold', 'coin' => $diamond['sell']]);
                }

                /** create hold total list. */
                if ($diamond['sell'] && $diamond['buy']) {
                    $total = [];
                    foreach ($hold['buy'] as $key => $value) {
                        foreach ($hold['sell'] as $item) {
                            /** match buy and sell item. */
                            if ($value['coin'] === $item['coin']) {
                                $total[$key]['name'] = $value['name'];
                                $total[$key]['coin'] = $value['coin'];
                                $total[$key]['quantity'] = number_format(filter_var($value['quantity'], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION) - filter_var($item['quantity'], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION), 2, '.', ',');
                                $total[$key]['capital'] = number_format(filter_var($value['capital'], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION) - filter_var($item['capital'], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION), 2, '.', ',');
                            }
                        }
                        /** record unmatched item. */
                        if (!array_key_exists($key, $total)) {
                            $total[$key]['name'] = $value['name'];
                            $total[$key]['coin'] = $value['coin'];
                            $total[$key]['quantity'] = $value['quantity'];
                            $total[$key]['capital'] = $value['capital'];
                        }

                    }
                    /** remove duplicate. */
                    $hold['total'] = collect($total)->unique();
                }

                /** deposit data. */
                $result['hold'] = $hold;

                /** wallet data. */
                $wallet = DB::table('crypto_portfolios')
                    ->select('wallet')
                    ->where('userid', '=', Auth::id())
                    ->get()
                    ->unique();

                if ($wallet) {
                    foreach ($wallet as $key => $value) {
                        $buy = DB::table('crypto_portfolios')
                            ->select('capital')
                            ->where('order', '=', 'buy')
                            ->where('wallet', '=', $value->wallet)
                            ->where('userid', '=', Auth::id())
                            ->get()
                            ->sum('capital');

                        $fund['buy'][$key]['name'] = $value->wallet;
                        $fund['buy'][$key]['capital'] = number_format($buy, '2', '.', ',');

                        $sell = DB::table('crypto_portfolios')
                            ->select('capital')
                            ->where('order', '=', 'sell')
                            ->where('wallet', '=', $value->wallet)
                            ->where('userid', '=', Auth::id())
                            ->get()
                            ->sum('capital');

                        $fund['sell'][$key]['name'] = $value->wallet;
                        $fund['sell'][$key]['capital'] = number_format($sell, '2', '.', ',');

                    }
                }

                /** check if not empty. */
                $check = DB::table('crypto_portfolios')
                    ->select('coin')
                    ->where('userid', '=', Auth::id())
                    ->first();

                if ($check) {
                    /** create fund total list. */
                    if ($fund['sell'] && $fund['buy']) {
                        $balance = [];
                        foreach ($fund['buy'] as $key => $value) {
                            foreach ($fund['sell'] as $item) {
                                /** match buy and sell item. */
                                if ($value['name'] === $item['name']) {
                                    $balance[$key]['name'] = $value['name'];
                                    $balance[$key]['capital'] = number_format(filter_var($value['capital'], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION) - filter_var($item['capital'], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION), 2, '.', ',');
                                }
                            }
                            /** record unmatched item. */
                            if (!array_key_exists($key, $balance)) {
                                $balance[$key]['name'] = $value['name'];
                                $balance[$key]['capital'] = $value['capital'];
                            }

                        }
                        /** remove duplicate. */
                        $fund['total'] = collect($balance)->unique();
                    }


                }

                /** deposit data. */
                $result['fund'] = $fund;

                if($result) {
                    return ['status' => true, 'sql' => 'select', 'order' => $result['order'], 'hold' => $result['hold'], 'fund' => $result['fund']];
                } else {
                    return ['status' => false, 'sql' => 'select','order' => ' ' ];
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

        if ($data['purpose'] === 'compute' && $data['source'] === 'hold') {
            /** repository */
            $result = [];
            foreach ($data['coin'] as $key => $value) {
                foreach ($value as $item) {
                    /** query record. */
                    $record[$key] = DB::table('crypto_portfolios')
                        ->select('name', 'coin')
                        ->where('order', '=', $data['condition'])
                        ->where('coin', '=', strtolower($item))
                        ->where('userid', '=', Auth::id())
                        ->get();

                    /** reconstruct array. */
                    foreach ($record[$key] as $items) {
                        foreach($items as $k => $v) {
                            if ($k === 'name')  {
                                $result[$key]['name'] = $v;
                            }
                            if ($k === 'coin')  {
                                $result[$key]['coin'] = $v;
                            }
                        }
                    }

                    /** sum quantity. */
                    $quantity = DB::table('crypto_portfolios')
                        ->select('quantity')
                        ->where('order', '=', $data['condition'])
                        ->where('coin', '=', strtolower($item))
                        ->where('userid', '=', Auth::id())
                        ->get()
                        ->sum('quantity');

                    $result[$key]['quantity'] = number_format($quantity, '2', '.', ',');

                    /** sum capital. */
                    $capital = DB::table('crypto_portfolios')
                        ->select('capital')
                        ->where('order', '=', $data['condition'])
                        ->where('coin', '=', strtolower($item))
                        ->where('userid', '=', Auth::id())
                        ->get()
                        ->sum('capital');

                    $result[$key]['capital'] = number_format($capital, '2', '.', ',');
                }
            }
            /** return result. */
            return $result;
        }
    }
}
