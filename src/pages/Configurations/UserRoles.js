import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Layout } from 'containers';
import { Users } from 'components';

const UserRolesList = props => {
	const breadcrumb = { heading: "User Roles" };
	return (
		<Layout {...props} breadcrumb={breadcrumb}>
			<Row className="mt-4">
				<Col lg={8} xl={8}>
				<Col md={12}>
                    <Users.UserRoles />
                </Col>
				</Col>
			</Row>
		</Layout>
	);
};

export default UserRolesList;
