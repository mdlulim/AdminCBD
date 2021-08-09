import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';

export default function Item(props) {
    return (
        <div className="list-item pending col-md-12 p-0 mb-4">
            <Card>
                <Row>
                    <Col xs={12} md={2}>
                        <CardBody>
                            <p className="mb-0"><strong>ABC Properties</strong></p>
                            <span>41730032</span>
                        </CardBody>
                    </Col>
                    <Col xs={12} md={10}>
                        <CardBody>
                            <Row>
                                <Col sm={3}>
                                    <CardBody>
                                        <p className="mb-0"><strong>Listing #</strong></p>
                                        <span>109977042</span>
                                    </CardBody>
                                </Col>
                                <Col sm={3}>
                                    <CardBody>
                                        <p className="mb-0"><strong>Owner</strong></p>
                                        <span>John Doe</span>
                                    </CardBody>
                                </Col>
                                <Col sm={3}>
                                    <CardBody>
                                        <p className="mb-0"><strong>Price</strong></p>
                                        <span>R2 750 000</span>
                                    </CardBody>
                                </Col>
                                <Col sm={3}>
                                    <CardBody>
                                        <select className="form-control form-control-rounded">
                                            <optgroup label="Active">
                                                <option value="Published">Published</option>
                                            </optgroup>
                                            <optgroup label="In Progress">
                                                <option value="In Draft">In Draft</option>
                                                <option value="In Review">In Review</option>
                                            </optgroup>
                                            <optgroup label="Deleted">
                                                <option value="Archived">Archived</option>
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
                                        <p className="mb-0"><strong>Addres</strong></p>
                                        <span>Unit 14, ABC Av. Durban 4001</span>
                                    </CardBody>
                                </Col>
                                <Col sm={3}>
                                    <CardBody>
                                        <p className="mb-0"><strong>Branch Name</strong></p>
                                        <span>Africa Properties</span>
                                    </CardBody>
                                </Col>
                                <Col sm={3}>
                                    <CardBody>
                                        <p className="mb-0"><strong>Date Updated</strong></p>
                                        <span>23.07.2021</span>
                                    </CardBody>
                                </Col>
                                <Col sm={3}>
                                    <CardBody>
                                        <p className="mb-0"><strong>Status</strong></p>
                                        <span>On Market</span>
                                    </CardBody>
                                </Col>
                            </Row>
                        </CardBody>
                    </Col>
                </Row>
            </Card>
        </div>
    );

}