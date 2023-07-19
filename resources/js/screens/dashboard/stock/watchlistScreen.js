/** React. */
import { Fragment, useState, useContext, useEffect } from "react";

/** Vendor. */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/** Hook. */
import useScreen from "../../../hooks/use-screen";
import useAuth from "../../../hooks/use-auth";

/** Component. */
import Icon from "../../../components/icons";
import Modal from "../../../components/interfaces/modal";
import Loader from "../../../components/interfaces/loader";
import Notice from "../../../components/interfaces/notice";
import Container from "../../../components/interfaces/container";

/** Template. */
import {
    desktopHeader,
    desktopTemplate,
    mobileTemplate,
    desktopModalTemplate,
    mobileModalTemplate,
} from "./template";

/** Action. */
import {
    actStockWatchBuild,
    actStockWatchStore,
    actStockWatchFetch,
    actStockWatchDestroy,
} from "../../../actions/stockActions";

const Watchlist = () => {
    /** Use state. */
    const [modal, setModal] = useState(false);
    const [notice, setNotice] = useState(false);

    /** Use selector. */
    const userLogin = useSelector((state) => state.userLogin);
    const { logged, access_token } = userLogin;

    const stockWatchBuild = useSelector((state) => state.stockWatchBuild);
    const { loading: loadBuild, build } = stockWatchBuild;

    const stockWatchFetch = useSelector((state) => state.stockWatchFetch);
    const { loading: loadFetch, watchlist } = stockWatchFetch;

    const showMessage = useSelector((state) => state.showMessage);
    const { message, error } = showMessage;

    /** Use screen helper. */
    const { isMobile } = useScreen();

    /** Use auth. */
    const { check } = useAuth();

    /** Use navigate. */
    const navigate = useNavigate();

    /** Show modal handler. */
    const showModalHandler = () => {
        setModal(true);
    };

    /** Close modal handler. */
    const closeModalHandler = () => {
        setModal(false);
    };

    /** Store handler. */
    const storeHandler = (symbol) => {
        /** Dispatch store action. */
        dispatch(actStockWatchStore(access_token, symbol));

        const timeout = setTimeout(() => {
            /** Dispatch fetch to update the state. */
            dispatch(actStockWatchFetch(access_token));
        }, 3000);

        return () => {
            clearTimeout(timeout);
        };
    };

    /** Delete handler. */
    const deleteHandler = (symbol) => {
        /** Dispatch delete action. */
        dispatch(actStockWatchDestroy(access_token, symbol));

        const timeout = setTimeout(() => {
            /** Dispatch fetch to update the state. */
            dispatch(actStockWatchFetch(access_token));
        }, 3000);

        return () => {
            clearTimeout(timeout);
        };
    };

    /** Use dispatch. */
    const dispatch = useDispatch();

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

        /** Send request if no bluechip. */
        if (!build) {
            /** Dispatch action. */
            dispatch(actStockWatchBuild(access_token));
        }

        /** Send request if no watchlist. */
        if (!watchlist) {
            /** Dispatch action. */
            dispatch(actStockWatchFetch(access_token));
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
    }, [access_token, logged, build, message]);

    /** Container header. */
    const containerWatchlistHeader = (
        <div className="flex flex-row justify-between">
            <span clasName="block p-2">
                <Icon id="trade" /> Watchlist
            </span>
            <span
                className="block p-2 cursor-pointer text-purple-500 -mt-2"
                onClick={showModalHandler}
            >
                <Icon id="build" /> Build
            </span>
        </div>
    );

    /** Container header. */
    const containerReminderHeader = (
        <span clasName="block p-2">
            <Icon id="support" /> Reminder
        </span>
    );

    /** Return something. */
    return (
        <>
            {/**Show error. */}
            {error && (
                <Notice
                    variant="alert-warning"
                    children={error}
                    duration={3000}
                    show={notice}
                />
            )}

            {/**Show message. */}
            {message && (
                <Notice
                    variant="alert-success"
                    children={message}
                    duration={3000}
                    show={notice}
                />
            )}

            {/** Reminder section. */}
            <Container header={containerReminderHeader}>
                <div className="rounded-t-md bg-slate-50">
                    <div className="p-2 border-b border-slate-100 hover:text-purple-500">
                        Debt Equity Ratio - Always try to find a company to
                        invest which has debt equity ratio of less than one.
                    </div>
                    <div className="p-2 border-b border-slate-100 hover:text-purple-500">
                        Price Range - Year low minus year high, when the range
                        is getting near to zero or even turning positive, it
                        indicates that the price is going down and that it is a
                        good idea to add to your stack.
                    </div>
                    <div className="p-2 border-b border-slate-100 hover:text-purple-500">
                        Total Assets - Total assets less total assets previously
                        held If it's negative, either the company is having a
                        cash flow problem or it's having a bad year.
                    </div>
                    <div className="p-2 hover:text-purple-500">
                        Dividend Yield - Is the amount of money a company pays
                        shareholders for owning a share of its stock divided by
                        its current stock price.
                    </div>
                </div>
            </Container>

            {/** Watchlist section. */}
            <Container header={containerWatchlistHeader}>
                <div className="grid auto-rows-min h-fit rounded">
                    {isMobile
                        ? modal && (
                              <Modal>
                                  {loadBuild ? (
                                      <Loader />
                                  ) : (
                                      build &&
                                      Object.entries(build).map((item) => {
                                          return mobileModalTemplate({
                                              item: item,
                                              text: "add",
                                              icon: "add",
                                              close: closeModalHandler,
                                              action: storeHandler,
                                          });
                                      })
                                  )}
                              </Modal>
                          )
                        : modal && (
                              <Modal>
                                  {loadBuild ? (
                                      <Loader />
                                  ) : (
                                      build &&
                                      Object.entries(build).map((item) => {
                                          return desktopModalTemplate({
                                              item: item,
                                              text: "add",
                                              icon: "add",
                                              close: closeModalHandler,
                                              action: storeHandler,
                                          });
                                      })
                                  )}
                              </Modal>
                          )}
                </div>
                <div className="grid auto-rows-min h-fit rounded">
                    {isMobile ? (
                        loadFetch ? (
                            <Loader />
                        ) : (
                            <>
                                {watchlist &&
                                    watchlist.map((item) => {
                                        return mobileTemplate({
                                            item: item,
                                            text: "del",
                                            icon: "destroy",
                                            action: deleteHandler,
                                        });
                                    })}
                            </>
                        )
                    ) : loadFetch ? (
                        <Loader />
                    ) : (
                        <>
                            {desktopHeader}
                            {watchlist &&
                                watchlist.map((item) => {
                                    return desktopTemplate({
                                        item: item,
                                        text: "del",
                                        icon: "destroy",
                                        action: deleteHandler,
                                    });
                                })}
                        </>
                    )}
                </div>
            </Container>
        </>
    );
};

export default Watchlist;
