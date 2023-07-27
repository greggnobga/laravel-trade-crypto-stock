/** Constant. */
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGIN_LOGOUT,
    USER_LOGIN_CLEAR,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    USER_VERIFY_REQUEST,
    USER_VERIFY_SUCCESS,
    USER_VERIFY_FAILURE,
    USER_FORGOT_REQUEST,
    USER_FORGOT_SUCCESS,
    USER_FORGOT_FAILURE,
    USER_RESET_REQUEST,
    USER_RESET_SUCCESS,
    USER_RESET_FAILURE,
    USER_TOKEN_REQUEST,
    USER_TOKEN_SUCCESS,
    USER_TOKEN_FAILURE,
} from "../constants/UserConstants";

/** Reset reducer. */
export const userResetReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_RESET_REQUEST:
            return { loading: true };
        case USER_RESET_SUCCESS:
            return { loading: false, ...action.payload };
        case USER_RESET_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

/** Forgot reducer. */
export const userForgotReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_FORGOT_REQUEST:
            return { loading: true };
        case USER_FORGOT_SUCCESS:
            return { loading: false, success: action.payload };
        case USER_FORGOT_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userVerifyReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_VERIFY_REQUEST:
            return { loading: true };
        case USER_VERIFY_SUCCESS:
            return { loading: false, success: action.payload };
        case USER_VERIFY_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

/** Register reducer. */
export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, ...action.payload };
        case USER_REGISTER_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

/** Login reducer. */
export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, ...action.payload };
        case USER_LOGIN_FAILURE:
            return { loading: false, error: action.payload };
        case USER_LOGIN_LOGOUT:
            return { loading: false, ...action.payload };
        case USER_LOGIN_CLEAR:
            return {};
        default:
            return state;
    }
};

/** Token reducer. */
export const userTokenReducer = (state = { valid: false }, action) => {
    switch (action.type) {
        case USER_TOKEN_REQUEST:
            return { loading: true };
        case USER_TOKEN_SUCCESS:
            return { loading: false, valid: action.payload };
        case USER_TOKEN_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
