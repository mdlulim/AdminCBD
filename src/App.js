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
import Overview from 'pages/Overview';
import MessagingChat from 'pages/Messaging/Chat';
import MessagingInbox from 'pages/Messaging/Inbox';
import Reports from 'pages/Reports';
import Users from 'pages/Configurations';
import UserRoles from './pages/UserRoles';
import UserRoleConfig from './pages/UserRoles/UserRoleConfig';
import Configurations from './pages/Configurations/Configurations';
import Members from 'pages/Members';
import Leads from 'pages/Leads';
import WealthCreaters from 'pages/Members/WealthCreatersPage';
import MemberDetails from 'pages/Members/MemberDetails';
import Transactions from 'pages/Transactions';
import FormsConfig from 'pages/Configurations/FormsConfigurations';
import Products from 'pages/Products';
import ProductAddNew from 'pages/Products/ProductAddNew';
import ProductDetails from 'pages/Products/ProductDetails';

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
					<Route exact path="/overview" component={(props) => <Overview config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/messaging/chat" component={(props) => <MessagingChat config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/messaging/inbox" component={(props) => <MessagingInbox config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/reports" component={(props) => <Reports config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/configurations/users" component={(props) => <Users config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/configurations/roles" component={(props) => <UserRoles config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/configurations/roles/:id" component={(props) => <UserRoleConfig config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/configurations/configurations" component={(props) => <Configurations config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/configurations/forms" component={(props) => <FormsConfig config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/members/members" component={(props) => <Members config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/leads" component={(props) => <Leads config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/members/wealth-creaters" component={(props) => <WealthCreaters config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/transactions" component={(props) => <Transactions config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/members/members/:id" component={(props) => <MemberDetails config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/products/products" component={(props) => <Products config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/products/add" component={(props) => <ProductAddNew config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/products/products/:id" component={(props) => <ProductDetails config={settings} {...props} setMenu={setMenu} />} />
					{/* <PrivateRoute exact path="/dashboard" component={(props) => <Dashboard config={settings} {...props} menu={menu} />} /> */}
					<Route component={(props) => <PageNotFound config={settings} {...props} menu={menu} />} />
				</Switch>
			</Router>
		</AuthContext.Provider>
	)
}

export default App;
