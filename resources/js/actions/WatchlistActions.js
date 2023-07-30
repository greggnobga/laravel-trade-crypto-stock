/** Vendor. */
import axios from 'axios'

/** Constant. */
import { MESSAGE_SHOW_SUCCESS, MESSAGE_SHOW_FAILURE } from '../constants/MessageConstants'

import {
  WATCHLIST_BUILD_REQUEST,
  WATCHLIST_BUILD_SUCCESS,
  WATCHLIST_BUILD_FAILURE,
  WATCHLIST_STORE_REQUEST,
  WATCHLIST_STORE_SUCCESS,
  WATCHLIST_STORE_FAILURE,
  WATCHLIST_FETCH_REQUEST,
  WATCHLIST_FETCH_SUCCESS,
  WATCHLIST_FETCH_FAILURE,
  WATCHLIST_DESTROY_REQUEST,
  WATCHLIST_DESTROY_SUCCESS,
  WATCHLIST_DESTROY_FAILURE,
} from '../constants/WatchlistConstants'

export const buildWatchlist = (token) => async (dispatch) => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: WATCHLIST_BUILD_REQUEST })

    /** Prepare request to external api data provider. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
      url: '/api/stock-watchlist-retrieve',
      params: { section: 'build' },
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
    dispatch({ type: WATCHLIST_BUILD_SUCCESS, payload: stocks })

    /** Save to result to local storage. */
    if (stocks) {
      localStorage.setItem('watchlistBuild', JSON.stringify(stocks))
    }
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: WATCHLIST_BUILD_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const storeWatchlist = (token, input) => async (dispatch) => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: WATCHLIST_STORE_REQUEST })

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
    dispatch({ type: WATCHLIST_STORE_SUCCESS, payload: message })
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: WATCHLIST_STORE_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const fetchWatchlist = (token) => async (dispatch) => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: WATCHLIST_FETCH_REQUEST })

    /** Prepare request to external api data provider. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
      url: '/api/stock-watchlist-retrieve',
      params: { section: 'fetch' },
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
    dispatch({ type: WATCHLIST_FETCH_SUCCESS, payload: stocks })

    /** Save to result to local storage. */
    if (stocks) {
      localStorage.setItem('watchlistFetch', JSON.stringify(stocks))
    }
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: WATCHLIST_FETCH_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const destroyWatchlist = (token, input) => async (dispatch) => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: WATCHLIST_DESTROY_REQUEST })

    /** Prepare request to external api data provider. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      url: '/api/stock-watchlist-store',
      params: { section: 'destroy', symbol: input },
    })

    /** Separate result. */
    let message = data.message

    /** Dispatch action to show message in the frontend. */
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message,
    })

    /** Dispatch action to set the result into the store. */
    dispatch({ type: WATCHLIST_DESTROY_SUCCESS, payload: message })
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: WATCHLIST_DESTROY_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
