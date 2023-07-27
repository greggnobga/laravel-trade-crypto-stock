/** Vendor. */
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

/** Reducer. */
import { showMessageReducer } from "./reducers/MessageReducers";
import {
    userLoginReducer,
    userRegisterReducer,
    userVerifyReducer,
    userForgotReducer,
    userResetReducer,
    userTokenReducer,
} from "./reducers/UserReducers";

import {
    dashboardStartReducer,
    dashboardPriceReducer,
    dashboardReportReducer,
    dashboardDividendReducer,
    dashboardSectorReducer,
    dashboardListReducer,
    dashboardCompanyReducer,
    dashboardBlueReducer,
    dashboardBlueStoreReducer,
    dashboardBlueDestroyReducer,
    dashboardEdgeReducer,
    dashboardEdgeUpdateReducer,
    dashboardStockGainerReducer,
    dashboardStockLosserReducer,
} from "./reducers/DashboardReducers";

import {
    stockBlueReducer,
    stockCommonReducer,
    stockWatchBuildReducer,
    stockWatchStoreReducer,
    stockWatchFetchReducer,
    stockWatchDestroyReducer,
} from "./reducers/StockReducers";

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
    dashboardBlue: dashboardBlueReducer,
    dashboardBlueStore: dashboardBlueStoreReducer,
    dashboardBlueDestroy: dashboardBlueDestroyReducer,
    dashboardEdge: dashboardEdgeReducer,
    dashboardEdgeUpdate: dashboardEdgeUpdateReducer,
    dashboardStockGainer: dashboardStockGainerReducer,
    dashboardStockLosser: dashboardStockLosserReducer,
    stockBlue: stockBlueReducer,
    stockCommon: stockCommonReducer,
    stockWatchBuild: stockWatchBuildReducer,
    stockWatchStore: stockWatchStoreReducer,
    stockWatchFetch: stockWatchFetchReducer,
    stockWatchDestroy: stockWatchDestroyReducer,
    showMessage: showMessageReducer,
});

/** Initial state. */
const accountFromStorage = localStorage.getItem("account") ? JSON.parse(localStorage.getItem("account")) : {};

const tokenFromStorage = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : { valid: false };

const bluechipFromStorage = localStorage.getItem("bluechip") ? JSON.parse(localStorage.getItem("bluechip")) : {};

const commonFromStorage = localStorage.getItem("common") ? JSON.parse(localStorage.getItem("common")) : {};

const buildFromStorage = localStorage.getItem("build") ? JSON.parse(localStorage.getItem("build")) : {};

const fetchFromStorage = localStorage.getItem("fetch") ? JSON.parse(localStorage.getItem("fetch")) : {};

const bluedashFromStorage = localStorage.getItem("bluedash") ? JSON.parse(localStorage.getItem("bluedash")) : {};

const edgeFromStorage = localStorage.getItem("edge") ? JSON.parse(localStorage.getItem("edge")) : {};

const stockGainerFromStorage = localStorage.getItem("stockgainer") ? JSON.parse(localStorage.getItem("stockgainer")) : {};

const stockLosserFromStorage = localStorage.getItem("stocklosser") ? JSON.parse(localStorage.getItem("stocklosser")) : {};

const initialState = {
    userLogin: accountFromStorage,
    userToken: tokenFromStorage,
    dashboardBlue: bluedashFromStorage,
    dashboardEdge: edgeFromStorage,
    dashboardStockGainer: stockGainerFromStorage,
    dashboardStockLosser: stockLosserFromStorage,
    stockBlue: bluechipFromStorage,
    stockCommon: commonFromStorage,
    stockWatchBuild: buildFromStorage,
    stockWatchFetch: fetchFromStorage,
};

/** Middleware. */
const middleware = [thunk];

/** Store. */
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

/** Export. */
export default store;
