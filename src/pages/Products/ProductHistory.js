import React, { useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import { Products } from 'components';

let baseURL = window.location.origin;
let page = (window.location.pathname.split('/').pop()).toLowerCase();

// if(page === 'history'){
//     let mi = session.payload.vlist;
//     if(!mi.includes("Product History")){
//         window.location.replace(baseURL+"/dashboard");
//     }   
// }
const ProductHistory = props => {
	const breadcrumb = { heading: "Products History" };
	const [pageLoading, setPageLoading] = useState(true);

	return (
		<AuthLayout {...props}
		loading={pageLoading}
		breadcrumb={{ active: "Products History" }}
		pageHeading={{
			title: 'Products History',
			caption: 'EXPLORE OVERVIEW PRODUCT HISTORY FOR CRYPTO BASED INNOVATION'
		}}>
			<Row className="mt-4">
				<Col lg={12} xl={12}>
				<Col md={12}>
                    <Products.ProductHistory pageLoading={pageLoading} setPageLoading={setPageLoading}/>
                </Col>
				</Col>
			</Row>
		</AuthLayout>
	);
};

export default ProductHistory;
