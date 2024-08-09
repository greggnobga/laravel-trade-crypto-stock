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
    public function init(Request $request)
    {
        /** check if request contains method equal to post. */
        if ($request->method() === 'POST') {
            /** forward store command. */
            if ($request->input('section') === 'store') {
                return $this->store($request->all());
            }
            /** forward destroy command. */
            if ($request->input('section') === 'destroy') {
                return $this->destroy($request->all());
            }
        }

        /** check if request contains method equal to get. */
        if ($request->method() === 'GET') {
            /** forward fetch command. */
            if ($request->input('section') === 'fetch') {
                return $this->fetch(['page' => $request->input('page')]);
            }
        }
    }

    /**
     * Store watchlist.
     */
    public function store($data)
    {
        /** check if record exists. */
        $check =  DB::table('stock_watchlists')
            ->select('symbol')
            ->where('userid', Auth::id())
            ->where('symbol', $data['symbol'])
            ->first();

        /** if null do something. */
        if (is_null($check)) {
            $insert = DB::table('stock_watchlists')
                ->where('symbol', $data['symbol'])
                ->insert([
                    'userid' => Auth::id(),
                    'symbol' => strip_tags($data['symbol']),
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                ]);

            /** return something. */
            if ($insert) {
                return ['message' => $data['symbol'] . ' has been added to the database.'];
            }
        } else {
            /** return something. */
            return response(['message' => 'Record already exits.'], 200);
        }
    }

    /**
     * Fetch watchlist.
     */
    public function fetch($data)
    {
        /** Item per page. */
        $itemPerPage = 15;

        /** Get total number of records. */
        $totalRecords = DB::table('stock_watchlists')
            ->select('symbol')
            ->count();

        /** Calculate the number of pages */
        $numberOfPages = ceil($totalRecords / $itemPerPage);

        /** Check if given pages is greater than number of pages. If true then set the page to number of pages. */
        if ($data['page'] > $numberOfPages) {
            $data['page'] = $numberOfPages;
        }

        /** repository. */
        $result = [];

        /** fetch unique sector. */
        $watchlist =  DB::table('stock_watchlists')
            ->join('stock_trades', 'stock_trades.symbol', '=', 'stock_watchlists.symbol')
            ->select('stock_watchlists.symbol', 'stock_trades.pricerange')
            ->where('stock_watchlists.userid', Auth::id())
            ->orderBy('stock_trades.pricerange', 'desc')
            ->paginate($itemPerPage, '*', 'page', $data['page'])
            ->toArray();

        /** check if sectors is not empty. */
        if (!is_null($watchlist['data'])) {
            foreach ($watchlist['data'] as $key => $value) {
                /** loop through watchlist. */
                $items = DB::table('stock_trades')
                    ->select('edge', 'symbol', 'price', 'value', 'pricerange', 'workingcapital', 'netincomeaftertax', 'debtassetratio', 'dividendyield')
                    ->where('symbol', '=', $value->symbol)
                    ->first();

                /** save to reponse pointer. */
                $result[$key] = $items;
            }

            /** Filter array to remove null value. */
            $filter = array_filter($result);

            /** Sort collection based on desired key. */
            $sorted = collect($filter)->sortByDesc(function ($item) {
                return $item->pricerange;
            });

            /** Resequence array keys. */
            $stocks = array_values($sorted->toArray());

            /** Call helper function. */
            $format = $this->helpers(['purpose' => 'format', 'source' => $stocks]);

            /** return something. */
            return response(['message' => 'Please wait while we process your request.', 'stocks' => $format, 'pages' => $numberOfPages, 'show_message' => true], 200);
        } else {
            /** return something. */
            return response(['message' => 'There were no records discovered.'], 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($data)
    {
        /** query if exists. */
        $check = DB::table('stock_watchlists')
            ->select('userid', 'symbol')
            ->where('symbol', $data['symbol'])
            ->first();

        if (!is_null($check)) {
            /** delete record. */
            $delete = DB::table('stock_watchlists')
                ->where('userid', Auth::id())
                ->where('symbol', strip_tags($data['symbol']))
                ->delete();

            if ($delete) {
                /** return something. */
                return response(['message' => 'The ' . $data['symbol'] . ' record has been removed.'], 200);
            } else {
                /** return something. */
                return response(['message' => 'Your attempt to delete ' . $data['symbol'] . ' was unsuccessful.'], 200);
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
                    if (preg_match('/[a-zA-Z]+/', $v)) {
                        $return[$key][$k] = $v;
                    }
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
