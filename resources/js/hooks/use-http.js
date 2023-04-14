/** React. */
import { useState, useContext } from "react";

/** Store. */
import AuthContext from "../context/auth-context";

const useHttp = (reqConfig, applyData) => {
    /** declare local state. */
    const [isLoading, setLoading] = useState(false);
    const [hasError, setError] = useState(false);

    /** Use context. */
    const authCtx = useContext(AuthContext);

    /** declare send request aysnc function. */
    const sendRequest = async () => {
        /** change state. */
        setLoading(true);
        /** try axios request. */
        try {
            const response = await axios({
                url: reqConfig.url,
                method: reqConfig.method ? reqConfig.method : "GET",
                headers: reqConfig.headers ? reqConfig.headers : {},
                params: reqConfig.params ? reqConfig.params : null,
            });
            /** wait til response data arrived. */
            let data = await response.data;
            /** send to call back function. */
            applyData(data);
        } catch (error) {
            /** debug thrown error. */
            console.log(error);
            /** set valid to false. */
            authCtx.validifier(false);
            /** set error message. */
            if (error.hasOwnProperty("response")) {
                authCtx.messenger(error.response.data.message);
            }
            /** set error true. */
            setError(true);
        }
        /** change state. */
        setLoading(false);
    };

    /** expose to the world. */
    return {
        isLoading,
        sendRequest,
        hasError,
    };
};

export default useHttp;
