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

/** Action. */
import {
    actStockWatchBuild,
    actStockWatchStore,
} from "../../../actions/stockActions";

const Watchlist = () => {
    /** Use state. */
    const [modal, setModal] = useState(false);
    const [notice, setNotice] = useState(false);

    /** Use selector. */
    const userLogin = useSelector((state) => state.userLogin);
    const { logged, access_token } = userLogin;

    const stockWatchBuild = useSelector((state) => state.stockWatchBuild);
    const { loading, build } = stockWatchBuild;

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
        dispatch(actStockWatchStore(access_token, symbol));
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

        /** Send request if no bluechip stock. */
        if (!build) {
            /** Dispatch action. */
            dispatch(actStockWatchBuild(access_token));
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

    /** Modal header. */
    const modalHeader = (item) => {
        /** Declare pointer. */
        let modalHeader = "";
        let modalIcon = "";

        /** Switch case. */
        switch (item) {
            case "holdingfirms":
                modalHeader = "Holding Firms";
                modalIcon = "holding";
                break;
            case "services":
                modalHeader = "Services";
                modalIcon = "service";
                break;
            case "industrials":
                modalHeader = "Industrials";
                modalIcon = "industrial";
                break;
            case "properties":
                modalHeader = "Properties";
                modalIcon = "property";
                break;
            case "miningandoils":
                modalHeader = "Mining And Oils";
                modalIcon = "mining";
                break;
            case "financials":
                modalHeader = "Financials";
                modalIcon = "financial";
                break;
            case "smallmediumemergingboards":
                modalHeader = "Small Medium Emrging Boards";
                modalIcon = "board";
                break;
            case "exchangetradedfunds":
                modalHeader = "Exchange Traded Funds";
                modalIcon = "exchange";
                break;
            default:
                modalHeader = "Holding Firms";
                modalIcon = "holding";
                break;
        }

        return { header: modalHeader, icon: modalIcon };
    };

    /** Desktop template. */
    const desktopModalTemplate = (item) => {
        /** Call modal header. */
        const { header, icon } = modalHeader(item[0]);

        /** Return. */
        return (
            <>
                <div className="p-2">
                    <div className="flex flex-row justify-between">
                        <span className="p-0">
                            <Icon id={icon} /> {header}
                        </span>
                        <span className="uppercase" onClick={closeModalHandler}>
                            <Icon id="close" /> Close
                        </span>
                    </div>
                </div>
                <div className="p-2">
                    <div className="grid auto-rows-min grid-cols-9 h-fit rounded-t-md bg-stone-100 uppercase">
                        <div className="p-2">
                            <span className="text-green-500">Symbol</span>
                        </div>
                        <div className="p-2">
                            <span className="text-green-500">Price</span>
                        </div>
                        <div className="p-2">
                            <span className="text-green-500">Value</span>
                        </div>
                        <div className="p-2">
                            <span className="text-green-500">Price Range</span>
                        </div>
                        <div className="p-2">
                            <span className="text-green-500">Total Assets</span>
                        </div>
                        <div className="p-2">
                            <span className="text-green-500">Net Income</span>
                        </div>
                        <div className="p-2">
                            <span className="text-green-500">
                                Debt Equity Ratio
                            </span>
                        </div>
                        <div className="p-2">
                            <span className="text-green-500">
                                Dividend Yield
                            </span>
                        </div>
                        <div className="p-2">
                            <span className="text-green-500">Action</span>
                        </div>
                    </div>
                    {item &&
                        item[1].map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="grid auto-rows-min grid-cols-9 h-fit border-b border-stone-100 bg-stone-50 hover:text-green-500"
                                >
                                    <div className="p-2">
                                        <span className="p-0">
                                            {item.symbol}
                                        </span>
                                    </div>
                                    <div className="p-2">
                                        <span className="p-0">
                                            {item.price}
                                        </span>
                                    </div>
                                    <div className="p-2">
                                        <span className="p-0">
                                            {item.value}
                                        </span>
                                    </div>
                                    <div className="p-2">
                                        <span className="p-0">
                                            {item.pricerange}
                                        </span>
                                    </div>
                                    <div className="p-2">
                                        <span className="p-0">
                                            {item.totalassets}
                                        </span>
                                    </div>
                                    <div className="p-2">
                                        <span className="p-0">
                                            {item.netincomeaftertax}
                                        </span>
                                    </div>
                                    <div className="p-2">
                                        <span className="p-0">
                                            {item.debtequityratio}
                                        </span>
                                    </div>
                                    <div className="p-2">
                                        <span className="p-0">
                                            {item.dividendyield}
                                        </span>
                                    </div>
                                    <div className="p-2">
                                        <button
                                            className="border border-stone-100"
                                            onClick={() => {
                                                storeHandler(item.symbol);
                                            }}
                                        >
                                            <Icon id="add" /> Add
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </>
        );
    };

    /** Mobile template. */
    const mobileModalTemplate = (item) => {
        /** Call modal header. */
        const { header, icon } = modalHeader(item[0]);

        /** Return. */
        return (
            <>
                <div className="p-2">
                    <div className="flex flex-row justify-between">
                        <span className="p-0">
                            <Icon id={icon} /> {header}
                        </span>
                        <span className="uppercase" onClick={closeModalHandler}>
                            <Icon id="close" /> Close
                        </span>
                    </div>
                </div>
                {item &&
                    item[1].map((item, index) => {
                        return (
                            <div className="m-2 card-rounded grid auto-rows-min grid-cols-2 sm:grid-cols-3 md:grid-cols-4 hover:text-green-500 uppercase">
                                <div className="p-2">
                                    <span className="block p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500">
                                        Symbol
                                    </span>

                                    <span className="block pt-2 text-center">
                                        {item.symbol}
                                    </span>
                                </div>
                                <div className="p-2">
                                    <span className="block p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500">
                                        Price
                                    </span>

                                    <span className="block pt-2 text-center">
                                        {item.price}
                                    </span>
                                </div>
                                <div className="p-2">
                                    <span className="block p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500">
                                        Value
                                    </span>

                                    <span className="block pt-2 text-center">
                                        {item.value}
                                    </span>
                                </div>
                                <div className="p-2">
                                    <span className="block p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500">
                                        Price Range
                                    </span>

                                    <span className="block pt-2 text-center">
                                        {item.pricerange}
                                    </span>
                                </div>
                                <div className="p-2">
                                    <span className="block p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500">
                                        Total Assets
                                    </span>

                                    <span className="block pt-2 text-center">
                                        {item.totalassets}
                                    </span>
                                </div>
                                <div className="p-2">
                                    <span className="block p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500">
                                        Net Income
                                    </span>

                                    <span className="block pt-2 text-center">
                                        {item.netincomeaftertax}
                                    </span>
                                </div>
                                <div className="p-2">
                                    <span className="block p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500">
                                        Debt Equity Ratio
                                    </span>

                                    <span className="block pt-2 text-center">
                                        {item.debtequityratio}
                                    </span>
                                </div>
                                <div className="p-2">
                                    <span className="block p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500">
                                        Dividend Yield
                                    </span>

                                    <span className="block pt-2 text-center">
                                        {item.dividendyield}
                                    </span>
                                </div>
                                <div className="p-2 col-span-2 sm:col-span-3 md:col-span-4 text-center">
                                    <button
                                        className="border border-stone-100"
                                        onClick={() => {
                                            storeHandler(item.symbol);
                                        }}
                                    >
                                        <Icon id="add" /> Add
                                    </button>
                                </div>
                            </div>
                        );
                    })}
            </>
        );
    };

    /** Return something. */
    return (
        <>
            {error && (
                <Notice
                    variant="alert-warning"
                    children={error}
                    duration={3000}
                    show={notice}
                />
            )}
            {message && (
                <Notice
                    variant="alert-success"
                    children={message}
                    duration={3000}
                    show={notice}
                />
            )}
            <div className="m-2 grid auto-rows-min h-fit">
                <div className="h-8 sm:10 uppercase flex flex-row justify-between">
                    <span clasName="block p-2">
                        <Icon id="trade" />
                        Watchlist
                    </span>
                    <span
                        className="block p-2 cursor-pointer text-purple-500 -mt-2"
                        onClick={showModalHandler}
                    >
                        <Icon id="build" /> Build
                    </span>
                </div>
                <div className="grid auto-rows-min h-fit rounded">
                    {isMobile
                        ? modal && (
                              <Modal>
                                  {loading ? (
                                      <Loader />
                                  ) : (
                                      build &&
                                      Object.entries(build).map((item) => {
                                          return mobileModalTemplate(item);
                                      })
                                  )}
                              </Modal>
                          )
                        : modal && (
                              <Modal>
                                  {loading ? (
                                      <Loader />
                                  ) : (
                                      build &&
                                      Object.entries(build).map((item) => {
                                          return desktopModalTemplate(item);
                                      })
                                  )}
                              </Modal>
                          )}
                </div>
            </div>

            <div className="grid auto-rows-min h-fit rounded">
                {isMobile
                    ? modal && (
                          <Modal>
                              {loading ? (
                                  <Loader />
                              ) : (
                                  build &&
                                  Object.entries(build).map((item) => {
                                      return mobileModalTemplate(item);
                                  })
                              )}
                          </Modal>
                      )
                    : modal && (
                          <Modal>
                              {loading ? (
                                  <Loader />
                              ) : (
                                  build &&
                                  Object.entries(build).map((item) => {
                                      return desktopModalTemplate(item);
                                  })
                              )}
                          </Modal>
                      )}
            </div>

            <div id="stock-watchlist">
                <div className="cheat">
                    <div className="board">
                        <div className="items">
                            <div className="brand">
                                <Icon id="cheat" />
                                <span className="name">Cheat Code</span>
                            </div>
                            <div className="build">
                                <button type="button">
                                    <Icon id="build" /> Build
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="items">Reminder</div>
                        <div className="items">
                            Debt Equity Ratio - Always try to find a company to
                            invest which has debt equity ratio of less than one.
                        </div>
                        <div className="items">
                            Price Earning Ratio - A higher PE compared to the
                            market indicates that the stock is expensive,
                            whereas lower PE indicates that the stock is
                            undervalued. We should buy the stock when it is
                            undervalued.
                        </div>
                        <div className="items">
                            Net Profit Margin - Should be higher as it indicates
                            the company is efficient as compared to its peers.
                        </div>
                        <div className="items">
                            Return On Equity - The higher the ROE, the more
                            efficient a company's management is at generating
                            income and growth from its equity financing.
                        </div>
                        <div className="items">
                            Dividend Yield - Is the amount of money a company
                            pays shareholders for owning a share of its stock
                            divided by its current stock price.
                        </div>
                    </div>
                    <div className="content">Stock list</div>
                </div>
            </div>
        </>
    );
};

export default Watchlist;
