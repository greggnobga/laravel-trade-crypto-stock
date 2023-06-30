/** React. */
import { Fragment, useState, useEffect, useContext } from "react";

/** Vendor. */
import { useParams, useNavigate } from "react-router-dom";

/** Hook. */
import useValidate from "../../hooks/use-validate";

/** Component. */
import Loader from "../../components/interfaces/loader.js";

const Reset = () => {
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

    const {
        value: confirm,
        hasError: confirmHasError,
        isValid: confirmIsValid,
        valueChangeHandler: confirmChangeHandler,
        inputBlurHandler: confirmBlurHandler,
        resetHandler: confirmInputReset,
    } = useValidate(
        (value) =>
            value.trim() !== "" && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/)
    );

    /** Check if password match and length. */
    const [passwordMatched, setPasswordMatched] = useState(false);
    const [passwordLength, setpasswordLength] = useState(false);

    useEffect(() => {
        if (password.length != 0 && password.length < 10) {
            setpasswordLength(true);
        } else {
            setpasswordLength(false);
        }

        if (password !== confirm) {
            setPasswordMatched(true);
        } else {
            setPasswordMatched(false);
        }
    }, [password, confirm]);

    /** Set overall form validity. */
    let formIsValid = false;
    if (emailIsValid && passwordIsValid && confirmIsValid) {
        formIsValid = true;
    }

    /** Change class logic if valid or otherwise. */
    const emailInputClasses = emailHasError
        ? "form-input form-invalid"
        : "form-input";
    const passwordInputClasses = passwordHasError
        ? "form-input form-invalid"
        : "form-input";
    const confirmInputClasses = confirmHasError
        ? "form-input form-invalid"
        : "form-input";
    const passwordMatchedClasses = passwordMatched
        ? "form-input form-invalid"
        : "form-input";

    /** Submit handdler. */
    const submitHandler = (event) => {
        /** Prevent browser default behaviour */
        event.preventDefault();

        /** Change blur state. */
        emailBlurHandler(true);
        passwordBlurHandler(true);
        confirmBlurHandler(true);

        /** Check if there is invalid input. */
        if (!emailIsValid && !passwordIsValid && !confirmIsValid) {
            return;
        }

        /** Perform ajax request. */
        console.log(email, password, confirm);

        /** Reset input. */
        emailInputReset();
        passwordInputReset();
        confirmInputReset();
    };

    return (
        <form method="POST" onSubmit={submitHandler}>
            <Fragment>
                <div className="heading">
                    <h4>Reset Password</h4>
                </div>
                <div className="group">
                    <label className="label" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        className={emailInputClasses}
                        name="email"
                        type="email"
                        value={email}
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                    />
                    {emailHasError && (
                        <p className="error">Please enter a valid email.</p>
                    )}
                </div>
                <div className="group">
                    <label className="label" htmlFor="password">
                        Password
                    </label>
                    <input
                        className={passwordInputClasses}
                        name="password"
                        type="password"
                        value={password}
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler}
                    />
                    {passwordHasError ? (
                        <p className="error">Please enter a valid password.</p>
                    ) : passwordLength ? (
                        <p className="error">
                            Password must be 10 characters or more.
                        </p>
                    ) : (
                        ""
                    )}
                </div>
                <div className="group">
                    <label className="label" htmlFor="confirm">
                        Confirm Password
                    </label>
                    <input
                        className={passwordMatchedClasses}
                        name="confirm"
                        type="password"
                        value={confirm}
                        onChange={confirmChangeHandler}
                        onBlur={confirmBlurHandler}
                    />
                    {confirmHasError ? (
                        <p className="error">
                            Please enter a valid confirm password.
                        </p>
                    ) : passwordMatched ? (
                        <p className="error">
                            Password and confirm password do not match.
                        </p>
                    ) : (
                        ""
                    )}
                </div>
                <div className="button">
                    <button type="submit" disabled={!formIsValid}>
                        Reset
                    </button>
                    <button type="button">Cancel</button>
                </div>
            </Fragment>
        </form>
    );
};

export default Reset;
