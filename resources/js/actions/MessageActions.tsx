/** Constant. */
import { MESSAGE_SHOW_SUCCESS } from '../constants/MessageConstants';

/** Interface. */
import { Action } from '../types/Interfaces';

export const showMessage = (message: string) => async (dispatch: ({ type, payload }: Action) => void) => {
    /** Dispatch show message action. */
    dispatch({ type: MESSAGE_SHOW_SUCCESS, payload: message });
};
