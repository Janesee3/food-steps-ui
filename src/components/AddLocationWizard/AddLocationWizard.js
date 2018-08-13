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
			currentWizardStep: WIZARD_STEP_LOCATION // TODO: Change to FORM
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
				{this.state.currentWizardStep === WIZARD_STEP_LOCATION && (
					// LOCATION SELECTOR PAGE

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
							<Button onClick={this.props.cancelWizard}>Cancel</Button>
						</div>

						<LocationSuggestionList
							nearbyLocations={this.props.nearbyLocations}
							onLocationSelected={this.props.onLocationSelected}
						/>
					</div>
				)}

				{this.state.currentWizardStep === WIZARD_STEP_FORM && (
					// ADD NEW LOCATION FORM PAGE
					<div>
						<Button onClick={() => this.changeWizardStep(WIZARD_STEP_LOCATION)}>
							Back
						</Button>
						<LocationForm selectedLocation={this.props.selectedLocation} />
					</div>
				)}
			</div>
		) : (
			<SignInRequired />
		);
	}
}

export default AddLocationWizard;
