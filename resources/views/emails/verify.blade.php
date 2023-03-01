<!DOCTYPE html>
<html>

<head>
    <title>React Job Board</title>
</head>

<body>
    <h1>{{ $verifyData['title'] }}</h1>

    <p>Hello {{ $verifyData['fullname'] }},</p>

    <p>{{ $verifyData['body'] }}</p>

    <p> Just click <a href="{{ $verifyData['link'] }}">here</a> to confirm your email address.</p>

    <p> Having issues? Copy and paste the link below into your browser:</p>

    <p><a href="{{ $verifyData['link'] }}">{{ $verifyData['link'] }}</a></p>
</body>

</html>