<?php
namespace App\Http\Controllers\Dashboard\Stock;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class WatchlistController extends Controller
{
      /**
   * Display a listing of the resource.
   */
    public function init(Request $request) {
        /** check if request contains method equal to post. */
        if ($request->method() === 'POST') {
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
                                ->select('id', 'volume', 'symbol', 'sector', 'edge', 'totalliabilities', 'stockholdersequity', 'lasttradedprice', 'earningspershare', 'netincomebeforetax', 'grossrevenue')
                                ->where('userid', '=', Auth::id())
                                ->where('sector', '=', $value->sector)
                                ->where('earningspershare', '>', 0)
                                ->where('netincomebeforetax', '>', 0)
                                ->orderBy('volume', 'desc')
                                ->get()
                                ->toArray();
                            /** resequence array keys. */
                            $sector['miningandoil'] = array_values($sector['miningandoil']);
                            /** call helper fucntion. */
                            $response['miningandoil'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['miningandoil']]);
                        }
                        if ($value->sector == 'holdingfirms') {
                            /** fetch stocks. */
                            $sector['holdingfirms'] = DB::table('stock_watchlists')
                                ->select('id', 'volume', 'symbol', 'sector', 'edge', 'totalliabilities', 'stockholdersequity', 'lasttradedprice', 'earningspershare', 'netincomebeforetax', 'grossrevenue')
                                ->where('userid', '=', Auth::id())
                                ->where('sector', '=', $value->sector)
                                ->where('earningspershare', '>', 0)
                                ->where('netincomebeforetax', '>', 0)
                                ->orderBy('volume', 'desc')
                                ->get()
                                ->toArray();
                            /** resequence array keys. */
                            $sector['holdingfirms'] = array_values($sector['holdingfirms']);
                            /** call helper fucntion. */
                            $response['holdingfirms'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['holdingfirms']]);
                        }
                        if ($value->sector == 'services') {
                            /** fetch stocks. */
                            $sector['services'] = DB::table('stock_watchlists')
                                ->select('id', 'volume', 'symbol', 'sector', 'edge', 'totalliabilities', 'stockholdersequity', 'lasttradedprice', 'earningspershare', 'netincomebeforetax', 'grossrevenue')
                                ->where('userid', '=', Auth::id())
                                ->where('sector', '=', $value->sector)
                                ->where('earningspershare', '>', 0)
                                ->where('netincomebeforetax', '>', 0)
                                ->orderBy('volume', 'desc')
                                ->get()
                                ->toArray();
                            /** resequence array keys. */
                            $sector['services'] = array_values($sector['services']);
                            /** call helper fucntion. */
                            $response['services'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['services']]);
                         }
                        if ($value->sector == 'industrial') {
                            /** fetch stocks. */
                            $sector['industrial'] = DB::table('stock_watchlists')
                                ->select('id', 'volume', 'symbol', 'sector', 'edge', 'totalliabilities', 'stockholdersequity', 'lasttradedprice', 'earningspershare', 'netincomebeforetax', 'grossrevenue')
                                ->where('userid', '=', Auth::id())
                                ->where('sector', '=', $value->sector)
                                ->where('earningspershare', '>', 0)
                                ->where('netincomebeforetax', '>', 0)
                                ->orderBy('volume', 'desc')
                                ->get()
                                ->toArray();
                            /** resequence array keys. */
                            $sector['industrial'] = array_values($sector['industrial']);
                            /** call helper fucntion. */
                            $response['industrial'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['industrial']]);
                       }
                        if ($value->sector == 'property') {
                            /** fetch stocks. */
                            $sector['property'] = DB::table('stock_watchlists')
                                ->select('id', 'volume', 'symbol', 'sector', 'edge', 'totalliabilities', 'stockholdersequity', 'lasttradedprice', 'earningspershare', 'netincomebeforetax', 'grossrevenue')
                                ->where('userid', '=', Auth::id())
                                ->where('sector', '=', $value->sector)
                                ->where('earningspershare', '>', 0)
                                ->where('netincomebeforetax', '>', 0)
                                ->orderBy('volume', 'desc')
                                ->get()
                                ->toArray();
                            /** resequence array keys. */
                            $sector['property'] = array_values($sector['property']);
                            /** call helper fucntion. */
                            $response['property'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['property']]);
                       }
                        if ($value->sector == 'financials') {
                            /** fetch stocks. */
                            $sector['financials'] = DB::table('stock_watchlists')
                                ->select('id', 'volume', 'symbol', 'sector', 'edge', 'totalliabilities', 'stockholdersequity', 'lasttradedprice', 'earningspershare', 'netincomebeforetax', 'grossrevenue')
                                ->where('userid', '=', Auth::id())
                                ->where('sector', '=', $value->sector)
                                ->where('earningspershare', '>', 0)
                                ->where('netincomebeforetax', '>', 0)
                                ->orderBy('volume', 'desc')
                                ->get()
                                ->toArray();
                            /** resequence array keys. */
                            $sector['financials'] = array_values($sector['financials']);
                            /** call helper fucntion. */
                            $response['financials'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['financials']]);
                       }
                        if ($value->sector == 'smallmediumemergingboard') {
                            /** fetch stocks. */
                            $sector['smallmediumemergingboard'] = DB::table('stock_watchlists')
                                ->select('id', 'volume', 'symbol', 'sector', 'edge', 'totalliabilities', 'stockholdersequity', 'lasttradedprice', 'earningspershare', 'netincomebeforetax', 'grossrevenue')
                                ->where('userid', '=', Auth::id())
                                ->where('sector', '=', $value->sector)
                                ->where('earningspershare', '>', 0)
                                ->where('netincomebeforetax', '>', 0)
                                ->orderBy('volume', 'desc')
                                ->get()
                                ->toArray();
                            /** resequence array keys. */
                            $sector['smallmediumemergingboard'] = array_values($sector['smallmediumemergingboard']);
                            /** call helper fucntion. */
                            $response['smallmediumemergingboard'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['smallmediumemergingboard']]);
                        }
                        if ($value->sector == 'etf') {
                            $sector['funds'] = DB::table('stock_watchlists')
                                ->select('id', 'volume', 'symbol', 'sector', 'edge', 'totalliabilities', 'stockholdersequity', 'lasttradedprice', 'earningspershare', 'netincomebeforetax', 'grossrevenue')
                                ->where('userid', '=', Auth::id())
                                ->where('sector', '=', $value->sector)
                                ->where('earningspershare', '>', 0)
                                ->where('netincomebeforetax', '>', 0)
                                ->orderBy('volume', 'desc')
                                ->get()
                                ->toArray();
                            /** resequence array keys. */
                            $sector['funds'] = array_values($sector['funds']);
                             /** call helper fucntion. */
                            $response['funds'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['funds']]);
                        }
                    }
                    /** return something. */
                    return ['message' => 'Please wait while we process your request..', 'sectors' => $response];
                } else {
                    return ['message' => 'There were no records discovered.', 'sectors' => ''];
                }
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
        if ($data['purpose'] === 'iterate' && $data['source'] === 'watchlists') {
            foreach ($data['stocks'] as $key => $value) {
                $return[$key]['id'] = $value->id;
                $return[$key]['volume'] = number_format($value->volume, 2,'.', ',');
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
