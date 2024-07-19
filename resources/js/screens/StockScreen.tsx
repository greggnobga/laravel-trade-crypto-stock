/** React. */
import { useState, useEffect } from 'react';

/** Vendor. */
import { useDispatch, useSelector } from 'react-redux';

/** Hook. */
import useScreen from '../hooks/UseScreen';

/** Component. */
import Icon from '../components/Icon';
import Modal from '../components/Modal';
import Loader from '../components/Loader';
import Notice from '../components/Notice';
import Search from '../components/Search';
import Container from '../components/Container';

/** Template. */
import { desktopFundamentalContent, desktopTechnicalContent, mobileFundamentalContent, mobileTechnicalContent } from './template/Explorer';

/** Action. */
import { fetchStockExplorer } from '../actions/ExplorerActions';

const StockExplorer = () => {
  /** Use state. */
  const [notice, setNotice] = useState(false);

  /** Use selector. */
  const stockExplorerFetch = useSelector((state) => state.stockExplorerFetch);
  const { loading, stockexplorer } = stockExplorerFetch;

  const showMessage = useSelector((state) => state.showMessage);
  const { message, error } = showMessage;

  /** Use screen. */
  const { isMobile } = useScreen();

  /** Use dispatch. */
  const dispatch = useDispatch();

  /** Use effect. */
  useEffect(() => {
    /** Send request if no stocks. */
    if (!stockexplorer) {
      /** Dispatch action. */
      dispatch(fetchStockExplorer());
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
  }, [message, stockexplorer]);

  /** Container header for top stocks by fundamentals. */
  const fundamentalHeader = (
    <div className='flex flex-row flex-wrap justify-between items-center'>
      <div className='p-0'>
        <Icon id='trade' /> Fundamental Top Stocks
      </div>
    </div>
  );

  /** Container header for top stocks by technicals. */
  const technicalHeader = (
    <div className='flex flex-row flex-wrap justify-between items-center'>
      <div className='p-0'>
        <Icon id='trade' /> Technical Top Stocks
      </div>
    </div>
  );
  /** Return something. */
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Container header={fundamentalHeader}>
            <div className='grid auto-rows-min rounded-t-md bg-stone-100 text-[.65rem]'>
              {isMobile
                ? mobileFundamentalContent({ items: stockexplorer ? stockexplorer['fundamental'] : [] })
                : desktopFundamentalContent({ items: stockexplorer ? stockexplorer['fundamental'] : [] })}
            </div>
          </Container>
          <Container header={technicalHeader}>
            <div className='grid auto-rows-min rounded-t-md bg-stone-100 text-[.65rem]'>
              {isMobile
                ? mobileTechnicalContent({ items: stockexplorer ? stockexplorer['technical'] : [] })
                : desktopTechnicalContent({ items: stockexplorer ? stockexplorer['technical'] : [] })}
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default StockExplorer;
