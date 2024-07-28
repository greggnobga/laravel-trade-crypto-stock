/** Vendor. */
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/** Hook. */
import { useAppSelector } from '$lib/hooks/use-rtk';
import useProtect from '$lib/hooks/use-protect';

/** Component. */
import Icon from '$lib/components/icon';
import Loader from '$lib/components/loader.js';
import Notification from '$lib//components/notification.js';

const Dashboard = () => {
    // /** Use selector. */
    // const userLogin = useSelector((state) => state.userLogin);
    // const { loading, access_token, email_verified } = userLogin;
    // const userToken = useSelector((state) => state.userToken);
    // const { valid } = userToken;
    // const dashboardBluechip = useSelector((state) => state.dashboardBluechip);
    // const { loading: loadBluechip, bluechip } = dashboardBluechip;
    // const dashboardEdge = useSelector((state) => state.dashboardEdge);
    // const { loading: loadEdge, edge } = dashboardEdge;
    // const dashboardStockGainer = useSelector((state) => state.dashboardStockGainer);
    // const { loading: loadStockGainer, stockgainer } = dashboardStockGainer;
    // const dashboardStockLosser = useSelector((state) => state.dashboardStockLosser);
    // const { loading: loadStockLosser, stocklosser } = dashboardStockLosser;
    // const showMessage = useSelector((state) => state.showMessage);
    // const { message, error } = showMessage;
    // /** Use state. */
    // const [modalBlue, setModalBlue] = useState(false);
    // const [modalEdge, setModalEdge] = useState(false);
    // const [modalForm, setModalForm] = useState(false);
    // const [modalIndex, setModalIndex] = useState(0);
    // const [notice, setNotice] = useState(false);
    // const [modalStock, setModalStock] = useState(false);
    // /** Map html element to validate hook. */
    // const {
    //     value: modalBlueInput,
    //     hasError: modalBlueInputHasError,
    //     isValid: modalBlueInputIsValid,
    //     valueChangeHandler: modalBlueInputChangeHandler,
    //     inputBlurHandler: modalBlueInputBlurHandler,
    //     resetHandler: modalBlueInputInputReset,
    // } = useValidate((value) => value.trim() !== '' && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/));
    // const {
    //     value: modalEdgeInput,
    //     hasError: modalEdgeInputHasError,
    //     isValid: modalEdgeInputIsValid,
    //     valueChangeHandler: modalEdgeInputChangeHandler,
    //     inputBlurHandler: modalEdgeInputBlurHandler,
    //     resetHandler: modalEdgeInputInputReset,
    // } = useValidate((value) => value.trim() !== '' && value.match(/^[ A-Za-z0-9!@#$%^\-&*()_+]*$/));
    // /** Use navigate. */
    // const navigate = useNavigate();
    // /** Use dispatch. */
    // const dispatch = useDispatch();
    // /** Use effect. */
    // useEffect(() => {
    //     /** If account state set, check if access token is valid. */
    //     if (!valid && access_token) {
    //         dispatch(tokenUser(access_token));
    //     }
    //     /** If error occurred dispatch action. */
    //     if (valid && error) {
    //         dispatch(tokenUser(access_token));
    //     }
    //     /** If become undefined then redirect. */
    //     if (!valid) {
    //         const timeout = setTimeout(() => {
    //             navigate('/auth/login');
    //         }, 2000);
    //         return () => {
    //             clearTimeout(timeout);
    //         };
    //     }
    //     /** If not edge does not have value. */
    //     if (valid && !edge) {
    //         dispatch(edgeDashboard(access_token));
    //     }
    //     /** If not bluechip does not have value. */
    //     if (valid && !bluechip) {
    //         dispatch(bluechipDashboard(access_token));
    //     }
    //     /** If not stock gainer does not have value. */
    //     if (valid && !stockgainer) {
    //         dispatch(stockGainerDashboard(access_token));
    //     }
    //     /** If not stock losser does not have value. */
    //     if (valid && !stocklosser) {
    //         dispatch(stockLosserDashboard(access_token));
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
    // }, [access_token, valid, error, message, bluechip, stockgainer, stocklosser]);
    // /** Use state. */
    // const [verify, setVerify] = useState(email_verified);
    // /** Resend email verification. */
    // const resendHandler = () => {
    //     /** Set state value. */
    //     setVerify(true);
    //     /** Dispatch action. */
    //     dispatch(resendEmail(access_token));
    // };
    // /** Fecth data from external endpoint. */
    // const dashboardStartHandler = () => {
    //     /** Dispatch action. */
    //     dispatch(startDashboard(access_token));
    // };
    // const dashboardPriceHandler = () => {
    //     /** Dispatch action. */
    //     dispatch(priceDashboard(access_token));
    // };
    // const dashboardReportHandler = () => {
    //     /** Dispatch action. */
    //     dispatch(reportDashboard(access_token));
    // };
    // const dashboardDividendHandler = () => {
    //     /** Dispatch action. */
    //     dispatch(dividendDashboard(access_token));
    // };
    // const dashboardSectorHandler = () => {
    //     /** Dispatch action. */
    //     dispatch(sectorDashboard(access_token));
    // };
    // const dashboardListHandler = () => {
    //     /** Dispatch action. */
    //     dispatch(listDashboard(access_token));
    // };
    // const dashboardCompanyHandler = () => {
    //     /** Dispatch action. */
    //     dispatch(companyDashboard(access_token));
    // };
    // /** Bluechip modal handler. */
    // const bluechipModalHandler = () => {
    //     setModalBlue(true);
    // };
    // /** Edge modal handler. */
    // const edgeModalHandler = () => {
    //     setModalEdge(true);
    // };
    // /** Update bluechip handler. */
    // const updateBlueHandler = ({ statement, value }) => {
    //     /** Check statement is store. */
    //     if (value && statement === 'store') {
    //         /** Dispatch store action. */
    //         dispatch(bluechipStoreDashboard({ token: access_token, symbol: value }));
    //         /** Dispatch fetch action to update state. */
    //         const timeout = setTimeout(() => {
    //             dispatch(bluechipDashboard(access_token));
    //         }, 3000);
    //         return () => {
    //             clearTimeout(timeout);
    //         };
    //     }
    //     /** Check statement is destroy. */
    //     if (value && statement === 'destroy') {
    //         /** Dispatch destroy action. */
    //         dispatch(bluechipDestroyDashboard({ token: access_token, symbol: value }));
    //         /** Dispatch fetch action to update state. */
    //         const timeout = setTimeout(() => {
    //             dispatch(bluechipDashboard(access_token));
    //         }, 3000);
    //         return () => {
    //             clearTimeout(timeout);
    //         };
    //     }
    // };
    // /** Store edge id handler. */
    // const storeEdgeHandler = ({ symbol, value }) => {
    //     /** Check props is not empty. */
    //     if (symbol && value) {
    //         /** Dispatch action to send update request. */
    //         dispatch(
    //             edgeUpdateDashboard({
    //                 token: access_token,
    //                 symbol: symbol,
    //                 edge: value,
    //             }),
    //         );
    //         /** Dispatch action to update the state. */
    //         const timeout = setTimeout(() => {
    //             dispatch(edgeDashboard(access_token));
    //         }, 5000);
    //         return () => {
    //             clearTimeout(timeout);
    //         };
    //     }
    // };
    // /** Close modal handler. */
    // const closeModalHandler = () => {
    //     setModalBlue(false);
    //     setModalEdge(false);
    // };
    // /** Return. */
    // return (
    //     <>
    //         {valid && (
    //             <>
    //                 {error && <Notice variant='alert-warning' children={error} duration={3000} show={notice} />}
    //                 {message && <Notice variant='alert-success' children={message} duration={3000} show={notice} />}
    //                 {!verify && (
    //                     <div className='m-2 cursor-pointer hover:animate-pulse' onClick={resendHandler}>
    //                         <p className='alert-info'>
    //                             Your email address has not yet been verified. Click to resend your email verification
    //                             code.
    //                         </p>
    //                     </div>
    //                 )}
    //                 {loading ? (
    //                     <div className='w-screen h-screen form-center'>
    //                         <Loader />
    //                     </div>
    //                 ) : (
    //                     <>
    //                         <Container header='Account Information'>
    //                             <div className='grid sm:grid-cols-2 auto-rows-min gap-2 h-fit'>
    //                                 <div className='h-20 sm:row-start-2 >Account</div>
    //                                 <div className='sm:row-start-3 >
    //                                     <div className='p-2'>Data</div>
    //                                     <div className='p-2 grid auto-rows-min sm:grid-cols-2'>
    //                                         <div className='p-2'>
    //                                             <button
    //                                                 type='button'
    //                                                 className='btn btn-orange'
    //                                                 onClick={bluechipModalHandler}>
    //                                                 Bluechip Stocks
    //                                             </button>
    //                                         </div>
    //                                         <div className='p-2'>
    //                                             <button
    //                                                 type='button'
    //                                                 className='btn btn-emerald'
    //                                                 onClick={edgeModalHandler}>
    //                                                 Set Edge ID
    //                                             </button>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                                 <div className='h-48 sm:h-full sm:row-start-2 sm:col-start-2 sm:row-span-2 >
    //                                     Doughnut Chart
    //                                 </div>
    //                             </div>
    //                             {modalBlue && (
    //                                 <Modal>
    //                                     {modalBlueTemplate({
    //                                         data: bluechip,
    //                                         header: 'Bluechip',
    //                                         close: closeModalHandler,
    //                                         action: updateBlueHandler,
    //                                         form: setModalForm,
    //                                         shown: modalForm,
    //                                         value: modalBlueInput,
    //                                         change: modalBlueInputChangeHandler,
    //                                         blur: modalBlueInputBlurHandler,
    //                                         error: modalBlueInputHasError,
    //                                         reset: modalBlueInputInputReset,
    //                                     })}
    //                                 </Modal>
    //                             )}
    //                             {modalEdge && (
    //                                 <Modal>
    //                                     {modalEdgeTemplate({
    //                                         data: edge,
    //                                         header: 'Stocks',
    //                                         close: closeModalHandler,
    //                                         action: storeEdgeHandler,
    //                                         form: setModalForm,
    //                                         shown: modalForm,
    //                                         set: setModalIndex,
    //                                         index: modalIndex,
    //                                         value: modalEdgeInput,
    //                                         change: modalEdgeInputChangeHandler,
    //                                         blur: modalEdgeInputBlurHandler,
    //                                         error: modalEdgeInputHasError,
    //                                         reset: modalEdgeInputInputReset,
    //                                     })}
    //                                 </Modal>
    //                             )}
    //                         </Container>
    //                         <Container header='Philippine Stock Exchange'>
    //                             <div className='grid sm:grid-cols-2 auto-rows-min gap-2 h-fit'>
    //                                 {stockLeaderBoard({
    //                                     header: 'Top Gainers',
    //                                     data: stockgainer,
    //                                     show: setModalStock,
    //                                 })}
    //                                 {stockLeaderBoard({
    //                                     header: 'Top Lossers',
    //                                     data: stocklosser,
    //                                     show: setModalStock,
    //                                 })}
    //                                 {modalStock && (
    //                                     <Modal>
    //                                         <div className='form-center'>
    //                                             <span
    //                                                 className='text-right cursor-pointer'
    //                                                 onClick={() => setModalStock(false)}>
    //                                                 <Icon id='close' />{' '}
    //                                                 <span className='invisible sm:visible'>Close</span>
    //                                             </span>
    //                                         </div>
    //                                     </Modal>
    //                                 )}
    //                             </div>
    //                         </Container>

    //                     </>
    //                 )}
    //             </>
    //         )}
    //     </>
    // );

    // /** Use selector. */
    // const auth = useAppSelector((state) => state.auth)
    // const { access_token } = auth

    /** Use navigate. */
    const navigate = useNavigate();

    /** Use protect. */
    useProtect();

    /** Use selector. */
    const auth = useAppSelector((state) => state.auth);
    const { loading, message, status, show_message, valid } = auth;

    /** Use effect. */
    useEffect(() => {
        if (!valid) {
            navigate('/auth/login');
        }
    }, [show_message, valid]);

    /** Return something. */
    return (
        <>
            {loading && <Loader />}
            {show_message && message && <Notification children={message} duration={5000} status={status ? status : 200} />}
            <section className='m-2 grid auto-rows-min h-fit'>
                <div className='p-2 h-8 sm:10 uppercase'>Fetch External Data</div>
                <div className='p-2 card-rounded grid auto-rows-min gap-4 sm:grid-cols-2 md:grid-cols-4'>
                    <div className='has-tooltip'>
                        <span className='tooltip uppercase text-center'>Fetch the stock symbol from PSE Edge.</span>
                        <button onClick={() => console.log('dashboardListHandler')} className='btn btn-green' type='button'>
                            <Icon id='start' width='w-6' height='h-6' /> Stock List
                        </button>
                    </div>
                    <div className='has-tooltip'>
                        <span className='tooltip uppercase text-center'>Fetch company and security identification from PSE Edge.</span>
                        <button onClick={() => console.log('dashboardCompanyHandler')} className='btn btn-orange' type='button'>
                            <Icon id='start' width='w-6' height='h-6' /> Company ID
                        </button>
                    </div>
                    <div className='has-tooltip'>
                        <span className='tooltip uppercase text-center'>Get the symbol, name, price, volume, and change.</span>
                        <button onClick={() => console.log('dashboardStartHandler')} className='btn btn-red' type='button'>
                            <Icon id='start' width='w-6' height='h-6' /> Start
                        </button>
                    </div>
                    <div className='has-tooltip'>
                        <span className='tooltip uppercase text-center'>Get value, year high and low prices.</span>
                        <button onClick={() => console.log('dashboardPriceHandler')} className='btn btn-blue' type='button'>
                            <Icon id='price' width='w-6' height='h-6' /> Price
                        </button>
                    </div>
                    <div className='has-tooltip'>
                        <span className='tooltip uppercase text-center'>Get income after tax and earnings per share.</span>
                        <button onClick={() => console.log('dashboardReportHandler')} className='btn btn-green' type='button'>
                            <Icon id='report' width='w-6' height='h-6' /> Report
                        </button>
                    </div>
                    <div className='has-tooltip'>
                        <span className='tooltip uppercase text-center'>Get the yearly dividend yield.</span>
                        <button onClick={() => console.log('dashboardDividendHandler')} className='btn btn-emerald' type='button'>
                            <Icon id='dividend' width='w-6' height='h-6' /> Dividend
                        </button>
                    </div>
                    <div className='has-tooltip'>
                        <span className='tooltip uppercase text-center'>Get the sector to which stock belongs.</span>
                        <button onClick={() => console.log('dashboardSectorHandler')} className='btn btn-indigo' type='button'>
                            <Icon id='sector' width='w-6' height='h-6' /> Sector
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
