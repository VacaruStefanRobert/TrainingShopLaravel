<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function availableProducts(): Factory|View|Application
    {
        //verify if your session is created / is not empty and if you're not connected as admin
        if (Session::has('cart') and !empty(Session::get('cart')) and !Auth::check()) {
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

    public function showEdit(Product $product): Factory|View|Application
    {
        return view('product', [
                'product' => $product
            ]
        );
    }

    public function edit(Request $request, Product $product): Redirector|Application|RedirectResponse
    {
        $attributes = $request->validate(
            [
                'title' => ['required','max:255'],
                'description' => 'required',
                'price' => 'required',
                'image' => ['required', 'mimes:jpg,jpeg,png,gif,pfif']
            ]
        );
        $attributes['image'] = $request->file('image')->getClientOriginalName();
        $this->removeImage("/public/images/$product->image");
        $this->storeImage($request);
        if ($product->update($attributes)) {
            return redirect('/');
        } else {
            return back()->withErrors(['errors' => 'Please give an input for every field!']);
        }
    }

    public function eliminate(Product $product): Redirector|Application|RedirectResponse
    {
        $this->removeImage("/public/images/$product->image");
        $product->delete();
        return redirect('/');
    }

    public function removeImage($path)
    {
        Storage::delete($path);
    }

    public function showAddProduct(): Factory|View|Application
    {
        return view('product');
    }

    public function addProduct(Request $request): Redirector|Application|RedirectResponse
    {
        $attributes = $request->validate(
            [
                'title' => ['required','max:255'],
                'description' => 'required',
                'price' => 'required',
                'image' => ['required', 'mimes:jpg,jpeg,png,gif,pfif']
            ]
        );
        $attributes['image'] = $request->file('image')->getClientOriginalName();
        $this->storeImage($request);
        Product::query()->create($attributes);
        return redirect('/');
    }

    public function storeImage($request)
    {
        if ($request->hasFile('image')) {
            $request->file('image')->storeAs('images', $request->file('image')->getClientOriginalName(), 'public');
        }
    }

}
