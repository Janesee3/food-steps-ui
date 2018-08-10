import { Modal, Tabs, message } from "antd";
import React, { Component } from "react";
import SignUpForm from "../SignUpForm/SignUpForm";
import SignInForm from "../SignInForm/SignInForm";

const TabPane = Tabs.TabPane;

class SignInSignUpModal extends Component {
	state = {
		isLoading: false
	};

	toggleIsLoading = () => {
		this.setState({
			isLoading: !this.state.isLoading
		});
	};

	onSignUpSuccess = username => {
		this.toggleIsLoading();
		this.props.onUserLogin({ username });
		this.props.closeModal();
		message.success(`Successfully created account! Welcome ${username}!`, 3);
	};

	onSignUpFail = errMessage => {
		this.toggleIsLoading();

		let displayMessage = `Sign up failed due to unexpected error, please contact admin!`;

		if (errMessage && errMessage.includes("unique")) {
			displayMessage =
				"This username is already used! Please choose another username.";
		}

		message.error(displayMessage, 3);
	};

	onSignInSuccess = username => {
		this.toggleIsLoading();
		this.props.onUserLogin({ username });
		this.props.closeModal();
		message.success(`Successfully signed in! Welcome ${username}!`, 3);
	};

	onSignInFail = errMessage => {
		this.toggleIsLoading();
		let displayMessage = `Sign in failed due to unexpected error, please contact admin!`;

		if (
			errMessage &&
			(errMessage.includes("match") || errMessage.includes("found"))
		) {
			displayMessage = "Username or password is incorrect.";
		}

		message.error(displayMessage, 3);
	};

	render() {
		return (
			<div>
				<Modal
					visible={this.props.isModalVisible}
					title="Welcome To Food Steps"
					onCancel={this.props.closeModal}
					footer={[]}
				>
					<Tabs defaultActiveKey="1">
						<TabPane tab="Sign In" key="1">
							<SignInForm
								toggleIsLoading={this.toggleIsLoading}
								isLoading={this.state.isLoading}
								onSignInSuccess={this.onSignInSuccess}
								onSignInFail={this.onSignInFail}
							/>
						</TabPane>
						<TabPane tab="Sign Up" key="2">
							<SignUpForm
								toggleIsLoading={this.toggleIsLoading}
								isLoading={this.state.isLoading}
								onSignUpSuccess={this.onSignUpSuccess}
								onSignUpFail={this.onSignUpFail}
							/>
						</TabPane>
					</Tabs>
				</Modal>
			</div>
		);
	}
}

export default SignInSignUpModal;
