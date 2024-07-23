// /** Vendor. */
import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

// /** Component. */
// import Loader from '../../components/Loader.js';
// import Message from '../../components/Message.js';

// /** Action. */
// import { forgotPassword } from '../../actions/UserActions.js';

/** Hook. */
import useValidate from '$lib/hooks/use-validate';

const Forgot = () => {
    // /** Use selector. */
    // const userForgot = useSelector((state) => state.userForgot);
    // const { loading, error, success } = userForgot;
    // /** Use dispatch. */
    // const dispatch = useDispatch();

    /** Map html element to validate hook. */
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
    /** Set overall form validity. */
    let formIsValid = false;
    if (emailIsValid) {
        formIsValid = true;
    }
    /** Change class logic if valid or otherwise. */
    const emailInputClasses = emailHasError ? 'font-thin text-red-400' : '';

    /** Submit handler. */
    const submitHandler = (event: any) => {
        /** Prevent browser default behaviour */
        event.preventDefault();

        /** Change blur state. */
        emailBlurHandler();

        /** Check if there is invalid input. */
        if (!emailIsValid) {
            return;
        }
        /** Perform ajax request. */
        // dispatch(forgotPassword(email));
        console.log(email);

        /** Reset input. */
        emailInputReset();
    };

    /** Return something. */
    return (
        <div className='form-center-margin'>
            <form method='POST' className='form-group screen-size gradient-huckle-berry' onSubmit={submitHandler}>
                <div className='form-header border-bottom'>
                    <h4>Forgot Password</h4>
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
                    {emailHasError ? (
                        <p className={`form-alert ${emailInputClasses}`}>Please enter a valid email.</p>
                    ) : (
                        ''
                    )}
                </div>
                <div className='form-button'>
                    <div className='p-2'>
                        <button type='submit' className='btn btn-green' disabled={!formIsValid}>
                            Submit
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

export default Forgot;
