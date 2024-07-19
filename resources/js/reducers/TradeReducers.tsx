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

export const stockTradeBluechipReducer = (state = {}, action) => {
  switch (action.type) {
    case STOCK_TRADE_BLUECHIP_REQUEST:
      return { loading: true };
    case STOCK_TRADE_BLUECHIP_SUCCESS:
      return { loading: false, bluechip: action.payload };
    case STOCK_TRADE_BLUECHIP_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stockTradeCommonReducer = (state = {}, action) => {
  switch (action.type) {
    case STOCK_TRADE_COMMON_REQUEST:
      return { loading: true };
    case STOCK_TRADE_COMMON_SUCCESS:
      return { loading: false, common: action.payload };
    case STOCK_TRADE_COMMON_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stockTradeStoreReducer = (state = {}, action) => {
  switch (action.type) {
    case STOCK_TRADE_STORE_REQUEST:
      return { loading: true };
    case STOCK_TRADE_STORE_SUCCESS:
      return { loading: false, success: action.payload };
    case STOCK_TRADE_STORE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
