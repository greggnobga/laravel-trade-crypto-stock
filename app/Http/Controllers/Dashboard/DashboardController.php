<?php

namespace App\Http\Controllers\Dashboard;

    use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    /**
     * Declare init function.
     */
    public function init()
    {
        return response(['response' => 'Test init response from dashboard controller.']);
    }
}
