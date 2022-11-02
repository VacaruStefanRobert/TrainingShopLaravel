@extends('layout')
@section('content')
    @if(!empty($products))
    <div class="row row-cols-1 row-cols-md-3 g-4">
        @foreach($products as $product)
        <div class="col">
            <div class="card h-100">
                <img src="images/{{$product->image}} " class="card-img-top img-fluid" alt="">
                <div class="card-body">
                    <h5 class="card-title">{{$product->title}}</h5>
                    <p class="card-text">{{$product->description}}</p>
                    <p class="card-text">Price: {{$product->price}} $</p>
                    <form action="{{route('add',$product->id)}}" method="POST">
                        @csrf
                        <input type="hidden" value="{{$product->id}}" name="id">
                        <button class="btn btn-primary" type="submit">Add</button>
                    </form>
                </div>
            </div>
        </div>
        @endforeach
    </div>
    @else
    <div>No products in shop!</div><br>
    @endif
@endsection

