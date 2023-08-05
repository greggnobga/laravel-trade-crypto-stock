/** React. */
import { useState, useEffect } from 'react';

/** Vendor. */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/** Hook. */
import useScreen from '../../../hooks/UseScreen';

/** Component. */
import Icon from '../../../components/Icon';
import Modal from '../../../components/Modal';
import Loader from '../../../components/Loader';
import Search from '../../../components/Search';
import Notice from '../../../components/Notice';
import Container from '../../../components/Container';

/** Template. */
import { desktopContent, mobileContent } from '../../template/stocks/Chart';

/** Action. */
import { averageChart, fetchChart } from '../../../actions/ChartActions';
import { tokenUser } from '../../../actions/UserActions.js';

const StockChart = () => {
  /** Use state. */
  const [modalSearch, setModalSearch] = useState(false);
  const [notice, setNotice] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());

  /** Use selector. */
  const userLogin = useSelector((state) => state.userLogin);
  const { access_token } = userLogin;

  const userToken = useSelector((state) => state.userToken);
  const { valid } = userToken;

  const chartFetch = useSelector((state) => state.chartFetch);
  const { stocks } = chartFetch;

  const chartAverage = useSelector((state) => state.chartAverage);
  const { success, loading } = chartAverage;

  const showMessage = useSelector((state) => state.showMessage);
  const { message, error } = showMessage;

  /** Use screen. */
  const { isMobile } = useScreen();

  /** Use dispatch. */
  const dispatch = useDispatch();

  /** Use navigate. */
  const navigate = useNavigate();

  /** Show modal handler. */
  const showModalSearchHandler = () => {
    setModalSearch(true);
  };

  /** Close modal handler. */
  const closeModalHandler = () => {
    /** Hide modal. */
    setModalSearch(false);
  };

  const chartAverageHandler = () => {
    /** Dispatch action. */
    dispatch(averageChart(access_token));

    /** Dispatch action to update state. */
    dispatch(fetchChart(access_token));
  };

  useEffect(() => {
    /** Check valid state. */
    if (!valid && access_token) {
      dispatch(tokenUser(access_token));
    }

    /** Check if token is valid. */
    if (valid && access_token) {
      navigate('/dashboard/stock-chart');
    } else {
      navigate('/auth/login');
    }

    /** Send request if no stocks. */
    if (valid && !stocks) {
      /** Dispatch action. */
      dispatch(fetchChart(access_token));
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
  }, [access_token, valid, stocks, message]);

  /** Container header. */
  const containerChartHeader = (
    <div className='flex flex-row justify-between'>
      <p clasName='block p-2'>
        <Icon id='trade' /> Chart
      </p>
      <p className='block p-2 cursor-pointer -mt-2'>
        <span className='mr-4' onClick={showModalSearchHandler}>
          <Icon id='search' /> Search
        </span>
        <span className='mr-4' onClick={chartAverageHandler}>
          <Icon id='chart' /> Fetch
        </span>
      </p>
    </div>
  );

  return (
    <>
      {error && <Notice variant='alert-warning' children={error} duration={3000} show={notice} />}
      {message && <Notice variant='alert-success' children={message} duration={3000} show={notice} />}
      <Container header={containerChartHeader}>
        {isMobile ? mobileContent({ items: stocks, current: year }) : desktopContent({ items: stocks, current: year })}

        <div className='grid auto-rows-min h-fit rounded'>
          {modalSearch && (
            <Modal>
              <Search close={closeModalHandler} items={stocks} component='chart' current={year} />
            </Modal>
          )}
        </div>
      </Container>
    </>
  );
};

export default StockChart;
