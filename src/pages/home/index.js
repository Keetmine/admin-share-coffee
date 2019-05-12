import React from 'react';
import {connect} from 'react-redux';
import Login from "../auth/Login";

function select(state) {
	return {
		data: state
	};
}

class Home extends React.Component {

	render() {
		return (
			<div className='login_container'>
				<h1>Welcome to share&coffee!</h1>
				<Login/>
			</div>
		);
	}
}

export default connect(select)(Home);
