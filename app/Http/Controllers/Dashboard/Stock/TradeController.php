<?php

namespace App\Http\Controllers\Dashboard\Stock;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class TradeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function init(Request $request)
    {
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
            if ($request->input('section') === 'bluechip') {
                return $this->bluechip(['page' => $request->input('page')]);
            }

            /** forward blue command. */
            if ($request->input('section') === 'common') {
                return $this->common(['page' => $request->input('page')]);
            }
        }
    }

    /**
     * Fetch blue chip stocks.
     */
    public function bluechip($data)
    {
        /** pointer */
        $stocks = [];

        /** check record. */
        $check = DB::table('stock_trades')
            ->select('symbol')
            ->where('symbol', 'PSE')
            ->first();

        if (!is_null($check)) {
            /** Item per page. */
            $itemPerPage = 15;

            /** Get total number of records. */
            $totalRecords = DB::table('stock_blues')
                ->join('stock_trades', 'stock_trades.symbol', 'stock_blues.symbol')
                ->select('stock_blues.symbol')
                ->where('value', '>', 0)
                ->where('workingcapital', '>', 0)
                ->where('netincomeaftertax', '>', 0)
                ->where('userid', Auth::id())
                ->count();

            /** Calculate the number of pages */
            $numberOfPages = ceil($totalRecords / $itemPerPage);

            /** Check if given pages is greater than number of pages. If true then set the page to number of pages. */
            if ($data['page'] > $numberOfPages) {
                $data['page'] = $numberOfPages;
            }

            /** Fecth all record in stock blue table. */
            $record = DB::table('stock_blues')
                ->join('stock_trades', 'stock_trades.symbol', 'stock_blues.symbol')
                ->select('stock_blues.symbol')
                ->where('value', '>', 0)
                ->where('workingcapital', '>', 0)
                ->where('netincomeaftertax', '>', 0)
                ->where('userid', Auth::id())
                ->orderBy('pricerange', 'desc')
                ->paginate($itemPerPage, '*', 'page', $data['page'])
                ->toArray();

            /** Process the stocks. */
            if (!is_null($record['data'])) {
                $stocks = [];
                foreach ($record['data'] as $key => $value) {
                    /** Get additional stock data. */
                    $stock = DB::table('stock_trades')
                        ->select('edge', 'symbol', 'price', 'value', 'pricerange', 'workingcapital', 'netincomeaftertax', 'debtassetratio', 'dividendyield')
                        ->where('symbol', $value->symbol)
                        ->first();

                    /** Push to record array. */
                    $stocks[$key] = $stock;
                }

                /** Filter array to remove null value. */
                $filter = array_filter($stocks);

                /** Sort collection based on desired key. */
                $sorted = collect($filter)->sortByDesc(function ($item) {
                    return $item->pricerange;
                });

                /** Resequence array keys. */
                $stocks = array_values($sorted->toArray());

                /** Call helper function. */
                $format = $this->helpers(['purpose' => 'format', 'source' => $stocks]);
            } else {
                /** Return something. */
                return response(['message' => 'No record found.'], 200);
            }

            /** Return something. */
            return response(['message' => 'Processed and displayed are all potential bluechip stocks.', 'bluechip' => $format, 'pages' => $numberOfPages, 'show_message' => true], 200);
        } else {
            /** return something. */
            return response(['message' => 'There was no entry in the database.'], 200);
        }
    }

    /**
     * Fetch stocks.
     */
    public function common($data)
    {
        /** repository. */
        $result = [];
        /** check record. */
        $check = DB::table('stock_trades')
            ->select('symbol')
            ->where('symbol', '=', 'PSE')
            ->first();

        if (!is_null($check)) {
            /** Item per page. */
            $itemPerPage = 15;

            /** Get total number of records. */
            $totalRecords = DB::table('stock_trades')
                ->select('symbol')
                ->where('value', '>', 0)
                ->where('workingcapital', '>', 0)
                ->where('netincomeaftertax', '>', 0)
                ->where('edge', '>', 0)
                ->count();

            /** Calculate the number of pages */
            $numberOfPages = ceil($totalRecords / $itemPerPage);

            /** Check if given pages is greater than number of pages. If true then set the page to number of pages. */
            if ($data['page'] > $numberOfPages) {
                $data['page'] = $numberOfPages;
            }

            /** create stock list. */
            $items = DB::table('stock_trades')
                ->select('edge', 'symbol', 'price', 'value', 'pricerange', 'workingcapital', 'netincomeaftertax', 'debtassetratio', 'dividendyield')
                ->where('value', '>', 0)
                ->where('workingcapital', '>', 0)
                ->where('netincomeaftertax', '>', 0)
                ->where('edge', '>', 0)
                ->orderBy('pricerange', 'desc')
                ->paginate($itemPerPage, '*', 'page', $data['page'])
                ->toArray();

            /** ignore indexes. */
            foreach ($items['data'] as $key => $value) {
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
            return response(['message' => 'Processed and displayed are all potential stocks.', 'common' => $format, 'pages' => $numberOfPages, 'show_message' => true], 200);
        } else {
            /** return something. */
            return response(['message' => 'There was no entry in the database.'], 200);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($data)
    {
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
                return response(['message' => $data['input']['name'] . ' has been added to the database.'], 200);
            }
        } else {
            /** forward to update instead. */
            return $this->update($data);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($data)
    {
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
                return response(['message' => 'The ' . $data['input']['name'] . ' information was successfully updated.'], 200);
            } else {
                /** return something.*/
                return response(['message' => 'No modifications were made to the' . $data['input']['name'] . ' data.'], 200);
            }
        }
    }

    /**
     * Helper function.
     */
    private function helpers($data)
    {
        if ($data['purpose'] === 'format') {
            /** return variable. */
            $return = [];

            /** loop through. */
            foreach ($data['source'] as $key => $value) {
                foreach ($value as $k => $v) {
                    /** preg match alpha. */
                    if (preg_match('/[a-zA-Z]+/', $v)) {
                        $return[$key][$k] = $v;
                    }

                    /** preg match numeric. */
                    if (preg_match('/[0-9]+/', $v)) {
                        if ($k === 'symbol' || $k === 'edge') {
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
