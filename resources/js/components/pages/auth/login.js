/** React. */
import { useContext } from "react";

/** Vendor. */
import { Link } from "react-router-dom";

/** Component. */
import Loader from "../../icons/loader.js";

/** Hook. */
import useValidate from "../../../hooks/use-validate";

const Login = () => {
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

    const {
        value: password,
        hasError: passwordHasError,
        isValid: passwordIsValid,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        resetHandler: passwordInputReset,
    } = useValidate(
        (value) =>
            value.trim() !== "" && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/)
    );

    /** Set overall form validity. */
    let formIsValid = false;
    if (emailIsValid && passwordIsValid) {
        formIsValid = true;
    }

    /** Change class logic if valid or otherwise. */
    const emailInputClasses = emailHasError
        ? "alert-border-warning"
        : "alert-border-success";
    const passwordInputClasses = passwordHasError
        ? "alert-border-warning"
        : "alert-border-success";

    /** Submit handler. */
    const submitHandler = (event) => {
        /** Prevent browser default behaviour */
        event.preventDefault();

        /** Change blur state. */
        emailBlurHandler(true);
        passwordBlurHandler(true);

        /** Check if there is invalid input. */
        if (!emailIsValid && !passwordIsValid) {
            return;
        }

        /** Perform ajax request. */
        sendRequest();

        /** Reset input. */
        emailInputReset();
        passwordInputReset();
    };

    return (
        <div className="form-center my-2">
            <form
                method="post"
                onSubmit={submitHandler}
                className="form-group screen-size font-size gradient-huckle-berry"
            >
                <div className="form-header border-bottom">
                    <h4>Login</h4>
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
                <div className="form-control">
                    <label className="form-label" htmlFor="password">
                        Password
                    </label>
                    <input
                        className={`form-input ${passwordInputClasses}`}
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler}
                        autoComplete="off"
                    />
                    {passwordHasError && (
                        <p className="form-alert alert-warning">
                            Please enter a valid password.
                        </p>
                    )}
                </div>
                <div className="form-notice">
                    <p className="py-2 text-right">
                        Password forgotten? Click this{" "}
                        <Link to="/auth/forgot" className="text-orange-400">
                            link
                        </Link>{" "}
                        to reset it.
                    </p>
                </div>
                <div className="form-button">
                    <div className="mx-auto">
                        <button
                            className="btn btn-green"
                            type="submit"
                            disabled={!formIsValid}
                        >
                            Login
                        </button>
                    </div>
                    <div className="mx-auto">
                        <button className="btn btn-stone" type="button">
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
