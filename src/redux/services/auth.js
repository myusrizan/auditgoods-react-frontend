import qs from "query-string";
const auth = requests => ({
    info: () => {
        return requests.get("/user");
    },
    login: (username, password) => {
        // let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let email = username;
        let options = {};
        console.log("username : ", username, "password : ", password);
        if (pattern.test(String(username).toLowerCase())) {
            options = { email, password };
        } else {
            options = { username, password };
        }

        console.log("options : ", options);
        return requests.post("/user/login", qs.stringify(options));
    },
    changePassword: data =>
        requests.post("/users/change-password", { ...data }),
    resetPassword: data => requests.post("/users/reset-password", { ...data }),
    registerMobile: expoToken =>
        requests.post("/auth/register-push", { expoToken }),
    register: data => {
        console.log("masuk register", data);
        return requests.post("/user/register", data);
    }
});

export default auth;
