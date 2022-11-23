<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Session;


class ProductController extends Controller
{
    public function index(): JsonResponse
    {
        //verify if your session is created / is not empty
        if (Session::has('cart')) {
            return response()->json(Product::query()->whereNotIn('id', Session::get('cart'))->get());
        } else {
            return response()->json(Product::all());
        }
    }
}
