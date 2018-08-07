import { Layout } from "antd";
import NavBar from "../NavBar/NavBar";
import SignInSignUpModal from "../SignInSignUpModal/SignInSignUpModal";
import React, { Component } from "react";
import { Button, Avatar } from "antd";
import "./FoodStepsHeader.css";

const { Header } = Layout;
class FoodStepsHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalVisible: false,
			isButtonVisible: true,
			displayName: ""
		};

		this.closeModal = this.closeModal.bind(this);
	}

	// callback
	closeModal = () => {
		this.setState({ isModalVisible: false });
	};

	showModal = () => {
		this.setState({ isModalVisible: true });
	};

	showAvatar = username => {
		this.setState({ isButtonVisible: false, displayName: username });
	};

	render() {
		const loginButton = (
			<Button
				className="sign-up-button"
				type="primary"
				onClick={this.showModal}
			>
				Sign Up / Sign In
			</Button>
		);

		const userAvatar = (
			<div className="avatar">
				<Avatar icon="user" />
				<span className="avatar-username">{this.state.displayName}</span>
			</div>
		);

		return (
			<div>
				<Header>
					<div className="logo" />
					{this.state.isButtonVisible ? loginButton : userAvatar}
					<SignInSignUpModal
						isModalVisible={this.state.isModalVisible}
						closeModal={this.closeModal}
						onSignInAppCallback={this.props.onSignInAppCallback}
						onSignOutAppCallback={this.props.onSignInAppCallback} // TODO: CHANGE THIS !!!!!!!
						showAvatarInHeader={this.showAvatar}
					/>
					<NavBar />
				</Header>
			</div>
		);
	}
}

export default FoodStepsHeader;
