import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Layout } from 'containers';
import { Overview } from 'components';

export default function OverviewPage(props) {
    const breadcrumb = { heading: "Overview" };
    return (
        <Layout {...props} breadcrumb={breadcrumb}>
            <Row>
                <Col lg={4} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-primary o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Money" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Transactions</p>
                                <p className="text-primary text-24 line-height-1 mb-2">29</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={4} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-primary o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Business-ManWoman" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Members</p>
                                <p className="text-primary text-24 line-height-1 mb-2">48</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={4} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-primary o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Shopping-Bag" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Products</p>
                                <p className="text-primary text-24 line-height-1 mb-2">54</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col md={12}>
                    <Overview.Transactions />
                </Col>

                <Col md={12}>
                    <Overview.Users />
                </Col>

            </Row>
        </Layout>
    );
}
