import { STOCK_EXPLORER_FETCH_REQUEST, STOCK_EXPLORER_FETCH_SUCCESS, STOCK_EXPLORER_FETCH_FAILURE } from '../constants/ExplorerConstants';

export const stockExplorerFetchReducer = (state = {}, action) => {
  switch (action.type) {
    case STOCK_EXPLORER_FETCH_REQUEST:
      return { loading: true };
    case STOCK_EXPLORER_FETCH_SUCCESS:
      return { loading: false, stockexplorer: action.payload };
    case STOCK_EXPLORER_FETCH_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
