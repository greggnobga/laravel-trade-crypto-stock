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

Route::group(['middleware' => 'api'], function () {
    Route::post('/register', [App\Http\Controllers\Auth\AuthController::class, 'register'])->name('register');
    Route::post('/login', [App\Http\Controllers\Auth\AuthController::class, 'login'])->name('login');
    Route::post('/reset', [App\Http\Controllers\Auth\AuthController::class, 'reset'])->name('reset');
    Route::post('/verify', [App\Http\Controllers\Auth\AuthController::class, 'verify'])->name('verify');
});

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('/resend', [App\Http\Controllers\Auth\AuthController::class, 'resend'])->name('resend');
    Route::post('/logout', [App\Http\Controllers\Auth\AuthController::class, 'logout'])->name('logout');

    Route::get('/dashboard', [App\Http\Controllers\Dashboard\DashboardController::class, 'init'])->name('init');

    Route::post('/stock-trade-store', [App\Http\Controllers\Dashboard\Stock\TradeController::class, 'init']);
    Route::get('/stock-trade-retrieve', [App\Http\Controllers\Dashboard\Stock\TradeController::class, 'init']);

    Route::post('/stock-watchlist-store', [App\Http\Controllers\Dashboard\Stock\WatchlistController::class, 'init']);
    Route::get('/stock-watchlist-retrieve', [App\Http\Controllers\Dashboard\Stock\WatchlistController::class, 'init']);

    Route::post('/stock-portfolio-store', [App\Http\Controllers\Dashboard\Stock\PortfolioController::class, 'init']);
    Route::get('/stock-portfolio-retrieve', [App\Http\Controllers\Dashboard\Stock\PortfolioController::class, 'init']);
});

// Route::group(['middleware' => 'auth:sanctum'], function () {
    // Route::post('/crypto-portfolio-store', [App\Http\Controllers\Dashboard\Crypto\PortfolioController::class, 'init']);
    // Route::get('/crypto-portfolio-retrieve', [App\Http\Controllers\Dashboard\Crypto\PortfolioController::class, 'init']);

    // Route::post('/crypto-moon-store', [App\Http\Controllers\Dashboard\Crypto\MoonController::class, 'init']);
    // Route::get('/crypto-moon-retrieve', [App\Http\Controllers\Dashboard\Crypto\MoonController::class, 'init']);

    // Route::post('/crypto-game-store', [App\Http\Controllers\Dashboard\Crypto\GameController::class, 'init']);
    // Route::get('/crypto-game-retrieve', [App\Http\Controllers\Dashboard\Crypto\GameController::class, 'init']);

    // Route::post('/crypto-screen-store', [App\Http\Controllers\Dashboard\Crypto\ScreenController::class, 'init']);
    // Route::get('/crypto-screen-retrieve', [App\Http\Controllers\Dashboard\Crypto\ScreenController::class, 'init']);

    // Route::post('/crypto-overview-store', [App\Http\Controllers\Dashboard\Crypto\OverviewController::class, 'init']);
    // Route::get('/crypto-overview-retrieve', [App\Http\Controllers\Dashboard\Crypto\OverviewController::class, 'init']);

    // Route::post('/stock-note-store', [App\Http\Controllers\Dashboard\Stock\NoteController::class, 'init']);
    // Route::get('/stock-note-retrieve', [App\Http\Controllers\Dashboard\Stock\NoteController::class, 'init']);

    // Route::post('/stock-overview-store', [App\Http\Controllers\Dashboard\Stock\OverviewController::class, 'init']);
    // Route::get('/stock-overview-retrieve', [App\Http\Controllers\Dashboard\Stock\OverviewController::class, 'init']);
// });
