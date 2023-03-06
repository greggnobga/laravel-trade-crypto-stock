
/** React. */
import { Fragment, useEffect } from 'react';

/** Hook. */
import useHttp from '../../../hooks/use-http';

/** Helpers. */
import helpProtect from '../../../helpers/help-protect';

/** Component. */
import Icon from '../../icons';
import Loader from '../../icons/loader';
import Summary from '../../ui/summary';
import Deck from '../../ui/deck';

const Dashboad = () => {
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
        <Fragment>
            {check ? <Loader /> : token ?
                <div id="dashboard">
                    <Summary />
                    <Deck />
                    
                    <h1>Dashboad page.</h1>
                    <div className="account">
                        <span>Account information / acccount role / # of stocks / # of coins / total funds / subscription</span>
                        <br />
                        <span>If admin / show user list / total stats / top coin picks / top stock picks</span>
                    </div>
                    <div className="stats">
                        <span>Show stats / list of stocks / list of crypto</span>
                    </div>


                </div> : ''}
        </Fragment>
    );
}

export default Dashboad;