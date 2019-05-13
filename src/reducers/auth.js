import initialState from '../store/initialState';
import {
	CHANGE_FORM,
	SET_AUTH,
	SENDING_REQUEST,
	REQUEST_ERROR,
	CLEAR_ERROR,
	LOGIN_REQUEST,
	LOGOUT
} from '../actions/constants';

export default function (state = initialState, action) {
	switch (action.type) {
		case CHANGE_FORM:
			return {...state, formState: action.newFormState};
		case SET_AUTH:
			return {...state, loggedIn: action.newAuthState};
		case SENDING_REQUEST:
			return {...state, currentlySending: action.sending};
		case REQUEST_ERROR:
			return {...state, error: action.error};
		case CLEAR_ERROR:
			return {...state, error: ''};
		case LOGIN_REQUEST:
			return {...state, loggedIn: true};
		case LOGOUT:
			return {...state, loggedIn: false};
		default:
			return state;
	}
}
