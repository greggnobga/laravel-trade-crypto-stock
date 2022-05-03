<!DOCTYPE html>
<html lang="en">
<head>
    @include('includes.meta.head')
</head>
<body>
<main id="wrapper">
    <header id="header">
        @include('includes.header.dashboard')
    </header>
    <div id="container">
        @yield('content')
    </div>
    <div class="push"></div>
    <footer id="footer">
        @include('includes.footer.app')
    </footer>
</main>
</body>
<script src="/public/assets/js/global.js"></script>
</html>
