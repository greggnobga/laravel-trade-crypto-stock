/** Component. */
import Icon from "../../../../icons";
import Search from "../../../../interfaces/search";

const Mobile = (props) => {
    return (
        <div className="mobile-content">
            {props.data.display && (
                <Search
                    screen="mobile"
                    display={props.handler.display}
                    search={props.handler.search}
                />
            )}
            {props.data.stocks &&
                props.data.stocks.map((item, index) => {
                    return (
                        <div className="items" key={index}>
                            <div className="item">
                                <span className="key">Symbol</span>
                                <span className="value">{item.symbol}</span>
                            </div>
                            <div className="item">
                                <span className="key">Price</span>
                                <span className="value">{item.price}</span>
                            </div>
                            <div className="item">
                                <span className="key">Change</span>
                                <span className="value">{item.change}</span>
                            </div>
                            <div className="item">
                                <span className="key">Eearning Per Share</span>
                                <span className="value">
                                    {item.earningpershare}
                                </span>
                            </div>
                            <div className="item">
                                <span className="key">Average Price</span>
                                <span className="value">{item.average}</span>
                            </div>
                            <div className="item">
                                <span className="key">Year High Price</span>
                                <span className="value">
                                    {item.yearhighprice}
                                </span>
                            </div>
                            <div className="item">
                                <span className="key">Income After Tax</span>
                                <span className="value">
                                    {item.incomeaftertax}
                                </span>
                            </div>
                            <div className="item">
                                <span className="key">Dividend Yield</span>
                                <span className="value">
                                    {item.dividendyield}
                                </span>
                            </div>
                            <div className="item">
                                <span className="key">Volume</span>
                                <span className="value">{item.volume}</span>
                            </div>
                            <div className="item">
                                <span
                                    className="btn btn-purple-outline"
                                    type="button"
                                    onClick={() =>
                                        props.handler.chart(index, item.edge)
                                    }
                                >
                                    <Icon id="chart" /> Chart
                                </span>
                            </div>
                            <div className="item">
                                <span
                                    className="btn btn-orange-outline"
                                    type="button"
                                    onClick={() =>
                                        props.handler.view(item.edge)
                                    }
                                >
                                    <Icon id="search" /> View
                                </span>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default Mobile;
