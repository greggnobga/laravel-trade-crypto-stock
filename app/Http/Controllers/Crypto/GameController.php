<?php
namespace App\Http\Controllers\Crypto;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class GameController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function init(Request $request)
    {
        return ['status' => true, 'message' => 'This is test message.', 'coin' => []];
    }
}
