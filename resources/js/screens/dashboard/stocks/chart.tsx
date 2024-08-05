/** Vendor. */
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

/** Hook. */
import { useAppDispatch, useAppSelector } from '$lib/hooks/use-rtk';
import useScreen from '$lib/hooks/use-screen';
import useProtect from '$lib/hooks/use-protect';

/** Action. */
import { stockChartRequest } from '$lib/store/feature/stock/chart-slice';

/** Component. */
import Icon from '$lib/components/icon';
import Loader from '$lib/components/loader';
import Pagination from '$lib/components/pagination';
import Notification from '$lib//components/notification';

const PortfolioChart = () => {
    // /** Use state. */
    // const [search, setSearch] = useState(false);
    // const [notice, setNotice] = useState(false);
    // const [store, setStore] = useState(false);
    // const [update, setUpdate] = useState(false);
    // const [updateData, setUpdateData] = useState();
    // const [destroy, setDestroy] = useState(false);
    // const [destroyData, setDestroyData] = useState();
    // /** Use selector. */
    // const userLogin = useSelector((state) => state.userLogin);
    // const { access_token } = userLogin;
    // const userToken = useSelector((state) => state.userToken);
    // const { valid } = userToken;
    // const portfolioStockFetch = useSelector((state) => state.portfolioStockFetch);
    // const { loading, portfolio } = portfolioStockFetch;
    // const showMessage = useSelector((state) => state.showMessage);
    // const { message, error } = showMessage;
    // /** Map html element to validate hook. */
    // const {
    //     value: order,
    //     hasError: orderHasError,
    //     isValid: orderIsValid,
    //     valueChangeHandler: orderChangeHandler,
    //     inputBlurHandler: orderBlurHandler,
    //     resetHandler: orderInputReset,
    // } = useValidate((value) => value.trim() !== '' && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/));
    // const {
    //     value: symbol,
    //     hasError: symbolHasError,
    //     isValid: symbolIsValid,
    //     valueChangeHandler: symbolChangeHandler,
    //     inputBlurHandler: symbolBlurHandler,
    //     resetHandler: symbolInputReset,
    // } = useValidate((value) => value.trim() !== '' && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/));
    // const {
    //     value: fee,
    //     hasError: feeHasError,
    //     isValid: feeIsValid,
    //     valueChangeHandler: feeChangeHandler,
    //     inputBlurHandler: feeBlurHandler,
    //     resetHandler: feeInputReset,
    // } = useValidate((value) => value.trim() !== '' && value.match(/^[0-9.]*$/));
    // const {
    //     value: share,
    //     hasError: shareHasError,
    //     isValid: shareIsValid,
    //     valueChangeHandler: shareChangeHandler,
    //     inputBlurHandler: shareBlurHandler,
    //     resetHandler: shareInputReset,
    // } = useValidate((value) => value.trim() !== '' && value.match(/^[0-9.]*$/));
    // const {
    //     value: capital,
    //     hasError: capitalHasError,
    //     isValid: capitalIsValid,
    //     valueChangeHandler: capitalChangeHandler,
    //     inputBlurHandler: capitalBlurHandler,
    //     resetHandler: capitalInputReset,
    // } = useValidate((value) => value.trim() !== '' && value.match(/^[0-9.]*$/));
    // /** Set overall form validity. */
    // let formIsValid = false;
    // if (orderIsValid && symbolIsValid && feeIsValid && shareIsValid && capitalIsValid) {
    //     formIsValid = true;
    // }
    // /** Change class logic if valid or otherwise. */
    // const orderInputClasses = orderHasError ? 'alert-border-warning' : '';
    // const symbolInputClasses = symbolHasError ? 'alert-border-warning' : '';
    // const feeInputClasses = feeHasError ? 'alert-border-warning' : '';
    // const shareInputClasses = shareHasError ? 'alert-border-warning' : '';
    // const capitalInputClasses = capitalHasError ? 'alert-border-warning' : '';
    // /** Use screen. */
    // const { isMobile } = useScreen();
    // /** Use dispatch. */
    // const dispatch = useDispatch();
    // /** Use navigate. */
    // const navigate = useNavigate();
    // /** Use effect. */
    // useEffect(() => {
    //     /** Check valid state. */
    //     if (!valid && access_token) {
    //         dispatch(tokenUser(access_token));
    //     }
    //     /** Check if token is valid. */
    //     if (valid && access_token) {
    //         navigate('/dashboard/stock-portfolio');
    //     } else {
    //         navigate('/auth/login');
    //     }
    //     /** Send request if no stocks. */
    //     if (valid && !portfolio) {
    //         /** Dispatch action. */
    //         dispatch(fetchStockPortfolio(access_token));
    //     }
    //     /** Monitor new message. */
    //     if (message) {
    //         /** Set state. */
    //         setNotice(true);
    //         /** Reset state. */
    //         setTimeout(() => {
    //             setNotice(false);
    //         }, 5000);
    //     }
    // }, [access_token, valid, isMobile, portfolio, message]);
    // /** Submit handler. */
    // const storeHandler = (event) => {
    //     /** Prevent browser default behaviour */
    //     event.preventDefault();
    //     /** Change blur state. */
    //     orderBlurHandler(true);
    //     symbolBlurHandler(true);
    //     feeBlurHandler(true);
    //     shareBlurHandler(true);
    //     capitalBlurHandler(true);
    //     /** Check if there is invalid input. */
    //     if (!orderIsValid && !symbolIsValid && !feeIsValid && !shareIsValid && !capitalIsValid) {
    //         return;
    //     }
    //     /** Dispatch action. */
    //     dispatch(storeStockPortfolio(access_token, order, symbol, share, capital, fee));
    //     /** Reset input. */
    //     orderInputReset();
    //     symbolInputReset();
    //     feeInputReset();
    //     shareInputReset();
    //     capitalInputReset();
    //     /** Hide modal. */
    //     setStore(false);
    //     /** Update state after timeout. */
    //     const timeout = setTimeout(() => {
    //         /** Dispatch action. */
    //         dispatch(fetchStockPortfolio(access_token));
    //     }, 5000);
    //     return () => {
    //         clearTimeout(timeout);
    //     };
    // };
    // /** Destory handler. */
    // const updateHandler = (event) => {
    //     /** Prevent browser default behaviour */
    //     event.preventDefault();
    //     /** Change blur state. */
    //     orderBlurHandler(true);
    //     symbolBlurHandler(true);
    //     feeBlurHandler(true);
    //     shareBlurHandler(true);
    //     capitalBlurHandler(true);
    //     /** Check if there is invalid input. */
    //     if (!orderIsValid && !symbolIsValid && !feeIsValid && !shareIsValid && !capitalIsValid) {
    //         return;
    //     }
    //     /** Dispatch action. */
    //     dispatch(updateStockPortfolio(access_token, order, symbol, share, capital, fee));
    //     /** Reset input. */
    //     orderInputReset();
    //     symbolInputReset();
    //     feeInputReset();
    //     shareInputReset();
    //     capitalInputReset();
    //     /** Hide modal. */
    //     setUpdate(false);
    //     /** Update state after timeout. */
    //     const timeout = setTimeout(() => {
    //         /** Dispatch action. */
    //         dispatch(fetchStockPortfolio(access_token));
    //     }, 5000);
    //     return () => {
    //         clearTimeout(timeout);
    //     };
    // };
    // /** Destory handler. */
    // const destroyHandler = () => {
    //     /** Dispatch action. */
    //     dispatch(destroyStockPortfolio(access_token, destroyData));
    //     /** Hide modal. */
    //     setDestroy(false);
    //     /** Update state after timeout. */
    //     const timeout = setTimeout(() => {
    //         /** Dispatch action. */
    //         dispatch(fetchStockPortfolio(access_token));
    //     }, 5000);
    //     return () => {
    //         clearTimeout(timeout);
    //     };
    // };
    // /** Show search handler. */
    // const showSearchHandler = () => {
    //     setSearch(true);
    // };
    // /** Show store handler. */
    // const showStoreHandler = () => {
    //     setStore(true);
    // };
    // /** Show update handler. */
    // const showUpdateHandler = (item) => {
    //     /** Show modal. */
    //     setUpdate(true);
    //     /** Check if item is set. */
    //     if (item) {
    //         /** Set modal data. */
    //         setUpdateData(item);
    //     }
    // };
    // /** Show destroy handler. */
    // const showDestroyteHandler = (symbol) => {
    //     /** Show modal. */
    //     setDestroy(true);
    //     /** Check if symbol is set. */
    //     if (symbol) {
    //         /** Set modal data. */
    //         setDestroyData(symbol);
    //     }
    // };
    // /** Hide search handler. */
    // const closeModalHandler = () => {
    //     /** Set state. */
    //     setSearch(false);
    //     setStore(false);
    //     setUpdate(false);
    //     setDestroy(false);
    // };
    // /** Container header for common. */
    // const containerHeader = (
    //     <div className='flex flex-row flex-wrap justify-between items-center'>
    //         <div className='p-0'>
    //             <Icon id='trade' /> Portfolio
    //         </div>
    //         <div className='p-0'>
    //             <span className='p-2 cursor-pointer' onClick={showSearchHandler}>
    //                 <Icon id='search' /> Search
    //             </span>
    //         </div>
    //     </div>
    // );
    // /** Return something. */
    // return (
    //     <Container header={containerHeader}>
    //         {error && <Notice variant='alert-warning' children={error} duration={3000} show={notice} />}
    //         {message && <Notice variant='alert-success' children={message} duration={3000} show={notice} />}
    //         {loading ? (
    //             <Loader />
    //         ) : (
    //             <>
    //         <div className='grid auto-rows-min h-fit rounded'>
    //             {store && (
    //                 <Modal>
    //                     <div className='grid auto-rows-min rounded-t-md bg-stone-100'>
    //                         <div className='flex flex-row flex-wrap justify-between items-center border-b border-stone-200 uppercase'>
    //                             <p className='p-2'>Add Record</p>
    //                             <p className='p-2 cursor-pointer' onClick={closeModalHandler}>
    //                                 <Icon id='close' /> <span className='pl-2'>Close</span>
    //                             </p>
    //                         </div>
    //                         <form classNams='form-group border border-green-500' onSubmit={storeHandler}>
    //                             <div className='p-2 form-control'>
    //                                 <label className='form-label uppercase' htmlFor='order'>
    //                                     Order
    //                                 </label>
    //                                 <select
    //                                     className={`p-2 form-input uppercase ${orderInputClasses}`}
    //                                     onChange={orderChangeHandler}
    //                                     onBlur={orderBlurHandler}>
    //                                     <option value=''></option>
    //                                     <option value='buy'>Buy</option>
    //                                     <option value='sell'>Sell</option>
    //                                 </select>
    //                                 {orderHasError && (
    //                                     <p className='form-alert text-red-500'>Please select a valid order.</p>
    //                                 )}
    //                             </div>
    //                             <div className='p-2 form-control'>
    //                                 <label className='form-label uppercase' htmlFor='symbol'>
    //                                     Symbol
    //                                 </label>
    //                                 <input
    //                                     className={`p-2 form-input uppercase ${symbolInputClasses}`}
    //                                     type='text'
    //                                     id='symbol'
    //                                     name='symbol'
    //                                     value={symbol}
    //                                     onChange={symbolChangeHandler}
    //                                     onBlur={symbolBlurHandler}
    //                                     autoComplete='off'
    //                                 />
    //                                 {symbolHasError && (
    //                                     <p className='form-alert text-red-500'>Please select a valid symbol.</p>
    //                                 )}
    //                             </div>
    //                             <div className='p-2 form-control'>
    //                                 <label className='form-label uppercase' htmlFor='share'>
    //                                     Share
    //                                 </label>
    //                                 <input
    //                                     className={`p-2 form-input uppercase ${shareInputClasses}`}
    //                                     type='number'
    //                                     id='share'
    //                                     name='share'
    //                                     value={share}
    //                                     onChange={shareChangeHandler}
    //                                     onBlur={shareBlurHandler}
    //                                     autoComplete='off'
    //                                 />
    //                                 {shareHasError && (
    //                                     <p className='form-alert text-red-500'>Please select a valid share.</p>
    //                                 )}
    //                             </div>
    //                             <div className='p-2 form-control'>
    //                                 <label className='form-label uppercase' htmlFor='capital'>
    //                                     Capital
    //                                 </label>
    //                                 <input
    //                                     className={`p-2 form-input uppercase ${capitalInputClasses}`}
    //                                     type='number'
    //                                     id='capital'
    //                                     name='capital'
    //                                     value={capital}
    //                                     onChange={capitalChangeHandler}
    //                                     onBlur={capitalBlurHandler}
    //                                     autoComplete='off'
    //                                 />
    //                                 {capitalHasError && (
    //                                     <p className='form-alert text-red-500'>Please select a valid capital.</p>
    //                                 )}
    //                             </div>
    //                             <div className='p-2 form-control'>
    //                                 <label className='form-label uppercase' htmlFor='fee'>
    //                                     fee
    //                                 </label>
    //                                 <input
    //                                     className={`p-2 form-input uppercase ${feeInputClasses}`}
    //                                     type='number'
    //                                     id='fee'
    //                                     name='fee'
    //                                     value={fee}
    //                                     onChange={feeChangeHandler}
    //                                     onBlur={feeBlurHandler}
    //                                     autoComplete='off'
    //                                 />
    //                                 {feeHasError && (
    //                                     <p className='form-alert text-red-500'>Please select a valid fee.</p>
    //                                 )}
    //                             </div>
    //                             <div className='form-button'>
    //                                 <div className='p-2'>
    //                                     <button
    //                                         className='btn btn-green cursor-pointer'
    //                                         type='submit'
    //                                         onClick={storeHandler}
    //                                         disabled={!formIsValid}>
    //                                         Submit
    //                                     </button>
    //                                 </div>
    //                                 <div className='p-2'>
    //                                     <button
    //                                         className='btn btn-stone cursor-pointer'
    //                                         type='button'
    //                                         onClick={closeModalHandler}>
    //                                         Cancel
    //                                     </button>
    //                                 </div>
    //                             </div>
    //                         </form>
    //                     </div>
    //                 </Modal>
    //             )}
    //         </div>
    //         <div className='grid auto-rows-min h-fit rounded'>
    //             {update && (
    //                 <Modal>
    //                     <div className='grid auto-rows-min rounded-t-md bg-stone-100'>
    //                         <div className='flex flex-row flex-wrap justify-between items-center border-b border-stone-200 uppercase'>
    //                             <p className='p-2'>Update Record</p>
    //                             <p className='p-2 cursor-pointer' onClick={closeModalHandler}>
    //                                 <Icon id='close' /> <span className='pl-2'>Close</span>
    //                             </p>
    //                         </div>
    //                         <form classNams='form-group border border-green-500' onSubmit={updateHandler}>
    //                             <div className='p-2 form-control'>
    //                                 <label className='form-label uppercase' htmlFor='order'>
    //                                     Order
    //                                 </label>
    //                                 <select
    //                                     className={`p-2 form-input uppercase ${orderInputClasses}`}
    //                                     onClick={(e) => orderChangeHandler(e)}
    //                                     onChange={orderChangeHandler}
    //                                     onBlur={orderBlurHandler}>
    //                                     <option value={order ? order : updateData['order']}>
    //                                         {order ? order : updateData['order']}
    //                                     </option>
    //                                     <option value='buy'>Buy</option>
    //                                     <option value='sell'>Sell</option>
    //                                 </select>
    //                                 {orderHasError && (
    //                                     <p className='form-alert text-red-500'>Please select a valid order.</p>
    //                                 )}
    //                             </div>
    //                             <div className='p-2 form-control'>
    //                                 <label className='form-label uppercase' htmlFor='symbol'>
    //                                     Symbol
    //                                 </label>
    //                                 <input
    //                                     className={`p-2 form-input uppercase ${symbolInputClasses}`}
    //                                     type='text'
    //                                     id='symbol'
    //                                     name='symbol'
    //                                     value={symbol ? symbol : updateData['symbol']}
    //                                     onClick={(e) => symbolChangeHandler(e)}
    //                                     onChange={symbolChangeHandler}
    //                                     onBlur={symbolBlurHandler}
    //                                     autoComplete='off'
    //                                 />
    //                                 {symbolHasError && (
    //                                     <p className='form-alert text-red-500'>Please select a valid symbol.</p>
    //                                 )}
    //                             </div>
    //                             <div className='p-2 form-control'>
    //                                 <label className='form-label uppercase' htmlFor='share'>
    //                                     Share
    //                                 </label>
    //                                 <input
    //                                     className={`p-2 form-input uppercase ${shareInputClasses}`}
    //                                     type='number'
    //                                     id='share'
    //                                     name='share'
    //                                     value={share ? share : updateData['share'].replace(/,/g, '')}
    //                                     onClick={(e) => shareChangeHandler(e)}
    //                                     onChange={shareChangeHandler}
    //                                     onBlur={shareBlurHandler}
    //                                     autoComplete='off'
    //                                 />
    //                                 {shareHasError && (
    //                                     <p className='form-alert text-red-500'>Please select a valid share.</p>
    //                                 )}
    //                             </div>
    //                             <div className='p-2 form-control'>
    //                                 <label className='form-label uppercase' htmlFor='capital'>
    //                                     Capital
    //                                 </label>
    //                                 <input
    //                                     className={`p-2 form-input uppercase ${capitalInputClasses}`}
    //                                     type='number'
    //                                     id='capital'
    //                                     name='capital'
    //                                     value={capital ? capital : updateData['capital'].replace(/,/g, '')}
    //                                     onClick={(e) => capitalChangeHandler(e)}
    //                                     onChange={capitalChangeHandler}
    //                                     onBlur={capitalBlurHandler}
    //                                     autoComplete='off'
    //                                 />
    //                                 {capitalHasError && (
    //                                     <p className='form-alert text-red-500'>Please select a valid capital.</p>
    //                                 )}
    //                             </div>
    //                             <div className='p-2 form-control'>
    //                                 <label className='form-label uppercase' htmlFor='fee'>
    //                                     fee
    //                                 </label>
    //                                 <input
    //                                     className={`p-2 form-input uppercase ${feeInputClasses}`}
    //                                     type='number'
    //                                     id='fee'
    //                                     name='fee'
    //                                     value={fee ? fee : updateData['fee'].replace(/,/g, '')}
    //                                     onClick={(e) => feeChangeHandler(e)}
    //                                     onChange={feeChangeHandler}
    //                                     onBlur={feeBlurHandler}
    //                                     autoComplete='off'
    //                                 />
    //                                 {feeHasError && (
    //                                     <p className='form-alert text-red-500'>Please select a valid fee.</p>
    //                                 )}
    //                             </div>
    //                             <div className='form-button'>
    //                                 <div className='p-2'>
    //                                     <button
    //                                         className='btn btn-green cursor-pointer'
    //                                         type='submit'
    //                                         onClick={updateHandler}
    //                                         disabled={!formIsValid}>
    //                                         Update
    //                                     </button>
    //                                 </div>
    //                                 <div className='p-2'>
    //                                     <button
    //                                         className='btn btn-stone cursor-pointer'
    //                                         type='button'
    //                                         onClick={closeModalHandler}>
    //                                         Cancel
    //                                     </button>
    //                                 </div>
    //                             </div>
    //                         </form>
    //                     </div>
    //                 </Modal>
    //             )}
    //         </div>
    //         <div className='grid auto-rows-min h-fit rounded'>
    //             {destroy && (
    //                 <Modal>
    //                     <div className='grid auto-rows-min rounded-t-md bg-stone-100'>
    //                         <div className='flex flex-row flex-wrap justify-between items-center border-b border-stone-200 uppercase'>
    //                             <p className='p-2'>Delete Record</p>
    //                             <p className='p-2 cursor-pointer' onClick={closeModalHandler}>
    //                                 <Icon id='close' /> <span className='pl-2'>Close</span>
    //                             </p>
    //                         </div>
    //                         <div className='form-prompt'>
    //                             <p className='form-label'>
    //                                 Do you really want to remove {destroyData} from the order table?
    //                             </p>
    //                         </div>
    //                         <div className='form-button'>
    //                             <div className='p-2'>
    //                                 <button
    //                                     className='btn btn-green cursor-pointer'
    //                                     type='submit'
    //                                     onClick={() => destroyHandler()}>
    //                                     Delete
    //                                 </button>
    //                             </div>
    //                             <div className='p-2'>
    //                                 <button
    //                                     className='btn btn-stone cursor-pointer'
    //                                     type='button'
    //                                     onClick={closeModalHandler}>
    //                                     Cancel
    //                                 </button>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </Modal>
    //             )}
    //         </div>
    //     </Container>
    // );

    /** Use params. */
    const { page } = useParams();
    const currentPage = Number(page) || 1;

    /** Use screen hook. */
    const isMobile = useScreen();

    /** Use navigate. */
    const navigate = useNavigate();

    /** Use protect. */
    useProtect();

    /** Use selector. */
    const auth = useAppSelector((state) => state.auth);
    const { valid, access_token } = auth;

    /** Use selector. */
    const stockChart = useAppSelector((state) => state.stockChart);
    const { loading, show_message, message, status, pages, stocks } = stockChart;

    /** Use dispatch. */
    const dispatch = useAppDispatch();

    /** Use effect. */
    useEffect(() => {
        /** If no page is provided, redirect to page 1 */
        if (!page) {
            navigate('/dashboard/stock-chart', { replace: true });
        }

        /** Navigate to login if is not valid. */
        if (!stocks) {
            dispatch(stockChartRequest({ page: currentPage, token: access_token, section: 'fetch', statement: 'select' }));
        }

        /** Navigate to login if is not valid. */
        if (!valid) {
            navigate('/auth/login');
        }
    }, [valid, page]);

    /** Pagination handler. */
    const paginationHandler = (pageNumber: number) => {
        /** Dispatch request on reload. */
        dispatch(stockChartRequest({ page: currentPage, token: access_token, section: 'fetch', statement: 'select' }));
    };

    /** Return something. */
    return (
        <>
            {show_message && message && <Notification children={message} duration={5000} status={status ? status : 200} />}
            {loading ? (
                <Loader />
            ) : (
                <>
                    <section className='m-2 grid auto-rows-min h-fit animate-fade animate-once animate-ease-in-out'>
                        <div className='p-2 h-8 sm:10 uppercase'>Chart</div>
                        <div className='grid auto-rows-min h-fit rounded-t-md bg-stone-100 uppercase my-2'>
                            <div className='flex flex-wrap flex-col sm:flex-row gap-2 justify-between items-center h-fit border-b border-stone-200'>
                                <div className='flex flex-row flex-wrap justify-between items-center w-full'>
                                    <div className='p-2'>
                                        <Icon id='trade' width='w-6' height='h-6' /> Stocks
                                    </div>
                                    <div className='p-2'>
                                        <span className='p-2 cursor-pointer text-xs' onClick={() => console.log('showSearchHandler')}>
                                            <Icon id='search' width='w-6' height='h-6' /> Search
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {isMobile ? (
                                ''
                            ) : (
                                <div className='p-2 flex flex-wrap flex-col sm:flex-row gap-2 justify-start items-center w-full h-fit border-b border-stone-200 font-thin text-[.5rem]'>
                                    <div className='flex-1'>Symbol</div>
                                    <div className='flex-1'>Price</div>
                                    <div className='flex-1'>Value</div>
                                    <div className='flex-1'>Range</div>
                                    <div className='flex-1'>Change</div>
                                    <div className='flex-1'>Support</div>
                                    <div className='flex-1'>Resistance</div>
                                    <div className='flex-1'>Average</div>
                                    <div className='flex-1'>Signal</div>
                                    <div className='flex-1'>Action</div>
                                </div>
                            )}

                            {stocks &&
                                stocks.map((item: any) => {
                                    return (
                                        <div className='p-2 flex flex-wrap flex-col sm:flex-row gap-2 justify-start items-center w-full h-fit border-b border-stone-200 font-thin text-xs'>
                                            <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                                                {isMobile ? (
                                                    <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>
                                                        Symbol
                                                    </div>
                                                ) : (
                                                    ' '
                                                )}
                                                <p className='text-center sm:text-left'>{item.symbol}</p>
                                            </div>
                                            <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                                                {isMobile ? (
                                                    <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>
                                                        Price
                                                    </div>
                                                ) : (
                                                    ' '
                                                )}
                                                <p className='text-center sm:text-left uppercase'>{item.price}</p>
                                            </div>
                                            <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                                                {isMobile ? (
                                                    <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>
                                                        Value
                                                    </div>
                                                ) : (
                                                    ' '
                                                )}
                                                <p className='text-center sm:text-left'>{item.value}</p>
                                            </div>
                                            <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                                                {isMobile ? (
                                                    <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>
                                                        Range
                                                    </div>
                                                ) : (
                                                    ' '
                                                )}
                                                <p className='text-center sm:text-left'>{item.pricerange}</p>
                                            </div>
                                            <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                                                {isMobile ? (
                                                    <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>
                                                        Change
                                                    </div>
                                                ) : (
                                                    ' '
                                                )}
                                                <p className='text-center sm:text-left'>{item.change}</p>
                                            </div>
                                            <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                                                {isMobile ? (
                                                    <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>
                                                        Support
                                                    </div>
                                                ) : (
                                                    ' '
                                                )}
                                                <p className='text-center sm:text-left'>{item.supportlevel}</p>
                                            </div>
                                            <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                                                {isMobile ? (
                                                    <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>
                                                        Resistance
                                                    </div>
                                                ) : (
                                                    ' '
                                                )}
                                                <p className='text-center sm:text-left'>{item.resistancelevel}</p>
                                            </div>
                                            <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                                                {isMobile ? (
                                                    <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>
                                                        Average
                                                    </div>
                                                ) : (
                                                    ' '
                                                )}
                                                <p className='text-center sm:text-left'>{item.movingaverage}</p>
                                            </div>
                                            <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                                                {isMobile ? (
                                                    <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>
                                                        Signal
                                                    </div>
                                                ) : (
                                                    ' '
                                                )}
                                                <p className='text-center sm:text-left'>{item.movingsignal}</p>
                                            </div>
                                            <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                                                {isMobile ? (
                                                    <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>
                                                        Action
                                                    </div>
                                                ) : (
                                                    ' '
                                                )}
                                                <span className='pr-2 cursor-pointer hover:text-green-500' onClick={() => console.log('Update')}>
                                                    <Icon id='update' width='w-4' height='h-4' /> {isMobile ? ' ' : 'UPD'}
                                                </span>
                                                <span className='pr-0 cursor-pointer hover:text-red-500' onClick={() => console.log('Destroy')}>
                                                    <Icon id='destroy' width='w-4' height='h-4' /> {isMobile ? ' ' : 'DEL'}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </section>
                </>
            )}

            <Pagination pages={pages} target='/dashboard/stock-chart' handler={paginationHandler} current={currentPage} />
        </>
    );
};

export default PortfolioChart;
