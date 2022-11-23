const path = 'http://localhost/TrainingShopLaravel/public';
const img_path = 'http://localhost/TrainingShopLaravel/storage/app/public/images/'

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
        localStorage.setItem('admin', 'true');
        $('.guest').hide();
        $('.admin').show();
    } else {
        localStorage.setItem('admin', 'false');
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
    if (!products['products'].length) {
        return ['<div>No Products in Cart!</div>'];
    }
    let html = renderList(products['products'], 'cart', 'guest');
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
        '<div>Price:' + products['totalPrice'] + ' $</div>',
        '<input type="hidden" value="" name="price">',
        '</div>',
        ' <button class="btn btn-primary" type="submit" name="checkout">Checkout</button>',
        '</form>',
        '</div>'
    ].join('');
    return html;
}

function renderList(products, option, privileges) {
    let html = [
        '<div class="row row-cols-1 row-cols-md-3 g-4">'
    ].join('');
    $.each(products, function (key, product) {

        html += [
            ' <div class="col">',
            '<div class="card h-100">',
            '<img src="' + img_path + product.image + '" class="card-img-top img-fluid" alt="">',
            ' <div class="card-body">',
            '<h5 class="card-title">' + product.title + '</h5>',
            '<p class="card-text">' + product.description + '</p>',
            '<p class="card-text">Price:' + product.price + '$</p>',
            '<div class="d-grid gap-2 d-md-block">'].join('');
        if (privileges === 'guest') {
            if (option === 'cart') {
                html += [
                    '<form onsubmit="changeHashOnSubmit(\'#removed\',' + product.id + ');return false;" >',
                    '<input type="hidden" value="' + product.id + '" name="id">',
                    '<button  class="btn btn-primary" type="submit">Remove'].join('');
            } else {
                html += [
                    '<form onsubmit="changeHashOnSubmit(\'#addToCart\',' + product.id + ');return false;" >',
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
        } else if (option === 'admin') {
            if (option === 'cart') {
                html += [
                    '<form onsubmit="changeHashOnSubmit(\'#removed\',' + product.id + ');return false;" >',
                    '<input type="hidden" value="' + product.id + '" name="id">',
                    '<button  class="btn btn-primary" type="submit">Remove',
                    '</button>',
                    '</form>',
                    '</div>',
                    '</div>',
                    '</div>',
                    '</div>',
                ].join('');
            } else {
                html += [
                    '<form onsubmit="changeHashOnSubmit(\'#addToCart\',' + product.id + ');return false;" >',
                    '<input type="hidden" value="' + product.id + '" name="id" >',
                    '<button class="btn btn-primary" type="submit">Add</button>',
                    '</form>',
                    '<form onsubmit="changeHashOnSubmit(\'#editShow\',' + product.id + ');return false;" >',
                    '<input type="hidden" value="' + product.id + '" name="id">',
                    '<button  class="btn btn-primary" type="submit">Edit</button>',
                    '</form>',
                    '<form onsubmit="changeHashOnSubmit(\'#delete\',' + product.id + ');return false;" >',
                    '<input type="hidden" value="' + product.id + '" name="id">',
                    '<button  class="btn btn-primary" type="submit">Delete</button>',
                    '</form>',
                    '</div>',
                    '</div>',
                    '</div>',
                    '</div>',
                ].join('');
            }
        }
    });
    html += ['</div>'].join('');
    return html;
}

function renderNav() {
    if (localStorage.getItem('admin') === 'true') {
        $('.navbar-nav').children().remove();
        $('.navbar-nav').append('<a class="nav-link active" aria-current="page" href="#products">Products</a>' +
            '<a class="nav-link " href="#logout" id="Logout" >Logout</a>\n' +
            '<a class="nav-link " href="#orders" >Orders</a>\n' +
            '<a class="nav-link " href="#addShow" >Add Product</a>\n' +
            '<a class="nav-link " href="#cart">Cart</a>'
        )
    } else if (localStorage.getItem('admin') === 'false' || localStorage.getItem('admin') === null) {
        $('.navbar-nav').children().remove();
        $('.navbar-nav').append('<a class="nav-link active" aria-current="page" href="#">Products</a>\n' +
            '<a class="nav-link " href="#login">Login</a>\n' +
            '<a class="nav-link " href="#cart">Cart</a>')
    }
}

function renderOrders(orders) {
    let html=[];
    $.each(orders, function (key,order) {
        html += [
            '<div class="container-fluid">',
            '<div class="container">',
            <!-- Title -->
            '<div class="d-flex justify-content-between align-items-center py-3">',
            '<h2 class="h5 mb-0"><a href="#" class="text-muted"></a> Order # ' + order.id + '</h2>',
            '</div>',

            '<div class="row">',
            '<div class="col-lg-8">',

            '<div class="card mb-4">',
            '<div class="card-body">',
            '<div class="mb-3 d-flex justify-content-between">',
            '<div>',
            '<span class="h6">Date: ' + new Date(order.created_at)+ '</span>',
            '</div>',
            '<div class="d-flex">',
            '<a href="" type="button" class="btn btn-link p-0 me-3 d-none d-lg-block btn-icon-text">',
            'Go to Order</a>',
            '<div class="dropdown">',
            ' <button class="btn btn-link p-0 text-muted" type="button" data-bs-toggle="dropdown">',
            '<i class="bi bi-three-dots-vertical"></i>',
            '</button>',
            '<ul class="dropdown-menu dropdown-menu-end">',
            '<li><a class="dropdown-item" href="#"><i class="bi bi-pencil"></i> Edit</a>',
            '</li>',
            '<li><a class="dropdown-item" href="#"><i class="bi bi-printer"></i>Print</a></li>',
            '</ul>',
            '</div>',
            '</div>',
            '</div>',
            '</div>',
            '</div>',
            <!-- Payment -->
            '<div class="card mb-4">',
            '<div class="card-body">',
            '<div class="row">',
            '<div class="col-lg-6">',
            '<h3 class="h6">Payment</h3>',
            '<p>Total: ' + order.total + ' $</p>',
            '</div>',
            '<div class="col-lg-6">',
            '<h3 class="h6">Comments and details</h3>',
            '<address>',
            '<strong>Name: ' + order.name + '</strong><br>',
            'Comments and details: '+order.comments,
            '</address>',
            '</div>',
            '</div>',
            '</div>',
            ' </div>',
            '</div>',
            '</div>',
            '</div>',
            '</div>'].join('');
    });
    return html;
}

function renderResponseForCart(response) {
    if (response.message === 'No products') {
        $('.noProducts').show();
    } else {
        $('.noProducts').hide();
        $('.cart .prod').html(renderCart(response));
    }

}

