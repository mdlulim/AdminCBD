import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from 'react-router-dom';

import { AuthContext } from 'context/auth';
// import PrivateRoute from './PrivateRoute';
import config from './config';

// auth pages/routes
import AuthLogin from 'pages/Auth/Login';
import AuthForgot from 'pages/Auth/Forgot';

// page not found
import PageNotFound from 'pages/PageNotFound';

// private routes
import Agents from 'pages/Agents';
import Dashboard from 'pages/Dashboard';
import Overview from 'pages/Overview';
import Leads from 'pages/Leads';
import Properties from 'pages/Properties';
import AddProperty from 'pages/Properties/Add';
import EditProperty from 'pages/Properties/Edit';
import ViewProperty from 'pages/Properties/Details';
import MessagingChat from 'pages/Messaging/Chat';
import MessagingInbox from 'pages/Messaging/Inbox';
import Profile from 'pages/Profile';
import Reports from 'pages/Reports';
import Users from 'pages/Users';

const App = () => {
	const settings = config;
	const [authTokens, setAuthTokens] = useState();
	const [menu, setMenu] = useState([]);

	const setTokens = (data) => {
		localStorage.setItem('tokens', JSON.stringify(data));
		setAuthTokens(data);
	}

	return (
		<AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
			<Router basename={process.env.PUBLIC_URL}>
				<Switch>
					<Redirect exact from="/" to="/overview" />
					<Route exact path="/login" component={(props) => <AuthLogin config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/forgot-password" component={(props) => <AuthForgot config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/dashboard" component={(props) => <Dashboard config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/overview" component={(props) => <Overview config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/leads" component={(props) => <Leads config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/agents" component={(props) => <Agents config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/properties/add" component={(props) => <AddProperty config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/properties/edit/:id" component={(props) => <EditProperty config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/properties/view/:id" component={(props) => <ViewProperty config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/properties" component={(props) => <Properties config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/profile" component={(props) => <Profile config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/messaging/chat" component={(props) => <MessagingChat config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/messaging/inbox" component={(props) => <MessagingInbox config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/reports" component={(props) => <Reports config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/users" component={(props) => <Users config={settings} {...props} setMenu={setMenu} />} />
					{/* <PrivateRoute exact path="/dashboard" component={(props) => <Dashboard config={settings} {...props} menu={menu} />} /> */}
					<Route component={(props) => <PageNotFound config={settings} {...props} menu={menu} />} />
				</Switch>
			</Router>
		</AuthContext.Provider>
	)
}

export default App;
