const img_path = 'http://localhost/TrainingShopLaravel/storage/app/public/images/'

//setup ajax base url
const baseUrl = 'http://localhost/TrainingShopLaravel/public';
$.ajaxSetup({
    beforeSend: function (xhr, options) {
        options.url = baseUrl + options.url;
    }
})

$('title').text(function () {
    return translate('Shop');
});

//get token for form submit
function getCookie(name) {
    let start;
    let end;
    if (document.cookie.length > 0) {
        start = document.cookie.indexOf(name + '=');
        if (start !== -1) {
            start = start + name.length + 1;
            end = document.cookie.indexOf(';', start);
            if (end === -1) end = document.cookie.length;
            return unescape(document.cookie.substring(start, end));
        }
    }
    return '';
}

const changePrivileges = (privileges) => {
    if (privileges === 'admin') {
        localStorage.setItem('admin', 'true');
    } else {
        localStorage.setItem('admin', 'false');
    }
}

function redirectIfNotAdmin() {
    if (localStorage.getItem('admin') !== 'true') {
        window.location.hash = '#';
    }
}

const renderErrors = (xhr) => {
    //general errors
    let errors = JSON.parse(xhr.responseText)['errors'];
    $.each(errors, function (key, error) {
        $('#' + key + 'Error').show().html(translate('Please provide the correct input!'));
    });
}

//if u have a hash and you want to access the same hash u need to force the event, if not the routing wont get to the specific case
const changeHashOnSubmit = (hash) => {
    if (hash === window.location.hash) {
        window.dispatchEvent(new HashChangeEvent('hashchange'));
    } else {
        window.location.hash = hash;
    }
};

//login
$(document).on('submit', '.login', function (event) {
    event.preventDefault();
    $('.error').empty().hide();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/users',
        headers: {
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
        },
        data: new FormData(document.getElementById('login')),
        processData: false,
        contentType: false,
        cache: false,
        success: function (response) {
            if ('Success!' === response.message) {
                changePrivileges('admin');
                window.location.hash = '#products';
            } else {
                if (!$('#error').length) {
                    $('#loginError').show().html(translate('Wrong Credentials!'));
                }
            }
        },
        error: function (xhr) {
            //general errors
            renderErrors(xhr);
        }
    })
});

//add to cart
$(document).on('submit', '.addToCart', function (event) {
    event.preventDefault();
    let id = this.childNodes[1].value;
    $.ajax({
        type: 'PUT',
        dataType: 'json',
        url: '/cart/' + id,
        headers: {
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
        },
        success: function () {
            window.location.hash = '#cart';
        }
    });
});

//remove from cart
$(document).on('submit', '.remove', function (event) {
    event.preventDefault();
    let id = this.childNodes[1].value;
    $.ajax({
        type: 'DELETE',
        url: '/cart/' + id,
        headers: {
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
        },
        success: function () {
            changeHashOnSubmit('#cart');
        }
    });
});

//add
$(document).on('submit', '#add', function (event) {
    event.preventDefault();
    redirectIfNotAdmin();
    $.ajax({
        type: 'POST',
        url: '/products',
        data: new FormData(document.getElementById('add')),
        processData: false,
        contentType: false,
        cache: false,
        headers: {
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
        },
        success: function (response) {
            //if image already exists
            if (response['errors']) {
                $('.add').show();
                $('#imageError').show().html(response['errors']);

            } else {
                window.location.hash = '#products';
            }
        },
        error: function (xhr) {
            //general errors
            $('.add').show();
            renderErrors(xhr);
        }
    });
});

//edit
$(document).on('submit', '#edit', function (event) {
    event.preventDefault();
    redirectIfNotAdmin();
    let formInfo = new FormData(document.getElementById('edit'));
    formInfo.append('_method', 'patch');
    $.ajax({
        type: 'POST',
        url: '/products/' + formInfo.get('id'),
        data: formInfo,
        processData: false,
        contentType: false,
        cache: false,
        headers: {
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
        },
        success: function (response) {
            //if image already exists
            if (response['errors']) {
                $('.add').show();
                $('#imageError').show().html(response['errors']);

            } else {
                window.location.hash = '#products';
            }
        },
        error: function (xhr) {
            //general errors
            $('.add').show();
            renderErrors(xhr);
        }
    });
});

