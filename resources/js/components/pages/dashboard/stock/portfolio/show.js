/** React. */
import { useState } from "react";

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
            {update && (
                <Update
                    data={props.data}
                    display={updateHandler}
                    retrieve={props.retrieve}
                />
            )}
            {destroy && (
                <Destroy
                    data={props.data}
                    display={destroyHandler}
                    retrieve={props.retrieve}
                />
            )}
        </div>
    );
};

export default Show;
