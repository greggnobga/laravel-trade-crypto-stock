<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'auth:sanctum'], function() {
    Route::get('/user', [App\Http\Controllers\Dashboard\DashboardController::class, 'user']);
    Route::get('/test', [App\Http\Controllers\Dashboard\DashboardController::class, 'test']);

    Route::post('/crypto-portfolio-store', [App\Http\Controllers\Dashboard\Crypto\PortfolioController::class, 'init']);
    Route::get('/crypto-portfolio-retrieve', [App\Http\Controllers\Dashboard\Crypto\PortfolioController::class, 'init']);

    Route::post('/crypto-moon-store', [App\Http\Controllers\Dashboard\Crypto\MoonController::class, 'init']);
    Route::get('/crypto-moon-retrieve', [App\Http\Controllers\Dashboard\Crypto\MoonController::class, 'init']);

    Route::post('/crypto-game-store', [App\Http\Controllers\Dashboard\Crypto\GameController::class, 'init']);
    Route::get('/crypto-game-retrieve', [App\Http\Controllers\Dashboard\Crypto\GameController::class, 'init']);

    Route::post('/crypto-screen-store', [App\Http\Controllers\Dashboard\Crypto\ScreenController::class, 'init']);
    Route::get('/crypto-screen-retrieve', [App\Http\Controllers\Dashboard\Crypto\ScreenController::class, 'init']);

    Route::post('/crypto-overview-store', [App\Http\Controllers\Dashboard\Crypto\OverviewController::class, 'init']);
    Route::get('/crypto-overview-retrieve', [App\Http\Controllers\Dashboard\Crypto\OverviewController::class, 'init']);

    Route::post('/stock-portfolio-store', [App\Http\Controllers\Dashboard\Stock\PortfolioController::class, 'init']);
    Route::get('/stock-portfolio-retrieve', [App\Http\Controllers\Dashboard\Stock\PortfolioController::class, 'init']);

    Route::post('/stock-trade-store', [App\Http\Controllers\Dashboard\Stock\TradeController::class, 'init']);
    Route::get('/stock-trade-retrieve', [App\Http\Controllers\Dashboard\Stock\TradeController::class, 'init']);
});
