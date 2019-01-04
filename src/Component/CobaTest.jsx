import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import request from "../redux/request";
import { GET_TEST } from "../redux/action/types";

const register = data => {
    return request.test.register(data);
};

class CobaTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            fullname: "",
            role: "",
            pesan: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        // axios.get("http://localhost:8000/user/users").then(res => {
        //     console.log(res);
        //     this.setState({ pesan: res.data });
        // });
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        const coba = {
            username: this.state.username,
            password: this.state.password,
            fullname: this.state.fullname,
            role: this.state.role
        };
        register(coba);
    }
    render() {
        return (
            <React.Fragment>
                <h1 className="text-center">Add post</h1>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Username</label>
                        <br />
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.onChange}
                        />
                    </div>
                    {/*
                        {
                            "username": "testtest",
                            "password": "testtew",
                            "fullName": "test",
                            "role": "sales"
                        }
                        */}
                    <br />
                    <div>
                        <label>Password</label>
                        <br />
                        <input
                            type="text"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                    </div>

                    <br />
                    <div>
                        <label>Fullname</label>
                        <br />
                        <textarea
                            name="fullname"
                            onChange={this.onChange}
                            value={this.state.fullname}
                        />
                    </div>
                    <br />
                    <div>
                        <label>Role</label>
                        <br />
                        <input
                            type="text"
                            name="role"
                            value={this.state.role}
                            onChange={this.onChange}
                        />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </React.Fragment>
        );
    }
}

CobaTest.PropTypes = {
    getTest: PropTypes.func.isRequired
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
            type: GET_TEST,
            payload: register()
        })
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(CobaTest);

export { connected as CobaTest };
