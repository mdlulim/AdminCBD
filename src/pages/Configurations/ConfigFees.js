import React, {useState} from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Common, Pagination, UserRoles } from 'components';
import { AuthLayout } from 'containers';


export default function ConfigFees(props) {
    const [activeTab, setActiveTab] = useState('kyc');


    const toggleTab = (e, tab) => {
        e.preventDefault();
        setActiveTab(tab);
    };
    return (
        <AuthLayout
            {...props}
            breadcrumb={{
                items: [{ title: 'Dashboard', link: '/dashboard' }],
                active: "Config Fees"
            }}
            pageHeading={{
                title: 'Manage Fees',
                caption: 'EXPLORE FEES FOR CRYPTO BASED INNOVATION',
            }}
        >
            <Card>
                <Common.Widget
                    icon="li-cog"
                    title="Fees Configurations"
                    wrapperClass="widget--items-middle"
                />
                <CardBody className="padding-botton-0">
                <ul className="nav nav-tabs nav-tabs__round mt-0">
                                <li className="nav-item">
                                    <a
                                        className={`nav-link show ${activeTab === 'referals' ? 'active' : ''}`}
                                        onClick={e => toggleTab(e, 'referals')}
                                        data-toggle="tab"
                                        href="/"
                                    >
                                        Registration Fee
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`nav-link show ${activeTab === 'products' ? 'active' : ''}`}
                                        onClick={e => toggleTab(e, 'products')}
                                        data-toggle="tab"
                                        href="/"
                                    >
                                        Transaction Fee
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
                                <li className="nav-item">
                                    <a
                                        className={`nav-link show ${activeTab === 'kyc' ? 'active' : ''}`}
                                        onClick={e => toggleTab(e, 'kyc')}
                                        data-toggle="tab"
                                        href="/"
                                    >
                                        KYC
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div role="tabpanel" className={`tab-pane show ${activeTab === 'referals' ? 'active' : ''}`}>
                                    <CardBody className="pl-0 pr-0 pb-0">
                                    </CardBody>
                                </div>
                                <div role="tabpanel" className={`tab-pane show ${activeTab === 'products' ? 'active' : ''}`}>
                                    <div className="profile-setting__card">
                                        <CardBody className="pl-0 pr-0 pb-0">
                                        </CardBody>
                                    </div>
                                </div>
                                <div role="tabpanel" className={`tab-pane show ${activeTab === 'transactions' ? 'active' : ''}`}>
                                    <div className="profile-setting__card">
                                        <CardBody className="pl-0 pr-0 pb-0">
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
        </AuthLayout>
    );
} 
