/** React. */
import { useEffect, useState, useContext } from 'react';

/** Vendor. */
import { useNavigate } from "react-router-dom";

/** Context. */
import AuthContext from '../context/auth-context';

/** Hook. */
import useHttp from '../hooks/use-http';

const helpProtect = () => {
    /** Declare local variable. */
    const [auth, setAuth] = useState(true);

    /** Use http hook. */
    const { sendRequest, isLoading, hasError } = useHttp({
        url: '/api/protect',
        method: 'GET',
        params: { 'token': localStorage.getItem('token') },
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }, (data) => { setAuth(data.status) });

    /** Use navigate. */
    const authCtx = useContext(AuthContext);

    /** Use navigate. */
    const navigate = useNavigate();

    /** Use effect and send request once. */
    useEffect(() => {
        /** Send request. */
        sendRequest();
        /** If error true. */
        if (hasError) {
            /** Then set auth false. */
            setAuth(false);
            /** After check auth value. */
            if (auth === false) {
                /** Navigate out. */
                navigate('/auth/login');
                /** Clean token. */
                authCtx.logout();
            }
        }
    }, [hasError, auth]);

    /** Return something. */
    return { token: auth, check: isLoading };
}

export default helpProtect;