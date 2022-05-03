<?php
namespace App\Http\Controllers\Dashboard\Crypto;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\View;

class ScreenController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return View::make('test')->with('name', 'John Smith')->with('user', 'Jane Smith');
    }
}
