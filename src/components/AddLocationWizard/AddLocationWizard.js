import React, { Component } from "react";
import { Button } from "antd";
import LocationSuggestionList from "../LocationSuggestionList/LocationSuggestionList";
import LocationForm from "../LocationForm/LocationForm";
import SignInRequired from "../SignInRequired/SignInRequired";
import "./AddLocationWizard.css";

export const WIZARD_STEP_FORM = "form";
export const WIZARD_STEP_LOCATION = "locations";

class AddLocationWizard extends Component {
	constructor() {
		super();
		this.state = {
			currentWizardStep: WIZARD_STEP_FORM,
			locationNameInput: ""
		};
	}

	onLocationNameInputChange = event => {
		this.setState({ locationNameInput: event.target.value });
	};

	changeWizardStep = step => {
		this.setState({
			currentWizardStep: step
		});
	};

	cancelWizard = () => {
		this.props.setSelectedLocation(null);
		this.props.cancelWizard();
	};

	render() {
		return this.props.isUserLoggedIn ? (
			<div>
				{/* LOCATION SELECTOR PAGE */}
				{this.state.currentWizardStep === WIZARD_STEP_LOCATION && (
					<div>
						<div className="button-container">
							<Button
								id="choose-loc-btn"
								type="primary"
								disabled={!this.props.selectedLocation}
								onClick={() => this.changeWizardStep(WIZARD_STEP_FORM)}
							>
								Choose Location
							</Button>
							<Button onClick={() => this.changeWizardStep(WIZARD_STEP_FORM)}>
								Back
							</Button>
						</div>

						<LocationSuggestionList
							nearbyLocations={this.props.nearbyLocations}
							onLocationSelected={this.props.setSelectedLocation}
						/>
					</div>
				)}

				{/* ADD NEW LOCATION FORM PAGE */}
				{this.state.currentWizardStep === WIZARD_STEP_FORM && (
					<div>
						<Button onClick={this.cancelWizard}>Cancel</Button>
						<LocationForm
							selectedLocation={this.props.selectedLocation}
							resetSelectedLocation={() => this.props.setSelectedLocation(null)}
							goToLocationSelector={() =>
								this.changeWizardStep(WIZARD_STEP_LOCATION)
							}
							onLocationNameInputChange={this.onLocationNameInputChange}
							locationNameInput={this.state.locationNameInput}
							cancelWizard={this.props.cancelWizard}
						/>
					</div>
				)}
			</div>
		) : (
			<SignInRequired />
		);
	}
}

export default AddLocationWizard;
