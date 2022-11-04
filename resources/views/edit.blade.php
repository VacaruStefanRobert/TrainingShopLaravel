@extends('layout')
@section('content')

    <div class="container px-4">
        <form action="" method="POST">
            <input type="hidden" value="" name="id">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Title of Product</label>
                <input type="text" class="form-control" id="exampleFormControlInput1"
                       value="{{$product[0]->title}}"
                       name="title">
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                <textarea class="form-control" id="exampleFormControlTextarea1"
                          rows="3"
                          name="description">{{$product[0]->description}}
            </textarea>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text">$</span>
                <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)"
                       value="{{$product[0]->price}}" name="price">
            </div>
            <div class="mb-3">
                <label for="formFile" class="form-label">Input your image</label>
                <input class="form-control" type="file" id="formFile" name="image"
                       value="{{$product[0]->image}}">
            </div>
            <div class="d-grid gap-2 col-4 mx-auto">
                <input class="btn btn-primary" type="submit"
                       name="edit">
            </div>
        </form>
    </div>
@endsection
