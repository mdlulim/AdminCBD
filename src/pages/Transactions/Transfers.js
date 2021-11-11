import React, { useState} from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import MakeTransfer from '../../components/Transactions/MakeTransfer';
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
            <a href="transfers/transfer"
                className="btn d-none d-md-block float-right margin-right-5"
                id="dashboard-rp-customrange"
               
            >
                Transfer
            </a>
        </>
    );
}

export default function Completed(props) {
    
    return (
        <AuthLayout
            {...props}
            breadcrumb={{ active: "Transfers" }}
            pageHeading={{
                title: 'Transfers Transactions',
                caption: 'EXPLORE OVERVIEW TRANSFERS FOR CRYPTO BASED INNOVATION',
                actions: <Filter />
            }}
        >
            <div className="form-row">
                <Col xs={12} lg={12}>
                <Transactions.Transactions transactionType={'transfers'} />
                </Col>
            </div>
        </AuthLayout>
    );
}