//delete
$(document).on('submit', '.deleteProduct', function (event) {
    event.preventDefault();
    $.ajax({
        type: 'DELETE',
        url: '/products/' + this.childNodes[1].value,
        headers: {
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
        },
        success: function () {
            changeHashOnSubmit('#products');
        }
    })
});

//logout
$(document).on('click', '#logout', function (e) {
    e.preventDefault();
    redirectIfNotAdmin();
    $.ajax(
        {
            type: 'DELETE',
            url: '/users',
            headers: {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
            },
            success: function () {
                changePrivileges('guest');
                window.location.hash = '#';
            }
        }
    );
});

//checkout
$(document).on('submit', '#checkout', function (event) {
    event.preventDefault();
    $('.error').empty();
    $.ajax({
        type: 'POST',
        url: '/checkout',
        data: new FormData(document.getElementById('checkout')),
        processData: false,
        contentType: false,
        cache: false,
        headers: {
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
        },
        success: function () {
            window.location.hash = '#';
        },
        error: function (xhr) {
            $('.cart').show();
            renderErrors(xhr);
        }
    });
})

function renderNav() {
    $('.navbar-nav').children().remove();
    if (localStorage.getItem('admin') === 'true') {
        $('.navbar-nav').append(
            `<a class="nav-link active" aria-current="page" href="#products" >${translate('Products')}</a>
            <a class="nav-link " href="" id="logout" >${translate('Logout')}</a>
            <a class="nav-link " href="#orders" >${translate('Orders')}</a>
            <a class="nav-link " href="#product" >${translate('Add Product')}</a>
            <a class="nav-link " href="#cart">${translate('Cart')}</a>`)
    } else {
        $('.navbar-nav').append(
            `<a class="nav-link active" aria-current="page" href="#" >${translate('Products')}</a>
            <a class="nav-link " href="#login" >${translate('Login')}</a>
            <a class="nav-link " href="#cart" >${translate('Cart')}</a>`)
    }
}

function renderCart(products) {
    if (!products['products'].length) {
        return `<div>${translate('No products in cart')}!</div>`;
    }
    let html = renderList(products['products'], 'cart', 'guest');
    html += `
    <div class="container-fluid">
        <form class="form" id="checkout" method="POST">
            <div class="mb-3">
            <br>
            <label for="exampleFormControlInput1" class="form-label">${translate('Name')}</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="ex: John Doe" name="name">
            </div>
            <p class="text-red-50 mb-5 error" style="color: red;display:none" id="nameError"></p>
            <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">${translate('Email')}</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="ex: example@example.com" name="email">
            </div>
            <p class="text-red-50 mb-5 error" style="color: red;display:none" id="emailError"></p>
            <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">${translate('Comments and details')}</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="comments"></textarea>
            </div>
            <p class="text-red-50 mb-5 error" style="color: red;display:none" id="commentsError"></p>
            <div class="mb-3">
            <div>${translate('Price')}: ${products['totalPrice']} $</div>
            <input type="hidden" value=" ${products['totalPrice']}" name="total">
            </div>
            <button class="btn btn-primary" type="submit" name="checkout">${translate('Checkout')}</button>
        </form>
       </div>`;
    return html;
}

