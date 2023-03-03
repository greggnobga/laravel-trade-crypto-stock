
/** React. */
import { Fragment, useContext, useEffect } from 'react';

/** Vendor. */
import { useNavigate } from "react-router-dom";

/** Context. */
import AuthContext from '../../../context/auth-context';

/** Hook. */
import helpProtect from '../../../helpers/help-protect';

const Client = () => {
    /** Use protect. */
    const [auth] = helpProtect();

    /** Use navigate. */
    const authCtx = useContext(AuthContext);

    /** Use navigate. */
    const navigate = useNavigate();

    /** Use effect. */
    useEffect(() => {
        if (auth === false) {
            navigate('/');
            authCtx.logout();
        }
    }, [auth]);

    /** Return something. */
    return (
        <Fragment>
            {auth ? <h1>Client page.</h1> : ''}
        </Fragment>
    );
}

export default Client;