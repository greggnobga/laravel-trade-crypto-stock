import { createContext } from 'react';

const AuthContext = createContext({
    token: '',
    message: '',
    verified: true,
    valid: true,
    authenticated: false,
    login: (token) => { },
    logout: () => { },
    messenger: (text) => { },
    validifier: (option) => { },
    verifier: (option) => { }
});

export default AuthContext;