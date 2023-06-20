/** Vendor. */
import axios from "axios";

/** Constant. */
import {
    STOCK_LIST_REQUEST,
    STOCK_LIST_SUCCESS,
    STOCK_LIST_FAILURE,
} from "../constants/stockConstants";

export const listStocks = () => async (dispatch) => {
    try {
        /** Dispatch action to set inital state. */
        dispatch({ type: STOCK_LIST_REQUEST });
        /** Prepare request to external api data provider. */
        const { data } = await axios({
            url: "https://phisix-api4.appspot.com/stocks.json",
            method: "GET",
        });
        /** Restructure result into desired key value pairs. */
        let stocks = [];
        if (data.hasOwnProperty("stock")) {
            /** Remap keys before saving to state. */
            for (let i = 0; i < data["stock"].length; i++) {
                stocks.push({
                    name: data["stock"][i]["name"],
                    change: data["stock"][i]["percent_change"],
                    price: data["stock"][i]["price"]["amount"],
                    symbol: data["stock"][i]["symbol"],
                    volume: data["stock"][i]["volume"],
                });
            }
        }
        /** Dispatch action to set the result into the store. */
        dispatch({ type: STOCK_LIST_SUCCESS, payload: stocks });
    } catch (error) {
        console.log(error.message);
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
