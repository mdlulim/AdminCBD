import React, { useMemo, useRef, useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';
import { Products } from 'components';
import { EditorState, ContentState} from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from 'draft-convert';
import { HashLinkContainer } from 'components';
import DataTable from 'react-data-table-component';
import { Unlock,  Edit, Trash} from 'react-feather';
import CurrencyFormat from 'react-currency-format';
import { confirmAlert } from 'react-confirm-alert'; // Import
import DeleteProductAlert from './DeleteProductAlert';
import { ProductService } from '../../providers';
import Select from 'react-select';
import NumberFormat from 'react-number-format';
// styles
const customStyles = {
   
    headCells: {
        style: {
            color: 'rgba(0,0,0,.54)',
            paddingLeft: '18px', // override the cell padding for head cells
            paddingRight: '18px',
        },
    },
    cells: {
        style: {
            paddingLeft: '18px', // override the cell padding for data cells
            paddingRight: '18px',
        },
    },
};
const iconPadding ={
    paddingRight: '3px',
}
const inputWith={
  width: '30%',
  marginRight: '20px'
}

const Status = ({ status }) => {
    let badge = 'primary';
    if (status === 'Pending') {
      badge = 'warning';
    }
    if (status === 'Published') {
      badge = 'success';
    }
    if (status === 'Blocked') {
        badge = 'danger';
      }
    return (
      <div className={`btn btn-outline-${badge} btn-block disabled btn-sm`}>{status}</div>
    );
  };

const Image = () => {
    return (
        <img
            alt=""
            height="32px"
            style={{ borderRadius: 4 }}
            width="32px"
            src={require("images/1.jpeg")}
        />
    );
};

export default function UpdateProductDetails(props) {
    const breadcrumb = { heading: "Product Details" };
    const [disabled, setDisabled] = useState(false);
    const [activeTab, setActiveTab] = useState('referals');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [show, setShow] = useState(true);
    const [showFixedPlan, setShowFixedPlan] = useState(true);
	const [errorAmount, setErrorAmount] = useState(true);
	const [errorReg, setErrorReg] = useState(true);
	const [errorEducator, setErrorEducator] = useState(true);
	const [amountFee, setAmountFee] = useState(0);
	const [educatorFee, setEducatorFee] = useState(0);
	const [registrationFee, setRegistrationFee] = useState(0);
	const [error, setError] = useState('');
    const [product, setProduct] = useState({});
    const [selectedStatus, setSelectedStatus] = useState('');
    const { processing,confirmButtonDisabled, confirmButton,} = props;
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [selectedProductType, setSelectedProductType] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const params = useParams();
    const { id } = params;


    useMemo(() => {

       //Get member details
       ProductService.getProduct(id).then((res) => {
        // console.log(res.data.data);
         const productDetails = res.data.data;
         setProduct(productDetails);
         setSelectedProductType(productDetails.type);
         setSelectedCurrency(productDetails.currency_code);
         setEducatorFee(productDetails.educator_fee);
         setAmountFee(productDetails.price)
         setRegistrationFee(productDetails.registration_fee);
         setSelectedStatus(productDetails.status)
         if(productDetails.type === "Fraxion"){
             setShow(false)
         }
         //setEditorState(ContentState.convertToHTML(productDetails.body));
        // setEditorState(EditorState.createWithContent(ContentState.createFromText(productDetails.body)));
     });

      }, []);
    // table headings definition

    const toggleTab = (e, tab) => {
        e.preventDefault();
        setActiveTab(tab);
    };
    
    const onEditorStateChange = editorState => {
        setEditorState(editorState);
        };

        const productType = [
            { value: 'Fraxion', label: 'Fraxion' },
            { value: 'Fixed Plans', label: 'Fixed Plans' },
            { value: 'CBIx7', label: 'CBIx7' }
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
            const form = event.currentTarget;
            let price = parseFloat(form.price.value);
            let educator = parseFloat(educatorFee);
            let regFee = parseFloat(registrationFee);
           // const title = form.title.value;
           let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
           //console.log(currentContentAsHTML);

            const productData ={
                title				: form.title.value,
                body				: currentContentAsHTML,
                type				: selectedProductType,
                currency_code		: selectedCurrency,
                price				: price,
                educator_fee		: educator,
                educator_persantage	: parseFloat(form.educator_persantage.value),
                registration_fee	: regFee,
                registration_persantage: parseFloat(form.registration_persantage.value),
                total				: price+educator+regFee,
                status				: selectedStatus
             }

             ProductService.updateProduct(id, productData).then((response) =>{
                console.log(response);
                return confirmAlert({
                    title: 'Succcess',
                    message: 'Member was successfully updated',
                    buttons: [
                      {
                        label: 'Ok',
                      }
                    ]
                  });
                 setDisabled(false);
             })

            console.log('%'+form.educator_persantage.value);
    }

    return (
        <Row>
                    <Col md={6} lg={6} xl={6}>
                    <form onSubmit={onSubmit}>
                                <Row>
                                <Col md={6}>
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
                                            onChange={item => {
												setSelectedProductType(item.value);
												if(item.value == 'Fraxion'){
                                                    setShow(false)
                                                    
												}else if(item.value == 'Fixed Plans'){
                                                    setShow(true)
                                                    setShowFixedPlan(false)
												}else if(item.value == 'CBIx7'){
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
                                <Col md={6} hidden={show}>
							<label htmlFor="educator_persantage">Educator Persentage Fee (%) {educatorFee ? <NumberFormat thousandSeparator={true} displayType={'text'} prefix={'CBI '} value={educatorFee} />: '' }</label>
                                        <input
                                            type="text"
                                            id="educator_persantage"
                                            name="educator_persantage"
                                            className="form-control form-control-m"
                                            value={product.educator_persantage}
											onChange={event => {
												if(!isNaN(+event.target.value)){
                                                    let value =  event.target.value/100*amountFee
                                                    console.log(amountFee);
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
								<Col md={6} hidden={show}>
                                        <label htmlFor="name">Registration Persentage Fee (%) {registrationFee ? <NumberFormat thousandSeparator={true} displayType={'text'} prefix={'CBI '} value={registrationFee} />: '' }</label>
                                        <input
                                            type="text"
                                            id="registration_persantage"
                                            name="registration_persantage"
                                            className="form-control form-control-m"
                                            value={product.registration_persantage}
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
                                <Col md={6} hidden={showFixedPlan}>
                                        <label htmlFor="name">Estimated daily Interest (%) {registrationFee ? <NumberFormat thousandSeparator={true} displayType={'text'} prefix={'CBI '} value={registrationFee} />: '' }</label>
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
                                <Col md={6} hidden={showFixedPlan}>
                                        <label htmlFor="name">Minimum Gross Return (%) {registrationFee ? <NumberFormat thousandSeparator={true} displayType={'text'} prefix={'CBI '} value={registrationFee} />: '' }</label>
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
                                <Col md={6} hidden={showFixedPlan}>
                                        <label htmlFor="name">Investment Period (%) {registrationFee ? <NumberFormat thousandSeparator={true} displayType={'text'} prefix={'CBI '} value={registrationFee} />: '' }</label>
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
                                <Col md={6} hidden={showFixedPlan}>
                                        <label htmlFor="name">Minimum Investment (%) {registrationFee ? <NumberFormat thousandSeparator={true} displayType={'text'} prefix={'CBI '} value={registrationFee} />: '' }</label>
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
                                {/* <p>The returns displayed do not include the fees and expenses that are charged. 
                                    Please refer to our fees page and additional 
                                    important disclaimers and risk disclosures.</p> */}
                                </CardBody>
                            </Card>
                        </Col>
        </Row>
        
    );
}