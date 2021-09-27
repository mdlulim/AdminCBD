import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { HashLinkContainer } from 'components';
import DataTable from 'react-data-table-component';

// styles
const customStyles = {
   
    headCells: {
        style: {
            color: 'rgba(0,0,0,.54)',
            paddingLeft: '18px', // override the cell padding for head cells
            paddingRight: '18px',
        },
    },
    cells: {
        style: {
            paddingLeft: '18px', // override the cell padding for data cells
            paddingRight: '18px',
        },
    },
};

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

// table headings definition
const columns = [{
    name: '',
    sortable: false,
    width: '80px',
    cell: () => <Image />
}, {
    name: 'Full Names',
    selector: 'full_names',
    sortable: true,
    wrap: true,
}, {
    name: 'Username',
    selector: 'username',
    sortable: true,
},{
    name: 'Email Address',
    selector: 'email',
    sortable: true,
},{
    name: 'Date Created',
    selector: 'created',
    sortable: true,
}, {
    name: 'Status',
    selector: 'status',
    sortable: true,
    cell: row => <span>{row.status}</span>
}, {
    name: 'Actions',
    sortable: true,
    cell: () => <a href="/">Profile</a>
}];

const users = [{
    propertyId: '109977041',
    full_names: 'Mduduzi Mdluli',
    username: 'JSmith',
    email: 'example1@demo.com',
    country: 'South Africa',
    level: 'General',
    created: 'just now',
    status: 'Active',
}, {
    propertyId: '109977042',
    full_names: 'Msizi Mpanza',
    username: 'MsiziM',
    email: 'example2@demo.com',
    country: 'Namibia',
    level: 'Wealth Creator',
    created: '2 mins ago',
    status: 'Pending',
}, {
    propertyId: '109977043',
    full_names: 'Amanda Zungu',
    last_name: 'ZunguAmanda',
    username: 'McCallJ',
    email: 'example3@demo.com',
    country: 'South Africa',
    level: 'General',
    created: '5 mins ago',
    status: 'Blocked',
}];

export default function Users() {
    return (
        <Card className="o-hidden mb-4">
            <CardBody className="p-0">
                <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
                    <span>Latest Users</span>
                    <span className="flex-grow-1" />
                    <div>
                        <HashLinkContainer to="/users/add">
                            <button className="btn btn-secondary" type="button">
                                Add User
                            </button>
                        </HashLinkContainer>
                    </div>
                </div>
            </CardBody>
            <DataTable
                data={users}
                columns={columns}
                customStyles={customStyles}
                noHeader
                selectableRowsHighlight
                highlightOnHover
                pagination
            />
            <CardBody className="text-center border-top">
                <HashLinkContainer to="/users">
                    <a className="card-link font-weight-bold" href="/users">
                        More Users...
                    </a>
                </HashLinkContainer>
            </CardBody>
        </Card>
    );
}