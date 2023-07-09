/** React. */
import { useState, useEffect } from "react";

/** Vendor. */
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/** Hook. */
import useValidate from "../../hooks/use-validate";

/** Component. */
import Loader from "../../components/interfaces/loader.js";
import Message from "../../components/interfaces/message.js";

/** Action. */
import { resetPassword } from "../../actions/userActions.js";

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

    /** Use params. */
    const { token } = useParams();

    /** Define dispatch. */
    const dispatch = useDispatch();

    /** Select state from redux. */
    const userReset = useSelector((state) => state.userReset);
    const { loading, error } = userReset;

    const userLogin = useSelector((state) => state.userLogin);
    const { logged } = userLogin;

    const showMessage = useSelector((state) => state.showMessage);
    const { message } = showMessage;

    /** Use navigate. */
    const navigate = useNavigate();

    /** Use effect. */
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

        /** If become undefined then redirect. */
        if (logged === true) {
            const timeout = setTimeout(() => {
                navigate("/dashboard");
            }, 1000);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [logged, password, confirm]);

    /** Set overall form validity. */
    let formIsValid = false;
    if (emailIsValid && passwordIsValid && confirmIsValid) {
        formIsValid = true;
    }

    /** Change class logic if valid or otherwise. */
    const emailInputClasses = emailHasError ? "invalid" : "valid";
    const passwordInputClasses = passwordHasError ? "invalid" : "valid";
    const confirmInputClasses = confirmHasError ? "invalid" : "valid";
    const passwordMatchedClasses = passwordMatched ? "invalid" : "valid";

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

        /** Dispatch action. */
        dispatch(resetPassword(token, email, password));

        /** Reset input. */
        emailInputReset();
        passwordInputReset();
        confirmInputReset();
    };

    return (
        <>
            {error && <Message children={error} variant="alert-danger" />}
            {message && <Message children={message} variant="alert-success" />}
            {loading ? (
                <Loader />
            ) : (
                <div className="form-center">
                    <form
                        method="POST"
                        className="form-group screen-size font-size gradient-huckle-berry"
                        onSubmit={submitHandler}
                    >
                        <div className="form-header border-bottom">
                            <h4>Reset Password</h4>
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
                                autoComplete={email}
                            />
                            {emailHasError && (
                                <p className="form-alert">
                                    Please enter a valid email address.
                                </p>
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
                                autoComplete={password}
                            />
                            {passwordHasError ? (
                                <p className="form-alert">
                                    Please enter a valid password.
                                </p>
                            ) : (
                                passwordLength && (
                                    <p className="form-alert">
                                        Password must be 10 characters or more.
                                    </p>
                                )
                            )}
                        </div>

                        <div className="form-control">
                            <label className="form-label" htmlFor="confirm">
                                Confirm Password
                            </label>
                            <input
                                className={`form-input ${passwordMatchedClasses}`}
                                id="confirm"
                                name="confirm"
                                type="password"
                                value={confirm}
                                onChange={confirmChangeHandler}
                                onBlur={confirmBlurHandler}
                                autoComplete={confirm}
                            />
                            {confirmHasError ? (
                                <p className="form-alert">
                                    Please enter a valid confirm password.
                                </p>
                            ) : (
                                passwordMatched && (
                                    <p className="form-alert">
                                        Password and confirm password do not
                                        match.
                                    </p>
                                )
                            )}
                        </div>
                        <div className="form-button">
                            <div className="p-2">
                                <button
                                    type="submit"
                                    onClick={submitHandler}
                                    className="btn btn-green"
                                    disabled={!formIsValid}
                                >
                                    Reset
                                </button>
                            </div>
                            <div className="p-2">
                                <Link to="/">
                                    <button
                                        className="btn btn-stone"
                                        type="button"
                                    >
                                        Cancel
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default Reset;
