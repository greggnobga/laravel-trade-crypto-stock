import {
    STOCK_START_REQUEST,
    STOCK_START_SUCCESS,
    STOCK_START_FAILURE,
    STOCK_PRICE_REQUEST,
    STOCK_PRICE_SUCCESS,
    STOCK_PRICE_FAILURE,
    STOCK_REPORT_REQUEST,
    STOCK_REPORT_SUCCESS,
    STOCK_REPORT_FAILURE,
    STOCK_DIVIDEND_REQUEST,
    STOCK_DIVIDEND_SUCCESS,
    STOCK_DIVIDEND_FAILURE,
    STOCK_SECTOR_REQUEST,
    STOCK_SECTOR_SUCCESS,
    STOCK_SECTOR_FAILURE,
} from "../constants/stockConstants";

export const stockStartReducer = (state = {}, action) => {
    switch (action.type) {
        case STOCK_START_REQUEST:
            return { loading: true };
        case STOCK_START_SUCCESS:
            return { loading: false, stocks: action.payload };
        case STOCK_START_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const stockPriceReducer = (state = {}, action) => {
    switch (action.type) {
        case STOCK_PRICE_REQUEST:
            return { loading: true };
        case STOCK_PRICE_SUCCESS:
            return { loading: false, success: action.payload };
        case STOCK_PRICE_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const stockReportReducer = (state = {}, action) => {
    switch (action.type) {
        case STOCK_REPORT_REQUEST:
            return { loading: true };
        case STOCK_REPORT_SUCCESS:
            return { loading: false, success: action.payload };
        case STOCK_REPORT_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const stockDividendReducer = (state = {}, action) => {
    switch (action.type) {
        case STOCK_DIVIDEND_REQUEST:
            return { loading: true };
        case STOCK_DIVIDEND_SUCCESS:
            return { loading: false, success: action.payload };
        case STOCK_DIVIDEND_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const stockSectorReducer = (state = {}, action) => {
    switch (action.type) {
        case STOCK_SECTOR_REQUEST:
            return { loading: true };
        case STOCK_SECTOR_SUCCESS:
            return { loading: false, success: action.payload };
        case STOCK_SECTOR_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
