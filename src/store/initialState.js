import auth from '../helpers/auth'

export default {
	formState: {
		username: '',
		password: ''
	},
	error: '',
	currentlySending: false,
	loggedIn: auth.loggedIn()
};
