/** React. */
import { useState, useContext, useEffect } from "react";

/** Context. */
import AuthContext from "../../../../../context/auth-context";

/** Hook. */
import useHttp from "../../../../../hooks/use-http";

/** Component. */
import Icon from "../../../../icons";

const StockPortfolio = () => {
    const [record, setRecord] = useState(false);

    const recordHandler = () => {
        setRecord(!record);
    };

    /** Use context. */
    const authCtx = useContext(AuthContext);

    /** Use http hook reponse callback. */
    const retrieveResponse = (data) => {
        console.log(data);
        /** Render reponse message. */
        authCtx.messenger(data.message);
    };

    /** Prepare request to local api using http hook. */
    const { sendRequest: retrieveRequest } = useHttp(
        {
            url: "/api/stock-portfolio-retrieve",
            method: "GET",
            params: { table: "portfolio" },
        },
        retrieveResponse
    );

    /** Use effect. */
    useEffect(() => {
        retrieveRequest();
    }, []);

    return (
        <div id="stock-portfolio">
            <div className="asset">
                <div className="board">
                    <Icon id="portfolio" />
                    <span className="name">Assets</span>
                </div>
                <div className="content">
                    <div className="items">
                        <div className="item">Symbol</div>
                        <div className="item">Share</div>
                        <div className="item">Fee</div>
                        <div className="item">Capital</div>
                    </div>
                    <div className="items">
                        <div className="item">Item 1</div>
                        <div className="item">Item 2</div>
                        <div className="item">Item 3</div>
                        <div className="item">Item 4</div>
                    </div>
                </div>
            </div>
            <div className="order">
                <div className="board">
                    <div className="items">
                        <div className="brand">
                            <Icon id="trade" />
                            <span className="name">Order</span>
                        </div>
                        <div className="record">
                            <span
                                onClick={recordHandler}
                                className="btn btn-gold-outline"
                            >
                                <Icon id="stock" /> Add
                            </span>
                        </div>
                    </div>
                </div>
                <div className="content">
                    {record && (
                        <div className="items">
                            <div className="item">
                                <select className="input" name="order">
                                    <option value="buy">Buy</option>
                                    <option value="sell">Sell</option>
                                </select>
                                <label className="label" htmlFor="order">
                                    Order
                                </label>
                            </div>
                            <div className="item">
                                <input
                                    name="symbol"
                                    className="input"
                                    type="text"
                                />
                                <label className="label" htmlFor="symbol">
                                    Symbol
                                </label>
                            </div>
                            <div className="item">
                                <input
                                    name="name"
                                    className="input"
                                    placeholder="Name"
                                    type="text"
                                />
                                <label className="label" htmlFor="name">
                                    Name
                                </label>
                            </div>
                            <div className="item">
                                <input
                                    name="fee"
                                    className="input"
                                    type="number"
                                    step="0.00"
                                />
                                <label className="label" htmlFor="fee">
                                    Fee
                                </label>
                            </div>
                            <div className="item">
                                <input
                                    name="share"
                                    className="input"
                                    type="number"
                                    step="0.00"
                                />
                                <label className="label" htmlFor="share">
                                    Share
                                </label>
                            </div>
                            <div className="item">
                                <input
                                    name="capital"
                                    className="input"
                                    type="number"
                                    step="0.00"
                                />
                                <label className="label" htmlFor="capital">
                                    Capital
                                </label>
                            </div>
                            <div className="item">
                                <span className="btn btn-green-outline">
                                    <Icon id="submit" /> Submit
                                </span>
                                <span
                                    className="btn btn-red-outline"
                                    onClick={recordHandler}
                                >
                                    <Icon id="cancel" /> Cancel
                                </span>
                            </div>
                        </div>
                    )}
                    <div className="items">
                        <div className="item">Order</div>
                        <div className="item">Symbol</div>
                        <div className="item">Name</div>
                        <div className="item">Fee</div>
                        <div className="item">Share</div>
                        <div className="item">Capital</div>
                        <div className="item">Action</div>
                    </div>
                    <div className="items">
                        <div className="item">Item 1</div>
                        <div className="item">Item 2</div>
                        <div className="item">Item 3</div>
                        <div className="item">Item 4</div>
                        <div className="item">Item 5</div>
                        <div className="item">Item 6</div>
                        <div className="item">Item 7</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockPortfolio;
