import React from "react";
import { Test as TestView } from "./testView";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import request from "../../redux/request";
import {
    USER_LIST,
    AUTH_REGISTER,
    NEW_USER,
    AUTH_LOGIN,
    AUTH_LOGOUT
} from "../../redux/action/types";

class Test extends React.Component {
    render() {
        const {
            getUser,
            listUser,
            newUser,
            tryLogin,
            loginStatus,
            token,
            tryLogout
        } = this.props;
        return (
            <TestView
                loginStatus={loginStatus}
                getUser={getUser}
                listUser={listUser}
                token={token}
                newUser={newUser}
                tryLogin={tryLogin}
                tryLogout={tryLogout}
            />
        );
    }
}

Test.propTypes = {
    loginStatus: PropTypes.bool,
    listUser: PropTypes.any,
    getUser: PropTypes.func,
    newUser: PropTypes.any,
    token: PropTypes.string,
    tryLogin: PropTypes.any
};

Test.defaultProps = {
    listUser: [],
    token: ""
};

const mapStateToProps = state => ({
    listUser: state.user.listUser,
    token: state.auth.token,
    loginStatus: state.auth.loginStatus
});

const mapDispatchToProps = dispatch => ({
    getUser: () =>
        dispatch({
            type: USER_LIST,
            payload: request.user.getUser()
        }),

    register: data =>
        dispatch({
            type: AUTH_REGISTER,
            payload: request.register.register(data)
        }),
    newUser: item =>
        dispatch({
            type: NEW_USER,
            payload: request.user.addUser(item)
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
)(Test);

export { connected as Test };
/*
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Test);
*/
