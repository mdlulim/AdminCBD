import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { AuthLayout } from 'containers';
import { MainAccount, Common } from 'components';
import { MainAccountService, ProductService, TransactionService } from '../../providers';

const inputWith = {
    width: '20%'
  }

  const inputWithDate = {
    width: '25%'
  }
const CompanyAccountList = props => {
    const breadcrumb = { heading: "CompanyAccounts" };
    const [show, setShow] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [companyAccounts, setCompanyAccounts] = useState([]);
    const [activeTab, setActiveTab] = useState('general');
    const [mainAccount, setMainAccount] = useState({});
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleClose = () => setShow(false);
    const toggleTab = (e, tab) => {
        e.preventDefault();
        setActiveTab(tab);
    };

    async function fetchData(){
        const mainAccount = await MainAccountService.getMainAccount()
            setMainAccount(mainAccount);
        const data = {subtype: 'deposit'}
        const types = await MainAccountService.getTransactionTotal(data);
        console.log("======================Transaction==================")
        console.log(types)

        const poducts = await ProductService.getProductHistory();
              setProducts(poducts.results);
              setFilteredProducts(poducts.results)

        const transaList = await TransactionService.getTransactions();
        const results = transaList.results.filter(item => item.status.toLowerCase() === "completed");
             setTransactions(results);
             setFilteredTransactions(results);
            // console.log(results)


        setPageLoading(false);
    } 
    useEffect(() => {

        fetchData()
    }, []);

    const Filter = () => {
        return (
            <>
                <Common.Dropdown
                    actions={[
                        { label: 'Filter by Date Range',
                        onClick: () => {
                            setShow(true)
                        }
                        },
                        { label: 'Filter by Date' },
                        { label: 'Filter Month' },
                        { label: 'Filter Year' }
                    ]}
                />
                {!pageLoading ?
                <button
                    className="btn btn-light d-none d-md-block float-right margin-right-5"
                    id="dashboard-rp-customrange"
                >
                    September 22, 2021 - October 21, 2021
                </button> : ''}
            </>
        );
    }

    const selectDataRange = (data) => {
       setDisabled(true);
        const start = Date.parse(startDate);
        const end = Date.parse(endDate);
        const searchByDate = transactions.filter(
            transaction => (Date.parse(transaction.updated)) >= start && (Date.parse(transaction.updated)) <= end);
        const searchByDateProducts = products.filter(
            product => (Date.parse(product.updated)) >= start && (Date.parse(product.updated)) <= end);
            setFilteredProducts(searchByDateProducts);
            setFilteredTransactions(searchByDate);
        setDisabled(false);
        setShow(false)
    }

	return (
        <AuthLayout
        {...props}
        loading={pageLoading}
        breadcrumb={{ active: "Main Account" }}
        pageHeading={{
            title: 'CBI Main Account',
            caption: 'EXPLORE OVERVIEW MAIN ACCOUNT FOR CRYPTO BASED INNOVATION',
            actions: <Filter />
        }}>
            {!pageLoading &&
              <>
              <div className="form-row margin-bottom-20">
                        <Col xs={12} lg={3}>
                            <a href={``} >
                             <Common.Widget
                                icon="li-users2"
                                title="Main Account"
                                subtitle="Summary Amount"
                                informer={<><span className="text-bold text-danger">{0}</span> </>}
                            /></a>
                        </Col>
                        <Col xs={12} lg={3}>
                        <a href={``} >
                            <Common.Widget
                                icon="li-users2"
                                title="Transaction Fees"
                                subtitle="Fees"
                                informer={<><span className="text-bold text-success">{0}</span></>}
                            /></a>
                        </Col>
                        <Col xs={12} lg={3}>
                        <a href={``} >
                            <Common.Widget
                                icon="li-users2"
                                title="Products"
                                subtitle="Total Amount"
                                informer={<><span className="text-bold text-warning">{0}</span> </>}
                            /></a>
                        </Col>
                        <Col xs={12} lg={3}>
                        <a href={``} >
                            <Common.Widget
                                icon="li-users2"
                                title="Registration"
                                subtitle="Fees"
                                informer={<><span className="text-bold text-danger">{0}</span> </>}
                            /></a>
                        </Col>
                    </div>
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
                                             <MainAccount.TransactionFees transactions={filteredTransactions} transactionType={`TestData`} />
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
            <Modal show={show} onHide={handleClose} centered className="confirm-modal">
        <Modal.Body>
          <Row>
            <Col>
              <h3 className="text-success">Search by date range </h3>
              <hr />
              <div className="form-group">
                <label htmlFor="from">From</label>
                <DatePicker style={inputWithDate} className={`form-control form-control-m`} selected={startDate} onChange={(date) => setStartDate(date)} />
              </div>
              <div className="form-group">
                <label htmlFor="email">To</label>
                <DatePicker style={inputWithDate} className={`form-control form-control-m`} selected={endDate} onChange={(date) => setEndDate(date)} />
              </div>
              <hr />
              <Row>
                <Col md={6}>
                  <button
                    className="btn btn-dark"
                    onClick={e => {
                      e.preventDefault();
                      setShow(false);
                    }}
                  >
                    {'Cancel'}
                  </button>
                </Col>
                <Col md={6} >
                  <button
                    className="btn btn-success float-right"
                    onClick={selectDataRange}
                    disabled={disabled}
                  >
                    {'Search'}
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
         </>}
        </AuthLayout>
	);
};

export default CompanyAccountList;