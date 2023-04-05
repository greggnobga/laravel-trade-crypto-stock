/** React. */
import { Fragment } from "react";

/** Component. */
import Icon from "../../../../icons";

const Desktop = (props) => {
    return (
        <Fragment>
            <div className="sector">
                <div className="board">
                    <Icon id="trade" />{" "}
                    <span className="name">Minings Sector</span>
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
                    {props.data.stocks["miningandoil"] &&
                        props.data.stocks["miningandoil"].map((item, index) => {
                            return (
                                <div className="items" key={item.symbol}>
                                    <div className="value">
                                        {item["symbol"]}
                                    </div>
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
                                    <div className="value">
                                        {item["volume"]}
                                    </div>
                                    <div className="value">
                                        <span
                                            className="btn btn-orange-outline"
                                            type="button"
                                            onClick={() => {
                                                props.handler.view(
                                                    item["edge"]
                                                );
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
            <div className="sector">
                <div className="board">
                    <Icon id="trade" />{" "}
                    <span className="name">Holding Firms Sector</span>
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
                    {props.data.stocks["holdingfirms"] &&
                        props.data.stocks["holdingfirms"].map((item, index) => {
                            return (
                                <div className="items" key={index}>
                                    <div className="value">
                                        {item["symbol"]}
                                    </div>
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
                                    <div className="value">
                                        {item["volume"]}
                                    </div>
                                    <div className="value">
                                        <span
                                            className="btn btn-orange-outline"
                                            type="button"
                                            onClick={() => {
                                                props.handler.view(
                                                    item["edge"]
                                                );
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
                                                    "holdingfirms"
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
            <div className="sector">
                <div className="board">
                    <Icon id="trade" />
                    <span className="name">Services Sector</span>
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
                    {props.data.stocks["services"] &&
                        props.data.stocks["services"].map((item, index) => {
                            return (
                                <div className="items" key={index}>
                                    <div className="value">
                                        {item["symbol"]}
                                    </div>
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
                                    <div className="value">
                                        {item["volume"]}
                                    </div>
                                    <div className="value">
                                        <span
                                            className="btn btn-orange-outline"
                                            type="button"
                                            onClick={() => {
                                                props.handler.view(
                                                    item["edge"]
                                                );
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
                                                    "services"
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
            <div className="sector">
                <div className="board">
                    <Icon id="trade" />
                    <span className="name">Industrials Sector</span>
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
                    {props.data.stocks["industrial"] &&
                        props.data.stocks["industrial"].map((item, index) => {
                            return (
                                <div className="items" key={index}>
                                    <div className="value">
                                        {item["symbol"]}
                                    </div>
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
                                    <div className="value">
                                        {item["volume"]}
                                    </div>
                                    <div className="value">
                                        <span
                                            className="btn btn-orange-outline"
                                            type="button"
                                            onClick={() => {
                                                props.handler.view(
                                                    item["edge"]
                                                );
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
                                                    "industrial"
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
            <div className="sector">
                <div className="board">
                    <Icon id="trade" />
                    <span className="name">Properties Sector</span>
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
                    {props.data.stocks["property"] &&
                        props.data.stocks["property"].map((item, index) => {
                            return (
                                <div className="items" key={index}>
                                    <div className="value">
                                        {item["symbol"]}
                                    </div>
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
                                    <div className="value">
                                        {item["volume"]}
                                    </div>
                                    <div className="value">
                                        <span
                                            className="btn btn-orange-outline"
                                            type="button"
                                            onClick={() => {
                                                props.handler.view(
                                                    item["edge"]
                                                );
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
                                                    "property"
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
            <div className="sector">
                <div className="board">
                    <Icon id="trade" />
                    <span className="name">Financials Sector</span>
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
                    {props.data.stocks["financials"] &&
                        props.data.stocks["financials"].map((item, index) => {
                            return (
                                <div className="items" key={index}>
                                    <div className="value">
                                        {item["symbol"]}
                                    </div>
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
                                    <div className="value">
                                        {item["volume"]}
                                    </div>
                                    <div className="value">
                                        <span
                                            className="btn btn-orange-outline"
                                            type="button"
                                            onClick={() => {
                                                props.handler.view(
                                                    item["edge"]
                                                );
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
                                                    "financials"
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
            <div className="sector">
                <div className="board">
                    <Icon id="trade" />
                    <span className="name">
                        Samll and Medium Emerging Boards Sector
                    </span>
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
                    {props.data.stocks["smallmediumemergingboard"] &&
                        props.data.stocks["smallmediumemergingboard"].map(
                            (item, index) => {
                                return (
                                    <div className="items" key={index}>
                                        <div className="value">
                                            {item["symbol"]}
                                        </div>
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
                                        <div className="value">
                                            {item["volume"]}
                                        </div>
                                        <div className="value">
                                            <span
                                                className="btn btn-orange-outline"
                                                type="button"
                                                onClick={() => {
                                                    props.handler.view(
                                                        item["edge"]
                                                    );
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
                                                        "smallmediumemergingboard"
                                                    );
                                                }}
                                            >
                                                <Icon id="destroy" /> Destroy
                                            </span>
                                        </div>
                                    </div>
                                );
                            }
                        )}
                </div>
            </div>
            <div className="sector">
                <div className="board">
                    <Icon id="trade" />
                    <span className="name">Exchange Traded Funds Sector</span>
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
                    {props.data.stocks["funds"] &&
                        props.data.stocks["funds"].map((item, index) => {
                            return (
                                <div className="items" key={index}>
                                    <div className="value">
                                        {item["symbol"]}
                                    </div>
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
                                    <div className="value">
                                        {item["volume"]}
                                    </div>
                                    <div className="value">
                                        <span
                                            className="btn btn-orange-outline"
                                            type="button"
                                            onClick={() => {
                                                props.handler.view(
                                                    item["edge"]
                                                );
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
                                                    "funds"
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
        </Fragment>
    );
};

export default Desktop;
