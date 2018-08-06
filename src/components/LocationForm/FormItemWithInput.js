import React from "react";
import { Form, Input } from "antd";
import { formItemLayout } from "./layout";

const FormItemWithInput = props => {
  let options = {};
  if (props.required) {
    options = {
      rules: [
        {
          required: true,
          message: `Please input ${props.label}!`
        }
      ]
    };
  }

  return (
    <Form.Item {...formItemLayout} label={props.label}>
      {props.getFieldDecorator(props.id, options)(<Input />)}
    </Form.Item>
  );
};

export default FormItemWithInput;
