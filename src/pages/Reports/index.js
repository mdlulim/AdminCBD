import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Layout } from 'containers';
import { HashLinkContainer } from 'components';

export default function Sites(props) {
    const breadcrumb = { heading: "Sites" };
	return (
		<Layout {...props} breadcrumb={breadcrumb}>
            <Row className="mb-4">
                <Col xs={12} lg={3} sm={12}>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="filter">Filter</label>
                            <select className="custom-select col-sm-12" id="filter">
                                <option value="All">All</option>
                                <option value="Active">Active</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Ready for Deployment">Ready for Deployment</option>
                                <option value="Suspended">Suspended</option>
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
                    <label>Action:</label>
                    <div className="btn-group col-lg-3 col-sm-12 pl-sm-3" role="group">
                        <HashLinkContainer to="/sites/create">
                            <button className="btn btn-secondary" id="prev-btn" type="button">Create</button>
                        </HashLinkContainer>
                        <button className="btn btn-secondary" id="next-btn" type="button">CSV</button>
                    </div>
                </Col>
            </Row>
			<Row>
                <Col lg={3} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-primary o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Clock" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Active</p>
                                <p className="text-primary text-24 line-height-1 mb-2">29</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={3} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-primary o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Refresh" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">In Progress</p>
                                <p className="text-primary text-24 line-height-1 mb-2">7</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={3} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-primary o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Check" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Ready</p>
                                <p className="text-primary text-24 line-height-1 mb-2">54</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={3} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-primary o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Close" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Suspended</p>
                                <p className="text-primary text-24 line-height-1 mb-2">2</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <div className="search-results list-horizontal">
                <div className="list-item pending col-md-12 p-0">
                    <Card>
                        <Row>
                            <Col xs={12} md={2}>
                                <CardBody>
                                    <p className="mb-0"><strong>ABC Properties</strong></p>
                                    <span>abcproperty.co.za</span>
                                </CardBody>
                            </Col>
                            <Col xs={12} md={10}>
                                <CardBody>
                                    <Row>
                                        <Col sm={3}>
                                            <CardBody>
                                                <p className="mb-0"><strong>Account Name</strong></p>
                                                <span>ABC Property Group</span>
                                            </CardBody>
                                        </Col>
                                        <Col sm={3}>
                                            <CardBody>
                                                <p className="mb-0"><strong>Template</strong></p>
                                                <span>Default</span>
                                            </CardBody>
                                        </Col>
                                        <Col sm={3}>
                                            <CardBody>
                                                <p className="mb-0"><strong>Contact</strong></p>
                                                <span>Sabelo Mchunu</span>
                                            </CardBody>
                                        </Col>
                                        <Col sm={3}>
                                            <CardBody>
                                                <select className="form-control form-control-rounded">
                                                    <optgroup label="Active">
                                                        <option value="Active">Active</option>
                                                    </optgroup>
                                                    <optgroup label="In Progress">
                                                        <option value="In Progress">In Progress</option>
                                                        <option value="Ready for Deployment">Ready for Deployment</option>
                                                    </optgroup>
                                                    <optgroup label="Cancelled">
                                                        <option value="Suspended">Suspended</option>
                                                    </optgroup>
                                                </select>
                                            </CardBody>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <div className="border-top" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={3}>
                                            <CardBody>
                                                <p className="mb-0"><strong>Created Date</strong></p>
                                                <span>23.07.2021</span>
                                            </CardBody>
                                        </Col>
                                        <Col sm={3}>
                                            <CardBody>
                                                <p className="mb-0"><strong>Deployment Date</strong></p>
                                                <span>26.07.2021</span>
                                            </CardBody>
                                        </Col>
                                        <Col sm={3}>
                                            <CardBody>
                                                <p className="mb-0"><strong>Health</strong></p>
                                                <span>Normal</span>
                                            </CardBody>
                                        </Col>
                                        <Col sm={3}>
                                            <CardBody>
                                                <p className="mb-0"><strong>Version</strong></p>
                                                <span>1.0</span>
                                            </CardBody>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
		</Layout>
	);
}
