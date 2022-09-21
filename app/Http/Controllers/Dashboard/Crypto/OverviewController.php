<?php
namespace App\Http\Controllers\Dashboard\Crypto;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class OverviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function init(Request $request) {
        /** check if request contains method equal to post. */
        if ($request->method() === 'GET') {

            $portfolio['coin'] = DB::table('crypto_portfolios')->select('coin')
                ->where('order', '=', 'buy')
                ->where('userid', '=', Auth::id())
                ->distinct()
                ->count('coin');

            $portfolio['wallet'] = DB::table('crypto_portfolios')->select('wallet')
                ->where('order', '=', 'buy')
                ->where('userid', '=', Auth::id())
                ->distinct()
                ->count('wallet');

            $portfolio['capital'] = DB::table('crypto_portfolios')->select('capital')
                ->where('userid', '=', Auth::id())
                ->get()
                ->sum('capital');
            $portfolio['section'] = 'portfolio';

            $moon['count'] = DB::table('crypto_moons')->select('coin')
                ->where('userid', '=', Auth::id())
                ->distinct()
                ->count('coin');
            $moon['section'] = 'moon';

            $game['count'] = DB::table('crypto_games')->select('title')
                ->where('userid', '=', Auth::id())
                ->distinct()
                ->count('title');
            $game['section'] = 'game';

            $screen['count'] = DB::table('crypto_screens')->select('coin')
                ->where('userid', '=', Auth::id())
                ->distinct()
                ->count('coin');
            $screen['section'] = 'screen';

            return ['status' => true, 'message' => 'Summary of account records.', 'coin' => ['portfolios' => $portfolio, 'moons' => $moon, 'games' => $game, 'screens' => $screen]];
        }
    }
}
