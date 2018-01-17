import React from 'react';
import Switch from 'react-router-dom/Switch';
import { Route, Router, Link } from 'react-router';
import Login from './Login';
import Account from './Account';

class App extends React.Component {
	state = {
		isLogged: false,
	};

	componentWillMount() {
		this.checkToken();
	};

	checkToken() {
		if(sessionStorage.getItem('accessToken'))
			this.setState({ isLogged: true, });
	};

	render() {
		return (
			<div>
				<Switch>
					<Route exact path="/" component={Login} onChange={this.checkToken}/>
					<Route exact path="/account" component={Account} />
				</Switch>
				{this.state.isLogged ? <Account /> : null }
			</div>
		);
	}
}
export default App;
