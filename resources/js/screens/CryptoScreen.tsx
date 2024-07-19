/** Component. */
import Icon from '../components/Icon';
import Modal from '../components/Modal';
import Loader from '../components/Loader';
import Notice from '../components/Notice';
import Search from '../components/Search';
import Container from '../components/Container';

const CryptoExplorer = () => {
  /** Container header for top stocks by fundamentals. */
  const fundamentalHeader = (
    <div className='flex flex-row flex-wrap justify-between items-center'>
      <div className='p-0'>
        <Icon id='trade' /> Fundamental Top Coins
      </div>
    </div>
  );

  /** Container header for top stocks by technicals. */
  const technicalHeader = (
    <div className='flex flex-row flex-wrap justify-between items-center'>
      <div className='p-0'>
        <Icon id='trade' /> Technical Top Coins
      </div>
    </div>
  );
  /** Return something. */
  return (
    <>
      <Container header={fundamentalHeader}>
        <div className='grid auto-rows-min rounded-t-md bg-stone-100'>
          <p className='p-2'>Individual crypto item render.</p>
        </div>
      </Container>
      <Container header={technicalHeader}>
        <div className='grid auto-rows-min rounded-t-md bg-stone-100'>
          <p className='p-2'>Individual crypto item render.</p>
        </div>
      </Container>
    </>
  );
};

export default CryptoExplorer;
