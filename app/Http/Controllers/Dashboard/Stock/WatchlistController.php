<?php
namespace App\Http\Controllers\Dashboard\Stock;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class WatchlistController extends Controller
{
      /**
   * Display a listing of the resource.
   */
    public function init(Request $request) {
        /** check if request contains method equal to post. */
        if ($request->method() === 'POST') {
            /** forward insert command. */
            if ($request->input('table') === 'watchlist' && $request->input('statement') === 'insert') {
                return $this->store(['table' => 'watchlist', 'input' => $request->input('input')]);
            }
            /** forward destroy command. */
            if ($request->input('table') === 'watchlist' && $request->input('statement') === 'destroy') {
                return $this->destroy(['table' => 'watchlist', 'input' => $request->input('input')]);
            }
        }
        /** check if request contains method equal to get. */
        if ($request->method() === 'GET') {
            /** repository. */
              $result = [];
            /** forward insert command. */
            if ($request->input('table') === 'watchlist' && $request->input('statement') === 'select') {
                $watchlists = DB::table('stock_watchlists')
                    ->select('id', 'created_at as date', 'symbol', 'edge', 'totalliabilities', 'stockholdersequity', 'lasttradedprice', 'earningspershare', 'netincomebeforetax', 'grossrevenue')
                    ->where('userid', '=', Auth::id())
                    ->get();

                if ($watchlists->isNotEmpty()) {
                    foreach($watchlists as $key => $value) {
                        $result[$key]['id'] = $value->id;
                        $result[$key]['date'] = $value->date;
                        $result[$key]['symbol'] = $value->symbol;
                        $result[$key]['edge'] = $value->edge;
                        $result[$key]['lasttradedprice'] = $value->lasttradedprice;
                        /** evalaute value is greater than zero. */
                        if ($value->totalliabilities > 0 && $value->stockholdersequity > 0) {
                            $result[$key]['debtequityratio'] = bcdiv($value->totalliabilities, $value->stockholdersequity, 2);
                        }
                        if ($value->lasttradedprice > 0 && $value->earningspershare > 0) {
                            $result[$key]['priceearningratio'] = bcdiv($value->lasttradedprice, $value->earningspershare, 2);
                        }
                        if ($value->netincomebeforetax > 0 && $value->grossrevenue > 0) {
                            $result[$key]['netprofitmargin'] = bcmul(bcdiv($value->netincomebeforetax, $value->grossrevenue, 2), 100, 2);
                        }
                        if ($value->grossrevenue > 0 && $value->stockholdersequity > 0) {
                            $result[$key]['returnonequity'] = bcdiv($value->grossrevenue, bcdiv($value->stockholdersequity, 2, 2), 2); 
                        }
                        /** evalaute value is equal to zero. */
                        if ($value->totalliabilities <= 0 || $value->stockholdersequity <= 0) {
                            $result[$key]['debtequityratio'] = 0.00;
                        }
                        if ($value->lasttradedprice <= 0 || $value->earningspershare <= 0) {
                            $result[$key]['priceearningratio'] = 0.00;
                        }
                        if ($value->netincomebeforetax <= 0 || $value->grossrevenue <= 0) {
                            $result[$key]['netprofitmargin'] = 0.00;
                        }
                        if ($value->grossrevenue <= 0 || $value->stockholdersequity <= 0) {
                            $result[$key]['returnonequity'] = 0.00;
                        } 
                    }
                }
                /** sort data order by debt equity ratio. */
                collect($result)->sortByDesc('debtequityratio');
                /** resequence array keys. */
                $result = array_values($result);
                /** add button array keys. */
                $watchlist = $this->helpers(['purpose' => 'format', 'source' => 'watchlists', 'stocks' => $result]);
                /** return something. */
                return ['status' => true, 'sql' => 'select', 'message' => 'Watchlist ready to be served.', 'watchlist' => $watchlist];
            }
            /** forward destroy command. */
            if ($request->input('table') === 'watchlist' && $request->input('statement') === 'build') {
                $trades = DB::table('stock_trades')
                    ->select('edge', 'symbol')
                    ->where('incomeaftertax', '>', '0')
                    ->where('edge', '>', 0)
                    ->orderBy('incomeaftertax')
                    ->get();

                if ($trades->isNotEmpty()) {
                    /** resequence array keys. */
                    $stocks = $trades->toArray();
                    /** return something. */
                    return ['status' => true, 'message' => 'this is test response.', 'stocks' => $stocks];
                } 
                /** return something. */
                return ['status' => false, 'message' => 'No record found, go to trade page and run fetch data.', 'stocks' => ''];
            }
            
      }
    }

