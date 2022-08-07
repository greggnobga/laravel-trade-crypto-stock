/** sidebar modules.*/
import sidebar from './dashboard/_sidebar.js';
sidebar.init();

/** crypto modules.*/
import crypto_overviews from './dashboard/crypto/_overviews.js';
crypto_overviews.init();
import crypto_screens from './dashboard/crypto/_screens.js';
crypto_screens.init();
import crypto_games from './dashboard/crypto/_games.js';
crypto_games.init();
import crypto_moons from './dashboard/crypto/_moons.js';
crypto_moons.init();
import crypto_portfolio from './dashboard/crypto/_portfolios.js';
crypto_portfolio.init();

/** stock modules.*/
import stock_overviews from './dashboard/stock/_overviews.js';
stock_overviews.init();
import stock_watchlists from './dashboard/stock/_watchlists.js';
stock_watchlists.init();
import stock_portfolios from './dashboard/stock/_portfolios.js';
stock_portfolios.init();
import stock_trades from './dashboard/stock/_trades.js';
stock_trades.init();
import stock_notes from './dashboard/stock/_notes.js';
stock_notes.init();
