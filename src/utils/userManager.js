const KEY_IS_LOGGED_IN = "isLoggedIn";
const KEY_USER = "user";

const saveUser = user => {
	localStorage.setItem(KEY_USER, JSON.stringify(user));
};

const clearUser = () => {
	localStorage.removeItem(KEY_USER);
};

const setLocalStorageLoggedInStatus = status => {
	localStorage.setItem(KEY_IS_LOGGED_IN, status);
};

export const saveLoginStatusAndUser = user => {
	saveUser(user);
	setLocalStorageLoggedInStatus(true);
};

export const removeLoginStatusAndUser = () => {
	clearUser();
	setLocalStorageLoggedInStatus(false);
};

export const getLocalStorageLoggedInStatus = () => {
	const status = localStorage.getItem(KEY_IS_LOGGED_IN);
	if (!status) return false;
	const bool = status === 'true' ? true : false; // converting from string to boolean
	return bool;
};

export const getUser = () => {
	const user = localStorage.getItem(KEY_USER);
	if (!user) return null;
	return JSON.parse(user);
};

export const getUsername = () => {
	const user = getUser();
	if (user) return user.username;
	return "";
};
