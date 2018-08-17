import { Layout, Button, Avatar, message, Menu, Dropdown } from "antd";

import React, { Component } from "react";
import NavBar from "../NavBar/NavBar";
import NavBarMobile from "../NavBarMobile/NavBarMobile";
import SignInSignUpModal from "../SignInSignUpModal/SignInSignUpModal";
import { getUsername } from "../../utils/userManager";
import { logout } from "../../services/userService/userService";
import "./FoodStepsHeader.css";
import logo from "../../assets/FoodStepsLogo.png";

const { Header } = Layout;
class FoodStepsHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalVisible: false,
			isSignOutLoading: false
		};
	}

	closeModal = () => {
		this.setState({ isModalVisible: false });
	};

	showModal = () => {
		this.setState({ isModalVisible: true });
	};

	handleLogout = () => {
		this.toggleSignOutLoading();
		logout(this.onLogoutSucess, this.onLogoutFailed);
	};

	onLogoutSucess = () => {
		this.toggleSignOutLoading();
		this.props.onUserLogout();
		message.success("Successfully logged out", 3);
	};

	onLogoutFailed = () => {
		this.toggleSignOutLoading();
		message.error(
			"Something unexpected occured while logging out. Please try again or contact admin.",
			3
		);
	};

	toggleSignOutLoading = () => {
		this.setState({
			isSignOutLoading: !this.state.isSignOutLoading
		});
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

		const avatarMenu = (
			<Menu theme="dark">
				<Menu.Item onClick={this.handleLogout}>Sign Out</Menu.Item>
			</Menu>
		);

		const userAvatar = (
			<Dropdown
				className="avatar-dropdown"
				overlay={avatarMenu}
				trigger={["click"]}
			>
				<div className="avatar">
					<Avatar icon="user" />
					<span className="avatar-username">{getUsername()}</span>
				</div>
			</Dropdown>
		);

		return (
			<div className="header-wrapper">
				<Header className="header">
					<NavBarMobile className="nav-bar-mobile" />

					<img className="logo" src={logo} alt="logo" />

					<div className="nav-bar-desktop">
						<NavBar mode={"horizontal"} />
					</div>

					{this.props.isUserLoggedIn ? userAvatar : loginButton}

					<SignInSignUpModal
						isModalVisible={this.state.isModalVisible}
						closeModal={this.closeModal}
						onUserLogin={this.props.onUserLogin}
					/>
				</Header>
			</div>
		);
	}
}

export default FoodStepsHeader;
