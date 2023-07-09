/** Vendor. */
import axios from "axios";

/** Helper. */
import { remapStocks } from "../helpers";

/** Constant. */
import { MESSAGE_SHOW_SUCCESS } from "../constants/messageConstants";

import {
    STOCK_LIST_REQUEST,
    STOCK_LIST_SUCCESS,
    STOCK_LIST_FAILURE,
} from "../constants/stockConstants";

export const stockList = (token) => async (dispatch) => {
    try {
        /** Dispatch action to set inital state. */
        dispatch({ type: STOCK_LIST_REQUEST });
        /** Prepare request to external api data provider. */
        const { data } = await axios({
            url: "https://phisix-api4.appspot.com/stocks.json",
            method: "GET",
        });
        /** Use remap stocks helper. */
        let result = remapStocks(data);

        /** Dispatch action to set the result into the store. */
        dispatch({ type: STOCK_LIST_SUCCESS, payload: result });

        const postStock = async (item) => {
            /** Send request. */
            const { data } = await axios({
                headers: {
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
            /** Dispatch action to set the result into the store. */
            dispatch({
                type: MESSAGE_SHOW_SUCCESS,
                payload: data.message,
            });
        };
        /** Save stocks to database. */
        result.map((item, index) => {
            /** Get last index. */
            let end = result.length - 1;
            /** Call delay item function. */
            setTimeout(async function () {
                console.log(token);
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

                    /** Dispatch action to set the result into the store. */
                    dispatch({
                        type: MESSAGE_SHOW_SUCCESS,
                        payload: data.message,
                    });

                    console.log(data);
                }
                /** Set start button state to false. */
                if (index === end) {
                    console.log("Finished.");
                }
            }, 3000 * index);
        });
    } catch (error) {
        /** Dispatch action if error occurred. */
        dispatch({
            type: STOCK_LIST_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
