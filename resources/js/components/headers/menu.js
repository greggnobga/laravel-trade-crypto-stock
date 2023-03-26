/** Vendor. */
import { Link } from "react-router-dom";

/** Component. */
import Icon from '../icons';

const Menu = (props) => {
    /** Control Handler */
    const controlHandler = () => {
        props.onControl();
    }

    /** Return something. */
    return (
        <div onClick={controlHandler} className="control">
            <ul className="items">
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
                </ul>
                <li className="sector">Crypto</li>
                <ul className="list">
                    <li className="item">
                        <Link to="/dashboard/crypto-portfolio">
                            <span><Icon id="portfolio" /> Portfolio</span>
                        </Link>
                    </li>
                    <li className="item">
                        <Link to="/dashboard/crypto-screen">
                            <span><Icon id="screen" /> Screen</span>
                        </Link>
                    </li>
                    <li className="item">
                        <Link to="/dashboard/crypto-moon">
                            <span><Icon id="fund" /> Moon</span>
                        </Link>
                    </li>
                    <li className="item">
                        <Link to="/dashboard/crypto-game">
                            <span><Icon id="game" /> Game</span>
                        </Link>
                    </li>
                    <li className="item">
                        <Link to="/dashboard/crypto-nft">
                            <span><Icon id="nft" /> NFT</span>
                        </Link>
                    </li>
                </ul>
                <li className="sector">Extra</li>
                <ul className="list">
                    <li className="item">
                        <Link to="/dashboard/extra-note">
                            <span><Icon id="note" /> Note</span>
                        </Link>
                    </li>
                </ul>
            </ul>
        </div>
    );
}

export default Menu;