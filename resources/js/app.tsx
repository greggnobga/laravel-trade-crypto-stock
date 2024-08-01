/** Vendor. */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

/** Component. */
import Layout from '$lib/components/layout';
import Scroll from '$lib/components/scroll';
import Home from '$lib/screens/home';
import Crypto from '$lib/screens/crypto';
import Error from '$lib/screens/error';

import Stock from '$lib/screens/stock';
import StockDetail from '$lib/screens/stock-detail';

import Register from '$lib/screens/auth/register';
import Login from '$lib/screens/auth/login';
import Forgot from '$lib/screens/auth/forgot';
import Reset from '$lib/screens/auth/reset';
import Verify from '$lib/screens/auth/verify';

import Dashboard from '$lib/screens/dashboard/dashboard';
import Profile from '$lib/screens/dashboard/profile';
import Note from '$lib/screens/dashboard/note';

import PortfolioStock from '$lib/screens/dashboard/stocks/portfolio';
import WatchlistStock from '$lib/screens/dashboard/stocks/watchlist';
import PortfolioChart from '$lib/screens/dashboard/stocks/chart';
import TradeStock from '$lib/screens/dashboard/stocks/trade';

import PortfolioCrypto from '$lib/screens/dashboard/cryptos/portfolio';
import TradeCrypto from '$lib/screens/dashboard/cryptos/trade';
import GameCrypto from '$lib/screens/dashboard/cryptos/game';
import NFTCrypto from '$lib/screens/dashboard/cryptos/nft';

const App = () => {
    /** Return something. */
    return (
        <Router>
            <Scroll>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route path='/' element={<Home />} />
                        <Route path='/stock-explorer/:page?' element={<Stock />} />
                        <Route path='/stock-explorer/details/:ticker?' element={<StockDetail />} />
                        <Route path='/crypto-explorer' element={<Crypto />} />
                    </Route>
                    <Route path='/auth' element={<Layout />}>
                        <Route path='/auth/register' element={<Register />} />
                        <Route path='/auth/login' element={<Login />} />
                        <Route path='/auth/forgot' element={<Forgot />} />
                        <Route path='/auth/reset/:token' element={<Reset />} />
                        <Route path='/auth/verify/:token' element={<Verify />} />
                    </Route>
                    <Route path='/dashboard' element={<Layout />}>
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/dashboard/profile' element={<Profile />} />
                        <Route path='/dashboard/extra-note' element={<Note />} />
                        <Route path='/dashboard/stock-portfolio' element={<PortfolioStock />} />
                        <Route path='/dashboard/stock-watchlist' element={<WatchlistStock />} />
                        <Route path='/dashboard/stock-chart' element={<PortfolioChart />} />
                        <Route path='/dashboard/stock-trade' element={<TradeStock />} />
                        <Route path='/dashboard/crypto-portfolio' element={<PortfolioCrypto />} />
                        <Route path='/dashboard/crypto-trade' element={<TradeCrypto />} />
                        <Route path='/dashboard/crypto-game' element={<GameCrypto />} />
                        <Route path='/dashboard/crypto-nft' element={<NFTCrypto />} />
                    </Route>

                    <Route path='/' element={<Layout />}>
                        <Route path='*' element={<Navigate replace to='/uncharted' />} />
                        <Route path='/uncharted' element={<Error />} />
                    </Route>
                </Routes>
            </Scroll>
        </Router>
    );
};

export default App;
