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

$(document).ready(function () {
    $('.admin').hide();
    /**
     * A function that takes a products array and renders it's html
     *
     * The products array must be in the form of
     * [{
     *     "title": "Product 1 title",
     *     "description": "Product 1 desc",
     *     "price": 1
     * },{
     *     "title": "Product 2 title",
     *     "description": "Product 2 desc",
     *     "price": 2
     * }]
     */
    let formData;
    /**
     * URL hash change handler
     */
    window.onhashchange = function () {
        // First hide all the pages
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
                        if (response.message === 'No products')
                            $('.cart .prod').html(['<div>No products in cart!</div>'].join(''));
                        else {
                            $('.cart .prod').html(renderCart(response));
                        }
                    }
                });
                break;
            case '#added':
                $('.cart').show();
                //console.log(formData);
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: path + '/add/' + idObject,
                    headers: {
                        "X-XSRF-TOKEN": getCookie('XSRF-TOKEN')
                    },
                    success: function (response) {
                        if (response.message === 'No products')
                            $('.cart .prod').html(['<div>No products in cart!</div>'].join(''));
                        else {
                            $('.cart .prod').html(renderCart(response));
                        }
                    }
                })
                break;
            case '#removed':
                $('.cart .prod').empty();
                $('.cart').show();
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: path + '/remove/' + idObject,
                    headers: {
                        "X-XSRF-TOKEN": getCookie('XSRF-TOKEN')
                    },
                    success: function (response) {
                        if (response.message === 'No products')
                            $('.cart .prod').html(['<div>No products in cart!</div>'].join(''));
                        else {
                            $('.cart .prod').html(renderCart(response));
                        }
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
                console.log(formData);
                formData = extractFormInput('#login');
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: path + '/login',
                    headers: {
                        "X-XSRF-TOKEN": getCookie('XSRF-TOKEN')
                    },
                    data: {
                        "name": formData['name'],
                        "password": formData['password']
                    },
                    success: function (response) {
                        if ('Success!' === response.message) {
                            changePrivileges('admin');
                            window.location.hash = '#index';
                        } else {
                            if (!$('#error').length) {
                                $('#title').after('<p class="text-red-50 mb-5" style="color: red" id="error">Wrong Credentials!</p>');
                            }
                        }
                    }
                })
                break;
            case '#logout':

                $.ajax(
                    {
                        type:'POST',
                        url: path + '/logout',
                        headers: {
                            "X-XSRF-TOKEN": getCookie('XSRF-TOKEN')
                        },
                        success:function (){
                            changePrivileges('guest');
                            window.location.hash='#index';
                        }
                    }
                );
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
                        $('.index').html(renderList(response));
                    }
                });
                break;
        }
    }
    window.onhashchange();
});