function renderList(products, option, privileges) {
    let html = `<div class="row row-cols-1 row-cols-md-3 g-4">`;
    $.each(products, function (key, product) {
        html += `
            <div class="col">
            <div class="card h-100">
            <img src="${img_path}${product.image}" class="card-img-top img-fluid" alt="">
            <div class="card-body">
                <h5 class="card-title"> ${product.title} </h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text">${translate('Price')}:${product.price} $</p>
                <div class="d-grid gap-2 d-md-block">
        `;
        if (option === 'cart') {
            html += `
                    <form class="remove" method="POST">
                    <input type="hidden" value=" ${product.id}" name="id" id="idInput">
                    <button  class="btn btn-primary" type="submit" >${translate('Remove')}
                    </button>
                    </form>
                    </div>
                    </div>
                    </div>
                    </div>
            `;
        } else if (privileges === 'guest') {
            html +=
                `<form class="addToCart" method="POST">
                    <input type="hidden" value=" ${product.id} " name="id" id="idInput">
                    <button class="btn btn-primary" type="submit" value="Add">${translate('Add')}
                    </button>
                    </form>
                    </div>
                    </div>
                    </div>
                    </div>
            `;
        } else if (privileges === 'admin') {
            html +=
                `<form class="addToCart" method="POST">
                    <input type="hidden" value=" ${product.id} " name="id" id="idInput">
                    <button class="btn btn-primary" type="submit" value="Add">${translate('Add')}</button>
                    </form>
                    <form class="deleteProduct" method="POST">
                    <input type="hidden" value="${product.id} " name="id" id="idInput">
                    <button  class="btn btn-primary" type="submit" >${translate('Delete')}</button>
                    </form>
                    <a  class="btn btn-primary" href="#product/${product.id}/edit">${translate('Edit')}</a>
                    </div>
                    </div>
                    </div>
                    </div>`;
        }
    });
    html += `</div>`;
    return html;
}

function renderAddAndEdit() {
    let html = [];
    html +=
        ` <div class="container px-4">
                <form class="form" id="add"
                      enctype="multipart/form-data" method="POST">
                    <div class="mb-3">
                        <label for="titleInput" class="form-label" >${translate('Title of Product')}</label>
                        <input type="text" class="form-control" id="titleInput"
                               name="title">
                    </div>
                   <p class="text-red-50 mb-5 error" style="color: red;display:none" id="titleError"></p>
                    <div class="mb-3">
                        <label for="descriptionInput" class="form-label" >${translate('Description')}</label>
                        <textarea class="form-control" id="descriptionInput"
                                  rows="3"
                                  name="description">
                    </textarea>
                    </div>
                    <p class="text-red-50 mb-5 error" style="color: red;display:none" id="descriptionError"></p>
                    <div class="input-group mb-3">
                        <span class="input-group-text">$</span>
                        <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)"
                               name="price" id="priceInput">
                    </div>
                    <p class="text-red-50 mb-5 error" style="color: red;display:none" id="priceError"></p>
                    <div class="mb-3">
                        <label for="image" class="form-label" >${translate('Input your image')}</label>
                        <input class="form-control" type="file" id="image" name="image">
                    </div>
                    <p class="text-red-50 mb-5 error" style="color: red ;display:none" id="imageError"></p>
                    <div class="d-grid gap-2 col-4 mx-auto">
                        <button class="btn btn-primary" type="submit"
                               name="add">Add</button>
                    </div>
                </form>
            </div>`;
    return html;
}

