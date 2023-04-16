/** React. */
import { Fragment, useEffect, useState, useContext } from "react";

/** Store. */
import AuthContext from "../../context/auth-context";

/** Hook. */
import useHttp from "../../hooks/use-http";

/** Component. */
import Loader from "../icons";

const Summary = () => {
    /** Use state. */
    const [result, setResult] = useState([]);
    const [got, setGot] = useState(false);

    /** Philippine stock exchange index symbols. */
    const symbol = ["PSEi", "ALL", "FIN", "IND", "HDG", "PRO", "SVC", "M-O"];

    /** Use context. */
    const authCtx = useContext(AuthContext);

    /** Callback function for http hooks. */
    const requestResponse = (data) => {
        /** Declare an variable array. */
        let reMap = [];

        /** Loop through symbol array and match with the api result.. */
        if (data["stock"] !== null) {
            for (let index of symbol) {
                for (let stock of data.stock) {
                    if (stock.symbol === index) {
                        reMap.push({
                            name: stock["name"],
                            volume: stock["volume"].toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }),
                        });
                    }
                }
            }
            /** Set state value. */
            setResult(reMap);
            setGot(true);
        } else {
            /** Inform user that no data received from api. */
            authCtx.messenger("No data from external api.");
            /** Set got state to false. */
            setGot(false);
        }
    };

    /** Use http hook. */
    const { isLoading, sendRequest, hasError } = useHttp(
        {
            url: "https://phisix-api4.appspot.com/stocks.json",
            method: "GET",
            params: {},
        },
        requestResponse
    );

    /** Use effect. */
    useEffect(() => {
        /** Send http request. */
        sendRequest();
    }, []);

    /** Build document node. */
    const resultElements = result.map((item, key) => {
        return (
            <div className="items" key={key}>
                <p className="title">{item["name"]}</p>
                <p className="value">{item["volume"]}</p>
            </div>
        );
    });

    /** Return something.. */
    return (
        <Fragment>
            {isLoading ? (
                <Loader />
            ) : (
                got && <div className="summary">{resultElements}</div>
            )}
        </Fragment>
    );
};

export default Summary;