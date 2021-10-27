import React, { useMemo, useRef, useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { useParams, useHistory } from 'react-router-dom';
import { AuthLayout } from 'containers';
import { Products } from 'components';
import { EditorState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Select from 'react-select';
import { ProductService } from '../../providers';

const ProductDetails = props => {
	const breadcrumb = { heading: "Product Details" };
    const [disabled, setDisabled] = useState(false);
    const [activeTab, setActiveTab] = useState('referals');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [product, setProduct] = useState({});
    const { processing,confirmButtonDisabled, confirmButton,} = props;
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [selectedProductType, setSelectedProductType] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const params = useParams();
    const { id } = params;

    useMemo(() => {
        //Get member details
        ProductService.getProduct(id).then((res) => {
            console.log(res.data.data);
            const productDetails = res.data.data;
            setProduct(productDetails);
            setSelectedProductType(productDetails.type);
            setSelectedCurrency(productDetails.currency_code);
            setSelectedStatus(productDetails.status)
            setEditorState(productDetails.body)
        });

 
      }, []);
		const toggleTab = (e, tab) => {
			e.preventDefault();
			setActiveTab(tab);
        };
        
        const onEditorStateChange = editorState => {
            setEditorState(editorState);
            };

            const productType = [
                { value: 'Crypto Bundle', label: 'Crypto Bundle' },
                { value: 'Bitcoin', label: 'Bitcoin' },
                { value: 'Payment Bundle', label: 'Payment Bundle' },
                { value: 'Top 10 Bundle', label: 'Top 10 Bundle' }
              ];
              const currencies = [
                { value: 'ZAR',  label: 'ZAR' },
                { value: 'KYC',  label: 'KYC' },
              ];

              const statusOptions = [
                { value: 'Published',  label: 'Published' },
                { value: 'Achived', label: 'Achived' }
              ];
//====================Update Product===============================
              const onSubmit = (event) => {
                event.preventDefault();
                setDisabled(true);
                const form = event.currentTarget;

               // const title = form.title.value;

                const productData ={
                    title: form.title.value,
                    body: editorState,
                    type: selectedProductType,
                    currency_code: selectedCurrency,
                    price: form.price.value,
                    status: selectedStatus
                 }

                //  ProductService.updateProduct(id, productData).then((response) =>{
                //     console.log(response);
                //      setDisabled(false);
                //  })

                console.log(editorState._immutable);
        }

	return (
		<AuthLayout {...props} breadcrumb={breadcrumb}>
                    <Row>
                        <Col md={6} lg={6} xl={6}>
                            <Card>
                                <CardBody>
                                <form onSubmit={onSubmit}>
                                <Row>
                                <Col md={12}>
                                        <label htmlFor="name">product Title</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            className="form-control form-control-m"
                                            defaultValue={product.title}
                                        /> 
                                </Col>
                                <Col md={6}>
                                        <label htmlFor="product_type">Product Type</label>
                                        <Select
                                            id="product_type"
                                            name="product_type"
                                            value={productType.filter(option => option.label === product.type)}
                                            options={productType}
                                            onChange={item => setSelectedProductType(item.value)}
                                            className={`basic-multi-select form-control-m`}
                                            classNamePrefix="select"
                                            />
                                </Col>
                                <Col md={6}>
                                        <label htmlFor="currency">Select Currency</label>
                                        <Select
                                            id="currency"
                                            name="currency"
                                            value={currencies.filter(option => option.label === product.currency_code)}
                                            options={currencies}
                                            onChange={item => setSelectedCurrency(item.value)}
                                            className={`basic-multi-select form-control-m`}
                                            classNamePrefix="select"
                                            />
                                </Col>
                                
                                <Col md={6}>
                                        <label htmlFor="name">Price</label>
                                        <input
                                            type="text"
                                            id="price"
                                            name="price"
                                            className="form-control form-control-m"
                                            value={product.price}
                                        /> 
                                </Col>
                                <Col md={6}>
                                        <label htmlFor="status">Status</label>
                                        <Select
                                            id="status"
                                            name="status"
                                            value={statusOptions.filter(option => option.label === product.status)}
                                            options={statusOptions}
                                            onChange={item => setSelectedStatus(item.value)}
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
                                    <hr />
                                    </Col>
                                    <Col md={6}>
                                        
                         <button disabled={disabled}
                            className="btn btn-primary"
                            disabled={confirmButtonDisabled || processing}
                        >
                            {processing ? 'Processing...' : 'Update Product'}
                        </button>
                        </Col>
                       </Row>
                    </form>
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
			
		</AuthLayout>
	);
};

export default ProductDetails;
