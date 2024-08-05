/** Vendor. */
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

/** Hook. */
import { useAppDispatch, useAppSelector } from '$lib/hooks/use-rtk';

/** Action. */
import { stockExplorerRequest } from '$lib/store/feature/stock/explorer-slice';

/** Component. */
import Loader from '$lib/components/loader';
import Pagination from '$lib/components/pagination';
import Notification from '$lib//components/notification';

const StockExplorer = () => {
    /** Use params. */
    const { page } = useParams();
    const currentPage = Number(page) || 1;

    /** Use navigate. */
    const navigate = useNavigate();

    /** Use selector. */
    const stockExplorer = useAppSelector((state) => state.stockExplorer);
    const { loading, show_message, message, status, pages, stocks } = stockExplorer;

    /** Use dispatch. */
    const dispatch = useAppDispatch();

    /** Use effect. */
    useEffect(() => {
        /** If no page is provided, redirect to page 1 */
        if (!page) {
            navigate('/stock-explorer', { replace: true });
        }

        /** Dispatch request on reload. */
        dispatch(stockExplorerRequest({ section: 'explorer', statement: 'select', page: currentPage }));
    }, [page]);

    /** Pagination handler. */
    const paginationHandler = (pageNumber: number) => {
        /** Dispatch request on reload. */
        dispatch(stockExplorerRequest({ section: 'explorer', statement: 'select', page: pageNumber }));
    };

    /** Return something. */
    return (
        <>
            {show_message && message && <Notification children={message} duration={5000} status={status ? status : 200} />}
            {loading ? (
                <Loader />
            ) : (
                <section className='p-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-fade animate-once animate-ease-in-out'>
                    {stocks &&
                        stocks.map((item: any) => {
                            return (
                                <div className='p-2 flex flex-col gap-2 flex-wrap bg-stone-100 shadow scale-down rounded'>
                                    <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                                        <p className='px-2 py-1 text-xs text-purple-500'>Ticker</p>
                                        <p className='px-2 py-1 text-lg'>{item.symbol}</p>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                                        <p className='px-2 py-1  text-xs font-thin text-purple-500'>Price</p>
                                        <p className='px-2 py-1 text-xs text-slate-600'>{item.price}</p>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                                        <p className='px-2 py-1  text-xs font-thin text-purple-500'>Value</p>
                                        <p className='px-2 py-1 text-xs text-slate-600'>{item.value}</p>
                                    </div>

                                    <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                                        <p className='px-2 py-1  text-xs font-thin text-purple-500'>Working Capital</p>
                                        <p className='px-2 py-1 text-xs text-slate-600'>{item.workingcapital}</p>
                                    </div>

                                    <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                                        <p className='px-2 py-1  text-xs font-thin text-purple-500'>Net Icome</p>
                                        <p className='px-2 py-1 text-xs text-slate-600'>{item.netincomeaftertax}</p>
                                    </div>

                                    <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                                        <p className='px-2 py-1  text-xs font-thin text-purple-500'>Debt Asset Ratio</p>
                                        <p className='px-2 py-1 text-xs text-slate-600'>{item.debtassetratio}</p>
                                    </div>

                                    <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                                        <p className='px-2 py-1  text-xs font-thin text-purple-500'>Price Earning Ratio</p>
                                        <p className='px-2 py-1 text-xs text-slate-600'>{item.priceearningratio}</p>
                                    </div>

                                    <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                                        <p className='px-2 py-1  text-xs font-thin text-purple-500'>Net Profit Margin</p>
                                        <p className='px-2 py-1 text-xs text-slate-600'>{item.netprofitmargin}</p>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                                        <p className='px-2 py-1  text-xs font-thin text-purple-500'>Return On Equity</p>
                                        <p className='px-2 py-1 text-xs text-slate-600'>{item.returnonequity}</p>
                                    </div>

                                    <div className='grid grid-cols-2 gap-2 justify-items-start'>
                                        <p className='px-2 py-1  text-xs font-thin text-purple-500'>Dividend Yield</p>
                                        <p className='px-2 py-1 text-xs text-slate-600'>{item.dividendyield}</p>
                                    </div>

                                    <div className='grid grid-cols-1 gap-2 justify-items-end overflow-hidden'>
                                        <a
                                            className='h-fit bg-purple-500 hover:bg-purple-700 px-5 py-1 text-slate-100 text-xs font-thin rounded shadow'
                                            href={`/stock-explorer/details/${item.symbol.toLowerCase()}`}>
                                            View
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                </section>
            )}

            <Pagination pages={pages} target='/stock-explorer' handler={paginationHandler} current={currentPage} />
        </>
    );
};

export default StockExplorer;
