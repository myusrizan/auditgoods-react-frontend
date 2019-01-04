import { FETCH_POSTS, NEW_POST } from "../action/types";

const initialState = {
    profile: {},
    profiles: [],
    items: [],
    item: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        /*
        case NEW_ACC:
            return {
                ...state,
                profile: action.payload
            };
        case FETCH_ACC:
            return {
                ...state,
                profiles: action.payload
            };
        */
        case FETCH_POSTS:
            return {
                ...state,
                items: action.payload
            };
        case NEW_POST:
            return {
                ...state,
                item: action.payload
            };
        default:
            return state;
    }
}
