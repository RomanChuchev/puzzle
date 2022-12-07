export const getLocalStorageItems = (name) => {
	if (localStorage.getItem(name)) {
		const currentState = JSON.parse(localStorage.getItem(name));
		return currentState;
	}
	return;
};

export const setLocalStorageItems = (name, value) => {
	localStorage.setItem(name, JSON.stringify(value));
};
