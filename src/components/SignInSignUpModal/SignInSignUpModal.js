import { Button, Modal, Tabs } from "antd";
import React, { Component } from "react";
import SignUpForm from '../SignUpForm/SignUpForm';

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

class SignInSignUpModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Modal
          visible={this.props.isModalVisible}
          title="Welcome To Food Steps"
          onOk={this.props.handleSignUpSubmit}
          onCancel={this.props.handleCancel}
          footer={[
            <Button key="back" onClick={this.props.handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={this.props.handleSignUpSubmit}
            >
              Submit
            </Button>
          ]}
        >
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Sign In" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Sign Up" key="2">
               <SignUpForm />
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    );
  }
}

export default SignInSignUpModal;
