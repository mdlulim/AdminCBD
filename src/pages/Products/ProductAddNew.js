import React, { useMemo, useRef, useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { useParams, useHistory } from 'react-router-dom';
import { AuthLayout } from 'containers';
import { Products } from 'components';
import { EditorState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from 'draft-convert';
import Select from 'react-select';
import { confirmAlert } from 'react-confirm-alert';
import NumberFormat from 'react-number-format';
import { ProductService } from '../../providers';

const ProductAddNew = props => {
	const breadcrumb = { heading: "New Product" };
	const [disabled, setDisabled] = useState(false);
    const [show, setShow] = useState(true);
    const [showFixedPlan, setShowFixedPlan] = useState(true);
    const [showCBIx7, setShowCBIx7] = useState(true);
	const [errorAmount, setErrorAmount] = useState(true);
	const [errorReg, setErrorReg] = useState(true);
	const [errorEducator, setErrorEducator] = useState(true);
    const [errorSlippage, setErrorSlippage] = useState(true);
	const [activeTab, setActiveTab] = useState('referals');
	const [amountFee, setAmountFee] = useState(0);
	const [educatorFee, setEducatorFee] = useState(0);
    const [sleppageFee, setSlippageFee] = useState(0);
	const [registrationFee, setRegistrationFee] = useState(0);
	const [error, setError] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [product, setProduct] = useState({});
    const [productCategories, setProductCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const { processing,confirmButtonDisabled, confirmButton,} = props;
    const [selectedCurrency, setSelectedCurrency] = useState('CBI');
    const [selectedProductType, setSelectedProductType] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const params = useParams();
    const { id } = params;

    useMemo(() => {
		//Get member details

        ProductService.getProductCategories().then((res) => {
           // console.log(res.data.data.results)
            if(res.data.success){
              const productlist = res.data.data.results;
              setCategories(productlist);
              let temp = [];
              productlist.filter(item => (
                    temp.push({ value: item.code, label: item.title })
                   // console.log(item)
                    //setProductCategories(productCategories => [{value:item.code, label:item.title}])
                ))
               console.log(temp)
              setProductCategories(temp);
            }
          });

         console.log(productCategories)
      }, []);
		const toggleTab = (e, tab) => {
			e.preventDefault();
			setActiveTab(tab);
        };
        
        const onEditorStateChange = editorState => {
            setEditorState(editorState);
            };

              const currencies = [
                { value: 'CBI',  label: 'CBI' },
              ];

              const statusOptions = [
                { value: 'Published',  label: 'Published' },
                { value: 'Achived', label: 'Achived' }
              ];
//====================Add Product===============================
              const onSubmit = (event) => {
                event.preventDefault();
				setDisabled(true);
				setError('');

                const form = event.currentTarget;
				let price = parseFloat(form.price.value);

                const category = categories.filter(option => option.code === selectedProductType)[0];
                console.log(category);
				
               // const title = form.title.value;
               let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
               //console.log(currentContentAsHTML);

                if(selectedProductType === 'FX'){
                    let educator = parseFloat(educatorFee);
				    let regFee = parseFloat(registrationFee);
                    const productData ={
                        title				: form.title.value,
                        body				: currentContentAsHTML,
                        product_code		: selectedProductType,
                        category_id         : category.id,
                        category_title      : category.title,
                        currency_code		: selectedCurrency,
                        price				: price,
                        educator_fee		: educator,
                        educator_persantage	: parseFloat(form.educator_persantage.value),
                        registration_fee	: regFee,
                        registration_persantage: parseFloat(form.registration_persantage.value),
                        total				: price+educator+regFee,
                        status				: selectedStatus
                     }
                     ProductService.addProduct(productData).then((response) =>{
                        console.log(response);
                        if(response.status){
                            setShow(true);
                            confirmAlert({
                                title: 'Confirm submit',
                                message: 'Product was added successfully',
                                buttons: [
                                  {
                                    label: 'Yes'
                                  }
                                ]
                              })
                        }else{
                            setError('error message');
                        }
                        setDisabled(false);
                     })
                }else if(selectedProductType === 'FP'){
                    const fpData ={
                        title				: form.title.value,
                        body				: currentContentAsHTML,
                        product_code		: selectedProductType,
                        category_id         : category.id,
                        category_title      : category.title,
                        currency_code		: selectedCurrency,
                        price				: price,
                        daily_interest      : parseFloat(form.estimated_daily_interest.value),
                        gross_return        : parseFloat(form.minimum_gross_return.value),
                        investment_period   : parseFloat(form.investment_period.value),
                        minimum_investment  : parseFloat(form.minimum_investment.value),
                        status				: selectedStatus,
                     }

                     ProductService.addProduct(fpData).then((response) =>{
                        console.log(response);
                        if(response.status){
                            setShow(true);
                            confirmAlert({
                                title: 'Confirm submit',
                                message: 'Product was added successfully',
                                buttons: [
                                  {
                                    label: 'Yes'
                                  }
                                ]
                              })
                        }else{
                            setError('error message');
                        }
                        setDisabled(false);
                     })

                     console.log(fpData)
                }else if(selectedProductType === 'CBIX7'){

                    let educator = parseFloat(educatorFee);
				    let regFee = parseFloat(registrationFee);
                    const cbiX7 ={
                        title				: form.title.value,
                        body				: currentContentAsHTML,
                        product_code		: selectedProductType,
                        category_id         : category.id,
                        category_title      : category.title,
                        type		        : selectedProductType,
                        currency_code		: selectedCurrency,
                        price				: price,
                        educator_fee		: educator,
                        educator_persantage	: parseFloat(form.educator_persantage_fee.value),
                        registration_fee	: parseFloat(form.registration_fee.value),
                        total				: price+educator+parseFloat(form.registration_fee.value),
                        status				: selectedStatus
                     }
                     console.log(cbiX7);
                     ProductService.addProduct(cbiX7).then((response) =>{
                        console.log(response);
                        if(response.status){
                            setShow(true);
                            confirmAlert({
                                title: 'Confirm submit',
                                message: 'Product was added successfully',
                                buttons: [
                                  {
                                    label: 'Yes'
                                  }
                                ]
                              })
                        }else{
                            setError('error message');
                        }
                        setDisabled(false);
                     })

                }


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
                                <Row >
                                <Col md={12}>
                            <label htmlFor="product_type">Product Type</label>
                            <Select
                                id="product_type"
                                name="product_type"
                                options={productCategories}
                                onChange={item => {
                                    setSelectedProductType(item.value);
                                    if(item.value === 'FX'){
                                        setShow(false)
                                        setShowFixedPlan(true)
                                        setShowCBIx7(true)
                                    }else if(item.value === 'FP'){
                                        setShow(true)
                                        setShowFixedPlan(false)
                                        setShowCBIx7(true)
                                    }else if(item.value === 'CBIX7'){
                                        setShow(true)
                                        setShowFixedPlan(true)
                                        setShowCBIx7(false)
                                    }
                                }}
                                className={`basic-multi-select form-control-m`}
                                classNamePrefix="select"
                                required
                                />
                        </Col>
                                <Col md={6}>
                                        <label htmlFor="name">Product Title</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            className="form-control form-control-m"
                                            required
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
                                            required
                                            />
                                </Col>
                                <Col md={6}>
                                        <label htmlFor="name">Product Amount (CBI)</label>
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
                                            required
                                        />
										<label hidden={errorAmount} className="text-danger" htmlFor="name">Please enter a valid amount</label>
                                </Col>

							
								<Col md={6} hidden={show}>
                                        <label htmlFor="name">Registration Percentage Fee (%) {registrationFee ? <NumberFormat thousandSeparator={true} displayType={'text'} prefix={'CBI '} value={registrationFee} />: '' }</label>
                                        <input
                                            type="text"
                                            id="registration_persantage"
                                            name="registration_persantage"
											className="form-control form-control-m"
											onChange={event => {
												if(!isNaN(+event.target.value)){
													let value =  event.target.value/100*amountFee
													setRegistrationFee(value)
													setErrorReg(true)
												}else{
													setErrorReg(false)
													setRegistrationFee(0)
												}
											}}
                                        />
                                </Col>
                                <Col md={6} hidden={show}>
                                        <label htmlFor="name">Registration Percentage Fee (%) {registrationFee ? <NumberFormat thousandSeparator={true} displayType={'text'} prefix={'CBI '} value={registrationFee} />: '' }</label>
                                        <input
                                            type="text"
                                            id="registration_persantage"
                                            name="registration_persantage"
											className="form-control form-control-m"
											onChange={event => {
												if(!isNaN(+event.target.value)){
													let value =  event.target.value/100*amountFee
													setRegistrationFee(value)
													setErrorReg(true)
												}else{
													setErrorReg(false)
													setRegistrationFee(0)
												}
											}}
                                        />
                                </Col>
                                <Col md={6} hidden={show}>
							<label htmlFor="educator_persantage">Educator Percentage Fee (%) {educatorFee ? <NumberFormat thousandSeparator={true} displayType={'text'} prefix={'CBI '} value={educatorFee} />: '' }</label>
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
  {/** =========================================================CBIX7================================================ */}
                                <Col md={6} hidden={showCBIx7}>
                                        <label htmlFor="name">Registration Fee </label>
                                        <input
                                            type="text"
                                            id="registration_fee"
                                            name="registration_fee"
											className="form-control form-control-m"
											onChange={event => {
												if(!isNaN(+event.target.value)){
													let value =  event.target.value/100*amountFee
													setRegistrationFee(value)
													setErrorReg(true)
												}else{
													setErrorReg(false)
													setRegistrationFee(0)
												}
											}}
                                        />
                                </Col>
                                <Col md={6} hidden={showCBIx7}>
							<label htmlFor="educator_persantage">Educator Percentage Fee (%) {educatorFee ? <NumberFormat thousandSeparator={true} displayType={'text'} prefix={'CBI '} value={educatorFee} />: '' }</label>
                                        <input
                                            type="text"
                                            id="educator_persantage"
                                            name="educator_persantage_fee"
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
										<label hidden={errorEducator} className="text-danger" htmlFor="name">Please enter a valid percentage</label>
                                </Col>
                                <Col md={6} hidden={showCBIx7}>
							<label htmlFor="educator_persantage">Slippage Percentage Fee (%) {educatorFee ? <NumberFormat thousandSeparator={true} displayType={'text'} prefix={'CBI '} value={sleppageFee} />: '' }</label>
                                        <input
                                            type="text"
                                            id="educator_persantage"
                                            name="slippage_persantage"
											className="form-control form-control-m"
											onChange={event => {
												if(!isNaN(+event.target.value)){
													let value =  event.target.value/100*amountFee
													setSlippageFee(value)
													setErrorSlippage(true)
												}else{
													setErrorSlippage(false)
													setSlippageFee(0)
												}
											}}
                                        />
										<label hidden={errorSlippage} className="text-danger" htmlFor="name">Please enter a valid percentage</label>
                                </Col>
  {/** =========================================================Fixed Plan================================================ */}
                                <Col md={6} hidden={showFixedPlan}>
                                        <label htmlFor="name">Estimated daily Interest (%)</label>
                                        <input
                                            type="text"
                                            id="registration_persantage"
                                            name="estimated_daily_interest"
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
                                <Col md={6} hidden={showFixedPlan}>
                                        <label htmlFor="name">Minimum Gross Return (%) </label>
                                        <input
                                            type="text"
                                            id="registration_persantage"
                                            name="minimum_gross_return"
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
                                <Col md={6} hidden={showFixedPlan}>
                                        <label htmlFor="name">Investment Period (Weeks)</label>
                                        <input
                                            type="text"
                                            id="investment_period"
                                            name="investment_period"
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
                                <Col md={6} hidden={showFixedPlan}>
                                        <label htmlFor="name">Minimum Investment (CBI)</label>
                                        <input
                                            type="text"
                                            id="minimum_investment"
                                            name="minimum_investment"
											className="form-control form-control-m"
											onChange={event => {
												if(!isNaN(+event.target.value)){
													setErrorReg(true)
												}else{
													setErrorReg(false)
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
                            {processing ? 'Processing...' : 'Add Product'}
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
