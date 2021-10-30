import React, { useMemo, useRef, useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { useParams, useHistory } from 'react-router-dom';
import { AuthLayout } from 'containers';
import { Products } from 'components';
import { EditorState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Select from 'react-select';
import { confirmAlert } from 'react-confirm-alert';
import NumberFormat from 'react-number-format';
import { ProductService } from '../../providers';

const ProductAddNew = props => {
	const breadcrumb = { heading: "New Product" };
	const [disabled, setDisabled] = useState(false);
	const [show, setShow] = useState(true);
	const [errorAmount, setErrorAmount] = useState(true);
	const [errorReg, setErrorReg] = useState(true);
	const [errorEducator, setErrorEducator] = useState(true);
	const [activeTab, setActiveTab] = useState('referals');
	const [amountFee, setAmountFee] = useState(0);
	const [educatorFee, setEducatorFee] = useState(0);
	const [registrationFee, setRegistrationFee] = useState(0);
	const [error, setError] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [product, setProduct] = useState({});
    const { processing,confirmButtonDisabled, confirmButton,} = props;
    const [selectedCurrency, setSelectedCurrency] = useState('CBI');
    const [selectedProductType, setSelectedProductType] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const params = useParams();
    const { id } = params;

    useMemo(() => {
		//Get member details

      }, []);
		const toggleTab = (e, tab) => {
			e.preventDefault();
			setActiveTab(tab);
        };
        
        const onEditorStateChange = editorState => {
            setEditorState(editorState);
            };

            const productType = [
				{ value: 'Fraxion', label: 'Fraxion' },
                { value: 'Crypto Bundle', label: 'Crypto Bundle' },
                { value: 'Bitcoin', label: 'Bitcoin' },
                { value: 'Payment Bundle', label: 'Payment Bundle' },
                { value: 'Top 10 Bundle', label: 'Top 10 Bundle' }
              ];
              const currencies = [
                { value: 'CBI',  label: 'CBI' },
              ];

              const statusOptions = [
                { value: 'Published',  label: 'Published' },
                { value: 'Achived', label: 'Achived' }
              ];
//====================Update Product===============================
              const onSubmit = (event) => {
                event.preventDefault();
				setDisabled(true);
				setError('');

                const form = event.currentTarget;

               // const title = form.title.value;
                const productData ={
                    title				: form.title.value,
                    body				: null,
                    type				: selectedProductType,
                    currency_code		: selectedCurrency,
					price				: form.price.value,
					educator_fee		: educatorFee,
					educator_persantage	: form.educator_persantage.value,
					registration_fee	: registrationFee,
					registration_persantage: form.registration_persantage.value,
					total				: form.price.value+educatorFee+registrationFee,
                    status				: selectedStatus
                 }
				 console.log(productData);
                 ProductService.addProduct(productData).then((response) =>{
					console.log(response);
					if(response.status){

					}else{
						setError(response.message);
					}
                    setDisabled(false);
                 })

		}


	return (
		<AuthLayout {...props}
        breadcrumb={{ active: "Add New Product" }}
        pageHeading={{
            title: 'Add New Product',
            caption: 'EXPLORE OVERVIEW PRODUCT FOR CRYPTO BASED INNOVATION'
        }}>
			<Row className="mt-4">
			<Card>
			<CardBody>
				<form onSubmit={onSubmit}>
				{ error ? 
				<div className="alert alert-warning" role="alert">
				{error}
				</div> : ''}
				<Col lg={6} xl={6}>

                                <Row>
                                <Col md={6}>
                                        <label htmlFor="name">product Title</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            className="form-control form-control-m"
                                        /> 
                                </Col>
                                <Col md={6}>
                                        <label htmlFor="product_type">Product Type</label>
                                        <Select
                                            id="product_type"
                                            name="product_type"
                                            options={productType}
                                            onChange={item => {
												setSelectedProductType(item.value);
												if(item.value == 'Fraxion'){
													setShow(false)
												}else{
													setShow(true)
												}
											}}
                                            className={`basic-multi-select form-control-m`}
											classNamePrefix="select"
                                            />
                                </Col>
                                <Col md={6}>
                                        <label htmlFor="currency">Select Currency</label>
                                        <Select
                                            id="currency"
											name="currency"
											value={currencies.filter(option => option.label === selectedCurrency)}
                                            options={currencies}
                                            onChange={item => setSelectedCurrency(item.value)}
                                            className={`basic-multi-select form-control-m`}
                                            classNamePrefix="select"
                                            />
                                </Col>
                                <Col md={6}>
                                        <label hidden={show} htmlFor="name">Fraxion Amount</label>
										<label htmlFor="name">Price</label>
                                        <input
                                            type="text"
                                            id="price"
                                            name="price"
											className="form-control form-control-m"
											onChange={event => {
												if(!isNaN(+event.target.value)){
													setAmountFee(event.target.value)
													setErrorAmount(true)
												}else{
													setErrorAmount(false)
												}
											}}
                                        />
										<label hidden={errorAmount} className="text-danger" htmlFor="name">Please enter a valid amount</label>
                                </Col>

								{/* <Col md={6} hidden={show}>
                                        <label htmlFor="name">Educator Fee Amount</label>
                                        <input
                                            type="text"
                                            id="educator_fee"
                                            name="educator_fee"
                                            className="form-control form-control-m"
                                        />
                                </Col> */}
								<Col md={6} hidden={show}>
							<label htmlFor="educator_persantage">Educator Persentage Fee (%) {educatorFee ? <NumberFormat thousandSeparator={true} displayType={'text'} prefix={'CBI '} value={educatorFee} />: '' }</label>
                                        <input
                                            type="text"
                                            id="educator_persantage"
                                            name="educator_persantage"
											className="form-control form-control-m"
											onChange={event => {
												if(!isNaN(+event.target.value)){
													let value =  event.target.value/100*amountFee
													setEducatorFee(value)
													setErrorEducator(true)
												}else{
													setErrorEducator(false)
													setEducatorFee(0)
												}
											}}
                                        />
										<label hidden={errorEducator} className="text-danger" htmlFor="name">Please enter a valid amount</label>
                                </Col>
								{/* <Col md={6}hidden={show}>
                                        <label htmlFor="name">Registration Fee</label>
                                        <input
                                            type="text"
                                            id="registration_fee"
                                            name="registration_fee"
                                            className="form-control form-control-m"
                                        />
                                </Col> */}
								<Col md={6} hidden={show}>
                                        <label htmlFor="name">Registration Persentage Fee (%) {registrationFee ? <NumberFormat thousandSeparator={true} displayType={'text'} prefix={'CBI '} value={registrationFee} />: '' }</label>
                                        <input
                                            type="text"
                                            id="registration_persantage"
                                            name="registration_persantage"
											className="form-control form-control-m"
											onChange={event => {
												if(!isNaN(+event.target.value)){
													let value =  event.target.value/100*amountFee
													setRegistrationFee(parseFloat(value).toFixed(2))
													setErrorReg(true)
												}else{
													setErrorReg(false)
													setRegistrationFee(0)
												}
											}}
                                        />
                                </Col>
                                <Col md={6}>
                                        <label htmlFor="status">Status</label>
                                        <Select
                                            id="status"
                                            name="status"
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
				</Col>
				</form>
			</CardBody>
			  </Card>
			</Row>
		</AuthLayout>
	);
};

export default ProductAddNew;
