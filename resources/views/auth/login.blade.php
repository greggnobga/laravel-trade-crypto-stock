@extends('layouts.master')
@section('content')
    <div id="login">
        <form class="form-auth" method="POST" action="{{ route('login') }}">
            @csrf
            <div class="form-email">
                <label for="email" class="">Email Address</label>
                <input id="email" type="email" class="" name="email" value="{{ old('email') }}" placeholder="Email Address" required autofocus>
                @if ($errors->has('email'))
                    <span class="form-error">
                        {{ $errors->first('email') }}
                    </span>
                @endif
            </div>
            <div class="form-password">
                <label for="password" class="">Password</label>
                <input id="password" type="password" class="" name="password" placeholder="Password" required />
                @if ($errors->has('password'))
                    <span class="form-error">
                        {{ $errors->first('password') }}
                    </span>
                @endif
            </div>
            <div class="form-remember">
                <input type="checkbox" name="remember" value="Remember Me" />
                <label>Remember me.</label>
                <a class="form-forgot" href="#">Forgot Password?</a>
            </div>
            <div class="form-login">
                <button class="btn btn-primary" type="submit">Login</button>
            </div>
        </form>
    </div>
@stop
