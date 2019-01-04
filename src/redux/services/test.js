const test = requests => ({
    info: () => {
        return requests.get("/user/users");
    },
    login: (username, password) => {
        let pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let options = {};

        if (pattern.test(String(username).toLowerCase())) {
            options = { username, password };
        } else {
            options = { username, password };
        }

        return requests.post("/user/login", options);
    },
    register: payload => {
        return requests.post(`/user/register`, payload);
    },

    changePassword: data =>
        requests.post("/users/change-password", { ...data }),
    resetPassword: data => requests.post("/users/reset-password", { ...data }),
    registerMobile: expoToken =>
        requests.post("/auth/register-push", { expoToken })
});

export default test;
