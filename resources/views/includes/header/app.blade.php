<ul class="navi">
    @auth
        <li class="navi-trade"><a href="/">Orion Trade</a></li>
        <li class="navi-screen"><a href="/screen">Screen</a></li>
        <li class="navi-games"><a href="/game">Game</a></li>
        <li class="navi-moons" ><a href="/moon">Moon</a></li>
        <li class="navi-login" ><a href="/dashboard">Dashboard</a></li>
        <li class="navi-logout">
            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <button class="btn btn-danger" name="logout" type="submit">Logout</button>
            </form>
        </li>
    @else
        <li class="navi-trade"><a href="/">Orion Trade</a></li>
        <li class="navi-screen"><a href="/screen">Screen</a></li>
        <li class="navi-games"><a href="/game">Game</a></li>
        <li class="navi-moons"><a href="/moon">Moon</a></li>
        <li class="navi-login"><a href="/login">Login</a></li>
        <li class="navi-register"><a href="/register">Register</a></li>
    @endauth
</ul>
