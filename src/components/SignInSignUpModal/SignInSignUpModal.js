import { Modal, Tabs } from "antd";
import React, { Component } from "react";
import SignUpForm from "../SignUpForm/SignUpForm";
import SignInForm from '../SignInForm/SignInForm';

const TabPane = Tabs.TabPane;

function callback(key) {
  // console.log(key);
}

class SignInSignUpModal extends Component {
  render() {
    return (
      <div>
        <Modal
          visible={this.props.isModalVisible}
          title="Welcome To Food Steps"
          onCancel={this.props.handleCancel}
          footer={[]}
        >
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Sign In" key="1">
            <SignInForm
                onSignUpSuccess={this.props.onSignUpSuccess}
                onSignUpFail={this.props.onSignUpFail}
              />
            </TabPane>
            <TabPane tab="Sign Up" key="2">
              <SignUpForm
                onSignUpSuccess={this.props.onSignUpSuccess}
                onSignUpFail={this.props.onSignUpFail}
              />
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    );
  }
}

export default SignInSignUpModal;
