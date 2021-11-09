import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import { Common, Transactions } from 'components';

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

export default function Width(props) {
    return (
        <AuthLayout
            {...props}
            breadcrumb={{ active: "Widthdrawals" }}
            pageHeading={{
                title: 'Widthdrawal Transactions',
                caption: 'EXPLORE OVERVIEW WIDTHDRAWALS FOR CRYPTO BASED INNOVATION'
            }}
        >
            <div className="form-row">
                <Col xs={12} lg={12}>
                <Transactions.Widthdrawals />
                </Col>
            </div>
        </AuthLayout>
    );
}