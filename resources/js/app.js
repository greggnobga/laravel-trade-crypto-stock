/** Vendor. */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

/** Component. */
import SinglePublic from './components/layouts/single-public';
import SingleDashboard from './components/layouts/single-dashboard';

import Home from './components/pages/home';
import CryptoExplorer from './components/pages/crypto-explorer';
import StockExplorer from './components/pages/stock-explorer';

import Login from './components/pages/auth/login';
import Register from './components/pages/auth/register';
import Forgot from './components/pages/auth/forgot';
import Reset from './components/pages/auth/reset';
import Verify from './components/pages/auth/verify';

import Client from './components/pages/client';

import Dashboard from './components/pages/dashboard';

import StockPortfolio from './components/pages/dashboard/stock-portfolio';
import StockWatchlist from './components/pages/dashboard/stock-watchlist';
import StockTrade from './components/pages/dashboard/stock-trade';
import StockChart from './components/pages/dashboard/stock-chart';
import StockNote from './components/pages/dashboard/stock-note';

import CryptoPortfolio from './components/pages/dashboard/crypto-portfolio';
import CryptoWatchlist from './components/pages/dashboard/crypto-watchlist';
import CryptoScreen from './components/pages/dashboard/crypto-screen';
import CryptoFund from './components/pages/dashboard/crypto-fund';
import CryptoNote from './components/pages/dashboard/crypto-note';

import Uncharted from './components/pages/error/uncharted';

const App = () => {
    /** Return something. */
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SinglePublic />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/crypto-explorer" element={<CryptoExplorer />} />
                    <Route path="/stock-explorer" element={<StockExplorer />} />
                </Route>
                <Route path="/auth" element={<SinglePublic />}>
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/forgot" element={<Forgot />} />
                    <Route path="/auth/reset/:token" element={<Reset />} />
                    <Route path="/auth/verify/:token" element={<Verify />} />
                </Route>
                <Route path="/profile" element={<SinglePublic />}>
                    <Route path="/profile" element={<Client />} />
                </Route>
                <Route path="/dashboard" element={<SingleDashboard />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/stock-portfolio" element={<StockPortfolio />} />
                    <Route path="/dashboard/stock-watchlist" element={<StockWatchlist />} />
                    <Route path="/dashboard/stock-trade" element={<StockTrade />} />
                    <Route path="/dashboard/stock-chart" element={<StockChart />} />
                    <Route path="/dashboard/stock-note" element={<StockNote />} />
                    <Route path="/dashboard/crypto-portfolio" element={<CryptoPortfolio />} />
                    <Route path="/dashboard/crypto-watchlist" element={<CryptoWatchlist />} />
                    <Route path="/dashboard/crypto-screen" element={<CryptoScreen />} />
                    <Route path="/dashboard/crypto-fund" element={<CryptoFund />} />
                    <Route path="/dashboard/crypto-note" element={<CryptoNote />} />
                </Route>
                <Route path="/" element={<SinglePublic />}>
                    <Route path="*" element={<Navigate replace to="/uncharted" />} />
                    <Route path="/uncharted" element={<Uncharted />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;