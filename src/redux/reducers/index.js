import { combineReducers } from "redux";
import postReducer from "./postReducer";
import auth from "./auth";
import user from "./user";
import coba from "./test";
import product from "./product";
import log from "./log";

const rehydrated = (state = false, action) => {
    switch (action.type) {
        case "persist/REHYDRATE":
            return true;
        default:
            return state;
    }
};

export default combineReducers({
    auth,
    user,
    posts: postReducer,
    coba,
    product,
    log
});
