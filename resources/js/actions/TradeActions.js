/** Vendor. */
import axios from 'axios'

/** Constant. */
import { MESSAGE_SHOW_SUCCESS, MESSAGE_SHOW_FAILURE } from '../constants/MessageConstants'

import {
  TRADE_BLUECHIP_REQUEST,
  TRADE_BLUECHIP_SUCCESS,
  TRADE_BLUECHIP_FAILURE,
  TRADE_COMMON_REQUEST,
  TRADE_COMMON_SUCCESS,
  TRADE_COMMON_FAILURE,
  TRADE_STORE_REQUEST,
  TRADE_STORE_SUCCESS,
  TRADE_STORE_FAILURE,
} from '../constants/TradeConstants'

export const bluechipTrade = (token) => async (dispatch) => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: TRADE_BLUECHIP_REQUEST })

    /** Prepare request to external api data provider. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
      url: '/api/stock-trade-retrieve',
      params: { section: 'bluechip' },
    })

    /** Separate result. */
    let stocks = data.stocks
    let message = data.message

    /** Dispatch action to show message in the frontend. */
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message,
    })

    /** Dispatch action to set the result into the store. */
    dispatch({ type: TRADE_BLUECHIP_SUCCESS, payload: stocks })

    /** Save to result to local storage. */
    if (stocks) {
      localStorage.setItem('tradeBluechip', JSON.stringify(stocks))
    }
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: TRADE_BLUECHIP_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const commonTrade = (token) => async (dispatch) => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: TRADE_COMMON_REQUEST })

    /** Prepare request to external api data provider. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
      url: '/api/stock-trade-retrieve',
      params: { section: 'common' },
    })

    /** Separate result. */
    let stocks = data.stocks
    let message = data.message

    /** Dispatch action to show message in the frontend. */
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message,
    })

    /** Dispatch action to set the result into the store. */
    dispatch({ type: TRADE_COMMON_SUCCESS, payload: stocks })

    /** Save to result to local storage. */
    if (stocks) {
      localStorage.setItem('tradeCommon', JSON.stringify(stocks))
    }
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: TRADE_COMMON_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const storeTrade = (token, input) => async (dispatch) => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: TRADE_STORE_REQUEST })

    /** Prepare request to external api data provider. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      url: '/api/stock-watchlist-store',
      params: { section: 'store', symbol: input },
    })

    /** Separate result. */
    let message = data.message

    /** Dispatch action to show message in the frontend. */
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message,
    })

    /** Dispatch action to set the result into the store. */
    dispatch({ type: TRADE_STORE_SUCCESS, payload: message })
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: TRADE_STORE_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
