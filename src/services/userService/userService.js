import { API_HOST, postToServer } from "../../utils/networkUtils";

const postWithCallbacks = async (url, body, successCb, failCb) => {
	try {
		const res = await postToServer(url, body, true);
		if (res.ok) {
			return successCb(body.username); // send username to callback for feedback purpose
		}
		let resBody = await res.json();
		failCb(resBody); //response status is not 200
	} catch (err) {
		failCb(); //error in fetch
	}
};

export const signInFromServer = async (userInfo, successCb, failCb) => {
	await postWithCallbacks(
		`${API_HOST}/account/signin`,
		userInfo,
		successCb,
		failCb
	);
};

export const signUpFromServer = async (userInfo, successCb, failCb) => {
	await postWithCallbacks(
		`${API_HOST}/account/signup`,
		userInfo,
		successCb,
		failCb
	);
};

export const logout = async (successCb, failCb) => {
	try {
		const res = await postToServer(`${API_HOST}/account/signout`, {}, true);
		if (res.ok) return successCb();
		return failCb();
	} catch (err) {
		failCb();
	}
};
