const environment = () => {
    let location = ""; // domain for mobile apps
    if (process.env.REACT_APP_START_WEB && typeof window !== "undefined") {
        location = window.location.host;
    }

    const parts = location.split(".");
    const domainToSearch = [parts[0], parts[parts.length - 1]].join("|");

    //let urlApi = "https://jsonplaceholder.typicode.com";
    let urlApi = "http://localhost:8000";

    return {
        urlApi
    };
};

const settings = () => {
    const result = {};
    result.roles = ["admin_super", "partner", "trainer", "user"];
    return result;
};

export default {
    //appName: 'Ztoh',
    appName: "auditBarang",
    //description: 'Ztoh Product',
    description: "mobcom Product",
    api: environment().urlApi,
    settings: settings(),
    socket: {
        url: environment().socketUrl,
        path: environment().socketPath
    }
    // tokenName: 'ezcar_t',
    // googleApiKey: environment().googleApiKey,
    // googleApiMobile: environment().googleApiMobile
};
