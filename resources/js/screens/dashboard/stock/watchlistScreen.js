/** React. */
import { Fragment, useState, useContext, useEffect } from "react";

/** Hook. */
import useScreen from "../../../hooks/use-screen";

/** Component. */
import Icon from "../../../components/icons";

const Watchlist = () => {
    /** Declare disabled state. */
    const [stocks, setStocks] = useState([]);
    const [sectors, setSectors] = useState({});
    const [disabled, setDisabled] = useState(false);

    /** Build handler. */
    const buildHandler = () => {
        /** Set caller. */
        setCaller("watches");
        /** Set disabled.*/
        setDisabled(true);
        /** Send request. */
        retrieveRequest();
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
