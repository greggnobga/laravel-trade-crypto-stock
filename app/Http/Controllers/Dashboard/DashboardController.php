<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller {
    /**
     * Declare init function.
     */
    public function init(Request $request) {
        /** check if request contains method equal to post. */
        if ($request->method() === 'POST') {
            /** forward bluechip function. */
            if ($request->input('section') === 'bluechip' && $request->input('statement') === 'store') {
                return $this->bluechip($request->all());
            }

            if ($request->input('section') === 'bluechip' && $request->input('statement') === 'destroy') {
                return $this->bluechip($request->all());
            }

            /** forward edge  function. */
            if ($request->input('section') === 'edge' && $request->input('statement') === 'update') {
                return $this->edge($request->all());
            }
        }
        /** check if request contains method equal to get. */
        if ($request->method() === 'GET') {
            /** sentinel response. */
            if ($request->input('section') === 'sentinel') {
                return response(['message' => 'Token is valid.', 'valid' => true], 200);
            }

            /** forward blue function. */
            if ($request->input('section') === 'bluechip' && $request->input('statement') === 'select') {
                return $this->bluechip($request->all());
            }

            /** forward blue function. */
            if ($request->input('section') === 'edge' && $request->input('statement') === 'select') {
                return $this->edge($request->all());
            }

            /** forward gainers function. */
            if ($request->input('section') === 'gainers') {
                return $this->gainers($request->all());
            }

            /** forward lossers function. */
            if ($request->input('section') === 'lossers') {
                return $this->lossers($request->all());
            }
        }
    }

    /**
     * Declare bluechip function.
     */
    public function bluechip($data) {
        /** check if statement is select. */
        if ($data['statement'] === 'select') {
            /** get all bluechip stocks. */
            $bluehip = DB::table('stock_blues')
                ->select('symbol')
                ->where('userid', Auth::id())
                ->get();

            if (!is_null($bluehip)) {
                /** return something. */
                return response(['message' => 'Processed and displayed are all potential bluechip stocks that could be listed on the PSE.', 'stocks' => $bluehip], 200);
            } else {
                /** return something. */
                return response(['message' => 'There was no entry in the database.'], 200);
            }
        }

        /** check if statement is store. */
        if ($data['statement'] === 'store') {
            /** get all bluechip stocks. */
            $store = DB::table('stock_blues')
                ->select('symbol')
                ->where('userid', Auth::id())
                ->where('symbol', $data['symbol'])
                ->first();

            if (is_null($store)) {
                $insert = DB::table('stock_blues')
                    ->insert([
                        'userid' => Auth::id(),
                        'symbol' => strip_tags($data['symbol']),
                        'created_at' => date('Y-m-d H:i:s'),
                        'updated_at' => date('Y-m-d H:i:s'),
                    ]);
                if ($insert) {
                    /** return something. */
                    return response(['message' => $data['symbol'] . ' has been added to the database.'], 200);
                }
            } else {
                /** return something. */
                return response(['message' => 'The stock ' . $data['symbol'] . ' already exists in the database.'], 200);
            }
        }

        /** check if statement is select. */
        if ($data['statement'] === 'destroy') {
            /** get all bluechip stocks. */
            $destroy = DB::table('stock_blues')
                ->select('symbol')
                ->where('userid', Auth::id())
                ->where('symbol', $data['symbol'])
                ->first();

            if (!is_null($destroy)) {
                /** delete record. */
                $delete = DB::table('stock_blues')
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
            } else {
                /** return something. */
                return response(['message' => 'There was no entry in the database.'], 200);
            }
        }
    }

    /**
     * Declare edge function.
     */
    public function edge($data) {
        /** query logged user role. */
        $admin = DB::table('users')
            ->select('role')
            ->where('id', Auth::id())
            ->first();

        /** check if statement is select. */
        if ($data['statement'] === 'select') {
            /** check if user found. */
            if (!is_null($admin)) {
                /** if role is admin then proceed. */
                if ($admin->role === 'admin') {
                    /** get all bluechip stocks. */
                    $stocks = DB::table('stock_trades')
                        ->select('symbol')
                        ->where('edge', '=', 0)
                        ->get();
                    if (!is_null($stocks)) {
                        /** return something. */
                        return response(['message' => 'Processed and displayed are all stocks that have yet to be set with an edge ID.', 'stocks' => $stocks], 200);
                    } else {
                        /** return something. */
                        return response(['message' => 'There was no entry in the database.'], 200);
                    }
                }
            } else {
                /** return something. */
                return response(['message' => 'No logged user found.'], 200);
            }
        }

        if ($data['statement'] === 'update') {
            if (!is_null($admin)) {
                /** fetch symbol and name. */
                $update = DB::table('stock_trades')
                    ->select('symbol')
                    ->where('symbol', $data['symbol'])
                    ->first();

                /** insert with appropriate data. */
                if (!is_null($update)) {
                    $statement = DB::table('stock_trades')
                        ->where('symbol', $data['symbol'])
                        ->update([
                            'edge' => strip_tags($data['edge']),
                            'updated_at' => date('Y-m-d H:i:s'),
                        ]);
                    if ($statement) {
                        /** return success message. */
                        return ['message' => 'The ' . $data['symbol'] . ' information was successfully updated.'];
                    }
                } else {
                    /** return error message. */
                    return ['message' => 'No modifications were made to the ' . $data['symbol'] . ' data.'];
                }
            } else {
                /** return if logged user is not admin */
                return response(['message' => 'No logged user found.'], 200);
            }
        }
    }

    /**
     * Declare stock gainers function.
     */
    public function gainers() {
        /** query logged user role. */
        $check = DB::table('stock_trades')
            ->select('symbol')
            ->where('symbol', 'PSE')
            ->first();

        if (!is_null($check)) {
            /** create stock list. */
            $gainers = DB::table('stock_trades')
                ->select('symbol', 'price', 'change', 'pricerange')
                ->where('edge', '!=', -1)
                ->where('change', '>', 0)
                ->orderBy('change', 'desc')
                ->limit(25)
                ->get();

            /** return if logged user is not admin */
            return response(['message' => 'The stocks that have gained the most since the last update are processed and displayed.', 'stocks' => $gainers], 200);
        } else {
            /** return if logged user is not admin */
            return response(['message' => 'There was no entry in the database.'], 200);
        }
    }

    /**
     * Declare stock lossers function.
     */
    public function lossers() {
        /** query logged user role. */
        $check = DB::table('stock_trades')
            ->select('symbol')
            ->where('symbol', 'PSE')
            ->first();

        if (!is_null($check)) {
            /** create stock list. */
            $gainers = DB::table('stock_trades')
                ->select('symbol', 'price', 'change', 'pricerange')
                ->where('edge', '!=', -1)
                ->where('change', '<', 0)
                ->orderBy('change', 'asc')
                ->limit(25)
                ->get();

            /** return if logged user is not admin */
            return response(['message' => 'The stocks that have lost the most since the last update are processed and displayed.', 'stocks' => $gainers], 200);
        } else {
            /** return if logged user is not admin */
            return response(['message' => 'There was no entry in the database.'], 200);
        }
    }
}
