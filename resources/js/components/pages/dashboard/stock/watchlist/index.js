/** React. */
import { Fragment, useState, useContext, useEffect } from "react";

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
            console.log(data.message);
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
        console.log(data);
        /** Check if data is not empty. */
        if (data) {
            /** Set sector. */
            setSectors(data["sectors"]);
            /** Render reponse message. */
            console.log(data["message"]);
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
            console.log(data["message"]);
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
            (item) => item["symbol"] !== symbol
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

    /** Create array of labels for sector. */
    const sectorLabels = [
        { label: "Mining And Oils", sector: "miningandoils", icon: "mining" },
        { label: "Holding Firms", sector: "holdingfirms", icon: "holding" },
        { label: "Services", sector: "services", icon: "service" },
        { label: "Properties", sector: "properties", icon: "property" },
        { label: "Financials", sector: "financials", icon: "financial" },
        { label: "Industrials", sector: "industrials", icon: "industrial" },
        {
            label: "Exchange Traded Funds",
            sector: "exchangetradedfunds",
            icon: "exchange",
        },
        {
            label: "Emerging Boards",
            sector: "smallmediumemergingboards",
            icon: "board",
        },
    ];
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
                            <button
                                onClick={buildHandler}
                                className="btn btn-blue-outline"
                                type="button"
                                disabled={disabled}
                            >
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
                        Price Earning Ratio - A higher PE compared to the market
                        indicates that the stock is expensive, whereas lower PE
                        indicates that the stock is undervalued. We should buy
                        the stock when it is undervalued.
                    </div>
                    <div className="items">
                        Net Profit Margin - Should be higher as it indicates the
                        company is efficient as compared to its peers.
                    </div>
                    <div className="items">
                        Return On Equity - The higher the ROE, the more
                        efficient a company's management is at generating income
                        and growth from its equity financing.
                    </div>
                    <div className="items">
                        Dividend Yield - Is the amount of money a company pays
                        shareholders for owning a share of its stock divided by
                        its current stock price.
                    </div>
                </div>
            </div>
            {isMobile
                ? sectorLabels.map((item, index) => {
                      return (
                          <Mobile
                              key={index}
                              data={sectors[item["sector"]]}
                              label={item["label"]}
                              sector={item["sector"]}
                              icon={item["icon"]}
                              handler={{
                                  view: viewHandler,
                                  destroy: destroyHandler,
                              }}
                          />
                      );
                  })
                : sectorLabels.map((item, index) => {
                      return (
                          <Desktop
                              key={index}
                              data={sectors[item["sector"]]}
                              label={item["label"]}
                              sector={item["sector"]}
                              icon={item["icon"]}
                              handler={{
                                  view: viewHandler,
                                  destroy: destroyHandler,
                              }}
                          />
                      );
                  })}
        </div>
    );
};

export default Watchlist;
