/** Vendor. */
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

/** Component. */
import Layout from "./components/layouts";

import Home from "./screens/homeScreen";
import CryptoExplorer from "./screens/cryptoScreen";
import StockExplorer from "./screens/stockScreen";

import Login from "./screens/auth/loginScreen";
import Register from "./screens/auth/registerScreen";
import Forgot from "./screens/auth/forgotScreen";
import Reset from "./screens/auth/resetScreen";
import Verify from "./screens/auth/verifyScreen";

import Profile from "./screens/profileScreen";

import Dashboard from "./screens/dashboardScreen";

import StockPortfolio from "./screens/dashboard/stock/portfolioScreen";
import StockWatchlist from "./screens/dashboard/stock/watchlistScreen";
import StockTrade from "./screens/dashboard/stock/tradeScreen";
import StockChart from "./screens/dashboard/stock/chartScreen";

import CryptoPortfolio from "./screens/dashboard/crypto/portfolioScreen";
import CryptoScreen from "./screens/dashboard/crypto/screenScreen";
import CryptoMoon from "./screens/dashboard/crypto/moonScreen";
import CryptoGame from "./screens/dashboard/crypto/gameScreen";
import CryptoNft from "./screens/dashboard/crypto/nftScreen";

import Note from "./screens/dashboard/noteScreen";

import Uncharted from "./screens/errorScreen";

const App = () => {
    /** Return something. */
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/crypto-explorer"
                        element={<CryptoExplorer />}
                    />
                    <Route path="/stock-explorer" element={<StockExplorer />} />
                </Route>
                <Route path="/auth" element={<Layout />}>
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/forgot" element={<Forgot />} />
                    <Route path="/auth/reset/:token" element={<Reset />} />
                    <Route path="/auth/verify/:token" element={<Verify />} />
                </Route>
                <Route path="/profile" element={<Layout />}>
                    <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="/dashboard" element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                        path="/dashboard/stock-portfolio"
                        element={<StockPortfolio />}
                    />
                    <Route
                        path="/dashboard/stock-watchlist"
                        element={<StockWatchlist />}
                    />
                    <Route
                        path="/dashboard/stock-trade"
                        element={<StockTrade />}
                    />
                    <Route
                        path="/dashboard/stock-chart"
                        element={<StockChart />}
                    />
                    <Route
                        path="/dashboard/crypto-portfolio"
                        element={<CryptoPortfolio />}
                    />
                    <Route
                        path="/dashboard/crypto-screen"
                        element={<CryptoScreen />}
                    />
                    <Route
                        path="/dashboard/crypto-moon"
                        element={<CryptoMoon />}
                    />
                    <Route
                        path="/dashboard/crypto-game"
                        element={<CryptoGame />}
                    />
                    <Route
                        path="/dashboard/crypto-nft"
                        element={<CryptoNft />}
                    />
                    <Route path="/dashboard/extra-note" element={<Note />} />
                </Route>
                <Route path="/" element={<Layout />}>
                    <Route
                        path="*"
                        element={<Navigate replace to="/uncharted" />}
                    />
                    <Route path="/uncharted" element={<Uncharted />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
