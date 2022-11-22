@extends('layout')
@section('content')
    @if ($products)
        <div class="row row-cols-1 row-cols-md-3 g-4">
            @foreach ($products as $product)
                <div class="col">
                    <div class="card h-100">
                        <img src="{{ asset('storage/images/'.$product->image) }}" class="card-img-top img-fluid" alt="">
                        <div class="card-body">
                            <h5 class="card-title">{{ $product['title'] }} </h5>
                            <p class="card-text">{{ $product['description'] }} </p>
                            <p class="card-text">Price: {{ $product['price'] }} $</p>
                            <form action="{{ route('cart.destroy',$product->id) }}" method="POST">
                                @method('DELETE')
                                @csrf
                                <button class="btn btn-primary" type="submit"
                                        name="remove">{{ __('Remove') }}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
        <div class="container-fluid">
            <form action="{{ route('checkout.store') }}" method="POST">
                @csrf
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">{{ __('Name') }}</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="ex: John Doe"
                           name="name" value="{{ old('name') }}">
                </div>
                @error('name')
                <div class="alert alert-danger">{{ $message }}</div>
                @enderror
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">{{ __('Email') }}</label>
                    <input type="email" class="form-control" id="exampleFormControlInput1"
                           placeholder="ex: example@example.com" name="email" value="{{ old('email') }}">
                </div>
                @error('email')
                <div class="alert alert-danger">{{ $message }}</div>
                @enderror
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1"
                           class="form-label">{{ __('Comments and details') }}</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                              name="comments">{{ old('comments') }}</textarea>
                </div>
                @error('comments')
                <div class="alert alert-danger">{{ $message }}</div>
                @enderror
                <div class="mb-3">
                    <div>{{ __('Total') }}: {{ $totalPrice }} $</div>
                    <input type="hidden" value="{{ $totalPrice }}" name="total">
                </div>
                <button class="btn btn-primary" type="submit" name="checkout">{{ __('Checkout') }}</button>
            </form>
        </div>
    @else
        <div>{{ __('No products in cart!') }}</div><br>
    @endif
@endsection



