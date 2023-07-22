import {
    DASHBOARD_START_REQUEST,
    DASHBOARD_START_SUCCESS,
    DASHBOARD_START_FAILURE,
    DASHBOARD_PRICE_REQUEST,
    DASHBOARD_PRICE_SUCCESS,
    DASHBOARD_PRICE_FAILURE,
    DASHBOARD_REPORT_REQUEST,
    DASHBOARD_REPORT_SUCCESS,
    DASHBOARD_REPORT_FAILURE,
    DASHBOARD_DIVIDEND_REQUEST,
    DASHBOARD_DIVIDEND_SUCCESS,
    DASHBOARD_DIVIDEND_FAILURE,
    DASHBOARD_SECTOR_REQUEST,
    DASHBOARD_SECTOR_SUCCESS,
    DASHBOARD_SECTOR_FAILURE,
    DASHBOARD_LIST_REQUEST,
    DASHBOARD_LIST_SUCCESS,
    DASHBOARD_LIST_FAILURE,
    DASHBOARD_BLUE_REQUEST,
    DASHBOARD_BLUE_SUCCESS,
    DASHBOARD_BLUE_FAILURE,
    DASHBOARD_BLUE_STORE_REQUEST,
    DASHBOARD_BLUE_STORE_SUCCESS,
    DASHBOARD_BLUE_STORE_FAILURE,
    DASHBOARD_BLUE_DESTROY_REQUEST,
    DASHBOARD_BLUE_DESTROY_SUCCESS,
    DASHBOARD_BLUE_DESTROY_FAILURE,
    DASHBOARD_EDGE_REQUEST,
    DASHBOARD_EDGE_SUCCESS,
    DASHBOARD_EDGE_FAILURE,
    DASHBOARD_EDGE_UPDATE_REQUEST,
    DASHBOARD_EDGE_UPDATE_SUCCESS,
    DASHBOARD_EDGE_UPDATE_FAILURE,
} from "../constants/dashboardConstants";

export const dashboardStartReducer = (state = {}, action) => {
    switch (action.type) {
        case DASHBOARD_START_REQUEST:
            return { loading: true };
        case DASHBOARD_START_SUCCESS:
            return { loading: false, success: action.payload };
        case DASHBOARD_START_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const dashboardPriceReducer = (state = {}, action) => {
    switch (action.type) {
        case DASHBOARD_PRICE_REQUEST:
            return { loading: true };
        case DASHBOARD_PRICE_SUCCESS:
            return { loading: false, success: action.payload };
        case DASHBOARD_PRICE_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const dashboardReportReducer = (state = {}, action) => {
    switch (action.type) {
        case DASHBOARD_REPORT_REQUEST:
            return { loading: true };
        case DASHBOARD_REPORT_SUCCESS:
            return { loading: false, success: action.payload };
        case DASHBOARD_REPORT_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const dashboardDividendReducer = (state = {}, action) => {
    switch (action.type) {
        case DASHBOARD_DIVIDEND_REQUEST:
            return { loading: true };
        case DASHBOARD_DIVIDEND_SUCCESS:
            return { loading: false, success: action.payload };
        case DASHBOARD_DIVIDEND_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const dashboardSectorReducer = (state = {}, action) => {
    switch (action.type) {
        case DASHBOARD_SECTOR_REQUEST:
            return { loading: true };
        case DASHBOARD_SECTOR_SUCCESS:
            return { loading: false, success: action.payload };
        case DASHBOARD_SECTOR_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const dashboardListReducer = (state = {}, action) => {
    switch (action.type) {
        case DASHBOARD_LIST_REQUEST:
            return { loading: true };
        case DASHBOARD_LIST_SUCCESS:
            return { loading: false, success: action.payload };
        case DASHBOARD_LIST_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const dashboardBlueReducer = (state = {}, action) => {
    switch (action.type) {
        case DASHBOARD_BLUE_REQUEST:
            return { loading: true };
        case DASHBOARD_BLUE_SUCCESS:
            return { loading: false, bluedash: action.payload };
        case DASHBOARD_BLUE_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const dashboardBlueStoreReducer = (state = {}, action) => {
    switch (action.type) {
        case DASHBOARD_BLUE_STORE_REQUEST:
            return { loading: true };
        case DASHBOARD_BLUE_STORE_SUCCESS:
            return { loading: false, success: action.payload };
        case DASHBOARD_BLUE_STORE_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const dashboardBlueDestroyReducer = (state = {}, action) => {
    switch (action.type) {
        case DASHBOARD_BLUE_DESTROY_REQUEST:
            return { loading: true };
        case DASHBOARD_BLUE_DESTROY_SUCCESS:
            return { loading: false, success: action.payload };
        case DASHBOARD_BLUE_DESTROY_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const dashboardEdgeReducer = (state = {}, action) => {
    switch (action.type) {
        case DASHBOARD_EDGE_REQUEST:
            return { loading: true };
        case DASHBOARD_EDGE_SUCCESS:
            return { loading: false, edge: action.payload };
        case DASHBOARD_EDGE_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const dashboardEdgeUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case DASHBOARD_EDGE_UPDATE_REQUEST:
            return { loading: true };
        case DASHBOARD_EDGE_UPDATE_SUCCESS:
            return { loading: false, success: action.payload };
        case DASHBOARD_EDGE_UPDATE_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
