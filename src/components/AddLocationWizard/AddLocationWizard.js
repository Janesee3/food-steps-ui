import React, { Component } from "react";
import { Button } from "antd";
import LocationSuggestionList from "../LocationSuggestionList/LocationSuggestionList";
import LocationForm from "../LocationForm/LocationForm";
import SignInRequired from "../SignInRequired/SignInRequired";
import "./AddLocationWizard.css";

const WIZARD_STEP_FORM = "form";
const WIZARD_STEP_LOCATION = "locations";

class AddLocationWizard extends Component {
	constructor() {
		super();
		this.state = {
			currentWizardStep: WIZARD_STEP_FORM
		};
	}

	changeWizardStep = step => {
		this.setState({
			currentWizardStep: step
		});
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
							onLocationSelected={this.props.onLocationSelected}
						/>
					</div>
				)}

				{/* ADD NEW LOCATION FORM PAGE */}
				{this.state.currentWizardStep === WIZARD_STEP_FORM && (
					<div>
						<Button onClick={this.props.cancelWizard}>Cancel</Button>
						<LocationForm
							selectedLocation={this.props.selectedLocation}
							goToLocationSelector={() =>
								this.changeWizardStep(WIZARD_STEP_LOCATION)
							}
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
