/** React. */
import { Fragment } from 'react';

/** Vendor. */
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <form method="post" id="form-wrapper" className="{isClass}">
            {/* {"isLoading" ? <Loader /> : <Fragment> */}
            {false ? '<Loader />' : <Fragment>
                <div className="form-heading">
                    <h4>Login</h4>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                        className='{emailInputClasses}'
                        name="email"
                        type="email"
                    // value="{email}"
                    // onChange="{emailChangeHandler}"
                    // onBlur="{emailBlurHandler}"
                    />
                    {/* {emailHasError ? <p className="form-error">Please enter a valid email.</p> : ''} */}
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input
                        className="{passwordInputClasses}"
                        name="password"
                        type="password"
                    // value="{password}"
                    //onChange="{passwordChangeHandler}"
                    //onBlur="{passwordBlurHandler}"
                    />
                    {/* {passwordHasError && <p className="form-error">Please enter a valid password.</p>} */}
                </div>
                <div className="form-reset">
                    <p>Password forgotten? Click this <Link to="/auth/forgot"><span>link</span></Link> to reset it.</p>
                </div>
                <div className="form-button">
                    <button>Login</button>
                    <button>Cancel</button>
                    {/* <button className={submitHover} onMouseEnter={submitMouseEnter} onMouseLeave={submitMouseLeave} type="submit" disabled={!formIsValid}>Submit</button> */}
                    {/* <button className={cancelHover} onMouseEnter={cancelMouseEnter} onMouseLeave={cancelMouseLeave} type="button" onClick={onDelay}>Cancel</button> */}
                </div>
            </Fragment>}
        </form>
    );
}

export default Login;