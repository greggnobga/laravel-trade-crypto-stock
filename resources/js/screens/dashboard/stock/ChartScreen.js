/** React. */
import { useState } from 'react'

/** Vendor. */
import { useDispatch, useSelector } from 'react-redux'

/** Component. */
import Icon from '../../../components/Icon'
import Modal from '../../../components/Modal'
import Loader from '../../../components/Loader'
import Notice from '../../../components/Notice'
import Search from '../../../components/Search'
import Container from '../../../components/Container'

/** Template. */
import { desktopHeader } from '../../template/Chart'

const StockChart = () => {
  /** Use state. */
  const [modalSearch, setModalSearch] = useState(false)
  const [modalBuild, setModalBuild] = useState(false)

  /** Use selector. */
  const stockCommon = useSelector((state) => state.stockCommon)
  const { loading: loadcommon, common } = stockCommon

  /** Show modal handler. */
  const showModalSearchHandler = () => {
    console.log('Show modal search.')
    setModalSearch(true)
  }

  const showModalBuildHandler = () => {
    console.log('Show modal build.')
    setModalBuild(true)
  }

  /** Close modal handler. */
  const closeModalHandler = () => {
    /** Hide modal. */
    setModalSearch(false)
    setModalBuild(false)
  }

  const searchHandler = () => {
    setSearch(!search)
  }

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
  )

  return (
    <>
      <Container header={containerChartHeader}>
        {desktopHeader}
        <div className='grid auto-rows-min grid-cols-9 h-fit bg-stone-100'>
          <div className='py-2 text-center'>Test 1</div>
          <div className='py-2 text-center'>Test 2</div>
          <div className='py-2 text-center'>Test 3</div>
          <div className='py-2 text-center'>Test 4</div>
          <div className='py-2 text-center'>Test 5</div>
          <div className='py-2 text-center'>Test 6</div>
          <div className='py-2 text-center'>Test 7</div>
          <div className='py-2 text-center'>Test 8</div>
          <div className='py-2 text-center'>Test 9</div>
        </div>
        <div className='grid auto-rows-min h-fit rounded'>
          {modalSearch && (
            <Modal>
              <Search close={closeModalHandler} />
            </Modal>
          )}
        </div>
        <div className='grid auto-rows-min h-fit rounded'>
          {modalBuild && (
            <Modal>
              <div className='grid auto-rows-min h-fit rounded-t-md bg-stone-100 uppercase'>
                <div className='p-2 flex flex-row justify-between border-b border-stone-200'>
                  <h1 className='text-xl'>Fetch Moving Average</h1>
                  <p className='sm:pl-2 cursor-pointer' onClick={closeModalHandler}>
                    <Icon id='close' /> <span className='invisible sm:visible'>Close</span>
                  </p>
                </div>
                <div className='p-2 flex flex-row items-center justify-center border-b border-stone-200 w-full hover:text-purple-500'>
                  <div className='w-4/12'>Index</div>
                  <div className='w-4/12'>Symbol</div>
                  <div className='w-4/12'>Action</div>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </Container>
    </>
  )
}

export default StockChart