function renderOrders(orders) {
    let html = ``;
    $.each(orders, function (key, order) {
        html += `
        <div class="container-fluid">
                <div class="container">
                    <!-- Title -->
                    <div class="d-flex justify-content-between align-items-center py-3">
                        <h2 class="h5 mb-0"> ${translate('Order')}#  ${order.id} </h2>
                    </div>
                    <!-- Main content -->
                    <div class="row">
                        <div class="col-lg-8">
                            <!-- Details -->
                            <div class="card mb-4">
                                <div class="card-body">
                                    <div class="mb-3 d-flex justify-content-between">
                                        <div>
                                            <span class="h6" >${translate('Date')} : ${order.created_at} </span>
                                        </div>
                                        <div class="d-flex">
                                            <a href="#order/${order.id}" class="btn btn-link p-0 me-3 d-none d-lg-block btn-icon-text orderButton" type="submit" >${translate('Go to Order')}</a>                                       
                                            <div class="dropdown">
                                                <button class="btn btn-link p-0 text-muted" type="button"
                                                        data-bs-toggle="dropdown">
                                                    <i class="bi bi-three-dots-vertical"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Payment -->
                            <div class="card mb-4">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <h3 class="h6" >${translate('Payment')}</h3>
                                            <p>${translate('Total')} : ${order.total} $</p>
                                        </div>
                                        <div class="col-lg-6">
                                            <h3 class="h6">${translate('Comments and details')}</h3>
                                            <address>
                                                <strong>${translate('Name')} : ${order.name}</strong><br>
                                                <div>${translate('Comments and details')} : ${order.comments} </div>
                                            </address>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    });
    return html;
}

function renderOrder(response) {
    let html = [];
    html += ` <div class="container-fluid">
                <div class="container">
                    <!-- Title -->
                    <div class="d-flex justify-content-between align-items-center py-3">
                        <h2 class="h5 mb-0"><a href="#" class="text-muted"></a>${translate('Order')} # ${response['order'].id} 
                        </h2>
                    </div>
                    <!-- Main content -->
                    <div class="row">
                        <div class="col-lg-8">
                            <!-- Details -->
                            <div class="card mb-4">
                                <div class="card-body">
                                    <div class="mb-3 d-flex justify-content-between">
                                        <div>
                                            <span class="me-3">Date: ${response['order'].created_at} </span>
                                        </div>
                                        <div class="d-flex">
                                            <div class="dropdown">
                                                <button class="btn btn-link p-0 text-muted" type="button"
                                                        data-bs-toggle="dropdown">
                                                    <i class="bi bi-three-dots-vertical"></i>
                                                </button>
                                            </div>
                                       </div>
                                    </div>`;
    $.each(response['products'], function (key, product) {
        html += `<table class="table table-borderless">
               <tbody>
                   <tr>
                       <td>
                           <div class="d-flex mb-2">
                               <div class="flex-shrink-0">
                                   <img src="${img_path}${product.image}" alt="" width="35" class="img-fluid">
                               </div>
                               <div class="flex-lg-grow-1 ms-3">
                                   <h6 class="small mb-0"><a href="#" class="text-reset"> ${product.title}</a>
                                   </h6>
                                   <span class="small">${translate('Description')} : ${product.description}</span>
                              </div>
                            </div>
                       </td>
                       <td></td>
                       <td class="text-end">$ ${product.price} </td>
                   </tr>`;
    })
    html += `
        </tbody>
           <tfoot>
           <tr class="fw-bold">
               <td colspan="2">${translate('TOTAL')}</td>
               <td class="text-end">$  ${response['order'].total} </td>
           </tr>
           </tfoot>
        </table>
        </div>
        </div>
        <!-- Payment -->
        <div class="card mb-4">
           <div class="card-body">
               <div class="row">
                   <div class="col-lg-6">
                       <h3 class="h6">${translate('Payment')}</h3>
                       <p>${translate('Total')}: $  ${response['order'].total} </p>
                   </div>
                   <div class="col-lg-6">
                       <h3 class="h6">${translate('Comments and details')}</h3>
                       <address>
                       <strong>${translate('Name')} : ${response['order'].name}</strong><br>
                        ${translate('Comments and details')} : ${response['order'].comments} 
                      </address>
                   </div>
               </div>
              </div>
           </div>
        </div>
        </div>
        </div>
        </div>`;
    return html;
}

function renderLogin() {
    let html = ``;
    html += `<section class="vh-100">
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div class="card bg-primary text-white">
                                <div class="card-body p-5 text-center">
                                    <div class="mb-md-5 mt-md-4 pb-5">
                                        <form class="login" id="login" method="POST">
                                            <h2 class="fw-bold mb-2 text-uppercase">${translate('Login')}</h2>
                                            <p class="text-white-50 mb-5" id="title">${translate('Please enter your username and password!')}
                                                </p>
                                            <p class="text-red-50 mb-5 error" style="color: red;display: none" id="loginError"></p>
                                            <div class="form-outline form-white mb-4">
                                                <label class="form-label" for="typeNameX">${translate('Username')}</label>
                                                <input type="text" id="typeNameX" class="form-control form-control-lg"
                                                       name="name"/>
                                            </div>
                                            <p class="text-red-50 mb-5 error" style="color: red;display:none" id="nameError"></p>
                                            <div class="form-outline form-white mb-4">
                                                <label class="form-label" for="typePasswordX">${translate('Password')}</label>
                                                <input type="password" id="typePasswordX" class="form-control form-control-lg"
                                                       name="password"/>
                                            </div>
                                            <p class="text-red-50 mb-5 error" style="color: red;display:none" id="passwordError"></p>
                                            <button class="btn btn-outline-light btn-lg px-5"
                                                    type="submit">${translate('Login')}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>`;
    return html;
}

