/** Constant. */
import { MESSAGE_SHOW_SUCCESS, MESSAGE_SHOW_FAILURE } from '../constants/MessageConstants';
import {
    STOCK_EXPLORER_FETCH_REQUEST,
    STOCK_EXPLORER_FETCH_SUCCESS,
    STOCK_EXPLORER_FETCH_FAILURE,
} from '../constants/ExplorerConstants';

/** Interface. */
import { Action } from '../types/Interfaces';

export const fetchStockExplorer = () => async (dispatch: ({ type, payload }: Action) => void) => {
    try {
        /** Dispatch action to set inital state. */
        dispatch({ type: STOCK_EXPLORER_FETCH_REQUEST });

        /** Prepare request to external api data provider. */
        const { data } = await axios({
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
            url: '/api/stock-explorer-retrieve',
            params: { section: 'fetch', statement: 'select' },
        });

        /** Separate result. */
        let stocks = { fundamental: data.fundamental, technical: data.technical };
        let message = data.message;

        /** Dispatch action to show message in the frontend. */
        dispatch({
            type: MESSAGE_SHOW_SUCCESS,
            payload: message,
        });

        /** Dispatch action to set the result into the store. */
        dispatch({ type: STOCK_EXPLORER_FETCH_SUCCESS, payload: stocks });

        /** Save to result to local storage. */
        if (stocks) {
            localStorage.setItem('stockExplorerFetch', JSON.stringify(stocks));
        }
    } catch (error) {
        /** Dispatch action if error occurred. */
        dispatch({
            type: STOCK_EXPLORER_FETCH_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
        /** Dispatch action if error occurred. */
        dispatch({
            type: MESSAGE_SHOW_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
