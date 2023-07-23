<?php

namespace App\Http\Controllers\Dashboard\Stock;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class TradeController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function init(Request $request) {
        /** check if request contains method equal to post. */
        if ($request->method() === 'POST') {
            /** forward insert command. */
            if ($request->input('table') === 'trade' && $request->input('statement') === 'store') {
                return $this->store(['table' => $request->input('table'), 'input' => $request->input('input')]);
            }
        }
        /** check if request contains method equal to get. */
        if ($request->method() === 'GET') {
            /** forward blue command. */
            if ($request->input('section') === 'blue') {
                return $this->bluechip();
            }
            /** forward blue command. */
            if ($request->input('section') === 'common') {
                return $this->common();
            }
        }
    }

    /**
     * Fetch blue chip stocks.
     */
    public function bluechip() {

        /** check record. */
        $check = DB::table('stock_trades')
            ->select('symbol')
            ->where('symbol', 'PSE')
            ->first();

        if (!is_null($check)) {
            /** Fecth all record in stock blue table. */
            $record = DB::table('stock_blues')
                ->select('symbol')
                ->where('userid', Auth::id())
                ->get()
                ->toArray();

            if (!is_null($record)) {
                foreach ($record as $key => $value) {
                    /** Get additional stock data. */
                    $stock = DB::table('stock_trades')
                        ->select('symbol', 'price', 'value', 'pricerange', 'totalassets', 'netincomeaftertax', 'debtequityratio', 'dividendyield')
                        ->where('symbol', $value->symbol)
                        ->first();
                    /** Push to record array. */
                    $record[$key] = $stock;
                }
            } else {
                return response(['message' => 'No record found.'], 200);
            }

            /** sort collection based on desired key. */
            $sorted = collect($record)->sortByDesc(function ($item) {
                return $item->netincomeaftertax;
            });

            /** resequence array keys. */
            $stocks = array_values($sorted->toArray());

            /** Call helper function. */
            $format = $this->helpers(['purpose' => 'format', 'source' => $stocks]);

            /** Return something. */
            return response(['message' => 'Processed and displayed are all potential bluechip stocks that could be listed on the PSE.', 'stocks' => $format], 200);
        } else {
            /** return something. */
            return array('message' => 'There was no entry in the database.');
        }
    }

    /**
     * Fetch stocks.
     */
    public function common() {
        /** repository. */
        $result = [];
        /** check record. */
        $check = DB::table('stock_trades')
            ->select('symbol')
            ->where('symbol', '=', 'PSE')
            ->first();

        if (!is_null($check)) {
            /** create stock list. */
            $items = DB::table('stock_trades')
                ->select('symbol', 'price', 'value', 'pricerange', 'totalassets', 'netincomeaftertax', 'debtequityratio', 'dividendyield')
                ->where('edge', '>', 0)
                ->orderBy('netincomeaftertax', 'desc')
                ->get();

            /** ignore indexes. */
            foreach ($items as $key => $value) {
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
                        $result[$key] = $value;
                }
            }

            /** resequence array keys. */
            $stocks = array_values($result);

            /** Call helper function. */
            $format = $this->helpers(['purpose' => 'format', 'source' => $stocks]);

            /** return something. */
            return array('message' => 'Processed and displayed are all potential stocks that could be listed on the PSE.', 'stocks' => $format);
        } else {
            /** return something. */
            return array('message' => 'There was no entry in the database.');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($data) {
        /** fetch symbol and name. */
        $symbol = DB::table('stock_trades')
            ->select('symbol', 'name')
            ->where('symbol', $data['input']['symbol'])
            ->first();

        /** insert with appropriate data. */
        if (is_null($symbol)) {
            $insert = DB::table('stock_trades')
                ->insert([
                    'name' => strip_tags($data['input']['name']),
                    'symbol' => strip_tags($data['input']['symbol']),
                    'price' => strip_tags($data['input']['price']),
                    'change' => strip_tags($data['input']['change']),
                    'volume' => strip_tags($data['input']['volume']),
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                ]);
            if ($insert) {
                return ['message' => $data['input']['name'] . ' has been added to the database.'];
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
                /** return something.*/
                return ['message' => 'The ' . $data['input']['name'] . ' information was successfully updated.'];
            } else {
                /** return something.*/
                return ['message' => 'No modifications were made to the' . $data['input']['name'] . ' data.'];
            }
        }
    }

    /**
     * Helper function.
     */
    private function helpers($data) {
        if ($data['purpose'] === 'format') {
            /** return variable. */
            $return = [];
            /** loop through. */
            foreach ($data['source'] as $key => $value) {
                foreach ($value as $k => $v) {
                    if (preg_match('/[a-zA-Z]+/', $v)) {
                        $return[$key][$k] = $v;
                    }
                    if (preg_match('/[0-9]+/', $v)) {
                        if ($k === 'symbol') {
                            $return[$key][$k] = $v;
                        } else {
                            $return[$key][$k] = number_format($v, 2, ".", ",");
                        }
                    }
                }
            }
            /** return. */
            return $return;
        }
    }
}
