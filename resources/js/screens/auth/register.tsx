/** Vendor. */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

// /** Component. */
// import Loader from '../../components/Loader.js';
// import Message from '../../components/Message.js';

// /** Action. */
// import { registerUser, tokenUser } from '../../actions/UserActions.js';

/** Hook. */
import useValidate from '$lib/hooks/use-validate';

const Register = () => {
    // /** Define dispatch. */
    // const dispatch = useDispatch();

    // /** Select state from redux. */
    // const userLogin = useSelector((state) => state.userLogin);

    // const { access_token } = userLogin;
    // const userRegister = useSelector((state) => state.userRegister);

    // const { loading, error } = userRegister;
    // const userToken = useSelector((state) => state.userToken);

    // const showMessage = useSelector((state) => state.showMessage);
    // const { message } = showMessage;

    // /** Use navigate. */
    // const navigate = useNavigate();

    // /** Use user token. */
    // const { valid } = userToken;

    /** Map html element to validate hook. */
    const {
        value: userName,
        hasError: userNameHasError,
        isValid: userNameIsValid,
        valueChangeHandler: userNameChangeHandler,
        inputBlurHandler: userNameBlurHandler,
        resetHandler: userNameInputReset,
    } = useValidate((value: any) => value.trim() !== '' && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/));
    const {
        value: firstName,
        hasError: firstNameHasError,
        isValid: firstNameIsValid,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
        resetHandler: firstNameInputReset,
    } = useValidate((value: any) => value.trim() !== '' && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/));
    const {
        value: lastName,
        hasError: lastNameHasError,
        isValid: lastNameIsValid,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        resetHandler: lastNameInputReset,
    } = useValidate((value: any) => value.trim() !== '' && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/));
    const {
        value: email,
        hasError: emailHasError,
        isValid: emailIsValid,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        resetHandler: emailInputReset,
    } = useValidate(
        (value: any) => value.trim() !== '' && value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    );
    const {
        value: password,
        hasError: passwordHasError,
        isValid: passwordIsValid,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        resetHandler: passwordInputReset,
    } = useValidate((value: any) => value.trim() !== '' && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/));
    const {
        value: confirm,
        hasError: confirmHasError,
        isValid: confirmIsValid,
        valueChangeHandler: confirmChangeHandler,
        inputBlurHandler: confirmBlurHandler,
        resetHandler: confirmInputReset,
    } = useValidate((value: any) => value.trim() !== '' && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/));

    /** Check if password match and length. */
    const [passwordMatched, setPasswordMatched] = useState<boolean>(false);
    const [passwordLength, setpasswordLength] = useState<boolean>(false);

    /** Use effect. */
    useEffect(() => {
        /** Check if password length is greater than 10. */
        if (password.length != 0 && password.length < 10) {
            setpasswordLength(true);
        } else {
            setpasswordLength(false);
        }
        /** Check if password and confirm match. */
        if (password !== confirm) {
            setPasswordMatched(true);
        } else {
            setPasswordMatched(false);
        }
        // /** Check valid state. */
        // if (!valid && access_token) {
        //     dispatch(tokenUser(access_token));
        // }
        // /** Check if token is valid. */
        // if (valid && access_token) {
        //     navigate('/dashboard');
        // } else {
        //     navigate('/auth/register');
        // }
    }, [password, confirm]);

    /** Set overall form validity. */
    let formIsValid = false;
    if (userNameIsValid && firstNameIsValid && lastNameIsValid && emailIsValid && passwordIsValid && confirmIsValid) {
        formIsValid = true;
    }
    /** Change class logic if valid or otherwise. */
    const userNameInputClasses = userNameHasError ? 'font-thin text-red-400' : '';
    const firstNameInputClasses = firstNameHasError ? 'font-thin text-red-400' : '';
    const lastNameInputClasses = lastNameHasError ? 'font-thin text-red-400' : '';
    const emailInputClasses = emailHasError ? 'font-thin text-red-400' : '';
    const passwordInputClasses = passwordHasError ? 'font-thin text-red-400' : '';
    const confirmInputClasses = confirmHasError ? 'font-thin text-red-400' : '';
    const passwordMatchedClasses = passwordMatched ? 'font-thin text-red-400' : '';

    /** Submit handler. */
    const submitHandler = (event: any) => {
        /** Prevent browser default behaviour */
        event.preventDefault();
        /** Change blur state. */
        userNameBlurHandler();
        firstNameBlurHandler();
        lastNameBlurHandler();
        emailBlurHandler();
        passwordBlurHandler();
        confirmBlurHandler();
        /** Check if there is invalid input. */
        if (
            !userNameIsValid &&
            !firstNameIsValid &&
            !lastNameIsValid &&
            !emailIsValid &&
            !passwordIsValid &&
            !confirmIsValid
        ) {
            return;
        }
        /** Dispatch action. */
        // dispatch(registerUser(userName, firstName, lastName, email, password));
        console.log(userName, firstName, lastName, email, password);

        /** Reset input. */
        userNameInputReset();
        firstNameInputReset();
        lastNameInputReset();
        emailInputReset();
        passwordInputReset();
        confirmInputReset();
    };

    /** Return something. */
    return (
        <div className='form-center-margin my-2'>
            <form method='post' className='form-group screen-size gradient-huckle-berry' onSubmit={submitHandler}>
                <div className='form-header border-bottom'>
                    <h4>Register</h4>
                </div>
                <div className='form-control'>
                    <label className='form-label' htmlFor='username'>
                        Username
                    </label>
                    <input
                        className={`form-input ${userNameHasError ? 'border border-red-500' : ''}`}
                        id='username'
                        name='username'
                        type='text'
                        value={userName}
                        onChange={userNameChangeHandler}
                        onBlur={userNameBlurHandler}
                        autoComplete='off'
                    />
                    {userNameHasError && (
                        <p className={`form-alert ${userNameInputClasses}`}>Please enter a valid username.</p>
                    )}
                </div>
                <div className='form-control'>
                    <label className='form-label' htmlFor='firstname'>
                        First Name
                    </label>
                    <input
                        className={`form-input ${firstNameHasError ? 'border border-red-500' : ''}`}
                        id='firstname'
                        name='firstname'
                        type='text'
                        value={firstName}
                        onChange={firstNameChangeHandler}
                        onBlur={firstNameBlurHandler}
                        autoComplete='off'
                    />
                    {firstNameHasError && (
                        <p className={`form-alert ${firstNameInputClasses}`}>Please enter a valid first name.</p>
                    )}
                </div>
                <div className='form-control'>
                    <label className='form-label' htmlFor='lastname'>
                        Last Name
                    </label>
                    <input
                        className={`form-input ${lastNameHasError ? 'border border-red-500' : ''}`}
                        id='lastname'
                        name='lastname'
                        type='text'
                        value={lastName}
                        onChange={lastNameChangeHandler}
                        onBlur={lastNameBlurHandler}
                        autoComplete='off'
                    />
                    {lastNameHasError && (
                        <p className={`form-alert ${lastNameInputClasses}`}>Please enter a valid last name.</p>
                    )}
                </div>
                <div className='form-control'>
                    <label className='form-label' htmlFor='email'>
                        Email
                    </label>
                    <input
                        className={`form-input ${emailHasError ? 'border border-red-500' : ''}`}
                        id='email'
                        name='email'
                        type='email'
                        value={email}
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                        autoComplete='off'
                    />
                    {emailHasError && <p className={`form-alert ${emailInputClasses}`}>Please enter a valid email.</p>}
                </div>
                <div className='form-control'>
                    <label className='form-label' htmlFor='password'>
                        Password
                    </label>
                    <input
                        className={`form-input ${passwordHasError ? 'border border-red-500' : ''}`}
                        id='password'
                        name='password'
                        type='password'
                        value={password}
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler}
                        autoComplete='off'
                    />
                    {passwordHasError ? (
                        <p className={`form-alert ${passwordInputClasses}`}>Please enter a valid password.</p>
                    ) : (
                        passwordLength && (
                            <p className={`form-alert ${passwordInputClasses}`}>
                                Password must be 10 characters or more.
                            </p>
                        )
                    )}
                </div>
                <div className='form-control'>
                    <label className='form-label' htmlFor='confirm'>
                        Confirm Password
                    </label>
                    <input
                        className={`form-input ${confirmHasError ? 'border border-red-500' : ''}`}
                        id='confirm'
                        name='confirm'
                        type='password'
                        value={confirm}
                        onChange={confirmChangeHandler}
                        onBlur={confirmBlurHandler}
                        autoComplete='off'
                    />
                    {confirmHasError ? (
                        <p className={`form-alert ${confirmInputClasses}`}>Please enter a valid confirm password.</p>
                    ) : (
                        passwordMatched && (
                            <p className={`form-alert ${passwordMatchedClasses}`}>
                                Password and confirm password do not match.
                            </p>
                        )
                    )}
                </div>
                <div className='form-notice'>
                    <p className='py-2 text-right'>
                        Already have an account? Click this{' '}
                        <Link to='/auth/login' className='text-orange-400'>
                            link
                        </Link>{' '}
                        to login.
                    </p>
                </div>
                <div className='form-button'>
                    <div className='p-2'>
                        <button type='submit' onClick={submitHandler} className='btn btn-green' disabled={!formIsValid}>
                            Register
                        </button>
                    </div>
                    <div className='p-2'>
                        <Link to='/'>
                            <button className='btn btn-stone' type='button'>
                                Cancel
                            </button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Register;
