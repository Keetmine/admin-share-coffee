import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {ButtonLink} from '../ui/components/button';


class Navbar extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		isLogin: false
	}

	componentDidMount() {
		const token = localStorage.getItem('token');
		if (token !== null) {
			this.setState({isLogin: true})
		}
	}

	DoLogout(e) {
		e.preventDefault();
		localStorage.clear();
		this.props.setLogin(false)
	}

	render() {
		return (
			<div className='nav'>
				<div className='nav__wrapper'>
					<Link to='/' className='nav__logo-wrapper'>
						<img src={require('../assets/img/logo.png')} alt='' />
					</Link>
					{this.state.isLogin ?
						<ButtonLink to='/' onClick={e => this.DoLogout(e)}>Logout</ButtonLink>
						:
						<ButtonLink to='/register'>Sign up</ButtonLink>
					}
				</div>
			</div>
		);
	}


}

Navbar.propTypes = {
	history: PropTypes.object,
	location: PropTypes.object,
	children: PropTypes.object,
	dispatch: PropTypes.func
};

export default (Navbar);
