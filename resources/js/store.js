/** Vendor. */
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

/** Reducer. */
import { stocksReducer } from "./reducers/stockReducers";
import {
    userLoginReducer,
    userRegisterReducer,
    userVerifyReducer,
    userForgotReducer,
    userResetReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
    stocks: stocksReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userVerify: userVerifyReducer,
    userForgot: userForgotReducer,
    userReset: userResetReducer,
});

/** State. */
const accountFromStorage = localStorage.getItem("account")
    ? JSON.parse(localStorage.getItem("account"))
    : null;

const initialState = {
    userLogin: { account: accountFromStorage },
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
