<?php
namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AppController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function init() {

        $result['unset'] = '';

        $unset = DB::table('stock_trades')
            ->select('symbol')
            ->where('edge', '=', '0')
            ->get()
            ->unique()
            ->toArray();
        
        foreach($unset as $key => $value) {
            $result['unset'] .= $value->symbol . ' ';
        }
        
       $result['shortlist'] = '';
    
        $shortlist = DB::table('stock_trades')
            ->select('symbol')
            ->where('incomeaftertax', '>', '1')
            ->get()
            ->unique()
            ->toArray();

        foreach($shortlist as $key => $value) {
            $result['shortlist'] .= $value->symbol . ' ';
        }

       return $result;
    }
}
