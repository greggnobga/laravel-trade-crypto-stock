/** Vendor. */
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

/** Hook. */
import { useAppDispatch, useAppSelector } from '$lib/hooks/use-rtk';
import useScreen from '$lib/hooks/use-screen';
import useProtect from '$lib/hooks/use-protect';

/** Action. */
import { stockWatchlistRequest } from '$lib/store/feature/stock/watchlist-slice';

/** Component. */
import Icon from '$lib/components/icon';
import Loader from '$lib/components/loader';
import Pagination from '$lib/components/pagination';
import Notification from '$lib//components/notification';

const WatchlistStock = () => {
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
    const stockWatchlist = useAppSelector((state) => state.stockWatchlist);
    const { loading, show_message, message, status, pages, stocks } = stockWatchlist;

    /** Use dispatch. */
    const dispatch = useAppDispatch();

    /** Use effect. */
    useEffect(() => {
        /** If no page is provided, redirect to page 1 */
        if (!page) {
            navigate('/dashboard/stock-watchlist', { replace: true });
        }

        /** Dispatch if not stocks found in the state. */
        if (!stocks) {
            dispatch(stockWatchlistRequest({ page: currentPage, token: access_token, section: 'fetch' }));
        }

        /** Navigate to login if is not valid. */
        if (!valid) {
            navigate('/auth/login');
        }
    }, [valid, stocks]);

    /** Pagination handler. */
    const paginationHandler = (pageNumber: number) => {
        /** Dispatch request on reload. */
        dispatch(stockWatchlistRequest({ page: pageNumber, token: access_token, section: 'fetch' }));
    };

    /** Return something. */
    return (
        <>
            {show_message && message && <Notification children={message} duration={5000} status={status ? status : 200} />}
            {loading ? (
                <Loader />
            ) : (
                <section className='m-2 grid auto-rows-min h-fit animate-fade animate-once animate-ease-in-out'>
                    <div className='p-2 h-8 sm:10 uppercase'>Watchlist</div>
                    {/** Reminder */}
                    <div className='flex flex-wrap flex-col sm:flex-row gap-2 justify-between items-center h-fit'>
                        <div className='rounded-t-md bg-stone-100 cursor-pointer w-full'>
                            <div className='flex flex-wrap flex-col sm:flex-row gap-2 justify-between items-center h-fit border-b border-stone-200'>
                                <div className='flex flex-row flex-wrap justify-between items-center w-full'>
                                    <div className='p-2'>
                                        <Icon id='trade' width='w-6' height='h-6' /> Reminder
                                    </div>
                                </div>
                            </div>
                            <div className='p-2 border-b border-stone-200 hover:text-purple-500 text-xs'>
                                Debt Asset Ratio - Always aim to invest in a company with a debt-to-equity ratio less than one.
                            </div>
                            <div className='p-2 border-b border-stone-200 hover:text-purple-500 text-xs'>
                                Price Range - Year low minus year high: When the range approaches zero or even becomes positive, it suggests that the
                                price is falling and that it is a good time to add to your stack.
                            </div>
                            <div className='p-2 border-b border-stone-200 hover:text-purple-500 text-xs'>
                                Working Capital - Working capital is the amount of capital accessible for a company's day-to-day operations.
                            </div>
                            <div className='p-2 hover:text-purple-500 text-xs'>
                                Dividend Yield - Is the amount of money a company pays shareholders for owning a share of its stock divided by its
                                current stock price.
                            </div>
                        </div>
                    </div>
                    {/* Watchlist */}
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
                                <div className='flex-1'>Price Range</div>
                                <div className='flex-1'>Working Capital</div>
                                <div className='flex-1'>Net Income</div>
                                <div className='flex-1'>Debt Asset Ratio</div>
                                <div className='flex-1'>Dividend Yield</div>
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
                                            <p className='text-center sm:text-left'>{item.price}</p>
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
                                                    Capital
                                                </div>
                                            ) : (
                                                ' '
                                            )}
                                            <p className='text-center sm:text-left'>{item.workingcapital}</p>
                                        </div>
                                        <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                                            {isMobile ? (
                                                <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>
                                                    Income
                                                </div>
                                            ) : (
                                                ' '
                                            )}
                                            <p className='text-center sm:text-left'>{item.netincomeaftertax}</p>
                                        </div>
                                        <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                                            {isMobile ? (
                                                <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>
                                                    Debt Asset
                                                </div>
                                            ) : (
                                                ' '
                                            )}
                                            <p className='text-center sm:text-left'>{item.debtassetratio}</p>
                                        </div>
                                        <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                                            {isMobile ? (
                                                <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>
                                                    Dividend
                                                </div>
                                            ) : (
                                                ' '
                                            )}
                                            <p className='text-center sm:text-left'>{item.dividendyield}</p>
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
            )}

            <Pagination pages={pages} target='/dashboard/stock-watchlist' handler={paginationHandler} current={currentPage} />
        </>
    );
};

export default WatchlistStock;
