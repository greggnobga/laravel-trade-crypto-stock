/** Vendor. */
import axios from "axios";

/** Constant. */
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGIN_LOGOUT,
} from "../constants/userConstants";

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
        localStorage.setItem("auth", JSON.stringify(data));
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
