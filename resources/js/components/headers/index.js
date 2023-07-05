/** React. */
import { useState } from "react";

/** Vendor. */
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/** Hook. */
import useScreen from "../../hooks/use-screen";

/** Actions. */
import { logout } from "../../actions/userActions";

/** Component. */
import Icon from "../icons";

const Header = () => {
    /** Define dispatch. */
    const dispatch = useDispatch();

    /** Get state. */
    const userLogin = useSelector((state) => state.userLogin);
    const { login } = userLogin;

    /** Use screen hook. */
    const { isMobile } = useScreen();

    /** Use state. */
    const [isBurger, setIsBurger] = useState(false);
    const [isControl, setIsControl] = useState(false);
    const [message, setMessage] = useState(null);

    /** Burger handler. */
    const burgerHandler = () => {
        setIsBurger(!isBurger);
        setIsControl(false);
    };

    /** Control handler. */
    const controlHandler = () => {
        setIsControl(!isControl);
        setIsBurger(false);
    };

    /** Logout handler. */
    const logoutHandler = () => {
        /** Check if auth is not empty. */
        if (login) {
            /** Dispatch actions. */
            dispatch(logout(login.access_token));
        }
    };

    /** Hamburger classes. */
    const burgerClasses = isBurger
        ? "hamburger hamburger-elastic is-active"
        : "hamburger hamburger-elastic";

    /** Control template. */
    const controlTemplate = (
        <nav
            className="flex flex-col flex-grow font-size shadow gradient-blue-purple text-slate-50 absolute w-full top-14 right-0"
            onClick={controlHandler}
        >
            <ul className="py-2">
                <li className="px-2">
                    <h2>Stock</h2>
                </li>
                <li className="px-2">
                    <Link to="/dashboard/stock-portfolio">
                        <span className="block border-bottom">
                            <Icon id="portfolio" /> Portfolio
                        </span>
                    </Link>
                </li>
                <li className="px-2">
                    <Link to="/dashboard/stock-watchlist">
                        <span className="block border-bottom">
                            <Icon id="watchlist" /> Watchlist
                        </span>
                    </Link>
                </li>
                <li className="px-2">
                    <Link to="/dashboard/stock-trade">
                        <span className="block border-bottom">
                            <Icon id="trade" /> Trade
                        </span>
                    </Link>
                </li>
                <li className="px-2">
                    <Link to="/dashboard/stock-chart">
                        <span className="block border-bottom">
                            <Icon id="chart" /> Chart
                        </span>
                    </Link>
                </li>
            </ul>
            <ul className="py-2">
                <li className="px-2">
                    <h2>Crypto</h2>
                </li>
                <li className="px-2">
                    <Link to="/dashboard/crypto-portfolio">
                        <span className="block border-bottom">
                            <Icon id="portfolio" /> Portfolio
                        </span>
                    </Link>
                </li>
                <li className="px-2">
                    <Link to="/dashboard/crypto-screen">
                        <span className="block border-bottom">
                            <Icon id="screen" /> Screen
                        </span>
                    </Link>
                </li>
                <li className="px-2">
                    <Link to="/dashboard/crypto-moon">
                        <span className="block border-bottom">
                            <Icon id="fund" /> Moon
                        </span>
                    </Link>
                </li>
                <li className="px-2">
                    <Link to="/dashboard/crypto-game">
                        <span className="block border-bottom">
                            <Icon id="game" /> Game
                        </span>
                    </Link>
                </li>
                <li className="px-2">
                    <Link to="/dashboard/crypto-nft">
                        <span className="block border-bottom">
                            <Icon id="nft" /> NFT
                        </span>
                    </Link>
                </li>
            </ul>
            <ul className="py-2">
                <li className="px-2">
                    <h2>Extra</h2>
                </li>
                <li className="px-2">
                    <Link to="/dashboard/extra-note">
                        <span className="block pt-2 pl-2">
                            <Icon id="note" /> Note
                        </span>
                    </Link>
                </li>
            </ul>
        </nav>
    );

    /** Return something. */
    return (
        <>
            {isMobile ? (
                <header className="flex justify-between h-14 font-size gradient-blue-purple border-bottom text-slate-50 relative">
                    <div className="p-2">
                        <Link to="/">
                            <span className="block uppercase">
                                <Icon id="logo" /> Orion
                            </span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="hover:text-slate-300">
                            {login ? (
                                <button onClick={controlHandler} type="button">
                                    <span className="p-2">
                                        <Icon
                                            id="control"
                                            width="w-9"
                                            height="h-9"
                                        />
                                    </span>
                                </button>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="hover:text-slate-300">
                            <button
                                className={burgerClasses}
                                onClick={burgerHandler}
                                type="button"
                            >
                                <span className="hamburger-box">
                                    <span className="hamburger-inner"></span>
                                </span>
                            </button>
                        </div>
                    </div>
                    {isBurger ? (
                        <nav
                            className="flex flex-col flex-grow shadow gradient-blue-purple text-slate-50 absolute w-full top-14 right-0"
                            onClick={burgerHandler}
                        >
                            <ul className="py-2">
                                <li className="px-2">
                                    <Link to="/stock-explorer">
                                        <span className="block border-bottom">
                                            <Icon id="stock" /> Stock Explorer
                                        </span>
                                    </Link>
                                </li>
                                <li className="px-2">
                                    <Link to="/crypto-explorer">
                                        <span className="block border-bottom">
                                            <Icon id="crypto" /> Crypto Explorer
                                        </span>
                                    </Link>
                                </li>
                                {login ? (
                                    <>
                                        <li className="px-2">
                                            <Link to="/dashboard">
                                                <span className="block border-bottom">
                                                    <Icon id="menu" /> Dashboard
                                                </span>
                                            </Link>
                                        </li>
                                        <li className="px-2">
                                            <Link to="/profile">
                                                <span className="block border-bottom">
                                                    <Icon id="profile" />{" "}
                                                    Profile
                                                </span>
                                            </Link>
                                        </li>
                                        <li
                                            className="px-2"
                                            onClick={logoutHandler}
                                        >
                                            <Link to="/">
                                                <span className="block pt-2 pl-2">
                                                    <Icon id="logout" /> Logout
                                                </span>
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="px-2">
                                            <Link to="/auth/login">
                                                <span className="block border-bottom">
                                                    <Icon id="login" /> Login
                                                </span>
                                            </Link>
                                        </li>
                                        <li className="px-2">
                                            <Link to="/auth/register">
                                                <span className="block pt-2 pl-2">
                                                    <Icon id="register" />{" "}
                                                    Register
                                                </span>
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </nav>
                    ) : (
                        ""
                    )}
                    {isControl ? controlTemplate : ""}
                </header>
            ) : (
                <header className="flex justify-between h-14 font-size gradient-blue-purple border-bottom text-slate-50 relative">
                    <div className="p-2 md:text-xs">
                        <Link to="/stock-explorer">
                            <span className="hover:text-slate-300">
                                <Icon id="stock" /> Stock Explorer
                            </span>
                        </Link>
                        <Link to="/crypto-explorer">
                            <span className="ml-6">
                                <Icon id="crypto" /> Crypto Explorer
                            </span>
                        </Link>
                    </div>
                    <div className="p-2 sm:text-xs md:text-base lg:text-base">
                        <Link to="/">
                            <span className="uppercase text-yellow-500 hover:text-slate-200">
                                <Icon id="logo" /> Orion Trade
                            </span>
                        </Link>
                    </div>
                    <div className="p-2">
                        {login ? (
                            <ul className="grid grid-cols-4 auto-rows-min">
                                <li className="md:text-xs">
                                    <Link to="#">
                                        <span
                                            className="hover:text-slate-300"
                                            onClick={controlHandler}
                                        >
                                            <Icon id="control" /> Control Panel
                                        </span>
                                    </Link>
                                </li>
                                <li className="md:text-xs">
                                    <Link to="/dashboard">
                                        <span className="ml-6 hover:text-slate-300">
                                            <Icon id="menu" />
                                            Dashboard
                                        </span>
                                    </Link>
                                </li>
                                <li className="md:text-xs">
                                    <Link to="/profile">
                                        <span className="ml-6 hover:text-slate-300">
                                            <Icon id="profile" /> Profile
                                        </span>
                                    </Link>
                                </li>
                                <li
                                    className="md:text-xs"
                                    onClick={logoutHandler}
                                >
                                    <Link to="/">
                                        <span className="ml-6 hover:text-slate-300">
                                            <Icon id="logout" /> Logout
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        ) : (
                            <ul className="grid grid-cols-2 justify-end auto-rows-min">
                                <li className="md:text-xs">
                                    <Link to="/auth/login">
                                        <span className="hover:text-slate-300">
                                            <Icon id="login" /> Login
                                        </span>
                                    </Link>
                                </li>
                                <li className="md:text-xs">
                                    <Link to="/auth/register">
                                        <span className="ml-6 hover:text-slate-300">
                                            <Icon id="register" /> Register
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                    {isControl ? controlTemplate : ""}
                </header>
            )}
        </>
    );
};

export default Header;