      /**
     * Store a newly created resource in storage.
     */
    public function store($data) {
        if ($data['table'] === 'watchlist') {
            $check = DB::table('stock_watchlists')
            ->select('symbol')
            ->where('userid', '=', Auth::id())
            ->where('symbol', '=', $data['input']['symbol'])
            ->get();

            if ($check->isEmpty()) {
                /** insert with appropriate data. */
                $insert = DB::table('stock_watchlists')
                ->insertGetId([
                    'userid' => Auth::id(),
                    'symbol' => strip_tags($data['input']['symbol']),
                    'edge' => strip_tags($data['input']['edge']),
                    'totalliabilities' => strip_tags($data['input']['liabilities']),
                    'stockholdersequity' => strip_tags($data['input']['equity']),
                    'lasttradedprice' => strip_tags($data['input']['price']),
                    'earningspershare' => strip_tags($data['input']['earning']),
                    'netincomebeforetax' => strip_tags($data['input']['income']),
                    'grossrevenue' => strip_tags($data['input']['gross']),
                    'created_at' => date('Y-m-d H:i:s')
                ]);
                if ($insert) {
                    $stock = DB::table('stock_watchlists')
                        ->select('symbol')
                        ->where('id', '=', $insert)
                        ->where('userid', '=', Auth::id())
                        ->get();
                    return ['status' =>  true, 'sql' => 'select', 'message' => $stock[0]->symbol . ' has been added to the database.', 'stock' => $stock];
                }
            }  else {
                /** forward to update instead. */
                return $this->update($data);
          }
        }
    }

        /**
     * Update the specified resource in storage.
     */
    public function update($data) {
      if ($data['table'] === 'watchlist') {
          /** run update query.*/
          $update = DB::table('stock_watchlists')
              ->where('symbol', '=', $data['input']['symbol'])
              ->update([
                'userid' => Auth::id(),
                'symbol' => strip_tags($data['input']['symbol']),
                'edge' => strip_tags($data['input']['edge']),
                'totalliabilities' => strip_tags($data['input']['liabilities']),
                'stockholdersequity' => strip_tags($data['input']['equity']),
                'lasttradedprice' => strip_tags($data['input']['price']),
                'earningspershare' => strip_tags($data['input']['earning']),
                'netincomebeforetax' => strip_tags($data['input']['income']),
                'grossrevenue' => strip_tags($data['input']['gross']),
                'updated_at' => date('Y-m-d H:i:s'),
              ]);
          /** if update not empty.*/
          if ($update) {
              $stock = DB::table('stock_watchlists')
                  ->select('symbol')
                  ->where('symbol', '=', $data['input']['symbol'])
                  ->get();
              return ['status' =>  true, 'sql' => 'select', 'message' => $data['input']['symbol'] . ' successfully updated.', 'stock' => $stock];
          } else {
              return ['status' =>  false, 'sql' => 'select', 'message' => $data['input']['sybmol'] . ' no changes made.', 'stock' => '' ];
          }
      }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($data) {
        if ($data['table'] === 'watchlist') {
            $delete = DB::table('stock_watchlists')
                ->where('symbol', '=', $data['input']['symbol'])
                ->where('userid', '=', Auth::id())
                ->delete();
            if ($delete) {
                return ['status' =>  true, 'sql' => 'destroy', 'message' => $data['input']['symbol'] . ' has been deleted.', 'stock' => $data['input']['id']];
            } else {
                return ['status' =>  false, 'sql' => 'destroy', 'message' => 'Your attempt to delete ' . $data['input']['symbol'] . ' could not be completed.' , 'stock' => '' ];
            }
        }
    }

    /**
     * Helper function.
     */
    private function helpers($data) {
        if ($data['purpose'] === 'format' && $data['source'] === 'watchlists') {
            $return = [];
            foreach ($data['stocks'] as $key => $value) {
                $result = collect($value);
                foreach ($value as $k => $v) {
                  if ($k === 'returnonequity') {
                      $result->put('action', 'Show Destroy');
                  }
                }
                $return[$key] = $result;
              }
              return $return;
          }
    }
}
