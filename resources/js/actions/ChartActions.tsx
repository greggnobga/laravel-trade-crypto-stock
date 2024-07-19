/** Constant. */
import { MESSAGE_SHOW_SUCCESS, MESSAGE_SHOW_FAILURE } from '../constants/MessageConstants';
import {
    CHART_AVERAGE_REQUEST,
    CHART_AVERAGE_SUCCESS,
    CHART_AVERAGE_FAILURE,
    CHART_FETCH_REQUEST,
    CHART_FETCH_SUCCESS,
    CHART_FETCH_FAILURE,
} from '../constants/ChartConstants';

/** Interface. */
import { Action } from '$lib/types/Interfaces';
import { isAxiosError } from '$lib/types/Guard';

export const averageChart = (token: string) => async (dispatch: ({ type, payload }: Action) => void) => {
    try {
        /** Dispatch action to set inital state. */
        dispatch({ type: CHART_AVERAGE_REQUEST });

        /** Prepare request to external api data provider. */
        const { data } = await axios({
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            method: 'GET',
            url: '/api/stock-chart-retrieve',
            params: { section: 'build', statement: 'select' },
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
        stocks.map((item: { symbol: string; edge: number; security: number; section: string }, index: number) => {
            /** Get last index. */
            let end = stocks.length - 1;
            /** Call delay item function. */
            setTimeout(async function () {
                /** Check if data is not empty. */
                if (item) {
                    /** Send request. */
                    const { data } = await axios({
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        method: 'POST',
                        url: '/stock-reports-store',
                        params: {
                            symbol: item.symbol,
                            edge: item.edge,
                            security: item.security,
                            section: 'average',
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
                    /** Console log. */
                    console.log('Process Completed.');
                }
            }, 10000 * index);
        });

        /** Dispatch action to set the result into the store. */
        dispatch({ type: CHART_AVERAGE_SUCCESS, payload: data.message });
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            /** Dispatch action if error occurred. */
            dispatch({
                type: MESSAGE_SHOW_FAILURE,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        } else if (error instanceof Error) {
            /** Dispatch action if error occurred. */
            dispatch({
                type: MESSAGE_SHOW_FAILURE,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        } else {
            console.error('Unexpected error:', error);
        }
    }
};

export const fetchChart = (token: string) => async (dispatch: ({ type, payload }: Action) => void) => {
    try {
        /** Dispatch action to set inital state. */
        dispatch({ type: CHART_FETCH_REQUEST });

        /** Prepare request to external api data provider. */
        const { data } = await axios({
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            method: 'GET',
            url: '/api/stock-chart-retrieve',
            params: { section: 'fetch', statement: 'select' },
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
        dispatch({ type: CHART_FETCH_SUCCESS, payload: stocks });

        /** Save to result to local storage. */
        if (stocks) {
            localStorage.setItem('chartFetch', JSON.stringify(stocks));
        }
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            /** Dispatch action if error occurred. */
            dispatch({
                type: MESSAGE_SHOW_FAILURE,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        } else if (error instanceof Error) {
            /** Dispatch action if error occurred. */
            dispatch({
                type: MESSAGE_SHOW_FAILURE,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        } else {
            console.error('Unexpected error:', error);
        }
    }
};
