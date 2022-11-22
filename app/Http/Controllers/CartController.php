<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
    public function update($id): Redirector|RedirectResponse
    {
        //validate id if it exist in database and is not already in cart
        if (Product::query()->where('id', '=', $id)->first() === null || array_search($id, Session::get('cart', function () {
                return [];
            }))) {
            return redirect(route('index'));
        }
        if (Session::has('cart')) {
            Session::push('cart', $id);
        } else {
            Session::put('cart', [$id]);
        }
        return redirect(route('cart.index'));
    }

    public function index(): View
    {
        if (!empty(Session::get('cart')) && Session::has('cart')) {
            $products = Product::query()->whereIn('id', Session::get('cart'))->get();
            $totalPrice = $products->sum('price');

            return view('cart', [
                "products" => $products,
                "totalPrice" => $totalPrice
            ]);
        } else {
            return view('cart', [
                "products" => []
            ]);
        }
    }

    public function destroy($id): RedirectResponse|Redirector
    {
        $cart = Session::get('cart');
        $cart = array_filter($cart, function ($value) use ($id) {
            return $value !== $id;
        });
        Session::forget('cart');
        Session::put('cart', $cart);
        return redirect(route('cart.index'));
    }
}
