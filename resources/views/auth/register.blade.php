@extends('layouts.master')
@section('content')
    <div id="register">
        <form class="form-auth" method="POST" action="{{ route('register') }}">
            @csrf
            <div class="form-username">
                <label for="username" class="">Username</label>
                <input id="username" type="text" class="" name="username" value="{{ old('username') }}" placeholder="Username" required autofocus/>
                @if ($errors->has('username'))
                    <span class="form-error">
                        {{ $errors->first('username') }}
                    </span>
                @endif
            </div>
            <div class="form-firstname">
                <label for="firstname" class="">First Name</label>
                <input id="firstname" type="text" class="" name="firstname" value="{{ old('firstname') }}" placeholder="First Name" required autofocus/>
                @if ($errors->has('firstname'))
                    <span class="form-error">
                        {{ $errors->first('firstname') }}
                    </span>
                @endif
            </div>
            <div class="form-lastname">
                <label for="lastname" class="">Last Name</label>
                <input id="lastname" type="text" class="" name="lastname" value="{{ old('lastname') }}" placeholder="Last Name" required autofocus/>
                @if ($errors->has('lastname'))
                    <span class="form-error">
                        {{ $errors->first('lastname') }}
                    </span>
                @endif
            </div>
            <div class="form-email">
                <label for="email" class="">Email Address</label>
                <input id="email" type="email" class="" name="email" value="{{ old('email') }}" placeholder="Email Address" required />
                @if ($errors->has('email'))
                    <span class="form-error">
                        {{ $errors->first('email') }}
                    </span>
                @endif
            </div>
            <div class="from-password">
                <label for="password" class="">Password</label>
                <input id="password" type="password" class="" name="password" placeholder="Password" required />
                @if ($errors->has('password'))
                    <span class="form-error">
                        {{ $errors->first('password') }}</strong>
                    </span>
                @endif
            </div>
            <div class="form-password-confirm">
                <label for="password-confirm" class="">Confirm Password</label>
                <input id="password-confirm" type="password" class="" name="password_confirmation" placeholder="Confirm Password" required />
            </div>
            <div class="form-register">
                <button type="submit" class="btn btn-primary">Register</button>
            </div>
        </form>
    </div>

@stop
