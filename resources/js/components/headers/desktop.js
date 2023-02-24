/** Vendor. */
import { Link } from "react-router-dom";

/** Component. */
import Icon from '../icons';

const Desktop = () => {
    return (
        <div id="header">
            <div className="explorer">
                <Link to="/stock-explorer">
                    <span><Icon id="stock" /> Stock Explorer</span>
                </Link>
                <Link to="/crypto-explorer">
                    <span><Icon id="crypto" /> Crypto Explorer</span>
                </Link>
            </div>
            <div className="brand">
                <Link to="/">
                    <span><Icon id="logo" /> Orion Trade</span>
                </Link>
            </div>
            <div className="auth">
                <Link to="/auth/login">
                    <span><Icon id="profile" /> Login</span>
                </Link>
                <Link to="/auth/register">
                    <span><Icon id="login" /> Register</span>
                </Link>
            </div>
        </div>
    );
}

export default Desktop;