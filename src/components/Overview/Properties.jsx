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
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
        },
    },
};


// table headings definition
const columns = [{
    name: 'Thumb',
    sortable: false,
}, {
    name: 'Property ID',
    selector: 'id',
    sortable: true,
}, {
    name: 'Address',
    selector: 'address',
    sortable: true,
}, {
    name: 'Price',
    selector: 'price',
    sortable: true,
}, {
    name: 'Views',
    selector: 'views',
    sortable: true,
}, {
    name: 'Property Type',
    selector: 'propertyType',
    sortable: true,
}, {
    name: 'Mandate Type',
    selector: 'mandateType',
    sortable: true,
}];

const properties = [{
    id: '12211',
    address: 'dsfsdfs',
    price: 5000,
    propertyType: 'House',
    views: 323,
    mandateType: 'Rent'
}];

export default function Properties() {
    return (
        <Card className="o-hidden mb-4">
            <CardBody className="p-0">
                <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
                    <span>Latest Properties</span>
                    <span className="flex-grow-1" />
                    <div>
                        <HashLinkContainer to="/properties/add">
                            <button className="btn btn-secondary" type="button">
                                Add Property
                            </button>
                        </HashLinkContainer>
                    </div>
                </div>
            </CardBody>
            <DataTable
                data={properties}
                columns={columns}
                customStyles={customStyles}
                noHeader
                selectableRowsHighlight
                highlightOnHover
                pagination
            // progressPending={resultsLoading}
            // paginationRowsPerPageOptions={perpageOptions}
            />
        </Card>
    );
}