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
import { desktopContent } from '../../template/stocks/Portfolio';

/** Action. */
import { fetchStockPortfolio, storeStockPortfolio } from '../../../actions/PortfolioActions';
import { tokenUser } from '../../../actions/UserActions.js';

const Portfolio = () => {
  /** Use state. */
  const [search, setSearch] = useState(false);
  const [add, setAdd] = useState(false);
  const [notice, setNotice] = useState(false);

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
    setAdd(false);

    /** Dispatch action. */
    dispatch(fetchStockPortfolio(access_token));
  };

  /** Show search handler. */
  const showSearchHandler = () => {
    setSearch(true);
  };

  /** Show add handler. */
  const showAddHandler = () => {
    setAdd(true);
  };

  /** Hide search handler. */
  const closeModalHandler = () => {
    setSearch(false);
    setAdd(false);
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
      {desktopContent({ header: 'account', icon: 'portfolio' })}
      {desktopContent({ header: 'hold', icon: 'portfolio' })}
      {desktopContent({ header: 'order', icon: 'trade', text: 'add', action: showAddHandler })}
      {search && (
        <Modal>
          <Search close={closeModalHandler} />
        </Modal>
      )}
      {add && (
        <Modal>
          <div className='grid auto-rows-min h-fit rounded-t-md bg-stone-100'>
            <div className='flex flex-row flex-wrap justify-between align-center border-b border-stone-200 uppercase'>
              <p className='p-2'>Add Record</p>
              <p className='p-2 cursor-pointer' onClick={closeModalHandler}>
                <Icon id='close' /> <span className='pl-2'>Close</span>
              </p>
            </div>
            <form classNams='form-group border border-green-500' onSubmit={submitHandler}>
              <div className='p-2 p-2 form-control'>
                <label className='form-label uppercase' htmlFor='order'>
                  Order
                </label>
                <select
                  className={`p-2 form-input focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 ${orderInputClasses}`}
                  id='order'
                  name='order'
                  value={order}
                  onChange={orderChangeHandler}
                  onBlur={orderBlurHandler}>
                  <option value=''></option>
                  <option value='buy'>Buy</option>
                  <option value='sell'>Sell</option>
                </select>
                {orderHasError && <p className='form-alert text-red-500'>Please select a valid order.</p>}
              </div>
              <div className='p-2 form-control'>
                <label className='form-label uppercase' htmlFor='symbol'>
                  Symbol
                </label>
                <input
                  className={`p-2 form-input ${symbolInputClasses}`}
                  type='text'
                  id='symbol'
                  name='symbol'
                  value={symbol}
                  placeholder='Symbol'
                  onChange={symbolChangeHandler}
                  onBlur={symbolBlurHandler}
                  autoComplete='off'
                />
                {symbolHasError && <p className='form-alert text-red-500'>Please enter a valid symbol.</p>}
              </div>
              <div className='p-2 form-control'>
                <label className='form-label uppercase' htmlFor='share'>
                  Share
                </label>
                <input
                  className={`p-2 form-input ${shareInputClasses}`}
                  type='number'
                  step='0.01'
                  min='0.00'
                  id='share'
                  name='share'
                  value={share}
                  placeholder='0.00'
                  onChange={shareChangeHandler}
                  onBlur={shareBlurHandler}
                  autoComplete='off'
                />
                {shareHasError && <p className='form-alert text-red-500'>Please enter a valid share.</p>}
              </div>
              <div className='p-2 form-control'>
                <label className='form-label uppercase' htmlFor='capital'>
                  Capital
                </label>
                <input
                  className={`p-2 form-input ${capitalInputClasses}`}
                  type='number'
                  step='0.01'
                  min='0.00'
                  id='capital'
                  name='capital'
                  value={capital}
                  placeholder='0.00'
                  onChange={capitalChangeHandler}
                  onBlur={capitalBlurHandler}
                  autoComplete='off'
                />
                {capitalHasError && <p className='form-alert text-red-500'>Please enter a valid email.</p>}
              </div>
              <div className='p-2 form-control'>
                <label className='form-label uppercase' htmlFor='fee'>
                  Fee
                </label>
                <input
                  className={`p-2 form-input ${feeInputClasses}`}
                  type='number'
                  step='0.01'
                  min='0.00'
                  id='fee'
                  name='fee'
                  value={fee}
                  placeholder='0.00'
                  onChange={feeChangeHandler}
                  onBlur={feeBlurHandler}
                  autoComplete='off'
                />
                {feeHasError && <p className='form-alert text-red-500'>Please enter a valid fee.</p>}
              </div>
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
    </Container>
  );
};

export default Portfolio;
