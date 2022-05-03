<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['middleware' => 'web'], function() {
    Route::get('/', [App\Http\Controllers\App\AppController::class, 'init']);

    Route::get('/screen', [App\Http\Controllers\App\ScreenController::class, 'init']);

    Route::get('/game', [App\Http\Controllers\App\GameController::class, 'init']);

    Route::get('/moon', [App\Http\Controllers\App\MoonController::class, 'init']);
});

Route::group(['middleware' => 'auth'], function() {
    Route::get('/dashboard', [App\Http\Controllers\Dashboard\DashboardController::class, 'init']);
});
