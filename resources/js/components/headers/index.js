/** React. */
import { useState } from "react";

/** Vendor. */
import { Link } from "react-router-dom";

/** Hook. */
import useScreen from "../../hooks/use-screen";

/** Helper. */
import helpNavigation from "../../helpers/help-navigation";

/** Component. */
import Icon from "../icons";

const Header = () => {
    /** Use helper. */
    const { authenticated, requestHandler } = helpNavigation();

    /** Use screen hook. */
    const { isMobile } = useScreen();

    /** Use state. */
    const [isActive, setIsActive] = useState(false);

    /** Hamburger handler. */
    const hamburgerHandler = () => {
        console.log("Hamburger clicked.");
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
                <header className="flex justify-between h-14 bg-gradient-to-r from-cyan-500 to-blue-500 relative">
                    <div className="p-3">
                        <Link to="/">
                            <span className="block uppercase text-stone-300">
                                <Icon id="logo" /> Orion
                            </span>
                        </Link>
                    </div>
                    <div className="p-0 relative">
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
                        <nav className="flex flex-col flex-grow shadow bg-gradient-to-r from-cyan-400 to-blue-400 text-stone-200 absolute w-full top-14 right-0">
                            <Link to="/stock-explorer">
                                <span className="block p-2 border-b border-stone-100 border-opacity-50">
                                    <Icon id="stock" /> Stock Explorer
                                </span>
                            </Link>
                            <Link to="/crypto-explorer">
                                <span className="block p-2 border-b border-stone-100 border-opacity-50">
                                    <Icon id="crypto" /> Crypto Explorer
                                </span>
                            </Link>
                            {authenticated ? (
                                <>
                                    <Link to="/dashboard">
                                        <span className="block p-2 border-b border-stone-100 border-opacity-50">
                                            <Icon id="menu" /> Dashboard
                                        </span>
                                    </Link>
                                    <Link to="/profile">
                                        <span className="block p-2 border-b border-stone-100 border-opacity-50">
                                            <Icon id="profile" /> Profile
                                        </span>
                                    </Link>
                                    <Link to="/" onClick={requestHandler}>
                                        <span className="block p-2 border-b border-stone-100 border-opacity-50">
                                            <Icon id="logout" /> Logout
                                        </span>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/auth/login">
                                        <span className="block p-2 border-b border-stone-100 border-opacity-50">
                                            <Icon id="login" /> Login
                                        </span>
                                    </Link>
                                    <Link to="/auth/register">
                                        <span className="block p-2 border-b border-stone-100 border-opacity-50">
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
                <header className="flex justify-between bg-gradient-to-r from-emerald-300 via-emerald-700 to-emerald-300">
                    <div className="p-3">
                        <Link to="/stock-explorer">
                            <span className="text-gray-600">
                                <Icon id="stock" /> Stock Explorer
                            </span>
                        </Link>
                        <Link to="/crypto-explorer">
                            <span className="ml-6 text-gray-600">
                                <Icon id="crypto" /> Crypto Explorer
                            </span>
                        </Link>
                    </div>
                    <div className="p-3">
                        <Link to="/">
                            <span className="uppercase text-yellow-500">
                                <Icon id="logo" /> Orion Trade
                            </span>
                        </Link>
                    </div>
                    <div className="p-3">
                        {authenticated ? (
                            <>
                                <Link to="#">
                                    <span className="text-gray-600">
                                        <Icon id="control" /> Control Panel
                                    </span>
                                </Link>
                                <Link to="/dashboard">
                                    <span className="text-gray-600">
                                        <Icon id="menu" />
                                        Dashboard
                                    </span>
                                </Link>
                                <Link to="/profile">
                                    <span className="ml-6 text-gray-600">
                                        <Icon id="profile" /> Profile
                                    </span>
                                </Link>
                                <Link to="/" onClick={requestHandler}>
                                    <span className="ml-6 text-gray-600">
                                        <Icon id="logout" /> Logout
                                    </span>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/auth/login">
                                    <span className="text-gray-600">
                                        <Icon id="login" /> Login
                                    </span>
                                </Link>
                                <Link to="/auth/register">
                                    <span className="ml-6 text-gray-600">
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
