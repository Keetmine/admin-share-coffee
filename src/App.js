import React, {Component} from 'react';
import { Route, Switch } from 'react-router';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Register from './pages/auth/Register';
import NotFound from './pages/not-found/NotFound';
import OneTopic from "./pages/home/oneTopic";

class App extends Component {
	render() {
		return (
			<div className='wrapper'>
				<Navbar />
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/register' component={Register} />
                    <Route exact path='/topic/:id' component={OneTopic}/>
					<Route component={NotFound} exact/>
				</Switch>
			</div>
		);
	}
}


export default App;
