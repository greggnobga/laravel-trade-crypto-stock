/** Vendor. */
import axios from "axios";

/** Helper. */
import { remapStocks } from "../helpers";

/** Constant. */
import {
    MESSAGE_SHOW_SUCCESS,
    MESSAGE_SHOW_FAILURE,
} from "../constants/messageConstants";

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
    STOCK_BLUE_REQUEST,
    STOCK_BLUE_SUCCESS,
    STOCK_BLUE_FAILURE,
    STOCK_COMMON_REQUEST,
    STOCK_COMMON_SUCCESS,
    STOCK_COMMON_FAILURE,
} from "../constants/stockConstants";

export const stockStart = (token) => async (dispatch) => {
    try {
        /** Dispatch action to set inital state. */
        dispatch({ type: STOCK_START_REQUEST });
        /** Prepare request to external api data provider. */
        const { data } = await axios({
            url: "https://phisix-api4.appspot.com/stocks.json",
            method: "GET",
        });
        /** Use remap stocks helper. */
        let result = remapStocks(data);

        /** Save stocks to database. */
        result.map((item, index) => {
            /** Get last index. */
            let end = result.length - 1;
            /** Call delay item function. */
            setTimeout(async function () {
                /** Check if data is not empty. */
                if (item) {
                    /** Send request. */
                    const { data } = await axios({
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        method: "POST",
                        url: "/api/stock-trade-store",
                        params: {
                            input: item,
                            table: "trade",
                            statement: "store",
                        },
                    });

                    /** Dispatch action to show message in the frontend. */
                    dispatch({
                        type: MESSAGE_SHOW_SUCCESS,
                        payload: data.message,
                    });
                }
                /** Talk to the console about that task progress. */
                if (index === end) {
                    console.log("Process Completed.");
                }
            }, 3000 * index);
        });

        /** Dispatch action to set the result into the store. */
        dispatch({ type: STOCK_START_SUCCESS, payload: data.message });
    } catch (error) {
        /** Dispatch action if error occurred. */
        dispatch({
            type: STOCK_START_FAILURE,
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

export const stockPrice = (token) => async (dispatch) => {
    try {
        /** Dispatch action to set inital state. */
        dispatch({ type: STOCK_PRICE_REQUEST });
        /** Prepare request to external api data provider. */
        const { data } = await axios({
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            method: "GET",
            url: "/stock-reports-retrieve",
            params: { section: "stocks" },
        });

        /** Separate result. */
        let stocks = data.stocks;
        let message = data.message;

        /** Dispatch action to show message in the frontend. */
        dispatch({
            type: MESSAGE_SHOW_SUCCESS,
            payload: message,
        });

        /** Save stocks to database. */
        stocks.map((item, index) => {
            /** Get last index. */
            let end = stocks.length - 1;
            /** Call delay item function. */
            setTimeout(async function () {
                /** Check if data is not empty. */
                if (item) {
                    /** Send request. */
                    const { data } = await axios({
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        method: "POST",
                        url: "/stock-reports-store",
                        params: {
                            input: item,
                            section: "prices",
                        },
                    });

                    /** Dispatch action to show message in the frontend. */
                    dispatch({
                        type: MESSAGE_SHOW_SUCCESS,
                        payload: data.message,
                    });
                }
                /** Talk to the console about that task progress. */
                if (index === end) {
                    console.log("Process Completed.");
                }
            }, 3000 * index);
        });

        /** Dispatch action to set the result into the store. */
        dispatch({ type: STOCK_PRICE_SUCCESS, payload: data.message });
    } catch (error) {
        /** Dispatch action if error occurred. */
        dispatch({
            type: STOCK_PRICE_FAILURE,
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

export const stockReport = (token) => async (dispatch) => {
    try {
        /** Dispatch action to set inital state. */
        dispatch({ type: STOCK_REPORT_REQUEST });
        /** Prepare request to external api data provider. */
        const { data } = await axios({
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            method: "GET",
            url: "/stock-reports-retrieve",
            params: { section: "stocks" },
        });

        /** Separate result. */
        let stocks = data.stocks;
        let message = data.message;

        /** Dispatch action to show message in the frontend. */
        dispatch({
            type: MESSAGE_SHOW_SUCCESS,
            payload: message,
        });

        /** Save stocks to database. */
        stocks.map((item, index) => {
            /** Get last index. */
            let end = stocks.length - 1;
            /** Call delay item function. */
            setTimeout(async function () {
                /** Check if data is not empty. */
                if (item) {
                    /** Send request. */
                    const { data } = await axios({
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        method: "POST",
                        url: "/stock-reports-store",
                        params: {
                            input: item,
                            section: "reports",
                        },
                    });

                    /** Dispatch action to show message in the frontend. */
                    dispatch({
                        type: MESSAGE_SHOW_SUCCESS,
                        payload: data.message,
                    });
                }
                /** Talk to the console about that task progress. */
                if (index === end) {
                    console.log("Process Completed.");
                }
            }, 3000 * index);
        });

        /** Dispatch action to set the result into the store. */
        dispatch({ type: STOCK_REPORT_SUCCESS, payload: data.message });
    } catch (error) {
        /** Dispatch action if error occurred. */
        dispatch({
            type: STOCK_REPORT_FAILURE,
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

export const stockDividend = (token) => async (dispatch) => {
    try {
        /** Dispatch action to set inital state. */
        dispatch({ type: STOCK_DIVIDEND_REQUEST });
        /** Prepare request to external api data provider. */
        const { data } = await axios({
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            method: "GET",
            url: "/stock-reports-retrieve",
            params: { section: "stocks" },
        });

        /** Separate result. */
        let stocks = data.stocks;
        let message = data.message;

        /** Dispatch action to show message in the frontend. */
        dispatch({
            type: MESSAGE_SHOW_SUCCESS,
            payload: message,
        });

        /** Save stocks to database. */
        stocks.map((item, index) => {
            /** Get last index. */
            let end = stocks.length - 1;
            /** Call delay item function. */
            setTimeout(async function () {
                /** Check if data is not empty. */
                if (item) {
                    /** Send request. */
                    const { data } = await axios({
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        method: "POST",
                        url: "/stock-reports-store",
                        params: {
                            input: item,
                            section: "dividends",
                        },
                    });

                    /** Dispatch action to show message in the frontend. */
                    dispatch({
                        type: MESSAGE_SHOW_SUCCESS,
                        payload: data.message,
                    });
                }
                /** Talk to the console about that task progress. */
                if (index === end) {
                    console.log("Process Completed.");
                }
            }, 3000 * index);
        });

        /** Dispatch action to set the result into the store. */
        dispatch({ type: STOCK_DIVIDEND_SUCCESS, payload: data.message });
    } catch (error) {
        /** Dispatch action if error occurred. */
        dispatch({
            type: STOCK_DIVIDEND_FAILURE,
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

export const stockSector = (token) => async (dispatch) => {
    try {
        /** Dispatch action to set inital state. */
        dispatch({ type: STOCK_SECTOR_REQUEST });
        /** Prepare request to external api data provider. */
        const { data } = await axios({
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            method: "GET",
            url: "/stock-reports-retrieve",
            params: { section: "stocks" },
        });

        /** Separate result. */
        let stocks = data.stocks;
        let message = data.message;

        /** Dispatch action to show message in the frontend. */
        dispatch({
            type: MESSAGE_SHOW_SUCCESS,
            payload: message,
        });

        /** Save stocks to database. */
        stocks.map((item, index) => {
            /** Get last index. */
            let end = stocks.length - 1;
            /** Call delay item function. */
            setTimeout(async function () {
                /** Check if data is not empty. */
                if (item) {
                    /** Send request. */
                    const { data } = await axios({
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        method: "POST",
                        url: "/stock-reports-store",
                        params: {
                            input: item,
                            section: "sectors",
                        },
                    });

                    /** Dispatch action to show message in the frontend. */
                    dispatch({
                        type: MESSAGE_SHOW_SUCCESS,
                        payload: data.message,
                    });
                }
                /** Talk to the console about that task progress. */
                if (index === end) {
                    console.log("Process Completed.");
                }
            }, 3000 * index);
        });

        /** Dispatch action to set the result into the store. */
        dispatch({ type: STOCK_SECTOR_SUCCESS, payload: data.message });
    } catch (error) {
        /** Dispatch action if error occurred. */
        dispatch({
            type: STOCK_SECTOR_FAILURE,
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

export const stockBlueChip = (token) => async (dispatch) => {
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
        localStorage.setItem("bluechip", JSON.stringify(stocks));
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

export const stockCommonChip = (token) => async (dispatch) => {
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
        localStorage.setItem("common", JSON.stringify(stocks));
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
