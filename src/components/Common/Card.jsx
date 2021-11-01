import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';

export default function CommonCard(props) {
    return (
        <Card className="card-inner-container--up margin-bottom-20" id="dashboard-orders-card">
            <CardBody className="card-body">
                <div className="card-inner-container card-inner-container card-inner-container--light">
                    <div className="form-row">
                        <Col xs={8} md={6}>
                            <h4>Product performance</h4>
                            <p className="subtitle">Monthly by transactions</p>
                        </Col>
                        <Col xs={4} md={6}>
                            <div className="dropdown float-right">
                                <div className="rw-btn rw-btn--card rw-btn--lg" data-toggle="dropdown">
                                    <div>
                                    </div>
                                </div>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <a href="/" className="dropdown-item" data-demo-action="update">Update</a>
                                    <a href="/" className="dropdown-item" data-demo-action="expand">Expand</a>
                                    <a href="/" className="dropdown-item" data-demo-action="invert">Invert style</a>
                                    <div className="dropdown-divider"></div>
                                    <a href="/" className="dropdown-item" data-demo-action="remove">Remove card</a>
                                </div>
                            </div>
                            <button className="btn btn-light d-none d-md-block float-right margin-right-5" id="dashboard-rp-customrange">
                                September 22, 2021 - October 21, 2021
                            </button>
                        </Col>
                    </div>
                </div>
                <div id="dashboard-ec-line">
                    <canvas data-zr-dom-id="zr_0" width="555" height="350" />
                    05/18<br />
                    <span />
                    Sales: 58<br />
                    <span />
                    Processed orders: 52
                </div>
            </CardBody>
        </Card>
    );
}