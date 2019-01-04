import {
    NEW_PRODUCT,
    DELETE_PRODUCT,
    LIST_PRODUCT,
    GET_PRODUCT,
    UPDATE_PRODUCT
} from "../action/types";

const initialState = {
    listProduct: [],
    size: {},
    statusCode: "",
    product: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LIST_PRODUCT:
            console.log("cek output", action.payload);
            console.log("cek output result", action.payload.result);
            return {
                ...state,
                size: action.payload.size,
                listProduct: action.payload.result
                //listproduct: action.payload
            };
        case NEW_PRODUCT:
            console.log("action payload : ", action.payload);
            console.log(
                "action payload status code: ",
                action.payload.statusCode
            );
            return {
                ...state,
                status: action.payload.statusCode,
                product: action.payload.data
            };
        case DELETE_PRODUCT:
            console.log("masuk reducer");
            console.log("action payload : ", action.payload);
            return {
                ...state,
                productId: action.payload
            };
        case GET_PRODUCT:
            console.log("isi : ", action.payload.data);
            return {
                ...state,
                product: action.payload.data
            };
        case UPDATE_PRODUCT:
            console.log("action payload : ", action.payload);
            return {
                ...state,
                status: action.payload.statusCode,
                product: action.payload.data
            };
        default:
            return state;
    }
};
