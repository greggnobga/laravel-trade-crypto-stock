/** React. */
import { Fragment, useContext } from 'react';

/** Context. */
import AuthContext from '../../context/auth-context';

/** Component. */
import Message from './message';
import Resend from './resend';

const Messenger = (props) => {
    /** Use context. */
    const authCtx = useContext(AuthContext);

    /** Return something. */
    return (
        <Fragment>
            {authCtx.message ? <Message onHide={props.onShow} /> : ''}
            {!authCtx.verified ? <Resend onHide={props.onShow} /> : ''}
        </Fragment >
    );

}

export default Messenger;