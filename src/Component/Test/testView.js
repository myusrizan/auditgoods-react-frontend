import React, { Component } from "react";
import { fetchPosts } from "../../redux/action/postAction";
import request from "../../redux/request";
import _ from "lodash";

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listUser: [],
            username: "",
            password: "",
            role: "",
            fullName: "",
            userId: ""
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitGetUser = this.onSubmitGetUser.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
        this.onSubmitDelete = this.onSubmitDelete.bind(this);
        this.onClickLogout = this.onClickLogout.bind(this);
    }

    componentWillMount() {
        console.log("masuk willmount");
        console.log("login status props willmount : ", this.props.loginStatus);
        console.log("token props willmount : ", this.props.token);
    }

    onSubmit() {
        console.log("test");
        const data = {
            username: this.state.username,
            password: this.state.password,
            fullName: this.state.fullName,
            role: this.state.role
        };
        console.log(data);
        this.props.newUser(data);
    }

    onSubmitGetUser() {
        console.log("masuk edan", this.props.getUser());
    }
    onSubmitLogin() {
        console.log("masuk login");
        this.props.tryLogin(this.state.username, this.state.password);
        console.log("token :", this.props.token);
        console.log("login status props : ", this.props.loginStatus);
    }

    onSubmitDelete() {
        console.log("masuk delete", this.state.userId);
        request.user.deleteUser(this.state.userId);
        console.log("proses delete selesai");
    }

    onClickLogout() {
        console.log("logout clicked");
        this.props.tryLogout();
        console.log("proses logout finished");
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)) {
            request.setToken(this.props.token);
        }
    }

    render() {
        /*
        const postItems = this.props.listUser.map(post => (
            <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </div>
        ));
                */
        const postItems = this.props.listUser.map(post => (
            <div key={post._id}>
                <h3>{post.username}</h3>
                <h4>{post.password}</h4>
                <h5>{post.fullName}</h5>
                <p>{post.role}</p>
            </div>
        ));

        return (
            <React.Fragment>
                <h1 className="text-center">Token : {this.props.token}</h1>
                <h1 className="text-center">Add post</h1>
                <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                />
                <input
                    type="text"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                />
                <input
                    type="text"
                    name="fullName"
                    value={this.state.fullName}
                    onChange={this.onChange}
                />
                <input
                    type="text"
                    name="role"
                    value={this.state.role}
                    onChange={this.onChange}
                />
                <button onClick={this.onSubmit}>Submit</button>
                <button onClick={this.onSubmitGetUser}>EDUN</button>
                <br />
                <h1> Data </h1>
                <h5>{postItems}</h5>
                <br />
                <h1>Coba Login</h1>
                <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                />
                <input
                    type="text"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                />
                <button onClick={this.onSubmitLogin}>Submit Login</button>
                <br />
                <h1>Coba Delete</h1>
                <input
                    type="text"
                    name="userId"
                    value={this.state.userId}
                    onChange={this.onChange}
                />
                <button onClick={this.onSubmitDelete}>Submit Login</button>
                <br />
                <button onClick={this.onClickLogout}>Logout</button>
            </React.Fragment>
        );
    }
}

export { Test };
