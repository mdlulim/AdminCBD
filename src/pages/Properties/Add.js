import React, { useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { HashLinkContainer } from 'components';
import { Layout } from 'containers';

export default function AddProperty(props) {
    const breadcrumb = { heading: "Add Property" };
    const [activeAccordion, setActiveAccordion] = useState('property details');
    return (
        <Layout {...props} breadcrumb={breadcrumb}>
            {/* <Row className="mb-4">
                <Col xs={12} lg={6} sm={12} />
                <Col xs={12} lg={6} sm={12} className="d-flex flex-column flex-sm-row align-items-center">
                    <span className="m-auto" />
                    <label>Actions:</label>
                    <div className="btn-group col-lg-6 col-sm-12 pl-sm-3" role="group">
                        <button className="btn btn-secondary" id="prev-btn" type="button">Import Property</button>
                        <button className="btn btn-primary" id="reset-btn" type="button">
                            Reset Form
                        </button>
                    </div>
                </Col>
            </Row> */}
            <Row>
                <Col md={12}>
                    <div id="smartwizard" className="sw-main sw-theme-dots">
                        <ul className="nav nav-tabs step-anchor">
                            <li className="nav-item active"><a href="#step-1" className="nav-link">Step 1<br /><small>Property Information</small></a></li>
                            <li className="nav-item"><a href="#step-2" className="nav-link">Step 2<br /><small>Marketing Information</small></a></li>
                            <li className="nav-item"><a href="#step-3" className="nav-link">Step 3<br /><small>Property Features</small></a></li>
                            <li className="nav-item"><a href="#step-4" className="nav-link">Step 4<br /><small>Sharing Inforation</small></a></li>
                        </ul>
                        <div className="sw-container tab-content p-0">
                            <div id="step-1" className="tab-pane step-content" style={{ display: 'block' }}>
                                <div className="accordion">
                                    <Card>
                                        <div role="tab" className="card-header">
                                            <h5 className="mb-0">
                                                <button
                                                    type="button"
                                                    className={`btn btn-link ${activeAccordion !== 'property details' ? 'collapsed' : ''}`}
                                                    aria-expanded={activeAccordion === 'property details'}
                                                    onClick={() => {
                                                        setActiveAccordion('property details');
                                                    }}
                                                >
                                                    Property Details
                                                </button>
                                            </h5>
                                        </div>
                                        <div
                                            className={`collapse ${activeAccordion === 'property details' ? 'show' : ''}`}
                                            role="tabpanel"
                                        >
                                            <CardBody>
                                                {/* <h4 className="border-bottom border-gray pb-2">Property Information</h4> */}
                                                <p>
                                                    Please use the form below to specify property details. Make sure all
                                                    required (<span className="text-danger">*</span>) fields are completed
                                                    accordingly.
                                                </p>
                                                <Row className="row-xs">
                                                    <Col xs={12} sm={6}>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="mandateType"
                                                            >
                                                                Mandate Type
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <Col sm={9}>
                                                                <select
                                                                    type="text"
                                                                    id="mandateType"
                                                                    className="form-control"
                                                                >
                                                                    <option value="Sale">Sale</option>
                                                                    <option value="Rent">Rent</option>
                                                                </select>
                                                            </Col>
                                                        </Row>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="branch"
                                                            >
                                                                Branch
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <Col sm={9}>
                                                                <select
                                                                    type="text"
                                                                    id="branch"
                                                                    className="form-control"
                                                                >
                                                                    <option value=""></option>
                                                                </select>
                                                            </Col>
                                                        </Row>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="propertyType"
                                                            >
                                                                Property Type
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <Col sm={9}>
                                                                <select
                                                                    type="text"
                                                                    id="propertyType"
                                                                    className="form-control"
                                                                >
                                                                    <option value="Flat/Apartment">Flat/Apartment</option>
                                                                    <option value="Farm">Farm</option>
                                                                    <option value="House">House</option>
                                                                    <option value="Commercial">Commercial</option>
                                                                    <option value="Townhouse">Townhouse</option>
                                                                    <option value="Vacant Land">Vacant Land</option>
                                                                </select>
                                                            </Col>
                                                        </Row>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="ownershipType"
                                                            >
                                                                Ownership Type
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <Col sm={9}>
                                                                <select
                                                                    type="text"
                                                                    id="ownershipType"
                                                                    className="form-control"
                                                                >
                                                                    <option value="Shareblock Company">Shareblock Company</option>
                                                                    <option value="Leasehold">Leasehold</option>
                                                                    <option value="Fractional Ownership">Fractional Ownership</option>
                                                                    <option value="Timeshare">Timeshare</option>
                                                                    <option value="Sectional Title">Sectional Title</option>
                                                                    <option value="Life right">Life right</option>
                                                                </select>
                                                            </Col>
                                                        </Row>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="erfSize"
                                                            >
                                                                Erf Size
                                                            </label>
                                                            <Col sm={9}>
                                                                <div className="input-group">
                                                                    <input
                                                                        type="text"
                                                                        id="erfSize"
                                                                        className="form-control"
                                                                    />
                                                                    <div
                                                                        className="input-group-append"
                                                                    >
                                                                        <span className="input-group-text">
                                                                            m<sup>2</sup>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="development"
                                                            >
                                                                Development
                                                            </label>
                                                            <Col sm={9}>
                                                                <select
                                                                    type="text"
                                                                    id="development"
                                                                    className="form-control"
                                                                >
                                                                    <option value=""></option>
                                                                </select>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col xs={12} sm={6}>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="address"
                                                            >
                                                                Address
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <Col sm={9}>
                                                                <input
                                                                    type="text"
                                                                    id="address"
                                                                    className="form-control"
                                                                />
                                                            </Col>
                                                        </Row>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="suburb"
                                                            >
                                                                Suburb
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <Col sm={9}>
                                                                <select
                                                                    type="text"
                                                                    id="suburb"
                                                                    className="form-control"
                                                                >
                                                                    <option value=""></option>
                                                                </select>
                                                            </Col>
                                                        </Row>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="city"
                                                            >
                                                                City
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <Col sm={9}>
                                                                <select
                                                                    type="text"
                                                                    id="city"
                                                                    className="form-control"
                                                                    disabled
                                                                >
                                                                    <option value=""></option>
                                                                </select>
                                                            </Col>
                                                        </Row>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="province"
                                                            >
                                                                Province
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <Col sm={9}>
                                                                <select
                                                                    type="text"
                                                                    id="province"
                                                                    className="form-control"
                                                                    disabled
                                                                >
                                                                    <option value=""></option>
                                                                </select>
                                                            </Col>
                                                        </Row>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="country"
                                                            >
                                                                Country
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <Col sm={9}>
                                                                <select
                                                                    type="text"
                                                                    id="country"
                                                                    className="form-control"
                                                                >
                                                                    <option value="South Africa">South Africa</option>
                                                                </select>
                                                            </Col>
                                                        </Row>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="postalCode"
                                                            >
                                                                Postal Code
                                                            </label>
                                                            <Col sm={9}>
                                                                <input
                                                                    type="text"
                                                                    id="postalCode"
                                                                    className="form-control"
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </div>
                                    </Card>
                                    <Card>
                                        <div role="tab" className="card-header">
                                            <h5 className="mb-0">
                                                <button
                                                    type="button"
                                                    className={`btn btn-link ${activeAccordion !== 'building' ? 'collapsed' : ''}`}
                                                    aria-expanded={activeAccordion === 'building'}
                                                    onClick={() => {
                                                        setActiveAccordion('building');
                                                    }}
                                                >
                                                    Building
                                                </button>
                                            </h5>
                                        </div>
                                        <div
                                            className={`collapse ${activeAccordion === 'building' ? 'show' : ''}`}
                                            role="tabpanel"
                                        >
                                            <CardBody>
                                                <p>
                                                    Please use the form below to specify building details. Make sure all
                                                    required (<span className="text-danger">*</span>) fields are completed
                                                    accordingly.
                                                </p>
                                                <Row className="row-xs">
                                                    <Col xs={12} sm={6}>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="floorSize"
                                                            >
                                                                Floor Size
                                                            </label>
                                                            <Col sm={9}>
                                                                <div className="input-group">
                                                                    <input
                                                                        type="text"
                                                                        id="floorSize"
                                                                        className="form-control"
                                                                    />
                                                                    <div
                                                                        className="input-group-append"
                                                                    >
                                                                        <span className="input-group-text">
                                                                            m<sup>2</sup>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="buildingCoverage"
                                                            >
                                                                Building Coverage
                                                            </label>
                                                            <Col sm={9}>
                                                                <div className="input-group">
                                                                    <input
                                                                        type="text"
                                                                        id="buildingCoverage"
                                                                        className="form-control"
                                                                    />
                                                                    <div
                                                                        className="input-group-append"
                                                                    >
                                                                        <span className="input-group-text">
                                                                            %
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="sizeOfOutBuilding"
                                                            >
                                                                Size of Outbuilding
                                                            </label>
                                                            <Col sm={9}>
                                                                <div className="input-group">
                                                                    <input
                                                                        type="text"
                                                                        id="sizeOfOutBuilding"
                                                                        className="form-control"
                                                                    />
                                                                    <div
                                                                        className="input-group-append"
                                                                    >
                                                                        <span className="input-group-text">
                                                                            m<sup>2</sup>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="restant"
                                                            >
                                                                Restant
                                                            </label>
                                                            <Col sm={9}>
                                                                <input
                                                                    type="text"
                                                                    id="restant"
                                                                    className="form-control"
                                                                />
                                                            </Col>
                                                        </Row>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="alienationOfLandIsComplete"
                                                            >
                                                                Alienation of Land is Complete
                                                            </label>
                                                            <Col sm={9}>
                                                                <select
                                                                    type="text"
                                                                    id="alienationOfLandIsComplete"
                                                                    className="form-control"
                                                                >
                                                                    <option value="Yes">Yes</option>
                                                                    <option value="No">No</option>
                                                                </select>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col xs={12} sm={6}>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="options"
                                                            >
                                                                Options
                                                            </label>
                                                            <Col sm={9}>
                                                                <div className="input-group">
                                                                    <input
                                                                        type="text"
                                                                        id="options"
                                                                        className="form-control"
                                                                    />
                                                                    <div
                                                                        className="input-group-append"
                                                                    >
                                                                        <span className="input-group-text">
                                                                            ...
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="constructionYear"
                                                            >
                                                                Construction Year
                                                            </label>
                                                            <Col sm={9}>
                                                                <input
                                                                    type="text"
                                                                    id="constructionYear"
                                                                    className="form-control"
                                                                />
                                                            </Col>
                                                        </Row>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="heightRestriction"
                                                            >
                                                                Height Restriction
                                                            </label>
                                                            <Col sm={9}>
                                                                <input
                                                                    type="text"
                                                                    id="heightRestriction"
                                                                    className="form-control"
                                                                />
                                                            </Col>
                                                        </Row>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="petsAllowed"
                                                            >
                                                                Pets Allowed
                                                            </label>
                                                            <Col sm={9}>
                                                                <select
                                                                    type="text"
                                                                    id="petsAllowed"
                                                                    className="form-control"
                                                                >
                                                                    <option value="Yes">Yes</option>
                                                                    <option value="No">No</option>
                                                                </select>
                                                            </Col>
                                                        </Row>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="furnished"
                                                            >
                                                                Furnished
                                                            </label>
                                                            <Col sm={9}>
                                                                <select
                                                                    type="text"
                                                                    id="furnished"
                                                                    className="form-control"
                                                                >
                                                                    <option value="Yes">Yes</option>
                                                                    <option value="No">No</option>
                                                                </select>
                                                            </Col>
                                                        </Row>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="standaloneBuilding"
                                                            >
                                                                Standalone Building
                                                            </label>
                                                            <Col sm={9}>
                                                                <select
                                                                    type="text"
                                                                    id="standaloneBuilding"
                                                                    className="form-control"
                                                                >
                                                                    <option value="Yes">Yes</option>
                                                                    <option value="No">No</option>
                                                                </select>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </div>
                                    </Card>
                                    <Card>
                                        <div role="tab" className="card-header">
                                            <h5 className="mb-0">
                                                <button
                                                    type="button"
                                                    className={`btn btn-link ${activeAccordion !== 'mandate details' ? 'collapsed' : ''}`}
                                                    aria-expanded={activeAccordion === 'mandate details'}
                                                    onClick={() => {
                                                        setActiveAccordion('mandate details');
                                                    }}
                                                >
                                                    Mandate Details
                                                </button>
                                            </h5>
                                        </div>
                                        <div
                                            className={`collapse ${activeAccordion === 'mandate details' ? 'show' : ''}`}
                                            role="tabpanel"
                                        >
                                            <CardBody>
                                                <p>
                                                    Please use the form below to specify mandate details. Make sure all
                                                    required (<span className="text-danger">*</span>) fields are completed
                                                    accordingly.
                                                </p>
                                                <Row className="row-xs">
                                                    <Col xs={12} sm={6}>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="mandateSignedDate"
                                                            >
                                                                Mandate Signed Date
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <Col sm={9}>
                                                                <div className="input-group">
                                                                    <input
                                                                        type="text"
                                                                        id="mandateSignedDate"
                                                                        className="form-control"
                                                                    />
                                                                    <div
                                                                        className="input-group-append"
                                                                    >
                                                                        <span className="input-group-text">
                                                                            <i className="icon-regular i-Calendar-4" />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="mandateExpiryDate"
                                                            >
                                                                Mandate Expiry Date
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <Col sm={9}>
                                                                <div className="input-group">
                                                                    <input
                                                                        type="text"
                                                                        id="mandateExpiryDate"
                                                                        className="form-control"
                                                                    />
                                                                    <div
                                                                        className="input-group-append"
                                                                    >
                                                                        <span className="input-group-text">
                                                                            <i className="icon-regular i-Calendar-4" />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="occupationDate"
                                                            >
                                                                Occupation Date
                                                            </label>
                                                            <Col sm={9}>
                                                                <div className="input-group">
                                                                    <input
                                                                        type="text"
                                                                        id="occupationDate"
                                                                        className="form-control"
                                                                    />
                                                                    <div
                                                                        className="input-group-append"
                                                                    >
                                                                        <span className="input-group-text">
                                                                            <i className="icon-regular i-Calendar-4" />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col xs={12} sm={6}>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="source"
                                                            >
                                                                Source
                                                            </label>
                                                            <Col sm={9}>
                                                                <select
                                                                    type="text"
                                                                    id="source"
                                                                    className="form-control"
                                                                >
                                                                    <option value="Bank Repossession">Bank Repossession</option>
                                                                    <option value="Canvassing">Canvassing</option>
                                                                    <option value="Development">Development</option>
                                                                    <option value="Exhibitiond">Exhibitiond</option>
                                                                    <option value="Multi Listing Network">Multi Listing Network</option>
                                                                    <option value="Personal Contact">Personal Contact</option>
                                                                    <option value="Phone In">Phone In</option>
                                                                    <option value="Previous Client">Previous Client</option>
                                                                    <option value="Print Media">Print Media</option>
                                                                    <option value="Referral">Referral</option>
                                                                    <option value="Show Day">Show Day</option>
                                                                    <option value="Signage">Signage</option>
                                                                    <option value="Social">Social</option>
                                                                    <option value="Targeted Campaign">Targeted Campaign</option>
                                                                    <option value="Walk In">Walk In</option>
                                                                    <option value="Website Enquiry">Website Enquiry</option>
                                                                    <option value="Window Display">Window Display</option>
                                                                    <option value="Other">Other</option>
                                                                </select>
                                                            </Col>
                                                        </Row>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="sourceDetails"
                                                            >
                                                                Source Details
                                                            </label>
                                                            <Col sm={9}>
                                                                <select
                                                                    type="text"
                                                                    id="sourceDetails"
                                                                    className="form-control"
                                                                >
                                                                    <option value=""></option>
                                                                </select>
                                                            </Col>
                                                        </Row>
                                                        <Row className="form-group">
                                                            <label
                                                                className="col-sm-3 col-form-label"
                                                                htmlFor="mandateAgreement"
                                                            >
                                                                Mandate Agreement
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <Col sm={9}>
                                                                <select
                                                                    type="text"
                                                                    id="mandateAgreement"
                                                                    className="form-control"
                                                                >
                                                                    <option value="Sole">Sole</option>
                                                                    <option value="Open">Open</option>
                                                                    <option value="Dual/Joint">Dual/Joint</option>
                                                                    <option value="3rd Party">3rd Party</option>
                                                                </select>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </div>
                                    </Card>
                                    <Card>
                                        <div role="tab" className="card-header">
                                            <h5 className="mb-0">
                                                <button
                                                    type="button"
                                                    className={`btn btn-link ${activeAccordion !== 'contacts' ? 'collapsed' : ''}`}
                                                    aria-expanded={activeAccordion === 'contacts'}
                                                    onClick={() => {
                                                        setActiveAccordion('contacts');
                                                    }}
                                                >
                                                    Contacts
                                                </button>
                                            </h5>
                                        </div>
                                        <div
                                            className={`collapse ${activeAccordion === 'contacts' ? 'show' : ''}`}
                                            role="tabpanel"
                                        >
                                            <CardBody>
                                                <p>
                                                    Please use the form below to specify contact information. Make sure all
                                                    required (<span className="text-danger">*</span>) fields are completed
                                                    accordingly.
                                                </p>
                                                <Row>
                                                    <Col md={4} className="form-group mb-2">
                                                        <label
                                                            htmlFor="contactName"
                                                        >
                                                            Full Name
                                                            <span className="text-danger">*</span>
                                                        </label>
                                                        <select
                                                            type="text"
                                                            id="contactName"
                                                            className="form-control"
                                                        >
                                                            <option value=""></option>
                                                        </select>
                                                    </Col>
                                                    <Col md={2} className="form-group mb-2">
                                                        <label
                                                            htmlFor="contactRole"
                                                        >
                                                            Role
                                                        </label>
                                                        <select
                                                            type="text"
                                                            id="contactRole"
                                                            className="form-control"
                                                        >
                                                            <option value="Seller">Seller</option>
                                                            <option value="Tenant">Tenant</option>
                                                            <option value="Contact">Contact</option>
                                                            <option value="Managing Agent">Managing Agent</option>
                                                            <option value="Representative of Body Corporate">Representative of Body Corporate</option>
                                                            <option value="Representative of Legal Entity">Representative of Legal Entity</option>
                                                            <option value="Representative of Owners Assoc">Representative of Owners Assoc</option>
                                                        </select>
                                                    </Col>
                                                    <Col md={3} className="form-group mb-2">
                                                        <label
                                                            htmlFor="contactEmail"
                                                        >
                                                            Email Address
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="contactEmail"
                                                            className="form-control"
                                                            disabled
                                                        />
                                                    </Col>
                                                    <Col md={3} className="form-group mb-2">
                                                        <label
                                                            htmlFor="contactMobile"
                                                        >
                                                            Mobile Number
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="contactMobile"
                                                            className="form-control"
                                                            disabled
                                                        />
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </div>
                                    </Card>
                                    <Card>
                                        <div role="tab" className="card-header">
                                            <h5 className="mb-0">
                                                <button
                                                    type="button"
                                                    className={`btn btn-link ${activeAccordion !== 'listing agents' ? 'collapsed' : ''}`}
                                                    aria-expanded={activeAccordion === 'listing agents'}
                                                    onClick={() => {
                                                        setActiveAccordion('listing agents');
                                                    }}
                                                >
                                                    Listing Agents
                                                </button>
                                            </h5>
                                        </div>
                                        <div
                                            className={`collapse ${activeAccordion === 'listing agents' ? 'show' : ''}`}
                                            role="tabpanel"
                                        >
                                            <CardBody>
                                                <Row>
                                                    <Col md={4} className="form-group mb-2">
                                                        <label
                                                            htmlFor="agentName"
                                                        >
                                                            Full Name
                                                            <span className="text-danger">*</span>
                                                        </label>
                                                        <select
                                                            type="text"
                                                            id="agentName"
                                                            className="form-control"
                                                        >
                                                            <option value=""></option>
                                                        </select>
                                                    </Col>
                                                    <Col md={4} className="form-group mb-2">
                                                        <label
                                                            htmlFor="agentEmail"
                                                        >
                                                            Email Address
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="agentEmail"
                                                            className="form-control"
                                                            disabled
                                                        />
                                                    </Col>
                                                    <Col md={4} className="form-group mb-2">
                                                        <label
                                                            htmlFor="agentMobile"
                                                        >
                                                            Mobile Number
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="agentMobile"
                                                            className="form-control"
                                                            disabled
                                                        />
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                            <div id="step-2" className="tab-pane step-content" style={{ display: 'none' }}>
                                <h3 className="border-bottom border-gray pb-2">Step 2 Content</h3>
                                <div>Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been the industry's standard dummy text
                                    ever since the 1500s, when an unknown printer took a galley of type
                                    and scrambled it to make a type specimen book. It has survived not
                                    only five centuries, but also the leap into electronic typesetting,
                                    remaining essentially unchanged. It was popularised in the 1960s
                                    with the release of Letraset sheets containing Lorem Ipsum passages,
                                    and more recently with desktop publishing software like Aldus
                                    PageMaker including versions of Lorem Ipsum.
                                </div>
                            </div>
                            <div id="step-3" className="tab-pane step-content" style={{ display: 'none' }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the
                                1500s, when an unknown printer took a galley of type and scrambled it to
                                make a type specimen book. It has survived not only five centuries, but
                                also the leap into electronic typesetting, remaining essentially
                                unchanged. It was popularised in the 1960s with the release of Letraset
                                sheets containing Lorem Ipsum passages, and more recently with desktop
                                publishing software like Aldus PageMaker including versions of Lorem
                                Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industry's standard dummy text ever
                                since the 1500s, when an unknown printer took a galley of type and
                                scrambled it to make a type specimen book. It has survived not only
                                five centuries, but also the leap into electronic typesetting,
                                remaining essentially unchanged. It was popularised in the 1960s with
                                the release of Letraset sheets containing Lorem Ipsum passages, and
                                more recently with desktop publishing software like Aldus PageMaker
                                including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of
                                the printing and typesetting industry. Lorem Ipsum has been the industry's
                                standard dummy text ever since the 1500s, when an unknown printer took
                                a galley of type and scrambled it to make a type specimen book. It has
                                survived not only five centuries, but also the leap into electronic
                                typesetting, remaining essentially unchanged. It was popularised in the
                                1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                                and more recently with desktop publishing software like Aldus PageMaker
                                including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of
                                the printing and typesetting industry. Lorem Ipsum has been the industry's
                                standard dummy text ever since the 1500s, when an unknown printer took a
                                galley of type and scrambled it to make a type specimen book.
                            </div>
                            <div id="step-4" className="tab-pane step-content" style={{ display: 'none' }}>
                                <h3 className="border-bottom border-gray pb-2">Step 4 Content</h3>
                                <div className="card o-hidden">
                                    <div className="card-header">My Details</div>
                                    <div className="card-block p-0">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <th>Name:</th>
                                                    <td>Tim Smith</td>
                                                </tr>
                                                <tr>
                                                    <th>Email:</th>
                                                    <td>example@example.com</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btn-toolbar sw-toolbar sw-toolbar-bottom justify-content-end py-3">
                            <div className="btn-group sw-btn-group" role="group">
                                <button className="btn btn-secondary sw-btn-prev disabled" type="button">Previous</button>
                                <button className="btn btn-secondary sw-btn-next" type="button">Next</button>
                            </div>
                            {/* <div className="btn-group mr-2 sw-btn-group-extra" role="group">
                                <button className="btn btn-info">Finish</button>
                                <button className="btn btn-danger">Cancel</button>
                            </div> */}
                        </div>
                    </div>
                </Col>
            </Row>
        </Layout>
    );
}
