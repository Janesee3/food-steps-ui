import {
	notifyError,
	notifySuccess,
	NOTIFCATION_TITLE_ERROR,
	NOTIFCATION_TITLE_SUCCESS
} from "./notificationManager";

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
		notifyError(errorMessage);

		expect(spyForNotifError).toBeCalledWith({
			message: NOTIFCATION_TITLE_ERROR,
			description: errorMessage
		});
	});

	it("notifySuccess should called notification.success with custom message", () => {
		const msg = "Some success msg";
		notifySuccess(msg);

		expect(spyForNotifSuccess).toBeCalledWith({
			message: NOTIFCATION_TITLE_SUCCESS,
			description: msg
		});
	});
});
