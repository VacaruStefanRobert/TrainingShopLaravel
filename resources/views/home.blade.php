@extends('layout')
@section('content')
    @if($products)
        <div class="row row-cols-1 row-cols-md-3 g-4">
            @foreach($products as $product)
                <div class="col">
                    <div class="card h-100">
                        <img src="{{ asset('storage/images/'.$product->image) }} "
                             class="card-img-top img-fluid" alt="">
                        <div class="card-body">
                            <h5 class="card-title">{{ $product->title }}</h5>
                            <p class="card-text">{{ $product->description }}</p>
                            <p class="card-text">{{ __('Price') }}: {{ $product->price }} $</p>
                            <div class="d-grid gap-2 d-md-block">
                                <form action="{{ route('cart.update',$product->id) }}" method="POST">
                                    @method('PUT')
                                    @csrf
                                    <button class="btn btn-primary" type="submit">{{ __('Add') }}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    @else
        <div>{{ __('No products in shop!') }}</div><br>
    @endif
@endsection

