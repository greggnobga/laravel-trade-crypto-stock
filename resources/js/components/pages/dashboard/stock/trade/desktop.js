/** Component. */
import Icon from "../../../../icons";
import Search from "../../../../interfaces/search";

const Desktop = (props) => {
    return (
        <div className="desktop-content">
            {props.data.search && (
                <Search
                    screen="desktop"
                    display={props.handler.display}
                    search={props.handler.search}
                />
            )}
            <div className="items">
                <div className="item">Symbol</div>
                <div className="item">Price</div>
                <div className="item">Change</div>
                <div className="item">Eearning Per Share</div>
                <div className="item">Average Price</div>
                <div className="item">Year High Price</div>
                <div className="item">Income After Tax</div>
                <div className="item">Volume</div>
                <div className="item">Action</div>
            </div>
            {props.data.stocks &&
                props.data.stocks.map((item, index) => {
                    return (
                        <div className="items" key={index}>
                            <div className="item">{item.symbol}</div>
                            <div className="item">{item.price}</div>
                            <div className="item">{item.change}</div>
                            <div className="item">{item.earningpershare}</div>
                            <div className="item">{item.average}</div>
                            <div className="item">{item.yearhighprice}</div>
                            <div className="item">{item.incomeaftertax}</div>
                            <div className="item">{item.volume}</div>
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

export default Desktop;
