/** React */
import { Fragment } from 'react';

/** Hook. */
import useScreen from '../../hooks/use-screen';

/** Helper. */
import helpNotice from '../../helpers/help-notice';


/** Components */
import Desktop from './desktop';
import Mobile from './mobile';
import Messenger from '../../components/messenger';

const Header = () => {
    /** Use notice helper. */
    const { notified, setNotified } = helpNotice();

    /** Use notice helper. */
    const { isMobile } = useScreen();

    /** Return something. */
    return (
        <Fragment>
            {notified && <Messenger onShow={setNotified} />}
            {isMobile ? <Mobile /> : <Desktop />}
        </Fragment>

    );
}

export default Header;