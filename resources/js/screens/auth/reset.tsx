/** Vendor. */
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

// /** Component. */
// import Loader from '../../components/Loader.js';
// import Message from '../../components/Message.js';

// /** Action. */
// import { resetPassword, tokenUser } from '../../actions/UserActions.js';

/** Hook. */
import useValidate from '$lib/hooks/use-validate';

const Reset = () => {
    // /** Define dispatch. */
    // const dispatch = useDispatch();

    // /** Select state from redux. */
    // const userReset = useSelector((state) => state.userReset);
    // const { loading } = userReset;

    // const userLogin = useSelector((state) => state.userLogin);
    // const { access_token } = userLogin;

    // const userToken = useSelector((state) => state.userToken);
    // const { valid } = userToken;

    // const showMessage = useSelector((state) => state.showMessage);
    // const { message, error } = showMessage;

    // /** Use navigate. */
    // const navigate = useNavigate();

    /** Map html element to validate hook. */
    const {
        value: email,
        hasError: emailHasError,
        isValid: emailIsValid,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        resetHandler: emailInputReset,
    } = useValidate(
        (value: string) => value.trim() !== '' && value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
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

    /** Set overall form validity. */
    let formIsValid = false;
    if (emailIsValid && passwordIsValid && confirmIsValid) {
        formIsValid = true;
    }

    /** Change class logic if valid or otherwise. */
    const emailInputClasses = emailHasError ? 'font-thin text-red-400' : '';
    const passwordInputClasses = passwordHasError ? 'font-thin text-red-400' : '';
    const confirmInputClasses = confirmHasError ? 'font-thin text-red-400' : '';
    const passwordMatchedClasses = passwordMatched ? 'font-thin text-red-400' : '';
    const passwordLengthClasses = passwordLength ? 'font-thin text-red-400' : '';

    /** Use params. */
    const { token } = useParams();

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
        // /** Check valid state. */
        // if (!valid && access_token) {
        //     dispatch(tokenUser(access_token));
        // }
        // /** Check if token is valid. */
        // if (valid && access_token) {
        //     console.log('Continue resetting your password.');
        // } else {
        //     navigate('/auth/login');
        // }

        console.log(token);
    }, [password, confirm, token]);

    /** Submit handler. */
    const submitHandler = (event: any): void => {
        /** Prevent browser default behaviour */
        event.preventDefault();

        /** Change blur state. */
        emailBlurHandler();
        passwordBlurHandler();
        confirmBlurHandler();

        /** Check if there is invalid input. */
        if (!emailIsValid && !passwordIsValid && !confirmIsValid) {
            return;
        }
        /** Dispatch action. */
        // dispatch(resetPassword(token, email, password));
        console.log(token, email, password);

        /** Reset input. */
        emailInputReset();
        passwordInputReset();
        confirmInputReset();
    };

    /** Return something. */
    return (
        <div className='form-center-margin'>
            <form method='POST' className='form-group screen-size gradient-huckle-berry' onSubmit={submitHandler}>
                <div className='form-header border-bottom'>
                    <h4>Reset Password</h4>
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
                        autoComplete={email}
                    />
                    {emailHasError && (
                        <p className={`form-alert ${emailInputClasses}`}>Please enter a valid email address.</p>
                    )}
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
                        autoComplete={password}
                    />
                    {passwordHasError ? (
                        <p className={`form-alert ${passwordInputClasses}`}>Please enter a valid password.</p>
                    ) : (
                        passwordLength && (
                            <p className={`form-alert ${passwordLengthClasses}`}>
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
                        autoComplete={confirm}
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
                <div className='form-button'>
                    <div className='p-2'>
                        <button type='submit' onClick={submitHandler} className='btn btn-green' disabled={!formIsValid}>
                            Reset
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

export default Reset;
