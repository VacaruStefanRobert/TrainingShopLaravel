const path = 'http://localhost/TrainingShopLaravel/public';

let idObject;
const changeHashOnSubmit = (hash, param = null) => {
    idObject = param;
    //if u have a hash and you want to access the same hash u need to force the event, if not the routing wont get to the specific case
    if (hash === window.location.hash) {
        window.dispatchEvent(new HashChangeEvent("hashchange"));
    } else {
        window.location.hash = hash;
    }
};
const changePrivileges = (privileges) => {
    if (privileges === 'admin') {
        $('.guest').hide();
        $('.admin').show();
    }else{
        $('.admin').hide();
        $('.guest').show();
    }
}
const removeErrors = () => {
    if ($('#error').length) {
        $('#error').remove();
    }
};
const extractFormInput = (form) => $(form).serializeArray().reduce(function (obj, item) {
    obj[item.name] = item.value;
    return obj;
}, {});

function renderCart(products) {
    let html = renderList(JSON.parse(products.products), 'cart');
    html += [
        '<div class="container-fluid">',
        '<form action="" method="POST">',
        '<div class="mb-3">',
        '<br>',
        '<label for="exampleFormControlInput1" class="form-label">Name</label>',
        '<input type="text" class="form-control" id="exampleFormControlInput1" placeholder="ex: John Doe" name="name">',
        '</div>',
        '<div class="mb-3">',
        '<label for="exampleFormControlInput1" class="form-label">Email</label>',
        '<input type="email" class="form-control" id="exampleFormControlInput1" placeholder="ex: example@example.com" name="email">',
        '</div>',
        '<div class="mb-3">',
        '<label for="exampleFormControlTextarea1" class="form-label">Comments and details</label>',
        '<textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="comments"></textarea>',
        '</div>',
        '<div class="mb-3">',
        '<div>Price:' + products.totalPrice + ' $</div>',
        '<input type="hidden" value="" name="price">',
        '</div>',
        ' <button class="btn btn-primary" type="submit" name="checkout">Checkout</button>',
        '</form>',
        '</div>'
    ].join('');
    return html;
}

function renderList(products, option) {
    let html = [
        '<div class="row row-cols-1 row-cols-md-3 g-4">'
    ].join('');
    $.each(products, function (key, product) {

        html += [
            ' <div class="col">',
            '<div class="card h-100">',
            '<img src="' + path + '/images/' + product.image + '" class="card-img-top img-fluid" alt="">',
            ' <div class="card-body">',
            '<h5 class="card-title">' + product.title + '</h5>',
            '<p class="card-text">' + product.description + '</p>',
            '<p class="card-text">Price:' + product.price + '$</p>',
            '<div class="d-grid gap-2 d-md-block">'].join('');
        if (option === 'cart') {
            html += [
                '<form onsubmit="changeHashOnSubmit(\'#removed\',' + product.id + ');return false;" id="removed">',
                '<input type="hidden" value="' + product.id + '" name="id">',
                '<button  class="btn btn-primary" type="submit">Remove'].join('');
        } else {
            html += [
                '<form onsubmit="changeHashOnSubmit(\'#added\',' + product.id + ');return false;" id="added">',
                '<input type="hidden" value="' + product.id + '" name="id" >',
                '<button class="btn btn-primary" type="submit">Add'].join('');
        }
        html += [
            '</button>',
            '</form>',
            '</div>',
            '</div>',
            '</div>',
            '</div>',
        ].join('');
    });
    html += ['</div>'].join('');
    return html;
}