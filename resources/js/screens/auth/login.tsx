/** Vendor. */
import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/** Hook. */
import { useAppDispatch, useAppSelector } from '$lib/hooks/use-rtk';
import useValidate from '$lib/hooks/use-validate';
import useProtect from '$lib/hooks/use-protect';
import useAnimate from '$lib/hooks/use-animate';

/** Action. */
import { loginRequest } from '$lib/store/feature/user/auth-slice';

/** Component. */
import Loader from '$lib/components/loader';
import Notification from '$lib//components/notification';

const Login = () => {
    /** Map html element to validate hook. */
    const {
        value: email,
        hasError: emailHasError,
        isValid: emailIsValid,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        resetHandler: emailInputReset,
    } = useValidate((value: any) => value.trim() !== '' && value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/));
    const {
        value: password,
        hasError: passwordHasError,
        isValid: passwordIsValid,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        resetHandler: passwordInputReset,
    } = useValidate((value: any) => value.trim() !== '' && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/));

    /** Change class logic if valid or otherwise. */
    const emailInputClasses = emailHasError ? 'font-thin text-red-400' : '';
    const passwordInputClasses = passwordHasError ? 'font-thin text-red-400' : '';

    /** Set overall form validity. */
    let formIsValid = false;
    if (emailIsValid && passwordIsValid) {
        formIsValid = true;
    }

    /** Use dispatch. */
    const dispatch = useAppDispatch();

    /** Submit handler. */
    const submitHandler = async (event: any) => {
        /** Prevent browser default behaviour */
        event.preventDefault();

        /** Change blur state. */
        emailBlurHandler();
        passwordBlurHandler();

        /** Check if there is invalid input. */
        if (!emailIsValid && !passwordIsValid) {
            return;
        }

        /** Dispatch action. */
        dispatch(loginRequest({ email, password }));

        /** Reset input. */
        emailInputReset();
        passwordInputReset();
    };

    /** Use selector. */
    const auth = useAppSelector((state) => state.auth);
    const { loading, message, status, show_message, valid } = auth;

    /** Use navigate. */
    const navigate = useNavigate();

    /** Use effect. */
    useEffect(() => {
        if (valid) {
            navigate('/dashboard');
        }
    }, [show_message, valid]);

    /** Use animate. */
    const animate_one = useRef(null);
    useAnimate([
        {
            ref: animate_one,
            animations: [{ threshold: 0.1, animationClass: 'animate-fade-up' }],
        },
    ]);

    /** Use protect. */
    useProtect();

    /** Return something. */
    return (
        <section className='relative'>
            {show_message && message && <Notification children={message} duration={5000} status={status ? status : 200} />}
            {loading ? (
                <Loader />
            ) : (
                <div ref={animate_one} className='form-center-margin my-2 animate-once animate-ease-in'>
                    <form method='post' onSubmit={submitHandler} className='form-group screen-size gradient-huckle-berry'>
                        <div className='form-header border-bottom'>
                            <h4>Login</h4>
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
                            {passwordHasError && <p className={`form-alert ${passwordInputClasses}`}>Please enter a valid password.</p>}
                        </div>
                        <div className='form-notice'>
                            <p className='py-2 text-right'>
                                Password forgotten? Click this{' '}
                                <Link to='/auth/forgot' className='text-orange-400'>
                                    link
                                </Link>{' '}
                                to reset it.
                            </p>
                        </div>
                        <div className='form-button'>
                            <div className='p-2'>
                                <Link to='/dashboard'>
                                    <button onClick={submitHandler} className='btn btn-green' type='submit' disabled={!formIsValid}>
                                        Login
                                    </button>
                                </Link>
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
            )}
        </section>
    );
};

export default Login;
