import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Layout } from 'containers';
import { Products } from 'components';

const ProductAddNew = props => {
	const breadcrumb = { heading: "New Product" };
	return (
		<Layout {...props} breadcrumb={breadcrumb}>
			<Row className="mt-4">
				<Col lg={12} xl={12}>
				<Col md={12}>
                    <Products.ProductAddNew />
                </Col>
				</Col>
			</Row>
		</Layout>
	);
};

export default ProductAddNew;
