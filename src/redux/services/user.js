import qs from "query-string";
import utils from "../utils";

const user = requests => ({
    getUser: () => {
        console.log("masuk services");
        //return requests.get(`/posts`);
        return requests.get(`/user`);
    },
    addUser: item => {
        console.log("ini data di services", item);
        return requests.post("/user/register", qs.stringify(item));
    },
    deleteUser: userId => {
        return requests.delete(`user/delete/${userId}`);
    }
});

export default user;
