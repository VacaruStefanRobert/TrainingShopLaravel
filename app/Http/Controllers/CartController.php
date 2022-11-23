<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
    public function update($id): JsonResponse
    {
        //validate id if it exist in database and is not already in cart
        if (Product::query()->where('id', '=', $id)->first() === null || array_search($id, Session::get('cart', function () {
                return [];
            }))) {
            return response()->json('Error!');
        }
        if (Session::has('cart')) {
            Session::push('cart', $id);
        } else {
            Session::put('cart', [$id]);
        }
        return response()->json([
            'message' => 'Success!'
        ]);
    }

    public function index(): JsonResponse
    {
        if (!empty(Session::get('cart')) && Session::has('cart')) {
            $products = Product::query()->whereIn('id', Session::get('cart'))->get();
            $totalPrice = $products->sum('price');

            return response()->json([
                "products" => $products,
                "totalPrice" => $totalPrice
            ]);
        } else {
            return response()->json([
                "products" => []
            ]);
        }
    }

    public function destroy($id): JsonResponse
    {
        $cart = Session::get('cart');
        $cart = array_filter($cart, function ($value) use ($id) {
            return $value !== $id;
        });
        Session::forget('cart');
        Session::put('cart', $cart);
        return response()->json([
            'message' => 'Success!'
        ]);
    }
}
