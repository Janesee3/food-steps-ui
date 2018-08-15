import { API_HOST, postToServer } from "../../utils/networkUtils";

export const SUCCESS_MESSAGE = "Location created successfully";
const ERROR_MESSAGE = "An error occurred while creating the location";

const isDevelopment = process.env.NODE_ENV === "development";

export const createUserLocation = async userLocationData => {
	try {
		const response = await postToServer(
			`${API_HOST}/locations/user`,
			userLocationData,
			true
		);

		let dataErrorMessage = ERROR_MESSAGE;
		
		if (response.status === 400) {
			const responseBody = await response.json();
			dataErrorMessage = responseBody.message;
		}

		return {
			ok: response.ok,
			message: response.ok ? SUCCESS_MESSAGE : dataErrorMessage
		};
	} catch (e) {
		isDevelopment && console.error(e);
		return { ok: false };
	}
};
