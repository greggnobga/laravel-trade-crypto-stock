/** Constant. */
import { MESSAGE_SHOW_SUCCESS } from "../constants/messageConstants";

export const showMessage = (message) => async (dispatch) => {
    /** Dispatch show message action. */
    dispatch({ type: MESSAGE_SHOW_SUCCESS, payload: message });
};
