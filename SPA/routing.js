
$(document).ready(function () {
    /**
     * URL hash change handler
     */
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
                        $('.cart .prod').html(renderCart(response));
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
                        window.location.hash = '#cart';
                    }
                });
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
                        window.location.hash = '#cart';
                    }
                });
                break;
            //show login page
            case '#login':
                $('.login').show().html(renderLogin());
                break;
            //login the user
            case '#loginSubmit':
                $('.login').show();
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
                                $('#login .error').show();
                            }
                        }
                    },
                    error: function (xhr) {
                        //general errors
                        $('.login').show();
                        renderErrors(xhr);
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
            //    Need to make edit page because it remains unchanged
            case '#addShow':
                checkPrivileges();
                $('.add').show().html(renderAddAndEdit());

                break;
            case '#editShow':
                checkPrivileges();
                $('.add').show().html(renderAddAndEdit());
                console.log(idObject)
                $.ajax({
                    dataType: 'json',
                    url: path + '/products/' + idObject + '/edit',
                    success: function (response) {
                        $('#titleInput').val(response['product'].title);
                        $('#descriptionInput').val(response['product'].description);
                        $('#priceInput').val(response['product'].price);
                        $('#add').attr('action', '#editProduct').attr('id', 'edit');
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
                });
                break;
            case '#order':
                checkPrivileges();
                $('.order').show();
                console.log(idObject);
                $.ajax({
                    dataType: 'json',
                    url: path + '/order/' + idObject,
                    success: function (response) {
                        $('.order').html(renderOrder(response));

                    }
                })
                break;
            case '#checkout':
                $.ajax({
                    type: 'POST',
                    url: path + '/checkout',
                    data: new FormData(document.getElementById('checkout')),
                    processData: false,
                    contentType: false,
                    cache: false,
                    headers: {
                        "X-XSRF-TOKEN": getCookie('XSRF-TOKEN')
                    },
                    success: function () {
                        window.location.hash = '#index';
                    },
                    error: function (xhr) {
                        $('.cart').show();
                        renderErrors(xhr);
                    }
                });
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
                    },
                });

                break;
        }
        //after rendering the html we can translate the labels
    }
    window.onhashchange();
});
