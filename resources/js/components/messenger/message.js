/** React. */
import { useContext } from 'react';

/** Store. */
import AuthContext from '../../context/auth-context';

const Message = (props) => {
    /** Use context. */
    const authCtx = useContext(AuthContext);

    /** Set class base on response validity. */
    const noticeClasses = authCtx.valid ? 'success' : 'error';

    /** Return something. */
    return (
        <div className="message" onClick={props.onHide}>
            <div className={noticeClasses}>{authCtx.message}</div>
        </div>
    );

}

export default Message;