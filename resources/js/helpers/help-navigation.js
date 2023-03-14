/** React. */
import { useContext } from 'react';

/** Context. */
import AuthContext from '../context/auth-context';

/** Hook. */
import useHttp from '../hooks/use-http';

const helpNavigation = () => {
    /** Use context. */
    const authCtx = useContext(AuthContext);

    /** Callback http hook. */
    const responseHandler = (data) => {
        /** Set sucess message. */
        authCtx.messenger(data.message);
    };

    /** Use http hook. */
    const { sendRequest } = useHttp({
        url: '/api/logout',
        method: 'POST',
        params: { token: localStorage.getItem('token') },
        headers: {
            authorization: `Bearer ${localStorage.getItem('token' || null)}`
        }
    }, responseHandler);

    /** Logout handler. */
    const requestHandler = () => {
        /** Send http request. */
        sendRequest();
        /** Clear token. */
        authCtx.logout();
    }

    return {
        authenticated: authCtx.authenticated,
        requestHandler: requestHandler
    };
}

export default helpNavigation;