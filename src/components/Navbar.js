import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import LoadingButton from './LoadingButton';

import {logout, clearError} from '../actions';

const mapStateToProps = state => ({
	loggedIn: state.auth.loggedIn,
	currentlySending: state.auth.currentlySending
});

class Navbar extends Component {
	constructor(props) {
		super(props);
	}

	DoLogout() {
		this.props.dispatch(logout());
	}

	DoClearError() {
		this.props.dispatch(clearError());
	}

	render() {
		return (
			<div className='nav'>
				<div className='nav__wrapper'>
					<Link to='/' className='nav__logo-wrapper' onClick={this.DoClearError}>
						<h1 className='nav__logo'>Share&Coffee</h1>
					</Link>
					{this.props.loggedIn ?
						<div>
							<Link to='/dashboard' className='btn btn--dash btn--nav'>Dashboard</Link>
							{this.props.currentlySending ? (
								<LoadingButton className='btn--nav'/>
							) : (
								<a href='#' className='btn btn--login btn--nav' onClick={this.DoLogout}>Logout</a>
							)}
						</div>
						:
						<div>
							<Link to='/register' className='btn btn--login btn--nav'
								  onClick={this.DoClearError}>Register</Link>
							<Link to='/login' className='btn btn--login btn--nav'
								  onClick={this.DoClearError}>Login</Link>
						</div>
					}
				</div>
			</div>
		);
	}


}

Navbar.propTypes = {
	loggedIn: PropTypes.bool,
	currentlySending: PropTypes.bool,
	history: PropTypes.object,
	location: PropTypes.object,
	children: PropTypes.object,
	dispatch: PropTypes.func
};

export default connect(mapStateToProps)(Navbar);
