import {
    MESSAGE_SHOW_SUCCESS,
    MESSAGE_SHOW_FAILURE,
} from "../constants/messageConstants";

export const showMessageReducer = (state = {}, action) => {
    switch (action.type) {
        case MESSAGE_SHOW_SUCCESS:
            return { message: action.payload };
        case MESSAGE_SHOW_FAILURE:
            return { error: action.payload };
        default:
            return state;
    }
};
