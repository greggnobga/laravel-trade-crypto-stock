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
            /** forward insert command. */
            if ($request->input('section') === 'bluechip' && $request->input('statement') === 'store') {
                // return $this->store(['table' => $request->input('table'), 'input' => $request->input('input')]);
            }
        }
        /** check if request contains method equal to get. */
        if ($request->method() === 'GET') {
            /** forward blue command. */
            if ($request->input('section') === 'bluechip' && $request->input('statement') === 'select') {
                return $this->bluechip($request->all());
            }

            /** forward blue command. */
            if ($request->input('section') === 'edge' && $request->input('statement') === 'select') {
                return $this->edge($request->all());
            }
        }
    }

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
    }

    public function edge($data) {
        /** check if statement is select. */
        if ($data['statement'] === 'select') {
            /** query logged user role. */
            $admin = DB::table('users')
                ->select('role')
                ->where('id', Auth::id())
                ->first();

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
    }
}
