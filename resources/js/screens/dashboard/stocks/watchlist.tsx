/** Vendor. */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/** Hook. */
import { useAppSelector } from '$lib/hooks/use-rtk';
import useScreen from '$lib/hooks/use-screen';
import useProtect from '$lib/hooks/use-protect';

/** Component. */
import Icon from '$lib/components/icon';

const WatchlistStock = () => {
    /** Use screen hook. */
    const isMobile = useScreen();

    /** Use navigate. */
    const navigate = useNavigate();

    /** Use protect. */
    useProtect();

    /** Use selector. */
    const auth = useAppSelector((state) => state.auth);
    const { valid } = auth;

    /** Use effect. */
    useEffect(() => {
        if (!valid) {
            navigate('/auth/login');
        }
    }, [valid]);

    /** Return something. */
    return (
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
                        Debt Asset Ratio - Always try to find a company to invest which has debt equity ratio of less than one.
                    </div>
                    <div className='p-2 border-b border-stone-200 hover:text-purple-500 text-xs'>
                        Price Range - Year low minus year high, when the range is getting near to zero or even turning positive, it indicates that the
                        price is going down and that it is a good idea to add to your stack.
                    </div>
                    <div className='p-2 border-b border-stone-200 hover:text-purple-500 text-xs'>
                        Working Capital - Working capital is the amount of available capital that a company can readily use for day-to-day operations.
                        year.
                    </div>
                    <div className='p-2 hover:text-purple-500 text-xs'>
                        Dividend Yield - Is the amount of money a company pays shareholders for owning a share of its stock divided by its current
                        stock price.
                    </div>
                </div>
            </div>
            {/* Watchlist */}
            <div className='grid auto-rows-min h-fit rounded-t-md bg-stone-100 uppercase my-2'>
                <div className='flex flex-wrap flex-col sm:flex-row gap-2 justify-between items-center h-fit border-b border-stone-200'>
                    <div className='flex flex-row flex-wrap justify-between items-center w-full'>
                        <div className='p-2'>
                            <Icon id='trade' width='w-6' height='h-6' /> Stocks (28)
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
                <div className='p-2 flex flex-wrap flex-col sm:flex-row gap-2 justify-start items-center w-full h-fit border-b border-stone-200 font-thin text-xs'>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Symbol</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>JFC</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Price</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Value</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Range</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Capital</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Income</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Debt Asset</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Dividend</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Action</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>DEL</p>
                    </div>
                </div>
                <div className='p-2 flex flex-wrap flex-col sm:flex-row gap-2 justify-start items-center w-full h-fit border-b border-stone-200 font-thin text-xs'>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Symbol</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>JFC</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Price</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Value</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Range</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Capital</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Income</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Debt Asset</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Dividend</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Action</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>DEL</p>
                    </div>
                </div>
                <div className='p-2 flex flex-wrap flex-col sm:flex-row gap-2 justify-start items-center w-full h-fit border-b border-stone-200 font-thin text-xs'>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Symbol</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>JFC</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Price</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Value</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Range</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Capital</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Income</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Debt Asset</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Dividend</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Action</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>DEL</p>
                    </div>
                </div>
                <div className='p-2 flex flex-wrap flex-col sm:flex-row gap-2 justify-start items-center w-full h-fit border-b border-stone-200 font-thin text-xs'>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Symbol</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>JFC</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Price</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Value</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Range</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Capital</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Income</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Debt Asset</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Dividend</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Action</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>DEL</p>
                    </div>
                </div>
                <div className='p-2 flex flex-wrap flex-col sm:flex-row gap-2 justify-start items-center w-full h-fit border-b border-stone-200 font-thin text-xs'>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Symbol</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>JFC</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Price</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Value</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Range</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Capital</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Income</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Debt Asset</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Dividend</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>100.00</p>
                    </div>
                    <div className={`flex-1 py-1 relative ${isMobile ? 'w-[25%]' : ''}`}>
                        {isMobile ? (
                            <div className='text-[.5rem] absolute -top-2 align-top text-purple-500 justify-start uppercase w-9/12'>Action</div>
                        ) : (
                            ' '
                        )}
                        <p className='text-center sm:text-left'>DEL</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WatchlistStock;
