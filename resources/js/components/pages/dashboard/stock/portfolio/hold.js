/** React. */
import { Fragment } from "react";

const Hold = (props) => {
    return (
        <Fragment>
            <div className="items">
                <div className="item">Symbol</div>
                <div className="item">Share</div>
                <div className="item">Fee</div>
                <div className="item">Capital</div>
                <div className="item">Average</div>
                <div className="item">Last Traded Price</div>
                <div className="item">Rugs or Riches</div>
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
                                    <span className="red">{item.prospect}</span>
                                )}
                            </div>
                        </div>
                    );
                })}
        </Fragment>
    );
};

export default Hold;
