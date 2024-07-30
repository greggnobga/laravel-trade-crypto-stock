<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <!-- Charset -->
        <meta charset="utf-8" />
        <!-- Viewport -->
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <!-- Permissions Policy -->
        <meta http-equiv="Permissions-Policy" content="interest-cohort=()" />
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}" />
        <!-- Title -->
        <title>Buy High, Sell Low: A Timeless Strategy</title>
        <!-- Favicon -->
        <link rel="icon" type="image/png" sizes="48x48" href="/public/icons/favicon.ico" />
        <!-- Pure CSS -->
        <link href="/public/css/app.css" rel="stylesheet" type="text/css" />
    </head>

    <body class="font-sans text-base background-dot text-slate-700">
        <aside id="modal"></aside>
        <main id="root"></main>
        <script src="/public/js/main.js"></script>
    </body>
</html>
