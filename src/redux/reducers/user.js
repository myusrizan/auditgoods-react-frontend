import { USER_LIST, NEW_USER, DELETE_USER } from "../action/types";

const initialState = {
    listUser: [],
    user: {},
    size: {},
    status: {},
    userId: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_LIST:
            console.log("cek output", action.payload);
            console.log("cek output result", action.payload.result);
            return {
                ...state,
                status: action.payload.status,
                size: action.payload.size,
                listUser: action.payload.result
                //listUser: action.payload
            };
        case NEW_USER:
            console.log("masuk reducer");
            console.log("action payload : ", action.payload);
            return {
                ...state,
                user: action.payload
            };
        case DELETE_USER:
            console.log("masuk reducer");
            console.log("action payload : ", action.payload);
            return {
                ...state,
                userId: action.payload
            };
        default:
            return state;
    }
};
