/** React. */
import { useState, useContext, useEffect } from "react";

/** Context. */
import AuthContext from "../../../../../context/auth-context";

/** Hook. */
import useHttp from "../../../../../hooks/use-http";
import useScreen from "../../../../../hooks/use-screen";

/** Component. */
import Icon from "../../../../icons";
import Desktop from "./desktop";
import Mobile from "./mobile";

const Watchlist = () => {
    /** Declare disabled state. */
    const [stocks, setStocks] = useState([]);
    const [sectors, setSectors] = useState({});
    const [disabled, setDisabled] = useState(false);

    /** Use context. */
    const authCtx = useContext(AuthContext);

    /** Use http hook reponse callback. */
    const retrieveResponse = (data) => {
        /** Render reponse message. */
        if (data.hasOwnProperty("stocks")) {
            data["stocks"].map((item, index) => {
                setTimeout(() => {
                    /** Assign variable a value. */
                    setStocks(item);
                }, 3000 * index);
                /** Set start button state to false after the map reach its last iteration. */
                if (index >= data.length) {
                    setDisabled(false);
                }
            });
        }
    };

    /** Prepare request to local api using http hook. */
    const { sendRequest: retrieveRequest } = useHttp(
        {
            url: "/stock-reports-retrieve",
            method: "GET",
            params: { section: "stocks" },
        },
        retrieveResponse
    );

    /** Declare config state. */
    const [payload, setPayload] = useState({});
    const [caller, setCaller] = useState("");

    /** Use http hook reponse callback. */
    const storeResponse = (data) => {
        /** Check if data is not empty. */
        if (data) {
            /** Render reponse message. */
            authCtx.messenger(data.message);
        }
    };

    /** Prepare request to local api using http hook. */
    const { sendRequest: storeRequest } = useHttp(
        {
            url: "/stock-reports-store",
            method: "POST",
            params: payload,
        },
        storeResponse
    );

    /** Use effect when edge state changes. */
    useEffect(() => {
        /** Conditional payload value. */
        switch (caller) {
            case "watches":
                setPayload({
                    section: "watches",
                    id: stocks["edge"],
                    symbol: stocks["symbol"],
                    sector: stocks["sector"],
                    volume: stocks["volume"],
                });
                break;
            default:
                setPayload({
                    section: "watches",
                    id: stocks["edge"],
                    symbol: stocks["symbol"],
                    sector: stocks["sector"],
                    volume: stocks["volume"],
                });
        }
        /** Send request. */
        if (stocks) {
            if (typeof payload["id"] !== "undefined") {
                storeRequest();
            }
        }
    }, [stocks]);

    /** Build handler. */
    const buildHandler = () => {
        /** Set caller. */
        setCaller("watches");
        /** Set disabled.*/
        setDisabled(true);
        /** Send request. */
        retrieveRequest();
    };

    /** Use http hook reponse callback. */
    const watchRetrieveResponse = (data) => {
        /** Check if data is not empty. */
        if (data) {
            /** Set sector. */
            setSectors(data["sectors"]);
            /** Render reponse message. */
            authCtx.messenger(data["message"]);
        }
    };

    /** Prepare request to local api using http hook. */
    const { sendRequest: watchRetrieveRequest } = useHttp(
        {
            url: "/api/stock-watchlist-retrieve",
            method: "GET",
            params: { table: "watchlist", statement: "select" },
        },
        watchRetrieveResponse
    );

    useEffect(() => {
        watchRetrieveRequest();
    }, []);

    const viewHandler = (edge) => {
        const url =
            "https://edge.pse.com.ph/companyInformation/form.do?cmpy_id=" +
            edge;
        /** Open a new tab. */
        window.open(url, "_blank", "noopener");
    };

    /** Declare state. */
    const [destroy, setDestroy] = useState();

    /** Send http request after state has a value. */
    useEffect(() => {
        if (typeof destroy !== "undefined") {
            /** Send request. */
            watchStoreRequest();
        }
    }, [destroy]);

    /** Use http hook reponse callback. */
    const watchStoreResponse = (data) => {
        /** Check if data is not empty. */
        if (data) {
            /** Render reponse message. */
            authCtx.messenger(data["message"]);
        }
    };

    /** Prepare request to local api using http hook. */
    const { sendRequest: watchStoreRequest } = useHttp(
        {
            url: "/api/stock-watchlist-store",
            method: "POST",
            params: { table: "watchlist", statement: "trash", input: destroy },
        },
        watchStoreResponse
    );

    /** destroy handler. */
    const destroyHandler = (symbol, index, sector) => {
        /** Create new set of data. */
        const targetedSector = [...sectors[sector]];
        /** Remove item in the array. */
        const filtered = targetedSector.filter(
            (item) => item.symbol !== symbol
        );
        /** Copy sectors to new pointer. */
        const updatedSector = { ...sectors };
        /** Loop to find a match. */
        for (let item in updatedSector) {
            if (item === sector) {
                updatedSector[sector] = filtered;
            }
        }
        /** Set data. */
        setSectors({ ...updatedSector });
        /** Set params. */
        setDestroy(symbol);
    };

    /** Use screen helper. */
    const { isMobile } = useScreen();

    /** Return something. */
    return (
        <div id="stock-watchlist">
            <div className="cheat">
                <div className="board">
                    <div className="items">
                        <div className="brand">
                            <Icon id="cheat" />
                            <span className="name">Cheat Code</span>
                        </div>
                        <div className="build">
                            <span
                                onClick={buildHandler}
                                className="btn btn-blue-outline"
                                type="button"
                            >
                                <Icon id="build" /> Build
                            </span>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="items">
                        The net profit margin, also known as net margin,
                        indicates how much net income a company makes with total
                        sales achieved. A higher net profit margin means that a
                        company is more efficient at converting sales into
                        actual profit.
                    </div>
                    <div className="items">
                        A higher PE suggests high expectations for future
                        growth, perhaps because the company is small or is an a
                        rapidly expanding market. For others, a low PE is
                        preferred, since it suggests expectations are not too
                        high and the company is more likely to outperform
                        earnings forecasts.
                    </div>
                    <div className="items">
                        Debt ratio is a metric that measures a company's total
                        debt, as a percentage of its total assets. A high debt
                        ratio indicates that a company is highly leveraged, and
                        may have borrowed more money than it can easily pay
                        back.
                    </div>
                    <div className="items">
                        The higher a companys ROE percentage, the better. A
                        higher percentage indicates a company is more effective
                        at generating profit from its existing assets.
                    </div>
                </div>
            </div>
            {isMobile ? (
                <Mobile
                    data={sectors}
                    handler={{
                        view: viewHandler,
                        destroy: destroyHandler,
                    }}
                />
            ) : (
                <Desktop
                    data={{ stocks: sectors }}
                    handler={{
                        view: viewHandler,
                        destroy: destroyHandler,
                    }}
                />
            )}
        </div>
    );
};

export default Watchlist;
