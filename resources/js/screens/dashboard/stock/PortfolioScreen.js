/** React. */
import { useState } from 'react';

/** Hook. */
import useScreen from '../../../hooks/UseScreen';

/** Component. */
import Icon from '../../../components/Icon';
import Modal from '../../../components/Modal';
import Loader from '../../../components/Loader';
import Notice from '../../../components/Notice';
import Search from '../../../components/Search';
import Container from '../../../components/Container';

/** Template. */
import { desktopContent } from '../../template/stocks/Portfolio';

const Portfolio = () => {
  /** Use state. */
  const [search, setSearch] = useState(false);
  const [add, setAdd] = useState(false);

  /** Show search handler. */
  const showSearchHandler = () => {
    setSearch(true);
  };

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
      {desktopContent({ header: 'account', icon: 'portfolio' })}
      {desktopContent({ header: 'hold', icon: 'portfolio' })}
      {desktopContent({ header: 'order', icon: 'trade', text: 'add', action: showAddHandler })}
      {search && (
        <div className='grid auto-rows-min h-fit rounded'>
          <Modal>
            <Search close={closeModalHandler} />
          </Modal>
        </div>
      )}
      {add && (
        <div className='grid auto-rows-min h-fit rounded'>
          <Modal>
            <span onClick={closeModalHandler}>
              <Icon id='close' />
              <span className='pl-2'>Close</span>
            </span>
          </Modal>
        </div>
      )}
    </Container>
  );
};

export default Portfolio;
