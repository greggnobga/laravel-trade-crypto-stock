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

export const watchlistBuildReducer = (state = {}, action) => {
  switch (action.type) {
    case WATCHLIST_BUILD_REQUEST:
      return { loading: true }
    case WATCHLIST_BUILD_SUCCESS:
      return { loading: false, watchbuild: action.payload }
    case WATCHLIST_BUILD_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const watchlistStoreReducer = (state = {}, action) => {
  switch (action.type) {
    case WATCHLIST_STORE_REQUEST:
      return { loading: true }
    case WATCHLIST_STORE_SUCCESS:
      return { loading: false, success: action.payload }
    case WATCHLIST_STORE_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const watchlistFetchReducer = (state = {}, action) => {
  switch (action.type) {
    case WATCHLIST_FETCH_REQUEST:
      return { loading: true }
    case WATCHLIST_FETCH_SUCCESS:
      return { loading: false, watchlist: action.payload }
    case WATCHLIST_FETCH_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const watchlistDestroyReducer = (state = {}, action) => {
  switch (action.type) {
    case WATCHLIST_FETCH_REQUEST:
      return { loading: true }
    case WATCHLIST_FETCH_SUCCESS:
      return { loading: false, success: action.payload }
    case WATCHLIST_FETCH_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
