import React, {Component} from 'react';
import { Route, Switch } from 'react-router';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import NotFound from './pages/not-found/NotFound';

class App extends Component {
	render() {
		return (
			<div className='wrapper'>
				<Navbar />
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/register' component={Register} />
					<Route component={NotFound} exact/>
				</Switch>
			</div>
		);
	}
}


export default App;
