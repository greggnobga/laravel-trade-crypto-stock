/** React. */
import { Fragment, useState } from "react";

/** Hook. */
import useHttp from "../../../../../hooks/use-http";

/** Component. */
import Update from "./update";
import Destroy from "./destroy";

/** Component. */
import Icon from "../../../../icons";

const Show = (props) => {
    /** Use state. */
    const [update, setUpdate] = useState(false);
    const [destroy, setDestroy] = useState(false);

    /** Update handler. */
    const updateHandler = () => {
        setUpdate(!update);
    };

    /** Destroy handler. */
    const destroyHandler = () => {
        setDestroy(!destroy);
    };

    return (
        <Fragment>
            {props.mobile ? (
                <Fragment>
                    {update ? (
                        <Update
                            data={props.data}
                            display={updateHandler}
                            retrieve={props.retrieve}
                            mobile={props.mobile}
                        />
                    ) : destroy ? (
                        <Destroy
                            data={props.data}
                            display={destroyHandler}
                            retrieve={props.retrieve}
                            mobile={props.mobile}
                        />
                    ) : (
                        <div className="items" key={props.data.id}>
                            <div className="item">
                                <span className="key">Order</span>
                                <span className="value">
                                    {props.data.order}
                                </span>
                            </div>
                            <div className="item">
                                <span className="key">Symbol</span>
                                <span className="value">
                                    {props.data.symbol}
                                </span>
                            </div>
                            <div className="item">
                                <span className="key">Name</span>
                                <span className="value">{props.data.name}</span>
                            </div>
                            <div className="item">
                                <span className="key">Fee</span>
                                <span className="value">{props.data.fee}</span>
                            </div>
                            <div className="item">
                                <span className="key">Share</span>
                                <span className="value">
                                    {props.data.share}
                                </span>
                            </div>
                            <div className="item">
                                <span className="key">Capital</span>
                                <span className="value">
                                    {props.data.capital}
                                </span>
                            </div>
                            <div className="item">
                                <button
                                    className="btn btn-purple-outline"
                                    onClick={updateHandler}
                                >
                                    <Icon id="update" /> Update
                                </button>
                            </div>
                            <div className="item">
                                <button
                                    className="btn btn-red-outline"
                                    onClick={destroyHandler}
                                >
                                    <Icon id="destroy" /> Destroy
                                </button>
                            </div>
                        </div>
                    )}
                </Fragment>
            ) : (
                <Fragment>
                    {update ? (
                        <Update
                            data={props.data}
                            display={updateHandler}
                            retrieve={props.retrieve}
                            mobile={props.mobile}
                        />
                    ) : destroy ? (
                        <Destroy
                            data={props.data}
                            display={destroyHandler}
                            retrieve={props.retrieve}
                            mobile={props.mobile}
                        />
                    ) : (
                        <div className="items" key={props.data.id}>
                            <div className="item">{props.data.order}</div>
                            <div className="item">{props.data.symbol}</div>
                            <div className="item">{props.data.name}</div>
                            <div className="item">{props.data.fee}</div>
                            <div className="item">{props.data.share}</div>
                            <div className="item">{props.data.capital}</div>
                            <div className="item">
                                <button
                                    className="btn btn-purple-outline"
                                    onClick={updateHandler}
                                >
                                    <Icon id="update" /> Update
                                </button>
                                <button
                                    className="btn btn-red-outline"
                                    onClick={destroyHandler}
                                >
                                    <Icon id="destroy" /> Destroy
                                </button>
                            </div>
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default Show;
