import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { FeatherIcon, HashLinkContainer, Properties } from 'components';

const Image = () => {
    return (
        <img
            alt=""
            height="32px"
            style={{ borderRadius: 4 }}
            width="32px"
            src="/images/property.jpeg"
        />
    );
};

// table headings definition
const columns = [{
    name: 'Thumb',
    sortable: false,
    width: '80px',
    cell: () => <Image />
}, {
    name: 'Description',
    selector: 'description',
    sortable: true,
    wrap: true,
}, {
    name: 'Listing #',
    selector: 'propertyId',
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
    propertyId: '109977042',
    description: '2 Bedroom Apartment',
    address: 'Unit 14, ABC Av. Durban 4001',
    price: 'R2 750 000',
    propertyType: 'Apartment',
    views: 323,
    mandateType: 'Rent'
}, {
    propertyId: '109977042',
    description: '2 Bedroom Apartment',
    address: 'Unit 14, ABC Av. Durban 4001',
    price: 'R2 750 000',
    propertyType: 'Apartment',
    views: 323,
    mandateType: 'Rent'
}, {
    propertyId: '109977042',
    description: '2 Bedroom Apartment',
    address: 'Unit 14, ABC Av. Durban 4001',
    price: 'R2 750 000',
    propertyType: 'Apartment',
    views: 323,
    mandateType: 'Rent'
}];

export default function OverviewProperties() {
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
            <Properties.Table
                data={properties}
                columns={columns}
            />
            <CardBody className="text-center border-top">
                <HashLinkContainer to="/properties">
                    <a className="card-link font-weight-bold" href="/properties">
                        More Properties...
                    </a>
                </HashLinkContainer>
            </CardBody>
        </Card>
    );
}