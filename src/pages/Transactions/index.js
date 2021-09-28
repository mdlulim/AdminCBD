import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Layout } from 'containers';
import { Transactions } from 'components';

const TransactionList = props => {
	const breadcrumb = { heading: "All Transactions" };
	return (
		<Layout {...props} breadcrumb={breadcrumb}>
			<Row>
                <Col lg={2} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-success o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Money" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Completed</p>
                                <p className="text-success text-24 line-height-1 mb-2">28</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={2} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-warning o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Money" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Pending</p>
                                <p className="text-warning text-24 line-height-1 mb-2">7</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={2} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-danger o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Money" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Failed</p>
                                <p className="text-danger text-24 line-height-1 mb-2">19</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={2} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-success o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Money" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Deposits</p>
                                <p className="text-success text-24 line-height-1 mb-2">2</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={2} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-danger o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Money" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">transfers</p>
                                <p className="text-danger text-24 line-height-1 mb-2">2</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={2} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-success o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Money" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">withdrawals</p>
                                <p className="text-success text-24 line-height-1 mb-2">2</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
			<Row className="mt-4">
				<Col lg={12} xl={12}>
				<Col md={12}>
                    <Transactions.Transactions />
                </Col>
				</Col>
			</Row>
		</Layout>
	);
};

export default TransactionList;
