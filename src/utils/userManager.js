const KEY_IS_LOGGED_IN = "isLoggedIn";

export const setLocalStorageLoggedInStatus = status => {
	localStorage.setItem(KEY_IS_LOGGED_IN, status);
};

export const getLocalStorageLoggedInStatus = () => {
	const status = localStorage.getItem(KEY_IS_LOGGED_IN);

	if (!status) {
		return false;
	}

	console.log("Logged In Status: ", status);
	return status;
};
