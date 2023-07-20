/** Vendor. */
import axios from "axios";

/** Constant. */
import {
    MESSAGE_SHOW_SUCCESS,
    MESSAGE_SHOW_FAILURE,
} from "../constants/messageConstants";

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

export const actStockBluechip = (token) => async (dispatch) => {
    try {
        /** Dispatch action to set inital state. */
        dispatch({ type: STOCK_BLUE_REQUEST });

        /** Prepare request to external api data provider. */
        const { data } = await axios({
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            method: "GET",
            url: "/api/stock-trade-retrieve",
            params: { section: "blue" },
        });

        /** Separate result. */
        let stocks = data.stocks;
        let message = data.message;

        /** Dispatch action to show message in the frontend. */
        dispatch({
            type: MESSAGE_SHOW_SUCCESS,
            payload: message,
        });

        /** Dispatch action to set the result into the store. */
        dispatch({ type: STOCK_BLUE_SUCCESS, payload: stocks });

        /** Save to result to local storage. */
        if (stocks) {
            localStorage.setItem("bluechip", JSON.stringify(stocks));
        }
    } catch (error) {
        /** Dispatch action if error occurred. */
        dispatch({
            type: STOCK_BLUE_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
        /** Dispatch action if error occurred. */
        dispatch({
            type: MESSAGE_SHOW_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const actStockCommon = (token) => async (dispatch) => {
    try {
        /** Dispatch action to set inital state. */
        dispatch({ type: STOCK_COMMON_REQUEST });

        /** Prepare request to external api data provider. */
        const { data } = await axios({
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            method: "GET",
            url: "/api/stock-trade-retrieve",
            params: { section: "common" },
        });

        /** Separate result. */
        let stocks = data.stocks;
        let message = data.message;

        /** Dispatch action to show message in the frontend. */
        dispatch({
            type: MESSAGE_SHOW_SUCCESS,
            payload: message,
        });

        /** Dispatch action to set the result into the store. */
        dispatch({ type: STOCK_COMMON_SUCCESS, payload: stocks });

        /** Save to result to local storage. */
        if (stocks) {
            localStorage.setItem("common", JSON.stringify(stocks));
        }
    } catch (error) {
        /** Dispatch action if error occurred. */
        dispatch({
            type: STOCK_COMMON_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
        /** Dispatch action if error occurred. */
        dispatch({
            type: MESSAGE_SHOW_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const actStockWatchBuild = (token) => async (dispatch) => {
    try {
        /** Dispatch action to set inital state. */
        dispatch({ type: STOCK_WATCH_BUILD_REQUEST });

        /** Prepare request to external api data provider. */
        const { data } = await axios({
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            method: "GET",
            url: "/api/stock-watchlist-retrieve",
            params: { section: "build" },
        });

        /** Separate result. */
        let stocks = data.stocks;
        let message = data.message;

        /** Dispatch action to show message in the frontend. */
        dispatch({
            type: MESSAGE_SHOW_SUCCESS,
            payload: message,
        });

        /** Dispatch action to set the result into the store. */
        dispatch({ type: STOCK_WATCH_BUILD_SUCCESS, payload: stocks });

        /** Save to result to local storage. */
        if (stocks) {
            localStorage.setItem("build", JSON.stringify(stocks));
        }
    } catch (error) {
        /** Dispatch action if error occurred. */
        dispatch({
            type: STOCK_WATCH_BUILD_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
        /** Dispatch action if error occurred. */
        dispatch({
            type: MESSAGE_SHOW_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const actStockWatchStore = (token, input) => async (dispatch) => {
    try {
        /** Dispatch action to set inital state. */
        dispatch({ type: STOCK_WATCH_STORE_REQUEST });

        /** Prepare request to external api data provider. */
        const { data } = await axios({
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            method: "POST",
            url: "/api/stock-watchlist-store",
            params: { section: "store", symbol: input },
        });

        /** Separate result. */
        let message = data.message;

        /** Dispatch action to show message in the frontend. */
        dispatch({
            type: MESSAGE_SHOW_SUCCESS,
            payload: message,
        });

        /** Dispatch action to set the result into the store. */
        dispatch({ type: STOCK_WATCH_STORE_SUCCESS, payload: message });
    } catch (error) {
        /** Dispatch action if error occurred. */
        dispatch({
            type: STOCK_WATCH_STORE_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
        /** Dispatch action if error occurred. */
        dispatch({
            type: MESSAGE_SHOW_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const actStockWatchFetch = (token) => async (dispatch) => {
    try {
        /** Dispatch action to set inital state. */
        dispatch({ type: STOCK_WATCH_FETCH_REQUEST });

        /** Prepare request to external api data provider. */
        const { data } = await axios({
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            method: "GET",
            url: "/api/stock-watchlist-retrieve",
            params: { section: "fetch" },
        });

        /** Separate result. */
        let stocks = data.stocks;
        let message = data.message;

        /** Dispatch action to show message in the frontend. */
        dispatch({
            type: MESSAGE_SHOW_SUCCESS,
            payload: message,
        });

        /** Dispatch action to set the result into the store. */
        dispatch({ type: STOCK_WATCH_FETCH_SUCCESS, payload: stocks });

        /** Save to result to local storage. */
        if (stocks) {
            localStorage.setItem("fetch", JSON.stringify(stocks));
        }
    } catch (error) {
        /** Dispatch action if error occurred. */
        dispatch({
            type: STOCK_WATCH_FETCH_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
        /** Dispatch action if error occurred. */
        dispatch({
            type: MESSAGE_SHOW_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const actStockWatchDestroy = (token, input) => async (dispatch) => {
    try {
        /** Dispatch action to set inital state. */
        dispatch({ type: STOCK_WATCH_DESTROY_REQUEST });

        /** Prepare request to external api data provider. */
        const { data } = await axios({
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            method: "POST",
            url: "/api/stock-watchlist-store",
            params: { section: "destroy", symbol: input },
        });

        /** Separate result. */
        let message = data.message;

        /** Dispatch action to show message in the frontend. */
        dispatch({
            type: MESSAGE_SHOW_SUCCESS,
            payload: message,
        });

        /** Dispatch action to set the result into the store. */
        dispatch({ type: STOCK_WATCH_DESTROY_SUCCESS, payload: message });
    } catch (error) {
        /** Dispatch action if error occurred. */
        dispatch({
            type: STOCK_WATCH_DESTROY_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
        /** Dispatch action if error occurred. */
        dispatch({
            type: MESSAGE_SHOW_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
