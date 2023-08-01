/** Helper. */
import { mapObject } from '../components/Helper';

/** Constant. */
import { MESSAGE_SHOW_SUCCESS, MESSAGE_SHOW_FAILURE } from '../constants/MessageConstants';

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
} from '../constants/DashboardConstants';

export const startDashboard = (token) => async (dispatch) => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: DASHBOARD_START_REQUEST });

    /** Prepare request to external api data provider. */
    const { data } = await axios({
      url: 'https://phisix-api4.appspot.com/stocks.json',
      method: 'GET',
    });

    /** Use remap stocks helper. */
    let result = mapObject(data);

    /** Save stocks to database. */
    result.map((item, index) => {
      /** Get last index. */
      let end = result.length - 1;

      /** Call delay item function. */
      setTimeout(async function () {
        /** Check if data is not empty. */
        if (item) {
          /** Send request. */
          const { data } = await axios({
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            method: 'POST',
            url: '/api/stock-trade-store',
            params: {
              input: item,
              table: 'trade',
              statement: 'store',
            },
          });

          /** Dispatch action to show message in the frontend. */
          dispatch({
            type: MESSAGE_SHOW_SUCCESS,
            payload: data.message,
          });
        }
        /** Talk to the console about that task progress. */
        if (index === end) {
          console.log('Process Completed.');
        }
      }, 3000 * index);
    });

    /** Dispatch action to set the result into the store. */
    dispatch({ type: DASHBOARD_START_SUCCESS, payload: data.message });
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: DASHBOARD_START_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const priceDashboard = (token) => async (dispatch) => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: DASHBOARD_PRICE_REQUEST });

    /** Prepare request to external api data provider. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
      url: '/stock-reports-retrieve',
      params: { section: 'stocks' },
    });

    /** Separate result. */
    let stocks = data.stocks;
    let message = data.message;

    /** Dispatch action to show message in the frontend. */
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message,
    });

    /** Save stocks to database. */
    stocks.map((item, index) => {
      /** Get last index. */
      let end = stocks.length - 1;

      /** Call delay item function. */
      setTimeout(async function () {
        /** Check if data is not empty. */
        if (item) {
          /** Send request. */
          const { data } = await axios({
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            method: 'POST',
            url: '/stock-reports-store',
            params: {
              input: item,
              section: 'prices',
            },
          });

          /** Dispatch action to show message in the frontend. */
          dispatch({
            type: MESSAGE_SHOW_SUCCESS,
            payload: data.message,
          });
        }
        /** Talk to the console about that task progress. */
        if (index === end) {
          console.log('Process Completed.');
        }
      }, 3000 * index);
    });

    /** Dispatch action to set the result into the store. */
    dispatch({ type: DASHBOARD_PRICE_SUCCESS, payload: data.message });
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: DASHBOARD_PRICE_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const reportDashboard = (token) => async (dispatch) => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: DASHBOARD_REPORT_REQUEST });

    /** Prepare request to external api data provider. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
      url: '/stock-reports-retrieve',
      params: { section: 'stocks' },
    });

    /** Separate result. */
    let stocks = data.stocks;
    let message = data.message;

    /** Dispatch action to show message in the frontend. */
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message,
    });

    /** Save stocks to database. */
    stocks.map((item, index) => {
      /** Get last index. */
      let end = stocks.length - 1;
      /** Call delay item function. */
      setTimeout(async function () {
        /** Check if data is not empty. */
        if (item) {
          /** Send request. */
          const { data } = await axios({
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            method: 'POST',
            url: '/stock-reports-store',
            params: {
              input: item,
              section: 'reports',
            },
          });

          /** Dispatch action to show message in the frontend. */
          dispatch({
            type: MESSAGE_SHOW_SUCCESS,
            payload: data.message,
          });
        }
        /** Talk to the console about that task progress. */
        if (index === end) {
          console.log('Process Completed.');
        }
      }, 3000 * index);
    });

    /** Dispatch action to set the result into the store. */
    dispatch({ type: DASHBOARD_REPORT_SUCCESS, payload: data.message });
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: DASHBOARD_REPORT_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const dividendDashboard = (token) => async (dispatch) => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: DASHBOARD_DIVIDEND_REQUEST });

    /** Prepare request to external api data provider. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
      url: '/stock-reports-retrieve',
      params: { section: 'stocks' },
    });

    /** Separate result. */
    let stocks = data.stocks;
    let message = data.message;

    /** Dispatch action to show message in the frontend. */
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message,
    });

    /** Save stocks to database. */
    stocks.map((item, index) => {
      /** Get last index. */
      let end = stocks.length - 1;
      /** Call delay item function. */
      setTimeout(async function () {
        /** Check if data is not empty. */
        if (item) {
          /** Send request. */
          const { data } = await axios({
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            method: 'POST',
            url: '/stock-reports-store',
            params: {
              input: item,
              section: 'dividends',
            },
          });

          /** Dispatch action to show message in the frontend. */
          dispatch({
            type: MESSAGE_SHOW_SUCCESS,
            payload: data.message,
          });
        }
        /** Talk to the console about that task progress. */
        if (index === end) {
          console.log('Process Completed.');
        }
      }, 3000 * index);
    });

    /** Dispatch action to set the result into the store. */
    dispatch({ type: DASHBOARD_DIVIDEND_SUCCESS, payload: data.message });
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: DASHBOARD_DIVIDEND_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const sectorDashboard = (token) => async (dispatch) => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: DASHBOARD_SECTOR_REQUEST });

    /** Prepare request to external api data provider. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
      url: '/stock-reports-retrieve',
      params: { section: 'stocks' },
    });

    /** Separate result. */
    let stocks = data.stocks;
    let message = data.message;

    /** Dispatch action to show message in the frontend. */
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message,
    });

    /** Save stocks to database. */
    stocks.map((item, index) => {
      /** Get last index. */
      let end = stocks.length - 1;

      /** Call delay item function. */
      setTimeout(async function () {
        /** Check if data is not empty. */
        if (item) {
          /** Send request. */
          const { data } = await axios({
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            method: 'POST',
            url: '/stock-reports-store',
            params: {
              input: item,
              section: 'sectors',
            },
          });

          /** Dispatch action to show message in the frontend. */
          dispatch({
            type: MESSAGE_SHOW_SUCCESS,
            payload: data.message,
          });
        }
        /** Talk to the console about that task progress. */
        if (index === end) {
          console.log('Process Completed.');
        }
      }, 3000 * index);
    });

    /** Dispatch action to set the result into the store. */
    dispatch({ type: DASHBOARD_SECTOR_SUCCESS, payload: data.message });
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: DASHBOARD_SECTOR_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const listDashboard = (token) => async (dispatch) => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: DASHBOARD_LIST_REQUEST });

    /** Prepare request to external api data provider. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
      url: '/stock-reports-retrieve',
      params: { section: 'lists' },
    });

    /** Separate result. */
    let message = data.message;

    /** Dispatch action to show message in the frontend. */
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message,
    });

    /** Dispatch action to set the result into the store. */
    dispatch({ type: DASHBOARD_LIST_SUCCESS, payload: message });

    /** Dispatch action to set the result into the store. */
    if (message) {
      console.log('Process Completed.');
    }
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: DASHBOARD_LIST_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const companyDashboard = (token) => async (dispatch) => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: DASHBOARD_COMPANY_REQUEST });

    /** Prepare request to external api data provider. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
      url: '/stock-reports-retrieve',
      params: { section: 'stocks' },
    });

    /** Separate result. */
    let stocks = data.stocks;
    let message = data.message;

    /** Dispatch action to show message in the frontend. */
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message,
    });

    /** Save stocks to database. */
    stocks.map((item, index) => {
      /** Get last index. */
      let end = stocks.length - 1;
      /** Call delay item function. */
      setTimeout(async function () {
        /** Check if data is not empty. */
        if (item) {
          /** Send request. */
          const { data } = await axios({
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            method: 'POST',
            url: '/stock-reports-store',
            params: {
              symbol: item.symbol,
              edge: item.edge,
              section: 'companies',
            },
          });

          /** Dispatch action to show message in the frontend. */
          dispatch({
            type: MESSAGE_SHOW_SUCCESS,
            payload: data.message,
          });
        }
        /** Talk to the console about that task progress. */
        if (index === end) {
          console.log('Process Completed.');
        }
      }, 5000 * index);
    });

    /** Dispatch action to set the result into the store. */
    dispatch({ type: DASHBOARD_COMPANY_SUCCESS, payload: data.message });
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: DASHBOARD_COMPANY_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const bluechipDashboard = (token) => async (dispatch) => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: DASHBOARD_BLUECHIP_REQUEST });

    /** Prepare request to external api data provider. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
      url: '/api/dashboard',
      params: { section: 'bluechip', statement: 'select' },
    });

    /** Separate result. */
    let stocks = data.stocks;
    let message = data.message;

    /** Dispatch action to show message in the frontend. */
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message,
    });

    /** Dispatch action to set the result into the store. */
    dispatch({ type: DASHBOARD_BLUECHIP_SUCCESS, payload: stocks });

    /** Save to result to local storage. */
    if (stocks) {
      localStorage.setItem('dashboardBluechip', JSON.stringify(stocks));
    }
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: DASHBOARD_BLUECHIP_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const bluechipStoreDashboard =
  ({ token, symbol }) =>
  async (dispatch) => {
    try {
      /** Dispatch action to set inital state. */
      dispatch({ type: DASHBOARD_BLUECHIP_STORE_REQUEST });

      /** Prepare request to external api data provider. */
      const { data } = await axios({
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
        url: '/api/dashboard',
        params: {
          section: 'bluechip',
          statement: 'store',
          symbol: symbol,
        },
      });

      /** Separate result. */
      let message = data.message;

      /** Dispatch action to show message in the frontend. */
      dispatch({ type: MESSAGE_SHOW_SUCCESS, payload: message });

      /** Dispatch action to set the result into the store. */
      dispatch({ type: DASHBOARD_BLUECHIP_STORE_SUCCESS, payload: message });
    } catch (error) {
      /** Dispatch action if error occurred. */
      dispatch({
        type: DASHBOARD_BLUECHIP_STORE_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
      /** Dispatch action if error occurred. */
      dispatch({
        type: MESSAGE_SHOW_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };

export const bluechipDestroyDashboard =
  ({ token, symbol }) =>
  async (dispatch) => {
    try {
      /** Dispatch action to set inital state. */
      dispatch({ type: DASHBOARD_BLUECHIP_DESTROY_REQUEST });

      /** Prepare request to external api data provider. */
      const { data } = await axios({
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
        url: '/api/dashboard',
        params: {
          section: 'bluechip',
          statement: 'destroy',
          symbol: symbol,
        },
      });

      /** Separate result. */
      let message = data.message;

      /** Dispatch action to show message in the frontend. */
      dispatch({ type: MESSAGE_SHOW_SUCCESS, payload: message });

      /** Dispatch action to set the result into the store. */
      dispatch({
        type: DASHBOARD_BLUECHIP_DESTROY_SUCCESS,
        payload: message,
      });
    } catch (error) {
      /** Dispatch action if error occurred. */
      dispatch({
        type: DASHBOARD_BLUECHIP_DESTROY_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
      /** Dispatch action if error occurred. */
      dispatch({
        type: MESSAGE_SHOW_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };

export const edgeDashboard = (token) => async (dispatch) => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: DASHBOARD_EDGE_REQUEST });

    /** Prepare request to external api data provider. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
      url: '/api/dashboard',
      params: { section: 'edge', statement: 'select' },
    });

    /** Separate result. */
    let stocks = data.stocks;
    let message = data.message;

    /** Dispatch action to show message in the frontend. */
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message,
    });

    /** Dispatch action to set the result into the store. */
    dispatch({ type: DASHBOARD_EDGE_SUCCESS, payload: stocks });

    /** Save to result to local storage. */
    if (stocks) {
      localStorage.setItem('dashboardEdge', JSON.stringify(stocks));
    }
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: DASHBOARD_EDGE_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const edgeUpdateDashboard = (props) => async (dispatch) => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: DASHBOARD_EDGE_UPDATE_REQUEST });

    /** Prepare request to external api data provider. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      },
      method: 'POST',
      url: '/api/dashboard',
      params: {
        section: 'edge',
        statement: 'update',
        symbol: props.symbol,
        edge: props.edge,
      },
    });

    /** Separate result. */
    let message = data.message;

    /** Dispatch action to show message in the frontend. */
    dispatch({ type: MESSAGE_SHOW_SUCCESS, payload: message });

    /** Dispatch action to set the result into the store. */
    dispatch({ type: DASHBOARD_EDGE_UPDATE_SUCCESS, payload: message });
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: DASHBOARD_EDGE_UPDATE_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const stockGainerDashboard = (token) => async (dispatch) => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: DASHBOARD_STOCK_GAINER_REQUEST });

    /** Prepare request to external api data provider. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
      url: '/api/dashboard',
      params: { section: 'gainers' },
    });

    /** Separate result. */
    let stocks = data.stocks;
    let message = data.message;

    /** Dispatch action to show message in the frontend. */
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message,
    });

    /** Dispatch action to set the result into the store. */
    dispatch({ type: DASHBOARD_STOCK_GAINER_SUCCESS, payload: stocks });

    /** Save to result to local storage. */
    if (stocks) {
      localStorage.setItem('dashboardStockGainer', JSON.stringify(stocks));
    }
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: DASHBOARD_STOCK_GAINER_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const stockLosserDashboard = (token) => async (dispatch) => {
  try {
    /** Dispatch action to set inital state. */
    dispatch({ type: DASHBOARD_STOCK_LOSSER_REQUEST });

    /** Prepare request to external api data provider. */
    const { data } = await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
      url: '/api/dashboard',
      params: { section: 'lossers' },
    });

    /** Separate result. */
    let stocks = data.stocks;
    let message = data.message;

    /** Dispatch action to show message in the frontend. */
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message,
    });

    /** Dispatch action to set the result into the store. */
    dispatch({ type: DASHBOARD_STOCK_LOSSER_SUCCESS, payload: stocks });

    /** Save to result to local storage. */
    if (stocks) {
      localStorage.setItem('dashboardStockLosser', JSON.stringify(stocks));
    }
  } catch (error) {
    /** Dispatch action if error occurred. */
    dispatch({
      type: DASHBOARD_STOCK_LOSSER_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
    /** Dispatch action if error occurred. */
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};