/** React. */
import { useState } from 'react';

/** Vendor. */
import { Link } from "react-router-dom";

/** Component. */
import Icon from '../../icons';

const Menu = () => {
    /**  Menu. */
    const [menu, setMenu] = useState(false);
    const [menuList, setMenuList] = useState('');

    const menuHandler = () => {
        /** Menu items. */
        const items = <ul className="items">
            <li className="sector">Stock</li>
            <ul className="list">
                <li className="item">
                    <Link to="/dashboard/stock-portfolio">
                        <span><Icon id="portfolio" /> Portfolio</span>
                    </Link>
                </li>
                <li className="item">
                    <Link to="/dashboard/stock-watchlist">
                        <span><Icon id="watchlist" /> Watchlist</span>
                    </Link>
                </li>
                <li className="item">
                    <Link to="/dashboard/stock-trade">
                        <span><Icon id="trade" /> Trade</span>
                    </Link>
                </li>
                <li className="item">
                    <Link to="/dashboard/stock-chart">
                        <span><Icon id="chart" /> Chart</span>
                    </Link>
                </li>
                <li className="item">
                    <Link to="/dashboard/stock-note">
                        <span><Icon id="note" /> Note</span>
                    </Link>
                </li>
            </ul>
            <li className="sector">Crypto</li>
            <ul className="list">
                <li className="item">
                    <Link to="/dashboard/crypto-portfolio">
                        <span><Icon id="portfolio" /> Portfolio</span>
                    </Link>
                </li>
                <li className="item">
                    <Link to="/dashboard/crypto-watchlist">
                        <span><Icon id="watchlist" /> Watchlist</span>
                    </Link>
                </li>
                <li className="item">
                    <Link to="/dashboard/crypto-screen">
                        <span><Icon id="screen" /> Screen</span>
                    </Link>
                </li>
                <li className="item">
                    <Link to="/dashboard/crypto-fund">
                        <span><Icon id="fund" /> Fund</span>
                    </Link>
                </li>
                <li className="item">
                    <Link to="/dashboard/crypto-note">
                        <span><Icon id="note" /> Note</span>
                    </Link>
                </li>
            </ul>
        </ul>
        /** Set items. */
        setMenuList(items);
        /** Toggle menu. */
        setMenu(!menu);
    }

    return (
        <div id="dashboard-menu" onClick={menuHandler}>
            <span className="logo">
                <Icon id="menu" />
            </span>
            {menu ? menuList : ''}
        </div >
    );
}

export default Menu;