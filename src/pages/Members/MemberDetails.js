import React, { useMemo, useRef, useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Layout } from 'containers';
import { Members, Transactions, Products } from 'components';

const Image = () => {
    return (
        <img
            alt=""
            height="32px"
            style={{ borderRadius: 4 }}
            width="32px"
            src={require("images/1.jpeg")}
        />
    );
};

const MemberDetails = props => {
	const breadcrumb = { heading: "Member Details" };
	const [activeTab, setActiveTab] = useState('referals');
	const profile = {
		customerId: '109977041',
		name: 'Mduduzi Mdluli',
		username: 'JSmith',
		phone: '0845880677',
		email: 'example1@demo.com',
		id_number: '9103025869089',
		country: 'South Africa',
		level: '3',
		created: 'just now',
		status: 'Active',
		bio: 'Im mdu mdluli born and raised in KZN',
	    address: {
			streetAddress: '23 Modiseni',
			suburb: 'Centurion',
			city: 'Pretoria',
			province: 'Gauteng',
			postalCode: '2345'
		}};
		const toggleTab = (e, tab) => {
			e.preventDefault();
			setActiveTab(tab);
		};

	return (
		<Layout {...props} breadcrumb={breadcrumb}>
                    <Row>
                        <Col md={12} lg={3} xl={3}>
                            <Card className="o-hidden author-box" style={{ minHeight: 300 }}>
                                <CardBody>
                                    <div className="author-box-center mt-3">
                                        <img
                                            alt={profile.name}
                                            src={require("images/1.jpeg")}
                                            className="rounded-circle author-box-picture"
                                        />
                                        <div className="clearfix"></div>
                                        <div className="author-box-name mt-3">
											<h4 className="text-primary mt-0 mb-1">{profile.name}</h4>
                                            <span className="text-success" onClick={e => e.preventDefault()}>
                                                Balance: {'ZAR 68000.00'}
                                            </span>
                                        </div>
                                        <div className="author-box-job">
										    Id Number: {profile.id_number}<br />
											Phone: {profile.phone}<br />
											Email: {profile.email}<br />
											Level: {profile.level}
											<hr />
											<strong>Address</strong>
											{profile.address &&
                                                <p>
                                                    {profile.address.streetAddress || ''},&nbsp;
                                                    {profile.address.suburb || ''}
                                                    <br />
                                                    {profile.address.city || ''},&nbsp;
                                                    {profile.address.province || ''}&nbsp;
                                                    {profile.address.postalCode || ''}
                                                </p>}
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={12} lg={9} xl={9}>
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
                                                Referals
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
												<Members.Referals />
                                            </CardBody>
                                        </div>
                                        <div role="tabpanel" className={`tab-pane show ${activeTab === 'products' ? 'active' : ''}`}>
                                            <div className="profile-setting__card">
                                                <CardBody className="pl-0 pr-0 pb-0">
                                                    <Products.ProductsByMember />
                                                </CardBody>
                                            </div>
                                        </div>
										<div role="tabpanel" className={`tab-pane show ${activeTab === 'transactions' ? 'active' : ''}`}>
                                            <div className="profile-setting__card">
                                                <CardBody className="pl-0 pr-0 pb-0">
												 <Transactions.TransactionsByMember />
                                                </CardBody>
                                            </div>
                                        </div>
										<div role="tabpanel" className={`tab-pane show ${activeTab === 'banking-details' ? 'active' : ''}`}>
                                            <div className="profile-setting__card">
                                                <CardBody className="pl-0 pr-0 pb-0">
												<Members.BankDetails />
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

export default MemberDetails;
