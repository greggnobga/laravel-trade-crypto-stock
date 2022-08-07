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
                if ($request->input('order') === 'buy') {
                    return $this->store(['table' => 'portfolio', 'input' => $request->input('input')]);
                } else {
                    return ['status' =>  false, 'sql' => 'insert', 'message' => 'No sell order allowed, just BTFD and HODL.', 'coin' => '' ];
                }
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
            if ($request->input('order') === 'buy') {
                return $this->destroy(['table' => 'portfolio', 'input' => $request->input('input')]);
            } else {
                return ['status' =>  false, 'sql' => 'update', 'message' => 'No sell order allowed, just BTFD and HODL.', 'coin' => '' ];
            }
        }

        /** check if request contains method equal to get. */
        if ($request->method() === 'GET') {
            if ($request->input('table') === 'portfolio') {
              /** order data. */
              $stocks = DB::table('stock_portfolios')
                  ->select('id', 'created_at as date', 'order', 'ticker', 'name', 'fee', 'share', 'capital')
                  ->where('userid', '=', Auth::id())
                  ->get();

                  if ($stocks) {
                    $result['order'] = $this->helpers(['purpose' => 'format', 'source' => 'order', 'stock' => $stocks]);

                    return ['status' => true, 'sql' => 'select', 'order' => $result['order'] ];
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
            $insert = DB::table('stock_portfolios')
                ->insertGetId([
                    'userid' => Auth::id(),
                    'order' => strip_tags($data['input']['order']),
                    'ticker' => strip_tags($data['input']['ticker']),
                    'name' => strip_tags($data['input']['name']),
                    'fee' => strip_tags($data['input']['fee']),
                    'share' => strip_tags($data['input']['share']),
                    'capital' => strip_tags($data['input']['capital']),
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                ]);
            if ($insert) {
                $stock = DB::table('stock_portfolios')
                    ->select('id', 'created_at as date', 'order', 'ticker', 'name', 'fee', 'share', 'capital')
                    ->where('id', '=', $insert)
                    ->where('userid', '=', Auth::id())
                    ->get();
                $result = $this->helpers(['purpose' => 'format', 'source' => 'order', 'stock' => $stock]);
                return ['status' =>  true, 'sql' => 'select', 'message' => $stock[0]->name . ' has been added to the database.', 'stock' => $result ];
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
                    'order' => strip_tags($data['input']['order']),
                    'ticker' => strip_tags($data['input']['ticker']),
                    'name' => strip_tags($data['input']['name']),
                    'fee' => strip_tags($data['input']['fee']),
                    'share' => strip_tags($data['input']['share']),
                    'capital' => strip_tags($data['input']['capital']),
                    'updated_at' => date('Y-m-d H:i:s'),
                ]);
            /** if update not empty.*/
            if ($update) {
                $stocks = DB::table('stock_portfolios')
                    ->select('id', 'order', 'ticker', 'name', 'fee', 'share', 'capital')
                    ->where('id', '=', $data['input']['id'])
                    ->where('userid', '=', Auth::id())
                    ->get();
                $result = $this->helpers(['purpose' => 'format', 'source' => 'order', 'stock' => $stocks]);
                return ['status' =>  true, 'sql' => 'update', 'message' => $data['input']['name'] . ' successfully updated.', 'stock' => $result];
            } else {
                return ['status' =>  false, 'sql' => 'update', 'message' => 'No changes made.', 'stock' => '' ];
            }
        }
          /** return something.*/
        return ['status' =>  true, 'sql' => 'update', 'message' => 'Stock update response', 'stock' => []];
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
                return ['status' =>  true, 'sql' => 'destroy', 'message' => $data['input']['name'] . ' has been deleted.', 'stock' => $data['input']['id']];
            } else {
                return ['status' =>  false, 'sql' => 'destroy', 'message' => 'No changes made.', 'stock' => '' ];
            }
        }
        /** return something. */
        return ['status' =>  true, 'sql' => 'update', 'message' => 'Stock destroy response', 'stock' => []];
    }

    private function helpers($data) {
        if ($data['purpose'] === 'format' && $data['source'] === 'order') {
            $return = [];
            foreach ($data['stock'] as $key => $value) {
                $result = collect($value);
                foreach ($value as $k => $v) {
                    if ($k === 'capital') {
                        $price = number_format($v, '2','.', ',');
                        $result->forget('capital');
                        $result->put('capital', $price);
                        $result->put('action', 'Update Destroy');
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

        if ($data['purpose'] === 'compute' && $data['source'] === 'hold') {
            /** repository */
            $result = [];
            foreach ($data['stock'] as $key => $value) {
                foreach ($value as $item) {
                    /** query record. */
                    $record[$key] = DB::table('stock_portfolios')
                        ->select('name', 'ticker')
                        ->where('order', '=', $data['condition'])
                        ->where('ticker', '=', strtolower($item))
                        ->where('userid', '=', Auth::id())
                        ->get();

                    /** reconstruct array. */
                    foreach ($record[$key] as $items) {
                        foreach($items as $k => $v) {
                            if ($k === 'name')  {
                                $result[$key]['name'] = $v;
                            }
                            if ($k === 'ticker')  {
                                $result[$key]['ticker'] = $v;
                            }
                        }
                    }

                    /** sum quantity. */
                    $quantity = DB::table('stock_portfolios')
                        ->select('share')
                        ->where('order', '=', $data['condition'])
                        ->where('ticker', '=', strtolower($item))
                        ->where('userid', '=', Auth::id())
                        ->get()
                        ->sum('share');

                    $result[$key]['share'] = number_format($quantity, '2', '.', ',');

                    /** sum capital. */
                    $capital = DB::table('stock_portfolios')
                        ->select('capital')
                        ->where('order', '=', $data['condition'])
                        ->where('ticker', '=', strtolower($item))
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
