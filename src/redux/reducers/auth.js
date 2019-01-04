import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_INFO,
    AUTH_REGISTER
} from "../action/types";

const initialState = {
    user: null,
    loginStatus: false,
    token: "",
    registerResult: {},
    message: "",
    role: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
            console.log("AUTH_LOGIN :", action.payload);
            return {
                ...state,
                user:
                    action.payload && action.payload.data
                        ? action.payload.data.data
                        : null,
                loginStatus:
                    action.payload && action.payload.data ? true : false,
                token:
                    action.payload && action.payload.data
                        ? //? action.payload.data.token
                          action.payload.data.data.token
                        : "",
                role:
                    action.payload && action.payload.data
                        ? //? action.payload.data.token
                          action.payload.data.data.role
                        : "",
                message:
                    action.payload && action.payload.data
                        ? /*
                        ? action.payload.data.message
                        : action.payload.message
                        */
                          action.payload.data.message
                        : action.payload.message
            };
        case AUTH_INFO:
            return {
                ...state,
                user:
                    action.payload && action.payload.data
                        ? action.payload.data
                        : null,
                loginStatus:
                    action.payload && action.payload.data ? true : false,
                token:
                    action.payload && action.payload.data ? action.token : "",
                message:
                    action.payload && action.payload.data
                        ? action.payload.data.message
                        : "",
                role:
                    action.payload && action.payload.data
                        ? //? action.payload.data.token
                          action.payload.data.data.role
                        : ""
            };
        case AUTH_LOGOUT:
            return {
                user: null,
                loginStatus: false,
                role: "",
                token: ""
            };
        case AUTH_REGISTER:
            return {
                ...state,
                registerResult: action.payload
            };
        default:
            return state;
    }
};
