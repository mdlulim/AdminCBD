import React, { useState} from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import { Common, Transactions } from 'components';

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

export default function Completed(props) {
    
    return (
        <AuthLayout
            {...props}
            breadcrumb={{ active: "Transfer" }}
            pageHeading={{
                title: 'Make Transfer',
                caption: 'EXPLORE OVERVIEW TRANSFER FOR CRYPTO BASED INNOVATION',
                actions: <Filter />
            }}
        >
             <div className="form-row margin-bottom-20">
            <Col xs={12} lg={6}>
                    <Common.Widget
                        icon="li-wallet"
                        title="Main Account"
                        subtitle="Main Account Balance"
                        informer={<span className="text-bold text-success">2 890 000.0000 CBI</span>}
                        invert={false}
                    />
                </Col>
                <Col xs={12} lg={6}>
                    <Common.Widget
                        icon="li-wallet"
                        title="Amount Transfered"
                        subtitle="Amount transfer this month"
                        informer={<><span className="text-bold text-info"> 686 908.0000 CBI</span></>}
                        invert={false}
                    />
                </Col>
            </div>
            <div className="form-row">
                <Col xs={12} lg={12}>
                <Transactions.MakeTransfer />
                </Col>
            </div>
        </AuthLayout>
    );
}