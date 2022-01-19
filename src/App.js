import React, { useState } from 'react';
import { BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom';

import { AuthContext } from 'context/auth';
import PrivateRoute from './PrivateRoute';
import config from './config';

// auth pages/routes
import AuthLogin from 'pages/Auth/Login';
import AuthForgotPassword from 'pages/Auth/ForgotPassword';

// page not found
import PageNotFound from 'pages/PageNotFound';

// private routes
import Dashboard from 'pages/Dashboard';
import SystemSettings from 'pages/Configurations/SystemSettings';
import AddUser from './pages/Users/Add';
import EditUser from './pages/Users/Edit';
import Users from 'pages/Users';
import AddRole from './pages/Users/AddRole';
import EditRole from './pages/Users/EditRole';
import Roles from './pages/Users/Roles';
import Reports from './pages/Reports';
import ReportDetails from './pages/Reports/Details';
import Countries from './pages/Configurations/Countries';
import Currencies from './pages/Configurations/Currencies';
import Commission from './pages/Commission';
import FormsConfigurations from './pages/Configurations/FormsConfigurations';
import Configurations from './pages/Configurations/Configurations';
import Members from 'pages/Members';
import MembersPending from 'pages/Members/MembersPending';
import CompanyAccount from 'pages/CompanyAccount';
import Leads from 'pages/Members/Leads';
import WealthCreater from 'pages/Members/WealthCreater';
import MemberDetails from 'pages/Members/MemberDetails';
import Transactions from 'pages/Transactions';
import TransactionImport from 'pages/Transactions/TransactionImport';
import Deposits from 'pages/Transactions/Deposits';
import Widthdrawals from 'pages/Transactions/Widthdrawals';
import Transfers from 'pages/Transactions/Transfers';
import MakeTransferPage from 'pages/Transactions/MakeTransferPage';
import Products from 'pages/Products';
import ProductCancellations from 'pages/Products/Cancellations';
import ProductHistory from 'pages/Products/ProductHistory';
import ProductCategories from 'pages/ProductCategory';
import CategoryNew from 'pages/ProductCategory/CategoryNew';
import CategoryUpdate from 'pages/ProductCategory/CategoryUpdate';
import ProductAddNew from 'pages/Products/ProductAddNew';
import ProductDetails from 'pages/Products/ProductDetails';
import UserPermissions from 'pages/UserPermissions';
import BankAccounts from 'pages/BankAccounts';
import SendOTPBankAccounts from 'pages/BankAccounts/SendOPTBankAccount';
import KYC from 'pages/KYC';
import ProductCancel from 'pages/Products/ProductCancel';
import ProductConfiguration from './pages/Configurations/ProductConfiguration';

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
					<Redirect exact from="/" to="/dashboard" />
					<Route exact path="/login" component={(props) => <AuthLogin config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/forgot-password" component={(props) => <AuthForgotPassword config={settings} {...props} setMenu={setMenu} />} />
					<PrivateRoute exact path="/dashboard" component={(props) => <Dashboard config={settings} {...props} menu={menu} />} />
					<Route exact path="/members/pending" component={(props) => <MembersPending config={settings} {...props} menu={menu} />} />
					<Route exact path="/members/members" component={(props) => <Members config={settings} {...props} menu={menu} />} />
					<Route exact path="/members/members/:id" component={(props) => <MemberDetails config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/members/leads" component={(props) => <Leads config={settings} {...props} menu={menu} />} />
					<Route exact path="/members/wealth-creators" component={(props) => <WealthCreater config={settings} {...props} menu={menu} />} />

					<Route exact path="/users" component={(props) => <Users config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/users/roles" component={(props) => <Roles config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/users/add" component={(props) => <AddUser config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/users/:id" component={(props) => <EditUser config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/users/roles/add" component={(props) => <AddRole config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/users/roles/:id" component={(props) => <EditRole config={settings} {...props} setMenu={setMenu} />} />

					<Route exact path="/reports" component={(props) => <Reports config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/reports/:id" component={(props) => <ReportDetails config={settings} {...props} setMenu={setMenu} />} />

					<Route exact path="/configurations/settings" component={(props) => <SystemSettings config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/configurations/countries" component={(props) => <Countries config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/configurations/currencies" component={(props) => <Currencies config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/configurations/forms" component={(props) => <FormsConfigurations config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/configurations" component={(props) => <Configurations config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/transactions" component={(props) => <Transactions config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/bank-accounts" component={(props) => <BankAccounts config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/bank-accounts/:id" component={(props) => <SendOTPBankAccounts config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/transactions/transactions/:id" component={(props) => <Transactions config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/main-account" component={(props) => <CompanyAccount config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/transactions/deposits" component={(props) => <Deposits config={settings} {...props} setMenu={setMenu} />} />
					{/* <Route exact path="/transactions/rejected" component={(props) => <Canceled config={settings} {...props} setMenu={setMenu} />} /> */}
					<Route exact path="/transactions/import" component={(props) => <TransactionImport config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/transactions/transfers" component={(props) => <Transfers config={settings} {...props} setMenu={setMenu} />} />
					{/* <Route exact path="/transactions/completed" component={(props) => <Completed config={settings} {...props} setMenu={setMenu} />} /> */}
					{/* <Route exact path="/transactions/pending" component={(props) => <Pending config={settings} {...props} setMenu={setMenu} />} /> */}
					<Route exact path="/transactions/withdrawals" component={(props) => <Widthdrawals config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/transactions/transfers/transfer" component={(props) => <MakeTransferPage config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/products" component={(props) => <Products config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/products/cancellations" component={(props) => <ProductCancellations config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/products/history" component={(props) => <ProductHistory config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/categories" component={(props) => <ProductCategories config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/categories/add" component={(props) => <CategoryNew config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/categories/:id" component={(props) => <CategoryUpdate config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/products/add" component={(props) => <ProductAddNew config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/products/cancel" component={(props) => <ProductCancel config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/products/:id" component={(props) => <ProductDetails config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/configurations/permissions" component={(props) => <UserPermissions config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/configurations/commissions" component={(props) => <Commission config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/configurations/product" component={(props) => <ProductConfiguration config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/kyc" component={(props) => <KYC config={settings} {...props} setMenu={setMenu} />} />
					<Route component={(props) => <PageNotFound config={settings} {...props} menu={menu} />} />
				</Switch>
			</Router>
		</AuthContext.Provider>
	)
}

export default App;
