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
           $response = [];
            /** forward get command. */
            if ($request->input('table') === 'watchlist' && $request->input('statement') === 'select') {
                /** fetch unique sector. */
                $sectors =  DB::table('stock_watchlists')
                    ->select('sector')
                    ->get()
                    ->unique();
                if ($sectors->isNotEmpty()) {
                    /** search record by sector. */
                    foreach($sectors as $key => $value) {
                        if ($value->sector == 'miningandoil') {
                            /** fetch stocks. */
                            $sector['miningandoil'] = DB::table('stock_watchlists')
                                ->select('id', 'created_at as date', 'symbol', 'sector', 'edge', 'totalliabilities', 'stockholdersequity', 'lasttradedprice', 'earningspershare', 'netincomebeforetax', 'grossrevenue')
                                ->where('sector', '=',$value->sector)
                                ->get()
                                ->toArray();
                            /** resequence array keys. */
                            $sector['miningandoil'] = array_values($sector['miningandoil']);
                            /** call helper fucntion. */
                            $sector['miningandoil'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['miningandoil']]);
                            /** add button array keys. */
                            $response['miningandoil'] = $this->helpers(['purpose' => 'format', 'source' => 'watchlists', 'stocks' => $sector['miningandoil']]);
                        }
                        if ($value->sector == 'holdingfirms') {
                            /** fetch stocks. */
                            $sector['holdingfirms'] = DB::table('stock_watchlists')
                                ->select('id', 'created_at as date', 'symbol', 'sector', 'edge', 'totalliabilities', 'stockholdersequity', 'lasttradedprice', 'earningspershare', 'netincomebeforetax', 'grossrevenue')
                                ->where('sector', '=', $value->sector)
                                ->get()
                                ->toArray();
                            /** resequence array keys. */
                            $sector['holdingfirms'] = array_values($sector['holdingfirms']);
                            /** call helper fucntion. */
                            $sector['holdingfirms'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['holdingfirms']]);
                            /** add button array keys. */
                            $response['holdingfirms'] = $this->helpers(['purpose' => 'format', 'source' => 'watchlists', 'stocks' => $sector['holdingfirms']]);                            
                        }
                        if ($value->sector == 'services') {
                            /** fetch stocks. */
                            $sector['services'] = DB::table('stock_watchlists')
                                ->select('id', 'created_at as date', 'symbol', 'sector', 'edge', 'totalliabilities', 'stockholdersequity', 'lasttradedprice', 'earningspershare', 'netincomebeforetax', 'grossrevenue')
                                ->where('sector', '=', $value->sector)
                                ->get()
                                ->toArray();
                            /** resequence array keys. */
                            $sector['services'] = array_values($sector['services']);
                            /** call helper fucntion. */
                            $sector['services'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['services']]);
                            /** add button array keys. */
                            $response['services'] = $this->helpers(['purpose' => 'format', 'source' => 'watchlists', 'stocks' => $sector['services']]);                           
                        }
                        if ($value->sector == 'industrial') {
                            /** fetch stocks. */
                            $sector['industrial'] = DB::table('stock_watchlists')
                                ->select('id', 'created_at as date', 'symbol', 'sector', 'edge', 'totalliabilities', 'stockholdersequity', 'lasttradedprice', 'earningspershare', 'netincomebeforetax', 'grossrevenue')
                                ->where('sector', '=', $value->sector)
                                ->get()
                                ->toArray();
                            /** resequence array keys. */
                            $sector['industrial'] = array_values($sector['industrial']);
                            /** call helper fucntion. */
                            $sector['industrial'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['industrial']]);
                            /** add button array keys. */
                            $response['industrial'] = $this->helpers(['purpose' => 'format', 'source' => 'watchlists', 'stocks' => $sector['industrial']]);                            
                        }
                        if ($value->sector == 'property') {
                            /** fetch stocks. */
                            $sector['property'] = DB::table('stock_watchlists')
                                ->select('id', 'created_at as date', 'symbol', 'sector', 'edge', 'totalliabilities', 'stockholdersequity', 'lasttradedprice', 'earningspershare', 'netincomebeforetax', 'grossrevenue')
                                ->where('sector', '=', $value->sector)
                                ->get()
                                ->toArray();
                            /** resequence array keys. */
                            $sector['property'] = array_values($sector['property']);
                            /** call helper fucntion. */
                            $sector['property'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['property']]);
                            /** add button array keys. */
                            $response['property'] = $this->helpers(['purpose' => 'format', 'source' => 'watchlists', 'stocks' => $sector['property']]);                            
                        }
                        if ($value->sector == 'financials') {
                            /** fetch stocks. */
                            $sector['financials'] = DB::table('stock_watchlists')
                                ->select('id', 'created_at as date', 'symbol', 'sector', 'edge', 'totalliabilities', 'stockholdersequity', 'lasttradedprice', 'earningspershare', 'netincomebeforetax', 'grossrevenue')
                                ->where('sector', '=', $value->sector)
                                ->get()
                                ->toArray();
                            /** resequence array keys. */
                            $sector['financials'] = array_values($sector['financials']);
                            /** call helper fucntion. */
                            $sector['financials'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['financials']]);
                            /** add button array keys. */
                            $response['financials'] = $this->helpers(['purpose' => 'format', 'source' => 'watchlists', 'stocks' => $sector['financials']]);                            
                        }
                        if ($value->sector == 'smallmediumemergingboard') {
                            /** fetch stocks. */
                            $sector['smallmediumemergingboard'] = DB::table('stock_watchlists')
                                ->select('id', 'updated_at as date', 'edge', 'symbol' , 'price', 'change', 'earningpershare',  'average', 'yearhighprice', 'incomeaftertax', 'volume')
                                ->where('sector', '=', $value->sector)
                                ->get()
                                ->toArray();
                            /** resequence array keys. */
                            $sector['smallmediumemergingboard'] = array_values($sector['smallmediumemergingboard']);
                            /** call helper fucntion. */
                            $sector['smallmediumemergingboard'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['smallmediumemergingboard']]);
                            /** add button array keys. */
                            $response['smallmediumemergingboard'] = $this->helpers(['purpose' => 'format', 'source' => 'watchlists', 'stocks' => $sector['smallmediumemergingboard']]);                            
                        }
                        if ($value->sector == 'etf') {
                            $sector['funds'] = DB::table('stock_watchlists')
                                ->select('id', 'updated_at as date', 'edge', 'symbol' , 'price', 'change', 'earningpershare',  'average', 'yearhighprice', 'incomeaftertax', 'volume')
                                ->where('sector', '=', $value->sector)
                                ->get()
                                ->toArray();
                            /** resequence array keys. */
                            $sector['funds'] = array_values($sector['funds']);
                             /** call helper fucntion. */
                            $sector['funds'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['funds']]);
                            /** add button array keys. */
                            $response['funds'] = $this->helpers(['purpose' => 'format', 'source' => 'watchlists', 'stocks' => $sector['funds']]);                           
                        }
                    }
                    /** return something. */
                    return ['status' => true, 'sql' => 'select', 'message' => 'Please wait while we are processing your request.', 'sectors' => $response];
                } else {
                    return ['status' => false, 'sql' => 'select', 'message' => 'No record found.', 'sectors' => ''];
                }
            }
            /** forward destroy command. */
            if ($request->input('table') === 'watchlist' && $request->input('statement') === 'build') {
                $trades = DB::table('stock_trades')
                    ->select('edge', 'symbol', 'sector')
                    ->where('edge', '>', 0)
                    ->where('earningpershare', '>', 0)
                    ->where('incomeaftertax', '>', 10000)
                    ->orderBy('incomeaftertax')
                    ->get();

                if ($trades->isNotEmpty()) {
                    /** resequence array keys. */
                    $stocks = $trades->toArray();
                    /** return something. */
                    return ['status' => true, 'message' => 'Please wait while we are processing your request.', 'stocks' => $stocks];
                } 
                /** return something. */
                return ['status' => false, 'message' => 'Start crawling PSE website for stocks information.', 'stocks' => ''];
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
                    'sector' => strip_tags($data['input']['sector']),
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
                'sector' => strip_tags($data['input']['sector']),
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
        /** repository. */
        $return = [];
        /** check purpose and source. */
        if ($data['purpose'] === 'format' && $data['source'] === 'watchlists') {      
            foreach ($data['stocks'] as $key => $value) {
                $result = collect($value);
                foreach ($value as $k => $v) {
                  if ($k === 'returnonequity') {
                        $result->put('action', 'Show Destroy');
                    }
                }
                $return[$key] = $result;
            }
            /** return something. */
            return $return;
        }
        /** check purpose and source. */
        if ($data['purpose'] === 'iterate' && $data['source'] === 'watchlists') {
            foreach($data['stocks'] as $key => $value) {
                $return[$key]['id'] = $value->id;
                $return[$key]['date'] = $value->date;
                $return[$key]['symbol'] = $value->symbol;
                $return[$key]['sector'] = $value->sector;
                $return[$key]['edge'] = $value->edge;
                $return[$key]['lasttradedprice'] = $value->lasttradedprice;
                /** evalaute value is greater than zero. */
                if ($value->totalliabilities > 0 && $value->stockholdersequity > 0) {
                     $return[$key]['debtequityratio'] = bcdiv($value->totalliabilities, $value->stockholdersequity, 2);
                }
                if ($value->lasttradedprice > 0 && $value->earningspershare > 0) {
                    $return[$key]['priceearningratio'] = bcdiv($value->lasttradedprice, $value->earningspershare, 2);
                }
                if ($value->netincomebeforetax > 0 && $value->grossrevenue > 0) {
                    $return[$key]['netprofitmargin'] = bcmul(bcdiv($value->netincomebeforetax, $value->grossrevenue, 2), 100, 2);
                }
                if ($value->grossrevenue > 0 && $value->stockholdersequity > 0) {
                    $return[$key]['returnonequity'] = bcdiv($value->grossrevenue, bcdiv($value->stockholdersequity, 2, 2), 2); 
                }
                /** evalaute value is equal to zero. */
                if ($value->totalliabilities <= 0 || $value->stockholdersequity <= 0) {
                    $return[$key]['debtequityratio'] = 0.00;
                }
                if ($value->lasttradedprice <= 0 || $value->earningspershare <= 0) {
                    $return[$key]['priceearningratio'] = 0.00;
                }
                if ($value->netincomebeforetax <= 0 || $value->grossrevenue <= 0) {
                    $return[$key]['netprofitmargin'] = 0.00;
                }
                if ($value->grossrevenue <= 0 || $value->stockholdersequity <= 0) {
                    $return[$key]['returnonequity'] = 0.00;
                } 
            }
            /** return something. */
            return $return;
        }
    }
}
