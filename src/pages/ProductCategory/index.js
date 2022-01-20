import React, { useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import { ProductCategory } from 'components';

const ProductCategories = props => {
	const [pageLoading, setPageLoading] = useState(true);

	return (
		<AuthLayout {...props}
		loading={pageLoading}
		breadcrumb={{
			items: [{
				title: 'Dashboard',
				link: '/dashboard',
			}, {
				title: 'Products',
				link: '/products',
			}],
			active: "Categories"
		}}
		pageHeading={{
			title: 'Categories List',
			caption: 'EXPLORE OVERVIEW CATEGORIES FOR CRYPTO BASED INNOVATION'
		}}>
			<Row>
				<Col lg={12} xl={12}>
                    <ProductCategory.Categories
						pageLoading={pageLoading}
						setPageLoading={setPageLoading}
					/>
				</Col>
			</Row>
		</AuthLayout>
	);
};

export default ProductCategories;
