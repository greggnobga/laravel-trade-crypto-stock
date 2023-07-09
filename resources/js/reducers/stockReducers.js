import {
    STOCK_LIST_REQUEST,
    STOCK_LIST_SUCCESS,
    STOCK_LIST_FAILURE,
} from "../constants/stockConstants";

export const stockListReducer = (state = {}, action) => {
    switch (action.type) {
        case STOCK_LIST_REQUEST:
            return { loading: true };
        case STOCK_LIST_SUCCESS:
            return { loading: false, stocks: action.payload };
        case STOCK_LIST_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
