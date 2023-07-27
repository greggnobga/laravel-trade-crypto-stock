/** React. */
import { useEffect, useState } from "react";

/** Vendor. */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/** Hook. */
import useScreen from "../../../hooks/UseScreen";

/** Helper. */
import { chunkObject } from "../../../components/Helper";

/** Component. */
import Icon from "../../../components/Icon";
import Loader from "../../../components/Loader";
import Notice from "../../../components/Notice";
import Container from "../../../components/Container";

/** Template. */
import { desktopHeader, desktopTemplate, mobileTemplate, paginationTemplate } from "../../template/Stocks";

/** Action. */
import { actStockBluechip, actStockCommon, actStockWatchStore } from "../../../actions/StockActions";
import { tokenUser } from "../../../actions/UserActions.js";

const Trade = () => {
    /** Use selector. */
    const userLogin = useSelector((state) => state.userLogin);
    const { access_token } = userLogin;

    const userToken = useSelector((state) => state.userToken);
    const { valid } = userToken;

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

    /** Use navigate. */
    const navigate = useNavigate();

    /** Use state. */
    const [bluechipChunks, setBluechipChunks] = useState();
    const [bluechipIndex, setBluechipIndex] = useState();
    const [bluechipChunk, setBluechipChunk] = useState();
    const [commonChunks, setCommonChunks] = useState();
    const [commonIndex, setCommonIndex] = useState();
    const [commonChunk, setCommonChunk] = useState();
    const [notice, setNotice] = useState(false);

    /** Use effect. */
    useEffect(() => {
        /** Check valid state. */
        if (!valid && access_token) {
            dispatch(tokenUser(access_token));
        }

        /** Check if token is valid. */
        if (valid && access_token) {
            navigate("/dashboard/stock-trade");
        } else {
            navigate("/auth/login");
        }

        /** Send request if no bluechip stock. */
        if (valid && !bluechip) {
            /** Dispatch action. */
            dispatch(actStockBluechip(access_token));
        }

        /** Send request if no common stock. */
        if (valid && !common) {
            /** Dispatch action. */
            dispatch(actStockCommon(access_token));
        }

        /** Use helper. */
        if (valid && bluechip) {
            /** Call chunk helper. */
            const { pages: bluechipPages, chunks: bluechipChunks } = chunkObject({
                divide: 10,
                data: bluechip,
            });

            /** Set state. */
            setBluechipChunks(bluechipChunks);
            setBluechipIndex(bluechipPages);
        }

        /** Use helper. */
        if (valid && common) {
            /** Call chunk helper. */
            const { pages: commonPages, chunks: commonChunks } = chunkObject({
                divide: 10,
                data: common,
            });

            /** Set state. */
            setCommonChunks(commonChunks);
            setCommonIndex(commonPages);
        }

        /** Monitor new message. */
        if (message) {
            /** Set state. */
            setNotice(true);

            /** Reset state. */
            setTimeout(() => {
                setNotice(false);
            }, 3000);
        }
    }, [access_token, valid, bluechip, common, message]);

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

    /** Store handler. */
    const storeHandler = (symbol) => {
        dispatch(actStockWatchStore(access_token, symbol));

        /** Dispatch fetch action to update state. */
        const timeout = setTimeout(() => {
            /** Dispatch bluechip action. */
            dispatch(actStockBluechip(access_token));
            /** Dispatch common action. */
            dispatch(actStockCommon(access_token));
        }, 3000);

        return () => {
            clearTimeout(timeout);
        };
    };

    /** Container header for bluechip. */
    const containerBluechipHeader = (
        <>
            <Icon id='trade' /> Blue Chip Stocks
        </>
    );

    /** Container header for common. */
    const containerCommonHeader = (
        <>
            <Icon id='trade' /> Common Stocks
        </>
    );

    /** Return something. */
    return (
        <>
            {/**Show error. */}
            {error && <Notice variant='alert-warning' children={error} duration={3000} show={notice} />}

            {/**Show message. */}
            {message && <Notice variant='alert-success' children={message} duration={3000} show={notice} />}
            {/** Bluechip section. */}
            <Container header={containerBluechipHeader}>
                {isMobile ? (
                    loadblue ? (
                        <Loader />
                    ) : (
                        <>
                            {bluechipChunk && bluechipChunk ? (
                                <>
                                    {bluechipChunk.map((item) => {
                                        return mobileTemplate({
                                            item: item,
                                            action: storeHandler,
                                            text: "add",
                                            icon: "add",
                                        });
                                    })}
                                </>
                            ) : (
                                bluechipChunks && (
                                    <>
                                        {bluechipChunks[0].map((item) => {
                                            return mobileTemplate({
                                                item: item,
                                                action: storeHandler,
                                                text: "add",
                                                icon: "add",
                                            });
                                        })}
                                    </>
                                )
                            )}

                            {bluechipIndex && (
                                <div className='grid auto-rows-min h-fit text-right border border-slate-50 bg-slate-100 shadow rounded m-1'>
                                    <div clasName='flex flex-row gap-1 m-1'>
                                        {bluechipIndex.map((item, index) => {
                                            return paginationTemplate({
                                                index: index,
                                                turn: bluechipHandler,
                                            });
                                        })}
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
                                {bluechipChunk.map((item) => {
                                    return desktopTemplate({
                                        item: item,
                                        action: storeHandler,
                                        text: "add",
                                        icon: "add",
                                    });
                                })}
                            </>
                        ) : (
                            bluechipChunks && (
                                <>
                                    {desktopHeader}
                                    {bluechipChunks[0].map((item) => {
                                        return desktopTemplate({
                                            item: item,
                                            action: storeHandler,
                                            text: "add",
                                            icon: "add",
                                        });
                                    })}
                                </>
                            )
                        )}

                        {bluechipIndex && (
                            <div className='card grid auto-rows-min col-span-8 h-fit border-b border-stone-100 bg-stone-50 text-right'>
                                <div clasName='flex flex-row gap-2 m-2'>
                                    {bluechipIndex.map((item, index) => {
                                        return paginationTemplate({
                                            index: index,
                                            turn: bluechipHandler,
                                        });
                                    })}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </Container>
            {/** Common section. */}
            <Container header={containerCommonHeader}>
                {isMobile ? (
                    loadcommon ? (
                        <Loader />
                    ) : (
                        <>
                            {commonChunk && commonChunk ? (
                                <>
                                    {commonChunk.map((item) => {
                                        return mobileTemplate({
                                            item: item,
                                            action: storeHandler,
                                            text: "add",
                                            icon: "add",
                                        });
                                    })}
                                </>
                            ) : (
                                commonChunks && (
                                    <>
                                        {commonChunks[0].map((item) => {
                                            return mobileTemplate({
                                                item: item,
                                                action: storeHandler,
                                                text: "add",
                                                icon: "add",
                                            });
                                        })}
                                    </>
                                )
                            )}

                            {commonIndex && (
                                <div className='grid auto-rows-min h-fit text-right border border-slate-50 bg-slate-100 shadow rounded m-1'>
                                    <div clasName='flex flex-row gap-1 m-1'>
                                        {commonIndex.map((item, index) => {
                                            return paginationTemplate({
                                                index: index,
                                                turn: commonHandler,
                                            });
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
                                {commonChunk.map((item) => {
                                    return desktopTemplate({
                                        item: item,
                                        action: storeHandler,
                                        text: "add",
                                        icon: "add",
                                    });
                                })}
                            </>
                        ) : (
                            commonChunks && (
                                <>
                                    {desktopHeader}
                                    {commonChunks[0].map((item) => {
                                        return desktopTemplate({
                                            item: item,
                                            action: storeHandler,
                                            text: "add",
                                            icon: "add",
                                        });
                                    })}
                                </>
                            )
                        )}

                        {commonIndex && (
                            <div className='card grid auto-rows-min col-span-8 h-fit border-b border-stone-100 bg-stone-50 text-right'>
                                <div clasName='flex flex-row gap-2 m-2'>
                                    {commonIndex.map((item, index) => {
                                        return paginationTemplate({
                                            index: index,
                                            turn: commonHandler,
                                        });
                                    })}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </Container>
        </>
    );
};

export default Trade;
