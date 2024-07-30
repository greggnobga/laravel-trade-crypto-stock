// /** Hook. */
// import { useAppDispatch, useAppSelector } from '$lib/hooks/use-rtk';
// import useNotification from '$lib/hooks/use-notification';

// /** Action. */
// import { explorerRequest } from '$lib/store/feature/stock/explorer-slice';

// /** Component. */
// import Loader from '$lib/components/loader';
// import Notification from '$lib//components/notification';

/** Vendor. */
// import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const StockDetails = () => {
    // /** Use state. */
    // const [notice, setNotice] = useState(false);
    // /** Use selector. */
    // const stockExplorerFetch = useSelector((state) => state.stockExplorerFetch);
    // const { loading, stockexplorer } = stockExplorerFetch;
    // const showMessage = useSelector((state) => state.showMessage);
    // const { message, error } = showMessage;
    // /** Use screen. */
    // const { isMobile } = useScreen();

    /** Use params. */
    const { ticker } = useParams();

    // /** Use navigate. */
    // const navigate = useNavigate();

    // /** Use selector. */
    // const stockExplorer = useAppSelector((state) => state.stockExplorer);
    // const { loading, show_message, pages, stocks } = stockExplorer;

    // /** Use dispatch. */
    // const dispatch = useAppDispatch();

    // /** Use effect. */
    // useEffect(() => {
    //     /** If no page is provided, redirect to page 1 */
    //     if (!page) {
    //         navigate('/stock-explorer', { replace: true });
    //     }

    //     dispatch(explorerRequest({ section: 'explorer', statement: 'select', page: currentPage }));

    //     /** Dispatch request on reload. */
    //     // if (!stocks) {
    //     //     dispatch(explorerRequest({ section: 'explorer', statement: 'select', page: currentPage }));
    //     // }
    // }, [page, navigate, show_message, pages]);

    /** Return something. */
    return (
        <section className='m-2 p-2 m-h-screen rounded grid grid-cols-1 gap-2 overflow-hidden bg-slate-100'>
            <h1>
                Specific details about the business: <span className='text-md font-serif font-bold text-purple-500'>{ticker}</span>
            </h1>

            <div className='flex flex-wrap flex-col gap-4 sm:flex-row '>
                <div className='p-2 flex-1'>
                    <h2 className='py-2 font-thin border-b border-gray-300'>Technicals</h2>

                    <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                        <p className='flex-1 px-2 text-xs font-thin text-purple-500'>Moving Signal</p>
                        <p className='flex-1 px-2 text-sm text-slate-600'>HOLD</p>
                    </div>

                    <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                        <p className='flex-1 px-2 text-xs font-thin text-purple-500'>Price</p>
                        <p className='flex-1 px-2 text-sm text-slate-600'>99.00</p>
                    </div>

                    <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                        <p className='flex-1 px-2 text-xs font-thin text-purple-500'>Change</p>
                        <p className='flex-1 px-2 text-sm text-slate-600'>99.00</p>
                    </div>

                    <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                        <p className='flex-1 px-2 text-xs font-thin text-purple-500'>Volume</p>
                        <p className='flex-1 px-2 text-sm text-slate-600'>99.00</p>
                    </div>

                    <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                        <p className='flex-1 px-2 text-xs font-thin text-purple-500'>Price Range</p>
                        <p className='flex-1 px-2 text-sm text-slate-600'>99.00</p>
                    </div>

                    <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                        <p className='flex-1 px-2 text-xs font-thin text-purple-500'>Support Level</p>
                        <p className='flex-1 px-2 text-sm text-slate-600'>99.00</p>
                    </div>

                    <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                        <p className='flex-1 px-2 text-xs font-thin text-purple-500'>Resistance Level</p>
                        <p className='flex-1 px-2 text-sm text-slate-600'>99.00</p>
                    </div>

                    <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                        <p className='flex-1 px-2 text-xs font-thin text-purple-500'>Moving Average</p>
                        <p className='flex-1 px-2 text-sm text-slate-600'>99.00</p>
                    </div>
                </div>
                <div className='p-2 flex-1'>
                    <h2 className='py-2 font-thin border-b border-gray-300'>Fundamentals</h2>

                    <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                        <p className='flex-1 px-2 text-xs font-thin text-purple-500'>Sector</p>
                        <p className='flex-1 px-2 text-sm text-slate-600'>Properties</p>
                    </div>

                    <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                        <p className='flex-1 px-2 text-xs font-thin text-purple-500'>Working Capital</p>
                        <p className='flex-1 px-2 text-sm text-slate-600'>99.00</p>
                    </div>

                    <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                        <p className='flex-1 px-2 text-xs font-thin text-purple-500'>Net Income After Tax</p>
                        <p className='flex-1 px-2 text-sm text-slate-600'>99.00</p>
                    </div>

                    <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                        <p className='flex-1 px-2 text-xs font-thin text-purple-500'>Debt Asset Ratio</p>
                        <p className='flex-1 px-2 text-sm text-slate-600'>99.00</p>
                    </div>

                    <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                        <p className='flex-1 px-2 text-xs font-thin text-purple-500'>Price Earning Ratio</p>
                        <p className='flex-1 px-2 text-sm text-slate-600'>99.00</p>
                    </div>

                    <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                        <p className='flex-1 px-2 text-xs font-thin text-purple-500'>Net Profit Margin</p>
                        <p className='flex-1 px-2 text-sm text-slate-600'>99.00</p>
                    </div>

                    <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                        <p className='flex-1 px-2 text-xs font-thin text-purple-500'>Return On Equity</p>
                        <p className='flex-1 px-2 text-sm text-slate-600'>99.00</p>
                    </div>

                    <div className='py-2 flex flex-wrap text-sm border-b border-slate-200'>
                        <p className='flex-1 px-2 text-xs font-thin text-purple-500'>Dividend Yield</p>
                        <p className='flex-1 px-2 text-sm text-slate-600'>99.00</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StockDetails;
