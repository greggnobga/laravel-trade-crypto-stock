/** React. */
import { Fragment } from 'react';

/** Vendor. */
import { Link } from "react-router-dom";

/** Helper. */
import useNavigation from '../../helpers/help-navigation';

/** Component. */
import Icon from '../icons';

const Desktop = () => {
    /** Use helper. */
    const { authenticated, requestHandler } = useNavigation();

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
                {authenticated ? <Fragment>
                    <Link to="/dashboard">
                        <span><Icon id="menu" /> Dashboard</span>
                    </Link>
                    <Link to="/profile">
                        <span><Icon id="profile" /> Profile</span>
                    </Link>
                    <Link to="/" onClick={requestHandler}>
                        <span><Icon id="logout" /> Logout</span>
                    </Link>
                </Fragment> : <Fragment>
                    <Link to="/auth/login">
                        <span><Icon id="login" /> Login</span>
                    </Link>
                    <Link to="/auth/register">
                        <span><Icon id="register" /> Register</span>
                    </Link>
                </Fragment>
                }
            </div>
        </div>
    );
}

export default Desktop;