/** React. */
import { useEffect } from "react";

/** Vendor. */
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/** Component. */
import Loader from "../../components/interfaces/loader.js";
import Message from "../../components/interfaces/message.js";

/** Action. */
import { verifyEmail } from "../../actions/userActions.js";

const Verify = () => {
    /** Use params. */
    const { token } = useParams();

    /** Use selector. */
    const userVerify = useSelector((state) => state.userVerify);
    const { loading, error, success } = userVerify;

    /** Use dispatch. */
    const dispatch = useDispatch();

    /** Use effect. */
    useEffect(() => {
        /** Use dispatch. */
        dispatch(verifyEmail(token));
    }, [dispatch, success]);

    return (
        <>
            {error && <Message children={error} variant="alert-danger" />}
            {loading ? (
                <Loader />
            ) : success ? (
                <Message children={success} variant="alert-success" />
            ) : (
                <div className="flex justify-center items-center h-40 mt-6 m-2 shadow bg-slate-100 border-slate-50 border-opacity-100">
                    <p className="text-center">
                        Request being process, just sit and wait for response
                        from the server!
                    </p>
                </div>
            )}
        </>
    );
};

export default Verify;
