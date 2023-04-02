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
        /** Send request. */
        retrieveRequest();
    };

    return (
        <div id="stock-watchlist">
            <div className="cheat">
                <div className="board">
                    <div className="items">
                        <div className="name">Cheat Code</div>
                        <div className="build">
                            <button
                                onClick={buildHandler}
                                className="run"
                                type="button"
                            >
                                Build
                            </button>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="items">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </div>
                    <div className="items">
                        Sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </div>
                    <div className="items">
                        Quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                    </div>
                </div>
            </div>
            <div className="minings">
                <div className="board">Minings Sector</div>
                <div className="content">
                    <div className="items color">
                        <div className="item">Item 1</div>
                        <div className="item">Item 2</div>
                        <div className="item">Item 3</div>
                        <div className="item">Item 4</div>
                        <div className="item">Item 5</div>
                        <div className="item">Item 6</div>
                        <div className="item">Item 7</div>
                        <div className="item">Item 8</div>
                    </div>
                    <div className="items">
                        <div className="item">Item 1</div>
                        <div className="item">Item 2</div>
                        <div className="item">Item 3</div>
                        <div className="item">Item 4</div>
                        <div className="item">Item 5</div>
                        <div className="item">Item 6</div>
                        <div className="item">Item 7</div>
                        <div className="item">Item 8</div>
                    </div>
                </div>
            </div>
            <div className="holdings">
                <div className="board">Holding Firms Sector</div>
                <div className="content">
                    <div className="items color">
                        <div className="item">Item 1</div>
                        <div className="item">Item 2</div>
                        <div className="item">Item 3</div>
                        <div className="item">Item 4</div>
                        <div className="item">Item 5</div>
                        <div className="item">Item 6</div>
                        <div className="item">Item 7</div>
                        <div className="item">Item 8</div>
                    </div>
                    <div className="items">
                        <div className="item">Item 1</div>
                        <div className="item">Item 2</div>
                        <div className="item">Item 3</div>
                        <div className="item">Item 4</div>
                        <div className="item">Item 5</div>
                        <div className="item">Item 6</div>
                        <div className="item">Item 7</div>
                        <div className="item">Item 8</div>
                    </div>
                </div>
            </div>
            <div className="services">
                <div className="board">Services Sector</div>
                <div className="content">
                    <div className="items color">
                        <div className="item">Item 1</div>
                        <div className="item">Item 2</div>
                        <div className="item">Item 3</div>
                        <div className="item">Item 4</div>
                        <div className="item">Item 5</div>
                        <div className="item">Item 6</div>
                        <div className="item">Item 7</div>
                        <div className="item">Item 8</div>
                    </div>
                    <div className="items">
                        <div className="item">Item 1</div>
                        <div className="item">Item 2</div>
                        <div className="item">Item 3</div>
                        <div className="item">Item 4</div>
                        <div className="item">Item 5</div>
                        <div className="item">Item 6</div>
                        <div className="item">Item 7</div>
                        <div className="item">Item 8</div>
                    </div>
                </div>
            </div>
            <div className="industrials">
                <div className="board">Industrials Sector</div>
                <div className="content">
                    <div className="items color">
                        <div className="item">Item 1</div>
                        <div className="item">Item 2</div>
                        <div className="item">Item 3</div>
                        <div className="item">Item 4</div>
                        <div className="item">Item 5</div>
                        <div className="item">Item 6</div>
                        <div className="item">Item 7</div>
                        <div className="item">Item 8</div>
                    </div>
                    <div className="items">
                        <div className="item">Item 1</div>
                        <div className="item">Item 2</div>
                        <div className="item">Item 3</div>
                        <div className="item">Item 4</div>
                        <div className="item">Item 5</div>
                        <div className="item">Item 6</div>
                        <div className="item">Item 7</div>
                        <div className="item">Item 8</div>
                    </div>
                </div>
            </div>
            <div className="properties">
                <div className="board">Poperties Sector</div>
                <div className="content">
                    <div className="items color">
                        <div className="item">Item 1</div>
                        <div className="item">Item 2</div>
                        <div className="item">Item 3</div>
                        <div className="item">Item 4</div>
                        <div className="item">Item 5</div>
                        <div className="item">Item 6</div>
                        <div className="item">Item 7</div>
                        <div className="item">Item 8</div>
                    </div>
                    <div className="items">
                        <div className="item">Item 1</div>
                        <div className="item">Item 2</div>
                        <div className="item">Item 3</div>
                        <div className="item">Item 4</div>
                        <div className="item">Item 5</div>
                        <div className="item">Item 6</div>
                        <div className="item">Item 7</div>
                        <div className="item">Item 8</div>
                    </div>
                </div>
            </div>
            <div className="financials">
                <div className="board">Financials Sector</div>
                <div className="content">
                    <div className="items color">
                        <div className="item">Item 1</div>
                        <div className="item">Item 2</div>
                        <div className="item">Item 3</div>
                        <div className="item">Item 4</div>
                        <div className="item">Item 5</div>
                        <div className="item">Item 6</div>
                        <div className="item">Item 7</div>
                        <div className="item">Item 8</div>
                    </div>
                    <div className="items">
                        <div className="item">Item 1</div>
                        <div className="item">Item 2</div>
                        <div className="item">Item 3</div>
                        <div className="item">Item 4</div>
                        <div className="item">Item 5</div>
                        <div className="item">Item 6</div>
                        <div className="item">Item 7</div>
                        <div className="item">Item 8</div>
                    </div>
                </div>
            </div>
            <div className="boards">
                <div className="board">Small Boards Sector</div>
                <div className="content">
                    <div className="items color">
                        <div className="item">Item 1</div>
                        <div className="item">Item 2</div>
                        <div className="item">Item 3</div>
                        <div className="item">Item 4</div>
                        <div className="item">Item 5</div>
                        <div className="item">Item 6</div>
                        <div className="item">Item 7</div>
                        <div className="item">Item 8</div>
                    </div>
                    <div className="items">
                        <div className="item">Item 1</div>
                        <div className="item">Item 2</div>
                        <div className="item">Item 3</div>
                        <div className="item">Item 4</div>
                        <div className="item">Item 5</div>
                        <div className="item">Item 6</div>
                        <div className="item">Item 7</div>
                        <div className="item">Item 8</div>
                    </div>
                </div>
            </div>
            <div className="funds">
                <div className="board">Funds Sector</div>
                <div className="content">
                    <div className="items color">
                        <div className="item">Item 1</div>
                        <div className="item">Item 2</div>
                        <div className="item">Item 3</div>
                        <div className="item">Item 4</div>
                        <div className="item">Item 5</div>
                        <div className="item">Item 6</div>
                        <div className="item">Item 7</div>
                        <div className="item">Item 8</div>
                    </div>
                    <div className="items">
                        <div className="item">Item 1</div>
                        <div className="item">Item 2</div>
                        <div className="item">Item 3</div>
                        <div className="item">Item 4</div>
                        <div className="item">Item 5</div>
                        <div className="item">Item 6</div>
                        <div className="item">Item 7</div>
                        <div className="item">Item 8</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Watchlist;
