/** Constant. */
import { MESSAGE_SHOW_SUCCESS } from "../constants/MessageConstants";

export const showMessage = (message) => async (dispatch) => {
    /** Dispatch show message action. */
    dispatch({ type: MESSAGE_SHOW_SUCCESS, payload: message });
};
