import React, { Component } from "react";
import { Form, Icon, message, Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
import request from "../../redux/request";
import _ from "lodash";

const FormItem = Form.Item;

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notification: "",
            warning: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleError() {}
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.tryLogin(values.username, values.password);
            }
        });
    };

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)) {
            request.setToken(this.props.token);
            if (this.props.token == "") {
                return message.error("Username atau Password salah !");
            } else {
                console.log("berhasil");
            }
        }
    }
    /* belom tau fungsinya apa 
    
    componentDidUpdate(prevProp) {
        console.log( this.props);
        if (!_.isEqual(prevProp, this.props)) {
            let statusType = 'success';
            if (!this.props.loginStatus) {
                statusType = 'error';
            }
            this.openNotificationWithIcon(statusType, this.props.message);
        }
    }

    openNotificationWithIcon = (type, message) => {
        notification.config({
            placement: "topRight",
        });
        notification[type]({
            message: 'Login Error',
            description: message,
        });
    };
    
    */
    render() {
        const { getFieldDecorator } = this.props.form;
        const { token } = this.props;
        console.log(token);
        return (
            <React.Fragment>
                <div className="background-color-grey page-height box-position">
                    <div className="background-color-white login-box">
                        <h1 className="ml-auto mr-auto text-center">Login</h1>
                        <Form
                            onSubmit={this.handleSubmit}
                            className="login-form"
                        >
                            <FormItem>
                                {getFieldDecorator("username", {
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                "Please input your username!"
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="user"
                                                style={{
                                                    color: "rgba(0,0,0,.25)"
                                                }}
                                            />
                                        }
                                        placeholder="Username"
                                    />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator("password", {
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                "Please input your Password!"
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="lock"
                                                style={{
                                                    color: "rgba(0,0,0,.25)"
                                                }}
                                            />
                                        }
                                        type="password"
                                        placeholder="Password"
                                    />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator("remember", {
                                    valuePropName: "checked",
                                    initialValue: true
                                })(<Checkbox>Remember me</Checkbox>)}{" "}
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                >
                                    Log in
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const Login = Form.create()(LoginForm);

export default Login;
