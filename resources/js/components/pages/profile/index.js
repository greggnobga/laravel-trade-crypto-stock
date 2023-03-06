
/** React. */
import { Fragment } from 'react';

/** Hook. */
import helpProtect from '../../../helpers/help-protect';

/** Component. */
import Loader from '../../icons/loader.js';

const Client = () => {
    /** Use protect. */
    const { token, check } = helpProtect();

    /** Return something. */
    return (
        <Fragment>
            {check ? <Loader /> : token ? <h1>Client page.</h1> : ''}
        </Fragment>
    );
}

export default Client;