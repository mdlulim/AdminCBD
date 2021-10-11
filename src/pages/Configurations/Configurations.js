import React, { useState, useMemo } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Layout } from 'containers';
import { Configurations } from 'components';

const ConfigurationPage = props => {
	const [key, setKey] = useState('general');
	const [activeTab, setActiveTab] = useState('referals');
	const breadcrumb = { heading: "Configurations" };
	const toggleTab = (e, tab) => {
		e.preventDefault();
		setActiveTab(tab);
	};

	return (
		<Layout {...props} breadcrumb={breadcrumb}>
			<Row className="mt-4">
                        <Col md={12} lg={12}>
                            <Card>
                                <CardBody>
                                    <ul className="nav nav-tabs nav-tabs__round mt-0">
                                        <li className="nav-item">
                                            <a
                                                className={`nav-link show ${activeTab === 'referals' ? 'active' : ''}`}
                                                onClick={e => toggleTab(e, 'referals')}
                                                data-toggle="tab"
                                                href="/"
                                            >
                                                General
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className={`nav-link show ${activeTab === 'products' ? 'active' : ''}`}
                                                onClick={e => toggleTab(e, 'products')}
                                                data-toggle="tab"
                                                href="/"
                                            >
                                                Products
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
                                        </li>
										<li className="nav-item">
                                            <a
                                                className={`nav-link show ${activeTab === 'banking-details' ? 'active' : ''}`}
                                                onClick={e => toggleTab(e, 'banking-details')}
                                                data-toggle="tab"
                                                href="/"
                                            >
                                                Banking Details
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div role="tabpanel" className={`tab-pane show ${activeTab === 'referals' ? 'active' : ''}`}>
                                            <CardBody className="pl-0 pr-0 pb-0">
												Tab 1
                                            </CardBody>
                                        </div>
                                        <div role="tabpanel" className={`tab-pane show ${activeTab === 'products' ? 'active' : ''}`}>
                                            <div className="profile-setting__card">
                                                <CardBody className="pl-0 pr-0 pb-0">
                                                    Tab 2
                                                </CardBody>
                                            </div>
                                        </div>
										<div role="tabpanel" className={`tab-pane show ${activeTab === 'transactions' ? 'active' : ''}`}>
                                            <div className="profile-setting__card">
                                                <CardBody className="pl-0 pr-0 pb-0">
												 Tab 3
                                                </CardBody>
                                            </div>
                                        </div>
										<div role="tabpanel" className={`tab-pane show ${activeTab === 'banking-details' ? 'active' : ''}`}>
                                            <div className="profile-setting__card">
                                                <CardBody className="pl-0 pr-0 pb-0">
												Tab 4
                                                </CardBody>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
			</Row>
		</Layout>
	);
};

export default ConfigurationPage;
