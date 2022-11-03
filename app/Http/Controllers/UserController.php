<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //
    public function showLogin(): Factory|View|Application
    {
        return view('login');
    }

    public function login(Request $request)
    {
//        if ($request->input('name')==config('constants.admin.ADMINNAME') and $request->filled('name')) {
//                auth()->attempt()
//        }
    }
}
