import React, { useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Layout } from 'containers';
import { HashLinkContainer } from 'components';

export default function LeadsOverview(props) {
    const breadcrumb = { heading: 'Manage Leads' };
    return (
        <Layout {...props} breadcrumb={breadcrumb}>
            <Row className="mb-4">
                <Col xs={12} lg={3} sm={12}>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="filter">Filter</label>
                            <select
                                id="filter"
                                defaultValue="Incoming"
                                className="custom-select col-sm-12"
                            >
                                <option value="All">All</option>
                                <option value="Incoming">Incoming</option>
                                <option value="Processed">Processed</option>
                                <option value="Ignored">Ignored</option>
                            </select>
                        </div>
                    </div>
                </Col>
                <Col xs={12} lg={4} sm={12} className="d-flex align-items-center">
                    <div className="defect-search-bar">
                        <input type="text" placeholder="Search" />
                        <i className="search-icon text-muted i-Magnifi-Glass1" />
                    </div>
                </Col>
                <Col xs={12} lg={5} sm={12} className="d-flex flex-column flex-sm-row align-items-center">
                    <span className="m-auto" />
                    <label>Download:</label>
                    <div className="btn-group col-lg-3 col-sm-12 pl-sm-3" role="group">
                        <HashLinkContainer to="/leads/add">
                            <button className="btn btn-secondary" id="prev-btn" type="button">PDF</button>
                        </HashLinkContainer>
                        <button className="btn btn-secondary" id="next-btn" type="button">CSV</button>
                    </div>
                </Col>
            </Row>
            <Card>
                <CardBody>
                    <div className="ul-widget-body">
                        <div className="ul-widget3">
                            <div className="ul-widget6__item--table">
                                <table className="table">
                                    <thead>
                                        <tr className="ul-widget6__tr--sticky-th">
                                            <th scope="col"></th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Contact Number</th>
                                            <th scope="col">Email Address</th>
                                            <th scope="col"># Leads</th>
                                            <th scope="col">Mandate Type</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">
                                                <label className="checkbox checkbox-outline-info">
                                                    <input type="checkbox" defaultChecked /><span className="checkmark"></span>
                                                </label>
                                            </th>
                                            <td>
                                                23.07.2021
                                            </td>
                                            <td>
                                                <a className="ul-widget4__title d-block" href="/">John Sibiya</a>
                                                {/* <span>Angular 2,Vue.js </span> */}
                                            </td>
                                            <td>076 123 8765</td>
                                            <td>
                                                john@abcproperties.co.za
                                            </td>
                                            <td>1</td>
                                            <td><span className="badge badge-pill badge-outline-danger p-2 m-1">Sale</span></td>
                                            <td>
                                                <button className="btn bg-white _r_btn border-0" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span className="_dot _inline-dot bg-primary"></span>
                                                    <span className="_dot _inline-dot bg-primary"></span>
                                                    <span className="_dot _inline-dot bg-primary"></span>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                <label className="checkbox checkbox-outline-info">
                                                    <input type="checkbox" defaultChecked /><span className="checkmark"></span>
                                                </label>
                                            </th>
                                            <td>
                                                23.07.2021
                                            </td>
                                            <td>
                                                <a className="ul-widget4__title d-block" href="/">Xolo Mnguni</a>
                                                {/* <span>Angular 2,Vue.js </span> */}
                                            </td>
                                            <td>076 123 8765</td>
                                            <td>
                                                xolom@justprop.co.za
                                            </td>
                                            <td>3</td>
                                            <td><span className="badge badge-pill badge-outline-primary p-2 m-1">Rent</span></td>
                                            <td>
                                                <button className="btn bg-white _r_btn border-0" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span className="_dot _inline-dot bg-primary"></span>
                                                    <span className="_dot _inline-dot bg-primary"></span>
                                                    <span className="_dot _inline-dot bg-primary"></span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Layout>
    );
}
