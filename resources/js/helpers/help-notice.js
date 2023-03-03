/** React. */
import { useContext } from 'react';

/** Store. */
import AuthContext from '../context/auth-context';

const helpNotice = () => {
    /** Use context. */
    const authCtx = useContext(AuthContext);

    /** Declare local variable. */
    let notified = false;

    /** Check if message has been set. */
    if (authCtx.message) {
        /** Change value. */
        notified = true;
    }

    /** Enable outside to manipulate local variable. */
    const setNotified = () => {
        authCtx.messenger('');
        authCtx.verifier(true);
        notified = false;
    }

    /** expose local state and function outside. */
    return { notified, setNotified };
}

export default helpNotice;