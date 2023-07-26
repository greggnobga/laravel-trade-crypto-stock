/** Vendor. */
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/** Hook. */
import useValidate from "../../hooks/UseValidate";

/** Component. */
import Loader from "../../components/Loader.js";
import Message from "../../components/Message.js";

/** Action. */
import { forgotPassword } from "../../actions/UserActions.js";

const Forgot = () => {
    /** Map html element to validate hook. */
    const {
        value: email,
        hasError: emailHasError,
        isValid: emailIsValid,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        resetHandler: emailInputReset,
    } = useValidate((value) => value.trim() !== "" && value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/));

    /** Set overall form validity. */
    let formIsValid = false;
    if (emailIsValid) {
        formIsValid = true;
    }

    /** Change class logic if valid or otherwise. */
    const emailInputClasses = emailHasError ? "invalid" : "valid";

    /** Use selector. */
    const userForgot = useSelector((state) => state.userForgot);
    const { loading, error, success } = userForgot;

    /** Use dispatch. */
    const dispatch = useDispatch();

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
        dispatch(forgotPassword(email));
        /** Reset input. */
        emailInputReset();
    };

    return (
        <>
            {error && <Message children={error} variant='alert-danger' />}
            {success && <Message children={success.message} variant='alert-success' />}
            {loading ? (
                <Loader />
            ) : (
                <div className='form-center-margin'>
                    <form method='POST' className='form-group screen-size font-size gradient-huckle-berry' onSubmit={submitHandler}>
                        <div className='form-header border-bottom'>
                            <h4>Forgot Password</h4>
                        </div>
                        <div className='form-control'>
                            <label className='form-label' htmlFor='email'>
                                Email
                            </label>
                            <input
                                className={`form-input ${emailInputClasses}`}
                                id='email'
                                name='email'
                                type='email'
                                value={email}
                                onChange={emailChangeHandler}
                                onBlur={emailBlurHandler}
                                autoComplete='off'
                            />
                            {emailHasError ? <p className='form-alert'>Please enter a valid email.</p> : ""}
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
            )}
        </>
    );
};

export default Forgot;
