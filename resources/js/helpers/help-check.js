/** React. */
import { useContext } from "react";

/** Hook. */
import useHttp from "../hooks/use-http";

const helpCheck = () => {
    /** Callback http hook. */
    const responseHandler = (data) => {
        /** Set sucess message. */
        console.log(data.message);
    };

    /** Use http hook. */
    const { sendRequest } = useHttp(
        {
            url: "/api/logout",
            method: "POST",
            params: { token: localStorage.getItem("token") },
            headers: {
                authorization: `Bearer ${localStorage.getItem(
                    "token" || null
                )}`,
            },
        },
        responseHandler
    );

    /** Logout handler. */
    const requestHandler = () => {
        /** Send http request. */
        sendRequest();
    };

    return {
        authenticated: false,
        requestHandler: requestHandler,
    };
};

export default helpCheck;
