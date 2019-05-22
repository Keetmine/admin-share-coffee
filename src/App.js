import React, {Component} from 'react';
import { Route, Switch } from 'react-router';
import Home from './pages/home';
import Register from './pages/auth/Register';
import NotFound from './pages/not-found/NotFound';
import OneTopic from "./pages/home/oneTopic";
import OneUser from "./pages/home/oneUser";

class App extends Component {
	render() {
		return (
			<div className='wrapper'>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/register' component={Register} />
					<Route exact path='/topic/:id' component={OneTopic}/>
					<Route exact path='/user/:id' component={OneUser}/>
					<Route component={NotFound} exact/>
				</Switch>
			</div>
		);
	}
}


export default App;
