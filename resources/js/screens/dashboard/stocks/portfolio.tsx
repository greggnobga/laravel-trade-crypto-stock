/** Vendor. */
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

/** Hook. */
import { useAppDispatch, useAppSelector } from '$lib/hooks/use-rtk';
import useScreen from '$lib/hooks/use-screen';
import useProtect from '$lib/hooks/use-protect';

/** Action. */
import { stockPortfolioRequest } from '$lib/store/feature/stock/portfolio-slice';

/** Component. */
import Icon from '$lib/components/icon';
import Loader from '$lib/components/loader';
import Pagination from '$lib/components/pagination';
import Notification from '$lib//components/notification';

const PortfolioStock = () => {
    // /** Use state. */
    // const [search, setSearch] = useState(false);
    // const [destroy, setDestroy] = useState(false);
    // const [destroyData, setDestroyData] = useState();
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
    // /** Return something. */
    // return (
    //     <Container header={containerHeader}>
    //         <div className='grid auto-rows-min h-fit rounded'>
    //             {search && (
    //                 <Modal>
    //                     <Search
    //                         close={closeModalHandler}
    //                         component='portfolio'
    //                         items={portfolio ? portfolio['hold'] : []}
    //                     />
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
    const stockPorfolio = useAppSelector((state) => state.stockPorfolio);
    const { loading, show_message, message, status, pages, hold, order } = stockPorfolio;

    /** Use dispatch. */
    const dispatch = useAppDispatch();

    /** Use effect. */
    useEffect(() => {
        /** If no page is provided, redirect to page 1 */
        if (!page) {
            navigate('/dashboard/stock-portfolio', { replace: true });
        }

        /** Navigate to login if is not valid. */
        if (!hold) {
            dispatch(stockPortfolioRequest({ page: currentPage, token: access_token, section: 'fetch' }));
        }

        /** Navigate to login if is not valid. */
        if (!valid) {
            navigate('/auth/login');
        }
    }, [valid, hold, page]);

    /** Pagination handler. */
    const paginationHandler = (pageNumber: number) => {
        /** Dispatch request on reload. */
        dispatch(stockPortfolioRequest({ page: currentPage, token: access_token, section: 'fetch' }));
    };

    /** Return something. */
    return (
        <>
            {show_message && message && <Notification children={message} duration={5000} status={status ? status : 200} />}
            {loading ? (
                <Loader />
            ) : (
                <section className='m-2 grid auto-rows-min h-fit animate-fade animate-once animate-ease-in-out'>
                    <div className='p-2 h-8 sm:10 uppercase'>Portfolio</div>
                    {/* Hold */}
                    <div className='grid auto-rows-min h-fit rounded-t-md bg-stone-100 uppercase my-2'>
                        <div className='flex flex-wrap flex-col sm:flex-row gap-2 justify-between items-center h-fit border-b border-stone-200'>
                            <div className='flex flex-row flex-wrap justify-between items-center w-full'>
                                <div className='p-2'>
                                    <Icon id='trade' width='w-6' height='h-6' /> Hold
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
                                <div className='flex-1'>Share</div>
                                <div className='flex-1'>Fee</div>
                                <div className='flex-1'>Capital</div>
                                <div className='flex-1'>Average</div>
                                <div className='flex-1'>Price</div>
                                <div className='flex-1'>Prospect</div>
                            </div>
                        )}
                        <div className='p-2 flex flex-wrap flex-col sm:flex-row gap-2 justify-start items-center w-full h-fit border-b border-stone-200 font-thin text-xs'>
                            {hold &&
                                hold.map((item: any) => {
                                    return (
                                        <>
                                            <div className={`flex-1 py-2 px-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                                                {isMobile ? (
                                                    <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>
                                                        Symbol
                                                    </div>
                                                ) : (
                                                    ' '
                                                )}
                                                <p className='text-center sm:text-left'>{item.symbol}</p>
                                            </div>
                                            <div className={`flex-1 py-2 px-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                                                {isMobile ? (
                                                    <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>
                                                        Share
                                                    </div>
                                                ) : (
                                                    ' '
                                                )}
                                                <p className='text-center sm:text-left'>{item.share}</p>
                                            </div>
                                            <div className={`flex-1 py-2 px-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                                                {isMobile ? (
                                                    <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>
                                                        Fee
                                                    </div>
                                                ) : (
                                                    ' '
                                                )}
                                                <p className='text-center sm:text-left'>{item.fee}</p>
                                            </div>
                                            <div className={`flex-1 py-2 px-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                                                {isMobile ? (
                                                    <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>
                                                        Capital
                                                    </div>
                                                ) : (
                                                    ' '
                                                )}
                                                <p className='text-center sm:text-left'>{item.capital}</p>
                                            </div>
                                            <div className={`flex-1 py-2 px-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                                                {isMobile ? (
                                                    <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>
                                                        Average
                                                    </div>
                                                ) : (
                                                    ' '
                                                )}
                                                <p className='text-center sm:text-left'>{item.average}</p>
                                            </div>
                                            <div className={`flex-1 py-2 px-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                                                {isMobile ? (
                                                    <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>
                                                        Price
                                                    </div>
                                                ) : (
                                                    ' '
                                                )}
                                                <p className='text-center sm:text-left'>{item.price}</p>
                                            </div>
                                            <div className={`flex-1 py-2 px-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                                                {isMobile ? (
                                                    <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>
                                                        Prospect
                                                    </div>
                                                ) : (
                                                    ' '
                                                )}
                                                <p className='text-center sm:text-left'>{item.prospect}</p>
                                            </div>
                                        </>
                                    );
                                })}
                        </div>
                    </div>
                    {/* Order */}
                    <div className='grid auto-rows-min h-fit rounded-t-md bg-stone-100 uppercase my-2'>
                        <div className='flex flex-wrap flex-col sm:flex-row gap-2 justify-between items-center h-fit border-b border-stone-200'>
                            <div className='flex flex-row flex-wrap justify-between items-center w-full'>
                                <div className='p-2'>
                                    <Icon id='trade' width='w-6' height='h-6' /> Order
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
                                <div className='flex-1'>Date</div>
                                <div className='flex-1'>Order</div>
                                <div className='flex-1'>Symbol</div>
                                <div className='flex-1'>Share</div>
                                <div className='flex-1'>Capital</div>
                                <div className='flex-1'>Fee</div>
                                <div className='flex-1'>Action</div>
                            </div>
                        )}
                        <div className='p-2 flex flex-wrap flex-col sm:flex-row gap-2 justify-start items-center w-full h-fit border-b border-stone-200 font-thin text-xs'>
                            {order &&
                                order.map((item: any) => {
                                    return (
                                        <>
                                            <div className={`flex-1 py-2 px-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                                                {isMobile ? (
                                                    <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>
                                                        Date
                                                    </div>
                                                ) : (
                                                    ' '
                                                )}
                                                <p className='text-center sm:text-left'>{item.date}</p>
                                            </div>
                                            <div className={`flex-1 py-2 px-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                                                {isMobile ? (
                                                    <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>
                                                        Order
                                                    </div>
                                                ) : (
                                                    ' '
                                                )}
                                                <p className='text-center sm:text-left'>{item.order}</p>
                                            </div>
                                            <div className={`flex-1 py-2 px-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                                                {isMobile ? (
                                                    <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>
                                                        Symbol
                                                    </div>
                                                ) : (
                                                    ' '
                                                )}
                                                <p className='text-center sm:text-left'>{item.symbol}</p>
                                            </div>
                                            <div className={`flex-1 py-2 px-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                                                {isMobile ? (
                                                    <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>
                                                        Share
                                                    </div>
                                                ) : (
                                                    ' '
                                                )}
                                                <p className='text-center sm:text-left'>{item.share}</p>
                                            </div>
                                            <div className={`flex-1 py-2 px-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                                                {isMobile ? (
                                                    <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>
                                                        Capital
                                                    </div>
                                                ) : (
                                                    ' '
                                                )}
                                                <p className='text-center sm:text-left'>{item.capital}</p>
                                            </div>
                                            <div className={`flex-1 py-2 px-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                                                {isMobile ? (
                                                    <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>
                                                        Fee
                                                    </div>
                                                ) : (
                                                    ' '
                                                )}
                                                <p className='text-center sm:text-left'>{item.fee}</p>
                                            </div>
                                            <div className={`flex-1 py-2 px-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                                                {isMobile ? (
                                                    <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>
                                                        Action
                                                    </div>
                                                ) : (
                                                    ' '
                                                )}
                                                <span className='pr-0 cursor-pointer hover:text-red-500' onClick={() => console.log('Destroy')}>
                                                    <Icon id='destroy' width='w-4' height='h-4' /> {isMobile ? ' ' : 'DEL'}
                                                </span>
                                            </div>
                                        </>
                                    );
                                })}
                        </div>
                    </div>
                </section>
            )}

            <Pagination pages={pages} target='/dashboard/stock-portfolio' handler={paginationHandler} current={currentPage} />
        </>
    );
};

export default PortfolioStock;
