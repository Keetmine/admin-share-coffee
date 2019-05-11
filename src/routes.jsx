import React, {PureComponent} from 'react';

import {Route, Switch} from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import NotFound from './pages/not-found/NotFound';
import Home from './pages/home';
import {clearError} from './actions';
import {store} from './store';


function checkAuth(nextState, replace) {
	const {loggedIn} = store.getState();
	store.dispatch(clearError());

	if (nextState.location.pathname !== '/dashboard') {
		if (loggedIn) {
			if (nextState.location.state && nextState.location.pathname) {
				replace(nextState.location.pathname);
			} else {
				replace('/');
			}
		}
	} else {
		if (!loggedIn) {
			if (nextState.location.state && nextState.location.pathname) {
				replace(nextState.location.pathname);
			} else {
				replace('/');
			}
		}
	}
}

class Routes extends PureComponent {
	render() {
		return (
			<Switch>
				<Route exact path='/' component={Home} />
				<Route onEnter={checkAuth}>
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
					<Route path='/dashboard' component={Dashboard} />
				</Route>
				<Route component={NotFound} exact/>
			</Switch>
		);
	}
}

export default Routes;
