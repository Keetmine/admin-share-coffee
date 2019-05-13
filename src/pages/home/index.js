import React from 'react';
import {connect} from 'react-redux';
import Login from '../auth/Login';
import HomeDashboard from './home';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
	loggedIn: state.auth.loggedIn
});

class Home extends React.Component {

	render() {
		return (
			<div className='login_container' style={{    width: '100%'}}>
				<h1>Admin panel</h1>
				{!this.props.loggedIn ?
					<Login/>
					:
					<HomeDashboard />
				}

			</div>
		);
	}
}

Home.propTypes = {
	loggedIn: PropTypes.bool
};

export default connect(mapStateToProps)(Home);
