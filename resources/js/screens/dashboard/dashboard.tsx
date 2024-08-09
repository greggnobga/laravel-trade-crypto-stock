/** Vendor. */
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/** Hook. */
import { useAppDispatch, useAppSelector } from '$lib/hooks/use-rtk';
import useProtect from '$lib/hooks/use-protect';

/** Action. */
import { dashboardStartRequest, dashboardMetaRequest } from '$lib/store/feature/dashboard/external-slice';

/** Library. */
import { mapObject } from '$lib/lib/helper';

/** Component. */
import Icon from '$lib/components/icon';
import Loader from '$lib/components/loader';
import Notification from '$lib//components/notification';

const Dashboard = () => {
    /** Use navigate. */
    const navigate = useNavigate();

    /** Use protect. */
    useProtect();

    /** Use selector. */
    const auth = useAppSelector((state) => state.auth);
    const { loading, message, status, show_message, valid, access_token } = auth;

    /** Use selector. */
    const dashboardExternal = useAppSelector((state) => state.dashboardExternal);

    /** Use dispatch. */
    const dispatch = useAppDispatch();

    /** Use effect. */
    useEffect(() => {
        /** Navigate to login if is not valid. */
        if (!valid) {
            navigate('/auth/login');
        }
    }, [show_message, valid]);

    /** Start handler. */
    const startHandler = async () => {
        /** Prepare request to external api data provider. */
        const { data } = await axios({
            url: 'https://phisix-api3.appspot.com/stocks.json',
            method: 'GET',
        });

        /** Use remap stocks helper. */
        let result = mapObject(data);

        /** Save stocks to database. */
        result.map((item: any, index: number) => {
            /** Get last index. */
            let end = result.length - 1;

            /** Call delay item function. */
            setTimeout(async function () {
                /** Check if data is not empty. */
                if (item) {
                    /** Dispatch action. */
                    dispatch(dashboardStartRequest({ token: access_token, input: item }));
                }
                /** Talk to the console about that task progress. */
                if (index === end) {
                    console.log('Process Completed.');
                }
            }, 3000 * index);
        });
    };

    /** List handler. */
    const metaHander = async () => {
        /** Dispatch action. */
        dispatch(dashboardMetaRequest({ token: access_token }));
    };

    /** Meta handler. */
    const securityHandler = async () => {
        console.log('Meta handler cliked.');
        /** Prepare request to external api data provider. */
        const { data } = await axios({
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token}`,
            },
            method: 'GET',
            url: '/stock-reports-retrieve',
            params: { section: 'trades' },
        });

        console.log(data);
    };

    /** Return something. */
    return (
        <>
            {loading && <Loader />}
            {dashboardExternal.show_message && dashboardExternal.message && (
                <Notification
                    children={dashboardExternal.message}
                    duration={5000}
                    status={dashboardExternal.status ? dashboardExternal.status : 200}
                />
            )}
            {show_message && message && <Notification children={message} duration={5000} status={status ? status : 200} />}
            <section className='m-2 grid auto-rows-min h-fit animate-fade animate-once animate-ease-in-out'>
                <div className='p-2 h-8 sm:10 uppercase mb-2'>Fetch External Data</div>
                <div className='p-2 card-rounded flex flex-row flex-wrap gap-4'>
                    <div className='has-tooltip p-2 rounded hover:bg-slate-200 hover:text-purple-500'>
                        <span className='tooltip uppercase text-center'>Get the symbol, name, price, volume, and change from PHISIX.</span>
                        <button onClick={startHandler} type='button'>
                            <Icon id='start' width='w-6' height='h-6' /> Phisix Data
                        </button>
                    </div>
                    <div className='has-tooltip p-2 rounded hover:bg-slate-200 hover:text-purple-500'>
                        <span className='tooltip uppercase text-center'>Get company name, symbol and sector from PSE.</span>
                        <button onClick={metaHander} type='button'>
                            <Icon id='start' width='w-6' height='h-6' /> Meta Information
                        </button>
                    </div>
                    <div className='has-tooltip p-2 rounded hover:bg-slate-200 hover:text-purple-500'>
                        <span className='tooltip uppercase text-center'>Get edge id and security id from PSE.</span>
                        <button onClick={securityHandler} type='button'>
                            <Icon id='start' width='w-6' height='h-6' /> Security ID
                        </button>
                    </div>
                    <div className='has-tooltip p-2 rounded hover:bg-slate-200 hover:text-purple-500'>
                        <span className='tooltip uppercase text-center'>Get value, year high and low prices from PSE.</span>
                        <button onClick={() => console.log('dashboardPriceHandler')} className='' type='button'>
                            <Icon id='price' width='w-6' height='h-6' /> Price Range
                        </button>
                    </div>
                    <div className='has-tooltip p-2 rounded hover:bg-slate-200 hover:text-purple-500'>
                        <span className='tooltip uppercase text-center'>Get income after tax and earnings per share from PSE.</span>
                        <button onClick={() => console.log('dashboardReportHandler')} type='button'>
                            <Icon id='report' width='w-6' height='h-6' /> Financial Report
                        </button>
                    </div>
                    <div className='has-tooltip p-2 rounded hover:bg-slate-200 hover:text-purple-500'>
                        <span className='tooltip uppercase text-center'>Get the yearly dividend yield from PSE.</span>
                        <button onClick={() => console.log('dashboardDividendHandler')} type='button'>
                            <Icon id='dividend' width='w-6' height='h-6' /> Company Dividend
                        </button>
                    </div>
                    <div className='has-tooltip p-2 rounded hover:bg-slate-200 hover:text-purple-500'>
                        <span className='tooltip uppercase text-center'>Get sector FROM PSE.</span>
                        <button onClick={() => console.log('dashboardSectorHandler')} type='button'>
                            <Icon id='sector' width='w-6' height='h-6' /> Company Sector
                        </button>
                    </div>
                </div>
            </section>
            <section className='m-2 grid auto-rows-min h-fit'>
                <div className='p-2 h-8 sm:10 uppercase'>Asset Allocation</div>
                <div className='p-2 flex flex-col flex-wrap sm:flex-row justify-center gap-4'>
                    <div className='text-red-500 flex-1 card-rounded'>
                        <div className='h-8 p-2 mb-6 text-xs font-thin'>
                            <p className='uppercase'>
                                <Icon id='stock' width='w-6' height='h-6' /> Stock
                            </p>
                        </div>
                        <div className='h-20'>
                            <p className='uppercase text-center mx-auto text-xl sm:text-2xl md:text-3xl'>1000</p>
                        </div>
                        <div className='h-8 p-2 mb-2 text-sm font-thin'>
                            <p className='uppercase text-right'>
                                <Link to='/dashboard/stock-portfolio'>more</Link>
                            </p>
                        </div>
                    </div>
                    <div className='text-green-500 flex-1 card-rounded'>
                        <div className='h-8 p-2 mb-6 text-xs font-thin'>
                            <p className='uppercase'>
                                <Icon id='crypto' width='w-6' height='h-6' /> Crypto
                            </p>
                        </div>
                        <div className='h-20'>
                            <p className='uppercase text-center mx-auto text-xl sm:text-2xl md:text-3xl'>2000</p>
                        </div>
                        <div className='h-8 p-2 mb-2'>
                            <p className='uppercase text-right text-sm font-thin'>
                                <Link to='/dashboard/crypto-portfolio'>more</Link>
                            </p>
                        </div>
                    </div>
                    <div className='text-blue-500 flex-1 card-rounded'>
                        <div className='h-8 p-2 mb-6 text-xs font-thin'>
                            <p className='uppercase'>
                                <Icon id='fund' width='w-6' height='h-6' /> Fund
                            </p>
                        </div>
                        <div className='h-20'>
                            <p className='uppercase text-center mx-auto text-xl sm:text-2xl md:text-3xl'>3000</p>
                        </div>
                        <div className='h-8 p-2 mb-2 text-sm font-thin'>
                            <p className='uppercase text-right'>
                                <Link to='/dashboard/stock-fund'>more</Link>
                            </p>
                        </div>
                    </div>
                    <div className='text-orange-500 flex-1 card-rounded'>
                        <div className='h-8 p-2 mb-6 text-xs font-thin'>
                            <p className='uppercase'>
                                <Icon id='note' width='w-6' height='h-6' /> Note
                            </p>
                        </div>
                        <div className='h-20'>
                            <p className='uppercase text-center mx-auto text-xl sm:text-2xl md:text-3xl'>4000</p>
                        </div>
                        <div className='h-8 p-2 mb-2 text-sm font-thin'>
                            <p className='uppercase text-right'>
                                <Link to='/dashboard/stock-note'>more</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='m-2 grid auto-rows-min h-6/12'>
                <div className='p-2 h-8 sm:10 uppercase'>Stock</div>
                <div className='grid sm:grid-cols-2 auto-rows-min gap-2 h-fit card-rounded'>
                    <div className='h-48 sm:h-full p-2 sm:row-start-2'>Top Gainers</div>
                    <div className='h-48 sm:h-full p-2 sm:row-start-2 sm:col-start-2'>Top Lossers</div>
                </div>
            </section>
            <section className='m-2 grid auto-rows-min h-6/12'>
                <div className='p-2 h-8 sm:10 uppercase'>Crypto</div>
                <div className='grid sm:grid-cols-2 auto-rows-min gap-2 h-fit card-rounded'>
                    <div className='h-48 sm:h-full p-2 sm:row-start-2'>Top Gainers</div>
                    <div className='h-48 sm:h-full p-2 sm:row-start-2 sm:col-start-2'>Top Lossers</div>
                </div>
            </section>
        </>
    );
};

export default Dashboard;
