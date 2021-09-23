import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { HashLinkContainer, Transactions } from 'components';

// table headings definition
const columns = [{
    name: '#',
    selector: 'id',
    sortable: true,
}, {
    name: 'Name',
    selector: 'name',
    sortable: true,
}, {
    name: 'Email',
    selector: 'email',
    sortable: true,
}, {
    name: 'Mobile Number',
    selector: 'mobileNumber',
    sortable: true,
}, {
    name: 'Amount',
    selector: 'amount',
    sortable: true,
}, {
    name: 'Actions',
    sortable: true,
    cell: () => <a href="/">View</a>
}];

const transactions = [{
    id: '12211',
    name: 'John Doe',
    email: 'johndoe@demo.com',
    mobileNumber: '0811231231',
    amount: '200 USD',
}, {
    id: '12212',
    name: 'John Smith',
    email: 'johnsmith@demo.com',
    mobileNumber: '0711231231',
    amount: '200 USD',
}];

export default function OverviewTransactions() {
    return (
        <Card className="o-hidden mb-4">
            <CardBody className="p-0">
                <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
                    <span>Latest Transactions</span>
                    <span className="flex-grow-1" />
                    <div>
                        <HashLinkContainer to="/properties/add">
                            <button className="btn btn-secondary" type="button">
                                Add Transaction
                            </button>
                        </HashLinkContainer>
                    </div>
                </div>
            </CardBody>
            <Transactions.Table
                data={transactions}
                columns={columns}
            />
            <CardBody className="text-center border-top">
                <HashLinkContainer to="/transactions">
                    <a className="card-link font-weight-bold" href="/transactions">
                        More Transactions...
                    </a>
                </HashLinkContainer>
            </CardBody>
        </Card>
    );
}