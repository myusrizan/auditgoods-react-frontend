import axios from "axios";
import auth from "./services/auth";
import user from "./services/user";
import test from "./services/test";
import product from "./services/product";
import register from "./services/register";
import log from "./services/log";
import config from "./constants/config";

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = config.api;
axiosInstance.defaults.headers.common["Content-Type"] = "application/json";

function setToken(token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

const responseBody = res => res.data;
const responseBodyTest = res => res.json();

const requests = {
    get: url => axiosInstance({ method: "get", url }).then(responseBody),
    post: (url, data) =>
        //axiosInstance({ method: "post", url, data }).then(responseBody),
        axiosInstance({ method: "post", url, data }),
    put: (url, data) =>
        //axiosInstance({ method: "put", url, data }).then(responseBody),
        axiosInstance({ method: "put", url, data }),
    delete: url => axiosInstance({ method: "delete", url }).then(responseBody)
};

export default {
    setToken,
    auth: auth(requests),
    user: user(requests),
    test: test(requests),
    register: register(requests),
    product: product(requests),
    log: log(requests)
};
