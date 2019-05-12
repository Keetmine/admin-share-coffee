import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import {registerRequest} from '../../actions';
import ErrorMessage from '../../components/ErrorMessage';

const mapStateToProps = state => ({
	username: state.auth.username,
	password: state.auth.password,
	error: state.auth.error
});


class Register extends Component {
	constructor(props) {
		super(props);
	}

  register = (username, password) => {
  	this.props.dispatch(registerRequest({username, password}));
  }
  render() {
  	const {username, password, error} = this.props;

  	return (
  		<div className='form-page__wrapper'>
  			<div className='form-page__form-wrapper'>
  				<h1>Welcome to share&coffee!</h1>
  				<h2 className='form-page__form-heading'>Register</h2>
  				<form className='form' onSubmit={this.register}>
  					{error ? <ErrorMessage error={error}/> : null}
  					<div className='form__field-wrapper'>
              <label className='form__field-label' htmlFor='username'>
                Username
              </label>
  						<input
  							className='form__field-input'
  							type='text'
  							id='username'
  							value={username}
  							placeholder='frank.underwood'
  							autoCorrect='off'
  							autoCapitalize='off'
  							spellCheck='false'/>

  					</div>
  					<div className='form__field-wrapper'>
              <label className='form__field-label' htmlFor='password'>
                Password
              </label>
  						<input
  							className='form__field-input'
  							id='password'
  							type='password'
  							value={password}
  							placeholder='••••••••••'/>

  					</div>
  					<div className='form__submit-btn-wrapper'>
  						<button className='form__submit-btn' type='submit'>
                Sign up
  						</button>
  					</div>
  				</form>
  			</div>
  		</div>
  	);
  }

}

Register.propTypes = {
	password: PropTypes.string,
	username: PropTypes.string,
	error: PropTypes.string,
	data: PropTypes.object,
	history: PropTypes.object,
	dispatch: PropTypes.func
};


export default connect(mapStateToProps)(Register);
