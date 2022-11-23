<?php

namespace App\Http\Controllers;

use App\Models\Order;

use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;


class OrderController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Order::all());
    }

    public function show(Order $order): View
    {
        return view('order', ['order' => $order]);
    }
}
