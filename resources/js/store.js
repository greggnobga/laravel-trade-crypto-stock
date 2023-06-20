/** Vendor. */
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

/** Reducer. */
import { stockListReducer } from "./reducers/stockReducers";
import { userCredentialReducer } from "./reducers/userReducers";

const reducer = combineReducers({
    stockList: stockListReducer,
    userCredential: userCredentialReducer,
});

/** State. */
const initialState = {};

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
