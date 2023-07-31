/** Vendor. */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

/** Reducer. */
import { showMessageReducer } from './reducers/MessageReducers';
import { userLoginReducer, userRegisterReducer, userVerifyReducer, userForgotReducer, userResetReducer, userTokenReducer } from './reducers/UserReducers';

import {
  dashboardStartReducer,
  dashboardPriceReducer,
  dashboardReportReducer,
  dashboardDividendReducer,
  dashboardSectorReducer,
  dashboardListReducer,
  dashboardCompanyReducer,
  dashboardBluechipReducer,
  dashboardBluechipStoreReducer,
  dashboardBluechipDestroyReducer,
  dashboardEdgeReducer,
  dashboardEdgeUpdateReducer,
  dashboardStockGainerReducer,
  dashboardStockLosserReducer,
} from './reducers/DashboardReducers';

import { watchlistBuildReducer, watchlistStoreReducer, watchlistFetchReducer, watchlistDestroyReducer } from './reducers/WatchlistReducers';

import { tradeBluechipReducer, tradeCommonReducer, tradeStoreReducer } from './reducers/TradeReducers';

import { chartWatchlistReducer, chartAverageReducer, chartFetchReducer } from './reducers/ChartReducers';

/** Combine reducer. */
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userVerify: userVerifyReducer,
  userForgot: userForgotReducer,
  userReset: userResetReducer,
  userToken: userTokenReducer,
  dashboardStart: dashboardStartReducer,
  dashboardPrice: dashboardPriceReducer,
  dashboardReport: dashboardReportReducer,
  dashboardDividend: dashboardDividendReducer,
  dashboardSector: dashboardSectorReducer,
  dashboardList: dashboardListReducer,
  dashboardCompany: dashboardCompanyReducer,
  dashboardBluechip: dashboardBluechipReducer,
  dashboardBluechipStore: dashboardBluechipStoreReducer,
  dashboardBluechipDestroy: dashboardBluechipDestroyReducer,
  dashboardEdge: dashboardEdgeReducer,
  dashboardEdgeUpdate: dashboardEdgeUpdateReducer,
  dashboardStockGainer: dashboardStockGainerReducer,
  dashboardStockLosser: dashboardStockLosserReducer,
  watchlistBuild: watchlistBuildReducer,
  watchlistStore: watchlistStoreReducer,
  watchlistFetch: watchlistFetchReducer,
  watchlistDestroy: watchlistDestroyReducer,
  tradeBluechip: tradeBluechipReducer,
  tradeCommon: tradeCommonReducer,
  tradeStore: tradeStoreReducer,
  chartWatchlist: chartWatchlistReducer,
  chartAverage: chartAverageReducer,
  chartFetch: chartFetchReducer,
  showMessage: showMessageReducer,
});

/** Initial state. */
const accountFromStorage = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')) : {};

const tokenFromStorage = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : { valid: false };

const dashboardBluechipFromStorage = localStorage.getItem('dashboardBluechip') ? JSON.parse(localStorage.getItem('dashboardBluechip')) : {};

const dashboardEdgeFromStorage = localStorage.getItem('dashboardEdge') ? JSON.parse(localStorage.getItem('dashboardEdge')) : {};

const dashboardStockGainerFromStorage = localStorage.getItem('dashboardStockGainer') ? JSON.parse(localStorage.getItem('dashboardStockGainer')) : {};

const dashboardStockLosserFromStorage = localStorage.getItem('dashboardStockLosser') ? JSON.parse(localStorage.getItem('dashboardStockLosser')) : {};

const watchlistBuildFromStorage = localStorage.getItem('watchlistBuild') ? JSON.parse(localStorage.getItem('watchlistBuild')) : {};

const watchlistFetchFromStorage = localStorage.getItem('watchlistFetch') ? JSON.parse(localStorage.getItem('watchlistFetch')) : {};

const tradeBluechipFromStorage = localStorage.getItem('tradeBluechip') ? JSON.parse(localStorage.getItem('tradeBluechip')) : {};

const tradeCommonFromStorage = localStorage.getItem('tradeCommon') ? JSON.parse(localStorage.getItem('tradeCommon')) : {};

const chartWatchlistFromStorage = localStorage.getItem('chartWatchlist') ? JSON.parse(localStorage.getItem('chartWatchlist')) : {};

const chartFetchFromStorage = localStorage.getItem('chartFetch') ? JSON.parse(localStorage.getItem('chartFetch')) : {};

const initialState = {
  userLogin: accountFromStorage,
  userToken: tokenFromStorage,
  dashboardBluechip: dashboardBluechipFromStorage,
  dashboardEdge: dashboardEdgeFromStorage,
  dashboardStockGainer: dashboardStockGainerFromStorage,
  dashboardStockLosser: dashboardStockLosserFromStorage,
  watchlistBuild: watchlistBuildFromStorage,
  watchlistFetch: watchlistFetchFromStorage,
  tradeBluechip: tradeBluechipFromStorage,
  tradeCommon: tradeCommonFromStorage,
  chartWatchlist: chartWatchlistFromStorage,
  chartFetch: chartFetchFromStorage,
};

/** Middleware. */
const middleware = [thunk];

/** Store. */
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

/** Export. */
export default store;
