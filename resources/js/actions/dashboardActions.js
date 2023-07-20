/** Helper. */
import { mapObject } from "../helpers";

/** Constant. */
import {
    MESSAGE_SHOW_SUCCESS,
    MESSAGE_SHOW_FAILURE,
} from "../constants/messageConstants";

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
    DASHBOARD_BLUE_REQUEST,
    DASHBOARD_BLUE_SUCCESS,
    DASHBOARD_BLUE_FAILURE,
    DASHBOARD_EDGE_REQUEST,
    DASHBOARD_EDGE_SUCCESS,
    DASHBOARD_EDGE_FAILURE,
} from "../constants/dashboardConstants";

export const actDashboardStart = (token) => async (dispatch) => {
    try {
        /** Dispatch action to set inital state. */
        dispatch({ type: DASHBOARD_START_REQUEST });

        /** Prepare request to external api data provider. */
        const { data } = await axios({
            url: "https://phisix-api4.appspot.com/stocks.json",
            method: "GET",
        });

        /** Use remap stocks helper. */
        let result = mapObject(data);

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
        dispatch({ type: DASHBOARD_START_SUCCESS, payload: data.message });
    } catch (error) {
        /** Dispatch action if error occurred. */
        dispatch({
            type: DASHBOARD_START_FAILURE,
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

export const actDashboardPrice = (token) => async (dispatch) => {
    try {
        /** Dispatch action to set inital state. */
        dispatch({ type: DASHBOARD_PRICE_REQUEST });

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
        dispatch({ type: DASHBOARD_PRICE_SUCCESS, payload: data.message });
    } catch (error) {
        /** Dispatch action if error occurred. */
        dispatch({
            type: DASHBOARD_PRICE_FAILURE,
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

export const actDashboardReport = (token) => async (dispatch) => {
    try {
        /** Dispatch action to set inital state. */
        dispatch({ type: DASHBOARD_REPORT_REQUEST });

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
        dispatch({ type: DASHBOARD_REPORT_SUCCESS, payload: data.message });
    } catch (error) {
        /** Dispatch action if error occurred. */
        dispatch({
            type: DASHBOARD_REPORT_FAILURE,
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

export const actDashboardDividend = (token) => async (dispatch) => {
    try {
        /** Dispatch action to set inital state. */
        dispatch({ type: DASHBOARD_DIVIDEND_REQUEST });

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
        dispatch({ type: DASHBOARD_DIVIDEND_SUCCESS, payload: data.message });
    } catch (error) {
        /** Dispatch action if error occurred. */
        dispatch({
            type: DASHBOARD_DIVIDEND_FAILURE,
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

export const actDashboardSector = (token) => async (dispatch) => {
    try {
        /** Dispatch action to set inital state. */
        dispatch({ type: DASHBOARD_SECTOR_REQUEST });

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
        dispatch({ type: DASHBOARD_SECTOR_SUCCESS, payload: data.message });
    } catch (error) {
        /** Dispatch action if error occurred. */
        dispatch({
            type: DASHBOARD_SECTOR_FAILURE,
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

export const actDashboardBlue = (token) => async (dispatch) => {
    try {
        /** Dispatch action to set inital state. */
        dispatch({ type: DASHBOARD_BLUE_REQUEST });

        /** Prepare request to external api data provider. */
        const { data } = await axios({
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            method: "GET",
            url: "/api/dashboard",
            params: { section: "bluechip", statement: "select" },
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
        dispatch({ type: DASHBOARD_BLUE_SUCCESS, payload: stocks });

        /** Save to result to local storage. */
        if (stocks) {
            localStorage.setItem("bluedash", JSON.stringify(stocks));
        }
    } catch (error) {
        /** Dispatch action if error occurred. */
        dispatch({
            type: DASHBOARD_BLUE_FAILURE,
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

export const actDashboardEdge = (token) => async (dispatch) => {
    try {
        /** Dispatch action to set inital state. */
        dispatch({ type: DASHBOARD_EDGE_REQUEST });

        /** Prepare request to external api data provider. */
        const { data } = await axios({
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            method: "GET",
            url: "/api/dashboard",
            params: { section: "edge", statement: "select" },
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
        dispatch({ type: DASHBOARD_EDGE_SUCCESS, payload: stocks });

        /** Save to result to local storage. */
        if (stocks) {
            localStorage.setItem("edge", JSON.stringify(stocks));
        }
    } catch (error) {
        /** Dispatch action if error occurred. */
        dispatch({
            type: DASHBOARD_EDGE_FAILURE,
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
