const path = 'http://localhost/TrainingShopLaravel/public';
const img_path = 'http://localhost/TrainingShopLaravel/storage/app/public/images/'
let idObject;

//get token for form submit
function getCookie(c_name) {
    let c_start;
    let c_end;
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start !== -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end === -1) c_end = document.cookie.length;

            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

const changeHashOnSubmit = (hash) => {
    //if u have a hash and you want to access the same hash u need to force the event, if not the routing wont get to the specific case
    if (hash === window.location.hash) {
        window.dispatchEvent(new HashChangeEvent("hashchange"));
    } else {
        window.location.hash = hash;
    }
};

//event listeners
$(document).on('submit', '.form', function () {
    if (this.firstChild.id === 'idInput') {
        idObject = this.firstChild.value;
    }
    let hash = this.action.split('/')[4];
    //in case we have the same hash we need to force the event
    changeHashOnSubmit(hash)
    return false;
});

$(document).on('submit', '.formButton', function () {
    console.log(this.childNodes[1].value);
    idObject = this.childNodes[1].value;
    let hash = this.action.split('/')[4];
    changeHashOnSubmit(hash)
    return false;
});

const changePrivileges = (privileges) => {
    if (privileges === 'admin') {
        localStorage.setItem('admin', 'true');
    } else {
        localStorage.setItem('admin', 'false');
    }
}

function checkPrivileges() {
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

function renderNav() {
    if (localStorage.getItem('admin') === 'true') {
        $('.navbar-nav').children().remove();
        $('.navbar-nav').append(
            `<a class="nav-link active" aria-current="page" href="#products" >${translate('Products')}</a>
            <a class="nav-link " href="#logout" id="Logout" >${translate('Logout')}</a>
            <a class="nav-link " href="#orders" >${translate('Orders')}</a>
            <a class="nav-link " href="#addShow" >${translate('Add Product')}</a>
            <a class="nav-link " href="#cart">${translate('Cart')}</a>`)
    } else if (localStorage.getItem('admin') === 'false' || localStorage.getItem('admin') === null) {
        $('.navbar-nav').children().remove();
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
        <form action="#checkout" class="form" id="checkout">
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
            <div>Price: ${products['totalPrice']} $</div>
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
        if (privileges === 'guest') {
            if (option === 'cart') {
                html += `
                    <form action="#removed" class="formButton" >
                    <input type="hidden" value=" ${product.id}" name="id" id="idInput">
                    <button  class="btn btn-primary" type="submit" lng-tag="Remove">${translate('Remove')}`;
            } else {
                html += `
                    <form action="#addToCart" class="formButton">
                    <input type="hidden" value=" ${product.id} " name="id" id="idInput">
                    <button class="btn btn-primary" type="submit" value="Add" lng-tag="Add" >${translate('Add')}`;
            }
            html += `
                </button>
                </form>
                </div>
                </div>
                </div>
                </div>
            `;
        } else if (option === 'admin') {
            if (option === 'cart') {
                html += `
                    <form action="#removed" class="formButton" >
                        <input type="hidden" value=" ${product.id}" name="id" id="idInput">
                        <button  class="btn btn-primary" type="submit" >${translate('Remove')}
                        </button>
                    </form>
                    </div>
                    </div>
                    </div>
                    </div>
                    `;
            } else {
                html +=
                    `<form action="#addToCart" class="formButton">
                    <input type="hidden" value=" ${product.id}" name="id" id="idInput">
                    <button class="btn btn-primary" type="submit" value="Add" >${translate('Add')}</button>
                    </form>
                    <form action="#editShow" class="formButton">
                    <input type="hidden" value="${product.id}" name="id" id="idInput" >
                    <button  class="btn btn-primary" type="submit" >${translate('Edit')}</button>
                    </form>
                    <form action="#delete" class="formButton">
                    <input type="hidden" value="${product.id} " name="id" id="idInput">
                    <button  class="btn btn-primary" type="submit" >${translate('Delete')}</button>
                    </form>
                    </div>
                    </div>
                    </div>
                    </div>
                `;
            }
        }
    });
    html +=`</div>`;
    return html;
}


