import { Layout, Button, Avatar, Row, Col, message } from "antd";
import React, { Component } from "react";
import NavBar from "../NavBar/NavBar";
import NavBarMobile from "../NavBarMobile/NavBarMobile";
import SignInSignUpModal from "../SignInSignUpModal/SignInSignUpModal";
import { getUsername } from "../../utils/userManager";
import { logout } from "../../services/userService/userService";
import "./FoodStepsHeader.css";

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

		const userAvatar = (
			<div className="avatar">
				<Avatar icon="user" />
				<span className="avatar-username">{getUsername()}</span>
				<Button
					className="sign-out-button"
					type="normal"
					onClick={this.handleLogout}
					loading={this.state.isSignOutLoading}
				>
					Sign Out
				</Button>
			</div>
		);

		return (
			<div className="header">
				<Row
					className="header-mobile"
					align="middle"
					justify="center"
					type="flex"
				>
					<Col xs={2} lg={0}>
						<div className="logo" />
					</Col>
				</Row>
				<Header>
					<Row>
						<Col xs={0} lg={2}>
							<div className="logo" />
						</Col>
						<Col xs={0} md={18} lg={16}>
							<NavBar />
						</Col>
						<Col xs={18} sm={16} md={0} lg={0}>
							<NavBarMobile />
						</Col>
						<Col xs={6} sm={8} md={6} lg={6}>
							{this.props.isUserLoggedIn ? userAvatar : loginButton}

							<SignInSignUpModal
								isModalVisible={this.state.isModalVisible}
								closeModal={this.closeModal}
								onUserLogin={this.props.onUserLogin}
							/>
						</Col>
					</Row>
				</Header>
			</div>
		);
	}
}

export default FoodStepsHeader;
