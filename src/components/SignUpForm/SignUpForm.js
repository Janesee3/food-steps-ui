import React, { Component } from "react";
import { Form, Input, Tooltip, Icon, Button } from "antd";
import { signUpFromServer } from "../../services/userService/userService";

const FormItem = Form.Item;

class RegistrationForm extends Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        signUpFromServer(
          values,
          this.props.onSignUpSuccess,
          this.props.onSignUpFail
        );
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    // !!"value" = true
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <Form id="signup-form" onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="Username">
          {getFieldDecorator("username", {
            rules: [
              {
                required: true,
                message: "Please input your username!",
                whitespace: true
              },
              {
                max: 20,
                min: 6,
                pattern: /^[a-zA-Z0-9]{6,20}\b/,
                message:
                  "Username should contain only 6 - 20 alphanumeric characters"
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Password">
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your password!"
              },
              {
                validator: this.validateToNextPassword
              },
              {
                max: 20,
                min: 8,
                message: "Password should be 8 - 20 characters"
              }
            ]
          })(<Input type="password" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Confirm Password">
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Please confirm your password!"
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={
            <span>
              Email&nbsp;
              <Tooltip title="Your email is required in the event that you forget your password.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(<Input />)}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const SignUpForm = Form.create()(RegistrationForm);
export default SignUpForm;
