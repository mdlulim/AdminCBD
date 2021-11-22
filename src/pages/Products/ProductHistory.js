import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import { Products } from 'components';

const ProductHistory = props => {
	const breadcrumb = { heading: "Products History" };
	return (
		<AuthLayout {...props}
		breadcrumb={{ active: "Products History" }}
		pageHeading={{
			title: 'Products History',
			caption: 'EXPLORE OVERVIEW PRODUCT HISTORY FOR CRYPTO BASED INNOVATION'
		}}>
			<Row className="mt-4">
				<Col lg={12} xl={12}>
				<Col md={12}>
                    <Products.ProductHistory />
                </Col>
				</Col>
			</Row>
		</AuthLayout>
	);
};

export default ProductHistory;
