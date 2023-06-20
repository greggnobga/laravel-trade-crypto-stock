/** React. */
import { useState, useContext } from "react";

/** Vendor. */
import axios from "axios";

const useHttp = (config) => {
    /** declare local state. */
    const [result, setResult] = useState([]);
    const [error, setError] = useState();

    /** declare send request aysnc function. */
    const sendRequest = async () => {
        /** try axios request. */
        try {
            const response = await axios({
                url: config.url,
                method: config.method ? config.method : "GET",
                headers: config.headers ? config.headers : {},
                params: config.params ? config.params : null,
            });
            /** wait til response data arrived. */
            let data = await response.data;
            /** set state. */
            setResult(data);
        } catch (error) {
            let message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            /** set error message. */
            setError(message);
        }
    };

    /** expose to the world. */
    return {
        result,
        error,
        sendRequest,
    };
};

export default useHttp;
