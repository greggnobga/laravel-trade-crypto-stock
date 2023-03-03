/** React. */
import { useContext } from 'react';

/** Hook. */
import useHttp from '../../hooks/use-http';

/** Store. */
import AuthContext from '../../context/auth-context';

const Resend = (props) => {
    /** Use context. */
    const authCtx = useContext(AuthContext);

    /** Process http hook response. */
    const resendResponse = (data) => {
        /** Set reponse validity. */
        authCtx.validifier(true);
        /** Set sucess message. */
        authCtx.messenger(data.message);
    };

    /** Use http hook. */
    const { isLoading, sendRequest } = useHttp({
        url: '/api/resend',
        method: 'POST',
        headers: {
            authorization: `Bearer ${localStorage.getItem('token' || null)}`
        }
    }, resendResponse);

    /** Resend handler. */
    const resendHandler = () => {
        sendRequest();
        props.onHide();
    }

    return (
        <div className="message" onClick={resendHandler}>
            <div className="resend">Please verify your email address by clicking this message box in order to enjoy the full benefits we offered.</div>
        </div>
    );
}

export default Resend;