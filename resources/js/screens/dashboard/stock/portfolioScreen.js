/** React. */
import { useState, useContext, useEffect } from "react";

/** Vendor. */
import Chart from "chart.js/auto";

/** Hook. */
import useScreen from "../../../hooks/use-screen";

/** Component. */
import Icon from "../../../components/icons";
import BarChart from "../../../components/interfaces/chart/bar";
import PolarChart from "../../../components/interfaces/chart/polar";
import DoughnutChart from "../../../components/interfaces/chart/doughnut";

const Portfolio = () => {
    /** Use state. */
    const [record, setRecord] = useState(false);
    const [hold, setHold] = useState([]);
    const [order, setOrder] = useState([]);
    const [capital, setCapital] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [total, setTotal] = useState([]);
    const [watcher, setWatcher] = useState(false);
    const [capitalChart, setCapitalChart] = useState({});
    const [stocksChart, setStocksChart] = useState({});
    const [totalChart, setTotalChart] = useState({});

    /** Use screen helper. */
    const { isMobile } = useScreen();

    /** Infer screen size. */
    const screen = isMobile ? "content-mobile" : "content-desktop";

    /** Use effect. */
    useEffect(() => {
        /** define state. */
        const capitalData = {
            labels: capital.map((item) => item.month),
            datasets: [
                {
                    label: "Capital",
                    data: capital.map((item) => item.capital),
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.5)",
                        "rgba(255, 159, 64, 0.5)",
                        "rgba(255, 205, 86, 0.5)",
                        "rgba(75, 192, 192, 0.5)",
                        "rgba(54, 162, 235, 0.5)",
                        "rgba(153, 102, 255, 0.5)",
                        "rgba(201, 203, 207, 0.5)",
                    ],
                    borderColor: ["rgba(233, 236, 239, .75)"],
                },
            ],
        };
        /** Set state data. */
        setCapitalChart(capitalData);
        /** define state. */
        const stocksData = {
            labels: stocks.map((item) => item.symbol),
            datasets: [
                {
                    label: "Capital",
                    data: stocks.map((item) => item.capital),
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.5)",
                        "rgba(255, 159, 64, 0.5)",
                        "rgba(255, 205, 86, 0.5)",
                        "rgba(75, 192, 192, 0.5)",
                        "rgba(54, 162, 235, 0.5)",
                        "rgba(153, 102, 255, 0.5)",
                        "rgba(201, 203, 207, 0.5)",
                    ],
                    borderColor: ["rgba(233, 236, 239, .75)"],
                },
            ],
        };
        /** Set state data. */
        setStocksChart(stocksData);
        /** define state. */
        const totalData = {
            labels: total.map((item) => item.label),
            datasets: [
                {
                    label: "Total",
                    data: total.map((item) => item.amount),
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.5)",
                        "rgba(255, 159, 64, 0.5)",
                        "rgba(255, 205, 86, 0.5)",
                        "rgba(75, 192, 192, 0.5)",
                        "rgba(54, 162, 235, 0.5)",
                        "rgba(153, 102, 255, 0.5)",
                        "rgba(201, 203, 207, 0.5)",
                    ],
                    borderColor: ["rgba(233, 236, 239, .75)"],
                },
            ],
        };
        /** Set state data. */
        setTotalChart(totalData);
    }, [capital, stocks, total]);

    /** Show or hide form. */
    const recordHandler = () => {
        setRecord(!record);
    };

    return (
        <div id="stock-portfolio">
            <div className="account">
                <div className="board">
                    <Icon id="portfolio" />
                    <span className="name">Account</span>
                </div>
                <div className={screen}>
                    <div className="items">
                        <div className="item">
                            {watcher ? (
                                <BarChart data={capitalChart} />
                            ) : (
                                <p>No data.</p>
                            )}
                        </div>
                        <div className="item">
                            {watcher ? (
                                <DoughnutChart data={stocksChart} />
                            ) : (
                                <p>No data.</p>
                            )}
                        </div>
                        <div className="item">
                            {watcher ? (
                                <PolarChart data={totalChart} />
                            ) : (
                                <p>No data.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="asset">
                <div className="board">
                    <Icon id="portfolio" />
                    <span className="name">Hold</span>
                </div>
                <div className={screen}>
                    <Hold hold={hold} mobile={isMobile} />
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
                        mobile={isMobile}
                        display={recordHandler}
                        retrieve={retrieveRequest}
                    />
                    <Order
                        order={order}
                        mobile={isMobile}
                        retrieve={retrieveRequest}
                    />
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
