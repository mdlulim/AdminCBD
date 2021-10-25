import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import { Products } from 'components';

const ProductAddNew = props => {
	const breadcrumb = { heading: "New Product" };
	return (
		<AuthLayout {...props} breadcrumb={breadcrumb}>
			<Row className="mt-4">
				<Col lg={12} xl={12}>
				<Col md={12}>
                    <Products.ProductAddNew />
                </Col>
				</Col>
			</Row>
		</AuthLayout>
	);
};

export default ProductAddNew;
