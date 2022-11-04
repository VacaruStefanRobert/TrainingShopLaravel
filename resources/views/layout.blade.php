<html lang="EN">
<head>
    <title>Shop</title>
    <link rel="stylesheet" href="resources/css/style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3"
            crossorigin="anonymous"></script>
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
                <a class="nav-link active" aria-current="page" href="{{route('home')}}">Products</a>
                @guest
                    <a class="nav-link" href="{{route('login')}}">Login</a>
                    <a class="nav-link" href="{{route('cart')}}">Cart</a>
                @endguest
                @auth
                    <form action="{{route('logout')}}" method="post">
                        @csrf
                        <button class=" btn btn-outline-light nav-link" type="submit">Logout</button>
                    </form>
                @endauth
            </div>
        </div>
    </div>
</nav>
@yield('content')
</body>
</html>


