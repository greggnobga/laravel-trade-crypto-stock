/** Constant. */
import { MESSAGE_SHOW_SUCCESS, MESSAGE_SHOW_FAILURE } from '../constants/MessageConstants';

import {
    STOCK_PORTFOLIO_FETCH_REQUEST,
    STOCK_PORTFOLIO_FETCH_SUCCESS,
    STOCK_PORTFOLIO_FETCH_FAILURE,
    STOCK_PORTFOLIO_STORE_REQUEST,
    STOCK_PORTFOLIO_STORE_SUCCESS,
    STOCK_PORTFOLIO_STORE_FAILURE,
    STOCK_PORTFOLIO_UPDATE_REQUEST,
    STOCK_PORTFOLIO_UPDATE_SUCCESS,
    STOCK_PORTFOLIO_UPDATE_FAILURE,
    STOCK_PORTFOLIO_DESTROY_REQUEST,
    STOCK_PORTFOLIO_DESTROY_SUCCESS,
    STOCK_PORTFOLIO_DESTROY_FAILURE,
} from '../constants/PortfolioConstants';

/** Interface. */
import { Action } from '../types/Interfaces';

export const fetchStockPortfolio = (token: string) => async (dispatch: ({ type, payload }: Action) => void) => {
    try {
        /** Dispatch action to set inital state. */
        dispatch({ type: STOCK_PORTFOLIO_FETCH_REQUEST });

        /** Prepare request to external api data provider. */
        const { data } = await axios({
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            method: 'GET',
            url: '/api/stock-portfolio-retrieve',
            params: { section: 'fetch' },
        });

        /** Separate result. */
        let stocks = { order: data.order, hold: data.hold, chart: data.chart };
        let message = data.message;

        /** Dispatch action to show message in the frontend. */
        dispatch({
            type: MESSAGE_SHOW_SUCCESS,
            payload: message,
        });

        /** Dispatch action to set the result into the store. */
        dispatch({ type: STOCK_PORTFOLIO_FETCH_SUCCESS, payload: stocks });

        /** Save to result to local storage. */
        if (stocks) {
            localStorage.setItem('stockPortfolioFetch', JSON.stringify(stocks));
        }
    } catch (error) {
        /** Dispatch action if error occurred. */
        dispatch({
            type: STOCK_PORTFOLIO_FETCH_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
        /** Dispatch action if error occurred. */
        dispatch({
            type: MESSAGE_SHOW_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const storeStockPortfolio =
    (token: string, order: string, symbol: string, share: number, capital: number, fee: number) =>
    async (dispatch: ({ type, payload }: Action) => void) => {
        try {
            /** Dispatch action to set inital state. */
            dispatch({ type: STOCK_PORTFOLIO_STORE_REQUEST });

            /** Prepare request to external api data provider. */
            const { data } = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'POST',
                url: '/api/stock-portfolio-store',
                params: { section: 'store', order, symbol, share, capital, fee },
            });

            /** Separate result. */
            let message = data.message;

            /** Dispatch action to show message in the frontend. */
            dispatch({
                type: MESSAGE_SHOW_SUCCESS,
                payload: message,
            });

            /** Dispatch action to set the result into the store. */
            dispatch({ type: STOCK_PORTFOLIO_STORE_SUCCESS, payload: message });
        } catch (error) {
            /** Dispatch action if error occurred. */
            dispatch({
                type: STOCK_PORTFOLIO_STORE_FAILURE,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            /** Dispatch action if error occurred. */
            dispatch({
                type: MESSAGE_SHOW_FAILURE,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    };

export const updateStockPortfolio =
    (token: string, order: string, symbol: string, share: string, capital: number, fee: number) =>
    async (dispatch: ({ type, payload }: Action) => void) => {
        try {
            /** Dispatch action to set inital state. */
            dispatch({ type: STOCK_PORTFOLIO_UPDATE_REQUEST });

            /** Prepare request to external api data provider. */
            const { data } = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'POST',
                url: '/api/stock-portfolio-store',
                params: { section: 'update', order, symbol, share, capital, fee },
            });

            /** Separate result. */
            let message = data.message;

            /** Dispatch action to show message in the frontend. */
            dispatch({
                type: MESSAGE_SHOW_SUCCESS,
                payload: message,
            });

            /** Dispatch action to set the result into the store. */
            dispatch({ type: STOCK_PORTFOLIO_UPDATE_SUCCESS, payload: message });
        } catch (error) {
            /** Dispatch action if error occurred. */
            dispatch({
                type: STOCK_PORTFOLIO_UPDATE_FAILURE,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            /** Dispatch action if error occurred. */
            dispatch({
                type: MESSAGE_SHOW_FAILURE,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    };

export const destroyStockPortfolio = (token, symbol) => async (dispatch: ({ type, payload }: Action) => void) => {
    try {
        /** Dispatch action to set inital state. */
        dispatch({ type: STOCK_PORTFOLIO_DESTROY_REQUEST });

        /** Prepare request to external api data provider. */
        const { data } = await axios({
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            method: 'POST',
            url: '/api/stock-portfolio-store',
            params: { section: 'destroy', symbol },
        });

        /** Separate result. */
        let message = data.message;

        /** Dispatch action to show message in the frontend. */
        dispatch({
            type: MESSAGE_SHOW_SUCCESS,
            payload: message,
        });

        /** Dispatch action to set the result into the store. */
        dispatch({ type: STOCK_PORTFOLIO_DESTROY_SUCCESS, payload: message });
    } catch (error) {
        /** Dispatch action if error occurred. */
        dispatch({
            type: STOCK_PORTFOLIO_DESTROY_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
        /** Dispatch action if error occurred. */
        dispatch({
            type: MESSAGE_SHOW_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
