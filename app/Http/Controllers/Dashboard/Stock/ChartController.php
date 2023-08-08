<?php

namespace App\Http\Controllers\Dashboard\Stock;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ChartController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function init(Request $request) {
        /** check if request contains method equal to post. */
        if ($request->method() === 'POST') {
            /** forward average function */
            // if ($request->input('section') === 'average') {
            //     return $this->chartaverage($request->all());
            // }
        }

        /** check if request contains method equal to post. */
        if ($request->method() === 'GET') {
            /** forward chart build function */
            if ($request->input('section') === 'fetch') {
                return $this->chartfetch($request->all());
            }
            /** forward chart build function */
            if ($request->input('section') === 'build') {
                return $this->chartbuild($request->all());
            }
        }
    }

    /**
     * Build list function.
     */
    public function chartfetch($data) {
        /** match params. */
        if ($data['statement'] === 'select') {
            /** fetch stock chart entry. */
            $clean = DB::table('stock_charts')
                ->select('symbol')
                ->where('userid', Auth::id())
                ->get()
                ->toArray();

            /** loop through stock chart entry. */
            foreach ($clean as $items) {
                /** check if still exist in the wathclist table. */
                $exist = DB::table('stock_watchlists')
                    ->select('symbol')
                    ->where('symbol', $items->symbol)
                    ->where('userid', Auth::id())
                    ->first();

                /** delete if it does not exist anymore. */
                if (is_null($exist)) {
                    DB::table('stock_charts')
                        ->where('symbol', $items->symbol)
                        ->where('userid', Auth::id())
                        ->delete();
                }
            }

            /** select record. */
            $record = DB::table('stock_charts')
                ->join('stock_trades', 'stock_trades.symbol', '=', 'stock_charts.symbol')
                ->select('stock_trades.edge', 'stock_trades.symbol', 'stock_trades.price', 'stock_trades.value', 'stock_trades.pricerange', 'stock_trades.change', 'supportlevel', 'resistancelevel', 'movingaverage', 'movingsignal')
                ->where('userid', Auth::id())
                ->orderBy('stock_trades.value', 'desc')
                ->get()
                ->toArray();

            /** Call helper. */
            $transform = $this->helpers(['operation' => 'format', 'source' => $record]);

            /** return result if not null. */
            if (!is_null($record)) {
                return response(['message' => 'Please wait while we process your request.', 'stocks' => $transform], 200);
            }
        }
    }

    /**
     * Build list function.
     */
    public function chartbuild($data) {
        /** match params. */
        if ($data['statement'] === 'select') {
            /** select record. */
            $watchlist = DB::table('stock_watchlists')
                ->join('stock_trades', 'stock_trades.symbol', '=', 'stock_watchlists.symbol')
                ->select('stock_trades.edge', 'stock_trades.security', 'stock_trades.symbol')
                ->where('userid', Auth::id())
                ->where('stock_watchlists.updated_at', '<', Carbon::now()->subHour(0))
                ->get()
                ->toArray();

            /** return result if not null. */
            if (!is_null($watchlist)) {
                return response(['message' => 'Please wait while we process your request.', 'stocks' => $watchlist], 200);
            }
        }
    }

    /**
     * Helper function.
     */
    private function helpers($data) {
        /** pointer. */
        $result = [];

        /** transform into standard format. */
        if ($data['operation'] === 'format') {
            /** loop through. */
            foreach ($data['source'] as $key => $value) {
                foreach ($value as $k => $v) {
                    /** preg match alpha. */
                    if (preg_match('/[a-zA-Z]+/', $v)) {
                        $result[$key][$k] = $v;
                    }

                    /** preg match numeric. */
                    if (preg_match('/[0-9]+/', $v)) {
                        if ($k === 'symbol' || $k === 'edge') {
                            $result[$key][$k] = $v;
                        } else {
                            $result[$key][$k] = number_format($v, 2, ".", ",");
                        }
                    }
                }
            }
        }

        /** return. */
        return $result;
    }
}
