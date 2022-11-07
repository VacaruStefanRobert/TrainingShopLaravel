<html lang="EN">
@foreach($products as $product)
    <img src='{{$message->embed(public_path().'/images/'.$product->image)}}' alt=''/>
    <ul>
        <li>Product Title: {{$product->title}}</li>
        <li>Product Description: {{$product->description}} </li>
        <li>Product Price: {{$product->price}} $</li>
    </ul>
@endforeach
</html>
