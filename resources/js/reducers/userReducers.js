import {
    USER_CREDENTIAL_REQUEST,
    USER_CREDENTIAL_SUCCESS,
    USER_CREDENTIAL_FAILURE,
    USER_CREDENTIAL_RESET,
} from "../constants/userConstants";

export const userCredentialReducer = (state = { credential: [] }, action) => {
    switch (action.type) {
        case USER_CREDENTIAL_REQUEST:
            return { loading: true, credential: [] };
        case USER_CREDENTIAL_SUCCESS:
            return { loading: false, credential: action.payload };
        case USER_CREDENTIAL_FAILURE:
            return { loading: false, error: action.payload };
        case USER_CREDENTIAL_RESET:
            return { loading: false, credential: [] };
        default:
            return state;
    }
};
