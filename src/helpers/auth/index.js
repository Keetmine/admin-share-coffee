import request from './fakeRequest';

let localStorage;


localStorage = global.window.localStorage;


const auth = {

	login(username, password) {
		if (auth.loggedIn()) return Promise.resolve(true);

		return request.post('/login', {username, password})
			.then(response => {
				// Save token to local storage
				localStorage.token = response.token;
				return Promise.resolve(true);
			});
	},

	logout() {
		return request.post('/logout');
	},

	loggedIn() {
		return !!localStorage.token;
	},

	register(username, password) {
		return request.post('/register', {username, password})
			.then(() => auth.login(username, password));
	}
};

export default auth;
