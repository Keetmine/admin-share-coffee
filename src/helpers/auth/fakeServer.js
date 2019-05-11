let users;
let localStorage;
localStorage = global.window.localStorage

const server = {
	init() {
		if (localStorage.users === undefined || !localStorage.encrypted) {
			const josh = 'josh';
			const juanPass = 'password';

			users = {
				[josh]: [josh, juanPass]
			};

			localStorage.users = JSON.stringify(users);
			localStorage.encrypted = true;
		} else {
			users = JSON.parse(localStorage.users);
		}
	},

	login(username, password) {
		const userExists = this.doesUserExist(username);

		return new Promise((resolve, reject) => {
			if (userExists && password === users[username]) {
				resolve({
					authenticated: true,
					token: Math.random().toString(36).substring(7)
				});
			} else {
				let error;
				if (userExists) {
					error = new Error('Wrong password');
				} else {
					error = new Error('User doesn\'t exist');
				}

				reject(error);
			}
		});
	},

	register(username, password) {
		return new Promise((resolve, reject) => {
			if (!this.doesUserExist(username)) {
				users[username] = password
				localStorage.users = JSON.stringify(users);

				resolve({registered: true});
			} else {
				reject(new Error('Username already in use'));
			}
		});
	},

	logout() {
		return new Promise(resolve => {
			localStorage.removeItem('token');
			resolve(true);
		});
	},

	doesUserExist(username) {
		return !(users[username] === undefined);
	}
};

server.init();

export default server;
