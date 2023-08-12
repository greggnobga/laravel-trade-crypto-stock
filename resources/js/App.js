/** Vendor. */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

/** Component. */
import Layout from './components/Layout';

import HomeScreen from './screens/HomeScreen';
import CryptoScreen from './screens/CryptoScreen';

import StockScreen from './screens/StockScreen';
import StockPage from './screens/pages/StockPage';

import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import ForgotScreen from './screens/auth/ForgotScreen';
import ResetScreen from './screens/auth/ResetScreen';
import VerifyScreen from './screens/auth/VerifyScreen';

import ProfileScreen from './screens/ProfileScreen';

import DashboardScreen from './screens/DashboardScreen';

import StockPortfolioScreen from './screens/dashboard/stock/PortfolioScreen';
import StockWatchlistScreen from './screens/dashboard/stock/WatchlistScreen';
import StockTradeScreen from './screens/dashboard/stock/TradeScreen';
import StockChartScreen from './screens/dashboard/stock/ChartScreen';

import CryptoPortfolioScreen from './screens/dashboard/crypto/PortfolioScreen';
import CryptoTradeScreen from './screens/dashboard/crypto/TradeScreen';
import CryptoMoonScreen from './screens/dashboard/crypto/MoonScreen';
import CryptoGameScreen from './screens/dashboard/crypto/GameScreen';
import CryptoNftScreen from './screens/dashboard/crypto/NftScreen';

import NoteScreen from './screens/dashboard/NoteScreen';

import ErrorScreen from './screens/ErrorScreen';

const App = () => {
  /** Return something. */
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/crypto-explorer' element={<CryptoScreen />} />
          <Route path='/stock-explorer' element={<StockScreen />} />
          <Route path='/stock-explorer/:symbol' element={<StockPage />} />
        </Route>
        <Route path='/auth' element={<Layout />}>
          <Route path='/auth/register' element={<RegisterScreen />} />
          <Route path='/auth/login' element={<LoginScreen />} />
          <Route path='/auth/forgot' element={<ForgotScreen />} />
          <Route path='/auth/reset/:token' element={<ResetScreen />} />
          <Route path='/auth/verify/:token' element={<VerifyScreen />} />
        </Route>
        <Route path='/profile' element={<Layout />}>
          <Route path='/profile' element={<ProfileScreen />} />
        </Route>
        <Route path='/dashboard' element={<Layout />}>
          <Route path='/dashboard' element={<DashboardScreen />} />
          <Route path='/dashboard/stock-portfolio' element={<StockPortfolioScreen />} />
          <Route path='/dashboard/stock-trade' element={<StockTradeScreen />} />
          <Route path='/dashboard/stock-watchlist' element={<StockWatchlistScreen />} />
          <Route path='/dashboard/stock-chart' element={<StockChartScreen />} />
          <Route path='/dashboard/crypto-portfolio' element={<CryptoPortfolioScreen />} />
          <Route path='/dashboard/crypto-trade' element={<CryptoTradeScreen />} />
          <Route path='/dashboard/crypto-moon' element={<CryptoMoonScreen />} />
          <Route path='/dashboard/crypto-game' element={<CryptoGameScreen />} />
          <Route path='/dashboard/crypto-nft' element={<CryptoNftScreen />} />
          <Route path='/dashboard/extra-note' element={<NoteScreen />} />
        </Route>
        <Route path='/' element={<Layout />}>
          <Route path='*' element={<Navigate replace to='/uncharted' />} />
          <Route path='/uncharted' element={<ErrorScreen />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
