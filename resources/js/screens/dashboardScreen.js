/** React. */
import { useEffect, useState } from "react";

/** Vendor. */
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/** Hook. */
import useAuth from "../hooks/use-auth";

/** Component. */
import Icon from "../components/icons";
import Message from "../components/interfaces/message";
import Loader from "../components/interfaces/loader";

/** Action. */
import { resendEmail } from "../actions/userActions";
import {
    stockStart,
    stockPrice,
    stockReport,
    stockDividend,
    stockSector,
} from "../actions/stockActions";

const Dashboard = () => {
    /** Use selector. */
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, logged, access_token, email_verified } = userLogin;

    const showMessage = useSelector((state) => state.showMessage);
    const { message, error } = showMessage;

    /** Use auth. */
    const { check } = useAuth();

    /** Use navigate. */
    const navigate = useNavigate();

    /** Use effect. */
    useEffect(() => {
        /** If account state set, check if access token is valid. */
        if (access_token) {
            /** Perform check. */
            check(access_token);
        }

        /** If become undefined then redirect. */
        if (logged === false) {
            const timeout = setTimeout(() => {
                navigate("/auth/login");
            }, 2000);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [access_token, logged]);

    /** Use dispatch. */
    const dispatch = useDispatch();

    /** Use state. */
    const [verify, setVerify] = useState(email_verified);

    /** Resend email verification. */
    const resendHandler = () => {
        /** Set state value. */
        setVerify(true);
        /** Dispatch action. */
        dispatch(resendEmail(access_token));
    };

    /** Fecth data from external endpoint. */
    const stockStartHandler = () => {
        /** Dispatch action. */
        dispatch(stockStart(access_token));
    };

    const stockPriceHandler = () => {
        /** Dispatch action. */
        dispatch(stockPrice(access_token));
    };

    const stockReportHandler = () => {
        /** Dispatch action. */
        dispatch(stockReport(access_token));
    };

    const stockDividendHandler = () => {
        /** Dispatch action. */
        dispatch(stockDividend(access_token));
    };

    const stockSectorHandler = () => {
        /** Dispatch action. */
        dispatch(stockSector(access_token));
    };
    /** Return. */
    return (
        <>
            {logged && (
                <>
                    {error && (
                        <Message variant="alert-warning" children={error} />
                    )}
                    {message && (
                        <Message variant="alert-success" children={message} />
                    )}
                    {!verify && (
                        <div
                            className="font-size m-2 cursor-pointer hover:animate-pulse"
                            onClick={resendHandler}
                        >
                            <p className="alert-info">
                                Your email address has not yet been verified.
                                Click to resend your email verification code.
                            </p>
                        </div>
                    )}
                    {loading ? (
                        <div className="w-screen h-screen form-center">
                            <Loader />
                        </div>
                    ) : (
                        <div className="grid auto-rows-min gap-2 h-fit p-2 font-size">
                            <div className="grid auto-rows-min gap-2 h-fit">
                                <div className="p-2">
                                    <span>Fetch External Data</span>
                                </div>
                                <div className="p-2 card-rounded-scale grid auto-rows-min sm:grid-cols-2 md:grid-cols-4 gap-2">
                                    <div className="p-0 has-tooltip">
                                        <span class="tooltip uppercase text-center">
                                            Get the symbol, name, price, volume,
                                            and change.
                                        </span>
                                        <button
                                            onClick={stockStartHandler}
                                            className="btn btn-red"
                                            type="button"
                                        >
                                            <Icon id="start" /> Start
                                        </button>
                                    </div>
                                    <div className="p-0 has-tooltip">
                                        <span class="tooltip uppercase text-center">
                                            Get value, year high and low prices.
                                        </span>
                                        <button
                                            onClick={stockPriceHandler}
                                            className="btn btn-blue"
                                            type="button"
                                        >
                                            <Icon id="price" /> Price
                                        </button>
                                    </div>
                                    <div className="p-0 has-tooltip">
                                        <span class="tooltip uppercase text-center">
                                            Get income after tax and earnings
                                            per share.
                                        </span>
                                        <button
                                            onClick={stockReportHandler}
                                            className="btn btn-green"
                                            type="button"
                                        >
                                            <Icon id="report" /> Report
                                        </button>
                                    </div>

                                    <div className="p-0 has-tooltip">
                                        <span class="tooltip uppercase text-center">
                                            Get the yearly dividend yield.
                                        </span>
                                        <button
                                            onClick={stockDividendHandler}
                                            className="btn btn-emerald"
                                            type="button"
                                        >
                                            <Icon id="dividend" /> Dividend
                                        </button>
                                    </div>
                                    <div className="p-0 has-tooltip">
                                        <span class="tooltip uppercase text-center">
                                            Get the sector to which stock
                                            belongs.
                                        </span>
                                        <button
                                            onClick={stockSectorHandler}
                                            className="btn btn-indigo"
                                            type="button"
                                        >
                                            <Icon id="sector" /> Sector
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="grid auto-rows-min h-fit">
                                <div className="p-2">
                                    <span>Asset Allocation</span>
                                </div>
                                <div className="flex flex-col flex-wrap sm:flex-row justify-center gap-2">
                                    <div className="card-rounded-scale text-red-500 ">
                                        <div className="h-8 p-2 mb-6">
                                            <p className="uppercase">
                                                <Icon id="stock" /> Stock
                                            </p>
                                        </div>
                                        <div className="h-20">
                                            <p className="uppercase text-center mx-auto text-2xl sm:text-3xl md:text-4xl">
                                                1000
                                            </p>
                                        </div>
                                        <div className="h-8 p-2 mb-2">
                                            <p className="uppercase text-right">
                                                <Link to="/dashboard/stock-portfolio">
                                                    more
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="card-rounded-scale text-green-500">
                                        <div className="h-8 p-2 mb-6">
                                            <p className="uppercase">
                                                <Icon id="crypto" /> Crypto
                                            </p>
                                        </div>
                                        <div className="h-20">
                                            <p className="uppercase text-center mx-auto text-2xl sm:text-3xl md:text-4xl">
                                                2000
                                            </p>
                                        </div>
                                        <div className="h-8 p-2 mb-2">
                                            <p className="uppercase text-right">
                                                <Link to="/dashboard/crypto-portfolio">
                                                    more
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="card-rounded-scale text-blue-500">
                                        <div className="h-8 p-2 mb-6">
                                            <p className="uppercase">
                                                <Icon id="fund" /> Fund
                                            </p>
                                        </div>
                                        <div className="h-20">
                                            <p className="uppercase text-center mx-auto text-2xl sm:text-3xl md:text-4xl">
                                                3000
                                            </p>
                                        </div>
                                        <div className="h-8 p-2 mb-2">
                                            <p className="uppercase text-right">
                                                <Link to="/dashboard/stock-fund">
                                                    more
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="card-rounded-scale text-orange-500">
                                        <div className="h-8 p-2 mb-6">
                                            <p className="uppercase">
                                                <Icon id="note" /> Note
                                            </p>
                                        </div>
                                        <div className="h-20">
                                            <p className="uppercase text-center mx-auto text-2xl sm:text-3xl md:text-4xl">
                                                4000
                                            </p>
                                        </div>
                                        <div className="h-8 p-2 mb-2">
                                            <p className="uppercase text-right">
                                                <Link to="/dashboard/stock-note">
                                                    more
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 auto-rows-min gap-2 h-fit">
                                <div className="h-8 p-2 sm:col-span-2">
                                    <span>Graphical Representation</span>
                                </div>
                                <div className="h-20 sm:row-start-2 card-rounded-scale">
                                    Account
                                </div>
                                <div className="h-20 sm:row-start-3 card-rounded-scale">
                                    Offers
                                </div>
                                <div className="h-48 sm:h-full sm:row-start-2 sm:col-start-2 sm:row-span-2 card-rounded-scale">
                                    Doughnut Chart
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 auto-rows-min gap-2 h-fit">
                                <div className="h-8 p-2 sm:col-span-2">
                                    <span>Philippine Stock Exchange</span>
                                </div>
                                <div className="h-48 sm:h-full p-2 sm:row-start-2 card-rounded-scale">
                                    Top Gainers
                                </div>
                                <div className="h-48 sm:h-full p-2 sm:row-start-2 sm:col-start-2 card-rounded-scale">
                                    Top Lossers
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 auto-rows-min gap-2 h-fit">
                                <div className="h-8 p-2 sm:col-span-2">
                                    Crypto Currency
                                </div>
                                <div className="h-48 sm:h-full p-2 sm:row-start-2 card-rounded-scale">
                                    Top Gainers
                                </div>
                                <div className="h-48 sm:h-full p-2 sm:row-start-2 sm:col-start-2 card-rounded-scale">
                                    Top Lossers
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default Dashboard;
