/** Vendor. */
import axios from "axios";

/** Constant. */
import {
    USER_CREDENTIAL_REQUEST,
    USER_CREDENTIAL_SUCCESS,
    USER_CREDENTIAL_FAILURE,
} from "../constants/userConstants";

export const userCredential = () => async (dispatch) => {
    try {
        /** Dispatch action to set inital state. */
        dispatch({ type: USER_CREDENTIAL_REQUEST });
        /** Prepare request data from backend. */

        /** Dispatch action to set the result into the store. */
        dispatch({ type: USER_CREDENTIAL_SUCCESS, payload: "" });
    } catch (error) {
        console.log(error.message);
        /** Dispatch action if error occurred. */
        dispatch({
            type: USER_CREDENTIAL_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
