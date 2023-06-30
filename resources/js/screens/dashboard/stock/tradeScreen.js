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
        /** Set disabled state. */
        setDisabled(true);
        /** Request data from api. */
        apiRequest();
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
