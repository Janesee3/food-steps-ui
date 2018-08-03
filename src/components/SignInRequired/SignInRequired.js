import React, { Component } from "react";
import SignInSignUpModal from "../SignInSignUpModal/SignInSignUpModal";
import { Button, message } from "antd";

class SignInRequired extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  closeModal = () => {
    this.setState({ visible: false });
  };

  onSuccess = username => {
    this.setState({ visible: false });
    this.props.onUserSignedIn();
    message.success(`Welcome ${username}!`, 3);
  };

  onFailure = () => {
    console.log("FAILED signup/signin");
    message.error(
      "signup/signin failed due to unexpected error, please contact admin!",
      3
    );
  };

  render() {
    return (
      <div>
        <p>Please sign in to access this feature.</p>
        <Button type="primary" onClick={this.showModal}>Sign Up / Sign In</Button>
        <SignInSignUpModal
          isModalVisible={this.state.visible}
          handleCancel={this.closeModal}
          onSignUpSuccess={this.onSuccess}
          onSignUpFail={this.onFailure}
          onSignInSuccess={this.onSuccess}
          onSignInFail={this.onFailure}
        />
      </div>
    );
  }
}

export default SignInRequired;
