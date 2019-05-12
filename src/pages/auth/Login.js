import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import {loginRequest} from '../../actions';
import ErrorMessage from '../../components/ErrorMessage';


const mapStateToProps = state => ({
	username: state.auth.username,
	password: state.auth.password,
	error: state.auth.error
});

class Login extends Component {
	constructor(props) {
		super(props);
	}

  login = (username, password) => {
  	this.props.dispatch(loginRequest({username, password}));
  }

  render() {
  	const {password, username, error} = this.props;

  	return (
  		<div className='form-page__wrapper'>
  			<div className='form-page__form-wrapper'>
  				<h2 className='form-page__form-heading'>Please Login In</h2>
  				<form className='form' onSubmit={this.login}>
  					{error ? <ErrorMessage error={error}/> : null}
  					<div className='form__field-wrapper'>
              <label className='form__field-label' htmlFor='username'>
                Username
              </label>
  						<input
  							className='form__field-input'
  							type='text'
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
  							type='password'
  							value={password}
  							placeholder='••••••••••'/>

  					</div>
  					<div className='form__submit-btn-wrapper'>
  						<button className='form__submit-btn' type='submit'>
								Login
  						</button>
  					</div>
  				</form>

  			</div>
  		</div>
  	);
  }

}

Login.propTypes = {
	password: PropTypes.string,
	error: PropTypes.string,
	username: PropTypes.string,
	data: PropTypes.object,
	history: PropTypes.object,
	dispatch: PropTypes.func
};

export default connect(mapStateToProps)(Login);
