import {
    STOCK_BLUE_REQUEST,
    STOCK_BLUE_SUCCESS,
    STOCK_BLUE_FAILURE,
    STOCK_COMMON_REQUEST,
    STOCK_COMMON_SUCCESS,
    STOCK_COMMON_FAILURE,
    STOCK_WATCH_BUILD_REQUEST,
    STOCK_WATCH_BUILD_SUCCESS,
    STOCK_WATCH_BUILD_FAILURE,
    STOCK_WATCH_STORE_REQUEST,
    STOCK_WATCH_STORE_SUCCESS,
    STOCK_WATCH_STORE_FAILURE,
    STOCK_WATCH_FETCH_REQUEST,
    STOCK_WATCH_FETCH_SUCCESS,
    STOCK_WATCH_FETCH_FAILURE,
    STOCK_WATCH_DESTROY_REQUEST,
    STOCK_WATCH_DESTROY_SUCCESS,
    STOCK_WATCH_DESTROY_FAILURE,
} from "../constants/stockConstants";

export const stockBlueReducer = (state = {}, action) => {
    switch (action.type) {
        case STOCK_BLUE_REQUEST:
            return { loading: true };
        case STOCK_BLUE_SUCCESS:
            return { loading: false, bluechip: action.payload };
        case STOCK_BLUE_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const stockCommonReducer = (state = {}, action) => {
    switch (action.type) {
        case STOCK_COMMON_REQUEST:
            return { loading: true };
        case STOCK_COMMON_SUCCESS:
            return { loading: false, common: action.payload };
        case STOCK_COMMON_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const stockWatchBuildReducer = (state = {}, action) => {
    switch (action.type) {
        case STOCK_WATCH_BUILD_REQUEST:
            return { loading: true };
        case STOCK_WATCH_BUILD_SUCCESS:
            return { loading: false, build: action.payload };
        case STOCK_WATCH_BUILD_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const stockWatchStoreReducer = (state = {}, action) => {
    switch (action.type) {
        case STOCK_WATCH_STORE_REQUEST:
            return { loading: true };
        case STOCK_WATCH_STORE_SUCCESS:
            return { loading: false, success: action.payload };
        case STOCK_WATCH_STORE_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const stockWatchFetchReducer = (state = {}, action) => {
    switch (action.type) {
        case STOCK_WATCH_FETCH_REQUEST:
            return { loading: true };
        case STOCK_WATCH_FETCH_SUCCESS:
            return { loading: false, watchlist: action.payload };
        case STOCK_WATCH_FETCH_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const stockWatchDestroyReducer = (state = {}, action) => {
    switch (action.type) {
        case STOCK_WATCH_FETCH_REQUEST:
            return { loading: true };
        case STOCK_WATCH_FETCH_SUCCESS:
            return { loading: false, success: action.payload };
        case STOCK_WATCH_FETCH_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
