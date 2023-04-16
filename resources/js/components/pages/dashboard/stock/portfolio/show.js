/** React. */
import { useState } from "react";

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

    /** Deconstruct order to proper case. */
    let string = props.data.order;
    let character = props.data.order.charAt(0).toUpperCase();
    let camel = character + string.slice(1);

    return (
        <div className="items" key={props.data.id}>
            <div className="item">{camel}</div>
            <div className="item">{props.data.symbol}</div>
            <div className="item">{props.data.name}</div>
            <div className="item">{props.data.fee}</div>
            <div className="item">{props.data.share}</div>
            <div className="item">{props.data.capital}</div>
            <div className="item">
                <button onClick={displayHandler}>Update</button>
                <button onClick={destroyHandler}>Destroy</button>
            </div>
            {update && <Update data={props.data} display={displayHandler} />}
        </div>
    );
};

export default Show;
