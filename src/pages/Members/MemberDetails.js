import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Layout } from 'containers';
import { MemberDetails } from 'components';

const MembersList = props => {
	const breadcrumb = { heading: "Members" };
	return (
		<Layout {...props} breadcrumb={breadcrumb}>
			<Row className="mt-4">
				<Col lg={12} xl={12}>
				<Col md={12}>
                    <Customers.CustomerDetails />
                </Col>
				</Col>
			</Row>
		</Layout>
	);
};

export default MembersList;
