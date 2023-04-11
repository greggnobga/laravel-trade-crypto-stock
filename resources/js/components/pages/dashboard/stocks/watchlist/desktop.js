/** Component. */
import Icon from "../../../../icons";

const Desktop = (props) => {
    return (
        <div className="desktop-sector">
            <div className="board">
                <Icon id="trade" />{" "}
                <span className="name">{props.label} Sector</span>
            </div>
            <div className="content">
                <div className="items">
                    <div className="value">Symbol</div>
                    <div className="value">Last Traded Price</div>
                    <div className="value">Net Profit Margin</div>
                    <div className="value">Price Earning Ratio</div>
                    <div className="value">Debt To Equity Ratio</div>
                    <div className="value">Return On Equity</div>
                    <div className="value">Volume</div>
                    <div className="value">Action</div>
                </div>
                {props.data &&
                    props.data.map((item, index) => {
                        return (
                            <div className="items" key={item.symbol}>
                                <div className="value">{item["symbol"]}</div>
                                <div className="value">
                                    {item["lasttradedprice"]}
                                </div>
                                <div className="value">
                                    {item["netprofitmargin"]}
                                </div>
                                <div className="value">
                                    {item["priceearningratio"]}
                                </div>
                                <div className="value">
                                    {item["debtequityratio"]}
                                </div>
                                <div className="value">
                                    {item["returnonequity"]}
                                </div>
                                <div className="value">{item["volume"]}</div>
                                <div className="value">
                                    <span
                                        className="btn btn-orange-outline"
                                        type="button"
                                        onClick={() => {
                                            props.handler.view(item["edge"]);
                                        }}
                                    >
                                        <Icon id="search" /> View
                                    </span>
                                    <span
                                        className="btn btn-red-outline"
                                        type="button"
                                        onClick={() => {
                                            props.handler.destroy(
                                                item["symbol"],
                                                index,
                                                "miningandoil"
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

export default Desktop;
