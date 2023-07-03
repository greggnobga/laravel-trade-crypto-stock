/** Vendor. */
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

/** Reducer. */
import { stockListReducer } from "./reducers/stockReducers";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";

const reducer = combineReducers({
    stockList: stockListReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
});

/** State. */
const userAuthFromStorage = localStorage.getItem("account")
    ? JSON.parse(localStorage.getItem("account"))
    : null;

const initialState = {
    userLogin: { account: userAuthFromStorage },
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
