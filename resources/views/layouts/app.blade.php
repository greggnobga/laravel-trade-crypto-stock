<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Title -->
    <title>{{ config('app.name', 'Discover Your Ideal Work From Home Opportunities') }}</title>
    <!-- Favicon -->
    <link rel="icon" type="image/png" sizes="48x48" href="/public/icons/favicon.ico">
    <!-- Pure CSS -->
    <link href="/public/css/main.css" rel="stylesheet" type="text/css">
</head>

<body>
    <main>
        <section id="root"></section>
    </main>
</body>
<script src="/public/js/main.js"></script>

</html>