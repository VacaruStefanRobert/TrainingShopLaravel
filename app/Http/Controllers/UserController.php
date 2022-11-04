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

    public function login(Request $request): Redirector|Application|RedirectResponse
    {
        $attributes = $request->validate([
                'name' => 'required',
                'password' => 'required'
            ]
        );
        if (auth()->attempt($attributes)) {
            session()->regenerate();
            return redirect('/');
        }
        return back()->withInput()->withErrors(['name' => 'Wrong credentials!']);
    }
    public function logout(): Redirector|Application|RedirectResponse
    {
        auth()->logout();
        return redirect('/');
    }

}
