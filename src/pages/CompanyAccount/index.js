import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import { MainAccount, Common } from 'components';
import { CompanyAccountService, AccountService, ProductService, TransactionService } from '../../providers';

const CompanyAccountList = props => {
    const breadcrumb = { heading: "CompanyAccounts" };
    const [pageLoading, setPageLoading] = useState(true);
    const [companyAccounts, setCompanyAccounts] = useState([]);
    const [activeTab, setActiveTab] = useState('general');
    const [mainAccount, setMainAccount] = useState({});
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);

    const toggleTab = (e, tab) => {
        e.preventDefault();
        setActiveTab(tab);
    };

    async function fetchData(){
        const mainAccount = await AccountService.getMainAccount()
            setMainAccount(mainAccount);

        const poducts = await ProductService.getProductHistory();
              setProducts(poducts.results);
              setFilteredProducts(poducts.results)

        const transaList = await TransactionService.getTransactions();
             setTransactions(transaList.results);
             setFilteredTransactions(transaList.results);
             console.log(transaList.results)


        setPageLoading(false);
    } 
    useEffect(() => {

        fetchData()
        console.log(filteredTransactions)
        }, []);

        const countCompanyAccounts = (type) =>{
            const countTypes = transactions.filter(transaction => transaction.status === type);
            return countTypes.length;
        };

	return (
        <AuthLayout 
        {...props}
        loading={pageLoading}
        breadcrumb={{ active: "Main Account" }}
        pageHeading={{
            title: 'CBI Main Account',
            caption: 'EXPLORE OVERVIEW MAIN ACCOUNT FOR CRYPTO BASED INNOVATION',
        }}>
             <Card>
                <CardBody className="padding-botton-0">
                <ul className="nav nav-tabs nav-tabs__round mt-0">
                                <li className="nav-item">
                                    <a
                                        className={`nav-link show ${activeTab === 'general' ? 'active' : ''}`}
                                        onClick={e => toggleTab(e, 'general')}
                                        data-toggle="tab"
                                        href="/"
                                    >
                                        Transaction Fees
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`nav-link show ${activeTab === 'referals' ? 'active' : ''}`}
                                        onClick={e => toggleTab(e, 'referals')}
                                        data-toggle="tab"
                                        href="/"
                                    >
                                       Products
                                    </a>
                                </li>
                                {/* <li className="nav-item">
                                    <a
                                        className={`nav-link show ${activeTab === 'products' ? 'active' : ''}`}
                                        onClick={e => toggleTab(e, 'products')}
                                        data-toggle="tab"
                                        href="/"
                                    >
                                        Systems
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`nav-link show ${activeTab === 'transactions' ? 'active' : ''}`}
                                        onClick={e => toggleTab(e, 'transactions')}
                                        data-toggle="tab"
                                        href="/"
                                    >
                                        Transactions
                                    </a>
                                </li> */}
                                {/* <li className="nav-item">
                                    <a
                                        className={`nav-link show ${activeTab === 'banking-details' ? 'active' : ''}`}
                                        onClick={e => toggleTab(e, 'banking-details')}
                                        data-toggle="tab"
                                        href="/"
                                    >
                                        Banking Details
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`nav-link show ${activeTab === 'kyc' ? 'active' : ''}`}
                                        onClick={e => toggleTab(e, 'kyc')}
                                        data-toggle="tab"
                                        href="/"
                                    >
                                        KYC
                                    </a>
                                </li> */}
                            </ul>
                            <div className="tab-content">
                                <div role="tabpanel" className={`tab-pane show ${activeTab === 'general' ? 'active' : ''}`}>
                                    <div className="profile-setting__card">
                                        <CardBody className="pl-0 pr-0 pb-0">
                                             <MainAccount.TransactionFees transactions={transactions}/>
                                        </CardBody>
                                    </div>
                                </div>
                                <div role="tabpanel" className={`tab-pane show ${activeTab === 'referals' ? 'active' : ''}`}>
                                    <CardBody className="pl-0 pr-0 pb-0">
                                        <MainAccount.ProductOverview products={filteredProducts} />
                                    </CardBody>
                                </div>
                                <div role="tabpanel" className={`tab-pane show ${activeTab === 'products' ? 'active' : ''}`}>
                                    <div className="profile-setting__card">
                                        <CardBody className="pl-0 pr-0 pb-0">
                                            {/* <Settings.SystemFees /> */}
                                        </CardBody>
                                    </div>
                                </div>
                                <div role="tabpanel" className={`tab-pane show ${activeTab === 'banking-details' ? 'active' : ''}`}>
                                    <div className="profile-setting__card">
                                        <CardBody className="pl-0 pr-0 pb-0">
                                        </CardBody>
                                    </div>
                                </div>
                                <div role="tabpanel" className={`tab-pane show ${activeTab === 'kyc' ? 'active' : ''}`}>
                                    <div className="profile-setting__card">
                                        <CardBody className="pl-0 pr-0 pb-0">
                                         </CardBody>
                                    </div>
                                </div>
                            </div>
                </CardBody>
            </Card>

            {/* <div className="form-row margin-bottom-20">
                <Col xs={12} lg={2}>
                    <Common.Widget
                        icon="li-wallet"
                        title="Deposit"
                        subtitle="CompanyAccounts"
                        informer={<><span className="text-bold text-info">{countCompanyAccounts('deposit')}</span></>}
                        invert={false}
                    />
                </Col>
                <Col xs={12} lg={2}>
                    <Common.Widget
                        icon="li-wallet"
                        title="Widthdrawals"
                        subtitle="CompanyAccounts"
                        informer={<><span className="text-bold text-info">{countCompanyAccounts('Widthdrawals')}</span></>}
                        invert={false}
                    />
                </Col>
                <Col xs={12} lg={2}>
                    <Common.Widget
                        icon="li-wallet"
                        title="Transfers"
                        subtitle="CompanyAccounts"
                        informer={<span className="text-bold text-info">{countCompanyAccounts('Transfers')}</span>}
                        invert={false}
                    />
                </Col>
                <Col xs={12} lg={2}>
                    <Common.Widget
                        icon="li-wallet"
                        title="Pending"
                        subtitle="CompanyAccounts"
                        informer={<><span className="text-bold text-warning">{countCompanyAccounts('Pending')}</span></>}
                        invert={false}
                    />
                </Col>
                <Col xs={12} lg={2}>
                    <Common.Widget
                        icon="li-wallet"
                        title="Canceled"
                        subtitle="CompanyAccounts"
                        informer={<span className="text-bold text-danger">{countCompanyAccounts('Canceled')}</span>}
                        invert={false}
                    />
                </Col>
            </div>
			<Row className="mt-4">
				<Col lg={12} xl={12}>
				<Col md={12}>
                    <CompanyAccounts.CompanyAccounts /> 
                </Col>
				</Col>
			</Row>
		 */}
        </AuthLayout>
	);
};

export default CompanyAccountList;
