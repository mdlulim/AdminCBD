import React, { useMemo, useRef, useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Layout } from 'containers';
import { Products } from 'components';
import { EditorState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Select from 'react-select';
import { ProductService } from '../../providers';


const ProductDetails = props => {
	const breadcrumb = { heading: "Product Details" };
    const [activeTab, setActiveTab] = useState('referals');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [product, setProduct] = useState({});
    const { processing,confirmButtonDisabled, confirmButton,} = props;
    const [selectedRebalancingFrequency, setSelectedRebalancingFrequency] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());


    useMemo(() => {
        const product_id = props.match.params.id;
        ProductService.getProduct(product_id).then((response) =>{
       
            if(response.data.data !== null){
                console.log(response.data.data);
                setProduct(response.data.data);
            }        
        });
    },[]);
    
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
        
        const onEditorStateChange = editorState => {
            setEditorState(editorState);
            };

            const groupsOptions = [
                { value: '7563285', label: 'Crypto Bundle' },
                { value: '2345624', label: 'Bitcoin' },
                { value: '9843444', label: 'Payment Bundle' },
                { value: '3645364', label: 'Top 10 Bundle' }
              ];
              const balancingOptions = [
                { value: 'Monthly',  label: 'Monthly' },
                { value: 'Annually', label: 'Annually' }
              ];

              const statusOptions = [
                { value: 'Active',  label: 'Active' },
                { value: 'In-Active', label: 'In-Active' }
              ];

	return (
		<Layout {...props} breadcrumb={breadcrumb}>
                    <Row>
                        <Col md={6} lg={6} xl={6}>
                            <Card>
                                <CardBody>
                                <Row>
                                <Col md={12}>
                                        <label htmlFor="name">product Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="form-control form-control-m"
                                        /> 
                                </Col>
                                <Col md={6}>
                                        <label htmlFor="rebalancing_frequency">Rebalancing Frequency</label>
                                        <Select
                                            id="rebalancing_frequency"
                                            name="rebalancing_frequency"
                                            options={balancingOptions}
                                            onChange={item => setSelectedRebalancingFrequency(item)}
                                            className={`basic-multi-select form-control-m`}
                                            classNamePrefix="select"
                                            />
                                </Col>
                                <Col md={6}>
                                        <label htmlFor="next_rebalance">Next Rebalance</label>
                                        <input
                                            type="text"
                                            id="next_rebalance"
                                            className="form-control form-control-m"
                                        /> 
                                </Col>
                                <Col md={6}>
                                        <label htmlFor="name">Price</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="form-control form-control-m"
                                        /> 
                                </Col>
                                <Col md={6}>
                                        <label htmlFor="target_weight">Target Weight</label>
                                        <input
                                            type="text"
                                            id="target_weight"
                                            className="form-control form-control-m"
                                        /> 
                                </Col>
                                <Col md={6}>
                                        <label htmlFor="name">Product Group</label>
                                        <Select
                                            id="group"
                                            name="group"
                                            options={groupsOptions}
                                            onChange={item => setSelectedGroup(item)}
                                            className={`basic-multi-select form-control-m`}
                                            classNamePrefix="select"
                                            />
                                </Col>
                                <Col md={6}>
                                        <label htmlFor="name">Status</label>
                                        <Select
                                            id="status"
                                            name="status"
                                            options={statusOptions}
                                            onChange={item => setSelectedStatus(item)}
                                            className={`basic-multi-select form-control-m`}
                                            classNamePrefix="select"
                                            />
                                </Col>
                                <Col md={12}>
                                <label htmlFor="name">Description</label>
                                <Editor
                                        editorState={editorState}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        onEditorStateChange={onEditorStateChange}
                                    />
                                    </Col>
                                    <Col md={6}>
                                    <button
                            className="btn btn-primary"
                            disabled={confirmButtonDisabled || processing}
                        >
                            {processing ? 'Processing...' : 'Create'}
                        </button>
                        </Col>
                            </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col item lg={6} md={6} sm={6}>
                                        <Card className="mb-3">
                                            <CardBody>
                                            <div className="card-title mb-0">Performance</div>
                                            <Products.LineChart
                                            chartData={{
                                                labels: ['Jul 2021', 'Aug 2021', 'Sept 2021', 'Oct 2021'],
                                                datasets: [
                                                {
                                                    label: '# Product Price',
                                                    data: [509, 590, 480, 767],
                                                    backgroundColor: [
                                                    '#86abc9',
                                                    '#2196f3',
                                                    '#d22346',
                                                    'rgba(249, 194, 50, 1)',
                                                    ],
                                                    borderColor: [
                                                    'rgba(249, 194, 50, 1)',
                                                    '#f8f9fa',
                                                    '#d22346',
                                                    'rgba(249, 194, 38, 0.44)',
                                                    ],
                                                    borderWidth: 1,
                                                },
                                                ],
                                            }}
                                            options={{
                                                plugins: {
                                                legend: {
                                                    display: false
                                                }
                                                }
                                            }}
                                            />
                                            <hr />
                                            <p>The returns displayed do not include the fees and expenses that are charged. Please refer to our fees page and additional important disclaimers and risk disclosures.</p>
                                            </CardBody>
                                        </Card>
                                    </Col>
                    </Row>
			
		</Layout>
	);
};

export default ProductDetails;
