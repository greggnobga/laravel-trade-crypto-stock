/** React. */
import { Fragment, useContext } from "react";

/** Context. */
import AuthContext from "../../../../../context/auth-context";

/** Hook. */
import useValidate from "../../../../../hooks/use-validate";
import useHttp from "../../../../../hooks/use-http";

/** Component. */
import Icon from "../../../../icons";

const Add = (props) => {
    /** Map html element to validate hook. */
    const {
        value: order,
        hasError: orderHasError,
        isValid: orderIsValid,
        valueChangeHandler: orderChangeHandler,
        inputBlurHandler: orderBlurHandler,
        resetHandler: orderInputReset,
    } = useValidate(
        (value) => value.trim() !== "" && value.match(/^[A-Za-z]*$/)
    );

    const {
        value: symbol,
        hasError: symbolHasError,
        isValid: symbolIsValid,
        valueChangeHandler: symbolChangeHandler,
        inputBlurHandler: symbolBlurHandler,
        resetHandler: symbolInputReset,
    } = useValidate(
        (value) => value.trim() !== "" && value.match(/^[A-Za-z0-9\s]*$/)
    );

    const {
        value: name,
        hasError: nameHasError,
        isValid: nameIsValid,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        resetHandler: nameInputReset,
    } = useValidate(
        (value) => value.trim() !== "" && value.match(/^[A-Za-z0-9&\s,.]*$/)
    );

    const {
        value: fee,
        hasError: feeHasError,
        isValid: feeIsValid,
        valueChangeHandler: feeChangeHandler,
        inputBlurHandler: feeBlurHandler,
        resetHandler: feeInputReset,
    } = useValidate(
        (value) =>
            value.trim() !== "" && value.match(/^[0-9,]+(\.[0-9]{1,2})?$/)
    );

    const {
        value: share,
        hasError: shareHasError,
        isValid: shareIsValid,
        valueChangeHandler: shareChangeHandler,
        inputBlurHandler: shareBlurHandler,
        resetHandler: shareInputReset,
    } = useValidate(
        (value) =>
            value.trim() !== "" && value.match(/^[0-9,]+(\.[0-9]{1,2})?$/)
    );

    const {
        value: capital,
        hasError: capitalHasError,
        isValid: capitalIsValid,
        valueChangeHandler: capitalChangeHandler,
        inputBlurHandler: capitalBlurHandler,
        resetHandler: capitalInputReset,
    } = useValidate(
        (value) =>
            value.trim() !== "" && value.match(/^[0-9,]+(\.[0-9]{1,2})?$/)
    );

    /** Set overall form validity. */
    let formIsValid = false;
    if (
        orderIsValid &&
        symbolIsValid &&
        nameIsValid &&
        feeIsValid &&
        shareIsValid &&
        capitalIsValid
    ) {
        formIsValid = true;
    }

    /** Change class logic if valid or otherwise. */
    const orderInputClasses = orderHasError ? "invalid" : "valid";
    const symbolInputClasses = symbolHasError ? "invalid" : "valid";
    const nameInputClasses = nameHasError ? "invalid" : "valid";
    const feeInputClasses = feeHasError ? "invalid" : "valid";
    const shareInputClasses = shareHasError ? "invalid" : "valid";
    const capitalInputClasses = capitalHasError ? "invalid" : "valid";

    /** Use context. */
    const authCtx = useContext(AuthContext);

    /** Use http hook reponse callback. */
    const storeResponse = (data) => {
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
                statement: "insert",
                input: { order, symbol, name, fee, share, capital },
            },
        },
        storeResponse
    );

    /** Handle add record submission. */
    const recordHandler = () => {
        /** Change blur state. */
        orderBlurHandler(true);
        symbolBlurHandler(true);
        nameBlurHandler(true);
        feeBlurHandler(true);
        shareBlurHandler(true);
        capitalBlurHandler(true);

        /** Check if there is invalid input. */
        if (
            !orderIsValid &&
            !symbolIsValid &&
            !nameIsValid &&
            !feeIsValid &&
            !shareIsValid &&
            !capitalIsValid
        ) {
            return;
        }

        /** Send request. */
        storeRequest();

        /** Reset input. */
        orderInputReset();
        symbolInputReset();
        nameInputReset();
        feeInputReset();
        shareInputReset();
        capitalInputReset();

        /** Hide form after sending. */
        props.display();

        /** Send request to update state. */
        setTimeout(() => {
            props.retrieve();
        }, 3000);
    };

    /** Return something. */
    return (
        <Fragment>
            {props.record && (
                <div className="items">
                    <div className="item">
                        <select
                            className={`input ${orderInputClasses}`}
                            name="order"
                            value={order}
                            onChange={orderChangeHandler}
                            onBlur={orderBlurHandler}
                            required
                        >
                            <option value=""></option>
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option>
                        </select>
                        <label className="label" htmlFor="order">
                            Order
                        </label>
                        {orderHasError ? (
                            <p className="error">Please enter a valid order.</p>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="item">
                        <input
                            name="symbol"
                            className={`input ${symbolInputClasses}`}
                            type="text"
                            value={symbol}
                            onChange={symbolChangeHandler}
                            onBlur={symbolBlurHandler}
                            required
                        />
                        <label className="label" htmlFor="symbol">
                            Symbol
                        </label>
                        {symbolHasError ? (
                            <p className="error">
                                Please enter a valid symbol.
                            </p>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="item">
                        <input
                            name="name"
                            className={`input ${nameInputClasses}`}
                            type="text"
                            value={name}
                            onChange={nameChangeHandler}
                            onBlur={nameBlurHandler}
                            required
                        />
                        <label className="label" htmlFor="name">
                            Name
                        </label>
                        {nameHasError ? (
                            <p className="error">Please enter a valid name.</p>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="item">
                        <input
                            name="fee"
                            className={`input ${feeInputClasses}`}
                            type="number"
                            step="0.00"
                            value={fee}
                            onChange={feeChangeHandler}
                            onBlur={feeBlurHandler}
                            required
                        />
                        <label className="label" htmlFor="fee">
                            Fee
                        </label>
                        {feeHasError ? (
                            <p className="error">Please enter a valid fee.</p>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="item">
                        <input
                            name="share"
                            className={`input ${shareInputClasses}`}
                            type="number"
                            step="0.00"
                            value={share}
                            onChange={shareChangeHandler}
                            onBlur={shareBlurHandler}
                            required
                        />
                        <label className="label" htmlFor="share">
                            Share
                        </label>
                        {shareHasError ? (
                            <p className="error">Please enter a valid share.</p>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="item">
                        <input
                            name="capital"
                            className={`input ${capitalInputClasses}`}
                            type="number"
                            step="0.00"
                            value={capital}
                            onChange={capitalChangeHandler}
                            onBlur={capitalBlurHandler}
                            required
                        />
                        <label className="label" htmlFor="capital">
                            Capital
                        </label>
                        {capitalHasError ? (
                            <p className="error">
                                Please enter a valid capital.
                            </p>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="item">
                        <button
                            className="btn btn-green-outline"
                            onClick={recordHandler}
                            disabled={!formIsValid}
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

export default Add;
