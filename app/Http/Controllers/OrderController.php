<?php

namespace App\Http\Controllers;

use App\Mail\OrderShipped;
use App\Models\Order;
use App\Models\OrderProduct;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;


class OrderController extends Controller
{
    public function storeAndMail(Request $request): Redirector|Application|RedirectResponse
    {
        $attributes = $request->validate(
            [
                'name' => 'required',
                'email' => 'required',
                'comments' => 'required',
                'price' => 'required'
            ]
        );
        $order = Order::query()->create($attributes)->get()->last();
        $products = Session::get('cart');
        foreach ($products as $id) {
            OrderProduct::query()->create(['product_id' => $id, 'order_id' => $order->id]);
        }

        //mail the manager
        Mail::to('manager@example.com')->send(new OrderShipped());
        //unset the session
        Session::forget('cart');
        return redirect('/');
    }

    public function showOrders(): Factory|View|Application
    {
        return view('orders', ['orders' => Order::all()]);
    }
    public function showOrder(Order $order): Factory|View|Application
    {
        return view('order', ['order' => $order]);
    }
}
