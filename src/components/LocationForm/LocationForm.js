import React from "react";
import { Form, Button, notification, Input } from "antd";
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
		const tailFormItemLayout = null;

		return (
			<Form layout="vertical" onSubmit={this.handleSubmit}>
				<Form.Item label="Food Place Name" lab>
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

				<Form.Item
					id="address"
					label="Address"
					required={true}
					getFieldDecorator={getFieldDecorator}
				>
					<div>{this.props.selectedLocation.address}</div>
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

		if (!this._isMounted) return;

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

	createNewLocation = async (err, values) => {
		if (err) return isDevelopment && console.error(err);

		console.log("Form Values: ", values);
		console.log("selectedLocation: ", this.props.selectedLocation);

		// Package req body
		const requestBody = {
			locationName: values.locationName,
			geocodedLocationName: this.props.selectedLocation.address,
			lat: this.props.selectedLocation.location.lat,
			lng: this.props.selectedLocation.location.lng
		};

		const result = await createUserLocation(requestBody);
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
		this.props.form.validateFieldsAndScroll(this.createNewLocation);
	};
}

export const testExports = {
	LocationForm,
	SUCCESS_MESSAGE,
	ERROR_MESSAGE
};

export default Form.create()(LocationForm);
