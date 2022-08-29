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
        
      }
    }

      /**
     * Store a newly created resource in storage.
     */
    public function store($data) {
        if ($data['table'] === 'watchlist') {
            $check = DB::table('stock_watchlists')
            ->select('id')
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
                        ->select('id', 'created_at as date', 'symbol', 'edge', 'totalliabilities as liabilities', 'stockholdersequity as equity', 'lasttradedprice as price', 'earningspershare as earning', 'netincomebeforetax as income', 'grossrevenue as gross')
                        ->where('id', '=', $insert)
                        ->where('userid', '=', Auth::id())
                        ->get();
                
                    // $result = $this->helpers(['purpose' => 'format', 'source' => 'order', 'stock' => $stock]);
                    
                    return ['status' =>  true, 'sql' => 'select', 'message' => $stock[0]->symbol . ' has been added to the database.', 'stock' => $stock];
                }

            }  else {
                return ['status' => false, 'message' => 'Stock already present in the database.'];
            }
          
        }
    }
}
