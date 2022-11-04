<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Session;

class ProductController extends Controller
{
    public function availableProducts(): Factory|View|Application
    {
        if (Session::has('cart') and !empty(Session::get('cart'))) {
            return view('home', [
                'products' => Product::query()->whereNotIn('id', Session::get('cart'))->get()
            ]);
        } else {
            return view('home', [
                'products' => Product::all()
            ]);
        }
    }

    public function addToCart($id): Redirector|Application|RedirectResponse
    {
        if (Session::has('cart')) {
            Session::push('cart', $id);
        } else {
            Session::put('cart', [$id]);
        }
        return redirect('/cart');
    }

    public function showCart(): Factory|View|Application
    {
        if (!empty(Session::get('cart')) and Session::has('cart')) {
            $products = Product::query()->whereIn('id', Session::get('cart'))->get();

            $totalPrice = 0;
            foreach ($products as $product) {
                $totalPrice += $product->price;
            }

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

    public function removeFromCart($id): Redirector|Application|RedirectResponse
    {
        $cart = Session::get('cart');
        Session::forget('cart');
        unset($cart[array_search($id, $cart)]);
        Session::put('cart', $cart);
        return redirect('/cart');
    }

    public function showEdit($id): Factory|View|Application
    {
        return view('edit', [
                'product' => Product::query()->where('id', $id)->get()
            ]
        );
    }
}
