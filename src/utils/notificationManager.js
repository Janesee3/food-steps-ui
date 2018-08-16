import { notification } from "antd";

const NOTIFCATION_TITLE_ERROR = "Error";
const NOTIFCATION_TITLE_SUCCESS = "Success";

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
