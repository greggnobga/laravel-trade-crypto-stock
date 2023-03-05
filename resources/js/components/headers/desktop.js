/** React. */
import { Fragment, useContext } from 'react';

/** Vendor. */
import { Link } from "react-router-dom";

/** Context. */
import AuthContext from '../../context/auth-context';

/** Hook. */
import useHttp from '../../hooks/use-http';

/** Component. */
import Icon from '../icons';

const Desktop = () => {
    /** Use context. */
    const authCtx = useContext(AuthContext);

    /** Callback http hook. */
    const logoutResponse = (data) => {
        /** Set sucess message. */
        authCtx.messenger(data.message);
    };

    /** Use http hook. */
    const { isLoading, sendRequest } = useHttp({
        url: '/api/logout',
        method: 'POST',
        params: { token: localStorage.getItem('token') },
        headers: {
            authorization: `Bearer ${localStorage.getItem('token' || null)}`
        }
    }, logoutResponse);

    /** Logout handler. */
    const logoutHandler = () => {
        /** Send http request. */
        sendRequest();
        /** Clear token. */
        authCtx.logout();
    }

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
                {authCtx.authenticated ? <Fragment>
                    <Link to="/dashboard">
                        <span><Icon id="menu" /> Dashboard</span>
                    </Link>
                    <Link to="/profile">
                        <span><Icon id="profile" /> Profile</span>
                    </Link>
                    <Link to="/" onClick={logoutHandler}>
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