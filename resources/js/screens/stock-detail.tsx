/** Vendor. */
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

/** Hook. */
import { useAppDispatch, useAppSelector } from '$lib/hooks/use-rtk';

/** Action. */
import { stockDetailRequest } from '$lib/store/feature/stock/detail-slice';

/** Component. */
import Loader from '$lib/components/loader';
import Notification from '$lib//components/notification';

const StockDetail = () => {
    /** Use params. */
    const { ticker } = useParams();

    /** Use selector. */
    const stockDetail = useAppSelector((state) => state.stockDetail);
    const { loading, show_message, message, status, fundamental, technical, updated } = stockDetail;

    /** Use dispatch. */
    const dispatch = useAppDispatch();

    /** Use effect. */
    useEffect(() => {
        /** If no page is provided, redirect to page 1 */
        if (ticker) {
            /** Dispatch request on reload. */
            dispatch(stockDetailRequest({ section: 'details', statement: 'select', symbol: ticker }));
        }
    }, [ticker]);

    /** Use navigate. */
    const navigate = useNavigate();

    /** Back handler. */
    const backHandler = () => {
        /** Go back to stock explorer. */
        navigate('/stock-explorer');
    };

    /** Return something. */
    return (
        <>
            {show_message && message && <Notification children={message} duration={5000} status={status ? status : 200} />}
            {loading ? (
                <Loader />
            ) : (
                <section className='m-2 p-2 m-h-screen rounded grid grid-cols-1 gap-2 bg-slate-100 animate-fade animate-once animate-ease-in-out'>
                    <div className='flex flex-wrap justify-between'>
                        <h1 className='p-2 font-light'>
                            Technical and fundamental details about the business:
                            <span className='pl-2 text-md font-serif font-bold text-purple-500 uppercase'>{ticker}</span>
                        </h1>
                        <p className='p-2 font-light'>
                            Last update: <span className='text-purple-500'>{updated}</span>
                        </p>
                    </div>

                    <div className='flex flex-wrap flex-col gap-4 sm:flex-row '>
                        {technical &&
                            technical.map((item: any) => {
                                return (
                                    <div className='p-2 flex-1'>
                                        <h2 className='py-2 font-thin border-b border-gray-300'>Technicals</h2>

                                        <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                                            <p className='flex-1 px-2 text-xs text-purple-500'>Moving Signal</p>
                                            <p className='flex-1 px-2 text-sm text-slate-600 uppercase'>{item.movingsignal}</p>
                                        </div>
                                        <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                                            <p className='flex-1 px-2 text-xs text-purple-500'>Price</p>
                                            <p className='flex-1 px-2 text-sm text-slate-600'>{item.price}</p>
                                        </div>
                                        <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                                            <p className='flex-1 px-2 text-xs text-purple-500'>Change</p>
                                            <p className='flex-1 px-2 text-sm text-slate-600'>{item.change}</p>
                                        </div>
                                        <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                                            <p className='flex-1 px-2 text-xs text-purple-500'>Volume</p>
                                            <p className='flex-1 px-2 text-sm text-slate-600'>{item.volume}</p>
                                        </div>
                                        <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                                            <p className='flex-1 px-2 text-xs text-purple-500'>Price Range</p>
                                            <p className='flex-1 px-2 text-sm text-slate-600'>{item.pricerange}</p>
                                        </div>
                                        <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                                            <p className='flex-1 px-2 text-xs text-purple-500'>Support Level</p>
                                            <p className='flex-1 px-2 text-sm text-slate-600'>{item.supportlevel}</p>
                                        </div>
                                        <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                                            <p className='flex-1 px-2 text-xs text-purple-500'>Resistance Level</p>
                                            <p className='flex-1 px-2 text-sm text-slate-600'>{item.resistancelevel}</p>
                                        </div>
                                        <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                                            <p className='flex-1 px-2 text-xs text-purple-500'>Moving Average</p>
                                            <p className='flex-1 px-2 text-sm text-slate-600'>{item.movingaverage}</p>
                                        </div>
                                    </div>
                                );
                            })}

                        {fundamental &&
                            fundamental.map((item: any) => {
                                return (
                                    <div className='p-2 flex-1'>
                                        <h2 className='py-2 font-thin border-b border-gray-300'>Fundamentals</h2>

                                        <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                                            <p className='flex-1 px-2 text-xs text-purple-500'>Sector</p>
                                            <p className='flex-1 px-2 text-sm text-slate-600 uppercase'>{item.sector}</p>
                                        </div>

                                        <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                                            <p className='flex-1 px-2 text-xs text-purple-500'>Working Capital</p>
                                            <p className='flex-1 px-2 text-sm text-slate-600'>{item.workingcapital}</p>
                                        </div>

                                        <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                                            <p className='flex-1 px-2 text-xs text-purple-500'>Net Income After Tax</p>
                                            <p className='flex-1 px-2 text-sm text-slate-600'>{item.netincomeaftertax}</p>
                                        </div>

                                        <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                                            <p className='flex-1 px-2 text-xs text-purple-500'>Debt Asset Ratio</p>
                                            <p className='flex-1 px-2 text-sm text-slate-600'>{item.debtassetratio}</p>
                                        </div>

                                        <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                                            <p className='flex-1 px-2 text-xs text-purple-500'>Price Earning Ratio</p>
                                            <p className='flex-1 px-2 text-sm text-slate-600'>{item.priceearningratio}</p>
                                        </div>

                                        <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                                            <p className='flex-1 px-2 text-xs text-purple-500'>Net Profit Margin</p>
                                            <p className='flex-1 px-2 text-sm text-slate-600'>{item.netprofitmargin}</p>
                                        </div>

                                        <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                                            <p className='flex-1 px-2 text-xs text-purple-500'>Return On Equity</p>
                                            <p className='flex-1 px-2 text-sm text-slate-600'>{item.returnonequity}</p>
                                        </div>

                                        <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                                            <p className='flex-1 px-2 text-xs text-purple-500'>Dividend Yield</p>
                                            <p className='flex-1 px-2 text-sm text-slate-600'>{item.dividendyield}</p>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    <div className='p-2 text-right overflow-hidden'>
                        <button
                            onClick={backHandler}
                            className='h-fit bg-purple-500 hover:bg-purple-700 px-5 py-1 text-slate-100 text-xs font-thin rounded shadow'
                            type='button'>
                            Go Back
                        </button>
                    </div>
                </section>
            )}
        </>
    );
};

export default StockDetail;
