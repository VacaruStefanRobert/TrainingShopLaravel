<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
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

Route::get('/', [ProductController::class, 'availableProducts'])->name('home');
Route::post('/add/{id}', [ProductController::class, 'addToCart'])->name('add')->middleware('guest');
Route::get('/login', [UserController::class, 'showLogin'])->name('login')->middleware('guest');
Route::get('/cart', [ProductController::class, 'showCart'])->name('cart')->middleware('guest');
Route::post('/remove/{id}', [ProductController::class, 'removeFromCart'])->name('remove')->middleware('guest');
Route::post('/login', [UserController::class, 'login'])->name('log')->middleware('guest');
Route::post('/logout', [UserController::class, 'logout'])->name('logout')->middleware('auth');
Route::get('/edit/{id}',[ProductController::class,'showEdit'])->name('edit')->middleware('auth');
Route::get('/eliminate/{id}',[ProductController::class,'eliminate'])->name('eliminate')->middleware('auth');
