<?php
namespace App\Http\Controllers\Dashboard\Stock;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class TradeController extends Controller {
  /**
   * Display a listing of the resource.
   */
    public function init(Request $request)
    {

      /** check if request contains method equal to post. */
      if ($request->method() === 'POST') {
          /** forward insert command. */
          if ($request->input('table') === 'trade' && $request->input('statement') === 'fetch') {
            return $this->store(['table' => 'trade', 'input' => $request->input('input')]);
          }
      }

      /** check if request contains method equal to get. */
      if ($request->method() === 'GET') {
        if ($request->input('table') === 'trade') {
          /** repository. */
          $result = [];
          /** check record. */
          $check = DB::table('stock_trades')
              ->select('symbol')
              ->where('symbol', '=', 'PSEi')
              ->get();

            if ($check->isNotEmpty()) {
              /** create stock indexes. */
              $indexs = ['PSEi', 'ALL', 'FIN', 'IND', 'HDG', 'PRO', 'SVC', 'M-O'];
              foreach($indexs as $key => $value) {
                $result['indexes'][$key] = DB::table('stock_trades')
                    ->select('id', 'name', 'symbol', 'price', 'change', 'volume')
                    ->where('symbol', '=', $value)
                    ->first();
               }
              /** create stock list. */
              $items = DB::table('stock_trades')
                ->select('id', 'name', 'symbol', 'price', 'change', 'volume')
                ->orderBy('volume', 'desc')
                ->get();

                foreach($items as $key => $value) {
                  switch ($value->symbol) {
                    case 'PSEi':
                      break;
                    case 'ALL':
                      break;
                    case 'FIN':
                      break;
                    case 'IND':
                      break;
                    case 'HDG':
                      break;
                    case 'PRO':
                      break;
                    case 'SVC':
                      break;
                    case 'M-O':
                      break;
                    default:
                        $result['stocks'][$key] = $value;
                  }
                }

                /** sort data order by volume. */
                collect($result['indexes'])->sortByDesc('volume');
                collect($result['stocks'])->sortByDesc('volume');

                /** resequence array keys*/
                $result['indexes'] = array_values($result['indexes']);
                $result['stocks'] = array_values($result['stocks']);

                return array('status' => true, 'sql' => 'select', 'message' => 'All possible stocks listed on the PSE are processed and displayed.', 'indexes' => $result['indexes'], 'stocks' => $result['stocks']);
              }
            }
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($data) {
      $symbol = DB::table('stock_trades')
          ->select('symbol', 'name')
          ->where('symbol', $data['input']['symbol'])
          ->get();

          if ($symbol->isEmpty()) {
            /** insert with appropriate data. */
            $insert = DB::table('stock_trades')
                ->insertGetId([
                    'name' => strip_tags($data['input']['name']),
                    'symbol' => strip_tags($data['input']['symbol']),
                    'price' => strip_tags($data['input']['price']),
                    'change' => strip_tags($data['input']['change']),
                    'volume' => strip_tags($data['input']['volume']),
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                ]);
            if ($insert) {
                $stock = DB::table('stock_trades')
                    ->select('id', 'created_at as date', 'name', 'symbol', 'price', 'change', 'volume')
                    ->where('id', '=', $insert)
                    ->get();
                return ['status' =>  true, 'sql' => 'select', 'message' => $data['input']['name'] . ' has been added to the database.', 'stock' => $stock];
            }
          } else {
            /** forward to update instead. */
              return $this->update($data);
          }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($data) {
      if ($data['table'] === 'trade') {
          /** run update query.*/
          $update = DB::table('stock_trades')
              ->where('symbol', '=', $data['input']['symbol'])
              ->update([
                'name' => strip_tags($data['input']['name']),
                'symbol' => strip_tags($data['input']['symbol']),
                'price' => strip_tags($data['input']['price']),
                'change' => strip_tags($data['input']['change']),
                'volume' => strip_tags($data['input']['volume']),
                'updated_at' => date('Y-m-d H:i:s'),
              ]);
          /** if update not empty.*/
          if ($update) {
              $stock = DB::table('stock_trades')
                  ->select('id', 'created_at as date', 'name', 'symbol', 'price', 'change', 'volume')
                  ->where('symbol', '=', $data['input']['symbol'])
                  ->get();
              return ['status' =>  true, 'sql' => 'select', 'message' => $data['input']['name'] . ' successfully updated.', 'stock' => $stock];
          } else {
              return ['status' =>  false, 'sql' => 'select', 'message' => $data['input']['name'] . ' no changes made.', 'stock' => '' ];
          }
      }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {
        //
    }
}
