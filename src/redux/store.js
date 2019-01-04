import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import thunk from "redux-thunk";
import { promiseMiddleware, bindRequestMiddleware } from "./middleware";
import reducers from "./reducers";

/*
const initialState = {};

const middleware = [thunk];

const store = createStore(
    reducers,
    initialState,
    applyMiddleware(...middleware)
    /* //biar bisa diinspect sama ext google chrome
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export { store };
*/

/* Redux Persist Config */
const config = {
    key: "root",
    storage,
    whitelist: ["auth"]
};

const reducer = persistReducer(config, reducers);

const initialState = {};
const enhancers = [];
const middleware = [promiseMiddleware, bindRequestMiddleware];

if (process.env.NODE_ENV === "development") {
    const { devToolsExtension } = window;

    if (typeof devToolsExtension === "function") {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

const configureStore = () => {
    const store = createStore(reducer, initialState, composedEnhancers);
    const persistor = persistStore(store, null, () => {
        store.getState();
    });

    return { persistor, store };
};

export { configureStore };
