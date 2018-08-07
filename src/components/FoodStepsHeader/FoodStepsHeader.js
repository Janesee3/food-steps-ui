import { Layout } from "antd";
import NavBar from "../NavBar/NavBar";
import SignInSignUpModal from "../SignInSignUpModal/SignInSignUpModal";
import React, { Component } from "react";
import { Button, Avatar } from "antd";
import "./FoodStepsHeader.css";
import { Row, Col } from "antd";
import NavBarMobile from "../NavBarMobile/NavBarMobile";

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
			<div className="header">
        <Row className="header-mobile" align="middle" justify="center" type="flex">
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
					{this.state.isButtonVisible ? loginButton : userAvatar}
					<SignInSignUpModal
						isModalVisible={this.state.isModalVisible}
						closeModal={this.closeModal}
						onSignInAppCallback={this.props.onSignInAppCallback}
						onSignOutAppCallback={this.props.onSignInAppCallback} // TODO: CHANGE THIS !!!!!!!
						showAvatarInHeader={this.showAvatar}
					/>
          </Col>
        </Row>
				</Header>
			</div>
		);
	}
}

export default FoodStepsHeader;
