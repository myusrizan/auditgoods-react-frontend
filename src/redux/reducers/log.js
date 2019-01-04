import { LOGREPORT_LIST, LOGRESTOCK_LIST } from "../action/types";

const initialState = {
    listLogReport: [],
    listLogRestock: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGREPORT_LIST:
            return {
                ...state,
                listLogReport: action.payload
            }
        case LOGRESTOCK_LIST:
            return {
                ...state,  
                listLogRestock: action.payload
            }
        default:
            return state;
    }
};
