import React, { useMemo, useRef, useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Layout } from 'containers';
import { Products } from 'components';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const ProductDetails = props => {
	const breadcrumb = { heading: "Product Details" };
    const [activeTab, setActiveTab] = useState('referals');
    const [editorState, setEditorState] = useState('');

	const profile = {
		customerId: '109977041',
		name: 'Mduduzi Mdluli',
		username: 'JSmith',
		phone: '0845880677',
		email: 'example1@demo.com',
		id_number: '9103025869089',
		country: 'South Africa',
		level: '3',
		created: 'just now',
		status: 'Active',
		bio: 'Im mdu mdluli born and raised in KZN',
	    address: {
			streetAddress: '23 Modiseni',
			suburb: 'Centurion',
			city: 'Pretoria',
			province: 'Gauteng',
			postalCode: '2345'
		}};
		const toggleTab = (e, tab) => {
			e.preventDefault();
			setActiveTab(tab);
        };
        
        const onEditorStateChange= data => {
            
            };

	return (
		<Layout {...props} breadcrumb={breadcrumb}>
                    <Row>
                        <Col md={12} lg={12} xl={12}>
                            <Card>
                                <CardBody>
                                <Row>
                                <Col sm={6}>
                            <div className="form-group">
                                    <label htmlFor="name">product Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-control form-control-m"
                                    /> 
                                </div>
                            </Col>
                            <Col sm={6}>
                            <Editor
                                editorState={editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                onEditorStateChange={onEditorStateChange}
                                />
                            </Col>
                            </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
			
		</Layout>
	);
};

export default ProductDetails;
