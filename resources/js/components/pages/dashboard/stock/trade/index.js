/** React. */
import { Fragment, useState, useEffect, useContext } from "react";

/** Context. */
import AuthContext from "../../../../../context/auth-context";

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
        /** Request data from api. */
        apiRequest();
        /** Set start button to true. */
        setDisabled(true);
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
            /** Set start button state to false after the map reach its last iteration. */
            if (index >= result.length) {
                setDisabled(false);
            }
        });
    }, [result]);

    /** Use context. */
    const authCtx = useContext(AuthContext);

    /** Use http hook reponse callback. */
    const localResponse = (data) => {
        /** Render reponse message. */
        authCtx.messenger(data.message);
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
        /** Send request. */
        retrieveRequest();
        /** Set start button to true. */
        setDisabled(true);
    };

    /** Use http hook reponse callback. */
    const retrieveResponse = (data) => {
        /** Render reponse message. */
        if (data.hasOwnProperty("stocks")) {
            data["stocks"].map((item, index) => {
                setTimeout(() => {
                    /** Assign variable a value. */
                    setEdge(item["edge"]);
                }, 3000 * index);
                /** Set start button state to false after the map reach its last iteration. */
                if (index >= data.length) {
                    setDisabled(false);
                }
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
            default:
                setPayload({ section: "reports", id: edge });
        }
        /** Send request. */
        if (edge) {
            if (typeof payload["id"] !== "undefined") {
                storeRequest();
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
        /** Send request. */
        retrieveRequest();
        /** Set start button to true. */
        setDisabled(true);
    };

    /** Search handler. */
    const sectorHandler = () => {
        /** Set caller. */
        setCaller("sectors");
        /** Send request. */
        retrieveRequest();
        /** Set start button to true. */
        setDisabled(true);
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
    const [search, setSearch] = useState(false);

    /** Search handler. */
    const displaySearch = () => {
        setSearch(!search);
    };
    const searchHandler = () => {
        console.log("Searching...");
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
                            <Icon id="trade" />{" "}
                            <span className="name">Trade</span>
                        </div>
                        <div className="record">
                            <span
                                onClick={startHandler}
                                className="btn btn-green-outline"
                                type="button"
                                disabled={disabled}
                            >
                                <Icon id="start" /> Start
                            </span>
                            <span
                                onClick={reportHandler}
                                className="btn btn-red-outline"
                                type="button"
                                disabled={disabled}
                            >
                                <Icon id="report" /> Report
                            </span>
                            <span
                                onClick={priceHandler}
                                className="btn btn-blue-outline"
                                type="button"
                                disabled={disabled}
                            >
                                <Icon id="price" /> Price
                            </span>
                            <span
                                onClick={sectorHandler}
                                className="btn btn-purple-outline"
                                type="button"
                                disabled={disabled}
                            >
                                <Icon id="sector" /> Sector
                            </span>
                            <span
                                onClick={displaySearch}
                                className="btn btn-gold-outline"
                                type="button"
                            >
                                <Icon id="search" /> Search
                            </span>
                        </div>
                    </div>
                </div>
                {isMobile ? (
                    <Mobile
                        data={{ stocks: stocks, search: search }}
                        handler={{
                            display: displaySearch,
                            search: searchHandler,
                            chart: chartHandler,
                            view: viewHandler,
                        }}
                    />
                ) : (
                    <Desktop
                        data={{ stocks: stocks, search: search }}
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
