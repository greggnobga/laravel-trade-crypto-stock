/** React. */
import { useEffect, useState } from 'react';

/** Hook. */
import useHttp from '../hooks/use-http';

const helpProtect = () => {
    /** Declare local variable. */
    const [auth, setAuth] = useState(true);

    /** Use http hook. */
    const { sendRequest, hasError } = useHttp({
        url: '/api/protect',
        method: 'GET',
        params: { 'token': localStorage.getItem('token') },
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }, (data) => { setAuth(data.status) });

    /** Use effect and send request once. */
    useEffect(() => {
        /** Send request if token set. */
        if ("token" in localStorage) sendRequest();
        /** If error set auth to false. */
        if (hasError) setAuth(false);
    }, [hasError]);

    /** Return something. */
    return [auth];
}

export default helpProtect;