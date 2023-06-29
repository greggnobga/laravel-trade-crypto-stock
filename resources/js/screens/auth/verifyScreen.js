/** React. */
import { useEffect, useContext } from "react";

/** Vendor. */
import { useParams, useNavigate } from "react-router-dom";

/** Hook. */
import useHttp from "../../hooks/use-http";

const Verify = () => {
    /** Use navigate. */
    const navigate = useNavigate();

    const verifyResponse = (data) => {
        /** set message. */
        console.log(data.message);
        /** Navigate out if done loading. */
        navigate("/");
    };

    /** Use params. */
    const params = useParams();

    const { isLoading, sendRequest } = useHttp(
        {
            url: "/api/verify",
            method: "POST",
            params: { token: params.token },
        },
        verifyResponse
    );

    /** Send http request. */
    useEffect(() => {
        sendRequest();
    }, []);

    return (
        <form className="form" className="fade-in-bottom">
            <div style={{ textAlign: "center" }}>
                Request being process, just sit and wait for response from the
                server!
            </div>
        </form>
    );
};

export default Verify;
