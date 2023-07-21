/** Vendor. */
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

/** Reducer. */
import { showMessageReducer } from "./reducers/messageReducers";
import {
    userLoginReducer,
    userRegisterReducer,
    userVerifyReducer,
    userForgotReducer,
    userResetReducer,
} from "./reducers/userReducers";

import {
    dashboardStartReducer,
    dashboardPriceReducer,
    dashboardReportReducer,
    dashboardDividendReducer,
    dashboardSectorReducer,
    dashboardBlueReducer,
    dashboardEdgeReducer,
    dashboardEdgeUpdateReducer,
} from "./reducers/dashboardReducers";

import {
    stockBlueReducer,
    stockCommonReducer,
    stockWatchBuildReducer,
    stockWatchStoreReducer,
    stockWatchFetchReducer,
    stockWatchDestroyReducer,
} from "./reducers/stockReducers";

/** Combine reducer. */
const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userVerify: userVerifyReducer,
    userForgot: userForgotReducer,
    userReset: userResetReducer,
    dashboardStart: dashboardStartReducer,
    dashboardPrice: dashboardPriceReducer,
    dashboardReport: dashboardReportReducer,
    dashboardDividend: dashboardDividendReducer,
    dashboardSector: dashboardSectorReducer,
    dashboardBlue: dashboardBlueReducer,
    dashboardEdge: dashboardEdgeReducer,
    dashboardEdgeUpdate: dashboardEdgeUpdateReducer,
    stockBlue: stockBlueReducer,
    stockCommon: stockCommonReducer,
    stockWatchBuild: stockWatchBuildReducer,
    stockWatchStore: stockWatchStoreReducer,
    stockWatchFetch: stockWatchFetchReducer,
    stockWatchDestroy: stockWatchDestroyReducer,
    showMessage: showMessageReducer,
});

/** Initial state. */
const accountFromStorage = localStorage.getItem("account")
    ? JSON.parse(localStorage.getItem("account"))
    : { logged: false };

const bluechipFromStorage = localStorage.getItem("bluechip")
    ? JSON.parse(localStorage.getItem("bluechip"))
    : {};

const commonFromStorage = localStorage.getItem("common")
    ? JSON.parse(localStorage.getItem("common"))
    : {};

const buildFromStorage = localStorage.getItem("build")
    ? JSON.parse(localStorage.getItem("build"))
    : {};

const fetchFromStorage = localStorage.getItem("fetch")
    ? JSON.parse(localStorage.getItem("fetch"))
    : {};

const bluedashFromStorage = localStorage.getItem("bluedash")
    ? JSON.parse(localStorage.getItem("bluedash"))
    : {};

const edgeFromStorage = localStorage.getItem("edge")
    ? JSON.parse(localStorage.getItem("edge"))
    : {};

const initialState = {
    userLogin: accountFromStorage,
    dashboardBlue: bluedashFromStorage,
    dashboardEdge: edgeFromStorage,
    stockBlue: bluechipFromStorage,
    stockCommon: commonFromStorage,
    stockWatchBuild: buildFromStorage,
    stockWatchFetch: fetchFromStorage,
};

/** Middleware. */
const middleware = [thunk];

/** Store. */
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

/** Export. */
export default store;
