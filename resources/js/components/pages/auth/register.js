/** React. */
import { Fragment, useState, useEffect } from 'react';

/** Vendor. */
import { Link, useNavigate } from "react-router-dom";

/** Component. */
import Loader from '../../icons/loader.js';

/** Hook. */
import useValidate from '../../../hooks/use-validate';
import useHttp from '../../../hooks/use-http';

const Register = () => {
    /** Map html element to validate hook. */
    const { value: userName,
        hasError: userNameHasError,
        isValid: userNameIsValid,
        valueChangeHandler: userNameChangeHandler,
        inputBlurHandler: userNameBlurHandler,
        resetHandler: userNameInputReset
    } = useValidate(value => value.trim() !== '' && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/));

    const { value: firstName,
        hasError: firstNameHasError,
        isValid: firstNameIsValid,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
        resetHandler: firstNameInputReset
    } = useValidate(value => value.trim() !== '' && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/));

    const { value: lastName,
        hasError: lastNameHasError,
        isValid: lastNameIsValid,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        resetHandler: lastNameInputReset
    } = useValidate(value => value.trim() !== '' && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/));

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
    if (userNameIsValid && firstNameIsValid && lastNameIsValid && emailIsValid && passwordIsValid && confirmIsValid) {
        formIsValid = true;
    }

    /** Change class logic if valid or otherwise. */
    const userNameInputClasses = userNameHasError ? 'invalid' : 'valid';
    const firstNameInputClasses = firstNameHasError ? 'invalid' : 'valid';
    const lastNameInputClasses = lastNameHasError ? 'invalid' : 'valid';
    const emailInputClasses = emailHasError ? 'invalid' : 'valid';
    const passwordInputClasses = passwordHasError ? 'invalid' : 'valid';
    const confirmInputClasses = confirmHasError ? 'invalid' : 'valid';
    const passwordMatchedClasses = passwordMatched ? 'invalid' : 'valid';

    /** Use navigate. */
    const navigate = useNavigate();

    const regResponse = (data) => {
        console.log(data);
    };

    const { isLoading, sendRequest, hasError } = useHttp({
        url: '/api/register',
        method: 'POST',
        params: { username: userName, firstname: firstName, lastname: lastName, email: email, password: password }
    }, regResponse);

    /** Submit handler. */
    const submitHandler = (event) => {
        /** Prevent browser default behaviour */
        event.preventDefault();

        /** Change blur state. */
        userNameBlurHandler(true);
        firstNameBlurHandler(true);
        lastNameBlurHandler(true);
        emailBlurHandler(true);
        passwordBlurHandler(true);
        confirmBlurHandler(true);

        /** Check if there is invalid input. */
        if (!emailIsValid && !passwordIsValid) {
            return;
        }

        /** Perform ajax request. */
        sendRequest();

        /** Reset input. */
        userNameInputReset();
        firstNameInputReset();
        lastNameInputReset();
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
        <form method="post" id="form" onSubmit={submitHandler}>
            {isLoading ? <Loader /> : <Fragment>
                <div className="heading">
                    <h4>Register</h4>
                </div>
                <div className="group">
                    <label className="label" htmlFor="username">Username</label>
                    <input
                        className={userNameInputClasses}
                        name="username"
                        type="text"
                        value={userName}
                        onChange={userNameChangeHandler}
                        onBlur={userNameBlurHandler}
                    />
                    {userNameHasError ? <p className="error">Please enter a valid username.</p> : ''}
                </div>
                <div className="group">
                    <label className="label" htmlFor="firstname">First Name</label>
                    <input
                        className={firstNameInputClasses}
                        name="firstname"
                        type="text"
                        value={firstName}
                        onChange={firstNameChangeHandler}
                        onBlur={firstNameBlurHandler}
                    />
                    {firstNameHasError ? <p className="error">Please enter a valid first name.</p> : ''}
                </div>
                <div className="group">
                    <label className="label" htmlFor="lastname">Last Name</label>
                    <input
                        className={lastNameInputClasses}
                        name="lastname"
                        type="text"
                        value={lastName}
                        onChange={lastNameChangeHandler}
                        onBlur={lastNameBlurHandler}
                    />
                    {lastNameHasError ? <p className="error">Please enter a valid last name.</p> : ''}
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
                    {passwordHasError ? <p className="error">Please enter a valid password.</p> : passwordLength ? <p className="error">Password must be 10 characters or more.</p> : ''}
                </div>
                <div className="group">
                    <label className="label" htmlFor="confirm">Confirm Password</label>
                    <input
                        className={confirmInputClasses}
                        name="confirm"
                        type="password"
                        value={confirm}
                        onChange={confirmChangeHandler}
                        onBlur={confirmBlurHandler}
                    />
                    {confirmHasError ? <p className="error">Please enter a valid confirm password.</p> : passwordMatched ? <p className="error">Password and confirm password do not match.</p> : ''}
                </div>
                <div className="reset">
                    <p>Password forgotten? Click this <Link id="anchor" to="/auth/forgot"><span>link</span></Link> to reset it.</p>
                </div>
                <div id="button">
                    <button className="btn btn-primary" type="submit" disabled={!formIsValid}>Register</button>
                    <button className="btn btn-secondary" type="button" onClick={cancelHandler}>Cancel</button>
                    {/* <button className={submitHover} onMouseEnter={submitMouseEnter} onMouseLeave={submitMouseLeave} type="submit" disabled={!formIsValid}>Submit</button> */}
                    {/* <button className={cancelHover} onMouseEnter={cancelMouseEnter} onMouseLeave={cancelMouseLeave} type="button" onClick={onDelay}>Cancel</button> */}
                </div>
            </Fragment>}
        </form>
    );
}

export default Register;