import api from "./request";
import {
    API_START,
    API_END,
    APP_LOGOUT,
    APP_LOAD,
    AUTH_LOGIN,
    AUTH_LOGOUT
} from "./action/types";

function isPromise(entry) {
    return entry && typeof entry.then === "function";
}

/* eslint-disable no-param-reassign */
const promiseMiddleware = store => next => action => {
    if (isPromise(action.payload)) {
        store.dispatch({ type: API_START });
        action.payload.then(
            res => {
                action.status = res.status;
                action.payload = res;
                store.dispatch({ type: API_END, payload: action.payload });
                store.dispatch(action);
            },
            error => {
                action.status = "error";
                action.payload =
                    error.response && error.response.data
                        ? error.response.data
                        : error.toString();
                // JSON.stringify(error, Object.getOwnPropertyNames(error)
                store.dispatch({ type: API_END, payload: action.payload });

                if (
                    action.type === APP_LOAD &&
                    action.payload &&
                    action.payload.data &&
                    action.payload.data.message &&
                    (["Unauthorized User", "jwt expired"].indexOf(
                        action.payload.data.message
                    ) > -1 ||
                        action.payload === '"Error: Network Error"')
                ) {
                    store.dispatch({ type: APP_LOGOUT });
                } else {
                    store.dispatch(action);
                }
            }
        );

        return;
    }

    next(action);
};
/* eslint-enable no-param-reassign */
// eslint-disable-next-line no-unused-vars
const bindRequestMiddleware = store => next => action => {
    if (action.type === AUTH_LOGIN) {
        if (action.payload.status === "success") {
            api.setToken(action.payload.data.token);
        }
    } else if (action.type === AUTH_LOGOUT) {
        api.setToken(null);
    }

    next(action);
};

export { promiseMiddleware, bindRequestMiddleware };
