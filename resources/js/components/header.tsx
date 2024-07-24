/** Vendor. */
import { useState } from 'react';
import { Link } from 'react-router-dom';

// /** Vendor. */
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

// /** Actions. */
// import { logoutUser, tokenUser } from '../actions/UserActions';

/** Component. */
import Icon from './icon';

/** Hook. */
import useScreen from '$lib/hooks/use-screen';

const Header = () => {
    // /** Use dispatch. */
    // const dispatch = useDispatch();

    // /** Use selector. */
    // const userLogin = useSelector((state) => state.userLogin);
    // const { access_token } = userLogin;

    // const userToken = useSelector((state) => state.userToken);
    // const { valid } = userToken;

    // /** Logout handler. */
    // const logoutHandler = () => {
    //     /** Check if auth is not empty. */
    //     if (access_token) {
    //         /** Dispatch actions. */
    //         dispatch(logoutUser(access_token));
    //     }
    // };

    /** Use state. */
    const [menu, setMenu] = useState<boolean>(false);

    const menuHandler = () => {
        setMenu((menu) => !menu);
    };

    /** Use screen hook. */
    const isMobile = useScreen();

    /** Is logged. */
    const isLogged = true;

    return (
        <>
            <header className='flex justify-between h-fit font-size gradient-blue-purple border-bottom text-slate-50 relative'>
                <div className='p-2 md:text-xs'>
                    <div className='grid grid-cols-2 place-items-center'>
                        <Link to='/stock-explorer'>
                            <span className='hover:text-orange-300'>
                                <Icon id='stock' width='w-6' height='h-6' /> {isMobile ? ' ' : 'Stock Explorer'}
                            </span>
                        </Link>
                        <Link to='/crypto-explorer'>
                            <span className='ml-6 hover:text-orange-300'>
                                <Icon id='crypto' width='w-6' height='h-6' /> {isMobile ? ' ' : 'Crypto Explorer'}
                            </span>
                        </Link>
                    </div>
                </div>
                <div className='p-2 sm:text-xs md:text-base lg:text-base'>
                    {isMobile ? (
                        ' '
                    ) : (
                        <Link to='/'>
                            <span className='uppercase text-yellow-500 hover:text-slate-200'>
                                <Icon id='logo' width='w-6' height='h-6' /> Orion Trade
                            </span>
                        </Link>
                    )}
                </div>
                <ul className={`p-2 grid ${isLogged ? 'grid-cols-4' : 'grid-cols-2'} auto-rows-min place-items-center`}>
                    {isLogged ? (
                        <>
                            <li className='md:text-xs'>
                                <Link to='#'>
                                    <span className='hover:text-orange-300' onClick={() => menuHandler()}>
                                        <Icon id='control' width='w-6' height='h-6' />{' '}
                                        {isMobile ? ' ' : 'Control Panel '}
                                    </span>
                                </Link>
                            </li>
                            <li className='md:text-xs'>
                                <Link to='/dashboard'>
                                    <span className='ml-6 hover:text-orange-300'>
                                        <Icon id='menu' width='w-6' height='h-6' />
                                        {isMobile ? ' ' : 'Dashboard'}
                                    </span>
                                </Link>
                            </li>
                            <li className='md:text-xs'>
                                <Link to='/dashboard/profile'>
                                    <span className='ml-6 hover:text-orange-300'>
                                        <Icon id='profile' width='w-6' height='h-6' /> {isMobile ? ' ' : 'Profile'}
                                    </span>
                                </Link>
                            </li>
                            <li className='md:text-xs' onClick={() => console.log('Hello world!')}>
                                <Link to='/'>
                                    <span className='ml-6 hover:text-orange-300'>
                                        <Icon id='logout' width='w-6' height='h-6' /> {isMobile ? ' ' : 'Logout'}
                                    </span>
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='md:text-xs'>
                                <Link to='/auth/login'>
                                    <span className='hover:text-orange-300'>
                                        <Icon id='login' width='w-6' height='h-6' /> {isMobile ? ' ' : 'Login'}
                                    </span>
                                </Link>
                            </li>
                            <li className='md:text-xs'>
                                <Link to='/auth/register'>
                                    <span className='ml-6 hover:text-orange-300'>
                                        <Icon id='register' width='w-6' height='h-6' /> {isMobile ? ' ' : 'Register'}
                                    </span>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </header>
            {menu ? (
                <nav
                    className='flex flex-row justify-between font-size shadow bg-slate-400 text-slate-50 absolute w-full top-14 right-0 z-50'
                    onClick={() => menuHandler()}>
                    <ul className='p-2 flex-grow'>
                        <li className='px-2'>
                            <h2>Stock</h2>
                        </li>
                        <li className='px-2'>
                            <Link to='/dashboard/stock-portfolio'>
                                <span className='block border-bottom hover:text-orange-300'>
                                    <Icon id='portfolio' width='w-6' height='h-6' /> {isMobile ? ' ' : 'Portfolio'}
                                </span>
                            </Link>
                        </li>
                        <li className='px-2'>
                            <Link to='/dashboard/stock-trade'>
                                <span className='block border-bottom hover:text-orange-300'>
                                    <Icon id='trade' width='w-6' height='h-6' /> {isMobile ? ' ' : 'Trade'}
                                </span>
                            </Link>
                        </li>
                        <li className='px-2'>
                            <Link to='/dashboard/stock-watchlist'>
                                <span className='block border-bottom hover:text-orange-300'>
                                    <Icon id='watchlist' width='w-6' height='h-6' /> {isMobile ? ' ' : 'Watchlist'}
                                </span>
                            </Link>
                        </li>
                    </ul>
                    <ul className='p-2 flex-grow'>
                        <li className='px-2'>
                            <h2>Crypto</h2>
                        </li>
                        <li className='px-2'>
                            <Link to='/dashboard/crypto-portfolio'>
                                <span className='block border-bottom hover:text-orange-300'>
                                    <Icon id='portfolio' width='w-6' height='h-6' /> {isMobile ? ' ' : 'Portfolio'}
                                </span>
                            </Link>
                        </li>
                        <li className='px-2'>
                            <Link to='/dashboard/crypto-trade'>
                                <span className='block border-bottom hover:text-orange-300'>
                                    <Icon id='trade' width='w-6' height='h-6' /> {isMobile ? ' ' : 'Trade'}
                                </span>
                            </Link>
                        </li>
                        <li className='px-2'>
                            <Link to='/dashboard/crypto-game'>
                                <span className='block border-bottom hover:text-orange-300'>
                                    <Icon id='game' width='w-6' height='h-6' /> {isMobile ? ' ' : 'Game'}
                                </span>
                            </Link>
                        </li>
                        <li className='px-2'>
                            <Link to='/dashboard/crypto-nft'>
                                <span className='block p-2 hover:text-orange-300'>
                                    <Icon id='nft' width='w-6' height='h-6' /> {isMobile ? ' ' : 'NFT'}
                                </span>
                            </Link>
                        </li>
                    </ul>
                    <ul className='p-2 flex-grow'>
                        <li className='px-2'>
                            <h2>Extra</h2>
                        </li>
                        <li className='px-2'>
                            <Link to='/dashboard/extra-note'>
                                <span className='block border-bottom hover:text-orange-300'>
                                    <Icon id='note' width='w-6' height='h-6' /> {isMobile ? ' ' : 'Note'}
                                </span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            ) : (
                ''
            )}
        </>
    );
};

export default Header;
