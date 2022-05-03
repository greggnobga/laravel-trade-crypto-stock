<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\View;

class AppController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function init() {

        return View::make('app.app');
    }
}
