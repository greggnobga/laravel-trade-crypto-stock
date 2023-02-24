/** React. */
import { useEffect } from 'react';

/** Vendor. */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

/** Hook. */
import useHttp from './hooks/use-http';

/** Component. */
import Single from './components/layouts/single-column';

import Home from './components/pages/home';
import CryptoExplorer from './components/pages/crypto-explorer';
import StockExplorer from './components/pages/stock-explorer';

import Login from './components/pages/auth/login';
import Register from './components/pages/auth/register';
import Forgot from './components/pages/auth/forgot';
import Reset from './components/pages/auth/reset';
import Verify from './components/pages/auth/verify';

import Uncharted from './components/pages/error/uncharted';

const App = () => {
    /** Use http hook. */
    const testResponse = (data) => {
        console.log(data);
    };

    const { isLoading, sendRequest } = useHttp({
        url: '/api/login',
        method: 'GET',
        params: {}
    }, testResponse);

    useEffect(() => {
        sendRequest();
    }, []);


    return (
        <Router>
            <Routes>
                <Route path="/" element={<Single />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/crypto-explorer" element={<CryptoExplorer />} />
                    <Route path="/stock-explorer" element={<StockExplorer />} />
                </Route>
                <Route path="/auth" element={<Single />}>
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/auth/forgot" element={<Forgot />} />
                    <Route path="/auth/reset/:token" element={<Reset />} />
                    <Route path="/auth/resend" element={<Verify />} />
                    <Route path="/auth/verify/:token" element={<Verify />} />
                </Route>
                <Route path="/" element={<Single />}>
                    <Route path="*" element={<Navigate replace to="/uncharted" />} />
                    <Route path="/uncharted" element={<Uncharted />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;