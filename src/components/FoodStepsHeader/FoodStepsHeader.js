import { Layout } from "antd";
import NavBar from "../NavBar/NavBar";
import SignInSignUpModal from "../SignInSignUpModal/SignInSignUpModal";
import React, { Component } from "react";
import { Button, message } from "antd";
import "./FoodStepsHeader.css";
import { Row, Col } from "antd";
import NavBarMobile from "../NavBarMobile/NavBarMobile";

const { Header } = Layout;
class FoodStepsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };

    this.closeModal = this.closeModal.bind(this);
    this.onSignUpSuccess = this.onSignUpSuccess.bind(this);
    this.onSignUpFail = this.onSignUpFail.bind(this);

    this.onSignInSuccess = this.onSignInSuccess.bind(this);
    this.onSignInFail = this.onSignInFail.bind(this);
  }

  // Sign In Sign Up Modal Callbacks

  onSignUpSuccess = username => {
    this.setState({ visible: false });
    this.props.onSignInAppCallback();
    message.success(`Successfully created account! Welcome ${username}!`, 3);
  };

  onSignUpFail = errMessage => {
    let displayMessage = `Sign up failed due to unexpected error, please contact admin!`;

    if (errMessage && errMessage.includes("unique")) {
      displayMessage =
        "This username is already used! Please choose another username.";
    }

    message.error(displayMessage, 3);
  };

  onSignInSuccess = username => {
    this.setState({ visible: false });
    this.props.onSignInAppCallback();
    message.success(`Successfully signed in! Welcome ${username}!`, 3);
  };

  onSignInFail = errMessage => {
    let displayMessage = `Sign in failed due to unexpected error, please contact admin!`;

    if (
      errMessage &&
      (errMessage.includes("match") || errMessage.includes("found"))
    ) {
      displayMessage = "Username or password is incorrect.";
    }

    message.error(displayMessage, 3);
  };

  closeModal = () => {
    this.setState({ visible: false });
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  render() {
    return (
      <div>
        <Header>
          <Row gutter={24}>
            <Col xs={0} sm={0} md={4}>
              <div className="logo" />
            </Col>
            <Col xs={0} md={0} lg={16}>
              <NavBar />
            </Col>
            <Col xs={8} sm={14} md={16} lg={0}>
              <NavBarMobile />
            </Col>
            <Col xs={12} sm={6} md={4} lg={4}>
              <Button
                className="sign-up-button"
                type="primary"
                onClick={this.showModal}
              >
                Sign Up / Sign In
              </Button>
              <SignInSignUpModal
                isModalVisible={this.state.visible}
                handleCancel={this.closeModal}
                onSignUpSuccess={this.onSignUpSuccess}
                onSignUpFail={this.onSignUpFail}
                onSignInSuccess={this.onSignInSuccess}
                onSignInFail={this.onSignInFail}
              />
            </Col>
          </Row>
        </Header>
      </div>
    );
  }
}

export default FoodStepsHeader;
