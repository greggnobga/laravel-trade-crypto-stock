/** Component. */
import Icon from "../../../../icons";

const Mobile = (props) => {
    return (
        <div className="mobile-sector">
            <div className="brand">
                <Icon id={props.icon} />
                <span className="name">{props.label} Sector</span>
            </div>
            <div className="content">
                {props.data &&
                    props.data.map((item, index) => {
                        return (
                            <div className="items" key={item.symbol}>
                                <div className="item">
                                    <div className="key">Symbol</div>
                                    <div className="value">
                                        {item["symbol"]}
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="key">Last Traded Price</div>
                                    <div className="value">
                                        {item["lasttradedprice"]}
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="key">Year High Price</div>
                                    <div className="value">
                                        {item["yearhighprice"]}
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="key">Net Profit Margin</div>
                                    <div className="value">
                                        {item["netprofitmargin"]}
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="key">
                                        Price Earning Ratio
                                    </div>
                                    <div className="value">
                                        {item["priceearningratio"]}
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="key">Debt Equity Ratio</div>
                                    <div className="value">
                                        {item["debtequityratio"]}
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="key">Return On Equity</div>
                                    <div className="value">
                                        {item["returnonequity"]}
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="key">Dividend Yield</div>
                                    <div className="value">0.00</div>
                                </div>
                                <div className="item">
                                    <div className="key">Volume</div>
                                    <div className="value">
                                        {item["volume"]}
                                    </div>
                                </div>
                                <div className="item">
                                    <span
                                        className="btn btn-orange-outline"
                                        type="button"
                                        onClick={() => {
                                            props.handler.view(item["edge"]);
                                        }}
                                    >
                                        <Icon id="search" /> View
                                    </span>
                                </div>
                                <div className="item">
                                    <span
                                        className="btn btn-red-outline"
                                        type="button"
                                        onClick={() => {
                                            props.handler.destroy(
                                                item["symbol"],
                                                index,
                                                props.sector
                                            );
                                        }}
                                    >
                                        <Icon id="destroy" /> Destroy
                                    </span>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Mobile;
