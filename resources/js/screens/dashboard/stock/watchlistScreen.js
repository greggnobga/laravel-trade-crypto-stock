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

/** Action. */
import { actStockWatchBuild } from "../../../actions/stockActions";

const Watchlist = () => {
    /** Use state. */
    const [modal, setModal] = useState(false);

    /** Use selector. */
    const userLogin = useSelector((state) => state.userLogin);
    const { logged, access_token } = userLogin;

    const stockWatchBuild = useSelector((state) => state.stockWatchBuild);
    const { loading, build } = stockWatchBuild;

    /** Use screen helper. */
    const { isMobile } = useScreen();

    /** Use auth. */
    const { check } = useAuth();

    /** Use navigate. */
    const navigate = useNavigate();

    /** Show modal handler. */
    const showModalHandler = () => {
        setModal(true);
        console.log("Click show modal");
    };

    /** Close modal handler. */
    const closeModalHandler = () => {
        setModal(false);
        console.log("Click close modal");
    };

    /** Close modal handler. */
    const submitHandler = (symbol) => {
        console.log("Symbol", symbol);
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
    }, [access_token, logged, build]);

    /** Modal content. */
    const modalContent = (item) => {
        /** Loop modal headers. */
        let modalHeader = "";
        let modalIcon = "";
        switch (item[0]) {
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

        /** Return. */
        return (
            <div className="grid auto-rows-min h-fit rounded font-size">
                <div className="p-2">
                    <Icon id={modalIcon} /> {modalHeader}
                </div>
                <div className="p-2">
                    <div className="grid auto-rows-min grid-cols-9 h-fit rounded-t-md bg-stone-100 font-size">
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
                            <p className="uppercase text-green-500">
                                Price Range
                            </p>
                        </div>
                        <div className="p-2">
                            <p className="uppercase text-green-500">
                                Total Assets
                            </p>
                        </div>
                        <div className="p-2">
                            <p className="uppercase text-green-500">
                                Net Income
                            </p>
                        </div>
                        <div className="p-2">
                            <p className="uppercase text-green-500">
                                Debt Equity Ratio
                            </p>
                        </div>
                        <div className="p-2">
                            <p className="uppercase text-green-500">
                                Dividend Yield
                            </p>
                        </div>
                        <div className="p-2">
                            <p className="uppercase text-green-500">Action</p>
                        </div>
                    </div>
                    {item &&
                        item[1].map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="card grid auto-rows-min grid-cols-9 h-fit border-b border-stone-200 bg-stone-50 hover:text-green-500 font-size"
                                >
                                    <div className="p-2">
                                        <span className="uppercase">
                                            {item.symbol}
                                        </span>
                                    </div>
                                    <div className="p-2">
                                        <span className="uppercase">
                                            {item.price}
                                        </span>
                                    </div>
                                    <div className="p-2">
                                        <span className="uppercase">
                                            {item.value}
                                        </span>
                                    </div>
                                    <div className="p-2">
                                        <span className="uppercase">
                                            {item.pricerange}
                                        </span>
                                    </div>
                                    <div className="p-2">
                                        <span className="uppercase">
                                            {item.totalassets}
                                        </span>
                                    </div>
                                    <div className="p-2">
                                        <span className="uppercase">
                                            {item.netincomeaftertax}
                                        </span>
                                    </div>
                                    <div className="p-2">
                                        <span className="uppercase">
                                            {item.debtequityratio}
                                        </span>
                                    </div>
                                    <div className="p-2">
                                        <span className="uppercase">
                                            {item.dividendyield}
                                        </span>
                                    </div>
                                    <div className="p-2">
                                        <button
                                            className="uppercase border border-stone-100"
                                            onClick={() => {
                                                submitHandler(item.symbol);
                                            }}
                                        >
                                            <Icon id="add" /> Add
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    <div className="p-2 border-t border-slate-200 text-right">
                        <button
                            className="p-2 text-purple-500 hover:text-stone-50 border border-purple-500 hover:border-stone-50 hover:bg-stone-500 shadow rounded"
                            onClick={closeModalHandler}
                        >
                            <Icon id="close" /> Close Modal
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    /** Return something. */
    return (
        <>
            <div className="m-2 grid auto-rows-min h-fit">
                <div className="h-8 sm:10 uppercase flex flex-row justify-between">
                    <span clasName="p-2">
                        <Icon id="trade" />
                        Watchlist
                    </span>
                    <span
                        className="p-2 cursor-pointer text-purple-500 -mt-2"
                        onClick={showModalHandler}
                    >
                        <Icon id="build" /> Build
                    </span>
                    {modal && (
                        <Modal>
                            {build &&
                                Object.entries(build).map((item) => {
                                    return modalContent(item);
                                })}
                        </Modal>
                    )}
                </div>
            </div>
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
                    <p className="uppercase text-green-500">
                        Debt Equity Ratio
                    </p>
                </div>
                <div className="p-2">
                    <p className="uppercase text-green-500">Dividend Yield</p>
                </div>
            </div>
            <div className="card grid auto-rows-min grid-cols-8 h-fit border-b border-stone-200 bg-stone-50 hover:text-green-500 font-size">
                <div className="p-2">
                    <span className="uppercase">symbol</span>
                </div>
                <div className="p-2">
                    <span className="uppercase">price</span>
                </div>
                <div className="p-2">
                    <span className="uppercase">value</span>
                </div>
                <div className="p-2">
                    <span className="uppercase">pricerange</span>
                </div>
                <div className="p-2">
                    <span className="uppercase">totalassets</span>
                </div>
                <div className="p-2">
                    <span className="uppercase">netincomeaftertax</span>
                </div>
                <div className="p-2">
                    <span className="uppercase">debtequityratio</span>
                </div>
                <div className="p-2">
                    <span className="uppercase">dividendyield</span>
                </div>
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
