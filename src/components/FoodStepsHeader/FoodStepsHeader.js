import { Layout } from "antd";
import NavBar from "../NavBar/NavBar";
import SignInSignUpModal from "../SignInSignUpModal/SignInSignUpModal";
import React, { Component } from "react";
import { Button, message, Avatar } from "antd";
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
    this.onSignUpSuccess = this.onSignUpSuccess.bind(this);
    this.onSignUpFail = this.onSignUpFail.bind(this);

    this.onSignInSuccess = this.onSignInSuccess.bind(this);
    this.onSignInFail = this.onSignInFail.bind(this);
  }

  // Sign In Sign Up Modal Callbacks

  onSignUpSuccess = username => {
    this.setState({
      isModalVisible: false,
      isButtonVisible: false,
      displayName: username
    });
    message.success(`Successfully created account! Welcome ${username}!`, 3);
  };

  onSignUpFail = () => {
    message.error(
      `Sign up failed due to unexpected error, please contact admin!`,
      3
    );
  };

  onSignInSuccess = username => {
    this.setState({ isModalVisible: false, isButtonVisible: false });
    this.displayName = username;
    message.success(`Successfully signed in! Welcome ${username}!`, 3);
  };

  onSignInFail = () => {
    message.error(
      `Sign in failed due to unexpected error, please contact admin!`,
      3
    );
  };

  closeModal = () => {
    this.setState({ isModalVisible: false });
  };

  showModal = () => {
    this.setState({
      isModalVisible: true
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
        {this.state.displayName}
      </div>
    );

    return (
      <div>
        <Header>
          <div className="logo" />
          {this.state.isButtonVisible ? loginButton : userAvatar}
          <SignInSignUpModal
            isModalVisible={this.state.isModalVisible}
            handleCancel={this.closeModal}
            onSignUpSuccess={this.onSignUpSuccess}
            onSignUpFail={this.onSignUpFail}
            onSignInSuccess={this.onSignInSuccess}
            onSignInFail={this.onSignInFail}
          />
          <NavBar />
        </Header>
      </div>
    );
  }
}



export default FoodStepsHeader;
