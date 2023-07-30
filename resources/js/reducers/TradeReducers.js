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

export const tradeBluechipReducer = (state = {}, action) => {
  switch (action.type) {
    case TRADE_BLUECHIP_REQUEST:
      return { loading: true }
    case TRADE_BLUECHIP_SUCCESS:
      return { loading: false, bluechip: action.payload }
    case TRADE_BLUECHIP_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const tradeCommonReducer = (state = {}, action) => {
  switch (action.type) {
    case TRADE_COMMON_REQUEST:
      return { loading: true }
    case TRADE_COMMON_SUCCESS:
      return { loading: false, common: action.payload }
    case TRADE_COMMON_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const tradeStoreReducer = (state = {}, action) => {
  switch (action.type) {
    case TRADE_STORE_REQUEST:
      return { loading: true }
    case TRADE_STORE_SUCCESS:
      return { loading: false, success: action.payload }
    case TRADE_STORE_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
