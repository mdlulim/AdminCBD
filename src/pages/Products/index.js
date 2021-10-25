import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import { Products } from 'components';

const ProductsList = props => {
	const breadcrumb = { heading: "Products" };
	return (
		<AuthLayout {...props} breadcrumb={breadcrumb}>
			<Row className="mt-4">
				<Col lg={12} xl={12}>
				<Col md={12}>
                    <Products.Products />
                </Col>
				</Col>
			</Row>
		</AuthLayout>
	);
};

export default ProductsList;
