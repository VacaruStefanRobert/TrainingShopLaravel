<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;

class UserController extends Controller
{
    //
    public function showLogin(): Factory|View|Application
    {
        return view('login');
    }

    public function login(Request $request)
    {
        $attributes = $request->validate([
                'name' => 'required',
                'password' => 'required'
            ]
        );
        if (auth()->attempt($attributes)) {
            session()->regenerate();
            return response()->json([
                'message'=>'Success!'
            ]);
        }
        return response()->json([
            'message'=>'Failed!'
        ]);
    }

    public function logout(): Redirector|Application|RedirectResponse
    {
        auth()->logout();
        return redirect('/');
    }

}
