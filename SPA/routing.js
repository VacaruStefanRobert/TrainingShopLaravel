$(document).ready(function () {
    /**
     * URL hash change handler
     */
    window.onhashchange = function () {
        // First hide all the pages
        renderNav();
        $('.page').hide();
        let content = window.location.hash.split('/');
        let hash = content[0];
        let id = content[1];
        let action = content[2];
        switch (hash) {
            case '#cart':
                // Show the cart page
                // Load the cart products from the server
                $.ajax('/cart', {
                    dataType: 'json',
                    success: function (response) {
                        // Render the products in the cart list
                        $('.cart').show();
                        $('.cart .prod').html(renderCart(response));
                    }
                });
                break;
            //show login page
            case '#login':
                //redirect if admin
                if (localStorage.getItem('admin') === 'true') {
                    window.location.hash = '#products';
                }
                $('.login').show().html(renderLogin());
                break;
            case '#products':
                redirectIfNotAdmin();
                // Load the products from the server
                $.ajax('/products', {
                    dataType: 'json',
                    success: function (response) {
                        // Render the products in the index list
                        $('.products').show().html(renderList(response, '', 'admin'));
                    }
                });
                break;
            //    Need to make edit page because it remains unchanged
            case '#product':
                redirectIfNotAdmin();
                if (action === 'edit') {
                    $.ajax({
                        dataType: 'json',
                        url: '/products/' + id + '/edit',
                        success: function (response) {
                            $('.add').show().html(renderAddAndEdit());
                            $('#titleInput').val(response['product'].title);
                            $('#descriptionInput').val(response['product'].description);
                            $('#priceInput').val(response['product'].price);
                            $('#add').attr('action', '#editProduct').attr('id', 'edit');
                            $('#edit').append('<input type="hidden" value="' + id + '" name="id" id="idInput">');
                        }
                    })
                } else {
                    $('.add').show().html(renderAddAndEdit());
                }
                break;
            case '#orders':
                redirectIfNotAdmin();
                $('.orders').show();
                $.ajax({
                    dataType: 'json',
                    url: '/orders',
                    success: function (response) {
                        $('.orders').html(renderOrders(response));
                    }
                });
                break;
            case '#order':
                redirectIfNotAdmin();
                $('.order').show();
                $.ajax({
                    dataType: 'json',
                    url: '/order/' + id,
                    success: function (response) {
                        $('.order').html(renderOrder(response));

                    }
                });
                break;
            default:
                // If all else fails, always default to index
                // Load the index products from the server
                $.ajax('/', {
                    dataType: 'json',
                    success: function (response) {
                        // Render the products in the index list
                        $('.index').show().html(renderList(response, 'index', 'guest'));
                    },
                });
                break;
        }
    }
    window.onhashchange();
});
