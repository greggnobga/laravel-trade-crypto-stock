// /** React. */
// import { useState, useEffect } from 'react';

// /** Vendor. */
// import { useDispatch, useSelector } from 'react-redux';

// /** Hook. */
// import useScreen from '../hooks/UseScreen';

// /** Component. */
// import Icon from '../components/Icon';
// import Modal from '../components/Modal';
// import Loader from '../components/Loader';
// import Notice from '../components/Notice';
// import Search from '../components/Search';
// import Container from '../components/Container';

// /** Template. */
// import {
//     desktopFundamentalContent,
//     desktopTechnicalContent,
//     mobileFundamentalContent,
//     mobileTechnicalContent,
// } from './template/Explorer';

// /** Action. */
// import { fetchStockExplorer } from '../actions/ExplorerActions';

const StockExplorer = () => {
    // /** Use state. */
    // const [notice, setNotice] = useState(false);
    // /** Use selector. */
    // const stockExplorerFetch = useSelector((state) => state.stockExplorerFetch);
    // const { loading, stockexplorer } = stockExplorerFetch;
    // const showMessage = useSelector((state) => state.showMessage);
    // const { message, error } = showMessage;
    // /** Use screen. */
    // const { isMobile } = useScreen();
    // /** Use dispatch. */
    // const dispatch = useDispatch();
    // /** Use effect. */
    // useEffect(() => {
    //     /** Send request if no stocks. */
    //     if (!stockexplorer) {
    //         /** Dispatch action. */
    //         dispatch(fetchStockExplorer());
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
    // }, [message, stockexplorer]);

    /** Return something. */
    return (
        <section className='p-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
            <div className='p-2 flex flex-col gap-2 flex-wrap bg-stone-100 shadow scale-down rounded'>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Ticker</p>
                    <p className='px-2 py-1 text-lg'>RLC</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>10,000,099.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Value</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Working Capital</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Icome</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Debt Asset Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price Earning Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Profit Margin</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Return On Equity</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start'>
                    <p className='text-xs text-purple-500'>Dividend Yield</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-1 gap-2 justify-items-end'>
                    <a className='px-4 hover:text-blue-500' href='#'>
                        View
                    </a>
                </div>
            </div>

            <div className='p-2 flex flex-col gap-2 flex-wrap bg-stone-100 shadow scale-down rounded'>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Ticker</p>
                    <p className='px-2 py-1 text-lg'>RLC</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>10,000,099.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Value</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Working Capital</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Icome</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Debt Asset Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price Earning Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Profit Margin</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Return On Equity</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start'>
                    <p className='text-xs text-purple-500'>Dividend Yield</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-1 gap-2 justify-items-end'>
                    <a className='px-4 hover:text-blue-500' href='#'>
                        View
                    </a>
                </div>
            </div>

            <div className='p-2 flex flex-col gap-2 flex-wrap bg-stone-100 shadow scale-down rounded'>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Ticker</p>
                    <p className='px-2 py-1 text-lg'>RLC</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>10,000,099.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Value</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Working Capital</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Icome</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Debt Asset Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price Earning Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Profit Margin</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Return On Equity</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start'>
                    <p className='text-xs text-purple-500'>Dividend Yield</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-1 gap-2 justify-items-end'>
                    <a className='px-4 hover:text-blue-500' href='#'>
                        View
                    </a>
                </div>
            </div>

            <div className='p-2 flex flex-col gap-2 flex-wrap bg-stone-100 shadow scale-down rounded'>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Ticker</p>
                    <p className='px-2 py-1 text-lg'>RLC</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>10,000,099.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Value</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Working Capital</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Icome</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Debt Asset Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price Earning Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Profit Margin</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Return On Equity</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start'>
                    <p className='text-xs text-purple-500'>Dividend Yield</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-1 gap-2 justify-items-end'>
                    <a className='px-4 hover:text-blue-500' href='#'>
                        View
                    </a>
                </div>
            </div>

            <div className='p-2 flex flex-col gap-2 flex-wrap bg-stone-100 shadow scale-down rounded'>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Ticker</p>
                    <p className='px-2 py-1 text-lg'>RLC</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>10,000,099.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Value</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Working Capital</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Icome</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Debt Asset Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price Earning Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Profit Margin</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Return On Equity</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start'>
                    <p className='text-xs text-purple-500'>Dividend Yield</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-1 gap-2 justify-items-end'>
                    <a className='px-4 hover:text-blue-500' href='#'>
                        View
                    </a>
                </div>
            </div>

            <div className='p-2 flex flex-col gap-2 flex-wrap bg-stone-100 shadow scale-down rounded'>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Ticker</p>
                    <p className='px-2 py-1 text-lg'>RLC</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>10,000,099.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Value</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Working Capital</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Icome</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Debt Asset Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price Earning Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Profit Margin</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Return On Equity</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start'>
                    <p className='text-xs text-purple-500'>Dividend Yield</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-1 gap-2 justify-items-end'>
                    <a className='px-4 hover:text-blue-500' href='#'>
                        View
                    </a>
                </div>
            </div>

            <div className='p-2 flex flex-col gap-2 flex-wrap bg-stone-100 shadow scale-down rounded'>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Ticker</p>
                    <p className='px-2 py-1 text-lg'>RLC</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>10,000,099.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Value</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Working Capital</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Icome</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Debt Asset Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price Earning Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Profit Margin</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Return On Equity</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start'>
                    <p className='text-xs text-purple-500'>Dividend Yield</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-1 gap-2 justify-items-end'>
                    <a className='px-4 hover:text-blue-500' href='#'>
                        View
                    </a>
                </div>
            </div>

            <div className='p-2 flex flex-col gap-2 flex-wrap bg-stone-100 shadow scale-down rounded'>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Ticker</p>
                    <p className='px-2 py-1 text-lg'>RLC</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>10,000,099.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Value</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Working Capital</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Icome</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Debt Asset Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price Earning Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Profit Margin</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Return On Equity</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start'>
                    <p className='text-xs text-purple-500'>Dividend Yield</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-1 gap-2 justify-items-end'>
                    <a className='px-4 hover:text-blue-500' href='#'>
                        View
                    </a>
                </div>
            </div>

            <div className='p-2 flex flex-col gap-2 flex-wrap bg-stone-100 shadow scale-down rounded'>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Ticker</p>
                    <p className='px-2 py-1 text-lg'>RLC</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>10,000,099.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Value</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Working Capital</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Icome</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Debt Asset Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price Earning Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Profit Margin</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Return On Equity</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start'>
                    <p className='text-xs text-purple-500'>Dividend Yield</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-1 gap-2 justify-items-end'>
                    <a className='px-4 hover:text-blue-500' href='#'>
                        View
                    </a>
                </div>
            </div>

            <div className='p-2 flex flex-col gap-2 flex-wrap bg-stone-100 shadow scale-down rounded'>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Ticker</p>
                    <p className='px-2 py-1 text-lg'>RLC</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>10,000,099.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Value</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Working Capital</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Icome</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Debt Asset Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price Earning Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Profit Margin</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Return On Equity</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start'>
                    <p className='text-xs text-purple-500'>Dividend Yield</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-1 gap-2 justify-items-end'>
                    <a className='px-4 hover:text-blue-500' href='#'>
                        View
                    </a>
                </div>
            </div>

            <div className='p-2 flex flex-col gap-2 flex-wrap bg-stone-100 shadow scale-down rounded'>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Ticker</p>
                    <p className='px-2 py-1 text-lg'>RLC</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>10,000,099.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Value</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Working Capital</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Icome</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Debt Asset Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price Earning Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Profit Margin</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Return On Equity</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start'>
                    <p className='text-xs text-purple-500'>Dividend Yield</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-1 gap-2 justify-items-end'>
                    <a className='px-4 hover:text-blue-500' href='#'>
                        View
                    </a>
                </div>
            </div>

            <div className='p-2 flex flex-col gap-2 flex-wrap bg-stone-100 shadow scale-down rounded'>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Ticker</p>
                    <p className='px-2 py-1 text-lg'>RLC</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>10,000,099.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Value</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Working Capital</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Icome</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Debt Asset Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price Earning Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Profit Margin</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Return On Equity</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start'>
                    <p className='text-xs text-purple-500'>Dividend Yield</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-1 gap-2 justify-items-end'>
                    <a className='px-4 hover:text-blue-500' href='#'>
                        View
                    </a>
                </div>
            </div>

            <div className='p-2 flex flex-col gap-2 flex-wrap bg-stone-100 shadow scale-down rounded'>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Ticker</p>
                    <p className='px-2 py-1 text-lg'>RLC</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>10,000,099.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Value</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Working Capital</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Icome</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Debt Asset Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price Earning Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Profit Margin</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Return On Equity</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start'>
                    <p className='text-xs text-purple-500'>Dividend Yield</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-1 gap-2 justify-items-end'>
                    <a className='px-4 hover:text-blue-500' href='#'>
                        View
                    </a>
                </div>
            </div>

            <div className='p-2 flex flex-col gap-2 flex-wrap bg-stone-100 shadow scale-down rounded'>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Ticker</p>
                    <p className='px-2 py-1 text-lg'>RLC</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>10,000,099.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Value</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Working Capital</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Icome</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Debt Asset Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price Earning Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Profit Margin</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Return On Equity</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start'>
                    <p className='text-xs text-purple-500'>Dividend Yield</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-1 gap-2 justify-items-end'>
                    <a className='px-4 hover:text-blue-500' href='#'>
                        View
                    </a>
                </div>
            </div>

            <div className='p-2 flex flex-col gap-2 flex-wrap bg-stone-100 shadow scale-down rounded'>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Ticker</p>
                    <p className='px-2 py-1 text-lg'>RLC</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>10,000,099.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Value</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Working Capital</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Icome</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Debt Asset Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Price Earning Ratio</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Net Profit Margin</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-items-start border-b border-slate-200'>
                    <p className='text-xs text-purple-500'>Return On Equity</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-2 gap-2 justify-items-start'>
                    <p className='text-xs text-purple-500'>Dividend Yield</p>
                    <p className='px-2 py-1 text-sm text-slate-600'>99.00</p>
                </div>

                <div className='grid grid-cols-1 gap-2 justify-items-end'>
                    <a className='px-4 hover:text-blue-500' href='#'>
                        View
                    </a>
                </div>
            </div>
        </section>
    );
};

export default StockExplorer;
