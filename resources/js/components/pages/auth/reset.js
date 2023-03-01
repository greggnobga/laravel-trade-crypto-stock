/** React. */
import { Fragment, useState, useEffect, useContext } from 'react';

/** Vendor. */
import { useParams, useNavigate } from 'react-router-dom';

/** Hook. */
import useValidate from '../../../hooks/use-validate';
import useHttp from '../../../hooks/use-http';

/** Component. */
import Loader from '../../icons/loader.js';

const Reset = () => {
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

    const { value: confirm,
        hasError: confirmHasError,
        isValid: confirmIsValid,
        valueChangeHandler: confirmChangeHandler,
        inputBlurHandler: confirmBlurHandler,
        resetHandler: confirmInputReset
    } = useValidate(value => value.trim() !== '' && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/));

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
    const emailInputClasses = emailHasError ? 'form-input form-invalid' : 'form-input';
    const passwordInputClasses = passwordHasError ? 'form-input form-invalid' : 'form-input';
    const confirmInputClasses = confirmHasError ? 'form-input form-invalid' : 'form-input';
    const passwordMatchedClasses = passwordMatched ? 'form-input form-invalid' : 'form-input';

    /** Use navigate. */
    const navigate = useNavigate();

    const resetResponse = (data) => {
        /** Set reponse validity. */
        console.log(data);
    };

    /** Use params. */
    const params = useParams();

    const { isLoading, sendRequest, hasError } = useHttp({
        url: '/api/reset',
        method: 'POST',
        params: { token: params.token, email: email, password: password }
    }, resetResponse);

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
        sendRequest();

        /** Reset input. */
        emailInputReset();
        passwordInputReset();
        confirmInputReset();

        /** Navigate out if done loading. */
        setTimeout(() => {
            if (!isLoading && !hasError) {
                navigate('/');
            }
        }, 5000);
    }
    /** Cancel handler. */
    const cancelHandler = () => {
        navigate('/');
    }

    return (
        <form method="POST" id="form" onSubmit={submitHandler}>
            {isLoading ? <Loader /> : <Fragment>
                <div className="heading">
                    <h4>Reset Password</h4>
                </div>
                <div className="group">
                    <label className="label" htmlFor="email">Email Address</label>
                    <input
                        className={emailInputClasses}
                        name="email"
                        type="email"
                        value={email}
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                    />
                    {emailHasError && <p className="error">Please enter a valid email.</p>}
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
                    {passwordHasError ? <p className="error">Please enter a valid password.</p> : passwordLength ? <p className="error">Password must be 10 characters or more.</p> : ''}
                </div>
                <div className="group">
                    <label className="label" htmlFor="confirm">Confirm Password</label>
                    <input
                        className={passwordMatchedClasses}
                        name="confirm"
                        type="password"
                        value={confirm}
                        onChange={confirmChangeHandler}
                        onBlur={confirmBlurHandler}
                    />
                    {confirmHasError ? <p className="error">Please enter a valid confirm password.</p> : passwordMatched ? <p className="error">Password and confirm password do not match.</p> : ''}
                </div>
                <div id="button">
                    <button className="btn btn-primary" type="submit" disabled={!formIsValid}>Reset</button>
                    <button className="btn btn-secondary" type="button" onClick={cancelHandler}>Cancel</button>
                    {/* <button className={submitHover} onMouseEnter={submitMouseEnter} onMouseLeave={submitMouseLeave} type="submit" disabled={!formIsValid}>Submit</button>
                    <button className={cancelHover} onMouseEnter={cancelMouseEnter} onMouseLeave={cancelMouseLeave} type="button" onClick={onDelay}>Cancel</button> */}
                </div>
            </Fragment>}
        </form>
    );
}

export default Reset;