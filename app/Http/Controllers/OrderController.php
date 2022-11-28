<?php

namespace App\Http\Controllers;

use App\Models\Order;

use Illuminate\Http\JsonResponse;

class OrderController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Order::all());
    }

    public function show(Order $order): JsonResponse
    {
        return response()->json(['order' => $order,
            'products'=>$order->products
            ]);
    }
}
