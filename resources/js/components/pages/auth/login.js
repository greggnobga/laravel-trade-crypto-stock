/** React. */
import { Fragment, useContext } from 'react';

/** Vendor. */
import { Link, useNavigate } from "react-router-dom";

/** Context. */
import AuthContext from '../../../context/auth-context';

/** Component. */
import Loader from '../../icons/loader.js';

/** Hook. */
import useValidate from '../../../hooks/use-validate';
import useHttp from '../../../hooks/use-http';

const Login = () => {
    /** Map html element to validate hook. */
    const { value: email,
        hasError: emailHasError,
        isValid: emailIsValid,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        resetHandler: emailInputReset
    } = useValidate(value => value.trim() !== '' && value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/));

    const { value: password,
        hasError: passwordHasError,
        isValid: passwordIsValid,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        resetHandler: passwordInputReset
    } = useValidate(value => value.trim() !== '' && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/));

    /** Set overall form validity. */
    let formIsValid = false;
    if (emailIsValid && passwordIsValid) {
        formIsValid = true;
    }

    /** Change class logic if valid or otherwise. */
    const emailInputClasses = emailHasError ? 'invalid' : 'valid';
    const passwordInputClasses = passwordHasError ? 'invalid' : 'valid';

    /** Use navigate. */
    const navigate = useNavigate();

    /** Use context. */
    const authCtx = useContext(AuthContext);

    const loginResponse = (data) => {
        /** Set token. */
        authCtx.login(data.access_token);
        /** Set verifier. */
        authCtx.verifier(data.email_verified);
        /** set valid to false. */
        authCtx.validifier(true);
        /** set error message. */
        authCtx.messenger(data.message);
        /** Navigate out if done loading. */
        navigate('/profile');
    };

    /** Use http hook. */
    const { isLoading, sendRequest, hasError } = useHttp({
        url: '/api/login',
        method: 'POST',
        params: { email: email, password: password }
    }, loginResponse);

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
    }
    /** Cancel handler. */
    const cancelHandler = () => {
        navigate('/');
    }

    return (
        <form method="post" className="form" onSubmit={submitHandler}>
            {isLoading ? <Loader /> : <Fragment>
                <div className="heading">
                    <h4>Login</h4>
                </div>
                <div className="group">
                    <label className="label" htmlFor="email">Email</label>
                    <input
                        className={emailInputClasses}
                        name="email"
                        type="email"
                        value={email}
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                    />
                    {emailHasError ? <p className="error">Please enter a valid email.</p> : ''}
                </div>
                <div className="group">
                    <label className="label" htmlFor="password">Password</label>
                    <input
                        className={passwordInputClasses}
                        name="password"
                        type="password"
                        value={password}
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler}
                    />
                    {passwordHasError && <p className="error">Please enter a valid password.</p>}
                </div>
                <div className="reset">
                    <p>Password forgotten? Click this <Link id="anchor" to="/auth/forgot"><span>link</span></Link> to reset it.</p>
                </div>
                <div className="button">
                    <button className="btn btn-primary" type="submit" disabled={!formIsValid}>Login</button>
                    <button className="btn btn-secondary" type="button" onClick={cancelHandler}>Cancel</button>
                    {/* <button className={submitHover} onMouseEnter={submitMouseEnter} onMouseLeave={submitMouseLeave} type="submit" disabled={!formIsValid}>Submit</button> */}
                    {/* <button className={cancelHover} onMouseEnter={cancelMouseEnter} onMouseLeave={cancelMouseLeave} type="button" onClick={onDelay}>Cancel</button> */}
                </div>
            </Fragment>}
        </form>
    );
}

export default Login;