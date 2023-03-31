/** React. */
import { Fragment } from 'react';

/** Vendor. */
import { Link } from "react-router-dom";

/** Helper. */
import helpNavigation from '../../helpers/help-navigation';

/** Hook. */
import useMouse from '../../hooks/use-mouse';
import useSticky from '../../hooks/use-sticky';

/** Component. */
import Icon from '../icons';
import Menu from '../headers/menu';

const Desktop = (props) => {
    /** Use helper. */
    const { authenticated, requestHandler } = helpNavigation();

    /** Map mouse hook stock explorer button. */
    const {
        mouseHover: stockExplorerHover,
        mouseEnter: stockExplorerMouseEnter,
        mouseLeave: stockExplorerMouseLeave
    } = useMouse({ default: '', enter: 'pulsate-forward' });

    /** Map mouse hook crypto explorer button. */
    const {
        mouseHover: cryptoExplorerHover,
        mouseEnter: cryptoExplorerMouseEnter,
        mouseLeave: cryptoExplorerMouseLeave
    } = useMouse({ default: '', enter: 'pulsate-forward' });

    /** Map mouse hook brand button. */
    const {
        mouseHover: brandHover,
        mouseEnter: brandMouseEnter,
        mouseLeave: brandMouseLeave
    } = useMouse({ default: '', enter: 'pulsate-forward' });

    /** Map mouse hook login button. */
    const {
        mouseHover: loginHover,
        mouseEnter: loginMouseEnter,
        mouseLeave: loginMouseLeave
    } = useMouse({ default: '', enter: 'pulsate-forward' });

    /** Map mouse hook register button. */
    const {
        mouseHover: registerHover,
        mouseEnter: registerMouseEnter,
        mouseLeave: registerMouseLeave
    } = useMouse({ default: '', enter: 'pulsate-forward' });

    /** Map mouse hook stock explorer button. */
    const {
        mouseHover: controlHover,
        mouseEnter: controlMouseEnter,
        mouseLeave: controlMouseLeave
    } = useMouse({ default: '', enter: 'pulsate-forward' });

    /** Map mouse hook dashboard button. */
    const {
        mouseHover: dashboardHover,
        mouseEnter: dashboardMouseEnter,
        mouseLeave: dashboardMouseLeave
    } = useMouse({ default: '', enter: 'pulsate-forward' });

    /** Map mouse hook profile button. */
    const {
        mouseHover: profileHover,
        mouseEnter: profileMouseEnter,
        mouseLeave: profileMouseLeave
    } = useMouse({ default: '', enter: 'pulsate-forward' });

    /** Map mouse hook logout button. */
    const {
        mouseHover: logoutHover,
        mouseEnter: logoutMouseEnter,
        mouseLeave: logoutMouseLeave
    } = useMouse({ default: '', enter: 'pulsate-forward' });

    /** Use hook sticky. */
    const sticky = useSticky();

    /** Return something. */
    return (
        <header id="header" className={sticky ? "sticky fade-in-bottom" : "fade-in-top"}>
            <div className="explorer">
                <Link to="/stock-explorer">
                    <span className={stockExplorerHover} onMouseEnter={stockExplorerMouseEnter} onMouseLeave={stockExplorerMouseLeave}>
                        <Icon id="stock" /> Stock Explorer
                    </span>
                </Link>
                <Link to="/crypto-explorer">
                    <span className={cryptoExplorerHover} onMouseEnter={cryptoExplorerMouseEnter} onMouseLeave={cryptoExplorerMouseLeave}>
                        <Icon id="crypto" /> Crypto Explorer
                    </span>
                </Link>
            </div>
            <div className="brand">
                <Link to="/">
                    <span className={brandHover} onMouseEnter={brandMouseEnter} onMouseLeave={brandMouseLeave}>
                        <Icon id="logo" /> Orion Trade
                    </span>
                </Link>
            </div>
            <div className="auth">
                {authenticated ? <Fragment>
                    <Link to="#">
                        <span onClick={props.onMenu} className={controlHover} onMouseEnter={controlMouseEnter} onMouseLeave={controlMouseLeave}>
                            <Icon id="control" /> Control Panel
                        </span>
                    </Link>
                    {props.menu && <Menu onControl={props.onMenu} />}
                    <Link to="/dashboard">
                        <span className={dashboardHover} onMouseEnter={dashboardMouseEnter} onMouseLeave={dashboardMouseLeave}>
                            <Icon id="menu" /> Dashboard
                        </span>
                    </Link>
                    <Link to="/profile">
                        <span className={profileHover} onMouseEnter={profileMouseEnter} onMouseLeave={profileMouseLeave}>
                            <Icon id="profile" /> Profile
                        </span>
                    </Link>
                    <Link to="/" onClick={requestHandler}>
                        <span className={logoutHover} onMouseEnter={brandMouseEnter} onMouseLeave={brandMouseLeave}>
                            <Icon id="logout" /> Logout
                        </span>
                    </Link>
                </Fragment> : <Fragment>
                    <Link to="/auth/login">
                        <span className={loginHover} onMouseEnter={loginMouseEnter} onMouseLeave={loginMouseLeave}>
                            <Icon id="login" /> Login
                        </span>
                    </Link>
                    <Link to="/auth/register">
                        <span className={registerHover} onMouseEnter={registerMouseEnter} onMouseLeave={registerMouseLeave}>
                            <Icon id="register" /> Register
                        </span>
                    </Link>
                </Fragment>
                }
            </div>
        </header>
    );
}

export default Desktop;