/** Vendor. */
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

/** Reducer. */
import { stockListReducer } from "./reducers/stockReducers";
import { userLoginReducer } from "./reducers/userReducers";

const reducer = combineReducers({
    stockList: stockListReducer,
    userLogin: userLoginReducer,
});

/** State. */
const userAuthFromStorage = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null;

const initialState = {
    userLogin: { auth: userAuthFromStorage },
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
