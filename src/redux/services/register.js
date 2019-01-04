const register = requests => ({
    register: data => {
        console.log("masuk register register", data);
        return requests.post("/user/register", data);
    }
});

export default register;
