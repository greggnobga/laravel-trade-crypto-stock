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
import Message from "../../../components/interfaces/message";
import Loader from "../../../components/interfaces/loader";

/** Action. */
import {
    actStockBluechip,
    actStockCommon,
} from "../../../actions/stockActions";

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
    const [bluechipChunks, setBluechipChunks] = useState();
    const [bluechipIndex, setBluechipIndex] = useState();
    const [bluechipChunk, setBluechipChunk] = useState();
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
            dispatch(actStockBluechip(access_token));
        }

        /** Send request if no common stock. */
        if (!common) {
            /** Dispatch action. */
            dispatch(actStockCommon(access_token));
        }

        /** Use helper. */
        if (bluechip) {
            /** Call chunk helper. */
            const { pages: bluechipPages, chunks: bluechipChunks } =
                chunkObject({
                    divide: 10,
                    data: bluechip,
                });

            /** Set state. */
            setBluechipChunks(bluechipChunks);
            setBluechipIndex(bluechipPages);
        }

        /** Use helper. */
        if (common) {
            /** Call chunk helper. */
            const { pages: commonPages, chunks: commonChunks } = chunkObject({
                divide: 10,
                data: common,
            });

            /** Set state. */
            setCommonChunks(commonChunks);
            setCommonIndex(commonPages);
        }
    }, [access_token, logged, bluechip, common]);

    /** Common handler. */
    const commonHandler = (index) => {
        /** Set state. */
        setCommonChunk(commonChunks[index]);
    };

    /** Bluechip handler. */
    const bluechipHandler = (index) => {
        /** Set state. */
        setBluechipChunk(bluechipChunks[index]);
    };

    /** Desktop pagination button. */
    const commonPagination = (item, index) => {
        return (
            <button
                className="p-2 hover:bg-slate-100 text-[.75rem] hover:text-green-500"
                type="button"
                onClick={() => {
                    commonHandler(index);
                }}
            >
                {index + 1}
            </button>
        );
    };

    const bluechipPagination = (item, index) => {
        return (
            <button
                className="p-2 hover:bg-slate-100 text-[.75rem] hover:text-green-500"
                type="button"
                onClick={() => {
                    bluechipHandler(index);
                }}
            >
                {index + 1}
            </button>
        );
    };

    /** Desktop header. */
    const desktopHeader = (
        <div className="card grid auto-rows-min grid-cols-8 h-fit rounded-t-md bg-stone-100 font-size">
            <div className="p-2">
                <p className="uppercase text-green-500">Symbol</p>
            </div>
            <div className="p-2">
                <p className="uppercase text-green-500">Price</p>
            </div>
            <div className="p-2">
                <p className="uppercase text-green-500">Value</p>
            </div>
            <div className="p-2">
                <p className="uppercase text-green-500">Price Range</p>
            </div>
            <div className="p-2">
                <p className="uppercase text-green-500">Total Assets</p>
            </div>
            <div className="p-2">
                <p className="uppercase text-green-500">Net Income</p>
            </div>
            <div className="p-2">
                <p className="uppercase text-green-500">Debt Equity Ratio</p>
            </div>
            <div className="p-2">
                <p className="uppercase text-green-500">Dividend Yield</p>
            </div>
        </div>
    );

    /** Desktop content. */
    const desktopContent = (item) => {
        return (
            <div className="card grid auto-rows-min grid-cols-8 h-fit border-b border-stone-200 bg-stone-50 hover:text-green-500 font-size">
                <div className="p-2">
                    <span className="uppercase">{item.symbol}</span>
                </div>
                <div className="p-2">
                    <span className="uppercase">{item.price}</span>
                </div>
                <div className="p-2">
                    <span className="uppercase">{item.value}</span>
                </div>
                <div className="p-2">
                    <span className="uppercase">{item.pricerange}</span>
                </div>
                <div className="p-2">
                    <span className="uppercase">{item.totalassets}</span>
                </div>
                <div className="p-2">
                    <span className="uppercase">{item.netincomeaftertax}</span>
                </div>
                <div className="p-2">
                    <span className="uppercase">{item.debtequityratio}</span>
                </div>
                <div className="p-2">
                    <span className="uppercase">{item.dividendyield}</span>
                </div>
            </div>
        );
    };

    /** Mobile content. */
    const mobileContent = (item) => {
        return (
            <div className="m-1 card-rounded grid auto-rows-min grid-cols-2 sm:grid-cols-3 md:grid-cols-4 hover:text-green-500 font-size">
                <div className="p-1">
                    <p className="uppercase p-1 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500">
                        Symbol
                    </p>
                    <p className="pt-1 text-center">{item.symbol}</p>
                </div>
                <div className="p-1">
                    <p className="uppercase p-1 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500">
                        Price
                    </p>
                    <p className="pt-1 text-center">{item.price}</p>
                </div>
                <div className="p-1">
                    <p className="uppercase p-1 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500">
                        Value
                    </p>
                    <p className="pt-1 text-center">{item.value}</p>
                </div>
                <div className="p-1">
                    <p className="uppercase p-1 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500">
                        Price Range
                    </p>
                    <p className="pt-1 text-center">{item.pricerange}</p>
                </div>
                <div className="p-1">
                    <p className="uppercase p-1 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500">
                        Total Assets
                    </p>
                    <p className="pt-1 text-center">{item.totalassets}</p>
                </div>
                <div className="p-1">
                    <p className="uppercase p-1 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500">
                        Net Income
                    </p>
                    <p className="pt-1 text-center">{item.netincomeaftertax}</p>
                </div>
                <div className="p-1">
                    <p className="uppercase p-1 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500">
                        Debt Equity Ratio
                    </p>
                    <p className="pt-1 text-center">{item.debtequityratio}</p>
                </div>
                <div className="p-1">
                    <p className="uppercase p-1 rounded-t-md bg-stone-100 border-b border-stone-200 text-green-500">
                        Dividend Yield
                    </p>
                    <p className="pt-1 text-center">{item.dividendyield}</p>
                </div>
            </div>
        );
    };
    /** Return something. */
    return (
        <>
            {error && <Message variant="alert-warning" children={error} />}
            {message && <Message variant="alert-success" children={message} />}
            {/** Bluechip section. */}
            <div className="m-2 grid auto-rows-min h-fit font-size">
                <div className="p-2 h-8 sm:10 uppercase">
                    <Icon id="trade" /> Blue Chip Stocks
                </div>
                <div className="p-2">
                    {isMobile ? (
                        loadblue ? (
                            <Loader />
                        ) : (
                            <>
                                {bluechipChunk && bluechipChunk ? (
                                    <>
                                        {bluechipChunk.map((item, index) => {
                                            return mobileContent(item);
                                        })}
                                    </>
                                ) : (
                                    bluechipChunks && (
                                        <>
                                            {bluechipChunks[0].map(
                                                (item, index) => {
                                                    return mobileContent(item);
                                                }
                                            )}
                                        </>
                                    )
                                )}

                                {bluechipIndex && (
                                    <div className="grid auto-rows-min h-fit text-right border border-slate-50 bg-slate-100 shadow rounded m-1">
                                        <div clasName="flex flex-row font-size gap-1 m-1">
                                            {bluechipIndex.map(
                                                (item, index) => {
                                                    return bluechipPagination(
                                                        item,
                                                        index
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        )
                    ) : loadblue ? (
                        <Loader />
                    ) : (
                        <>
                            {bluechipChunk && bluechipChunk ? (
                                <>
                                    {desktopHeader}
                                    {bluechipChunk.map((item, index) => {
                                        return desktopContent(item);
                                    })}
                                </>
                            ) : (
                                bluechipChunks && (
                                    <>
                                        {desktopHeader}
                                        {bluechipChunks[0].map(
                                            (item, index) => {
                                                return desktopContent(item);
                                            }
                                        )}
                                    </>
                                )
                            )}

                            {bluechipIndex && (
                                <div className="card grid auto-rows-min col-span-8 h-fit border-b border-stone-200 bg-stone-50 text-right">
                                    <div clasName="flex flex-row font-size gap-2 m-2">
                                        {bluechipIndex.map((item, index) => {
                                            return bluechipPagination(
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

            {/** Common section. */}
            <div className="m-2 grid auto-rows-min h-fit">
                <div className="p-2 h-8 sm:10 uppercase">
                    <Icon id="trade" /> Common Stocks
                </div>
                <div className="p-2">
                    {isMobile ? (
                        loadcommon ? (
                            <Loader />
                        ) : (
                            <>
                                {commonChunk && commonChunk ? (
                                    <>
                                        {commonChunk.map((item, index) => {
                                            return mobileContent(item);
                                        })}
                                    </>
                                ) : (
                                    commonChunks && (
                                        <>
                                            {commonChunks[0].map(
                                                (item, index) => {
                                                    return mobileContent(item);
                                                }
                                            )}
                                        </>
                                    )
                                )}

                                {commonIndex && (
                                    <div className="grid auto-rows-min h-fit text-right border border-slate-50 bg-slate-100 shadow rounded m-1">
                                        <div clasName="flex flex-row font-size gap-1 m-1">
                                            {commonIndex.map((item, index) => {
                                                return commonPagination(
                                                    item,
                                                    index
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </>
                        )
                    ) : loadcommon ? (
                        <Loader />
                    ) : (
                        <>
                            {commonChunk && commonChunk ? (
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
                                <div className="card grid auto-rows-min col-span-8 h-fit border-b border-stone-200 bg-stone-50 text-right">
                                    <div clasName="flex flex-row font-size gap-2 m-2">
                                        {commonIndex.map((item, index) => {
                                            return commonPagination(
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
