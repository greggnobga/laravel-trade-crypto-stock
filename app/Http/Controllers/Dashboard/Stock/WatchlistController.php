<?php
namespace App\Http\Controllers\Dashboard\Stock;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class WatchlistController extends Controller {
      /**
   * Display a listing of the resource.
   */
    public function init(Request $request) {
        /** check if request contains method equal to post. */
        if ($request->method() === 'POST') {
            /** forward destroy command. */
            if ($request->input('table') === 'watchlist' && $request->input('statement') === 'trash') {
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
                            $sector['miningandoils'] = DB::table('stock_watchlists')
                                ->select('id', 'volume', 'symbol', 'sector', 'edge', 'totalliabilities', 'stockholdersequity', 'lasttradedprice', 'earningspershare', 'netincomebeforetax', 'grossrevenue')
                                ->where('userid', '=', Auth::id())
                                ->where('sector', '=', $value->sector)
                                ->where('earningspershare', '>', 0)
                                ->where('netincomebeforetax', '>', 0)
                                ->orderBy('volume', 'desc')
                                ->get()
                                ->toArray();
                            /** resequence array keys. */
                            $sector['miningandoils'] = array_values($sector['miningandoils']);
                            /** call helper fucntion. */
                            $response['miningandoils'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['miningandoils']]);
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
                            $sector['industrials'] = DB::table('stock_watchlists')
                                ->select('id', 'volume', 'symbol', 'sector', 'edge', 'totalliabilities', 'stockholdersequity', 'lasttradedprice', 'earningspershare', 'netincomebeforetax', 'grossrevenue')
                                ->where('userid', '=', Auth::id())
                                ->where('sector', '=', $value->sector)
                                ->where('earningspershare', '>', 0)
                                ->where('netincomebeforetax', '>', 0)
                                ->orderBy('volume', 'desc')
                                ->get()
                                ->toArray();
                            /** resequence array keys. */
                            $sector['industrials'] = array_values($sector['industrials']);
                            /** call helper fucntion. */
                            $response['industrials'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['industrials']]);
                       }
                        if ($value->sector == 'property') {
                            /** fetch stocks. */
                            $sector['properties'] = DB::table('stock_watchlists')
                                ->select('id', 'volume', 'symbol', 'sector', 'edge', 'totalliabilities', 'stockholdersequity', 'lasttradedprice', 'earningspershare', 'netincomebeforetax', 'grossrevenue')
                                ->where('userid', '=', Auth::id())
                                ->where('sector', '=', $value->sector)
                                ->where('earningspershare', '>', 0)
                                ->where('netincomebeforetax', '>', 0)
                                ->orderBy('volume', 'desc')
                                ->get()
                                ->toArray();
                            /** resequence array keys. */
                            $sector['properties'] = array_values($sector['properties']);
                            /** call helper fucntion. */
                            $response['properties'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['properties']]);
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
                            $sector['smallmediumemergingboards'] = DB::table('stock_watchlists')
                                ->select('id', 'volume', 'symbol', 'sector', 'edge', 'totalliabilities', 'stockholdersequity', 'lasttradedprice', 'earningspershare', 'netincomebeforetax', 'grossrevenue')
                                ->where('userid', '=', Auth::id())
                                ->where('sector', '=', $value->sector)
                                ->where('earningspershare', '>', 0)
                                ->where('netincomebeforetax', '>', 0)
                                ->orderBy('volume', 'desc')
                                ->get()
                                ->toArray();
                            /** resequence array keys. */
                            $sector['smallmediumemergingboards'] = array_values($sector['smallmediumemergingboards']);
                            /** call helper fucntion. */
                            $response['smallmediumemergingboards'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['smallmediumemergingboards']]);
                        }
                        if ($value->sector == 'etf') {
                            $sector['exchangetradedfunds'] = DB::table('stock_watchlists')
                                ->select('id', 'volume', 'symbol', 'sector', 'edge', 'totalliabilities', 'stockholdersequity', 'lasttradedprice', 'earningspershare', 'netincomebeforetax', 'grossrevenue')
                                ->where('userid', '=', Auth::id())
                                ->where('sector', '=', $value->sector)
                                ->where('earningspershare', '>', 0)
                                ->where('netincomebeforetax', '>', 0)
                                ->orderBy('volume', 'desc')
                                ->get()
                                ->toArray();
                            /** resequence array keys. */
                            $sector['exchangetradedfunds'] = array_values($sector['exchangetradedfunds']);
                             /** call helper fucntion. */
                            $response['exchangetradedfunds'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['exchangetradedfunds']]);
                        }
                    }
                    /** return something. */
                    return response(['message' => 'Please wait while we process your request.', 'sectors' => $response], 200);
                } else {
                    return response(['message' => 'There were no records discovered.', 'sectors' => ''], 200);
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
                ->where('symbol', '=', $data['input'])
                ->where('userid', '=', Auth::id())
                ->delete();
            if ($delete) {
                return response(['message' => 'The ' . $data['input'] . ' record has been removed.'], 200);
            } else {
                return response(['message' => 'Your attempt to delete ' . $data['input'] . ' was unsuccessful.'], 200);
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
                   $return[$key]['netprofitmargin'] = bcmul(bcdiv($value->netincomebeforetax, $value->grossrevenue, 2), 100, 2) . '%';
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
