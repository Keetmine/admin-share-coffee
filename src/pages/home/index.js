import React from 'react';
import {connect} from 'react-redux';

function select(state) {
	return {
		data: state
	};
}

class Home extends React.Component {

	render() {
		return (
			<article>
				<section className='text-section'>
					<h1>Welcome to share&coffee!</h1>
					<h2>Please log in!</h2>
				</section>
			</article>
		);
	}
}

export default connect(select)(Home);
