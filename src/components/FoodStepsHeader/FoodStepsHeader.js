import { Layout } from "antd";
import NavBar from "../NavBar/NavBar";
import SignInSignUpModal from "../SignInSignUpModal/SignInSignUpModal";
import React, { Component } from "react";
import { Button, message } from "antd";
import "./FoodStepsHeader.css";

const { Header } = Layout;
class FoodStepsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };

    this.closeModal = this.closeModal.bind(this);
    this.onSignUpSuccess = this.onSignUpSuccess.bind(this);
  }

  // Sign In Sign Up Modal Callbacks

  onSignUpSuccess = username => {
    this.setState({ visible: false });
    message.success(`Successfully created account! Welcome ${username}!`, 3);
  };

  onSignUpFail = () => {
    this.setState({ visible: false });
    message.error(
      `Sign up failed due to unexpected error, please contact admin!`,
      3
    );
  };

  closeModal = () => {
    this.setState({ visible: false });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  render() {
    return (
      <div>
        <Header>
          <div className="logo" />
          <Button
            className="sign-up-button"
            type="primary"
            onClick={this.showModal}
          >
            Sign Up
          </Button>
          <SignInSignUpModal
            isModalVisible={this.state.visible}
            handleCancel={this.closeModal}
            onSignUpSuccess={this.onSignUpSuccess}
            onSignUpFail={this.onSignUpFail}
          />
          <NavBar />
        </Header>
      </div>
    );
  }
}

export default FoodStepsHeader;
