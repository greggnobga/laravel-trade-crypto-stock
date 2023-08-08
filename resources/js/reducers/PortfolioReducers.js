import {
  STOCK_PORTFOLIO_FETCH_REQUEST,
  STOCK_PORTFOLIO_FETCH_SUCCESS,
  STOCK_PORTFOLIO_FETCH_FAILURE,
  STOCK_PORTFOLIO_STORE_REQUEST,
  STOCK_PORTFOLIO_STORE_SUCCESS,
  STOCK_PORTFOLIO_STORE_FAILURE,
} from '../constants/PortfolioConstants';

export const portfolioStockFetchReducer = (state = {}, action) => {
  switch (action.type) {
    case STOCK_PORTFOLIO_FETCH_REQUEST:
      return { loading: true };
    case STOCK_PORTFOLIO_FETCH_SUCCESS:
      return { loading: false, portfolio: action.payload };
    case STOCK_PORTFOLIO_FETCH_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const portfolioStockStoreReducer = (state = {}, action) => {
  switch (action.type) {
    case STOCK_PORTFOLIO_STORE_REQUEST:
      return { loading: true };
    case STOCK_PORTFOLIO_STORE_SUCCESS:
      return { loading: false, success: action.payload };
    case STOCK_PORTFOLIO_STORE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
