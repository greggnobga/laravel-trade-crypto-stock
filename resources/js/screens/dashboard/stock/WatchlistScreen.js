/** React. */
import { useState, useEffect } from 'react'

/** Vendor. */
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

/** Hook. */
import useScreen from '../../../hooks/UseScreen'

/** Component. */
import Icon from '../../../components/Icon'
import Modal from '../../../components/Modal'
import Loader from '../../../components/Loader'
import Notice from '../../../components/Notice'
import Search from '../../../components/Search'
import Container from '../../../components/Container'

/** Template. */
import {
  desktopHeader,
  desktopTemplate,
  mobileTemplate,
  desktopModalTemplate,
  mobileModalTemplate,
} from '../../template/Stocks'

/** Action. */
import {
  actStockWatchBuild,
  actStockWatchStore,
  actStockWatchFetch,
  actStockWatchDestroy,
} from '../../../actions/StockActions'
import { tokenUser } from '../../../actions/UserActions.js'

const Watchlist = () => {
  /** Use state. */
  const [modalBuild, setModalBuild] = useState(false)
  const [modalSearch, setModalSearch] = useState(false)
  const [notice, setNotice] = useState(false)

  /** Use selector. */
  const userLogin = useSelector((state) => state.userLogin)
  const { access_token } = userLogin

  const userToken = useSelector((state) => state.userToken)
  const { valid } = userToken

  const stockWatchBuild = useSelector((state) => state.stockWatchBuild)
  const { loading: loadBuild, build } = stockWatchBuild

  const stockWatchFetch = useSelector((state) => state.stockWatchFetch)
  const { loading: loadFetch, watchlist } = stockWatchFetch

  const showMessage = useSelector((state) => state.showMessage)
  const { message, error } = showMessage

  /** Use screen helper. */
  const { isMobile } = useScreen()

  /** Use navigate. */
  const navigate = useNavigate()

  /** Show modal handler. */
  const showModalBuildHandler = () => {
    setModalBuild(true)
  }

  const showModalSearchHandler = () => {
    setModalSearch(true)
  }

  /** Close modal handler. */
  const closeModalHandler = () => {
    /** Hide modal. */
    setModalBuild(false)
    setModalSearch(false)

    /** Update state after timeout. */
    const timeout = setTimeout(() => {
      /** Dispatch fetch to update the state. */
      dispatch(actStockWatchFetch(access_token))
    }, 3000)

    return () => {
      clearTimeout(timeout)
    }
  }

  /** Store handler. */
  const storeHandler = (symbol) => {
    /** Dispatch store action. */
    dispatch(actStockWatchStore(access_token, symbol))
  }

  /** Delete handler. */
  const deleteHandler = (symbol) => {
    /** Dispatch delete action. */
    dispatch(actStockWatchDestroy(access_token, symbol))

    const timeout = setTimeout(() => {
      /** Dispatch fetch to update the state. */
      dispatch(actStockWatchFetch(access_token))
    }, 3000)

    return () => {
      clearTimeout(timeout)
    }
  }

  /** Use dispatch. */
  const dispatch = useDispatch()

  /** Use effect. */
  useEffect(() => {
    /** Check valid state. */
    if (!valid && access_token) {
      dispatch(tokenUser(access_token))
    }

    /** Check if token is valid. */
    if (valid && access_token) {
      navigate('/dashboard/stock-watchlist')
    } else {
      navigate('/auth/login')
    }

    /** Send request if no build stock. */
    if (valid && !build) {
      /** Dispatch action. */
      dispatch(actStockWatchBuild(access_token))
    }

    /** Send request if no watchlist stock. */
    if (valid && !watchlist) {
      /** Dispatch action. */
      dispatch(actStockWatchFetch(access_token))
    }
    /** Monitor new message. */
    if (message) {
      /** Set state. */
      setNotice(true)

      /** Reset state. */
      setTimeout(() => {
        setNotice(false)
      }, 3000)
    }
  }, [access_token, valid, build, watchlist, message])

  /** Container header. */
  const containerWatchlistHeader = (
    <div className='flex flex-row justify-between'>
      <p clasName='block p-2'>
        <Icon id='trade' /> Watchlist
      </p>
      <p className='block p-2 cursor-pointer -mt-2'>
        <span className='mr-4' onClick={showModalSearchHandler}>
          <Icon id='search' /> Search
        </span>
        <span onClick={showModalBuildHandler}>
          <Icon id='build' /> Build
        </span>
      </p>
    </div>
  )

  /** Container header. */
  const containerReminderHeader = (
    <span clasName='block p-2'>
      <Icon id='support' /> Reminder
    </span>
  )

  /** Return something. */
  return (
    <>
      {/**Show error. */}
      {error && <Notice variant='alert-warning' children={error} duration={3000} show={notice} />}

      {/**Show message. */}
      {message && <Notice variant='alert-success' children={message} duration={3000} show={notice} />}

      {/** Reminder section. */}
      <Container header={containerReminderHeader}>
        <div className='rounded-t-md bg-slate-50 cursor-pointer'>
          <div className='p-2 border-b border-slate-100 hover:text-purple-500'>
            Debt Asset Ratio - Always try to find a company to invest which has debt equity ratio of less than one.
          </div>
          <div className='p-2 border-b border-slate-100 hover:text-purple-500'>
            Price Range - Year low minus year high, when the range is getting near to zero or even turning positive, it
            indicates that the price is going down and that it is a good idea to add to your stack.
          </div>
          <div className='p-2 border-b border-slate-100 hover:text-purple-500'>
            Total Assets - Total assets less total assets previously held If it's negative, either the company is having
            a cash flow problem or it's having a bad year.
          </div>
          <div className='p-2 hover:text-purple-500'>
            Dividend Yield - Is the amount of money a company pays shareholders for owning a share of its stock divided
            by its current stock price.
          </div>
        </div>
      </Container>

      {/** Watchlist section. */}
      <Container header={containerWatchlistHeader}>
        <div className='grid auto-rows-min h-fit rounded'>
          {isMobile
            ? modalBuild && (
                <Modal>
                  {loadBuild ? (
                    <Loader />
                  ) : (
                    build &&
                    Object.entries(build).map((item) => {
                      return mobileModalTemplate({
                        item: item,
                        text: 'add',
                        icon: 'add',
                        close: closeModalHandler,
                        action: storeHandler,
                      })
                    })
                  )}
                </Modal>
              )
            : modalBuild && (
                <Modal>
                  {loadBuild ? (
                    <Loader />
                  ) : (
                    build &&
                    Object.entries(build).map((item) => {
                      return desktopModalTemplate({
                        item: item,
                        text: 'add',
                        icon: 'add',
                        close: closeModalHandler,
                        action: storeHandler,
                      })
                    })
                  )}
                </Modal>
              )}
        </div>
        <div className='grid auto-rows-min h-fit rounded'>
          {modalSearch && (
            <Modal>
              <Search close={closeModalHandler} items={watchlist} />
            </Modal>
          )}
        </div>
        <div className='grid auto-rows-min h-fit rounded'>
          {isMobile ? (
            loadFetch ? (
              <Loader />
            ) : (
              <>
                {watchlist &&
                  watchlist.map((item) => {
                    return mobileTemplate({
                      item: item,
                      text: 'del',
                      icon: 'destroy',
                      action: deleteHandler,
                    })
                  })}
              </>
            )
          ) : loadFetch ? (
            <Loader />
          ) : (
            <>
              {desktopHeader}
              {watchlist &&
                watchlist.map((item) => {
                  return desktopTemplate({
                    item: item,
                    text: 'del',
                    icon: 'destroy',
                    action: deleteHandler,
                  })
                })}
            </>
          )}
        </div>
      </Container>
    </>
  )
}

export default Watchlist
