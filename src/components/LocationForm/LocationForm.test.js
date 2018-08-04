import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { testExports } from "./LocationForm";

const { LocationForm, SUCCESS_MESSAGE, ERROR_MESSAGE } = testExports;

import { createUserLocation } from "../../services/userLocationService/userLocationService";
jest.mock("../../services/userLocationService/userLocationService");

const mockGetFieldDecorator = jest.fn(() => (id, options) => {});
const mockResetFields = jest.fn();
const mockSetFieldsValue = jest.fn();

const mockForm = {
  getFieldDecorator: mockGetFieldDecorator,
  resetFields: mockResetFields,
  setFieldsValue: mockSetFieldsValue
};

const mockGetCurrentPosition = jest.fn();
global.navigator.geolocation = {
  getCurrentPosition: mockGetCurrentPosition
};

it("Snapshot Test for rendering", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<LocationForm form={mockForm} />);

  const output = renderer.getRenderOutput();
  expect(output).toMatchSnapshot();
});

describe("Functional Test beyond render()", () => {
  let formInstance;

  beforeEach(() => {
    mockGetFieldDecorator.mockClear();
    mockResetFields.mockClear();
    mockSetFieldsValue.mockClear();

    const renderer = new ShallowRenderer();
    renderer.render(<LocationForm form={mockForm} />);
    formInstance = renderer.getMountedInstance();
  });

  describe("Lifecycle Events: componentDidMount and componentWillUnmount", () => {
    it("should call getCurrentPosition and set _isMounted after componentDidMount is called", () => {
      const GEOLOCATION_OPTION = { enableHighAccuracy: true };
      const spyHandlePositioning = jest.spyOn(
        formInstance,
        "handlePositioning"
      );
      const spyHandlePositioningError = jest.spyOn(
        formInstance,
        "handlePositioningError"
      );

      formInstance.componentDidMount();

      expect(formInstance._isMounted).toBe(true);
      expect(mockGetCurrentPosition).toHaveBeenCalledTimes(1);
      expect(mockGetCurrentPosition).toBeCalledWith(
        spyHandlePositioning,
        spyHandlePositioningError,
        GEOLOCATION_OPTION
      );
    });

    it("should unset _isMounted after componentWillUnmount is called", () => {
      formInstance.componentWillUnmount();
      expect(formInstance._isMounted).toBe(false);
    });
  });

  describe("Handling browser positioning", () => {
    describe("when form is mounted", () => {
      it("should call setFieldsValue when handlePositioning is called", () => {
        formInstance._isMounted = true;
        formInstance.handlePositioning({
          coords: {
            latitude: 60.02,
            longitude: 132.108
          }
        });

        expect(mockSetFieldsValue).toHaveBeenCalled();
      });

      it("should call notifyError with default message when error code 1", () => {
        const spyOnNotifyError = jest.spyOn(formInstance, "notifyError");

        formInstance._isMounted = true;
        formInstance.handlePositioningError({
          code: 1,
          message: "not so clear message"
        });

        expect(spyOnNotifyError).toHaveBeenCalled();
        expect(spyOnNotifyError).toHaveBeenCalledWith(
          "Please enable browser positioning"
        );
      });

      it("should call notifyError with returned message for other error code", () => {
        const spyOnNotifyError = jest.spyOn(formInstance, "notifyError");
        const testMessage = "some other message";

        formInstance._isMounted = true;
        formInstance.handlePositioningError({
          code: 2,
          message: testMessage
        });

        expect(spyOnNotifyError).toHaveBeenCalled();
        expect(spyOnNotifyError).toHaveBeenCalledWith(testMessage);
      });
    });
    describe("when form is unmounted", () => {
      it("should not call setFieldsValue when handlePositioning is called", () => {
        formInstance.handlePositioning({
          coords: {
            latitude: 60.02,
            longitude: 132.108
          }
        });

        expect(mockSetFieldsValue).not.toHaveBeenCalled();
      });

      it("should not call notifyError with handlePositioning is called", () => {
        const spyOnNotifyError = jest.spyOn(formInstance, "notifyError");

        formInstance.handlePositioningError({
          code: 1,
          message: "not so clear message"
        });

        expect(spyOnNotifyError).not.toHaveBeenCalled();
      });
    });
  });

  describe("Feedback with notification", () => {
    // REF: https://jestjs.io/docs/en/jest-object#jestspyonobject-methodname
    const { notification } = require("antd");
    let spyForError, spyForSuccess;

    beforeEach(() => {
      spyForError = jest.spyOn(notification, "error");
      spyForSuccess = jest.spyOn(notification, "success");
    });

    it("TEST notifyError", () => {
      const errorMessage = "Some error occurs";
      formInstance.notifyError(errorMessage);

      expect(spyForError).toBeCalledWith({
        message: "Error",
        description: errorMessage
      });
      expect(spyForSuccess).not.toHaveBeenCalled();
    });

    describe("TEST onFieldValidationResponse, handleSubmit", () => {
      it("should not call createUserLocation and no notifications if validation error", async () => {
        await formInstance.onFieldValidationResponse({}, null);

        expect(createUserLocation).not.toHaveBeenCalled();
        expect(spyForError).not.toHaveBeenCalled();
        expect(spyForSuccess).not.toHaveBeenCalled();
        expect(mockResetFields).not.toHaveBeenCalled();
      });

      it("should call notification.error with message if SERVICE result is NOT OK with message", async () => {
        const testMessage = "some message";
        createUserLocation.mockImplementationOnce(async () => {
          return {
            ok: false,
            message: testMessage
          };
        });

        const valuesFromValidation = { locationName: "testing" };
        await formInstance.onFieldValidationResponse(
          null,
          valuesFromValidation
        );

        expect(createUserLocation).toBeCalledWith(valuesFromValidation);
        expect(spyForError).toHaveBeenCalledWith({
          message: "Error",
          description: testMessage
        });
        expect(spyForSuccess).not.toHaveBeenCalled();
        expect(mockResetFields).not.toHaveBeenCalled();
      });

      it("should call notification.error with ERROR_MESSAGE if SERVICE result is NOT OK without message", async () => {
        createUserLocation.mockImplementationOnce(async () => {
          return {
            ok: false
          };
        });

        await formInstance.onFieldValidationResponse(null, {});
        expect(createUserLocation).toHaveBeenCalled();

        expect(spyForError).toHaveBeenCalledWith({
          message: "Error",
          description: ERROR_MESSAGE
        });
        expect(spyForSuccess).not.toHaveBeenCalled();
        expect(mockResetFields).not.toHaveBeenCalled();
      });

      it("should call notification.success with SUCCESS_MESSAGE if SERVICE result is OK", async () => {
        createUserLocation.mockImplementationOnce(async () => {
          return {
            ok: true
          };
        });

        await formInstance.onFieldValidationResponse(null, {});
        expect(createUserLocation).toHaveBeenCalled();

        expect(spyForError).not.toHaveBeenCalled();
        expect(mockResetFields).toHaveBeenCalled();
        expect(spyForSuccess).toHaveBeenCalledWith({
          message: "Success",
          description: SUCCESS_MESSAGE
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

    afterEach(() => {
      spyForError.mockRestore();
      spyForSuccess.mockRestore();
    });
  });
});
