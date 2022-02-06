import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

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
import DebitCredit from 'pages/Transactions/DebitCredit';
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
import Broadcast from 'pages/Broadcast';
import AddBroadcast from 'pages/Broadcast/Add';
import EditBroadcast from 'pages/Broadcast/Edit';
import { UserService } from 'providers';
import ProductCancel from 'pages/Products/ProductCancel';
import ProductSubCategories from './pages/Products/SubCategories';
import ProductUpdateSubCategory from './pages/Products/UpdateSubCategory';
import ProductSubCategoryCalculations from './pages/Products/SubCategoryCalculations';
import { SessionProvider } from 'providers';

import Profile from 'pages/Profile';
import ProfileSettings from 'pages/Profile/Settings';

import ProductReport from 'pages/Reports/ProductReport';
import ProductReportDetails from 'pages/Reports/ProductReportDetails';

const App = () => {
	const settings = config;
	const [authTokens, setAuthTokens] = useState();
	const [menu, setMenu] = useState([]);
	const [role, setRole] = useState(null)

	const setTokens = (data) => {
		localStorage.setItem('tokens', JSON.stringify(data));
		setAuthTokens(data);
	}

	const fetchData = async () => {
		if (SessionProvider.isValid()) {
			const role = await UserService.getUserRole();
			setRole(role)
		}
	}

	useMemo(() => {
		fetchData()
	}, [])


	return (
		<AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
			<Router basename={process.env.PUBLIC_URL}>
				<Switch>
					<Redirect exact from="/" to="/dashboard" />
					<Route exact path="/login" component={(props) => <AuthLogin config={settings} {...props} setMenu={setMenu} setRole={setRole} />} />
					<Route exact path="/forgot-password" component={(props) => <AuthForgotPassword config={settings} {...props} setMenu={setMenu} />} />

					<PrivateRoute exact path="/profile" component={(props) => <Profile config={settings} {...props} menu={menu} />} />
					<PrivateRoute exact path="/settings" component={(props) => <ProfileSettings config={settings} {...props} menu={menu} />} />

					<PrivateRoute exact path="/dashboard" component={(props) => <Dashboard config={settings} {...props} menu={menu} />} />

					<Route exact path="/members/pending" component={(props) => <MembersPending config={settings} {...props} menu={menu} permissions={role ? role.permissions.members.childitems.pending : null} />} />
					<Route exact path="/members/members" component={(props) => <Members config={settings} {...props} menu={menu} permissions={role ? role.permissions.members.childitems.members : null} />} />
					<Route exact path="/members/members/:id" component={(props) => <MemberDetails config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/members/leads" component={(props) => <Leads config={settings} {...props} menu={menu} />} />
					<Route exact path="/members/wealth-creators" component={(props) => <WealthCreater config={settings} {...props} menu={menu} permissions={role ? role.permissions.members.childitems['wealth-creators'] : null} />} />

					<Route exact path="/users" component={(props) => <Users config={settings} {...props} setMenu={setMenu} permissions={role ? role.permissions.users.childitems['manage-users'] : null} />} />
					<Route exact path="/users/roles" component={(props) => <Roles config={settings} {...props} setMenu={setMenu} permissions={role ? role.permissions.users.childitems['manage-roles'] : null} />} />
					<Route exact path="/users/add" component={(props) => <AddUser config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/users/:id" component={(props) => <EditUser config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/users/roles/add" component={(props) => <AddRole config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/users/roles/:id" component={(props) => <EditRole config={settings} {...props} setMenu={setMenu} />} />

					<Route exact path="/reports/reports" component={(props) => <Reports config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/reports/reports/:id" component={(props) => <ReportDetails config={settings} {...props} setMenu={setMenu} />} />

					<Route exact path="/reports/product-reports" component={(props) => <ProductReport config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/reports/product-reports/:id" component={(props) => <ProductReportDetails config={settings} {...props} setMenu={setMenu} />} />

					<Route exact path="/configurations/settings" component={(props) => <SystemSettings config={settings} {...props} setMenu={setMenu} permissions={role ? role.permissions.configurations.childitems.settings : null} />} />
					<Route exact path="/configurations/countries" component={(props) => <Countries config={settings} {...props} setMenu={setMenu} permissions={role ? role.permissions.configurations.childitems.countries : null} />} />
					<Route exact path="/configurations/currencies" component={(props) => <Currencies config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/configurations/forms" component={(props) => <FormsConfigurations config={settings} {...props} setMenu={setMenu} permissions={role ? role.permissions.configurations.childitems.forms : null} />} />
					<Route exact path="/configurations" component={(props) => <Configurations config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/transactions" component={(props) => <Transactions config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/bank-accounts" component={(props) => <BankAccounts config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/bank-accounts/:id" component={(props) => <SendOTPBankAccounts config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/transactions/transactions/:id" component={(props) => <Transactions config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/main-account" component={(props) => <CompanyAccount config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/transactions/deposits" component={(props) => <Deposits config={settings} {...props} setMenu={setMenu} permissions={role ? role.permissions.transactions.childitems.deposits : null} />} />
					{/* <Route exact path="/transactions/rejected" component={(props) => <Canceled config={settings} {...props} setMenu={setMenu} />} /> */}
					<Route exact path="/transactions/import" component={(props) => <TransactionImport config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/transactions/transfers" component={(props) => <Transfers config={settings} {...props} setMenu={setMenu} permissions={role ? role.permissions.transactions.childitems.transfers : null} />} />
					{/* <Route exact path="/transactions/completed" component={(props) => <Completed config={settings} {...props} setMenu={setMenu} />} /> */}
					{/* <Route exact path="/transactions/pending" component={(props) => <Pending config={settings} {...props} setMenu={setMenu} />} /> */}
					<Route exact path="/transactions/withdrawals" component={(props) => <Widthdrawals config={settings} {...props} setMenu={setMenu} permissions={role?role.permissions.transactions.childitems.withdrawals:null} />} />
					<Route exact path="/transactions/debit-credit" component={(props) => <DebitCredit config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/products" component={(props) => <Products config={settings} {...props} setMenu={setMenu} permissions={role?role.permissions.products.childitems.products:null} />} />
					<Route exact path="/products/cancellations" component={(props) => <ProductCancellations config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/products/history" component={(props) => <ProductHistory config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/products/categories" component={(props) => <ProductCategories config={settings} {...props} setMenu={setMenu} permissions={role ? role.permissions.products.childitems.categories : null} />} />
					<Route exact path="/products/categories/add" component={(props) => <CategoryNew config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/products/categories/:id" component={(props) => <CategoryUpdate config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/products/add" component={(props) => <ProductAddNew config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/products/cancel" component={(props) => <ProductCancel config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/products/subcategories" component={(props) => <ProductSubCategories config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/products/subcategories/:id/calculations" component={(props) => <ProductSubCategoryCalculations config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/products/subcategories/:id" component={(props) => <ProductUpdateSubCategory config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/products/:id" component={(props) => <ProductDetails config={settings} {...props} setMenu={setMenu} />} />

					<Route exact path="/configurations/permissions" component={(props) => <UserPermissions config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/configurations/commissions" component={(props) => <Commission config={settings} {...props} setMenu={setMenu} />} />
					{/* <Route exact path="/configurations/product/:id" component={(props) => <ProductSubcategoryUpdate config={settings} {...props} setMenu={setMenu} />} /> */}

					<Route exact path="/kyc" component={(props) => <KYC config={settings} {...props} setMenu={setMenu} />} />
					<Route exact path="/broadcast" component={(props) => <Broadcast config={settings} {...props} setMenu={setMenu} permissions={role ? role.permissions.broadcast: null} />} />
					<Route exact path="/broadcast/edit/:id" component={(props) => <EditBroadcast config={settings} {...props} setMenu={setMenu} permissions={role ? role.permissions.broadcast: null} />} />
					<Route exact path="/broadcast/add" component={(props) => <AddBroadcast config={settings} {...props} setMenu={setMenu} permissions={role ? role.permissions.broadcast: null} />} />
					<Route component={(props) => <PageNotFound config={settings} {...props} menu={menu} />} />
				</Switch>
			</Router>
		</AuthContext.Provider>
	)
}

export default App;
