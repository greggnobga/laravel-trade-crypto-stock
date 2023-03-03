/** React. */
import { useState } from 'react';

/** Store. */
import AuthContext from './auth-context';

const AuthProvider = (props) => {
    /** Intialize token if user perviously authenticated. */
    const initialToken = localStorage.getItem('token');
    /** Use state. */
    const [token, setToken] = useState(initialToken);
    const [message, setMessage] = useState('');
    const [valid, setValid] = useState(true);
    const [verified, setVerified] = useState(true);

    /** Check token. */
    const isAuthenticated = !!token;

    /** Login handler. */
    const loginHandler = (token) => {
        /** Check if token has value. */
        if (token !== undefined || token !== null) {
            /** Save token to react context. */
            setToken(token);
            /** Save token to local storage. */
            localStorage.setItem('token', token);
        }
    }

    /** Logout handler. */
    const logoutHandler = () => {
        /** Delete token. */
        setToken(null);
        /** Set verified to true. */
        setVerified(true);
        /** Remove token in local storage. */
        localStorage.removeItem('token');
    }

    /** Messenger handler. */
    const messengerHandler = (text) => {
        setMessage(text);
    }

    /** Validifier handler. */
    const validifierHandler = (option) => {
        setValid(option);
    }

    /** Verifier handler. */
    const verifierHandler = (option) => {
        setVerified(option);
    }

    /** Set initial context. */
    const setContext = {
        token: token,
        message: message,
        verified: verified,
        valid: valid,
        authenticated: isAuthenticated,
        login: loginHandler,
        logout: logoutHandler,
        messenger: messengerHandler,
        validifier: validifierHandler,
        verifier: verifierHandler
    }

    return (
        <AuthContext.Provider value={setContext}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;