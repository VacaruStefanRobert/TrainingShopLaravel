<html lang="EN">
@foreach($products as $product)
    <img src="{{ asset('storage/images/'.$product->image) }}" alt=""/>
    <ul>
        <li>{{ __('Product Title') }}: {{ $product->title }}</li>
        <li>{{ __('Product Description') }}: {{ $product->description }} </li>
        <li>{{ __('Product Price') }}: {{ $product->price }} $</li>
    </ul>
@endforeach
</html>
