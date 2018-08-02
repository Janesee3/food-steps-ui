import { Layout } from "antd";
import NavBar from "../NavBar/NavBar";
import SignInSignUpModal from "../SignInSignUpModal/SignInSignUpModal";
import React, { Component } from "react";
import { Button } from "antd";
import "./FoodStepsHeader.css";

const { Header } = Layout;
class FoodStepsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };

    this.handleCancel = this.handleCancel.bind(this);

  }

  // Sign In Sign Up Modal Callbacks

  handleCancel = () => {
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
            handleCancel={this.handleCancel}
          />
          <NavBar />
        </Header>
      </div>
    );
  }
}

export default FoodStepsHeader;
