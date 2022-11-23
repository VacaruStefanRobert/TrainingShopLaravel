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

function checkPrivileges() {
    if (localStorage.getItem('admin') !== 'true') {
        window.location.hash = '#';
    }
}

$(document).ready(function () {
    /**
     * URL hash change handler
     */
    let formData;
    window.onhashchange = function () {
        // First hide all the pages
        renderNav();
        $('.page').hide();
        switch (window.location.hash) {
            case '#cart':
                // Show the cart page
                $('.cart').show();
                // Load the cart products from the server
                $.ajax(path + '/cart', {
                    dataType: 'json',
                    success: function (response) {
                        // Render the products in the cart list
                        renderResponseForCart(response);
                    }
                });
                break;
            case '#addToCart':
                $('.cart').show();
                $.ajax({
                    type: 'PUT',
                    dataType: 'json',
                    url: path + '/cart/' + idObject,
                    headers: {
                        "X-XSRF-TOKEN": getCookie('XSRF-TOKEN')
                    },
                    success: function () {
                        changeHashOnSubmit('#cart');
                    }
                })
                break;
            case '#removed':
                $('.cart .prod').empty();
                $('.cart').show();
                $.ajax({
                    type: 'DELETE',
                    url: path + '/cart/' + idObject,
                    headers: {
                        "X-XSRF-TOKEN": getCookie('XSRF-TOKEN')
                    },
                    success: function () {
                        changeHashOnSubmit('#cart');
                    }
                })
                break;
            //show login page
            case '#login':
                removeErrors();
                $('.login').show();
                break;
            //login the user
            case '#loginSubmit':
                $('.login').show();
                removeErrors();
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: path + '/users',
                    headers: {
                        "X-XSRF-TOKEN": getCookie('XSRF-TOKEN')
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
                                $('#title').after('<p class="text-red-50 mb-5" style="color: red" id="error">Wrong Credentials!</p>');
                            }
                        }
                    }
                })
                break;
            case '#logout':
                checkPrivileges();
                $.ajax(
                    {
                        type: 'DELETE',
                        url: path + '/users',
                        headers: {
                            "X-XSRF-TOKEN": getCookie('XSRF-TOKEN')
                        },
                        success: function () {
                            changePrivileges('guest');
                            window.location.hash = '#index';
                        }
                    }
                );
                break;
            case '#products':
                checkPrivileges();
                $('.products').show();
                // Load the products from the server
                $.ajax(path + '/products', {
                    dataType: 'json',
                    success: function (response) {
                        // Render the products in the index list
                        $('.products').html(renderList(response, 'admin'));
                    }
                });
                break;
            case '#addShow':
                checkPrivileges();
                $('.add').show();
                break;
            case '#editShow':
                checkPrivileges();
                $('.add').show();
                $.ajax({
                    dataType: 'json',
                    url: path + '/products/' + idObject + '/edit',
                    success: function (response) {
                        $('#titleInput').val(response['product'].title);
                        $('#descriptionInput').val(response['product'].description);
                        $('#priceInput').val(response['product'].price);
                        $('#add').attr('onsubmit', 'changeHashOnSubmit(\'#editProduct\',' + idObject + ');return false;');
                        $('#add').attr('id', 'edit');
                    }
                })
                break;
            case '#editProduct':
                let formInfo = new FormData(document.getElementById('edit'));
                formInfo.append('_method', 'patch');
                $.ajax({
                    type: 'POST',
                    url: path + '/products/' + idObject,
                    data: formInfo,
                    processData: false,
                    contentType: false,
                    cache: false,
                    headers: {
                        "X-XSRF-TOKEN": getCookie('XSRF-TOKEN')
                    },
                    success: function () {
                        window.location.hash = '#products';
                    }
                });
                break;
            case '#addProduct':
                $.ajax({
                    type: 'POST',
                    url: path + '/products',
                    data: new FormData(document.getElementById('add')),
                    processData: false,
                    contentType: false,
                    cache: false,
                    headers: {
                        "X-XSRF-TOKEN": getCookie('XSRF-TOKEN')
                    },
                    success: function () {
                        window.location.hash = '#products';
                    }
                });
                break;
            case '#delete':
                $.ajax({
                    type: 'DELETE',
                    url: path + '/products/' + idObject,
                    headers: {
                        "X-XSRF-TOKEN": getCookie('XSRF-TOKEN')
                    },
                    success: function () {
                        window.location.hash = '#products';
                    }
                })
                break;
            case '#orders':
                checkPrivileges();
                $('.orders').show();
                $.ajax({
                    dataType: 'json',
                    url: path + '/orders',
                    success: function (response) {
                            $('.orders').html(renderOrders(response));
                    }
                })
                break;
            default:
                // If all else fails, always default to index
                // Show the index page
                $('.index').show();
                // Load the index products from the server
                $.ajax(path + '/', {
                    dataType: 'json',
                    success: function (response) {
                        // Render the products in the index list
                        $('.index').html(renderList(response, 'index', 'guest'));
                    }
                });
                break;
        }
    }
    window.onhashchange();
});
