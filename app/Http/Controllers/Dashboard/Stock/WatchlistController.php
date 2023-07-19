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
            /** forward buld command. */
            if ($request->input('section') === 'build') {
                return $this->build();
            }

            /** forward fetch command. */
            if ($request->input('section') === 'fetch') {
                return $this->fetch();
            }
        }
    }

    /**
     * Build watchlist.
     */
    public function build() {
        /** repository. */
        $response = [];

        /** fetch unique sector. */
        $sectors =  DB::table('stock_trades')
            ->select('sector')
            ->get()
            ->unique();

        if (!is_null($sectors)) {
            /** search record by sector. */
            foreach ($sectors as $value) {
                if ($value->sector == 'miningandoil') {
                    /** fetch stocks. */
                    $sector['miningandoils'] = DB::table('stock_trades')
                        ->select('symbol', 'sector', 'price', 'value', 'pricerange', 'totalassets', 'netincomeaftertax', 'debtequityratio', 'dividendyield')
                        ->where('sector', '=', $value->sector)
                        ->where('netincomeaftertax', '>', 0)
                        ->orderBy('netincomeaftertax', 'desc')
                        ->get()
                        ->toArray();

                    /** resequence array keys. */
                    $sector['miningandoils'] = array_values($sector['miningandoils']);

                    /** Call helper function. */
                    $response['miningandoils'] = $this->helpers(['purpose' => 'format', 'source' => $sector['miningandoils']]);
                }

                if ($value->sector == 'holdingfirms') {
                    /** fetch stocks. */
                    $sector['holdingfirms'] = DB::table('stock_trades')
                        ->select('symbol', 'price', 'value', 'pricerange', 'totalassets', 'netincomeaftertax', 'debtequityratio', 'dividendyield')
                        ->where('sector', '=', $value->sector)
                        ->where('netincomeaftertax', '>', 0)
                        ->orderBy('netincomeaftertax', 'desc')
                        ->get()
                        ->toArray();

                    /** resequence array keys. */
                    $sector['holdingfirms'] = array_values($sector['holdingfirms']);

                    /** Call helper function. */
                    $response['holdingfirms'] = $this->helpers(['purpose' => 'format', 'source' => $sector['holdingfirms']]);
                }

                if ($value->sector == 'services') {
                    /** fetch stocks. */
                    $sector['services'] = DB::table('stock_trades')
                        ->select('symbol', 'price', 'value', 'pricerange', 'totalassets', 'netincomeaftertax', 'debtequityratio', 'dividendyield')
                        ->where('sector', '=', $value->sector)
                        ->where('netincomeaftertax', '>', 0)
                        ->orderBy('netincomeaftertax', 'desc')
                        ->get()
                        ->toArray();

                    /** resequence array keys. */
                    $sector['services'] = array_values($sector['services']);

                    /** Call helper function. */
                    $response['services'] = $this->helpers(['purpose' => 'format', 'source' => $sector['services']]);
                }

                if ($value->sector == 'industrial') {
                    /** fetch stocks. */
                    $sector['industrials'] = DB::table('stock_trades')
                        ->select('symbol', 'price', 'value', 'pricerange', 'totalassets', 'netincomeaftertax', 'debtequityratio', 'dividendyield')
                        ->where('sector', '=', $value->sector)
                        ->where('netincomeaftertax', '>', 0)
                        ->orderBy('netincomeaftertax', 'desc')
                        ->get()
                        ->toArray();

                    /** resequence array keys. */
                    $sector['industrials '] = array_values($sector['industrials']);

                    /** Call helper function. */
                    $response['industrials'] = $this->helpers(['purpose' => 'format', 'source' => $sector['industrials']]);
                }

                if ($value->sector == 'property') {
                    /** fetch stocks. */
                    $sector['properties'] = DB::table('stock_trades')
                        ->select('symbol', 'price', 'value', 'pricerange', 'totalassets', 'netincomeaftertax', 'debtequityratio', 'dividendyield')
                        ->where('sector', '=', $value->sector)
                        ->where('netincomeaftertax', '>', 0)
                        ->orderBy('netincomeaftertax', 'desc')
                        ->get()
                        ->toArray();

                    /** resequence array keys. */
                    $sector['properties'] = array_values($sector['properties']);

                    /** Call helper function. */
                    $response['properties'] = $this->helpers(['purpose' => 'format', 'source' => $sector['properties']]);
                }

                if ($value->sector == 'financials') {
                    /** fetch stocks. */
                    $sector['financials'] = DB::table('stock_trades')
                        ->select('symbol', 'price', 'value', 'pricerange', 'totalassets', 'netincomeaftertax', 'debtequityratio', 'dividendyield')
                        ->where('sector', '=', $value->sector)
                        ->where('netincomeaftertax', '>', 0)
                        ->orderBy('netincomeaftertax', 'desc')
                        ->get()
                        ->toArray();

                    /** resequence array keys. */
                    $sector['financials'] = array_values($sector['financials']);

                    /** call helper function. */
                    $response['financials'] = $this->helpers(['purpose' => 'format', 'source' => $sector['financials']]);
                }

                if ($value->sector == 'smallmediumemergingboard') {
                    /** fetch stocks. */
                    $sector['smallmediumemergingboards'] = DB::table('stock_trades')
                        ->select('symbol', 'price', 'value', 'pricerange', 'totalassets', 'netincomeaftertax', 'debtequityratio', 'dividendyield')
                        ->where('sector', '=', $value->sector)
                        ->where('netincomeaftertax', '>', 0)
                        ->orderBy('netincomeaftertax', 'desc')
                        ->get()
                        ->toArray();

                    /** resequence array keys. */
                    $sector['smallmediumemergingboards'] = array_values($sector['smallmediumemergingboards']);

                    /** call helper function. */
                    $response['smallmediumemergingboards'] = $this->helpers(['purpose' => 'format', 'source' => $sector['smallmediumemergingboards']]);
                }

                if ($value->sector == 'etf') {
                    /** fetch stocks. */
                    $sector['exchangetradedfunds'] = DB::table('stock_trades')
                        ->select('symbol', 'price', 'value', 'pricerange', 'totalassets', 'netincomeaftertax', 'debtequityratio', 'dividendyield')
                        ->where('sector', '=', $value->sector)
                        ->where('netincomeaftertax', '>', 0)
                        ->orderBy('netincomeaftertax', 'desc')
                        ->get()
                        ->toArray();

                    /** resequence array keys. */
                    $sector['exchangetradedfunds'] = array_values($sector['exchangetradedfunds']);

                    /** Call helper function. */
                    $response['exchangetradedfunds'] = $this->helpers(['purpose' => 'format', 'source' => $sector['exchangetradedfunds']]);
                }
            }

            /** return something. */
            return response(['message' => 'Please wait while we process your request.', 'stocks' => $response], 200);
        } else {
            /** return something. */
            return response(['message' => 'There were no records discovered.'], 200);
        }
    }

    /**
     * Store watchlist.
     */
    public function store($data) {
        /** check if record exists. */
        $check =  DB::table('stock_watchlists')
            ->select('symbol')
            ->where('userid', Auth::id())
            ->where('symbol', $data['symbol'])
            ->first();

        /** if null do something. */
        if (is_null($check)) {
            $insert = DB::table('stock_watchlists')
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
    public function fetch() {
        /** repository. */
        $response = [];
        /** fetch unique sector. */
        $watchlist =  DB::table('stock_watchlists')
            ->select('symbol')
            ->where('userid', Auth::id())
            ->get();

        /** check if sectors is not empty. */
        if (!is_null($watchlist)) {
            foreach ($watchlist as $key => $value) {
                /** loop through watchlist. */
                $items = DB::table('stock_trades')
                    ->select('symbol', 'price', 'value', 'pricerange', 'totalassets', 'netincomeaftertax', 'debtequityratio', 'dividendyield')
                    ->where('symbol', '=', $value->symbol)
                    ->first();

                /** save to reponse pointer. */
                $response[$key] = $items;
            }

            /** resequence array keys. */
            $response = array_values($response);

            /** Call helper function. */
            $response = $this->helpers(['purpose' => 'format', 'source' => $response]);

            /** return something. */
            return response(['message' => 'Please wait while we process your request.', 'stocks' => $response], 200);
        } else {
            /** return something. */
            return response(['message' => 'There were no records discovered.'], 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($data) {
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
