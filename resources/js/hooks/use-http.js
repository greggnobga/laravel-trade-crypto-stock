/** React. */
import { useState, useContext } from 'react';

const useHttp = (reqConfig, applyData) => {
    /** declare local state. */
    const [isLoading, setLoading] = useState(false);
    const [hasError, setError] = useState(false);

    /** declare send request aysnc function. */
    const sendRequest = async () => {
        /** change state. */
        setLoading(true);
        /** try axios request. */
        try {
            const response = await axios({
                url: reqConfig.url,
                method: reqConfig.method ? reqConfig.method : 'GET',
                headers: reqConfig.headers ? reqConfig.headers : {},
                params: reqConfig.params ? reqConfig.params : null,
            })
            /** wait til response data arrived. */
            let data = await response.data;
            /** send to call back function. */
            applyData(data);
        }
        /** catch thrown error. */
        catch (error) {
            /** set error message. */
            setError(true);
            console.log(error);
        }
        /** change state. */
        setLoading(false);
    };

    /** expose to the world. */
    return {
        isLoading,
        sendRequest,
        hasError,
    }
}

export default useHttp;