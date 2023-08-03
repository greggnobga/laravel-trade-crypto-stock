/** Vendor. */
import axios from 'axios';

/** Helper. */
import { removeIndex } from '../components/Helper';

/** Constant. */
import { MESSAGE_SHOW_SUCCESS, MESSAGE_SHOW_FAILURE } from '../constants/MessageConstants';

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_LOGOUT,
  USER_LOGIN_CLEAR,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_VERIFY_REQUEST,
  USER_VERIFY_SUCCESS,
  USER_VERIFY_FAILURE,
  USER_FORGOT_REQUEST,
  USER_FORGOT_SUCCESS,
  USER_FORGOT_FAILURE,
  USER_RESET_REQUEST,
  USER_RESET_SUCCESS,
  USER_RESET_FAILURE,
  USER_TOKEN_REQUEST,
  USER_TOKEN_SUCCESS,
  USER_TOKEN_CLEAR,
  USER_TOKEN_FAILURE,
} from '../constants/UserConstants';

export const resendEmail = token => async dispatch => {
  try {
    /** Request data from backend. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      url: '/api/resend',
      params: { token },
    });

    /** Dispatch action to set inital state. */
    dispatch({ type: MESSAGE_SHOW_SUCCESS, payload: data.message });
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const resetPassword = (token, email, password) => async dispatch => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: USER_RESET_REQUEST });

    /** Request data from backend. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      url: '/api/reset',
      params: { token, email, password },
    });

    /** Helper remove index. */
    const result = removeIndex(data, ['message']);

    /** Dispatch action to set the result into the store. */
    dispatch({ type: USER_LOGIN_SUCCESS, payload: result });
    dispatch({ type: MESSAGE_SHOW_SUCCESS, payload: data.message });

    /** Save to result to local storage. */
    if (result) {
      localStorage.setItem('account', JSON.stringify(result));
    }
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: USER_RESET_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const forgotPassword = email => async dispatch => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: USER_FORGOT_REQUEST });

    /** Request data from backend. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      url: '/api/reset',
      params: { email },
    });

    /** Dispatch action to set the result into the store. */
    dispatch({ type: USER_FORGOT_SUCCESS, payload: data });
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: USER_FORGOT_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const verifyEmail = token => async dispatch => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: USER_VERIFY_REQUEST });

    /** Request data from backend. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      url: '/api/verify',
      params: { token },
    });

    /** Dispatch action to set the result into the store. */
    dispatch({ type: USER_VERIFY_SUCCESS, payload: data.message });
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: USER_VERIFY_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const registerUser = (username, firstname, lastname, email, password) => async dispatch => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: USER_REGISTER_REQUEST });

    /** Request data from backend. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      url: '/api/register',
      params: { username, firstname, lastname, email, password },
    });

    /** Helper remove index. */
    const result = removeIndex(data, ['message']);

    /** Dispatch action to set the result into the store. */
    dispatch({ type: USER_LOGIN_SUCCESS, payload: result });
    dispatch({ type: MESSAGE_SHOW_SUCCESS, payload: data.message });

    /** Save to result to local storage. */
    if (result) {
      localStorage.setItem('account', JSON.stringify(result));
    }
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const loginUser = (email, password) => async dispatch => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: USER_LOGIN_REQUEST });

    /** Request data from backend. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      url: '/api/login',
      params: { email, password },
    });

    /** Helper remove index. */
    const result = removeIndex(data, ['message']);

    /** Dispatch action to set the result into the store. */
    dispatch({ type: USER_LOGIN_SUCCESS, payload: result });
    dispatch({ type: MESSAGE_SHOW_SUCCESS, payload: data.message });

    /** Save to result to local storage. */
    if (result) {
      localStorage.setItem('account', JSON.stringify(result));
    }
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const logoutUser = token => async dispatch => {
  try {
    /** Request data from backend. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      url: '/api/logout',
      params: { token },
    });

    /** Dispatch action to set inital state. */
    dispatch({ type: USER_LOGIN_LOGOUT, payload: data });
    dispatch({ type: MESSAGE_SHOW_SUCCESS, payload: data.message });

    /** Dispatch token request to set valid into false. */
    dispatch({ type: USER_TOKEN_CLEAR });

    /** Remove data from local storage. */
    if (data) {
      localStorage.removeItem('account');
      localStorage.removeItem('token');
      localStorage.removeItem('dashboardBluechip');
      localStorage.removeItem('dashboardEdge');
      localStorage.removeItem('dashboardStockGainer');
      localStorage.removeItem('dashboardStockLosser');
      localStorage.removeItem('watchlistBuild');
      localStorage.removeItem('watchlistFetch');
      localStorage.removeItem('tradeBluechip');
      localStorage.removeItem('tradeCommon');
      localStorage.removeItem('chartWatchlist');
      localStorage.removeItem('chartFetch');
    }
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const tokenUser = token => async dispatch => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: USER_TOKEN_REQUEST });

    /** Request data from backend. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
      url: '/api/dashboard',
      params: { section: 'sentinel' },
    });

    /** Dispatch action to set the result into the store. */
    dispatch({ type: USER_TOKEN_SUCCESS, payload: data.valid });

    /** Save to result to local storage. */
    if (data) {
      localStorage.setItem('token', JSON.stringify(data));
    }
  } catch (error) {
    /** Dispatch action to set inital state. */
    dispatch({ type: USER_LOGIN_CLEAR });

    /** Remove data from local storage. */
    localStorage.removeItem('account');
    localStorage.removeItem('token');
    localStorage.removeItem('dashboardBluechip');
    localStorage.removeItem('dashboardEdge');
    localStorage.removeItem('dashboardStockGainer');
    localStorage.removeItem('dashboardStockLosser');
    localStorage.removeItem('watchlistBuild');
    localStorage.removeItem('watchlistFetch');
    localStorage.removeItem('tradeBluechip');
    localStorage.removeItem('tradeCommon');
    localStorage.removeItem('chartWatchlist');
    localStorage.removeItem('chartFetch');

    /** Dispatch action if error occurred. */
    dispatch({
      type: USER_TOKEN_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
