import React, { Component } from "react";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Routing } from "./routing/Routing";
import { BrowserRouter } from "react-router-dom";
import "./../node_modules/antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.css";
import "./customCss/globul.css";
import "./customCss/usableFonts.css";
import { InitialComponent } from "./Component";
import { configureStore } from "./redux/store";
const { persistor, store } = configureStore();

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Provider store={store}>
                    <PersistGate persistor={persistor}>
                        <BrowserRouter>
                            <InitialComponent InitialRoute={Routing} />
                            {/* <Routing /> */}
                        </BrowserRouter>
                    </PersistGate>
                </Provider>
            </React.Fragment>
        );
    }
}

export default App;
