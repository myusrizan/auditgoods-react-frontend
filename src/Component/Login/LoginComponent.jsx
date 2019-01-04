import React from "react";
import LoginView from "./LoginView";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import request from "../../redux/request";
import { AUTH_LOGIN, AUTH_LOGOUT } from "../../redux/action/types";

class Login extends React.Component {
    render() {
        const {
            user,
            loginStatus,
            onLoginSubmit,
            onLoginUnload,
            token,
            message,
            tryLogin,
            tryLogout
        } = this.props;

        return (
            <LoginView
                user={user}
                loginStatus={loginStatus}
                onLoginSubmit={onLoginSubmit}
                onLoginUnload={onLoginUnload}
                token={token}
                message={message}
                tryLogin={tryLogin}
                tryLogout={tryLogout}
            />
        );
    }
}

Login.PropTypes = {
    loginStatus: PropTypes.bool,
    listUser: PropTypes.any,
    user: PropTypes.shape({}),
    token: PropTypes.string,
    message: PropTypes.string
};

Login.defaultProps = {
    loginStatus: false,
    user: null,
    token: "",
    message: ""
};

const mapStateToProps = state => ({
    user: state.auth.user,
    loginStatus: state.auth.loginStatus,
    token: state.auth.token,
    message: state.auth.message
});

const mapDispatchToProps = dispatch => ({
    onLoginSubmit: (username, password) =>
        dispatch({
            type: AUTH_LOGIN,
            payload: request.auth.login(username, password)
        }),
    tryLogin: (username, password) =>
        dispatch({
            type: AUTH_LOGIN,
            payload: request.auth.login(username, password)
        }),
    tryLogout: () =>
        dispatch({
            type: AUTH_LOGOUT
        })
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export { connected as Login };
