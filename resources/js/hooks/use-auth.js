/**  React. */
import { useEffect, useState } from "react";

/** Vendor. */
import axios from "axios";

const useAuth = () => {
    /** Declare local state. */
    const [status, setStatus] = useState(false);

    /** Send request to check if user token is valid. */
    const requestStatus = async (token) => {
        /** Try catch block. */
        try {
            /** Send request to check if token is exist. */
            const { data } = await axios({
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "GET",
                url: "/api/dashboard",
            });

            /** Set status to true if token is valid. */
            setStatus(true);
        } catch (error) {
            /** Set status to false if request fail. */
            if (error && error.response.status === 401) setStatus(false);
        }
    };

    useEffect(() => {
        /** Get user login details from storage or null. */
        const userLogin = localStorage.getItem("auth")
            ? localStorage.getItem("auth")
            : null;

        /** If it exists. */
        if (userLogin) {
            /** Parse into json. */
            const details = JSON.parse(userLogin);
            /** send request to check if token is valid. */
            requestStatus(details.access_token);
        }
    }, [status]);

    /** Return. */
    return { status };
};

export default useAuth;
