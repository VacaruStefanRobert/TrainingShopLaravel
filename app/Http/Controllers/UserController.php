<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(): View
    {
        return view('login');
    }

    public function store(Request $request): JsonResponse
    {
        $attributes = $request->validate([
                'name' => ['required', 'max:255'],
                'password' => 'required'
            ]
        );
        if (auth()->attempt($attributes)) {
            session()->regenerate();
            return response()->json([
                'message' => 'Success!'
            ]);
        }
        return response()->json([
            'message' => 'Failed!'
        ]);
    }

    public function destroy(): JsonResponse
    {
        auth()->logout();
        return response()->json([
            'message' => 'Success!'
        ]);
    }

}
