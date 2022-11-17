@extends('layout')
@section('content')
    <div class="container px-4">
        <form action="@if (isset($product)){{route('edit',$product->id)}}@else {{route('addProduct')}}@endif"
              method="POST" enctype="multipart/form-data">
            @csrf
            @if (isset($product))
                @method('PATCH')
            @endif
            <input type="hidden" value="@isset($product){{$product->id}}@endisset" name="id">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">{{__('Title of Product')}}</label>
                <input type="text" class="form-control" id="exampleFormControlInput1"
                       value="@isset($product){{$product->title}}@endisset"
                       name="title">
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">{{__('Description')}}</label>
                <textarea class="form-control" id="exampleFormControlTextarea1"
                          rows="3"
                          name="description">@isset($product){{$product->description}}@endisset
            </textarea>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text">$</span>
                <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)"
                       value="@isset($product){{$product->price}}@endisset" name="price">
            </div>
            <div class="mb-3">
                <label for="image" class="form-label">{{__('Input your image')}}</label>
                <input class="form-control" type="file" id="image" name="image"
                       value="@isset($product)../images/{{$product->image}}@endisset">
            </div>
            @error('errors')
            <p class="text-red-50 mb-5" style="color: red">{{$message}}</p>
            @enderror
            <div class="d-grid gap-2 col-4 mx-auto">
                <input class="btn btn-primary" type="submit"
                       name="edit">
            </div>
        </form>
    </div>
@endsection
