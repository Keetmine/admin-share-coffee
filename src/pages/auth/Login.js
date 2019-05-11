import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import {loginRequest} from '../../actions';
import Form from '../../components/Form';

class Login extends Component {
	constructor(props) {
		super(props);

		this._login = this._login.bind(this);
	}

	render() {
		const {dispatch} = this.props;
		const {formState, currentlySending, error} = this.props.data;

		return (
			<div className='form-page__wrapper'>
				<div className='form-page__form-wrapper'>
					<div className='form-page__form-header'>
						<h2 className='form-page__form-heading'>Login</h2>
					</div>
					<Form data={formState} dispatch={dispatch} history={this.props.history} onSubmit={this._login}
						  btnText={'Login'} error={error} currentlySending={currentlySending}/>
				</div>
			</div>
		);
	}

	_login(username, password) {
		this.props.dispatch(loginRequest({username, password}));
	}
}

Login.propTypes = {
	data: PropTypes.object,
	history: PropTypes.object,
	dispatch: PropTypes.func
};

function select(state) {
	return {
		data: state
	};
}

export default connect(select)(Login);
