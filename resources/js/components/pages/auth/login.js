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
    const emailInputClasses = emailHasError ? "input-warning" : "input-success";
    const passwordInputClasses = passwordHasError
        ? "input-warning"
        : "input-success";

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
        <div className="flex items-center justify-center h-screen border-two bg-indigo-200 bg-opacity-20">
            <form
                method="post"
                onSubmit={submitHandler}
                className="px-6 grid  w-2/4 h-2/4 gradient-huckle-berry rounded-lg shadow border border-slate-50"
            >
                <>
                    <div className="p-6 uppercase text-center border-bottom my-auto">
                        <h4>Login</h4>
                    </div>
                    <div className="p-2 grid grid-cols-6 auto-rows-min">
                        <label className="col-span-2 span-box" htmlFor="email">
                            Email
                        </label>
                        <input
                            className={`col-span-4 input-box  ${emailInputClasses}`}
                            name="email"
                            type="email"
                            value={email}
                            onChange={emailChangeHandler}
                            onBlur={emailBlurHandler}
                        />
                        {emailHasError ? (
                            <p className="col-span-6 py-2 text-right text-xs message-warning">
                                Please enter a valid email.
                            </p>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="p-2 grid grid-cols-6 auto-rows-min">
                        <label
                            className="col-span-2 span-box"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className={`col-span-4 input-box ${passwordInputClasses}`}
                            name="password"
                            type="password"
                            value={password}
                            onChange={passwordChangeHandler}
                            onBlur={passwordBlurHandler}
                        />
                        {passwordHasError && (
                            <p className="col-span-6 py-2 text-right text-xs message-warning">
                                Please enter a valid password.
                            </p>
                        )}
                    </div>
                    <div className="p-2 grid auto-rows-min">
                        <p className="text-xs text-slate-50 text-right">
                            Password forgotten? Click this{" "}
                            <Link to="/auth/forgot" className="text-orange-400">
                                link
                            </Link>{" "}
                            to reset it.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 auto-rows-min">
                        <button
                            className="p-2"
                            type="submit"
                            disabled={!formIsValid}
                        >
                            Login
                        </button>
                        <button className="p-2" type="button">
                            Cancel
                        </button>
                    </div>
                </>
            </form>
        </div>
    );
};

export default Login;
