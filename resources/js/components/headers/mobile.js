/** React. */
import { Fragment, useState } from 'react';

/** Vendor. */
import { Link } from "react-router-dom";

/** Hook. */
import useSticky from '../../hooks/use-sticky';

/** Helper. */
import helpNavigation from '../../helpers/help-navigation';

/** Component. */
import Icon from '../icons';
import Menu from '../headers/menu';

const Mobile = (props) => {
    /** Use helper. */
    const { authenticated, requestHandler } = helpNavigation();

    /** Use state. */
    const [isActive, setIsActive] = useState(false);

    /** Hamburger handler. */
    const hamburgerHandler = () => {
        console.log('Hamburger clicked.');
        setIsActive(!isActive);
    }

    /** Hamburger classes. */
    const hamburgerClasses = isActive ? 'hamburger hamburger-elastic is-active' : 'hamburger hamburger-elastic';

    /** Use hook sticky. */
    const sticky = useSticky();

    return (
        <header id="mobile" className={sticky ? "sticky fade-in-bottom" : "fade-in-top"}>
            <div className="brand">
                <Link className="items" to="/">
                    <span><Icon id="logo" /> Orion</span>
                </Link>
            </div>
            <div className="burger">
                {authenticated ?
                    <Fragment>
                        <span onClick={props.onMenu} className="control"><Icon id="control" /></span>
                        {props.menu && <Menu onControl={props.onMenu} />}
                    </Fragment>
                    : ''}
                <button className={hamburgerClasses} type="button" onClick={hamburgerHandler}>
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                </button>
            </div>
            {isActive ?
                <div className="menu" onClick={hamburgerHandler}>
                    <nav className="navigation">
                        <Link className="items" to="/stock-explorer">
                            <span>
                                <Icon id="stock" /> Stock Explorer
                            </span>
                        </Link>
                        <Link className="items" to="/crypto-explorer">
                            <span>
                                <Icon id="crypto" /> Crypto Explorer
                            </span>
                        </Link>
                        {authenticated ? <Fragment>
                            <Link className="items" to="/dashboard">
                                <span>
                                    <Icon id="menu" /> Dashboard
                                </span>
                            </Link>
                            <Link className="items" to="/profile">
                                <span>
                                    <Icon id="profile" /> Profile
                                </span>
                            </Link>
                            <Link className="items" to="/" onClick={requestHandler}>
                                <span>
                                    <Icon id="logout" /> Logout
                                </span>
                            </Link>
                        </Fragment> : <Fragment>
                            <Link className="items" to="/auth/login">
                                <span>
                                    <Icon id="login" /> Login
                                </span>
                            </Link>
                            <Link className="items" to="/auth/register">
                                <span>
                                    <Icon id="register" /> Register
                                </span>
                            </Link>
                        </Fragment>
                        }
                    </nav>
                </div> : ''}
        </header>
    );
}

export default Mobile;