import React, { useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import { Products } from 'components';

let baseURL = window.location.origin;
let page = (window.location.pathname.split('/').pop()).toLowerCase();

// if(page === 'products'){
//     let mi = session.payload.vlist;
//     if(!mi.includes("Products")){
//         window.location.replace(baseURL+"/dashboard");
//     }   
// }

const ProductsList = props => {
	const breadcrumb = { heading: "Products" };
	const [pageLoading, setPageLoading] = useState(true);

	return (
		<AuthLayout {...props}
			loading={pageLoading}
			breadcrumb={{ active: "Products" }}
			pageHeading={{
				title: 'Products List',
				caption: 'EXPLORE OVERVIEW PRODUCTS FOR CRYPTO BASED INNOVATION'
			}}>
			<Row className="mt-4">
				<Col lg={12} xl={12}>
					<Col md={12}>
						<Products.Products pageLoading={pageLoading} setPageLoading={setPageLoading} />
					</Col>
				</Col>
			</Row>
		</AuthLayout>
	);
};

export default ProductsList;
