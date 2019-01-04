import _ from "lodash";
import React, { Component } from "react";
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    message,
    AutoComplete
} from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: []
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                this.props.newUser(values);
                message.success("Data Berhasil di registrasi");
            }
        });
    };

    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue("password")) {
            callback("Two passwords that you enter is inconsistent!");
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(["confirm"], { force: true });
        }
        callback();
    };

    handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = [".com", ".org", ".net"].map(
                domain => `${value}${domain}`
            );
        }
        this.setState({ autoCompleteResult });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 8
                }
            }
        };

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        return (
            <div className="background-color-grey page-height registerbox-position">
                <div className="background-color-white register-box">
                    <h1>Register</h1>
                    <Form
                        onSubmit={this.handleSubmit}
                        className="register-form"
                    >
                        <FormItem {...formItemLayout} label="Full Name">
                            {getFieldDecorator("fullName", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your Name!"
                                    }
                                ]
                            })(<Input name="fullName" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Username">
                            {getFieldDecorator("username", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your username!"
                                    }
                                ]
                            })(<Input name="username" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Password">
                            {getFieldDecorator("password", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your password!"
                                    },
                                    {
                                        validator: this.validateToNextPassword
                                    }
                                ]
                            })(<Input type="password" name="password" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Role">
                            {getFieldDecorator("role", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please select your Role!"
                                    }
                                ]
                            })(
                                <Select
                                    name="role"
                                    placeholder="Select a option and change input text above"
                                    onChange={this.handleSelectChange}
                                >
                                    <Option value="owner">Owner</Option>
                                    <Option value="warehouse">Warehouse</Option>
                                    <Option value="sales">Sales</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

const Register = Form.create()(RegistrationForm);

export { Register };
