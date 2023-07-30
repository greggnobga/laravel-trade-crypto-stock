/** Constant. */
import { MESSAGE_SHOW_SUCCESS, MESSAGE_SHOW_FAILURE } from '../constants/MessageConstants'

import { CHART_WATCHLIST_REQUEST, CHART_WATCHLIST_SUCCESS, CHART_WATCHLIST_FAILURE } from '../constants/ChartConstants'

export const watchlistChart = (token) => async (dispatch) => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: CHART_WATCHLIST_REQUEST })

    /** Prepare request to external api data provider. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
      url: '/api/stock-chart-retrieve',
      params: { section: 'build', table: 'watchlist', statement: 'select' },
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
    dispatch({ type: CHART_WATCHLIST_SUCCESS, payload: stocks })

    /** Save to result to local storage. */
    if (stocks) {
      localStorage.setItem('chartWatchlist', JSON.stringify(stocks))
    }
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: CHART_WATCHLIST_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
