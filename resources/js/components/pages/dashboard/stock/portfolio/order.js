/** React. */
import { Fragment, useState } from "react";

/** Component. */
import Show from "./show";

const Order = (props) => {
    return (
        <Fragment>
            <div className="items">
                <div className="item">Order</div>
                <div className="item">Symbol</div>
                <div className="item">Name</div>
                <div className="item">Fee</div>
                <div className="item">Share</div>
                <div className="item">Capital</div>
                <div className="item">Action</div>
            </div>
            {props.order.map((item, index) => {
                return (
                    <Show data={item} key={index} retrieve={props.retrieve} />
                );
            })}
        </Fragment>
    );
};

export default Order;
