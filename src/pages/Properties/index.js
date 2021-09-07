import React, { useState } from 'react';
import { Card, Col, Row } from 'reactstrap';
import { HashLinkContainer, Properties } from 'components';
import { Layout } from 'containers';

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

const Actions = () => {
    return (
        <button
            className="btn btn-outline-secondary mt-3 mb-3 m-sm-0 btn-sm btn-rounded"
        >
            View details
        </button>
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
}, {
    name: 'Action',
    sortable: false,
    cell: () => <Actions />
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

export default function PropertiesOverview(props) {
    const breadcrumb = { heading: 'Manage Properties' };
    const [itemDropdownActive, setItemDropdownActive] = useState(null);
    const [view, setView] = useState('card');
    return (
        <Layout {...props} breadcrumb={breadcrumb}>
            <Row className="mb-4">
                <Col xs={12} lg={3} sm={12}>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="filter">Filter</label>
                            <select className="custom-select col-sm-12" id="filter">
                                <option value="All">All</option>
                                <option value="Draft">Draft</option>
                                <option value="Published">Published</option>
                                <option value="Archived">Archived</option>
                            </select>
                        </div>
                    </div>
                </Col>
                <Col xs={12} lg={4} sm={12} className="d-flex align-items-center">
                    <div className="search-bar">
                        <input placeholder="Search" type="text" />
                        <i className="search-icon text-muted i-Magnifi-Glass1" />
                    </div>
                </Col>
                <Col xs={12} lg={5} sm={12} className="d-flex flex-column flex-sm-row align-items-center">
                    <span className="m-auto" />
                    <label>Actions:</label>
                    <div className="btn-group col-lg-6 col-sm-12 pl-sm-3" role="group">
                        <HashLinkContainer to="/properties/add">
                            <button className="btn btn-secondary" id="prev-btn" type="button">Add Property</button>
                        </HashLinkContainer>
                        <button className="btn btn-secondary" id="next-btn" type="button">Download CSV</button>
                    </div>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col xs={6}>
                    <button
                        type="button"
                        onClick={() => setView('card')}
                        className={`btn btn-sm btn-rounded btn-outline-secondary btn-svg mr-2 ${view === 'card' ? 'active' : ''}`}
                    >
                        &nbsp;&nbsp;Card view&nbsp;&nbsp;
                    </button>
                    <button
                        type="button"
                        onClick={() => setView('list')}
                        className={`btn btn-sm btn-rounded btn-outline-secondary btn-svg ${view === 'list' ? 'active' : ''}`}
                    >
                        &nbsp;&nbsp;Table view&nbsp;&nbsp;
                    </button>
                </Col>
            </Row>
            <div className="search-results list-horizontal">
                {view === 'card' &&
                <>
                    <Properties.CardItem
                        {...{ id: '1' }}
                        dropdownActive={itemDropdownActive}
                        setDropdownActive={setItemDropdownActive}
                    />
                    <Properties.CardItem
                        {...{ id: '2' }}
                        dropdownActive={itemDropdownActive}
                        setDropdownActive={setItemDropdownActive}
                    />
                    <Properties.CardItem
                        {...{ id: '3' }}
                        dropdownActive={itemDropdownActive}
                        setDropdownActive={setItemDropdownActive}
                    />
                </>}
                {view === 'list' &&
                <Card className="o-hidden mb-4">
                    <Properties.Table
                        data={properties}
                        columns={columns}
                    />
                </Card>}
            </div>
        </Layout>
    );
};
