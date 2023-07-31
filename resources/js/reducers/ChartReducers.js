import {
  CHART_WATCHLIST_REQUEST,
  CHART_WATCHLIST_SUCCESS,
  CHART_WATCHLIST_FAILURE,
  CHART_AVERAGE_REQUEST,
  CHART_AVERAGE_SUCCESS,
  CHART_AVERAGE_FAILURE,
  CHART_FETCH_REQUEST,
  CHART_FETCH_SUCCESS,
  CHART_FETCH_FAILURE,
} from '../constants/ChartConstants';

export const chartWatchlistReducer = (state = {}, action) => {
  switch (action.type) {
    case CHART_WATCHLIST_REQUEST:
      return { loading: true };
    case CHART_WATCHLIST_SUCCESS:
      return { loading: false, watchbuild: action.payload };
    case CHART_WATCHLIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const chartAverageReducer = (state = {}, action) => {
  switch (action.type) {
    case CHART_AVERAGE_REQUEST:
      return { loading: true };
    case CHART_AVERAGE_SUCCESS:
      return { loading: false, success: action.payload };
    case CHART_AVERAGE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const chartFetchReducer = (state = {}, action) => {
  switch (action.type) {
    case CHART_FETCH_REQUEST:
      return { loading: true };
    case CHART_FETCH_SUCCESS:
      return { loading: false, stocks: action.payload };
    case CHART_FETCH_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
