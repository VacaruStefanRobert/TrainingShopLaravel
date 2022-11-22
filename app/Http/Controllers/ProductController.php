<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Session;


class ProductController extends Controller
{
    public function index(): View
    {
        //verify if your session is created / is not empty
        if (Session::has('cart')) {
            return view('home', [
                'products' => Product::query()->whereNotIn('id', Session::get('cart'))->get()
            ]);
        } else {
            return response()->json(Product::all());
        }
    }
}
