import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import { Products } from 'components';
import { Session } from 'bc-react-session';

let baseURL = window.location.origin;
const session = Session.get();
let page = (window.location.pathname.split('/').pop()).toLowerCase();
    
if(page === 'history'){
    let mi = session.payload.vlist;
    if(!mi.includes("Product History")){
        window.location.replace(baseURL+"/dashboard");
    }   
}
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
