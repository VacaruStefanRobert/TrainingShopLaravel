<html lang="EN">
<head>
    <title>Shop</title>
    <link rel="stylesheet" href="resources/css/style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3"
            crossorigin="anonymous"></script>
    <!-- Load the jQuery JS library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

    <!-- Custom JS script -->
    <script type="text/javascript">
        $(document).ready(function () {

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
            const path = 'http://localhost/TrainingShopLaravel/public';

            function renderList(products) {
                html = [
                    '<div class="row row-cols-1 row-cols-md-3 g-4">'
                ].join('');

                $.each(products, function (key, product) {
                    html += [
                       ' <div class="col">',
                            '<div class="card h-100">',
                                '<img src="../images/'+product.image +'" class="card-img-top img-fluid" alt="">',
                                   ' <div class="card-body">',
                                        '<h5 class="card-title">'+product.title+'</h5>',
                                        '<p class="card-text">'+product.description+'</p>',
                                        '<p class="card-text">Price:'+product.price+'$</p>',
                                        '<div class="d-grid gap-2 d-md-block">',
                                        '<form action="#add" method="POST">',
                                            '<input type="hidden" value="'+product.id+'" name="id">',
                                            '<button class="btn btn-primary" type="submit">Add</button>',
                                        '</form>',
                                        '</div>',
                                    '</div>',
                            '</div>',
                        '</div>'
                    ].join('');
                });

                return html;
            }

            /**
             * URL hash change handler
             */
            window.onhashchange = function () {
                // First hide all the pages
                $('.page').hide();

                switch(window.location.hash) {
                    case '#cart':
                        // Show the cart page
                        $('.cart').show();
                        // Load the cart products from the server
                        $.ajax('/cart', {
                            dataType: 'json',
                            success: function (response) {
                                // Render the products in the cart list
                                $('.cart .list').html(renderList(response));
                            }
                        });
                        break;
                    default:
                        // If all else fails, always default to index
                        // Show the index page
                        $('.index').show();
                        // Load the index products from the server
                        $.ajax('http://localhost/TrainingShopLaravel/public/', {
                            dataType: 'json',
                            success: function (response) {
                                // Render the products in the index list
                                $('.index').html(renderList(response));
                            }
                        });
                        break;
                }
            }

            window.onhashchange;
        });
    </script>
</head>
<body>
<nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <a class="nav-link active" aria-current="page" href="">Products</a>
                <a class="nav-link" href="">Login</a>
                <a class="nav-link" href="">Cart</a>
            </div>
        </div>
    </div>
</nav>
<!-- The index page -->
<div class="page index">
    <!-- The index element where the products list is rendered -->

    <!-- A link to go to the cart by changing the hash -->
</div>

<!-- The cart page -->
<div class="page cart">
    <!-- The cart element where the products list is rendered -->
    <table class="list"></table>

    <!-- A link to go to the index by changing the hash -->
    <a href="#" class="button">Go to index</a>
</div>
</body>
</html>
