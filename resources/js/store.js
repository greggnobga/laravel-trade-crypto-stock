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
    stockStartReducer,
    stockPriceReducer,
    stockReportReducer,
    stockDividendReducer,
    stockSectorReducer,
    stockBlueReducer,
    stockCommonReducer,
    stockWatchBuildReducer,
} from "./reducers/stockReducers";

/** Combine reducer. */
const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userVerify: userVerifyReducer,
    userForgot: userForgotReducer,
    userReset: userResetReducer,
    stockStart: stockStartReducer,
    stockPrice: stockPriceReducer,
    stockReport: stockReportReducer,
    stockDividend: stockDividendReducer,
    stockSector: stockSectorReducer,
    stockBlue: stockBlueReducer,
    stockCommon: stockCommonReducer,
    stockWatchBuild: stockWatchBuildReducer,
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

const initialState = {
    userLogin: accountFromStorage,
    stockBlue: bluechipFromStorage,
    stockCommon: commonFromStorage,
    stockWatchBuild: buildFromStorage,
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
