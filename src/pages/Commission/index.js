import React, {useState, useEffect} from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Common, Commission } from 'components';
import { AuthLayout } from 'containers';
import { SettingService, SessionProvider} from '../../providers';

export default function SystemSettings(props) {
    const [activeTab, setActiveTab] = useState('general');
    const [show, setShow] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [settings, setSettings] = useState([]);
    const [error, setError] = useState('');
    const [adminLevel, setAdminLevel] = useState(0);
    const [filteredSettings, setFilteredSettings] = useState([]);

    async function fetchData(){
        setPageLoading(false);
    }
    useEffect(() => {
        if (SessionProvider.isValid()) {
            const user = SessionProvider.get();
             setAdminLevel(user.permission_level)
         }
         fetchData();
    }, []);


    const toggleTab = (e, tab) => {
        e.preventDefault();
        setActiveTab(tab);
    };
    return (
        <AuthLayout
            {...props}
            loading={pageLoading}
            breadcrumb={{
                items: [{ title: 'Dashboard', link: '/dashboard' }],
                active: "Commission Configuration"
            }}
            pageHeading={{
                title: 'Manage Commission Configuration',
                caption: 'EXPLORE Commission FOR CRYPTO BASED INNOVATION',
            }}
        >
            <Card>
                <Common.Widget
                    icon="li-cog"
                    title="Commission Configuration"
                    wrapperClass="widget--items-middle"
                />
                <CardBody className="padding-botton-0">
                <ul className="nav nav-tabs nav-tabs__round mt-0">
                                <li className="nav-item">
                                    <a
                                        className={`nav-link show ${activeTab === 'general' ? 'active' : ''}`}
                                        onClick={e => toggleTab(e, 'general')}
                                        data-toggle="tab"
                                        href="/"
                                    >
                                        Commissiom Config
                                    </a>
                                </li>
                                {/* <li className="nav-item">
                                    <a
                                        className={`nav-link show ${activeTab === 'referals' ? 'active' : ''}`}
                                        onClick={e => toggleTab(e, 'referals')}
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
                                        Company Bank Details
                                    </a>
                                </li>
                                 <li className="nav-item">
                                    <a
                                        className={`nav-link show ${activeTab === 'kyc' ? 'active' : ''}`}
                                        onClick={e => toggleTab(e, 'kyc')}
                                        data-toggle="tab"
                                        href="/"
                                    >
                                        KYC Limits
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
                                        <Commission.CommissionConfig />
                                        </CardBody>
                                    </div>
                                </div>
                                <div role="tabpanel" className={`tab-pane show ${activeTab === 'referals' ? 'active' : ''}`}>
                                    <CardBody className="pl-0 pr-0 pb-0">
                                        
                                    </CardBody>
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
