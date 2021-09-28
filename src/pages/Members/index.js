import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Layout } from 'containers';
import { Members } from 'components';

const MembersList = props => {
	const breadcrumb = { heading: "CBI Members" };
	return (
		<Layout {...props} breadcrumb={breadcrumb}>
			<Row>
                <Col lg={3} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-primary o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Business-ManWoman" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">All Members</p>
                                <p className="text-primary text-24 line-height-1 mb-2">28</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={3} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-success o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Business-ManWoman" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Active Members</p>
                                <p className="text-success text-24 line-height-1 mb-2">7</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={3} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-warning o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Business-ManWoman" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Panding  Members</p>
                                <p className="text-warning text-24 line-height-1 mb-2">19</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={3} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-danger o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Business-ManWoman" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Blocked Members</p>
                                <p className="text-danger text-24 line-height-1 mb-2">2</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
			<Row className="mt-4">
				<Col lg={12} xl={12}>
				<Col md={12}>
                    <Members.Members />
                </Col>
				</Col>
			</Row>
		</Layout>
	);
};

export default MembersList;
