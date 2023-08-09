/** React. */
import { useState, useEffect } from 'react';

/** Vendor. */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/** Hook. */
import useScreen from '../../../hooks/UseScreen';
import useValidate from '../../../hooks/UseValidate';

/** Component. */
import Icon from '../../../components/Icon';
import Modal from '../../../components/Modal';
import Loader from '../../../components/Loader';
import Notice from '../../../components/Notice';
import Search from '../../../components/Search';

import Container from '../../../components/Container';

/** Template. */
import { desktopContent, modalStoreContent } from '../../template/stocks/Portfolio';

/** Action. */
import { fetchStockPortfolio, storeStockPortfolio } from '../../../actions/PortfolioActions';
import { tokenUser } from '../../../actions/UserActions.js';

const Portfolio = () => {
  /** Use state. */
  const [search, setSearch] = useState(false);
  const [notice, setNotice] = useState(false);
  const [store, setStore] = useState(false);
  const [update, setUpdate] = useState(false);
  const [destroy, setDestroy] = useState(false);

  /** Use selector. */
  const userLogin = useSelector((state) => state.userLogin);
  const { access_token } = userLogin;

  const userToken = useSelector((state) => state.userToken);
  const { valid } = userToken;

  const portfolioStockFetch = useSelector((state) => state.portfolioStockFetch);
  const { portfolio, loading } = portfolioStockFetch;

  const showMessage = useSelector((state) => state.showMessage);
  const { message, error } = showMessage;

  /** Map html element to validate hook. */
  const {
    value: order,
    hasError: orderHasError,
    isValid: orderIsValid,
    valueChangeHandler: orderChangeHandler,
    inputBlurHandler: orderBlurHandler,
    resetHandler: orderInputReset,
  } = useValidate((value) => value.trim() !== '' && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/));

  const {
    value: symbol,
    hasError: symbolHasError,
    isValid: symbolIsValid,
    valueChangeHandler: symbolChangeHandler,
    inputBlurHandler: symbolBlurHandler,
    resetHandler: symbolInputReset,
  } = useValidate((value) => value.trim() !== '' && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/));

  const {
    value: fee,
    hasError: feeHasError,
    isValid: feeIsValid,
    valueChangeHandler: feeChangeHandler,
    inputBlurHandler: feeBlurHandler,
    resetHandler: feeInputReset,
  } = useValidate((value) => value.trim() !== '' && value.match(/^[0-9.]*$/));

  const {
    value: share,
    hasError: shareHasError,
    isValid: shareIsValid,
    valueChangeHandler: shareChangeHandler,
    inputBlurHandler: shareBlurHandler,
    resetHandler: shareInputReset,
  } = useValidate((value) => value.trim() !== '' && value.match(/^[0-9.]*$/));

  const {
    value: capital,
    hasError: capitalHasError,
    isValid: capitalIsValid,
    valueChangeHandler: capitalChangeHandler,
    inputBlurHandler: capitalBlurHandler,
    resetHandler: capitalInputReset,
  } = useValidate((value) => value.trim() !== '' && value.match(/^[0-9.]*$/));

  /** Set overall form validity. */
  let formIsValid = false;
  if (orderIsValid && symbolIsValid && feeIsValid && shareIsValid && capitalIsValid) {
    formIsValid = true;
  }

  /** Change class logic if valid or otherwise. */
  const orderInputClasses = orderHasError ? 'alert-border-warning' : '';
  const symbolInputClasses = symbolHasError ? 'alert-border-warning' : '';
  const feeInputClasses = feeHasError ? 'alert-border-warning' : '';
  const shareInputClasses = shareHasError ? 'alert-border-warning' : '';
  const capitalInputClasses = capitalHasError ? 'alert-border-warning' : '';

  /** Use screen. */
  const { isMobile } = useScreen();

  /** Use dispatch. */
  const dispatch = useDispatch();

  /** Use navigate. */
  const navigate = useNavigate();

  /** Use effect. */
  useEffect(() => {
    /** Check valid state. */
    if (!valid && access_token) {
      dispatch(tokenUser(access_token));
    }

    /** Check if token is valid. */
    if (valid && access_token) {
      navigate('/dashboard/stock-portfolio');
    } else {
      navigate('/auth/login');
    }

    /** Send request if no stocks. */
    if (valid && !portfolio) {
      /** Dispatch action. */
      dispatch(fetchStockPortfolio(access_token));
    }

    /** Monitor new message. */
    if (message) {
      /** Set state. */
      setNotice(true);
      /** Reset state. */
      setTimeout(() => {
        setNotice(false);
      }, 5000);
    }
  }, [access_token, valid, message]);

  /** Submit handler. */
  const submitHandler = (event) => {
    /** Prevent browser default behaviour */
    event.preventDefault();

    /** Change blur state. */
    orderBlurHandler(true);
    symbolBlurHandler(true);
    feeBlurHandler(true);
    shareBlurHandler(true);
    capitalBlurHandler(true);

    /** Check if there is invalid input. */
    if (!orderIsValid && !symbolIsValid && !feeIsValid && !shareIsValid && !capitalIsValid) {
      return;
    }

    /** Dispatch action. */
    dispatch(storeStockPortfolio(access_token, order, symbol, share, capital, fee));

    /** Reset input. */
    orderInputReset();
    symbolInputReset();
    feeInputReset();
    shareInputReset();
    capitalInputReset();

    /** Hide modal. */
    setStore(false);

    /** Update state after timeout. */
    const timeout = setTimeout(() => {
      /** Dispatch action. */
      dispatch(fetchStockPortfolio(access_token));
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  };

  /** Show search handler. */
  const showSearchHandler = () => {
    setSearch(true);
  };

  /** Show store handler. */
  const showStoreHandler = () => {
    setStore(true);
  };

  /** Show update handler. */
  const showUpdateHandler = (item) => {
    console.log(item);
    setUpdate(true);
  };

  /** Show destroy handler. */
  const showDestroyteHandler = (symbol) => {
    console.log(symbol);
    setDestroy(true);
  };

  /** Hide search handler. */
  const closeModalHandler = () => {
    /** Set state. */
    setSearch(false);
    setStore(false);
    setUpdate(false);
    setDestroy(false);

    /** Update state after timeout. */
    const timeout = setTimeout(() => {
      /** Dispatch action. */
      dispatch(fetchStockPortfolio(access_token));
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  };

  /** Container header for common. */
  const containerHeader = (
    <div className='flex flex-row flex-wrap justify-between align-center'>
      <div className='p-0'>
        <Icon id='trade' /> Portfolio
      </div>
      <div className='p-0'>
        <span className='p-2' onClick={showSearchHandler}>
          <Icon id='search' /> Search
        </span>
      </div>
    </div>
  );

  /** Return something. */
  return (
    <Container header={containerHeader}>
      {error && <Notice variant='alert-warning' children={error} duration={3000} show={notice} />}
      {message && <Notice variant='alert-success' children={message} duration={3000} show={notice} />}
      {desktopContent({ header: 'chart', icon: 'portfolio', items: portfolio && portfolio ? portfolio['chart'] : [] })}
      {desktopContent({ header: 'hold', icon: 'portfolio', items: portfolio && portfolio ? portfolio['hold'] : [] })}
      {desktopContent({
        header: 'order',
        icon: 'trade',
        text: 'add',
        store: showStoreHandler,
        update: showUpdateHandler,
        destroy: showDestroyteHandler,
        items: portfolio && portfolio ? portfolio['order'] : [],
      })}
      {search && (
        <Modal>
          <Search close={closeModalHandler} />
        </Modal>
      )}
      {store && (
        <Modal>
          <div className='grid auto-rows-min h-fit rounded-t-md bg-stone-100'>
            <div className='flex flex-row flex-wrap justify-between align-center border-b border-stone-200 uppercase'>
              <p className='p-2'>Add Record</p>
              <p className='p-2 cursor-pointer' onClick={closeModalHandler}>
                <Icon id='close' /> <span className='pl-2'>Close</span>
              </p>
            </div>
            <form classNams='form-group border border-green-500' onSubmit={submitHandler}>
              {modalStoreContent({
                element: 'select',
                label: 'order',
                style: orderInputClasses,
                value: order,
                change: orderChangeHandler,
                blur: orderBlurHandler,
                error: orderHasError,
              })}
              {modalStoreContent({
                element: 'input',
                type: 'text',
                label: 'symbol',
                placeholder: 'symbol',
                style: symbolInputClasses,
                value: symbol,
                change: symbolChangeHandler,
                blur: symbolBlurHandler,
                error: symbolHasError,
              })}
              {modalStoreContent({
                element: 'input',
                type: 'number',
                label: 'share',
                placeholder: '0.00',
                style: shareInputClasses,
                value: share,
                change: shareChangeHandler,
                blur: shareBlurHandler,
                error: shareHasError,
              })}
              {modalStoreContent({
                element: 'input',
                type: 'number',
                label: 'capital',
                placeholder: '0.00',
                style: capitalInputClasses,
                value: capital,
                change: capitalChangeHandler,
                blur: capitalBlurHandler,
                error: capitalHasError,
              })}
              {modalStoreContent({
                element: 'input',
                type: 'number',
                label: 'fee',
                placeholder: '0.00',
                style: feeInputClasses,
                value: fee,
                change: feeChangeHandler,
                blur: feeBlurHandler,
                error: feeHasError,
              })}
              <div className='form-button'>
                <div className='p-2'>
                  <button className='btn btn-green' type='submit' onClick={submitHandler} disabled={!formIsValid}>
                    Submit
                  </button>
                </div>
                <div className='p-2'>
                  <button className='btn btn-stone' type='button' onClick={closeModalHandler}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      )}
      {update && <p>Update modal</p>}
      {destroy && <p>Destroy modal</p>}
    </Container>
  );
};

export default Portfolio;
