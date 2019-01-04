import React, { Component } from "react";
import {
    History,
    Route,
    BrowserRouter,
    Switch,
    Navlink,
    Link,
    Redirect
} from "react-router-dom";
import {
    Login,
    ErrorPage,
    CobaPost,
    PostForm,
    Register,
    Report,
    RestockVal,
    NavigationBar,
    Statistic,
    DashboardWarehouse,
    DashboardSales,
    RegisterComponent
} from "../Component/componentIndex";

import { DashboardManager } from "../Component/Manager-Pages/index";
import qs from "query-string";
import request from "../redux/request";
import { Test } from "../Component/Test/testComponent";

class Routing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pathName: "",
            origin: "",
            role: "",
            query: {}
        };
    }

    componentWillMount() {
        const { location } = this.props;
        const query = qs.parse(window.location.search, {
            ignoreQueryPrefix: true
        });
        console.log("ini role : ", this.props.role);

        if (query.t) {
            this.setState({
                pathName: window.location.pathname,
                origin: window.location.origin,
                query: query
            });
            request.setToken(query.t);
            this.props.info(query.t);
            console.log(query);
        }
    }

    componentDidUpdate(prevProps) {
        const { location } = this.props;
        console.log(this.state);
        if (this.state.pathName && this.state.origin && this.state.query) {
            window.location.href = `${this.state.origin}${this.state.pathName}`;
        }
    }

    render() {
        const { token } = this.props;
        return (
            <React.Fragment>
                <BrowserRouter>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={props => {
                                return token ? (
                                    <DashboardManager {...props} />
                                ) : (
                                    <Login />
                                );
                            }}
                        />
                        <Route path="/register" component={RegisterComponent} />
                        <Route
                            path="/manager"
                            render={props => {
                                return (
                                    <DashboardManager
                                        token={token}
                                        {...props}
                                    />
                                );
                            }}
                        />
                        <Route
                            exact
                            path="/test"
                            render={props => {
                                return <Test token={token} {...props} />;
                            }}
                        />
                        <Route
                            path="/warehouse"
                            render={props => {
                                return token ? (
                                    <DashboardWarehouse {...props} />
                                ) : (
                                    <Login />
                                );
                            }}
                        />
                        <Route
                            path="/sales"
                            render={props => {
                                return token ? (
                                    <DashboardSales {...props} />
                                ) : (
                                    <Login />
                                );
                            }}
                        />
                        <Route
                            path="/owner/report"
                            render={props => {
                                return <Report {...props} />;
                            }}
                        />
                        <Route
                            path="/owner/validation"
                            render={props => {
                                return <RestockVal {...props} />;
                            }}
                        />
                        <Route
                            path="/owner/statistik"
                            render={props => {
                                return <Statistic {...props} />;
                            }}
                        />
                        <Route component={ErrorPage} />
                    </Switch>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}

export { Routing };
