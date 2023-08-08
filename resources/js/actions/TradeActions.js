/** Constant. */
import { MESSAGE_SHOW_SUCCESS, MESSAGE_SHOW_FAILURE } from '../constants/MessageConstants';

import {
  STOCK_TRADE_BLUECHIP_REQUEST,
  STOCK_TRADE_BLUECHIP_SUCCESS,
  STOCK_TRADE_BLUECHIP_FAILURE,
  STOCK_TRADE_COMMON_REQUEST,
  STOCK_TRADE_COMMON_SUCCESS,
  STOCK_TRADE_COMMON_FAILURE,
  STOCK_TRADE_STORE_REQUEST,
  STOCK_TRADE_STORE_SUCCESS,
  STOCK_TRADE_STORE_FAILURE,
} from '../constants/TradeConstants';

export const bluechipStockTrade = (token) => async (dispatch) => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: STOCK_TRADE_BLUECHIP_REQUEST });

    /** Prepare request to external api data provider. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
      url: '/api/stock-trade-retrieve',
      params: { section: 'bluechip' },
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
    dispatch({ type: STOCK_TRADE_BLUECHIP_SUCCESS, payload: stocks });

    /** Save to result to local storage. */
    if (stocks) {
      localStorage.setItem('stockTradeBluechip', JSON.stringify(stocks));
    }
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: STOCK_TRADE_BLUECHIP_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const commonStockTrade = (token) => async (dispatch) => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: STOCK_TRADE_COMMON_REQUEST });

    /** Prepare request to external api data provider. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
      url: '/api/stock-trade-retrieve',
      params: { section: 'common' },
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
    dispatch({ type: STOCK_TRADE_COMMON_SUCCESS, payload: stocks });

    /** Save to result to local storage. */
    if (stocks) {
      localStorage.setItem('stockTradeCommon', JSON.stringify(stocks));
    }
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: STOCK_TRADE_COMMON_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const storeStockTrade = (token, symbol) => async (dispatch) => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: STOCK_TRADE_STORE_REQUEST });

    /** Prepare request to external api data provider. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      url: '/api/stock-watchlist-store',
      params: { section: 'store', symbol: symbol },
    });

    /** Separate result. */
    let message = data.message;

    /** Dispatch action to show message in the frontend. */
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message,
    });

    /** Dispatch action to set the result into the store. */
    dispatch({ type: STOCK_TRADE_STORE_SUCCESS, payload: message });
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: STOCK_TRADE_STORE_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
