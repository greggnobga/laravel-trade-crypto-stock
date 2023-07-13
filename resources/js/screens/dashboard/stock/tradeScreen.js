/** React. */
import { useEffect } from "react";

/** Vendor. */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/** Hook. */
import useScreen from "../../../hooks/use-screen";
import useAuth from "../../../hooks/use-auth";

/** Component. */
import Icon from "../../../components/icons";
import Loader from "../../../components/interfaces/loader";
/** Action. */
import { stockBlueChip, stockCommonChip } from "../../../actions/stockActions";

const Trade = () => {
    /** Use selector. */
    const userLogin = useSelector((state) => state.userLogin);
    const { logged, access_token } = userLogin;

    const stockBlue = useSelector((state) => state.stockBlue);
    const { loading: loadblue, bluechip } = stockBlue;

    const stockCommon = useSelector((state) => state.stockCommon);
    const { loading: loadcommon, common } = stockCommon;

    const showMessage = useSelector((state) => state.showMessage);
    const { message, error } = showMessage;

    /** Use screen. */
    const { isMobile } = useScreen();

    /** Use dispatch. */
    const dispatch = useDispatch();

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
        /** Send request if no bluechip stock. */
        if (!bluechip) {
            /** Dispatch action. */
            dispatch(stockBlueChip(access_token));
        }
        /** Send request if no common stock. */
        if (!common) {
            /** Dispatch action. */
            dispatch(stockCommonChip(access_token));
        }
    }, [access_token, logged, bluechip, common]);

    /** Return something. */
    return (
        <>
            {/** Bluechip section. */}
            <div className="m-2 grid auto-rows-min  h-fit font-size">
                <div className="p-2 h-12 uppercase">
                    <Icon id="trade" /> Blue Chip Stocks
                </div>
                {isMobile ? (
                    loadblue ? (
                        <Loader />
                    ) : (
                        bluechip &&
                        bluechip.map((item) => {
                            return (
                                <div className="my-1 card-rounded grid auto-rows-min sm:grid-cols-2 md:grid-cols-4 hover:text-green-500">
                                    <div className="p-2">
                                        <p className="uppercase p-2 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500 text-[.5rem]">
                                            Symbol
                                        </p>
                                        <p className="pt-2 text-center">
                                            {item.symbol}
                                        </p>
                                    </div>
                                    <div className="p-2">
                                        <p className="uppercase p-2 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500 text-[.5rem]">
                                            Price
                                        </p>
                                        <p className="pt-2 text-center">
                                            {item.price}
                                        </p>
                                    </div>
                                    <div className="p-2">
                                        <p className="uppercase p-2 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500 text-[.5rem]">
                                            Value
                                        </p>
                                        <p className="pt-2 text-center">
                                            {item.value}
                                        </p>
                                    </div>
                                    <div className="p-2">
                                        <p className="uppercase p-2 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500 text-[.5rem]">
                                            Price Range
                                        </p>
                                        <p className="pt-2 text-center">
                                            {item.pricerange}
                                        </p>
                                    </div>
                                    <div className="p-2">
                                        <p className="uppercase p-2 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500 text-[.5rem]">
                                            Total Assets
                                        </p>
                                        <p className="pt-2 text-center">
                                            {item.totalassets}
                                        </p>
                                    </div>
                                    <div className="p-2">
                                        <p className="uppercase p-2 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500 text-[.5rem]">
                                            Net Income
                                        </p>
                                        <p className="pt-2 text-center">
                                            {item.netincomeaftertax}
                                        </p>
                                    </div>
                                    <div className="p-2">
                                        <p className="uppercase p-2 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500 text-[.5rem]">
                                            Debt Equity Ratio
                                        </p>
                                        <p className="pt-2 text-center">
                                            {item.debtequityratio}
                                        </p>
                                    </div>
                                    <div className="p-2">
                                        <p className="uppercase p-2 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500 text-[.5rem]">
                                            Dividend Yield
                                        </p>
                                        <p className="pt-2 text-center">
                                            {item.dividendyield}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    )
                ) : loadblue ? (
                    <Loader />
                ) : (
                    <>
                        <div className="card grid auto-rows-min grid-cols-8 h-fit p-2 rounded-t-md bg-stone-100">
                            <div className="p-2">
                                <p className="uppercase text-green-500 text-[.65rem]">
                                    Symbol
                                </p>
                            </div>
                            <div className="p-2">
                                <p className="uppercase text-green-500 text-[.65rem]">
                                    Price
                                </p>
                            </div>
                            <div className="p-2">
                                <p className="uppercase text-green-500 text-[.65rem]">
                                    Value
                                </p>
                            </div>
                            <div className="p-2">
                                <p className="uppercase text-green-500 text-[.65rem]">
                                    Price Range
                                </p>
                            </div>
                            <div className="p-2">
                                <p className="uppercase text-green-500 text-[.65rem]">
                                    Total Assets
                                </p>
                            </div>
                            <div className="p-2">
                                <p className="uppercase text-green-500 text-[.65rem]">
                                    Net Income
                                </p>
                            </div>
                            <div className="p-2">
                                <p className="uppercase text-green-500 text-[.65rem]">
                                    Debt Equity Ratio
                                </p>
                            </div>
                            <div className="p-2">
                                <p className="uppercase text-green-500 text-[.65rem]">
                                    Dividend Yield
                                </p>
                            </div>
                        </div>
                        {bluechip &&
                            bluechip.map((item) => {
                                return (
                                    <div className="card grid auto-rows-min grid-cols-8 h-fit border-b border-stone-200 p-2 bg-stone-50 hover:text-green-500">
                                        <div className="p-2">
                                            <span className="uppercase text-[.70rem]">
                                                {item.symbol}
                                            </span>
                                        </div>
                                        <div className="p-2">
                                            <span className="uppercase text-[.70rem]">
                                                {item.price}
                                            </span>
                                        </div>
                                        <div className="p-2">
                                            <span className="uppercase text-[.70rem]">
                                                {item.value}
                                            </span>
                                        </div>
                                        <div className="p-2">
                                            <span className="uppercase text-[.70rem]">
                                                {item.pricerange}
                                            </span>
                                        </div>
                                        <div className="p-2">
                                            <span className="uppercase text-[.70rem]">
                                                {item.totalassets}
                                            </span>
                                        </div>
                                        <div className="p-2">
                                            <span className="uppercase text-[.70rem]">
                                                {item.netincomeaftertax}
                                            </span>
                                        </div>
                                        <div className="p-2">
                                            <span className="uppercase text-[.70rem]">
                                                {item.debtequityratio}
                                            </span>
                                        </div>
                                        <div className="p-2">
                                            <span className="uppercase text-[.70rem]">
                                                {item.dividendyield}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                    </>
                )}
            </div>
            {/** Common section. */}
            <div className="m-2 grid auto-rows-min  h-fit font-size">
                <div className="p-2 h-12 uppercase">
                    <Icon id="trade" /> Common Stocks
                </div>
                {isMobile ? (
                    loadcommon ? (
                        <Loader />
                    ) : (
                        common &&
                        common.map((item) => {
                            return (
                                <div className="my-1 card-rounded grid auto-rows-min sm:grid-cols-2 md:grid-cols-4 hover:text-green-500">
                                    <div className="p-2">
                                        <p className="uppercase p-2 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500 text-[.5rem]">
                                            Symbol
                                        </p>
                                        <p className="pt-2 text-center">
                                            {item.symbol}
                                        </p>
                                    </div>
                                    <div className="p-2">
                                        <p className="uppercase p-2 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500 text-[.5rem]">
                                            Price
                                        </p>
                                        <p className="pt-2 text-center">
                                            {item.price}
                                        </p>
                                    </div>
                                    <div className="p-2">
                                        <p className="uppercase p-2 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500 text-[.5rem]">
                                            Value
                                        </p>
                                        <p className="pt-2 text-center">
                                            {item.value}
                                        </p>
                                    </div>
                                    <div className="p-2">
                                        <p className="uppercase p-2 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500 text-[.5rem]">
                                            Price Range
                                        </p>
                                        <p className="pt-2 text-center">
                                            {item.pricerange}
                                        </p>
                                    </div>
                                    <div className="p-2">
                                        <p className="uppercase p-2 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500 text-[.5rem]">
                                            Total Assets
                                        </p>
                                        <p className="pt-2 text-center">
                                            {item.totalassets}
                                        </p>
                                    </div>
                                    <div className="p-2">
                                        <p className="uppercase p-2 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500 text-[.5rem]">
                                            Net Income
                                        </p>
                                        <p className="pt-2 text-center">
                                            {item.netincomeaftertax}
                                        </p>
                                    </div>
                                    <div className="p-2">
                                        <p className="uppercase p-2 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500 text-[.5rem]">
                                            Debt Equity Ratio
                                        </p>
                                        <p className="pt-2 text-center">
                                            {item.debtequityratio}
                                        </p>
                                    </div>
                                    <div className="p-2">
                                        <p className="uppercase p-2 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500 text-[.5rem]">
                                            Dividend Yield
                                        </p>
                                        <p className="pt-2 text-center">
                                            {item.dividendyield}
                                        </p>
                                    </div>
                                    <div className="p-2 sm:col-span-2 md:col-span-4">
                                        <p className="pt-2 text-center">
                                            Action
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    )
                ) : loadcommon ? (
                    <Loader />
                ) : (
                    <>
                        <div className="card grid auto-rows-min grid-cols-9 h-fit p-2 rounded-t-md bg-stone-100">
                            <div className="p-2">
                                <p className="uppercase text-green-500 text-[.65rem]">
                                    Symbol
                                </p>
                            </div>
                            <div className="p-2">
                                <p className="uppercase text-green-500 text-[.65rem]">
                                    Price
                                </p>
                            </div>
                            <div className="p-2">
                                <p className="uppercase text-green-500 text-[.65rem]">
                                    Value
                                </p>
                            </div>
                            <div className="p-2">
                                <p className="uppercase text-green-500 text-[.65rem]">
                                    Price Range
                                </p>
                            </div>
                            <div className="p-2">
                                <p className="uppercase text-green-500 text-[.65rem]">
                                    Total Assets
                                </p>
                            </div>
                            <div className="p-2">
                                <p className="uppercase text-green-500 text-[.65rem]">
                                    Net Income
                                </p>
                            </div>
                            <div className="p-2">
                                <p className="uppercase text-green-500 text-[.65rem]">
                                    Debt Equity Ratio
                                </p>
                            </div>
                            <div className="p-2">
                                <p className="uppercase text-green-500 text-[.65rem]">
                                    Dividend Yield
                                </p>
                            </div>
                            <div className="p-2">
                                <p className="uppercase text-green-500 text-[.65rem]">
                                    Action
                                </p>
                            </div>
                        </div>
                        {common &&
                            common.map((item) => {
                                return (
                                    <div className="card grid auto-rows-min grid-cols-9 h-fit border-b border-stone-200 p-2 bg-stone-50 hover:text-green-500">
                                        <div className="p-2">
                                            <span className="uppercase text-[.70rem]">
                                                {item.symbol}
                                            </span>
                                        </div>
                                        <div className="p-2">
                                            <span className="uppercase text-[.70rem]">
                                                {item.price}
                                            </span>
                                        </div>
                                        <div className="p-2">
                                            <span className="uppercase text-[.70rem]">
                                                {item.value}
                                            </span>
                                        </div>
                                        <div className="p-2">
                                            <span className="uppercase text-[.70rem]">
                                                {item.pricerange}
                                            </span>
                                        </div>
                                        <div className="p-2">
                                            <span className="uppercase text-[.70rem]">
                                                {item.totalassets}
                                            </span>
                                        </div>
                                        <div className="p-2">
                                            <span className="uppercase text-[.70rem]">
                                                {item.netincomeaftertax}
                                            </span>
                                        </div>
                                        <div className="p-2">
                                            <span className="uppercase text-[.70rem]">
                                                {item.debtequityratio}
                                            </span>
                                        </div>
                                        <div className="p-2">
                                            <span className="uppercase text-[.70rem]">
                                                {item.dividendyield}
                                            </span>
                                        </div>
                                        <div className="p-2">
                                            <span className="uppercase text-[.70rem]">
                                                Action
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                    </>
                )}
            </div>
        </>
    );
};

export default Trade;
