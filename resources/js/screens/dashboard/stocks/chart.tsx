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

        /** Dispatch if not stocks found in the state. */
        if (!stocks) {
            dispatch(stockChartRequest({ page: currentPage, token: access_token, section: 'fetch', statement: 'select' }));
        }

        /** Navigate to login if is not valid. */
        if (!valid) {
            navigate('/auth/login');
        }
    }, [valid, stocks]);

    /** Pagination handler. */
    const paginationHandler = (pageNumber: number) => {
        /** Dispatch request on reload. */
        dispatch(stockChartRequest({ page: pageNumber, token: access_token, section: 'fetch', statement: 'select' }));
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
