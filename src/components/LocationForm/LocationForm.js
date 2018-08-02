import React from "react";
import { Form, Input, InputNumber, Button, notification } from "antd";

const createLocation = async values => {
  try {
    const response = await fetch("http://localhost:3000/locations/user", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });

    if (!response.ok) {
      console.log(`POST REQUEST return status ${response.status}`);
      console.log("RESPONSE BODY:", await response.json());
    }

    return response.ok;
  } catch (e) {
    console.error(e);
    return false;
  }
};

class LocationForm extends React.Component {
  handleSubmit = event => {
    event.preventDefault();

    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const isLocationCreated = await createLocation(values);
        if (isLocationCreated) {
          this.props.form.resetFields();
          notification.success({
            message: "Success",
            description: "Location created successfully"
          });
        } else {
          notification.error({
            message: "Error",
            description: "An error occurred while creating the location"
          });
        }
      } else {
        console.error(err);
      }
    });
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
      <Form onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout} label="Location Name">
          {getFieldDecorator("locationName", {
            rules: [
              {
                required: true,
                message: "Please input location name!"
              }
            ]
          })(<Input />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Geocoded Location Name">
          {getFieldDecorator("geocodedLocationName", {
            rules: [
              {
                required: true,
                message: "Please input geocoded name!"
              }
            ]
          })(<Input />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Latitude">
          {getFieldDecorator("lat", {
            rules: [
              {
                type: "number",
                message: "Latitude should be a number"
              },
              {
                required: true,
                message: "Please input latitude!"
              }
            ]
          })(<InputNumber />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Longitude">
          {getFieldDecorator("lng", {
            rules: [
              {
                type: "number",
                message: "Longitude should be a number"
              },
              {
                required: true,
                message: "Please input longitude!"
              }
            ]
          })(<InputNumber />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(LocationForm);
