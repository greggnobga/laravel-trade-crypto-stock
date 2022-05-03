<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\View;

class DashboardController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function init()
    {
        return View::make('dashboard.dashboard')->with('Jane', 'Smith');
    }

    public function user() {
        return ['user' => 'User information.'];
    }

    public function test() {
        return ['test' => 'Test response.'];
    }
 }
