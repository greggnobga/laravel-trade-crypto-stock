/** React. */
import { useState, useEffect } from 'react';

/** Vendor. */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/** Component. */
import Icon from '../../../components/Icon';
import Modal from '../../../components/Modal';
import Loader from '../../../components/Loader';
import Search from '../../../components/Search';
import Container from '../../../components/Container';

/** Template. */
import { desktopContent, desktopModalContent } from '../../template/Chart';

/** Action. */
import { watchlistChart, averageChart, fetchChart } from '../../../actions/ChartActions';
import { tokenUser } from '../../../actions/UserActions.js';

const StockChart = () => {
  /** Use state. */
  const [modalSearch, setModalSearch] = useState(false);
  const [modalBuild, setModalBuild] = useState(false);
  const [modalSymbol, setModalSymbol] = useState();

  /** Use selector. */
  const userLogin = useSelector((state) => state.userLogin);
  const { access_token } = userLogin;

  const userToken = useSelector((state) => state.userToken);
  const { valid } = userToken;

  const chartWatchlist = useSelector((state) => state.chartWatchlist);
  const { watchbuild } = chartWatchlist;

  const chartFetch = useSelector((state) => state.chartFetch);
  const { stocks } = chartFetch;

  const chartAverage = useSelector((state) => state.chartAverage);
  const { success, loading } = chartAverage;

  const showMessage = useSelector((state) => state.showMessage);
  const { message, error } = showMessage;

  /** Use navigate. */
  const navigate = useNavigate();

  /** Use dispatch. */
  const dispatch = useDispatch();

  /** Show modal handler. */
  const showModalSearchHandler = () => {
    setModalSearch(true);
  };

  const showModalBuildHandler = () => {
    setModalBuild(true);
  };

  /** Close modal handler. */
  const closeModalHandler = () => {
    /** Hide modal. */
    setModalSearch(false);
    setModalBuild(false);
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

    /** Send request if no build stock. */
    if (valid && !watchbuild) {
      /** Dispatch action. */
      dispatch(watchlistChart(access_token));
    }

    /** Send request if no stocks. */
    if (valid && !stocks) {
      /** Dispatch action. */
      dispatch(fetchChart(access_token));
    }
  }, [access_token, valid, watchbuild, stocks]);

  /** Store handler. */
  const storeHandler = ({ symbol }) => {
    /** Test. */
    setModalSymbol(symbol);
    /** Dispatch action. */
    dispatch(averageChart(access_token, symbol));
  };

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
        <span className='mr-4' onClick={showModalBuildHandler}>
          <Icon id='build' /> Build
        </span>
      </p>
    </div>
  );

  return (
    <>
      <Container header={containerChartHeader}>
        {desktopContent({ items: stocks })}

        <div className='grid auto-rows-min h-fit rounded'>
          {modalSearch && (
            <Modal>
              <Search close={closeModalHandler} />
            </Modal>
          )}
        </div>
        <div className='grid auto-rows-min h-fit rounded gap-2'>
          {modalBuild && (
            <Modal>
              {loading ? (
                <Loader />
              ) : (
                desktopModalContent({
                  header: 'watchlist',
                  close: closeModalHandler,
                  action: storeHandler,
                  items: watchbuild,
                  fetch: stocks,
                  symbol: modalSymbol,
                  message: success,
                  error: error,
                })
              )}
              {desktopModalContent({
                header: 'bluechip',
                close: closeModalHandler,
                action: storeHandler,
                items: [],
                message: success,
                error: error,
              })}
            </Modal>
          )}
        </div>
      </Container>
    </>
  );
};

export default StockChart;
