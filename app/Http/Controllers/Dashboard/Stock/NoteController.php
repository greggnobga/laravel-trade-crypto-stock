<?php
namespace App\Http\Controllers\Dashboard\Stock;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class NoteController extends Controller {
     /**
   * Display a listing of the resource.
   */
    public function init(Request $request) {
        
        return ['status' => true, 'message' => 'This is test response', 'data' => ''];

    }
}
