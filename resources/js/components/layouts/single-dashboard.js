/** React. */
import { useEffect } from 'react';

/** Vendor. */
import { Outlet } from 'react-router-dom';

/** Hook. */
import useHttp from '../../hooks/use-http';

/** Helpers. */
import helpProtect from '../../helpers/help-protect';

/** Component. */
import Loader from '../icons/loader';
import Header from '../headers';
import Summary from '../ui/summary';
import Menu from '../pages/dashboard/menu';
import Footer from '../footer';


const Single = () => {
    /** Use protect. */
    const { token, check } = helpProtect();

    /** Use http hook. */
    const { isLoading, sendRequest, hasError } = useHttp({
        url: '/api/dashboard',
        method: 'GET',
        params: {}
    }, (data) => { console.log(data); });

    useEffect(() => {
        sendRequest();
    }, []);

    /** Return something. */
    return (
        <section id="single">
            <Header />
            {check ? <Loader /> : token ?
                <div id="wrapper">
                    <Summary />
                    <Menu />
                    <Outlet />
                    <Footer />
                </div> : ''}
        </section>
    );
}

export default Single;