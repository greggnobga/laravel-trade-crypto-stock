<?php
namespace App\Http\Controllers\Dashboard\Stock;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class OverviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function init(Request $request) {
        /** check if request contains method equal to post. */
        if ($request->method() === 'GET') {
            /** count portfolio record. */
            $portfolio['hold'] = DB::table('stock_portfolios')->select('symbol')
                ->where('order', '=', 'buy')
                ->where('userid', '=', Auth::id())
                ->distinct()
                ->count('symbol');
            $portfolio['capital'] = DB::table('stock_portfolios')->select('capital')
                ->where('userid', '=', Auth::id())
                ->get()
                ->sum('capital');
            $portfolio['section'] = 'portfolio';

            /** count watchlist record. */
            $watchlist['count'] = DB::table('stock_watchlists')->select('symbol')
                ->where('userid', '=', Auth::id())
                ->distinct()
                ->count('symbol');
            $watchlist['section'] = 'watchlist';
            
            /** count trade record. */
            $trade['count'] = DB::table('stock_trades')->select('symbol')
                ->distinct()
                ->count('symbol');
            $trade['section'] = 'trade';

            /** count note record. */
            $note['count'] = DB::table('stock_notes')->select('note')
                ->where('userid', '=', Auth::id())
                ->distinct()
                ->count('note');
            $note['section'] = 'note';

            /** return something. */
            return ['status' => true, 'message' => 'Summary of account records.', 'stock' => ['portfolios' => $portfolio, 'watchlists' => $watchlist, 'trades' => $trade, 'notes' => $note]];
        }
    }
}
