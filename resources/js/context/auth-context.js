import { createContext } from 'react';

const AuthContext = createContext({
    token: '',
    message: '',
    verified: false,
    valid: true,
    authenticated: false,
    login: (token) => { },
    logout: () => { },
    notifier: (text) => { },
    validifier: (option) => { },
    verifier: (option) => { }
});

export default AuthContext;