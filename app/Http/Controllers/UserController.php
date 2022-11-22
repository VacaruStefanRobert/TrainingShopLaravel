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
    public function index(): View
    {
        return view('login');
    }

    public function store(Request $request): Redirector|RedirectResponse
    {
        $attributes = $request->validate([
                'name' => ['required','max:255'],
                'password' => 'required'
            ]
        );
        if (auth()->attempt($attributes)) {
            session()->regenerate();
            return redirect(route('products.index'));
        }
        return back()->withInput()->withErrors(['errors' => 'Wrong credentials!']);
    }

    public function destroy(): Redirector|RedirectResponse
    {
        auth()->logout();
        return redirect(route('index'));
    }

}
