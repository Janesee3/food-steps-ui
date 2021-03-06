import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { testExports } from "./LocationForm";

const { LocationForm } = testExports;

import {
	createUserLocation,
	SUCCESS_MESSAGE
} from "../../services/userLocationService/userLocationService";

jest.mock("../../services/userLocationService/userLocationService");

const mockGetFieldDecorator = jest.fn(() => (id, options) => {});
const mockResetFields = jest.fn();
const mockSetFieldsValue = jest.fn();

const mockForm = {
	getFieldDecorator: mockGetFieldDecorator,
	resetFields: mockResetFields,
	setFieldsValue: mockSetFieldsValue
};

it("Snapshot Test for rendering", () => {
	const renderer = new ShallowRenderer();
	renderer.render(<LocationForm form={mockForm} />);

	const output = renderer.getRenderOutput();
	expect(output).toMatchSnapshot();
});

describe("Functional Test beyond render()", () => {
	let formInstance;
	let mockSelectedLocation = {
		location: {}
	};
	let mockResetSelectedLocation = jest.fn();
	let mockCancelWizard = jest.fn();
	let mockRefreshUserLocationsList = jest.fn();

	beforeEach(() => {
		mockGetFieldDecorator.mockClear();
		mockResetFields.mockClear();
		mockSetFieldsValue.mockClear();
		mockCancelWizard.mockClear();
		mockResetSelectedLocation.mockClear();
		mockRefreshUserLocationsList.mockClear();

		const renderer = new ShallowRenderer();
		renderer.render(
			<LocationForm
				form={mockForm}
				selectedLocation={mockSelectedLocation}
				resetSelectedLocation={mockResetSelectedLocation}
				cancelWizard={mockCancelWizard}
				refreshUserLocationsList={mockRefreshUserLocationsList}
			/>
		);
		formInstance = renderer.getMountedInstance();
	});

	describe("Test for onValidationComplete", () => {
		let spyForCreateNewLocation;

		const notificationManager = require("../../utils/notificationManager");

		let mockNotifySuccess;
		let mockNotifyError;

		beforeAll(() => {
			mockNotifyError = jest.fn();
			mockNotifySuccess = jest.fn();
			notificationManager.notifyError = mockNotifyError;
			notificationManager.notifySuccess = mockNotifySuccess;
		});

		beforeEach(() => {
			spyForCreateNewLocation = jest.spyOn(formInstance, "createNewLocation");
			mockNotifyError.mockClear();
			mockNotifySuccess.mockClear();
		});

		afterEach(() => {
			spyForCreateNewLocation.mockRestore();
		});

		it("If validation fails with error, should not call createNewLocation and not display notifications", async () => {
			await formInstance.onValidationCompletion({}, null);
			expect(spyForCreateNewLocation).not.toHaveBeenCalled();
		});

		describe("If validation succeeds", () => {
			let spyForResetForm;

			beforeEach(() => {
				spyForResetForm = jest.spyOn(formInstance, "resetForm");
			});

			afterEach(() => {
				spyForCreateNewLocation.mockRestore();
				spyForResetForm.mockRestore();
			});

			it("should call createNewLocation, and notify sucess when server response is ok", async () => {
				const mockServerResponse = {
					ok: true,
					message: "message"
				};
				spyForCreateNewLocation.mockReturnValueOnce(mockServerResponse);

				const formValues = {};
				await formInstance.onValidationCompletion(null, formValues);

				expect(spyForCreateNewLocation).toBeCalledWith(formValues);
				expect(mockNotifySuccess).toBeCalledWith(mockServerResponse.message);
				expect(spyForResetForm).toBeCalled();
				expect(mockCancelWizard).toBeCalled();
				expect(mockRefreshUserLocationsList).toBeCalled();
			});

			it("should call createNewLocation, and notify error when server response is NOT ok", async () => {
				const mockServerResponse = {
					ok: false,
					message: "error message"
				};
				spyForCreateNewLocation.mockReturnValueOnce(mockServerResponse);

				const formValues = {};
				await formInstance.onValidationCompletion(null, formValues);

				expect(spyForCreateNewLocation).toBeCalledWith(formValues);
				expect(mockNotifyError).toBeCalledWith(mockServerResponse.message);
			});
		});
	});

	it("should call validateFieldsAndScroll on handleSubmit", async () => {
		const mockValidateFieldsAndScroll = jest.fn();
		mockForm.validateFieldsAndScroll = mockValidateFieldsAndScroll;

		const event = { preventDefault: jest.fn() };
		formInstance.handleSubmit(event);

		expect(mockValidateFieldsAndScroll).toHaveBeenCalled();
	});
});
