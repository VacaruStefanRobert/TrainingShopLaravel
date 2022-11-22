<?php

namespace App\Http\Controllers;

use App\Models\Order;

use Illuminate\Contracts\View\View;


class OrderController extends Controller
{
    public function index(): View
    {
        return view('orders', ['orders' => Order::all()]);
    }

    public function show(Order $order): View
    {
        return view('order', ['order' => $order]);
    }
}
