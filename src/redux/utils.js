const jsonToQueryString = json =>
    `?${Object.keys(json)
        .map(
            key => `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`
        )
        .join("&")}`;

const profileUrl = user => `/user/${user.role.replace("_", "-")}/${user._id}`;

export default {
    jsonToQueryString,
    profileUrl
};
