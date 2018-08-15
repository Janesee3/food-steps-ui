import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { testExports } from "./LocationForm";

const {
  LocationForm,
  NOTIFCATION_TITLE_ERROR,
  NOTIFCATION_TITLE_SUCCESS
} = testExports;

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

  beforeEach(() => {
    mockGetFieldDecorator.mockClear();
    mockResetFields.mockClear();
    mockSetFieldsValue.mockClear();

    const renderer = new ShallowRenderer();
    renderer.render(
      <LocationForm
        form={mockForm}
        selectedLocation={mockSelectedLocation}
        resetSelectedLocation={mockResetSelectedLocation}
      />
    );
    formInstance = renderer.getMountedInstance();
  });

  describe("Test for Notify methods", () => {
    const { notification } = require("antd");
    let spyForNotifError, spyForNotifSuccess;

    beforeEach(() => {
      spyForNotifError = jest.spyOn(notification, "error");
      spyForNotifSuccess = jest.spyOn(notification, "success");
    });

    afterEach(() => {
      spyForNotifError.mockRestore();
      spyForNotifSuccess.mockRestore();
    });

    it("notifyError should called notification.error with custom error message", () => {
      const errorMessage = "Some error occurs";
      formInstance.notifyError(errorMessage);

      expect(spyForNotifError).toBeCalledWith({
        message: NOTIFCATION_TITLE_ERROR,
        description: errorMessage
      });
    });

    it("notifySuccess should called notification.success with custom message", () => {
      const msg = "Some success msg";
      formInstance.notifySuccess(msg);

      expect(spyForNotifSuccess).toBeCalledWith({
        message: NOTIFCATION_TITLE_SUCCESS,
        description: msg
      });
    });
  });

  describe("Test for onValidationComplete", () => {
    let spyForCreateNewLocation;

    beforeEach(() => {
      spyForCreateNewLocation = jest.spyOn(formInstance, "createNewLocation");
    });

    afterEach(() => {
      spyForCreateNewLocation.mockRestore();
    });

    it("If validation fails with error, should not call createNewLocation and not display notifications", async () => {
      await formInstance.onValidationCompletion({}, null);
      expect(spyForCreateNewLocation).not.toHaveBeenCalled();
    });

    describe("If validation succeeds", () => {
      let spyForNotifySuccess;
      let spyForNotifyError;
      let spyForResetForm;

      beforeEach(() => {
        spyForNotifySuccess = jest.spyOn(formInstance, "notifySuccess");
        spyForNotifyError = jest.spyOn(formInstance, "notifyError");
        spyForResetForm = jest.spyOn(formInstance, "resetForm");
      });

      afterEach(() => {
        spyForCreateNewLocation.mockRestore();
        spyForNotifySuccess.mockRestore();
        spyForNotifyError.mockRestore();
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
        expect(spyForNotifySuccess).toBeCalledWith(mockServerResponse.message);
        expect(spyForResetForm).toBeCalled();
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
        expect(spyForNotifyError).toBeCalledWith(mockServerResponse.message);
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