function renderAddAndEdit() {
    let html = [];
    html +=
        ` <div class="container px-4">
                <form action="#addProduct" class="form" id="add"
                      enctype="multipart/form-data">
                    <div class="mb-3">
                        <label for="titleInput" class="form-label" lng-tag="Title of Product">${translate('Title of Product')}</label>
                        <input type="text" class="form-control" id="titleInput"
                               name="title">
                    </div>
                   <p class="text-red-50 mb-5 error" style="color: red;display:none" id="titleError"></p>
                    <div class="mb-3">
                        <label for="descriptionInput" class="form-label" lng-tag="Description">${translate('Description')}</label>
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
                        <label for="image" class="form-label" lng-tag="Input your image">${translate('Input your image')}</label>
                        <input class="form-control" type="file" id="image" name="image">
                    </div>
                    <p class="text-red-50 mb-5 error" style="color: red ;display:none" id="imageError"></p>
                    <div class="d-grid gap-2 col-4 mx-auto">
                        <input class="btn btn-primary" type="submit"
                               name="add">
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
                        <h2 class="h5 mb-0" lng-tag="Order"> ${translate('Order')}#  ${order.id} </h2>
                    </div>
                    <!-- Main content -->
                    <div class="row">
                        <div class="col-lg-8">
                            <!-- Details -->
                            <div class="card mb-4">
                                <div class="card-body">
                                    <div class="mb-3 d-flex justify-content-between">
                                        <div>
                                            <span class="h6" lng-tag="Date">${translate('Date')} : ${order.created_at} </span>
                                        </div>
                                        <div class="d-flex">
                                            <form action="#order" class="formButton">
                                               <input type="hidden" value=" ${order.id}" id="idInput" name="id">
                                               <button  class="btn btn-link p-0 me-3 d-none d-lg-block btn-icon-text" type="submit" lng-tag="Go To Order">${translate('Go to Order')}</button>
                                            </form>
                                            <div class="dropdown">
                                                <button class="btn btn-link p-0 text-muted" type="button"
                                                        data-bs-toggle="dropdown">
                                                    <i class="bi bi-three-dots-vertical"></i>
                                                </button>
                                                <ul class="dropdown-menu dropdown-menu-end">
                                                    <li><a class="dropdown-item" href="#"><i
                                                                class="bi bi-pencil"></i>${translate('Edit')} </a>
                                                    </li>
                                                    <li><a class="dropdown-item" href="#"><i class="bi bi-printer"></i>
                                                            ${translate('Print')}</a></li>
                                                </ul>
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
                                            <h3 class="h6" lng-tag="Payment">${translate('Payment')}</h3>
                                            <p lng-tag="Total">${translate('Total')} : ${order.total} $</p>
                                        </div>
                                        <div class="col-lg-6">
                                            <h3 class="h6" lng-tag="Comments and details">${translate('Comments and details')}</h3>
                                            <address>
                                                <strong lng-tag="Name">${translate('Name')} : ${order.name}</strong><br>
                                                <div lng-tag="Comments and details">${translate('Comments and details')} : ${order.comments} </div>
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
                                                <ul class="dropdown-menu dropdown-menu-end">
                                                    <li><a class="dropdown-item" href="#"><i
                                                                class="bi bi-pencil"></i> ${translate('Edit')}</a>
                                                    </li>
                                                    <li><a class="dropdown-item" href="#"><i class="bi bi-printer"></i>
                                                            ${translate('Print')}</a></li>
                                                </ul>
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
                                        <form action="#loginSubmit" class="form" id="login">
                                            <h2 class="fw-bold mb-2 text-uppercase">${translate('Login')}</h2>
                                            <p class="text-white-50 mb-5" id="title">${translate('Please enter your username and password!')}
                                                </p>
                                            <p class="text-red-50 mb-5 error" style="color: red;display: none" id="login">${translate('Wrong Credentials!')}</p>
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

