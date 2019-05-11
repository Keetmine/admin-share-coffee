import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ErrorMessage from './ErrorMessage';
import LoadingButton from './LoadingButton';

import {changeForm} from '../actions';


const mapStateToProps = state => ({
	username: state.auth.username,
	password: state.auth.password
});

class Form extends Component {
	constructor(props) {
		super(props);
	}

	// _changeUsername(event) {
	// 	this._emitChange({...this.props.data, username: event.target.value});
	// }
	//
	// _changePassword(event) {
	// 	this._emitChange({...this.props.data, password: event.target.value});
	// }
	//
	// _emitChange(newFormState) {
	// 	this.props.dispatch(changeForm(newFormState));
	// }

	_onSubmit(event) {
		event.preventDefault();
		// this.props.onSubmit(this.props.username, this.props.password);
	}

	render() {
		const {error} = this.props;

		return (
			<form className='form' onSubmit={this._onSubmit}>
				{error ? <ErrorMessage error={error}/> : null}
				<div className='form__field-wrapper'>
					<input
						className='form__field-input'
						type='text'
						id='username'
						value={this.props.username}
						placeholder='frank.underwood'
						onChange={this._changeUsername}
						autoCorrect='off'
						autoCapitalize='off'
						spellCheck='false'/>
					<label className='form__field-label' htmlFor='username'>
						Username
					</label>
				</div>
				<div className='form__field-wrapper'>
					<input
						className='form__field-input'
						id='password'
						type='password'
						value={this.props.password}
						placeholder='••••••••••'
						onChange={this._changePassword}/>
					<label className='form__field-label' htmlFor='password'>
						Password
					</label>
				</div>
				<div className='form__submit-btn-wrapper'>
					{this.props.currentlySending ? (
						<LoadingButton/>
					) : (
						<button className='form__submit-btn' type='submit'>
							{this.props.btnText}
						</button>
					)}
				</div>
			</form>
		);
	}

}

Form.propTypes = {
	password: PropTypes.string,
	username: PropTypes.string,
	dispatch: PropTypes.func,
	data: PropTypes.object,
	onSubmit: PropTypes.func,
	changeForm: PropTypes.func,
	btnText: PropTypes.string,
	error: PropTypes.string,
	currentlySending: PropTypes.bool
};

export default connect(mapStateToProps) (Form);
