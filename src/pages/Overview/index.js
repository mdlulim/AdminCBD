import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Layout } from 'containers';

export default function Overview(props) {
    const breadcrumb = { heading: "Overview" };
    return (
        <Layout {...props} breadcrumb={breadcrumb}>
            <Row>
                <Col lg={3} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-primary o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Building" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Properties</p>
                                <p className="text-primary text-24 line-height-1 mb-2">29</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={3} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-primary o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Add-User" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Leads</p>
                                <p className="text-primary text-24 line-height-1 mb-2">7</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={3} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-primary o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Business-ManWoman" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Agents</p>
                                <p className="text-primary text-24 line-height-1 mb-2">54</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={3} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-primary o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Check" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Deals</p>
                                <p className="text-primary text-24 line-height-1 mb-2">2</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Layout>
    );
}
