<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Storage;
use Illuminate\View\View;

class AdminProductController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            Product::all()
        );
    }

    public function edit(Product $product): JsonResponse
    {
        return response()->json([
            'product' => $product
        ]);
    }

    public function create(): View
    {
        return view('product');
    }

    public function destroy(Product $product): JsonResponse
    {
        Storage::delete('/public/images/' . $product->image);
        $product->delete();
        return response()->json([
            'message' => 'Success!'
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $attributes = $request->validate(
            [
                'title' => ['required', 'max:255'],
                'description' => 'required',
                'price' => 'required',
                'image' => ['required', 'mimes:jpg,jpeg,png,gif,pfif']
            ]
        );
        $attributes['image'] = $request->file('image')->getClientOriginalName();
        if (!Storage::exists('public/images/' . $request->file('image')->getClientOriginalName())) {
            $this->storeImage($request->file('image'), $request->file('image')->getClientOriginalName());
        } else {
            return response()->json([
                'errors' => 'A product already exists with this image!'
            ]);
        }
        Product::query()->create($attributes);
        return response()->json([
            'message' => 'Success!'
        ]);
    }

    public function update(Request $request, Product $product): JsonResponse
    {
        $attributes = $request->validate(
            [
                'title' => ['required', 'max:255'],
                'description' => 'required',
                'price' => 'required',
                'image' => ['mimes:jpg,jpeg,png,gif,pfif']
            ]
        );
        if ($request->hasFile('image')) {
            $attributes['image'] = $request->file('image')->getClientOriginalName();
            Storage::delete('/public/images/' . $product->image);
            $this->storeImage($request->file('image'), $attributes['image']);
        }
        $product->update($attributes);
        return response()->json([
            'message' => 'Success!'
        ]);
    }

    public function storeImage($file, $name)
    {
        $file->storeAs('images', $name, 'public');
    }
}
