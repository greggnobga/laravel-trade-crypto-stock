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
import { desktopContent, mobileContent } from '../../template/stocks/Portfolio';

/** Action. */
import { fetchStockPortfolio, storeStockPortfolio, updateStockPortfolio, destroyStockPortfolio } from '../../../actions/PortfolioActions';
import { tokenUser } from '../../../actions/UserActions.js';

const Portfolio = () => {
  /** Use state. */
  const [search, setSearch] = useState(false);
  const [notice, setNotice] = useState(false);
  const [store, setStore] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updateData, setUpdateData] = useState();
  const [destroy, setDestroy] = useState(false);
  const [destroyData, setDestroyData] = useState();

  /** Use selector. */
  const userLogin = useSelector((state) => state.userLogin);
  const { access_token } = userLogin;

  const userToken = useSelector((state) => state.userToken);
  const { valid } = userToken;

  const portfolioStockFetch = useSelector((state) => state.portfolioStockFetch);
  const { loading, portfolio } = portfolioStockFetch;

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
  }, [access_token, valid, isMobile, portfolio, message]);

  /** Submit handler. */
  const storeHandler = (event) => {
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
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  };

  /** Destory handler. */
  const updateHandler = (event) => {
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
    dispatch(updateStockPortfolio(access_token, order, symbol, share, capital, fee));

    /** Reset input. */
    orderInputReset();
    symbolInputReset();
    feeInputReset();
    shareInputReset();
    capitalInputReset();

    /** Hide modal. */
    setUpdate(false);

    /** Update state after timeout. */
    const timeout = setTimeout(() => {
      /** Dispatch action. */
      dispatch(fetchStockPortfolio(access_token));
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  };

  /** Destory handler. */
  const destroyHandler = () => {
    /** Dispatch action. */
    dispatch(destroyStockPortfolio(access_token, destroyData));
    /** Hide modal. */
    setDestroy(false);

    /** Update state after timeout. */
    const timeout = setTimeout(() => {
      /** Dispatch action. */
      dispatch(fetchStockPortfolio(access_token));
    }, 5000);

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
    /** Show modal. */
    setUpdate(true);

    /** Check if item is set. */
    if (item) {
      /** Set modal data. */
      setUpdateData(item);
    }
  };

  /** Show destroy handler. */
  const showDestroyteHandler = (symbol) => {
    /** Show modal. */
    setDestroy(true);

    /** Check if symbol is set. */
    if (symbol) {
      /** Set modal data. */
      setDestroyData(symbol);
    }
  };

  /** Hide search handler. */
  const closeModalHandler = () => {
    /** Set state. */
    setSearch(false);
    setStore(false);
    setUpdate(false);
    setDestroy(false);
  };

  /** Container header for common. */
  const containerHeader = (
    <div className='flex flex-row flex-wrap justify-between items-center'>
      <div className='p-0'>
        <Icon id='trade' /> Portfolio
      </div>
      <div className='p-0'>
        <span className='p-2 cursor-pointer' onClick={showSearchHandler}>
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
      {loading ? (
        <Loader />
      ) : (
        <>
          {isMobile
            ? mobileContent({ header: 'chart', icon: 'portfolio', items: portfolio ? portfolio['chart'] : [] })
            : desktopContent({ header: 'chart', icon: 'portfolio', items: portfolio ? portfolio['chart'] : [] })}
          {isMobile
            ? mobileContent({ header: 'hold', icon: 'portfolio', items: portfolio ? portfolio['hold'] : [] })
            : desktopContent({ header: 'hold', icon: 'portfolio', items: portfolio ? portfolio['hold'] : [] })}
          {isMobile
            ? mobileContent({
                header: 'order',
                icon: 'trade',
                text: 'add',
                store: showStoreHandler,
                update: showUpdateHandler,
                destroy: showDestroyteHandler,
                items: portfolio ? portfolio['order'] : [],
              })
            : desktopContent({
                header: 'order',
                icon: 'trade',
                text: 'add',
                store: showStoreHandler,
                update: showUpdateHandler,
                destroy: showDestroyteHandler,
                items: portfolio ? portfolio['order'] : [],
              })}
        </>
      )}
      <div className='grid auto-rows-min h-fit rounded'>
        {search && (
          <Modal>
            <Search close={closeModalHandler} component='portfolio' items={portfolio ? portfolio['hold'] : []} />
          </Modal>
        )}
      </div>
      <div className='grid auto-rows-min h-fit rounded'>
        {store && (
          <Modal>
            <div className='grid auto-rows-min rounded-t-md bg-stone-100'>
              <div className='flex flex-row flex-wrap justify-between items-center border-b border-stone-200 uppercase'>
                <p className='p-2'>Add Record</p>
                <p className='p-2 cursor-pointer' onClick={closeModalHandler}>
                  <Icon id='close' /> <span className='pl-2'>Close</span>
                </p>
              </div>
              <form classNams='form-group border border-green-500' onSubmit={storeHandler}>
                <div className='p-2 p-2 form-control'>
                  <label className='form-label uppercase' htmlFor='order'>
                    Order
                  </label>
                  <select className={`p-2 form-input uppercase ${orderInputClasses}`} onChange={orderChangeHandler} onBlur={orderBlurHandler}>
                    <option value=''></option>
                    <option value='buy'>Buy</option>
                    <option value='sell'>Sell</option>
                  </select>
                  {orderHasError && <p className='form-alert text-red-500'>Please select a valid order.</p>}
                </div>
                <div className='p-2 p-2 form-control'>
                  <label className='form-label uppercase' htmlFor='symbol'>
                    Symbol
                  </label>
                  <input
                    className={`p-2 form-input uppercase ${symbolInputClasses}`}
                    type='text'
                    id='symbol'
                    name='symbol'
                    value={symbol}
                    onChange={symbolChangeHandler}
                    onBlur={symbolBlurHandler}
                    autoComplete='off'
                  />
                  {symbolHasError && <p className='form-alert text-red-500'>Please select a valid symbol.</p>}
                </div>
                <div className='p-2 p-2 form-control'>
                  <label className='form-label uppercase' htmlFor='share'>
                    Share
                  </label>
                  <input
                    className={`p-2 form-input uppercase ${shareInputClasses}`}
                    type='number'
                    id='share'
                    name='share'
                    value={share}
                    onChange={shareChangeHandler}
                    onBlur={shareBlurHandler}
                    autoComplete='off'
                  />
                  {shareHasError && <p className='form-alert text-red-500'>Please select a valid share.</p>}
                </div>
                <div className='p-2 p-2 form-control'>
                  <label className='form-label uppercase' htmlFor='capital'>
                    Capital
                  </label>
                  <input
                    className={`p-2 form-input uppercase ${capitalInputClasses}`}
                    type='number'
                    id='capital'
                    name='capital'
                    value={capital}
                    onChange={capitalChangeHandler}
                    onBlur={capitalBlurHandler}
                    autoComplete='off'
                  />
                  {capitalHasError && <p className='form-alert text-red-500'>Please select a valid capital.</p>}
                </div>
                <div className='p-2 p-2 form-control'>
                  <label className='form-label uppercase' htmlFor='fee'>
                    fee
                  </label>
                  <input
                    className={`p-2 form-input uppercase ${feeInputClasses}`}
                    type='number'
                    id='fee'
                    name='fee'
                    value={fee}
                    onChange={feeChangeHandler}
                    onBlur={feeBlurHandler}
                    autoComplete='off'
                  />
                  {feeHasError && <p className='form-alert text-red-500'>Please select a valid fee.</p>}
                </div>
                <div className='form-button'>
                  <div className='p-2'>
                    <button className='btn btn-green cursor-pointer' type='submit' onClick={storeHandler} disabled={!formIsValid}>
                      Submit
                    </button>
                  </div>
                  <div className='p-2'>
                    <button className='btn btn-stone cursor-pointer' type='button' onClick={closeModalHandler}>
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Modal>
        )}
      </div>
      <div className='grid auto-rows-min h-fit rounded'>
        {update && (
          <Modal>
            <div className='grid auto-rows-min rounded-t-md bg-stone-100'>
              <div className='flex flex-row flex-wrap justify-between items-center border-b border-stone-200 uppercase'>
                <p className='p-2'>Update Record</p>
                <p className='p-2 cursor-pointer' onClick={closeModalHandler}>
                  <Icon id='close' /> <span className='pl-2'>Close</span>
                </p>
              </div>
              <form classNams='form-group border border-green-500' onSubmit={updateHandler}>
                <div className='p-2 p-2 form-control'>
                  <label className='form-label uppercase' htmlFor='order'>
                    Order
                  </label>
                  <select
                    className={`p-2 form-input uppercase ${orderInputClasses}`}
                    onClick={(e) => orderChangeHandler(e)}
                    onChange={orderChangeHandler}
                    onBlur={orderBlurHandler}>
                    <option value={order ? order : updateData['order']}>{order ? order : updateData['order']}</option>
                    <option value='buy'>Buy</option>
                    <option value='sell'>Sell</option>
                  </select>
                  {orderHasError && <p className='form-alert text-red-500'>Please select a valid order.</p>}
                </div>
                <div className='p-2 p-2 form-control'>
                  <label className='form-label uppercase' htmlFor='symbol'>
                    Symbol
                  </label>
                  <input
                    className={`p-2 form-input uppercase ${symbolInputClasses}`}
                    type='text'
                    id='symbol'
                    name='symbol'
                    value={symbol ? symbol : updateData['symbol']}
                    onClick={(e) => symbolChangeHandler(e)}
                    onChange={symbolChangeHandler}
                    onBlur={symbolBlurHandler}
                    autoComplete='off'
                  />
                  {symbolHasError && <p className='form-alert text-red-500'>Please select a valid symbol.</p>}
                </div>
                <div className='p-2 p-2 form-control'>
                  <label className='form-label uppercase' htmlFor='share'>
                    Share
                  </label>
                  <input
                    className={`p-2 form-input uppercase ${shareInputClasses}`}
                    type='number'
                    id='share'
                    name='share'
                    value={share ? share : updateData['share'].replace(/,/g, '')}
                    onClick={(e) => shareChangeHandler(e)}
                    onChange={shareChangeHandler}
                    onBlur={shareBlurHandler}
                    autoComplete='off'
                  />
                  {shareHasError && <p className='form-alert text-red-500'>Please select a valid share.</p>}
                </div>
                <div className='p-2 p-2 form-control'>
                  <label className='form-label uppercase' htmlFor='capital'>
                    Capital
                  </label>
                  <input
                    className={`p-2 form-input uppercase ${capitalInputClasses}`}
                    type='number'
                    id='capital'
                    name='capital'
                    value={capital ? capital : updateData['capital'].replace(/,/g, '')}
                    onClick={(e) => capitalChangeHandler(e)}
                    onChange={capitalChangeHandler}
                    onBlur={capitalBlurHandler}
                    autoComplete='off'
                  />
                  {capitalHasError && <p className='form-alert text-red-500'>Please select a valid capital.</p>}
                </div>
                <div className='p-2 p-2 form-control'>
                  <label className='form-label uppercase' htmlFor='fee'>
                    fee
                  </label>
                  <input
                    className={`p-2 form-input uppercase ${feeInputClasses}`}
                    type='number'
                    id='fee'
                    name='fee'
                    value={fee ? fee : updateData['fee'].replace(/,/g, '')}
                    onClick={(e) => feeChangeHandler(e)}
                    onChange={feeChangeHandler}
                    onBlur={feeBlurHandler}
                    autoComplete='off'
                  />
                  {feeHasError && <p className='form-alert text-red-500'>Please select a valid fee.</p>}
                </div>
                <div className='form-button'>
                  <div className='p-2'>
                    <button className='btn btn-green cursor-pointer' type='submit' onClick={updateHandler} disabled={!formIsValid}>
                      Update
                    </button>
                  </div>
                  <div className='p-2'>
                    <button className='btn btn-stone cursor-pointer' type='button' onClick={closeModalHandler}>
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Modal>
        )}
      </div>
      <div className='grid auto-rows-min h-fit rounded'>
        {destroy && (
          <Modal>
            <div className='grid auto-rows-min rounded-t-md bg-stone-100'>
              <div className='flex flex-row flex-wrap justify-between items-center border-b border-stone-200 uppercase'>
                <p className='p-2'>Delete Record</p>
                <p className='p-2 cursor-pointer' onClick={closeModalHandler}>
                  <Icon id='close' /> <span className='pl-2'>Close</span>
                </p>
              </div>
              <div className='form-prompt'>
                <p className='form-label'>Do you really want to remove {destroyData} from the order table?</p>
              </div>
              <div className='form-button'>
                <div className='p-2'>
                  <button className='btn btn-green cursor-pointer' type='submit' onClick={() => destroyHandler()}>
                    Delete
                  </button>
                </div>
                <div className='p-2'>
                  <button className='btn btn-stone cursor-pointer' type='button' onClick={closeModalHandler}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </Container>
  );
};

export default Portfolio;
