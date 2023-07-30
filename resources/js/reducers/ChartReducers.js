import { CHART_WATCHLIST_REQUEST, CHART_WATCHLIST_SUCCESS, CHART_WATCHLIST_FAILURE } from '../constants/ChartConstants'

export const chartWatchlistReducer = (state = {}, action) => {
  switch (action.type) {
    case CHART_WATCHLIST_REQUEST:
      return { loading: true }
    case CHART_WATCHLIST_SUCCESS:
      return { loading: false, watchbuild: action.payload }
    case CHART_WATCHLIST_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
