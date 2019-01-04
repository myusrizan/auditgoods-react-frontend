import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";

import request from "../redux/request";
import { APP_LOAD, AUTH_INFO } from "../redux/action/types";

//ini diganti jadi index initial component

class InitialComponent extends React.Component {
    componentWillMount() {
        const { token } = this.props;
        if (token) {
            request.setToken(token);
        }
        this.props.verifyToken(token ? request.auth.info() : null, token);
        console.log("ini CWM index buat set token : ", this.token);
    }

    render() {
        const {
            user,
            loginStatus,
            token,
            message,
            InitialRoute,
            verifyToken,
            info,
            role
        } = this.props;

        return (
            <InitialRoute
                user={user}
                loginStatus={loginStatus}
                token={token}
                message={message}
                verifyToken={verifyToken}
                info={info}
                role={role}
            />
        );
    }
}

InitialComponent.propTypes = {
    InitialRoute: PropTypes.func.isRequired,
    loginStatus: PropTypes.bool,
    user: PropTypes.shape({}),
    token: PropTypes.string,
    message: PropTypes.string
};

InitialComponent.defaultProps = {
    loginStatus: false,
    user: null,
    token: "",
    message: "",
    role: ""
};

const mapStateToProps = state => ({
    user: state.auth.user,
    loginStatus: state.auth.loginStatus,
    token: state.auth.token,
    message: state.auth.message,
    role: state.auth.role
});

const mapDispatchToProps = dispatch => ({
    verifyToken: (payload, token) =>
        dispatch({ type: APP_LOAD, payload, token }),
    info: token =>
        dispatch({
            type: AUTH_INFO,
            payload: request.auth.info(),
            token: token
        })
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(InitialComponent);

export { connected as InitialComponent };
