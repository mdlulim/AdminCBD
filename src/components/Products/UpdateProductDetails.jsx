import React, { useMemo, useRef, useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';
import { Products } from 'components';
import { EditorState, ContentState, convertFromHTML} from 'draft-js';
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
    const [showCBIx7, setShowCBIx7] = useState(true);
    const [showFixedPlan, setShowFixedPlan] = useState(true);
	const [errorAmount, setErrorAmount] = useState(true);
    const [errorReg, setErrorReg] = useState(true);
    const [sleppageFee, setSlippageFee] = useState(0);
    const [errorSlippage, setErrorSlippage] = useState(true);
	const [errorEducator, setErrorEducator] = useState(true);
	const [amountFee, setAmountFee] = useState(0);
	const [educatorFee, setEducatorFee] = useState(0);
	const [registrationFee, setRegistrationFee] = useState(0);
	const [error, setError] = useState('');
    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([]);
    const [productCategories, setProductCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const { processing,confirmButtonDisabled, confirmButton,} = props;
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [selectedProductType, setSelectedProductType] = useState({});
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [ fees, setFees ] = useState({});
    const [allowCancellation, setAllowCancellation] = useState(false);
    const [selectedSubcategory, setSelectedSubcategory] = useState({});
    const params = useParams();
    const { id } = params;

    async function fetchData(){
        const poductsList = await ProductService.getProducts();
        setProducts(poductsList.results);

        const categoryList = await ProductService.getProductCategories();
        setCategories(categoryList.results);
        let temp = [];
        categoryList.results.filter(item => (
                temp.push({ value: item.code, label: item.title, id: item.id })
            ))
        setProductCategories(temp);

        const subcategoryList = await ProductService.getProductSubCategories();
        setSubcategories(subcategoryList.results);
        

        const productDetails = await ProductService.getProduct(id);
        const subcategoryFiltered= subcategoryList.results.filter(option => option.id === productDetails.subcategory_id);
         let temp2 = [];
         subcategoryFiltered.filter(item => (
               temp2.push({ value: item.code, label: item.title, id: item.id, allow_cancellations: item.allow_cancellations })
            ));
            console.log(productDetails)
        // //setSubcategories(sub)
        setSelectedSubcategory({ value: subcategoryFiltered[0].code, label: subcategoryFiltered[0].title, id: subcategoryFiltered[0].id, allow_cancellations: subcategoryFiltered[0].allow_cancellations })
        setAllowCancellation(subcategoryFiltered[0].allow_cancellations);
           setProduct(productDetails);
           setFilteredSubcategories(temp2)
         //  setSelectedSubcategory(subcategoryList.filter(product => product.permakey === permakey));
         console.log(productDetails.type)

         const categories1 = await ProductService.getProductCategories();
         const category = categories1.results.filter(option => option.code === productDetails.type)[0];
         
            if(category){
                setSelectedProductType({ value: category.code, label: category.title, id: category.id });
            }
            setSelectedCurrency(productDetails.currency_code);
            setEducatorFee(productDetails.educator_fee);
            setAmountFee(productDetails.price)
            setRegistrationFee(productDetails.registration_fee);
            setSelectedStatus(productDetails.status)
            if(productDetails.body){
                setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(productDetails.body))))
            }
            if(productDetails.type === "FX" || productDetails.type === "Fraxion"){
                setShow(false)
                setShowCBIx7(true)
                setShowFixedPlan(true)
                if(productDetails.fees){
                setFees({
                        educator_percentage: parseFloat(productDetails.fees.educator_percentage),
                        registration_percentage: parseFloat(productDetails.fees.registration_percentage),
                        cancellation_fee: subcategoryFiltered[0].allow_cancellations ? parseFloat(productDetails.fees.cancellation_fee) : '',
                        })
                    }
            }else if (productDetails.type === "CBIX7"){
                setShow(true)
                setShowCBIx7(false)
                setShowFixedPlan(true)
                if(productDetails.fees){
                setFees({
                    educator_percentage:  parseFloat(productDetails.fees.educator_percentage),
                    registration_fee: parseFloat(productDetails.fees.registration_fee),
                    slippage_percentage_buy: parseFloat(productDetails.fees.slippage_percentage_buy),
                    slippage_percentage_sell: parseFloat(productDetails.fees.slippage_percentage_sell),
                    cancellation_fee: subcategoryFiltered[0].allow_cancellations ? parseFloat(productDetails.fees.cancellation_fee) : '',
                    })
            }
            }else if (productDetails.type === "FP"){
                setShowFixedPlan(false)
                setShow(true)
                setShowCBIx7(true)
                if(productDetails.fees){
                    setFees({
                        daily_interest  : parseFloat(productDetails.fees.daily_interest),
                        gross_return    : parseFloat(productDetails.fees.gross_return),
                        cancellation_fee: subcategoryFiltered[0].allow_cancellations ? parseFloat(productDetails.fees.cancellation_fee) : '',
                        })
                }
            }
    }


    useMemo(() => {

        ProductService.getProductCategories().then((res) => {
            fetchData()
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


          const currencies = [
            { value: 'CBI',  label: 'CBI' },
          ];

          const hasCancellationList = [
            { value: 'false',  label: 'False' },
            { value: 'true',  label: 'true' },
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

    }

    const onSubmitUpdate = (event) =>{
        event.preventDefault();
        setDisabled(true);
        setError('');
        const form = event.currentTarget;
         const category = categories.filter(option => option.code === selectedProductType)[0];
        // const title = form.title.value;
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
       // const productCode = generateUniqueCode(5);
        if(selectedProductType === 'CBIX7'){
            const data ={
                body: currentContentAsHTML,
                currency_code: selectedCurrency,
                status: selectedStatus,
                title: product.title,
                price: 0,
                bbt_value: parseFloat(form.bbt_value.value),
                fees: {
                    educator_percentage: parseFloat(form.educator_percentage.value),
                    registration_fee: parseFloat(form.registration_fee.value),
                    slippage_percentage_buy: parseFloat(form.slippage_percentage_buy.value),
                    slippage_percentage_sell: parseFloat(form.slippage_percentage_sell.value),
                }
            }
            update(data)

        }else if(selectedProductType === 'FX'){
            const myFees = {
                                educator_percentage: parseFloat(form.educator_percentage_fx.value),
                                registration_percentage: parseFloat(form.registration_percentage_fx.value),
                            }
            const data ={
                body: currentContentAsHTML,
                currency_code: selectedCurrency,
                fees: myFees,
                status: selectedStatus,
                title: product.title,
                price: parseFloat(form.price.value),
            }
            update(data)

        }else if(selectedProductType === 'FP'){
            const data ={
                    body            : currentContentAsHTML,
                    currency_code   : selectedCurrency,
                    investment_period: parseFloat(form.investment_period.value),
                    minimum_investment: parseFloat(form.minimum_investment.value),
                    price            : parseFloat(form.price.value),
                    status           : selectedStatus,
                    title            : product.title,
                    fees             : {
                        daily_interest  : parseFloat(form.daily_interest.value),
                        gross_return    : parseFloat(form.gross_return.value),
                        cancellation_fee: parseFloat(form.cancellation_fee.value),
                    }
                }
                update(data)
        }

    }

    
    const update = (data) =>{
        ProductService.updateProduct(id, data).then((response) =>{
            return confirmAlert({
                title: 'Succcess',
                message: 'Product was successfully updated',
                buttons: [
                  {
                    label: 'Ok',
                  }
                ]
              });
             setDisabled(false);
         })
    }
    return (
        <Row>
                    <Col md={12} lg={12}>
                    <form onSubmit={onSubmitUpdate}>
                    { error ?
                        <div className="alert alert-warning" role="alert">
                        {error}
                        </div> : ''}
                                <Row>
                                <Col md={6}>
                                        <label htmlFor="product_type">Product Type</label>
                                        <Select
                                            id="product_type"
                                            name="product_type"
                                            value={product ? productCategories.filter(option => option.value === product.type): ''}
                                            options={productCategories}
                                            onChange={item => {
												//setSelectedProductType(item.value);
												if(item.value == 'FX'){
                                                    setShow(false)
												}else if(item.value == 'FP'){
                                                    setShow(true)
                                                    setShowFixedPlan(false)
												}else if(item.value == 'CBIX7'){
                                                }
											}}
                                            className={`basic-multi-select form-control-m`}
                                            classNamePrefix="select"
                                            isDisabled ={true}
                                            />
                                </Col>
                                <Col md={6}>
                            <label htmlFor="product_type">Subcategory *</label>
                            <Select
                                id="product_type"
                                name="product_type"
                                value={product ? filteredSubcategories.filter(option => option.value === selectedSubcategory.value): ''}
                                options={filteredSubcategories}
                                onChange={item => {
                                    setSelectedSubcategory(item)
                                    console.log(item)
                                    setAllowCancellation(item.allow_cancellations)
                                }}
                                className={`basic-multi-select form-control-m`}
                                classNamePrefix="select"
                                required
                                />
                        </Col>
                                <Col md={12}>
                                        <label htmlFor="name">product Title</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            className="form-control form-control-m"
                                            defaultValue={ product ? product.title: ''}
                                        /> 
                                </Col>
                                <Col md={6}>
                                        <label htmlFor="currency">Select Currency</label>
                                        <Select
                                            id="currency"
                                            name="currency"
                                            value={product ? currencies.filter(option => option.value === product.currency_code): ''}
                                            options={currencies}
                                            onChange={item => setSelectedCurrency(item.value)}
                                            className={`basic-multi-select form-control-m`}
                                            classNamePrefix="select"
                                            isDisabled={true}
                                            />
                                </Col>
                                {selectedProductType === "CBIX7" ?
                            '':
                                <Col md={6}>
                                        <label htmlFor="name">Product Amount (CBI)</label>
                                        <input
                                            type="text"
                                            id="price"
                                            name="price"
                                            className="form-control form-control-m"
                                            defaultValue={product ? product.price : ''}
                                            onChange={event => {
												if(!isNaN(+event.target.value)){
													setErrorAmount(true)
												}else{
													setErrorAmount(false)
												}
											}}
                                        />
                                        <label hidden={errorAmount} className="text-danger" htmlFor="name">Please enter a valid amount</label>
                                </Col>}
                                <Col md={6} hidden={show}>
							<label htmlFor="educator_persantage">Educator Persentage Fee (%) </label>
                                        <input
                                            type="text"
                                            id="educator_percentage_fx"
                                            name="educator_percentage_fx"
                                            className="form-control form-control-m"
                                            defaultValue={ fees.educator_percentage ? fees.educator_percentage : null}
											onChange={event => {
												if(!isNaN(+event.target.value)){
													setErrorEducator(true)
												}else{
													setErrorEducator(false)
												}
											}}
                                        />
										<label hidden={errorEducator} className="text-danger" htmlFor="name">Please enter a valid amount</label>
                                </Col>
								<Col md={6} hidden={show}>
                                        <label htmlFor="name">Registration Persentage Fee (%) </label>
                                        <input
                                            type="text"
                                            id="registration_percentage_fx"
                                            name="registration_percentage_fx"
                                            className="form-control form-control-m"
                                            defaultValue={ fees.registration_percentage ? fees.registration_percentage : null}
											onChange={event => {
												if(!isNaN(+event.target.value)){
													setErrorReg(true)
												}else{
													setErrorReg(false)
												}
											}}
                                        />
                                </Col>
                                <Col md={6} hidden={showFixedPlan}>
                                        <label htmlFor="name">Estimated daily Interest (%)</label>
                                        <input
                                            type="text"
                                            id="daily_interest"
                                            name="daily_interest"
                                            className="form-control form-control-m"
                                            defaultValue={ fees.daily_interest ? fees.daily_interest : null}
											onChange={event => {
												if(!isNaN(+event.target.value)){
													setErrorReg(true)
												}else{
													setErrorReg(false)
												}
											}}
                                        />
                                </Col>
                                <Col md={6} hidden={showFixedPlan}>
                                        <label htmlFor="name">Minimum Gross Return (%)</label>
                                        <input
                                            type="text"
                                            id="gross_return"
                                            name="gross_return"
                                            className="form-control form-control-m"
                                            defaultValue={ fees.gross_return ? fees.gross_return : null}
											onChange={event => {
												if(!isNaN(+event.target.value)){
													setErrorReg(true)
												}else{
													setErrorReg(false)
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
                                            defaultValue={product ? product.investment_period : ''}
											onChange={event => {
												if(!isNaN(+event.target.value)){
													setErrorReg(true)
												}else{
													setErrorReg(false)
												}
											}}
                                        />
                                </Col>
                                <Col md={6} hidden={showFixedPlan}>
                                        <label htmlFor="name">Minimum Investment (%) </label>
                                        <input
                                            type="text"
                                            id="minimum_investment"
                                            name="minimum_investment"
                                            className="form-control form-control-m"
                                            defaultValue={product ? product.minimum_investment : ''}
											onChange={event => {
												if(!isNaN(+event.target.value)){
													setErrorReg(true)
												}else{
													setErrorReg(false)
												}
											}}
                                        />
                                </Col>
                                {/** ====================================================CBIX7========================================================== */}
                                <Col md={6} hidden={showCBIx7}>
                                        <label htmlFor="name">Registration Fee </label>
                                        <input
                                            type="text"
                                            id="registration_fee"
                                            name="registration_fee"
                                            className="form-control form-control-m"
                                            defaultValue={ fees.registration_fee ? fees.registration_fee : null}
											onChange={event => {
												if(!isNaN(+event.target.value)){
													setErrorReg(true)
												}else{
													setErrorReg(false)
												}
											}}
                                        />
                                </Col>
                                <Col md={6} hidden={showCBIx7}>
							<label htmlFor="educator_persantage">Educator Percentage Fee (%) </label>
                                        <input
                                            type="text"
                                            id="educator_percentage"
                                            name="educator_percentage"
                                            className="form-control form-control-m"
                                            defaultValue={ fees.educator_percentage ? fees.educator_percentage : null}
											onChange={event => {
												if(!isNaN(+event.target.value)){
													setErrorEducator(true)
												}else{
													setErrorEducator(false)
												}
											}}
                                        />
										<label hidden={errorEducator} className="text-danger" htmlFor="name">Please enter a valid percentage</label>
                                </Col>
                                <Col md={6} hidden={showCBIx7}>
							<label htmlFor="educator_persantage">Slippage Percentage Sell (%) </label>
                                        <input
                                            type="text"
                                            id="slippage_percentage_sell"
                                            name="slippage_percentage_sell"
                                            className="form-control form-control-m"
                                            defaultValue={ fees.slippage_percentage_sell ? fees.slippage_percentage_sell : null}
											onChange={event => {
												if(!isNaN(+event.target.value)){
													setErrorSlippage(true)
												}else{
													setErrorSlippage(false)
												}
											}}
                                        />
										<label hidden={errorSlippage} className="text-danger" htmlFor="name">Please enter a valid percentage</label>
                                </Col>
                                <Col md={6} hidden={showCBIx7}>
							<label htmlFor="educator_persantage">Slippage Percentage Buy (%) </label>
                                        <input
                                            type="text"
                                            id="slippage_percentage_buy"
                                            name="slippage_percentage_buy"
                                            className="form-control form-control-m"
                                            defaultValue={ fees.slippage_percentage_buy ? fees.educator_percentage : null}
											onChange={event => {
												if(!isNaN(+event.target.value)){
													setErrorSlippage(true)
												}else{
													setErrorSlippage(false)
												}
											}}
                                        />
										<label hidden={errorSlippage} className="text-danger" htmlFor="name">Please enter a valid percentage</label>
                                </Col>
  {/** =========================================================Fixed Plan================================================ */}
                            { allowCancellation ?
                                <Col md={6}>
                                        <label htmlFor="name">Cancellation Fee (%) *</label>
                                        <input
                                            type="text"
                                            id="cancellation_fee"
                                            name="cancellation_fee"
											className="form-control form-control-m"
											onChange={event => {
												if(!isNaN(+event.target.value)){
													setErrorReg(true)
												}else{
													setErrorReg(false)
												}
                                            }}
                                            defaultValue={fees.cancellation_fee}
                                            required
                                        />
                                </Col> : ''}
                                <Col md={6}>
                                        <label htmlFor="status">Status</label>
                                        <Select
                                            id="status"
                                            name="status"
                                            value={product ? statusOptions.filter(option => option.label === product.status): ''}
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
                                        EditorState={editorState}
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
        </Row>
        
    );
}