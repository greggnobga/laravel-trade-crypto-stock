<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class StockExplorerController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function init(Request $request) {

        // /** check if request contains method equal to post. */
        // if ($request->method() === 'POST') {
        //     /** forward bluechip function with store. */
        //     if ($request->input('section') === 'bluechip' && $request->input('statement') === 'store') {
        //         return $this->bluechip($request->all());
        //     }
        // }

        /** check if request contains method equal to get. */
        if ($request->method() === 'GET') {
            /** sentinel response. */
            if ($request->input('section') === 'fetch') {
                return $this->fetch($request->all());
            }
        }
    }

    /**
     * Declare fetch function.
     */
    public function fetch($data) {
        /** declare pointer */
        $result = [];

        /** check if section match. */
        if ($data['statement'] === 'select') {
            /** fetch top stocks base on fundametal data. */
            $fundamental = DB::table('stock_trades')
                ->select('symbol', 'price', 'value', 'workingcapital', 'netincomeaftertax', 'debtassetratio', 'priceearningratio', 'netprofitmargin', 'returnonequity', 'dividendyield')
                ->where('value', '>', 0)
                ->where('workingcapital', '>', 0)
                ->where('netincomeaftertax', '>', 0)
                ->orderBy('netincomeaftertax', 'desc')
                ->limit(25)
                ->get()
                ->toArray();

            /** check if not empty. */
            if (count($fundamental) > 1) {
                /** then call helper to add standard format. */
                $result['fundamental'] = $this->helpers(['purpose' => 'format', 'source' => $fundamental]);
            } else {
                /** set to empty array. */
                $result['fundamental'] = [];
            }

            /** fetch top stocks base on fundametal data. */
            $technical = DB::table('stock_trades')
                ->join('stock_charts', 'stock_trades.symbol', '=', 'stock_charts.symbol')
                ->select('stock_trades.symbol', 'stock_trades.price', 'stock_trades.value', 'stock_trades.pricerange', 'supportlevel', 'resistancelevel', 'movingaverage', 'movingsignal')
                ->where('value', '>', 0)
                ->where('workingcapital', '>', 0)
                ->where('netincomeaftertax', '>', 0)
                ->orderBy('value', 'desc')
                ->limit(25)
                ->get()
                ->toArray();

            /** check if not empty. */
            if (count($technical) > 1) {
                /** then call helper to add standard format. */
                $result['technical'] = $this->helpers(['purpose' => 'format', 'source' => $technical]);
            } else {
                /** set to empty array. */
                $result['technical'] = [];
            }
        }

        return response(['message' => 'Please wait while we are processing your request.', 'fundamental' => $result['fundamental'], 'technical' => $result['technical']], 200);
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
