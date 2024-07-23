// /** Vendor. */
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

// /** Component. */
// import Loader from '../../components/Loader.js';
// import Message from '../../components/Message.js';

// /** Action. */
// import { verifyEmail } from '../../actions/UserActions.js';

const Verify = () => {
    // /** Use selector. */
    // const userVerify = useSelector((state) => state.userVerify);
    // const { loading, error, success } = userVerify;

    // /** Use dispatch. */
    // const dispatch = useDispatch();

    /** Use params. */
    const { token } = useParams();

    useEffect(() => {
        /** Use dispatch. */
        //dispatch(verifyEmail(token));

        /** Check if token is not empty. */
        if (token) {
            console.log(token);
        }
    }, [token]);

    /** Return something. */
    return (
        <div className='p-2 flex justify-center items-center h-fit mt-6 m-2 rounded shadow bg-slate-100 border-slate-200'>
            <p className='text-center'>
                Just relax and wait for the server to respond as the request is being handled!
            </p>
        </div>
    );
};

export default Verify;
