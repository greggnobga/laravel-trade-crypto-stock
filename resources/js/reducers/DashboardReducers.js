import {
  DASHBOARD_START_REQUEST,
  DASHBOARD_START_SUCCESS,
  DASHBOARD_START_FAILURE,
  DASHBOARD_PRICE_REQUEST,
  DASHBOARD_PRICE_SUCCESS,
  DASHBOARD_PRICE_FAILURE,
  DASHBOARD_REPORT_REQUEST,
  DASHBOARD_REPORT_SUCCESS,
  DASHBOARD_REPORT_FAILURE,
  DASHBOARD_DIVIDEND_REQUEST,
  DASHBOARD_DIVIDEND_SUCCESS,
  DASHBOARD_DIVIDEND_FAILURE,
  DASHBOARD_SECTOR_REQUEST,
  DASHBOARD_SECTOR_SUCCESS,
  DASHBOARD_SECTOR_FAILURE,
  DASHBOARD_LIST_REQUEST,
  DASHBOARD_LIST_SUCCESS,
  DASHBOARD_LIST_FAILURE,
  DASHBOARD_COMPANY_REQUEST,
  DASHBOARD_COMPANY_SUCCESS,
  DASHBOARD_COMPANY_FAILURE,
  DASHBOARD_BLUECHIP_REQUEST,
  DASHBOARD_BLUECHIP_SUCCESS,
  DASHBOARD_BLUECHIP_FAILURE,
  DASHBOARD_BLUECHIP_STORE_REQUEST,
  DASHBOARD_BLUECHIP_STORE_SUCCESS,
  DASHBOARD_BLUECHIP_STORE_FAILURE,
  DASHBOARD_BLUECHIP_DESTROY_REQUEST,
  DASHBOARD_BLUECHIP_DESTROY_SUCCESS,
  DASHBOARD_BLUECHIP_DESTROY_FAILURE,
  DASHBOARD_EDGE_REQUEST,
  DASHBOARD_EDGE_SUCCESS,
  DASHBOARD_EDGE_FAILURE,
  DASHBOARD_EDGE_UPDATE_REQUEST,
  DASHBOARD_EDGE_UPDATE_SUCCESS,
  DASHBOARD_EDGE_UPDATE_FAILURE,
  DASHBOARD_STOCK_GAINER_REQUEST,
  DASHBOARD_STOCK_GAINER_SUCCESS,
  DASHBOARD_STOCK_GAINER_FAILURE,
  DASHBOARD_STOCK_LOSSER_REQUEST,
  DASHBOARD_STOCK_LOSSER_SUCCESS,
  DASHBOARD_STOCK_LOSSER_FAILURE,
} from '../constants/DashboardConstants'

export const dashboardStartReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_START_REQUEST:
      return { loading: true }
    case DASHBOARD_START_SUCCESS:
      return { loading: false, success: action.payload }
    case DASHBOARD_START_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const dashboardPriceReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_PRICE_REQUEST:
      return { loading: true }
    case DASHBOARD_PRICE_SUCCESS:
      return { loading: false, success: action.payload }
    case DASHBOARD_PRICE_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const dashboardReportReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_REPORT_REQUEST:
      return { loading: true }
    case DASHBOARD_REPORT_SUCCESS:
      return { loading: false, success: action.payload }
    case DASHBOARD_REPORT_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const dashboardDividendReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_DIVIDEND_REQUEST:
      return { loading: true }
    case DASHBOARD_DIVIDEND_SUCCESS:
      return { loading: false, success: action.payload }
    case DASHBOARD_DIVIDEND_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const dashboardSectorReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_SECTOR_REQUEST:
      return { loading: true }
    case DASHBOARD_SECTOR_SUCCESS:
      return { loading: false, success: action.payload }
    case DASHBOARD_SECTOR_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const dashboardListReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_LIST_REQUEST:
      return { loading: true }
    case DASHBOARD_LIST_SUCCESS:
      return { loading: false, success: action.payload }
    case DASHBOARD_LIST_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const dashboardCompanyReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_COMPANY_REQUEST:
      return { loading: true }
    case DASHBOARD_COMPANY_SUCCESS:
      return { loading: false, success: action.payload }
    case DASHBOARD_COMPANY_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const dashboardBluechipReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_BLUECHIP_REQUEST:
      return { loading: true }
    case DASHBOARD_BLUECHIP_SUCCESS:
      return { loading: false, bluechip: action.payload }
    case DASHBOARD_BLUECHIP_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const dashboardBluechipStoreReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_BLUECHIP_STORE_REQUEST:
      return { loading: true }
    case DASHBOARD_BLUECHIP_STORE_SUCCESS:
      return { loading: false, success: action.payload }
    case DASHBOARD_BLUECHIP_STORE_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const dashboardBluechipDestroyReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_BLUECHIP_DESTROY_REQUEST:
      return { loading: true }
    case DASHBOARD_BLUECHIP_DESTROY_SUCCESS:
      return { loading: false, success: action.payload }
    case DASHBOARD_BLUECHIP_DESTROY_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const dashboardEdgeReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_EDGE_REQUEST:
      return { loading: true }
    case DASHBOARD_EDGE_SUCCESS:
      return { loading: false, edge: action.payload }
    case DASHBOARD_EDGE_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const dashboardEdgeUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_EDGE_UPDATE_REQUEST:
      return { loading: true }
    case DASHBOARD_EDGE_UPDATE_SUCCESS:
      return { loading: false, success: action.payload }
    case DASHBOARD_EDGE_UPDATE_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const dashboardStockGainerReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_STOCK_GAINER_REQUEST:
      return { loading: true }
    case DASHBOARD_STOCK_GAINER_SUCCESS:
      return { loading: false, stockgainer: action.payload }
    case DASHBOARD_STOCK_GAINER_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const dashboardStockLosserReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_STOCK_LOSSER_REQUEST:
      return { loading: true }
    case DASHBOARD_STOCK_LOSSER_SUCCESS:
      return { loading: false, stocklosser: action.payload }
    case DASHBOARD_STOCK_LOSSER_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
