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
    showMessage: showMessageReducer,
});

/** Initial state. */
const accountFromStorage = localStorage.getItem("account")
    ? JSON.parse(localStorage.getItem("account"))
    : { logged: false };

const initialState = {
    userLogin: accountFromStorage,
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
