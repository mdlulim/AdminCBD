import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import { Products } from 'components';


const ProductCancel = props => {
	const [pageLoading, setPageLoading] = useState(true);

	return (
		<AuthLayout {...props}
			loading={pageLoading}
			breadcrumb={{ active: "Cancelled Products" }}
			pageHeading={{
				title: 'Cancelled Products',
				caption: 'EXPLORE OVERVIEW PRODUCTS FOR CRYPTO BASED INNOVATION'
			}}>
			<Row className="mt-4">
				<Col lg={12} xl={12}>
					<Col md={12}>
						<Products.Cancel pageLoading={pageLoading} setPageLoading={setPageLoading} />
					</Col>
				</Col>
			</Row>
		</AuthLayout>
	);
};

export default ProductCancel;


