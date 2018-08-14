import React from "react";
import { Form, Button, notification, Input, Card } from "antd";
import { createUserLocation } from "../../services/userLocationService/userLocationService";
import "./LocationForm.css";

const CREATE_BUTTON_DISPLAY_TEXT = "Create";
const SUCCESS_MESSAGE = "Location created successfully";
const ERROR_MESSAGE = "An error occurred while creating the location";

const isDevelopment = process.env.NODE_ENV === "development";

class LocationForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const tailFormItemLayout = null;

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <Form.Item label="Food Place Name">
          {getFieldDecorator("locationName", {
            rules: [
              {
                required: true,
                message: "Please give this food place a name!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>

        <Form.Item id="address" label="Address">
          {getFieldDecorator("address", {
            rules: [
              {
                required: true,
                message: "Please select an address!"
              }
            ]
          })(
            <Card
              className="address-card"
              onClick={this.props.goToLocationSelector}
            >
              {this.props.selectedLocation ? (
                <p>{this.props.selectedLocation.address}</p>
              ) : (
                <p className="address-placeholder">Select address</p>
              )}
            </Card>
          )}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            {CREATE_BUTTON_DISPLAY_TEXT}
          </Button>
        </Form.Item>
      </Form>
    );
  }

  // Added to validate when user tries to create without selecting address
  componentDidMount() {
	this.props.selectedLocation &&
      this.props.form.setFieldsValue({
        address: this.props.selectedLocation.address
      });
  }

  notifyError = errorMessage => {
    notification.error({
      message: "Error",
      description: errorMessage
    });
  };

  createNewLocation = async (values) => {
    // Package req body
    const requestBody = {
      locationName: values.locationName,
      geocodedLocationName: this.props.selectedLocation.address,
      lat: this.props.selectedLocation.location.lat,
      lng: this.props.selectedLocation.location.lng
    };

    return await createUserLocation(requestBody);
  };

  resetForm = () => {
    this.props.form.resetFields();
    this.props.resetSelectedLocation();
  };

  onValidationResponded = async (err, values) => {
    if (err) return isDevelopment && console.error(err);

    const creationResult = await this.createNewLocation(values);
    if (!creationResult.ok) {
      this.notifyError(creationResult.message || ERROR_MESSAGE);
      return;
    }
    
    notification.success({
      message: "Success",
      description: SUCCESS_MESSAGE
    });
    this.resetForm();
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFieldsAndScroll(this.onValidationResponded);
  };
}

export const testExports = {
  LocationForm,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE
};

export default Form.create()(LocationForm);
