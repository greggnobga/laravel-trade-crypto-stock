<!DOCTYPE html>
<html>

<head>
    <title>React Job Board</title>
</head>

<body>
    <h1>{{ $resetData['title'] }}</h1>

    <p>Hello {{ $resetData['fullname'] }},</p>

    <p>{{ $resetData['body'] }}</p>

    <p>Just click <a href="{{ $resetData['link'] }}">here</a> to reset your password.</p>

    <p>If this was a mistake, just ignore this email and nothing will happen. </p>

    <p>Having issues? Copy and paste the link below into your browser:</p>

    <p><a href="{{ $resetData['link'] }}">{{ $resetData['link'] }}</a></p>

</body>

</html>