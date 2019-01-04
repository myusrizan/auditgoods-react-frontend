import qs from "query-string";
import utils from "../utils";
import { request } from "https";

const product = requests => ({
    getListProduct: () => {
        console.log("masuk services");
        //return requests.get(`/posts`);
        return requests.get(`/product`);
    },
    addProduct: item => {
        console.log("ini data di services", item);
        return requests.post("/product/create", qs.stringify(item));
    },
    deleteProduct: productId => {
        return requests.delete(`product/delete/${productId}`);
    },
    restockProduct: (productId, data) => {
        return requests.post(`/product/restock/${productId}`, data);
    },
    getProduct: productId => {
        return requests.get(`product/${productId}`);
    },
    updateProduct: (productId, data) => {
        return requests.put(`product/update/${productId}`, data);
    },
    sellProduct: (productId, data) => {
        return requests.post(`/product/sell/${productId}`, data);
    }
});

export default product;
