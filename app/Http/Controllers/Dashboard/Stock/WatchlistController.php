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
                        $result[$key]['debtequityratio'] = bcdiv($value->totalliabilities, $value->stockholdersequity, 2);
                        //$result[$key]['priceearningratio'] = bcdiv($value->lasttradedprice, $value->earningspershare, 2);
                        $result[$key]['netprofitmargin'] = bcmul(bcdiv($value->netincomebeforetax, $value->grossrevenue, 2), 100, 2);
                        $result[$key]['returnonequity'] = bcdiv($value->grossrevenue, bcdiv($value->stockholdersequity, 2, 2), 2);                  
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
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
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
                return ['status' => false, 'message' => $check[0]->symbol . ' already present in the database.'];
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
                      $result->put('action', 'Update Destroy');
                  }
                }
                $return[$key] = $result;
              }
              return $return;
          }
    }
}
