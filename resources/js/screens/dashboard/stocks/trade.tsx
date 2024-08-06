/** Vendor. */
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

/** Hook. */
import { useAppDispatch, useAppSelector } from '$lib/hooks/use-rtk';
import useScreen from '$lib/hooks/use-screen';
import useProtect from '$lib/hooks/use-protect';

/** Action. */
import { stockBluechipRequest } from '$lib/store/feature/stock/trade-bluechip-slice';
import { stockCommonRequest } from '$lib/store/feature/stock/trade-common-slice';

/** Component. */
import Icon from '$lib/components/icon';
import Loader from '$lib/components/loader';
import Pagination from '$lib/components/pagination';
import Notification from '$lib//components/notification';

const TradeStock = () => {
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
    const stockTradeBluechip = useAppSelector((state) => state.stockTradeBluechip);

    /** Use selector. */
    const stockTradeCommon = useAppSelector((state) => state.stockTradeCommon);

    /** Use dispatch. */
    const dispatch = useAppDispatch();

    /** Use effect. */
    useEffect(() => {
        /** If no page is provided, redirect to page 1 */
        if (!page) {
            navigate('/dashboard/stock-trade', { replace: true });
        }

        /** Dispatch if no bluechip found in the state. */
        if (!stockTradeBluechip.bluechip) {
            dispatch(stockBluechipRequest({ page: currentPage, token: access_token, section: 'bluechip' }));
        }

        /** Dispatch if no common found in the state. */
        if (!stockTradeCommon.common) {
            dispatch(stockCommonRequest({ page: currentPage, token: access_token, section: 'common' }));
        }

        /** Navigate to login if is not valid. */
        if (!valid) {
            navigate('/auth/login');
        }
    }, [valid, stockTradeBluechip.bluechip, stockTradeCommon.common]);

    /** Pagination bluechip handler. */
    const paginationBluechipHandler = (pageNumber: number) => {
        /** Dispatch request on reload. */
        dispatch(stockBluechipRequest({ page: pageNumber, token: access_token, section: 'bluechip' }));
    };

    /** Pagination bluechip handler. */
    const paginationCommonHandler = (pageNumber: number) => {
        /** Dispatch request on reload. */
        dispatch(stockCommonRequest({ page: pageNumber, token: access_token, section: 'common' }));
    };

    /** Return something. */
    return (
        <>
            {stockTradeBluechip.show_message && stockTradeBluechip.message && (
                <Notification
                    children={stockTradeBluechip.message}
                    duration={5000}
                    status={stockTradeBluechip.status ? stockTradeBluechip.status : 200}
                />
            )}

            {stockTradeCommon.show_message && stockTradeCommon.message && (
                <Notification children={stockTradeCommon.message} duration={5000} status={stockTradeCommon.status ? stockTradeCommon.status : 200} />
            )}

            <section className='m-2 grid auto-rows-min h-fit animate-fade animate-once animate-ease-in-out'>
                <div className='p-2 h-8 sm:10 uppercase'>Trade</div>
                {/* Bluechip */}
                <div className='grid auto-rows-min h-fit rounded-t-md bg-stone-100 uppercase my-2'>
                    <div className='flex flex-wrap flex-col sm:flex-row gap-2 justify-between items-center h-fit border-b border-stone-200'>
                        <div className='flex flex-row flex-wrap justify-between items-center w-full'>
                            <div className='p-2'>
                                <Icon id='trade' width='w-6' height='h-6' /> Bluechip
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

                    {stockTradeBluechip.loading ? (
                        <Loader />
                    ) : (
                        <>
                            {stockTradeBluechip.bluechip &&
                                stockTradeBluechip.bluechip.map((item: any) => {
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
                                                <span className='pr-2 cursor-pointer hover:text-green-500' onClick={() => console.log('Update')}>
                                                    <Icon id='add' width='w-4' height='h-4' /> {isMobile ? ' ' : 'Add'}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                        </>
                    )}
                </div>

                <Pagination
                    pages={stockTradeBluechip.pages}
                    target='/dashboard/stock-trade'
                    handler={paginationBluechipHandler}
                    current={currentPage}
                />

                {/* Common */}
                <div className='grid auto-rows-min h-fit rounded-t-md bg-stone-100 uppercase my-2'>
                    <div className='flex flex-wrap flex-col sm:flex-row gap-2 justify-between items-center h-fit border-b border-stone-200'>
                        <div className='flex flex-row flex-wrap justify-between items-center w-full'>
                            <div className='p-2'>
                                <Icon id='trade' width='w-6' height='h-6' /> Common
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

                    {stockTradeCommon.loadin ? (
                        <Loader />
                    ) : (
                        <>
                            {stockTradeCommon.common &&
                                stockTradeCommon.common.map((item: any) => {
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
                                                <span className='pr-2 cursor-pointer hover:text-green-500' onClick={() => console.log('Update')}>
                                                    <Icon id='add' width='w-4' height='h-4' /> {isMobile ? ' ' : 'Add'}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                        </>
                    )}
                </div>

                <Pagination pages={stockTradeCommon.pages} target='/dashboard/stock-trade' handler={paginationCommonHandler} current={currentPage} />
            </section>
        </>
    );
};

export default TradeStock;
