<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Session;

class ProductController extends Controller
{
    public function allProducts(): Factory|View|Application
    {
        return view('home', [
            'products' => Product::all()
        ]);
    }

    public function addProduct($id): Factory|View|Application
    {
        if (Session::has('cart')) {
            if (!in_array($id, Session::get('cart'))) {
                Session::push('cart', $id);
            }
        } else {
            Session::put('cart', [$id]);
        }
        return view('cart');
    }
}
