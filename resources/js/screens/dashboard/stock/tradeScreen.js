/** React. */
import { useEffect, useState } from "react";

/** Vendor. */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/** Hook. */
import useScreen from "../../../hooks/use-screen";
import useAuth from "../../../hooks/use-auth";

/** Helper. */
import { chunkObject } from "../../../helpers";

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

    /** Use state. */
    const [commonChunks, setCommonChunks] = useState();
    const [commonIndex, setCommonIndex] = useState();
    const [commonChunk, setCommonChunk] = useState();

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

        /** Use helper. */
        if (common) {
            /** Call chunk helper. */
            const { pages, chunks } = chunkObject({ divide: 10, data: common });

            /** Set state. */
            setCommonChunks(chunks);
            setCommonIndex(pages);
        }
    }, [access_token, logged, bluechip, common]);

    /** Common handler. */
    const commonHandler = (index) => {
        /** Set state. */
        setCommonChunk(commonChunks[index]);
    };

    /** Desktop header. */
    const desktopHeader = (
        <div className="card grid auto-rows-min grid-cols-8 h-fit rounded-t-md bg-stone-100">
            <div className="p-2">
                <p className="uppercase text-green-500 text-[.65rem]">Symbol</p>
            </div>
            <div className="p-2">
                <p className="uppercase text-green-500 text-[.65rem]">Price</p>
            </div>
            <div className="p-2">
                <p className="uppercase text-green-500 text-[.65rem]">Value</p>
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
    );

    /** Desktop content. */
    const desktopContent = (item) => {
        return (
            <div className="card grid auto-rows-min grid-cols-8 h-fit border-b border-stone-200 bg-stone-50 hover:text-green-500">
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
    };

    /** Desktop content. */
    const desktopPaginateButton = (item, index) => {
        return (
            <button
                className="p-2 border border-stone-50 hover:bg-stone-100"
                type="button"
                onClick={() => {
                    commonHandler(index);
                }}
            >
                {index + 1}
            </button>
        );
    };

    /** Mobile content. */
    const mobileContent = (item) => {
        return (
            <div className="my-1 card-rounded grid auto-rows-min sm:grid-cols-2 md:grid-cols-4 hover:text-green-500">
                <div className="p-2">
                    <p className="uppercase p-2 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500 text-[.5rem]">
                        Symbol
                    </p>
                    <p className="pt-2 text-center">{item.symbol}</p>
                </div>
                <div className="p-2">
                    <p className="uppercase p-2 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500 text-[.5rem]">
                        Price
                    </p>
                    <p className="pt-2 text-center">{item.price}</p>
                </div>
                <div className="p-2">
                    <p className="uppercase p-2 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500 text-[.5rem]">
                        Value
                    </p>
                    <p className="pt-2 text-center">{item.value}</p>
                </div>
                <div className="p-2">
                    <p className="uppercase p-2 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500 text-[.5rem]">
                        Price Range
                    </p>
                    <p className="pt-2 text-center">{item.pricerange}</p>
                </div>
                <div className="p-2">
                    <p className="uppercase p-2 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500 text-[.5rem]">
                        Total Assets
                    </p>
                    <p className="pt-2 text-center">{item.totalassets}</p>
                </div>
                <div className="p-2">
                    <p className="uppercase p-2 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500 text-[.5rem]">
                        Net Income
                    </p>
                    <p className="pt-2 text-center">{item.netincomeaftertax}</p>
                </div>
                <div className="p-2">
                    <p className="uppercase p-2 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500 text-[.5rem]">
                        Debt Equity Ratio
                    </p>
                    <p className="pt-2 text-center">{item.debtequityratio}</p>
                </div>
                <div className="p-2">
                    <p className="uppercase p-2 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500 text-[.5rem]">
                        Dividend Yield
                    </p>
                    <p className="pt-2 text-center">{item.dividendyield}</p>
                </div>
            </div>
        );
    };
    /** Return something. */
    return (
        <>
            {/** Bluechip section. */}
            <div className="m-2 grid auto-rows-min h-fit font-size">
                <div className="p-2 h-12 uppercase">
                    <Icon id="trade" /> Blue Chip Stocks
                </div>
                <div className="p-2">
                    {isMobile ? (
                        loadblue ? (
                            <Loader />
                        ) : (
                            bluechip &&
                            bluechip.map((item) => {
                                return mobileContent(item);
                            })
                        )
                    ) : loadblue ? (
                        <Loader />
                    ) : (
                        <>
                            {desktopHeader}
                            {bluechip &&
                                bluechip.map((item) => {
                                    return desktopContent(item);
                                })}
                        </>
                    )}
                </div>
            </div>

            {/** Common section. */}
            <div className="m-2 grid auto-rows-min  h-fit font-size">
                <div className="p-2 h-12 uppercase">
                    <Icon id="trade" /> Common Stocks
                </div>
                <div className="p-2">
                    {isMobile ? (
                        loadcommon ? (
                            <Loader />
                        ) : (
                            common &&
                            common.map((item) => {
                                return mobileContent(item);
                            })
                        )
                    ) : loadcommon ? (
                        <Loader />
                    ) : (
                        <>
                            {commonChunk ? (
                                <>
                                    {desktopHeader}
                                    {commonChunk.map((item, index) => {
                                        return desktopContent(item);
                                    })}
                                </>
                            ) : (
                                commonChunks && (
                                    <>
                                        {desktopHeader}
                                        {commonChunks[0].map((item, index) => {
                                            return desktopContent(item);
                                        })}
                                    </>
                                )
                            )}

                            {commonIndex && (
                                <div className="card grid auto-rows-min col-span-8 h-fit border-b border-stone-200 bg-stone-50">
                                    <div clasName="flex flex-row font-size gap-2 m-2">
                                        {commonIndex.map((item, index) => {
                                            return desktopPaginateButton(
                                                item,
                                                index
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Trade;
