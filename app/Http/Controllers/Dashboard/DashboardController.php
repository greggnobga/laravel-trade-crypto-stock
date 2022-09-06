<?php
namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

use Carbon\Carbon;
use Goutte\Client;

class DashboardController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function init() {
        return View::make('dashboard.dashboard');
    }

    public function user() {
        return ['user' => 'User information.'];
    }

    /**
    * Declare stocks function.
    */
    public function stocksectors() {
        /** repository. */
        $response = [];
        /** fetch unique sector. */
        $sectors =  DB::table('stock_trades')
                    ->select('sector')
                    ->get()
                    ->unique()
                    ->toArray();
        dd($sectors);
        /** resequence array keys. */
        $sector['sector'] = array_values($sectors);
        /** search record by sector. */
        foreach($sector['sector'] as $key => $value) {
            if ($value->sector == 'services') {
                /** fetch stocks. */
                $sector['services'] = DB::table('stock_watchlists')
                ->select('id', 'created_at as date', 'symbol', 'sector', 'edge', 'totalliabilities', 'stockholdersequity', 'lasttradedprice', 'earningspershare', 'netincomebeforetax', 'grossrevenue')
                ->where('sector', '=', $value->sector)
                ->get()
                ->toArray();
                /** call helper fucntion. */
                $response['services'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['services']]);
            }
            if ($value->sector == 'holdingfirms') {
                /** fetch stocks. */
                $sector['holdingfirms'] = DB::table('stock_watchlists')
                ->select('id', 'created_at as date', 'symbol', 'sector', 'edge', 'totalliabilities', 'stockholdersequity', 'lasttradedprice', 'earningspershare', 'netincomebeforetax', 'grossrevenue')
                ->where('sector', '=', $value->sector)
                ->get()
                ->toArray();
                /** call helper fucntion. */
                $response['holdingfirms'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['holdingfirms']]);
            }
            if ($value->sector == 'miningandoil') {
                /** fetch stocks. */
                $sector['miningandoil'] = DB::table('stock_watchlists')
                ->select('id', 'created_at as date', 'symbol', 'sector', 'edge', 'totalliabilities', 'stockholdersequity', 'lasttradedprice', 'earningspershare', 'netincomebeforetax', 'grossrevenue')
                ->where('sector', '=',$value->sector)
                ->get()
                ->toArray();
                /** call helper fucntion. */
                $response['miningandoil'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['miningandoil']]);
            }
            if ($value->sector == 'industrial') {
                /** fetch stocks. */
                $sector['industrial'] = DB::table('stock_watchlists')
               ->select('id', 'created_at as date', 'symbol', 'sector', 'edge', 'totalliabilities', 'stockholdersequity', 'lasttradedprice', 'earningspershare', 'netincomebeforetax', 'grossrevenue')
                ->where('sector', '=', $value->sector)
                ->get()
                ->toArray();
                /** call helper fucntion. */
                $response['industrial'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['industrial']]);
            }
            if ($value->sector == 'property') {
                /** fetch stocks. */
                $sector['property'] = DB::table('stock_watchlists')
               ->select('id', 'created_at as date', 'symbol', 'sector', 'edge', 'totalliabilities', 'stockholdersequity', 'lasttradedprice', 'earningspershare', 'netincomebeforetax', 'grossrevenue')
                ->where('sector', '=', $value->sector)
                ->get()
                ->toArray();
                 /** call helper fucntion. */
                $response['property'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['property']]);
            }
            if ($value->sector == 'smallmediumemergingboard') {
                /** fetch stocks. */
                $sector['smallmediumemergingboard'] = DB::table('stock_watchlists')
                ->select('id', 'updated_at as date', 'edge', 'symbol' , 'price', 'change', 'earningpershare',  'average', 'yearhighprice', 'incomeaftertax', 'volume')
                ->where('sector', '=', $value->sector)
                ->get()
                ->toArray();
                /** call helper fucntion. */
                $response['smallmediumemergingboard'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['smallmediumemergingboard']]);
            }
            if ($value->sector == 'etf') {
                $sector['etf'] = DB::table('stock_watchlists')
                ->select('id', 'updated_at as date', 'edge', 'symbol' , 'price', 'change', 'earningpershare',  'average', 'yearhighprice', 'incomeaftertax', 'volume')
                ->where('sector', '=', $value->sector)
                ->get()
                ->toArray();
                /** call helper fucntion. */
                $response['etf'] = $this->helpers(['purpose' => 'iterate', 'source' => 'watchlists', 'stocks' => $sector['etf']]);
            }
        }
        /** return something. */
        return $response;
    }

    public function helpers($data) {
        /** repository. */
        $result = [];
        /** check condition and iterate. */
        if ($data['purpose'] === 'iterate' && $data['source'] === 'watchlists') {
            foreach($data['stocks'] as $key => $value) {
                $result[$key]['id'] = $value->id;
                $result[$key]['date'] = $value->date;
                $result[$key]['symbol'] = $value->symbol;
                $result[$key]['sector'] = $value->sector;
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
        //    foreach($data['stocks'] as $key => $value) {
        //         $return[$key]['id'] = $value['id'];
        //         $return[$key]['date'] = $value['date'];
        //         $return[$key]['symbol'] = $value['symbol'];
        //         $return[$key]['sector'] = $value['sector'];
        //         $return[$key]['edge'] = $value['edge'];
        //         $return[$key]['lasttradedprice'] = $value['lasttradedprice'];
        //         /** evalaute value is greater than zero. */
        //         if (floatval($value['totalliabilities']) > 0 && floatval($value['stockholdersequity']) > 0) {
        //             $return[$key]['debtequityratio'] = bcdiv(floatval($value['totalliabilities']), floatval($value['stockholdersequity']), 2);
        //         }
        //         if (floatval($value['lasttradedprice']) > 0 && floatval($value['earningspershare']) > 0) {
        //             $return[$key]['priceearningratio'] = bcdiv(floatval($value['lasttradedprice']), floatval($value['earningspershare']), 2);
        //         }
        //         if (floatval($value['netincomebeforetax']) > 0 && floatval($value['grossrevenue']) > 0) {
        //             $return[$key]['netprofitmargin'] = bcmul(bcdiv(floatval($value['netincomebeforetax']), floatval($value['grossrevenue']), 2), 100, 2);
        //         }
        //         if (floatval($value['grossrevenue']) > 0 && floatval($value['stockholdersequity']) > 0) {
        //             $return[$key]['returnonequity'] = bcdiv(floatval($value['grossrevenue']), bcdiv(floatval($value['stockholdersequity']), 2, 2), 2); 
        //         }
        //         /** evalaute value is equal to zero. */
        //         if (floatval($value['totalliabilities']) <= 0 || floatval($value['stockholdersequity']) <= 0) {
        //             $result[$key]['debtequityratio'] = 0.00;
        //         }
        //         if (floatval($value['lasttradedprice']) <= 0 || floatval($value['earningspershare']) <= 0) {
        //             $result[$key]['priceearningratio'] = 0.00;
        //         }
        //         if (floatval($value['netincomebeforetax']) <= 0 || floatval($value['grossrevenue']) <= 0) {
        //             $result[$key]['netprofitmargin'] = 0.00;
        //         }
        //         if (floatval($value['grossrevenue']) <= 0 || floatval($value['stockholdersequity']) <= 0) {
        //             $result[$key]['returnonequity'] = 0.00;
        //         } 
        //     }
        }
        return $result;
    }
 }  
