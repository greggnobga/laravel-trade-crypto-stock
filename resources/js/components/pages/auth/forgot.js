/** React. */
import { Fragment } from 'react';

/** Vendor. */
import { Link, useNavigate } from "react-router-dom";

/** Component. */
import Loader from '../../icons/loader.js';

/** Hook. */
import useValidate from '../../../hooks/use-validate';
import useHttp from '../../../hooks/use-http';

const Forgot = () => {
    /** Map html element to validate hook. */
    const { value: email,
        hasError: emailHasError,
        isValid: emailIsValid,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        resetHandler: emailInputReset
    } = useValidate(value => value.trim() !== '' && value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/));

    /** Set overall form validity. */
    let formIsValid = false;
    if (emailIsValid) {
        formIsValid = true;
    }

    /** Change class logic if valid or otherwise. */
    const emailInputClasses = emailHasError ? 'invalid' : 'valid';

    /** Use navigate. */
    const navigate = useNavigate();

    const forgotResponse = (data) => {
        /** Console log response.*/
        console.log(data);
    };

    /** Use http hook. */
    const { isLoading, sendRequest, hasError } = useHttp({
        url: '/api/reset',
        method: 'POST',
        params: { email: email }
    }, forgotResponse);

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

        /** Navigate out if done loading. */
        setTimeout(() => {
            if (!isLoading && !hasError) {
                navigate('/auth/login');
            }
        }, 5000);
    }
    /** Cancel handler. */
    const cancelHandler = () => {
        navigate('/');
    }

    return (
        <form method="post" id="form" onSubmit={submitHandler}>
            {isLoading ? <Loader /> : <Fragment>
                <div className="heading">
                    <h4>Forgot Password</h4>
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
                <div id="button">
                    <button className="btn btn-primary" type="submit" disabled={!formIsValid}>Submit</button>
                    <button className="btn btn-secondary" type="button" onClick={cancelHandler}>Cancel</button>
                    {/* <button className={submitHover} onMouseEnter={submitMouseEnter} onMouseLeave={submitMouseLeave} type="submit" disabled={!formIsValid}>Submit</button> */}
                    {/* <button className={cancelHover} onMouseEnter={cancelMouseEnter} onMouseLeave={cancelMouseLeave} type="button" onClick={onDelay}>Cancel</button> */}
                </div>
            </Fragment>}
        </form>
    );
}

export default Forgot;