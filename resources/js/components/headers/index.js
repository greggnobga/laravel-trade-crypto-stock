/** React */
import { Fragment } from 'react';

/** Helper. */
import helpNotice from '../../helpers/help-notice';

/** Components */
import Desktop from './desktop';
import Messenger from '../../components/messenger';

const Header = () => {
    /** Use notice helper. */
    const { notified, setNotified } = helpNotice();

    return (
        <Fragment>
            {notified && <Messenger onShow={setNotified} />}
            <Desktop />
        </Fragment>

    );
}

export default Header;