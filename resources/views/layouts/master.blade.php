<!DOCTYPE html>
<html lang="en">
<head>
    @include('includes.meta.head')
</head>
<body>
<main id="wrapper">
    <header id="header">
        @include('includes.header.app')
    </header>
    <section id="notice">
        @include('includes.notice.note')
    </section>
    <section id="container">
        @yield('content')
    </section>
    <div class="push"></div>
    <footer id="footer">
        @include('includes.footer.app')
    </footer>
</main>
</body>
</html>
