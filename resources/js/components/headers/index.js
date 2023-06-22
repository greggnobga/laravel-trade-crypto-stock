/** React. */
import { useState } from "react";

/** Vendor. */
import { Link } from "react-router-dom";

/** Hook. */
import useScreen from "../../hooks/use-screen";

/** Helper. */
import helpCheck from "../../helpers/help-check";

/** Component. */
import Icon from "../icons";

const Header = () => {
    /** Use helper. */
    const { authenticated, requestHandler } = helpCheck();

    /** Use screen hook. */
    const { isMobile } = useScreen();

    /** Use state. */
    const [isActive, setIsActive] = useState(false);

    /** Hamburger handler. */
    const hamburgerHandler = () => {
        setIsActive(!isActive);
    };

    /** Hamburger classes. */
    const hamburgerClasses = isActive
        ? "hamburger hamburger-elastic is-active"
        : "hamburger hamburger-elastic";

    /** Return something. */
    return (
        <>
            {isMobile ? (
                <header className="flex justify-between h-14 gradient-oceanic border-bottom text-stone-200 relative">
                    <div className="p-2">
                        <Link to="/">
                            <span className="block uppercase text-stone-700 hover:text-stone-200">
                                <Icon id="logo" /> Orion
                            </span>
                        </Link>
                    </div>
                    <div className="p-0">
                        {authenticated ? (
                            <>
                                <span>
                                    <Icon id="control" />
                                </span>
                            </>
                        ) : (
                            ""
                        )}
                        <button
                            className={hamburgerClasses}
                            type="button"
                            onClick={hamburgerHandler}
                        >
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                    {isActive ? (
                        <nav className="flex flex-col flex-grow shadow gradient-oceanic text-stone-800 absolute w-full top-14 right-0">
                            <Link to="/stock-explorer">
                                <span className="block border-bottom">
                                    <Icon id="stock" /> Stock Explorer
                                </span>
                            </Link>
                            <Link to="/crypto-explorer">
                                <span className="block border-bottom">
                                    <Icon id="crypto" /> Crypto Explorer
                                </span>
                            </Link>
                            {authenticated ? (
                                <>
                                    <Link to="/dashboard">
                                        <span className="block border-bottom">
                                            <Icon id="menu" /> Dashboard
                                        </span>
                                    </Link>
                                    <Link to="/profile">
                                        <span className="block border-bottom">
                                            <Icon id="profile" /> Profile
                                        </span>
                                    </Link>
                                    <Link to="/" onClick={requestHandler}>
                                        <span className="block border-bottom">
                                            <Icon id="logout" /> Logout
                                        </span>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/auth/login">
                                        <span className="block border-bottom">
                                            <Icon id="login" /> Login
                                        </span>
                                    </Link>
                                    <Link to="/auth/register">
                                        <span className="block border-bottom">
                                            <Icon id="register" /> Register
                                        </span>
                                    </Link>
                                </>
                            )}
                        </nav>
                    ) : (
                        ""
                    )}
                </header>
            ) : (
                <header className="flex justify-between gradient-oceanic">
                    <div className="p-3">
                        <Link to="/stock-explorer">
                            <span className="hover:text-stone-200 text-stone-800">
                                <Icon id="stock" /> Stock Explorer
                            </span>
                        </Link>
                        <Link to="/crypto-explorer">
                            <span className="ml-6 hover:text-stone-200 text-stone-800">
                                <Icon id="crypto" /> Crypto Explorer
                            </span>
                        </Link>
                    </div>
                    <div className="p-3">
                        <Link to="/">
                            <span className="uppercase text-stone-700 hover:text-stone-200">
                                <Icon id="logo" /> Orion Trade
                            </span>
                        </Link>
                    </div>
                    <div className="p-3">
                        {authenticated ? (
                            <>
                                <Link to="#">
                                    <span className="hover:text-stone-200 text-stone-800">
                                        <Icon id="control" /> Control Panel
                                    </span>
                                </Link>
                                <Link to="/dashboard">
                                    <span className="hover:text-stone-200 text-stone-800">
                                        <Icon id="menu" />
                                        Dashboard
                                    </span>
                                </Link>
                                <Link to="/profile">
                                    <span className="ml-6 hover:text-stone-200 text-stone-800">
                                        <Icon id="profile" /> Profile
                                    </span>
                                </Link>
                                <Link to="/" onClick={requestHandler}>
                                    <span className="ml-6 hover:text-stone-200 text-stone-800">
                                        <Icon id="logout" /> Logout
                                    </span>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/auth/login">
                                    <span className="hover:text-stone-200 text-stone-800">
                                        <Icon id="login" /> Login
                                    </span>
                                </Link>
                                <Link to="/auth/register">
                                    <span className="ml-6 hover:text-stone-200 text-stone-800">
                                        <Icon id="register" /> Register
                                    </span>
                                </Link>
                            </>
                        )}
                    </div>
                </header>
            )}
        </>
    );
};

export default Header;
