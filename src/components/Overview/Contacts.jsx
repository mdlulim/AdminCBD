import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { HashLinkContainer } from 'components';
import DataTable from 'react-data-table-component';

// styles
const customStyles = {
    rows: {
        style: {
            minHeight: '72px', // override the row height
        }
    },
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


// table headings definition
const columns = [{
    name: 'Contact ID',
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
    name: 'Profile',
    selector: 'profile',
    sortable: true,
}];

const contacts = [{
    id: '12211',
    name: 'John Doe',
    email: 'johndoe@demo.com',
    mobileNumber: '0811231231',
    profile: 'Buyer, Owner',
}];

export default function Contacts() {
    return (
        <Card className="o-hidden mb-4">
            <CardBody className="p-0">
                <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
                    <span>Latest Contacts</span>
                    <span className="flex-grow-1" />
                    <div>
                        <HashLinkContainer to="/contacts/add">
                            <button className="btn btn-secondary" type="button">
                                Add Contact
                            </button>
                        </HashLinkContainer>
                    </div>
                </div>
            </CardBody>
            <DataTable
                data={contacts}
                columns={columns}
                customStyles={customStyles}
                noHeader
                selectableRowsHighlight
                highlightOnHover
                pagination
            />
            <CardBody className="text-center border-top">
                <HashLinkContainer to="/contacts">
                    <a className="card-link font-weight-bold" href="/contacts">
                        More Contacts...
                    </a>
                </HashLinkContainer>
            </CardBody>
        </Card>
    );
}