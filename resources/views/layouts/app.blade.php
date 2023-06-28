<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Title -->
    <title>Trade - Buy High Sell Low - A Classic Approach</title>
    <!-- Favicon -->
    <link rel="icon" type="image/png" sizes="48x48" href="/public/icons/favicon.ico">
    <!-- Pure CSS -->
    <link href="/public/css/app.css" rel="stylesheet" type="text/css">
</head>

<body class="font-monster text-base background-dot">
    <aside id="modal"></aside>
    <main id="root"></main>
</body>
<script src="/public/js/main.js"></script>

</html>