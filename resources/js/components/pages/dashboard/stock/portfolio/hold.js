/** React. */
import { Fragment } from "react";

const Hold = (props) => {
    /** Return something. */
    return (
        <Fragment>
            {props.mobile ? (
                <Fragment>
                    {props.hold &&
                        props.hold.map((item, index) => {
                            return (
                                <div className="items" key={index}>
                                    <div className="item">
                                        <span className="key">Symbol</span>
                                        <span className="value">
                                            {item.symbol}
                                        </span>
                                    </div>
                                    <div className="item">
                                        <span className="key">Share</span>
                                        <span className="value">
                                            {item.share}
                                        </span>
                                    </div>
                                    <div className="item">
                                        <span className="key">Fee</span>
                                        <span className="value">
                                            {item.fee}
                                        </span>
                                    </div>
                                    <div className="item">
                                        <span className="key">Capital</span>
                                        <span className="value">
                                            {item.capital}
                                        </span>
                                    </div>
                                    <div className="item">
                                        <span className="key">Average</span>
                                        <span className="value">
                                            {item.average}
                                        </span>
                                    </div>
                                    <div className="item">
                                        <span className="key">
                                            Last Traded Price
                                        </span>
                                        <span className="value">
                                            {item.price}
                                        </span>
                                    </div>
                                    <div className="item">
                                        <span className="key">Prospect</span>
                                        <span className="value">
                                            {item.prospect >= 0 ? (
                                                <span className="green">
                                                    {item.prospect}
                                                </span>
                                            ) : (
                                                <span className="red">
                                                    {item.prospect}
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                </Fragment>
            ) : (
                <Fragment>
                    <div className="items">
                        <div className="item">Symbol</div>
                        <div className="item">Share</div>
                        <div className="item">Fee</div>
                        <div className="item">Capital</div>
                        <div className="item">Average</div>
                        <div className="item">Last Traded Price</div>
                        <div className="item">Rags or Riches</div>
                    </div>
                    {props.hold &&
                        props.hold.map((item, index) => {
                            return (
                                <div className="items" key={index}>
                                    <div className="item">{item.symbol}</div>
                                    <div className="item">{item.share}</div>
                                    <div className="item">{item.fee}</div>
                                    <div className="item">{item.capital}</div>
                                    <div className="item">{item.average}</div>
                                    <div className="item">{item.price}</div>
                                    <div className="item">
                                        {item.prospect >= 0 ? (
                                            <span className="green">
                                                {item.prospect}
                                            </span>
                                        ) : (
                                            <span className="red">
                                                {item.prospect}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                </Fragment>
            )}
        </Fragment>
    );
};

export default Hold;
