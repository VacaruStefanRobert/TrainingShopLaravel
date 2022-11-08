<?php

use App\Http\Controllers\OrderController;
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
//guest routes
Route::post('/add/{id}', [ProductController::class, 'addToCart'])->name('add')->middleware('guest');
Route::get('/login', [UserController::class, 'showLogin'])->name('login')->middleware('guest');
Route::get('/cart', [ProductController::class, 'showCart'])->name('cart')->middleware('guest');
Route::post('/remove/{id}', [ProductController::class, 'removeFromCart'])->name('remove')->middleware('guest');
Route::post('/login', [UserController::class, 'login'])->name('log')->middleware('guest');
Route::post('/storeAndMail', [OrderController::class, 'storeAndMail'])->name('storeAndMail')->middleware('guest');
//admin routes
Route::post('/logout', [UserController::class, 'logout'])->name('logout')->middleware('auth');
Route::get('/product/{product}', [ProductController::class, 'showEdit'])->name('product')->middleware('auth');
Route::delete('/eliminate/{product}', [ProductController::class, 'eliminate'])->name('eliminate')->middleware('auth');
Route::patch('/edit/{product}', [ProductController::class, 'edit'])->name('edit')->middleware('auth');
Route::get('/addProduct', [ProductController::class, 'showAddProduct'])->name('showAddProduct')->middleware('auth');
Route::post('/addProduct/add', [ProductController::class, 'addProduct'])->name('addProduct')->middleware('auth');
Route::get('/orders',[OrderController::class,'showOrders'])->name('orders')->middleware('auth');
Route::get('/order/{order}',[OrderController::class,'showOrder'])->name('order')->middleware('auth');

