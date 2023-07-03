/** Vendor. */
import axios from "axios";

/** Constant. */
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGIN_LOGOUT,
} from "../constants/userConstants";

export const register =
    (username, firstname, lastname, email, password) => async (dispatch) => {
        try {
            /** Dispatch action to set inital state. */
            dispatch({ type: USER_REGISTER_REQUEST });

            /** Request data from backend. */
            const { data } = await axios({
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                url: "/api/register",
                params: { username, firstname, lastname, email, password },
            });

            /** Dispatch action to set the result into the store. */
            dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
            dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

            /** Save to result to local storage. */
            localStorage.setItem("account", JSON.stringify(data));
        } catch (error) {
            /** Dispatch action if error occurred. */
            dispatch({
                type: USER_REGISTER_FAILURE,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const login = (email, password) => async (dispatch) => {
    try {
        /** Dispatch action to set inital state. */
        dispatch({ type: USER_LOGIN_REQUEST });

        /** Request data from backend. */
        const { data } = await axios({
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            url: "/api/login",
            params: { email, password },
        });

        /** Dispatch action to set the result into the store. */
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        /** Save to result to local storage. */
        localStorage.setItem("account", JSON.stringify(data));
    } catch (error) {
        /** Dispatch action if error occurred. */
        dispatch({
            type: USER_LOGIN_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const logout = (token) => async (dispatch) => {
    try {
        /** Request data from backend. */
        const { data } = await axios({
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            method: "POST",
            url: "/api/logout",
            params: { token },
        });

        /** Dispatch action to set inital state. */
        dispatch({ type: USER_LOGIN_LOGOUT, payload: data.message });
        /** Save to result to local storage. */
        localStorage.removeItem("account");
    } catch (error) {
        /** Dispatch action if error occurred. */
        dispatch({
            type: USER_LOGIN_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
