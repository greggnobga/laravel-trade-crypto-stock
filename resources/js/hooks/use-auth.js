/**  React. */
import { useEffect } from "react";

/** Vendor. */
import axios from "axios";
import { useDispatch } from "react-redux";

/** Actions. */
import { clearToken } from "../actions/userActions";

const useAuth = () => {
    /** Use dispatch. */
    const dispatch = useDispatch();

    /** Send request to check if user token is valid. */
    const check = async (token) => {
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
        } catch (error) {
            /** Disptach login action to reset the state. */
            dispatch(clearToken());
        }
    };

    /** Return. */
    return { check };
};

export default useAuth;
