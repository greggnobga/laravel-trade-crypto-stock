<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller {
    /**
     * Declare init function.
     */
    public function init() {
        if (Auth::id()) {
            return response(['response' => 'Test init response from dashboard controller.']);
        } else {
            return redirect('/login');
        }
    }
}
