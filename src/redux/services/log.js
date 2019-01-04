const log = requests => ({
    logReport: () => {
        return requests.get("/product/logreport");
    },
    logRestock: () => {
        return requests.get("/product/logrestock");
    },
    logRestockValid: (logRestockId, data) => {
        const payload = {
            status: data
        };

        requests.post(`/product/restock/validation/${logRestockId}`, payload);
    }
});

export default log;
