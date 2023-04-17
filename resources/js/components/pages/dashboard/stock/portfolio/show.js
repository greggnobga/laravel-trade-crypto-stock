/** React. */
import { useState } from "react";

/** Hook. */
import useHttp from "../../../../../hooks/use-http";

/** Component. */
import Update from "./update";

const Show = (props) => {
    /** Use state. */
    const [update, setUpdate] = useState(false);

    /** Display handler. */
    const displayHandler = () => {
        setUpdate(!update);
    };

    /** Update handler. */
    const updateHandler = () => {
        console.log("Update me.");
    };

    /** Destroy handler. */
    const destroyHandler = () => {
        console.log("Destroy me.");
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
                    onClick={displayHandler}
                >
                    Update
                </button>
                <button
                    className="btn btn-red-outline"
                    onClick={destroyHandler}
                >
                    Destroy
                </button>
            </div>
            {update && (
                <Update
                    data={props.data}
                    display={displayHandler}
                    update={updateHandler}
                    retrieve={props.retrieve}
                />
            )}
        </div>
    );
};

export default Show;
