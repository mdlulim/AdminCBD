import React, { useState, useMemo} from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import { Common, Transactions } from 'components';
import { AccountService } from '../../providers'

const Filter = () => {
    const [show, setShow]= useState(false);
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
                className="btn d-none d-md-block float-right margin-right-5"
                id="dashboard-rp-customrange"
                onClick={e => {
                    setShow(true);
                  }}
            >
                Transfer
            </button>
        </>
    );
}

export default function DebitCredit(props) {
    const [mainAccount, setMainAccount] = useState({});
    const [pageLoading, setPageLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [activeTab, setActiveTab] = useState('general');

    const toggleTab = (e, tab) => {
        e.preventDefault();
        setActiveTab(tab);
    };

    async function fetchData() {
        const res = await AccountService.getMainAccount();
        setMainAccount(res);
        setPageLoading(false);
    }


    useMemo(() => {
        fetchData()

      }, []);

    return (
        <AuthLayout
            {...props}
            loading={pageLoading}
            breadcrumb={{ active: "Debit/Credit" }}
            pageHeading={{
                title: 'Debit/Credit',
                caption: 'EXPLORE OVERVIEW DEBIT/CREDIT FOR CRYPTO BASED INNOVATION',
                // actions: <Filter />
            }}
        >
             {!pageLoading &&
             <><ul className="nav nav-tabs nav-tabs__round mt-0">
             <li className="nav-item">
                 <a
                     className={`nav-link show ${activeTab === 'general' ? 'active' : ''}`}
                     onClick={e => toggleTab(e, 'general')}
                     data-toggle="tab"
                     href="/"
                 >
                     Debit/Credit Account
                 </a>
             </li>
             <li className="nav-item">
                 <a
                     className={`nav-link show ${activeTab === 'referals' ? 'active' : ''}`}
                     onClick={e => toggleTab(e, 'referals')}
                     data-toggle="tab"
                     href="/"
                 >
                     Debit/Credit History
                 </a>
             </li>
         </ul>
         <div className="tab-content">
             <div role="tabpanel" className={`tab-pane show ${activeTab === 'general' ? 'active' : ''}`}>
             <CardBody className="pl-0 pr-0 pb-0">
                 <Card id="reports">
                        <Common.Widget
                            icon="li-wallet"
                            title="Debit Or Credit"
                            subtitle="User Account"
                            wrapperClass="widget--items-middle"
                        />
                        <hr className="margin-top-0 margin-bottom-0" />
                        <Transactions.DebitCredit />
                    </Card>
                </CardBody>
             </div>
             <div role="tabpanel" className={`tab-pane show ${activeTab === 'referals' ? 'active' : ''}`}>
                 <CardBody className="pl-0 pr-0 pb-0">
                    <Transactions.DebitCreditHistory />
                 </CardBody>
             </div>
         </div>
                    </>}
        </AuthLayout>
    );
}