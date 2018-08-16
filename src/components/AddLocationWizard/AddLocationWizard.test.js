import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import AddLocationWizard, {
	WIZARD_STEP_LOCATION,
	WIZARD_STEP_FORM
} from "./AddLocationWizard";

it("Snapshot Test for rendering", () => {
	const renderer = new ShallowRenderer();
	renderer.render(<AddLocationWizard />);

	const output = renderer.getRenderOutput();
	expect(output).toMatchSnapshot();
});

describe("Test Methods", () => {
	let renderer;
	let wizardInstance;

	beforeEach(() => {
		renderer = new ShallowRenderer();
		renderer.render(<AddLocationWizard />);
		wizardInstance = renderer.getMountedInstance();
	});

	it("locationNameInput state should remain the same when changeWizardStep is called", () => {
		const MOCK_LOCATION_NAME = "locName";

		const event = {
			target: {
				value: MOCK_LOCATION_NAME
			}
		};
		wizardInstance.onLocationNameInputChange(event);
		wizardInstance.changeWizardStep(WIZARD_STEP_LOCATION);
		wizardInstance.changeWizardStep(WIZARD_STEP_FORM);
		expect(wizardInstance.state.locationNameInput).toEqual(MOCK_LOCATION_NAME);
	});
});
