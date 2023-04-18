/** React. */
import { Fragment, useContext } from "react";

/** Context. */
import AuthContext from "../../../../../context/auth-context";

/** Hook. */
import useHttp from "../../../../../hooks/use-http";

/** Component. */
import Icon from "../../../../icons";

const Destroy = (props) => {
    /** Use context. */
    const authCtx = useContext(AuthContext);

    /** Use http hook reponse callback. */
    const storeResponse = (data) => {
        console.log(data);
        /** Render reponse message. */
        authCtx.messenger(data.message);
    };

    /** Prepare request to local api using http hook. */
    const { sendRequest: storeRequest } = useHttp(
        {
            url: "/api/stock-portfolio-store",
            method: "POST",
            params: {
                table: "portfolio",
                statement: "destroy",
                input: {
                    id: props.data.id,
                    name: props.data.name,
                },
            },
        },
        storeResponse
    );

    /** Handle add record submission. */
    const destroyHandler = () => {
        /** Send request. */
        storeRequest();

        /** Hide form after sending. */
        props.display();

        /** After five seconds send request to update state. */
        setTimeout(() => {
            props.retrieve();
        }, 3000);
    };

    /** Return something. */
    return (
        <Fragment>
            {props.data && (
                <div className="destroy">
                    <div className="item">
                        <span>
                            Are you certain that you want to remove{" "}
                            {props.data.name}?
                        </span>
                    </div>
                    <div className="item">
                        <button
                            className="btn btn-green-outline"
                            onClick={destroyHandler}
                            type="button"
                        >
                            <Icon id="submit" /> Submit
                        </button>
                        <button
                            className="btn btn-red-outline"
                            onClick={props.display}
                            type="button"
                        >
                            <Icon id="cancel" /> Cancel
                        </button>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default Destroy;
