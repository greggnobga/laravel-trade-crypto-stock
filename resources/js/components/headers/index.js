/** React. */
import { useState } from "react";

/** Vendor. */
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/** Hook. */
import useScreen from "../../hooks/use-screen";

/** Component. */
import Icon from "../icons";

const Header = () => {
    /** Get state. */
    const userLogin = useSelector((state) => state.userLogin);
    const { auth } = userLogin;

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
                <header className="flex justify-between h-14 gradient-blue-purple border-bottom text-slate-50 relative">
                    <div className="p-2">
                        <Link to="/">
                            <span className="block uppercase hover:text-slate-300">
                                <Icon id="logo" /> Orion
                            </span>
                        </Link>
                    </div>
                    <div className="p-0">
                        {auth ? (
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
                        <nav className="flex flex-col flex-grow shadow gradient-blue-purple text-slate-50 absolute w-full top-14 right-0">
                            <Link to="/stock-explorer">
                                <span className="block border-bottom hover:text-slate-300">
                                    <Icon id="stock" /> Stock Explorer
                                </span>
                            </Link>
                            <Link to="/crypto-explorer">
                                <span className="block border-bottom hover:text-slate-300">
                                    <Icon id="crypto" /> Crypto Explorer
                                </span>
                            </Link>
                            {auth ? (
                                <>
                                    <Link to="/dashboard">
                                        <span className="block border-bottom hover:text-slate-300">
                                            <Icon id="menu" /> Dashboard
                                        </span>
                                    </Link>
                                    <Link to="/profile">
                                        <span className="block border-bottom hover:text-slate-300">
                                            <Icon id="profile" /> Profile
                                        </span>
                                    </Link>
                                    <Link to="/">
                                        <span className="block border-bottom hover:text-slate-300">
                                            <Icon id="logout" /> Logout
                                        </span>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/auth/login">
                                        <span className="block border-bottom hover:text-slate-300">
                                            <Icon id="login" /> Login
                                        </span>
                                    </Link>
                                    <Link to="/auth/register">
                                        <span className="block border-bottom hover:text-slate-300">
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
                <header className="flex justify-between gradient-blue-purple text-slate-50">
                    <div className="p-3">
                        <Link to="/stock-explorer">
                            <span className="hover:text-slate-300">
                                <Icon id="stock" /> Stock Explorer
                            </span>
                        </Link>
                        <Link to="/crypto-explorer">
                            <span className="ml-6 hover:text-slate-300">
                                <Icon id="crypto" /> Crypto Explorer
                            </span>
                        </Link>
                    </div>
                    <div className="p-3">
                        <Link to="/">
                            <span className="uppercase text-yellow-500 hover:text-slate-200">
                                <Icon id="logo" /> Orion Trade
                            </span>
                        </Link>
                    </div>
                    <div className="p-3">
                        {auth ? (
                            <>
                                <Link to="#">
                                    <span className="hover:text-slate-300">
                                        <Icon id="control" /> Control Panel
                                    </span>
                                </Link>
                                <Link to="/dashboard">
                                    <span className="hover:text-slate-300">
                                        <Icon id="menu" />
                                        Dashboard
                                    </span>
                                </Link>
                                <Link to="/profile">
                                    <span className="ml-6 hover:text-slate-300">
                                        <Icon id="profile" /> Profile
                                    </span>
                                </Link>
                                <Link to="/">
                                    <span className="ml-6 hover:text-slate-300">
                                        <Icon id="logout" /> Logout
                                    </span>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/auth/login">
                                    <span className="hover:text-slate-300">
                                        <Icon id="login" /> Login
                                    </span>
                                </Link>
                                <Link to="/auth/register">
                                    <span className="ml-6 hover:text-slate-300">
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
