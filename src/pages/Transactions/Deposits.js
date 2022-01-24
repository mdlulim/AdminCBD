import React, { useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import { Common, Transactions } from 'components';

let baseURL = window.location.origin;
let page = (window.location.pathname.split('/').pop()).toLowerCase();
    
// if(page === 'deposits'){
//     let mi = session.payload.vlist;
//     if(!mi.includes("Deposits")){
//         window.location.replace(baseURL+"/dashboard");
//     } 
// }

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

export default function Deposits(props) {
    const [pageLoading, setPageLoading] = useState(true);
    
    return (
        <AuthLayout
            {...props}
            loading={pageLoading}
            breadcrumb={{ active: "Deposits" }}
            pageHeading={{
                title: 'Deposit Transactions',
                caption: 'EXPLORE OVERVIEW DEPOSITS FOR CRYPTO BASED INNOVATION'
            }}
        >
            <div className="form-row">
                <Col xs={12} lg={12}>
                <Transactions.Transactions transactionType={'deposit'} setPageLoading={setPageLoading} {...props}/>
                </Col>
            </div>
        </AuthLayout>
    );
}