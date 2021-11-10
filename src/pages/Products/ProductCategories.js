import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import { Products } from 'components';

const ProductsCategories = props => {
	const breadcrumb = { heading: "Product Categories" };
	return (
		<AuthLayout {...props}
		breadcrumb={{ active: "Categories" }}
		pageHeading={{
			title: 'Categories List',
			caption: 'EXPLORE OVERVIEW CATEGORIES FOR CRYPTO BASED INNOVATION'
		}}>
			<Row className="mt-4">
				<Col lg={12} xl={12}>
				<Col md={12}>
                    <Products.Categories />
                </Col>
				</Col>
			</Row>
		</AuthLayout>
	);
};

export default ProductsCategories;
