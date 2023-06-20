/** React. */
import { Fragment, useState, useEffect, useContext } from "react";

/** Hook. */
import useHttp from "../../../../../hooks/use-http";
import useScreen from "../../../../../hooks/use-screen";

/** Component. */
import Icon from "../../../../icons";
import Desktop from "./desktop";
import Mobile from "./mobile";

const Trade = () => {
    /** Declare result and disabled state. */
    const [result, setResult] = useState([]);
    const [disabled, setDisabled] = useState(false);

    /** Start handler. */
    const startHandler = () => {
        /** Set disabled state. */
        setDisabled(true);
        /** Request data from api. */
        apiRequest();
    };

    const apiResponse = (data) => {
        let reMap = [];
        /** Check if server return data. */
        if (data.hasOwnProperty("stock")) {
            /** Remap keys before saving to state. */
            for (let i = 0; i < data["stock"].length; i++) {
                reMap.push({
                    name: data["stock"][i]["name"],
                    change: data["stock"][i]["percent_change"],
                    price: data["stock"][i]["price"]["amount"],
                    symbol: data["stock"][i]["symbol"],
                    volume: data["stock"][i]["volume"],
                });
            }
        }
        /** Set result state. */
        setResult(reMap);
    };

    /** Prepare request to phisix api using http hook. */
    const { sendRequest: apiRequest } = useHttp(
        {
            url: "https://phisix-api4.appspot.com/stocks.json",
            method: "GET",
            params: {},
        },
        apiResponse
    );

    /** Run use effect after result state ready. */
    let stock = [];
    useEffect(() => {
        result.map((item, index) => {
            /** Get last index. */
            let end = result.length - 1;
            /** Call delay item function. */
            setTimeout(function () {
                /** Push params.. */
                stock.push(result[index]);
                /** Check if data is not empty. */
                if (item) {
                    /** Send request. */
                    localRequest();
                    /** Shift params. */
                    stock.shift(index);
                }
            }, 3000 * index);
            /** Set start button state to false. */
            if (index === end) {
                setDisabled(false);
            }
        });
    }, [result]);

    /** Use http hook reponse callback. */
    const localResponse = (data) => {
        /** Render reponse message. */
        console.log(data.message);
    };

    /** Prepare request to local api using http hook. */
    const { sendRequest: localRequest } = useHttp(
        {
            url: "/api/stock-trade-store",
            method: "POST",
            params: { input: stock, table: "trade", statement: "store" },
        },
        localResponse
    );

    /** Declare edge and caller state. */
    const [edge, setEdge] = useState("");
    const [caller, setCaller] = useState("");

    /** Report handler. */
    const reportHandler = () => {
        /** Set caller. */
        setCaller("reports");
        /** Set disabled state. */
        setDisabled(true);
        /** Send request. */
        retrieveRequest();
    };

    /** Use http hook reponse callback. */
    const retrieveResponse = (data) => {
        /** Render reponse message. */
        if (data.hasOwnProperty("stocks")) {
            /** Loop through it. */
            data["stocks"].map((item, index) => {
                setTimeout(() => {
                    /** Assign variable a value. */
                    setEdge(item["edge"]);
                }, 3000 * index);
            });
        }
    };

    /** Declare config state. */
    const [payload, setPayload] = useState({});

    /** Use effect when edge state changes. */
    useEffect(() => {
        /** Conditional payload value. */
        switch (caller) {
            case "reports":
                setPayload({ section: "reports", id: edge });
                break;
            case "prices":
                setPayload({ section: "prices", id: edge });
                break;
            case "sectors":
                setPayload({ section: "sectors", id: edge });
                break;
            case "dividends":
                setPayload({ section: "dividends", id: edge });
                break;
            default:
                setPayload({ section: "reports", id: edge });
        }
        /** Send request. */
        if (edge) {
            if (typeof payload["id"] !== "undefined") {
                storeRequest();
            } else {
                /** Set disabled state. */
                setDisabled(false);
            }
        }
    }, [edge]);

    /** Prepare request to local api using http hook. */
    const { sendRequest: retrieveRequest } = useHttp(
        {
            url: "/stock-reports-retrieve",
            method: "GET",
            params: { section: "stocks" },
        },
        retrieveResponse
    );

    /** Use http hook reponse callback. */
    const storeResponse = (data) => {
        console.log(data);
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

    /** Search handler. */
    const priceHandler = () => {
        /** Set caller. */
        setCaller("prices");
        /** Set disabled state. */
        setDisabled(true);
        /** Send request. */
        retrieveRequest();
    };

    /** Search handler. */
    const sectorHandler = () => {
        /** Set caller. */
        setCaller("sectors");
        /** Set disabled state. */
        setDisabled(true);
        /** Send request. */
        retrieveRequest();
    };

    /** Search handler. */
    const dividendHandler = () => {
        /** Set caller. */
        setCaller("dividends");
        /** Set disabled state. */
        setDisabled(true);
        /** Send request. */
        retrieveRequest();
    };

    /** Declare stocks state. */
    const [stocks, setStocks] = useState([]);

    /** Use http hook reponse callback. */
    const stocksResponse = (data) => {
        /** Check if data is not empty. */
        if (data) {
            /** Render reponse message. */
            authCtx.messenger(data.message);
            /** Assign data to stocks state. */
            setStocks(data["data"]);
        }
    };
    /** Prepare request to local api using http hook. */
    const { sendRequest: stocksRequest } = useHttp(
        {
            url: "/api/stock-trade-retrieve",
            method: "GET",
            params: { table: "trade" },
        },
        stocksResponse
    );

    useEffect(() => {
        /** Send request. */
        stocksRequest();
    }, []);

    /** Define update handler. */
    const chartHandler = (idx, edge) => {
        // const newData = [...data];
        // newData[index].title = 'Edited Title';
        // newData[index].description = 'Edited Description';
        // setData(newData);

        console.log("index: " + idx + " edge id: " + edge);
    };

    /** Define destroy handler. */
    const viewHandler = (edge) => {
        const url =
            "https://edge.pse.com.ph/companyInformation/form.do?cmpy_id=" +
            edge;
        /** Open a new tab. */
        window.open(url, "_blank", "noopener");
    };

    /** Declare search state. */
    const [display, setDisplay] = useState(false);

    /** Display handler. */
    const displaySearch = () => {
        /** Toggle search form. */
        setDisplay(!display);
        /** Fetch stocks. */
        stocksRequest();
    };

    /** Search handler. */
    const searchHandler = (filter) => {
        if (filter.length !== 0) {
            /** Filter stocks state. */
            let filtered = stocks.filter(
                (item) => item.symbol === filter.toUpperCase()
            );
            /** Set stocks state. */
            setStocks(filtered);
        }
    };

    /** Use screen helper. */
    const { isMobile } = useScreen();

    /** Return something. */
    return (
        <div id="stock-trade">
            <div className="trade">
                <div className="board">
                    <div className="items">
                        <div className="brand">
                            <Icon id="trade" />
                            <span className="name">Trade</span>
                        </div>
                        <div className="record">
                            <button
                                onClick={startHandler}
                                className="btn btn-green-outline"
                                type="button"
                                disabled={disabled}
                            >
                                <Icon id="start" /> Start
                            </button>
                            <button
                                onClick={reportHandler}
                                className="btn btn-red-outline"
                                type="button"
                                disabled={disabled}
                            >
                                <Icon id="report" /> Report
                            </button>
                            <button
                                onClick={priceHandler}
                                className="btn btn-blue-outline"
                                type="button"
                                disabled={disabled}
                            >
                                <Icon id="price" /> Price
                            </button>
                            <button
                                onClick={dividendHandler}
                                className="btn btn-green-outline"
                                type="button"
                                disabled={disabled}
                            >
                                <Icon id="dividend" /> Dividend
                            </button>
                            <button
                                onClick={sectorHandler}
                                className="btn btn-purple-outline"
                                type="button"
                                disabled={disabled}
                            >
                                <Icon id="sector" /> Sector
                            </button>
                            <button
                                onClick={displaySearch}
                                className="btn btn-gold-outline"
                                type="button"
                                disabled={disabled}
                            >
                                <Icon id="search" /> Search
                            </button>
                        </div>
                    </div>
                </div>
                {isMobile ? (
                    <Mobile
                        data={{ stocks: stocks, display: display }}
                        handler={{
                            display: displaySearch,
                            search: searchHandler,
                            chart: chartHandler,
                            view: viewHandler,
                        }}
                    />
                ) : (
                    <Desktop
                        data={{ stocks: stocks, display: display }}
                        handler={{
                            display: displaySearch,
                            search: searchHandler,
                            chart: chartHandler,
                            view: viewHandler,
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default Trade;
