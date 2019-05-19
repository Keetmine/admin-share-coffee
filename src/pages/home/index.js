import React from 'react';
import {connect} from 'react-redux';
import Login from '../auth/Login';
import HomeDashboard from './home';
import PropTypes from 'prop-types';
import Navbar from "../../components/Navbar";

const mapStateToProps = state => ({
	loggedIn: state.auth.loggedIn
});

class Home extends React.Component {
	state = {
		isLogin: false
	}

	componentDidMount() {
		const token = localStorage.getItem('token');
		if (token !== null) {
			this.setState({isLogin: true})
		}
	}

	setLogin = (state) => {
		this.setState({isLogin: state})
	}

	update = () => {
		this.setState({ state: this.state });

	}

	render() {
		return (
			<div className='login_container' style={{width: '100%'}}>
				<Navbar setLogin={this.setLogin} isLogin={this.state.isLogin}/>
				<h1>Admin panel</h1>
				{!this.state.isLogin ?
					<Login history={this.props.history}
						   update={this.update}
						   setLogin={this.setLogin}/>
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
