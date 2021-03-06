import { notification } from "antd";

export const NOTIFCATION_TITLE_ERROR = "Error";
export const NOTIFCATION_TITLE_SUCCESS = "Success";

export const notifyError = errorMessage => {
	notification.error({
		message: NOTIFCATION_TITLE_ERROR,
		description: errorMessage
	});
};

export const notifySuccess = msg => {
	notification.success({
		message: NOTIFCATION_TITLE_SUCCESS,
		description: msg
	});
};
