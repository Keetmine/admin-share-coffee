import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {logout} from '../actions';
import {ButtonLink} from '../ui/components/button';

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
						<img src={require('../assets/img/logo.png')} alt='' />
					</Link>
					{this.props.loggedIn ?
						<ButtonLink to='/' onClick={this.DoLogout}>Logout</ButtonLink>
						:
						<ButtonLink to='/register'>Sign up</ButtonLink>
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
