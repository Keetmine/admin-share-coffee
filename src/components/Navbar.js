import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {logout} from '../actions';

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


	render() {
		return (
			<div className='nav'>
				<div className='nav__wrapper'>
					<Link to='/' className='nav__logo-wrapper'>
						<h1 className='nav__logo'>Share&Coffee</h1>
					</Link>
					{this.props.loggedIn ?
						<Link to='/'  className='btn' onClick={this.DoLogout}>Logout</Link>
						:
						<Link to='/register' className='btn'>Register</Link>
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
