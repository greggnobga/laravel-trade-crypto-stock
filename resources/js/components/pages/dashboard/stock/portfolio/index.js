/** React. */
import { useState, useContext, useEffect } from "react";

/** Context. */
import AuthContext from "../../../../../context/auth-context";

/** Hook. */
import useHttp from "../../../../../hooks/use-http";
import useScreen from "../../../../../hooks/use-screen";

/** Component. */
import Icon from "../../../../icons";
import Hold from "./hold";
import Add from "./add";
import Order from "./order";

const Portfolio = () => {
    /** Use state. */
    const [record, setRecord] = useState(false);
    const [hold, setHold] = useState([]);
    const [order, setOrder] = useState([]);

    /** Show or hide form. */
    const recordHandler = () => {
        setRecord(!record);
    };

    /** Use context. */
    const authCtx = useContext(AuthContext);

    /** Use http hook reponse callback. */
    const retrieveResponse = (data) => {
        /** Render reponse message. */
        authCtx.messenger(data.message);
        /** Process response. */
        if (data.hasOwnProperty("hold")) {
            /** Set state value. */
            setHold(data["hold"]["total"]);
        }
        if (data.hasOwnProperty("order")) {
            /** Set state value. */
            setOrder(data["order"]);
        }
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

    /** Use screen helper. */
    const { isMobile } = useScreen();

    /** Infer screen size. */
    const screen = isMobile ? "content-mobile" : "content-desktop";

    return (
        <div id="stock-portfolio">
            <div className="asset">
                <div className="board">
                    <Icon id="portfolio" />
                    <span className="name">Account Statistics</span>
                </div>
                <div className="content">
                    <p>Graph for capital, assets and orders.</p>
                </div>
            </div>
            <div className="asset">
                <div className="board">
                    <Icon id="portfolio" />
                    <span className="name">Hold</span>
                </div>
                <div className={screen}>
                    <Hold hold={hold} screen={isMobile} />
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
                                <Icon id="add" /> Add
                            </span>
                        </div>
                    </div>
                </div>
                <div className={screen}>
                    <Add
                        record={record}
                        display={recordHandler}
                        retrieve={retrieveRequest}
                    />
                    <Order
                        order={order}
                        screen={isMobile}
                        retrieve={retrieveRequest}
                    />
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
