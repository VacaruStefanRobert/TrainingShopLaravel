<?php

namespace App\Http\Controllers;

use App\Mail\OrderShipped;
use App\Models\Order;
use App\Models\OrderProduct;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;

class CheckoutController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $attributes = $request->validate(
            [
                'name' => ['required', 'max:255'],
                'email' => ['required', 'email:rfc,dns'],
                'comments' => 'required',
                'total' => 'required'
            ]
        );
        $order = Order::query()->create($attributes);
        $products = Session::get('cart');
        foreach ($products as $id) {
            OrderProduct::query()->create(['product_id' => $id, 'order_id' => $order->id]);
        }
        //mail the manager
        Mail::to('manager@example.com')->send(new OrderShipped());
        //unset the session
        Session::forget('cart');
        return response()->json([
            'message' => 'Success!'
        ]);
    }
}
