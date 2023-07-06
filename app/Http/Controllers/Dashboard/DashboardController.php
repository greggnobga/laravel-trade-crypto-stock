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
            return response(['message' => 'Test init response from dashboard controller.'], 200);
        } else {
            return response(['message' => 'Encountered something unknown..'], 401);
        }
    }
}
