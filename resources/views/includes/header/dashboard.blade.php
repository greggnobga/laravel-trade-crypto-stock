<ul class="navi">
    <li class="navi-trade">
        <a href="/dashboard">Dashboard</a>
    </li>
    <li class="navi-screen js-crypto">
        <button class="btn" name="crypto" type="button" data-sidebar="crypto">Crypto</button>
    </li>
    <li class="navi-games js-stock">
        <button class="btn" name="stock" type="button" data-sidebar="stock">Stock</button>
    </li>
    <li class="navi-login">
        <button class="btn" type="submit" onclick="location.href='/'">Home</button>
    </li>
    <li class="navi-logout">
        <form method="POST" action="{{ route('logout') }}">
            @csrf
            <button class="btn btn-danger" name="logout" type="submit">Logout</button>
        </form>
    </li>
</ul>
