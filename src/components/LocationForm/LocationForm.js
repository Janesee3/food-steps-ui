import React from "react";
import { Form, Input, InputNumber, Button, notification } from "antd";
import { createUserLocation } from "../../services/userLocationService/userLocationService";

const CREATE_BUTTON_DISPLAY_TEXT = "Create";
const SUCCESS_MESSAGE = "Location created successfully";
const ERROR_MESSAGE = "An error occurred while creating the location";

const isDevelopment = process.env.NODE_ENV === "development";

class LocationForm extends React.Component {
  constructor() {
    super();
    this._isMounted = false;
  }

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
    this._isMounted = true;
    navigator.geolocation.getCurrentPosition(
      this.handlePositioning,
      this.handlePositioningError,
      { enableHighAccuracy: true }
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // When switching page too fast, this warning is shown
  // Console Error: You cannot set field before registering it.
  // Intermittent console: Warning: Can't call setState (or forceUpdate) on an unmounted component.
  // REF FOR FIX: https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
  // To look into optimal solution, if necessary

  handlePositioning = position => {
    this._isMounted &&
      this.props.form.setFieldsValue({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
  };

  handlePositioningError = positionError => {
    isDevelopment && console.error(positionError);

    let errorMessage = positionError.message;
    if (positionError.code === 1) {
      errorMessage = "Please enable browser positioning";
    }
    this.notifyError(errorMessage);
  };

  notifyError = errorMessage => {
    notification.error({
      message: "Error",
      description: errorMessage
    });
  };

  onFieldValidationResponse = async (err, values) => {
    if (err) return isDevelopment && console.error(err);

    const result = await createUserLocation(values);
    if (!result.ok) {
      this.notifyError(result.message || ERROR_MESSAGE);
      return;
      }
          this.props.form.resetFields();
          notification.success({
            message: "Success",
            description: SUCCESS_MESSAGE
          });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFieldsAndScroll(this.onFieldValidationResponse);
  };
}

export default Form.create()(LocationForm);
