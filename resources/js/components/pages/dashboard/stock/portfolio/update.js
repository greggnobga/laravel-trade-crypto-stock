/** React. */
import { Fragment } from "react";

const Update = (props) => {
    console.log(props.data);
    return (
        <Fragment>
            <h1>Show update form.</h1>
            <button className="btn btn-red-outline" onClick={props.display}>
                Cancel
            </button>
        </Fragment>
    );
};

export default Update;
