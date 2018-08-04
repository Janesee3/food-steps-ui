import React from "react";
import { Form, Input, InputNumber, Button, notification } from "antd";
import { API_HOST, postToServer } from "../../utils/networkUtils";

const CREATE_BUTTON_DISPLAY_TEXT = "Create";
const SUCCESS_MESSAGE = "Location created successfully";
const ERROR_MESSAGE = "An error occurred while creating the location";

const isDevelopment = process.env.NODE_ENV === 'development';

class LocationForm extends React.Component {
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
                message: "Latitude should be a number."
              },
              {
                required: true,
                message: "Please input latitude!"
              }
            ]
          })(<InputNumber disabled={!isDevelopment} />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Longitude">
          {getFieldDecorator("lng", {
            rules: [
              {
                type: "number",
                message: "Longitude should be a number."
              },
              {
                required: true,
                message: "Please input longitude!"
              }
            ]
          })(<InputNumber disabled={!isDevelopment} />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            {CREATE_BUTTON_DISPLAY_TEXT}
          </Button>
        </Form.Item>
      </Form>
    );
  }

  componentDidMount() {
    const handlePositioning = position => {
      this.props.form.setFieldsValue({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    };

    const handlePositioningError = positionError => {
      if(isDevelopment) console.error(positionError);

      let errorMessage = positionError.message;
      if (positionError.code === 1) {
        errorMessage = "Please enable browser positioning"
      }
      notification.error({
        message: "Error",
        description: errorMessage
      });
    };

    navigator.geolocation.getCurrentPosition(
      handlePositioning,
      handlePositioningError,
      { enableHighAccuracy: true }
    );
  }

  async createLocation(values) {
    try {
      const response = await postToServer(
        `${API_HOST}/locations/user`,
        values,
        true
      );
      // const response = await fetch(`${API_HOST}/locations/user`, {
      //   method: "POST",
      //   body: JSON.stringify(values),
      //   headers: { "Content-Type": "application/json" },
      //   credentials: "include"
      // });

      let dataErrorMessage;
      if (response.status === 400) {
        const responseBody = await response.json();
        dataErrorMessage = responseBody.message;
      }

      const result = {
        ok: response.ok,
        message: dataErrorMessage
      };
      return result;
    } catch (e) {
      console.error(e);
      return { status: false };
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if(isDevelopment) console.log('LocationForm SUBMITTED VALUES', values);
      
      if (!err) {
        const result = await this.createLocation(values);
        if (result.ok) {
          this.props.form.resetFields();
          notification.success({
            message: "Success",
            description: SUCCESS_MESSAGE
          });
        } else {
          notification.error({
            message: "Error",
            description: result.message || ERROR_MESSAGE
          });
        }
      }
    });
  };
}

export default Form.create()(LocationForm);
