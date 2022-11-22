<?php

use App\Http\Controllers\AdminProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
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
Route::get('/', [ProductController::class, 'index'])->name('index');
Route::get('/users', [UserController::class, 'index'])->name('users.index');
Route::post('/users', [UserController::class, 'store'])->name('users.store');
Route::put('/cart/{id}', [CartController::class, 'update'])->name('cart.update');
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy');
Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
//admin routes
Route::delete('/users', [UserController::class, 'destroy'])->name('users.destroy')->middleware('auth');
Route::get('/products', [AdminProductController::class, 'index'])->name('products.index')->middleware('auth');
Route::get('/products/{product}/edit', [AdminProductController::class, 'edit'])->name('products.edit')->middleware('auth');
Route::get('/products/create', [AdminProductController::class, 'create'])->name('products.create')->middleware('auth');
Route::post('/products', [AdminProductController::class, 'store'])->name('products.store')->middleware('auth');
Route::patch('/products/{product}',[AdminProductController::class,'update'])->name('products.update')->middleware('auth');
Route::delete('/products/{product}', [AdminProductController::class, 'destroy'])->name('products.destroy')->middleware('auth');
Route::get('/orders', [OrderController::class, 'index'])->name('orders.index')->middleware('auth');
Route::get('/order/{order}', [OrderController::class, 'show'])->name('orders.show')->middleware('auth');

