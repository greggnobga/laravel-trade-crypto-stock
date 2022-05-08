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
    public function init(Request $request) {
        $result = Auth::id();
        if ($result) {
            return array(['status' => true, 'message' => 'Test response message.', 'coin' => $result]);
        }
    }
}
