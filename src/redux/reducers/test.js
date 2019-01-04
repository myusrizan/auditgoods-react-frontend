import { GET_TEST } from "../action/types";

const initialState = {
    coba: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_TEST:
            return {
                ...state,
                coba: action.payload
            };
        default:
            return state;
    }
}
