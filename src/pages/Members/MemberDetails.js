import React, { useMemo, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { MemberService } from '../../providers';
import { AuthLayout } from 'containers';
import { Common, Members, Transactions, Products } from 'components';

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

const Filter = () => {
    return (
        <>
            <Common.Dropdown
                actions={[
                    { label: 'Filter by Date Range' },
                    { label: 'Filter by Date' },
                    { label: 'Filter Month' },
                    { label: 'Filter Year' }
                ]}
            />
            <button
                className="btn btn-light d-none d-md-block float-right margin-right-5"
                id="dashboard-rp-customrange"
            >
                September 22, 2021 - October 21, 2021
            </button>
        </>
    );
}

const MemberDetails = props => {
	const breadcrumb = { heading: "Member Details" };
	const [activeTab, setActiveTab] = useState('referals');
    const [member, setMember] = useState({});
    const [addresses, setAddresses] = useState([]);
    const params = useParams();
    const { id } = params;

    useMemo(() => {
        //Get member details
        MemberService.getMember(id).then((res) => {
            console.log(res.data.data)
          const memberDetails = res.data.data;
          setMember(memberDetails);
        });

        //Get member details
        MemberService.getMemberAddress(id).then((res) => {
            console.log(res.data.data.results)
            const memberAddress = res.data.data.results;
            setAddresses(memberAddress);
          });
 
      }, []);

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

        const numRows = addresses.length

	return (
		<AuthLayout
            {...props}
            breadcrumb={{ active: "Member Details" }}
            pageHeading={{
                title: 'Member Details',
                caption: 'EXPLORE OVERVIEW MEMBER DETAILS FOR CRYPTO BASED INNOVATION'
            }}
        >
                    <Row>
                        <Col md={12} lg={3} xl={3}>
                            <Card className="o-hidden author-box" style={{ minHeight: 300 }}>
                                <CardBody>

                                    {member ?
                                    <div className="author-box-center mt-3">
                                        <img
                                            alt={member.first_name}
                                            src={require("images/1.jpeg")}
                                            className="rounded-circle author-box-picture"
                                        />
                                        <div className="clearfix"></div>
                                        <div className="author-box-name mt-3">
											<h4 className="text-primary mt-0 mb-1">{member.first_name} {member.last_name}</h4>
                                            <span className="text-success" onClick={e => e.preventDefault()}>
                                                Balance: {'KYC 68000.00'}
                                            </span>
                                        </div>
                                        <div className="author-box-job">
										    ID/Passport No: {member.id_number}<br />
											Phone: {member.mobile}<br />
											Email: {member.email}<br />
											Level: 0
											<hr />
											<strong>Address</strong>
											{numRows ?
                                                <p>
                                                    {addresses.streetAddress || ''},&nbsp;
                                                    {addresses.suburb || ''}
                                                    <br />
                                                    {addresses.city || ''},&nbsp;
                                                    {addresses.province || ''}&nbsp;
                                                    {addresses.postalCode || ''}
                                                </p>:<p> <br />Address not provided</p>}
                                        </div>
                                    </div>
                                    : ''}
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
                                                Referrals
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
												<Members.Referals member={member} />
                                            </CardBody>
                                        </div>
                                        <div role="tabpanel" className={`tab-pane show ${activeTab === 'products' ? 'active' : ''}`}>
                                            <div className="profile-setting__card">
                                                <CardBody className="pl-0 pr-0 pb-0">
                                                    <Products.ProductsByMember member={member} />
                                                </CardBody>
                                            </div>
                                        </div>
										<div role="tabpanel" className={`tab-pane show ${activeTab === 'transactions' ? 'active' : ''}`}>
                                            <div className="profile-setting__card">
                                                <CardBody className="pl-0 pr-0 pb-0">
												 <Transactions.TransactionsByMember member={member} />
                                                </CardBody>
                                            </div>
                                        </div>
										<div role="tabpanel" className={`tab-pane show ${activeTab === 'banking-details' ? 'active' : ''}`}>
                                            <div className="profile-setting__card">
                                                <CardBody className="pl-0 pr-0 pb-0">
												<Members.BankDetails member={member} />
                                                </CardBody>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
			
		</AuthLayout>
	);
};

export default MemberDetails;
