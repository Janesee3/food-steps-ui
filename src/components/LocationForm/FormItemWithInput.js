import React from "react";
import { Form, Input } from "antd";

const FormItemWithInput = props => {
  let options = {};

  const formItemLayout = null;

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
