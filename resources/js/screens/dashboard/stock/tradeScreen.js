/** React. */
import { Fragment, useState, useEffect, useContext } from "react";

/** Hook. */
import useScreen from "../../../hooks/use-screen";

/** Component. */
import Icon from "../../../components/icons";

const Trade = () => {
    /** Declare result and disabled state. */
    const [result, setResult] = useState([]);
    const [disabled, setDisabled] = useState(false);

    /** Start handler. */
    const startHandler = () => {
        console.log("Start handler clicked.");
    };

    /** Use screen helper. */
    const { isMobile } = useScreen();

    /** Start handler. */
    const reportHandler = () => {
        console.log("Report handler clicked.");
    };

    /** Start handler. */
    const priceHandler = () => {
        console.log("Price handler clicked.");
    };

    /** Start handler. */
    const dividendHandler = () => {
        console.log("Dividend handler clicked.");
    };

    /** Start handler. */
    const sectorHandler = () => {
        console.log("Sector handler clicked.");
    };

    /** Start handler. */
    const displaySearch = () => {
        console.log("Display search clicked.");
    };

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
            </div>
        </div>
    );
};

export default Trade;
