import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { formItemLayout, tailFormItemLayout } from "./formLayout";

const FormItem = Form.Item;

class RegistrationForm extends Component {
	state = {
		confirmDirty: false
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.props.handleSignIn(values);
			}
		});
	};

	handleConfirmBlur = e => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
		// !!"value" = true
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

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<Form onSubmit={this.handleSubmit}>
				<FormItem {...formItemLayout} label="Username">
					{getFieldDecorator("username", {
						rules: [
							{
								required: true,
								message: "Please input your username!",
								whitespace: true
							}
						]
					})(<Input />)}
				</FormItem>

				<FormItem {...formItemLayout} label="Password">
					{getFieldDecorator("password", {
						rules: [
							{
								required: true,
								message: "Please input your password!"
							}
						]
					})(<Input type="password" />)}
				</FormItem>

				<FormItem {...tailFormItemLayout}>
					<Button
						type="primary"
						htmlType="submit"
						loading={this.props.isLoading}
					>
						Sign In
					</Button>
				</FormItem>
			</Form>
		);
	}
}

const SignInForm = Form.create()(RegistrationForm);
export default SignInForm;
