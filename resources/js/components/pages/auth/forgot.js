/** React. */
import { useContext } from "react";

/** Vendor. */
import { Link } from "react-router-dom";

/** Hook. */
import useValidate from "../../../hooks/use-validate";

const Forgot = () => {
    /** Map html element to validate hook. */
    const {
        value: email,
        hasError: emailHasError,
        isValid: emailIsValid,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        resetHandler: emailInputReset,
    } = useValidate(
        (value) =>
            value.trim() !== "" &&
            value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    );

    /** Set overall form validity. */
    let formIsValid = false;
    if (emailIsValid) {
        formIsValid = true;
    }

    /** Change class logic if valid or otherwise. */
    const emailInputClasses = emailHasError ? "invalid" : "valid";

    /** Submit handler. */
    const submitHandler = (event) => {
        /** Prevent browser default behaviour */
        event.preventDefault();

        /** Change blur state. */
        emailBlurHandler(true);

        /** Check if there is invalid input. */
        if (!emailIsValid) {
            return;
        }

        /** Perform ajax request. */
        sendRequest();

        /** Reset input. */
        emailInputReset();
    };

    return (
        <div className="form-center">
            <form
                method="post"
                className="form-group screen-size font-size gradient-huckle-berry"
                onSubmit={submitHandler}
            >
                <div className="form-header border-bottom">
                    <h4>Forgot Password</h4>
                </div>
                <div className="form-control">
                    <label className="form-label" htmlFor="email">
                        Email
                    </label>
                    <input
                        className={`form-input ${emailInputClasses}`}
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                        autoComplete="off"
                    />
                    {emailHasError ? (
                        <p className="form-alert alert-warning">
                            Please enter a valid email.
                        </p>
                    ) : (
                        ""
                    )}
                </div>
                <div className="form-button">
                    <div className="mx-auto">
                        <button
                            type="submit"
                            className="btn btn-green"
                            disabled={!formIsValid}
                        >
                            Submit
                        </button>
                    </div>
                    <div className="mx-auto">
                        <button type="button" className="btn btn-stone">
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Forgot;
