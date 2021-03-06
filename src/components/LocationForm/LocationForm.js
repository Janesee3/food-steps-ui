import React from "react";
import { Form, Button, Input, Card } from "antd";
import { createUserLocation } from "../../services/userLocationService/userLocationService";
import { notifyError, notifySuccess } from "../../utils/notificationManager";
import "./LocationForm.css";

const CREATE_BUTTON_DISPLAY_TEXT = "Create";
const isDevelopment = process.env.NODE_ENV === "development";

class LocationForm extends React.Component {
	state = {
		isLoading: false
	};

	// ** LIFECYCLE METHODS ** //

	// Added to validate when user tries to create without selecting address
	componentDidMount() {
		this.props.selectedLocation &&
			this.props.form.setFieldsValue({
				address: this.props.selectedLocation.address
			});
	}

	// ** UTILITY METHODS ** //

	toggleIsLoading = () => {
		this.setState({
			isLoading: !this.state.isLoading
		});
	};

	createNewLocation = async values => {
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

	onValidationCompletion = async (err, values) => {
		if (err) {
			this.toggleIsLoading();
			return isDevelopment && console.error(err);
		}

		const creationResult = await this.createNewLocation(values);

		if (!creationResult.ok) {
			this.toggleIsLoading();
			notifyError(creationResult.message);
			return;
		}

		this.props.refreshUserLocationsList();

		notifySuccess(creationResult.message);

		this.resetForm();

		this.toggleIsLoading();

		this.props.cancelWizard();
	};

	handleSubmit = event => {
		event.preventDefault();
		this.props.form.validateFieldsAndScroll(this.onValidationCompletion);
		this.toggleIsLoading();
	};

	render() {
		const editMode = this.props.editMode || false;
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
						],
						initialValue: this.props.locationNameInput
					})(
						<Input
							onChange={event => this.props.onLocationNameInputChange(event)}
						/>
					)}
				</Form.Item>

				{editMode ? (
					<Form.Item id="address" label="Address">
						<Card className="address-card-display">
							<p>
								{
									this.props.selectedLocation.globalLocation
										.geocodedLocationName
								}
							</p>
						</Card>
					</Form.Item>
				) : (
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
				)}

				{!editMode && (
					<Form.Item {...tailFormItemLayout}>
						<Button
							type="primary"
							htmlType="submit"
							loading={this.state.isLoading}
						>
							{CREATE_BUTTON_DISPLAY_TEXT}
						</Button>
					</Form.Item>
				)}
			</Form>
		);
	}
}

export const testExports = {
	LocationForm
};

export default Form.create()(LocationForm);
