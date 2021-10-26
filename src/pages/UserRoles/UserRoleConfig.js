import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Layout } from 'containers';
import { UserRoles } from 'components';

const UserRoleConfig = props => {
	const breadcrumb = { heading: "User Roles" };
	return (
		<Layout {...props} breadcrumb={breadcrumb}>
			<Row className="mt-4">
				<Col lg={10} xl={10}>
				<Col md={12}>
                    <UserRoles.SetUserRoles />
                </Col>
				</Col>
			</Row>
		</Layout>
	);
};

export default UserRoleConfig;
