import React, { useMemo, useRef, useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { EditorState, ContentState, convertFromHTML} from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from 'draft-convert';
import { confirmAlert } from 'react-confirm-alert'; // Import
import DeleteProductAlert from './DeleteProductAlert';
import { ProductService } from '../../providers';
import Select from 'react-select';
import NumberFormat from 'react-number-format';
import useForm from 'react-hook-form';

export default function UpdateProductDetails(props) {
    const { register, handleSubmit, reset, errors } = useForm();
    const [pageLoading, setPageLoading] = useState(true);
    const breadcrumb = { heading: "Product Details" };
    const [disabled, setDisabled] = useState(false);
    const [activeTab, setActiveTab] = useState('referals');
    const [errorReg, setErrorReg] = useState(true);
	const [amountFee, setAmountFee] = useState(0);
	const [error, setError] = useState('');
    const [product, setProduct] = useState({});
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
    const [educator, setEducator] = useState({});
    const [registration, setRegistration] = useState({});
    const [inputs, setInputs] = useState([]);
    const [indicators, setIndicators] = useState({});
    const [reg, setReg] = useState('')
    const [educ, setEduc] = useState('')

    const params = useParams();
    const { id } = params;

    async function fetchData(){
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

        // //setSubcategories(sub)
        if(subcategoryFiltered[0]){
            setSelectedSubcategory({ value: subcategoryFiltered[0].code, label: subcategoryFiltered[0].title, id: subcategoryFiltered[0].id, allow_cancellations: subcategoryFiltered[0].allow_cancellations })
            setAllowCancellation(subcategoryFiltered[0].allow_cancellations);
        }

           setProduct(productDetails);
           setFilteredSubcategories(temp2)
            //  setSelectedSubcategory(subcategoryList.filter(product => product.permakey === permakey));

         const categories1 = await ProductService.getProductCategories();
         const category = categories1.results.filter(option => option.code === productDetails.type)[0];

            if(category){
                setSelectedProductType({ value: category.code, label: category.title, id: category.id });
            }
            setSelectedCurrency(productDetails.currency_code);
            setAmountFee(productDetails.price)
            setSelectedStatus(productDetails.status)
            if(productDetails.body){
                setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(productDetails.body))))
            }

            if(productDetails.product_category && productDetails.product_category.inputFields && productDetails.product_category.inputFields.selectedRows){
                const fields = productDetails.product_category.inputFields.selectedRows;
                const filteredItems = fields.filter(item => (
                    (item.value != 'title' && item.value != 'currency_code' && item.value != 'body' && item.value != 'educator_fee' && item.value != 'educator_percentage' && item.value != 'registration_fee' && item.value != 'registration_percentage')
                  ));
                setInputs(filteredItems);
            }
            setFees(productDetails.fees ? productDetails.fees: {})
            if(productDetails.fees && productDetails.fees.educator_fee ){
                setEduc('Educator Fee (CBI)')
                setEducator({ value: 'educator_fee',  label: 'Educator Fee CBI' })
            }else{
                setEduc('Educator Percentage (%)')
                setEducator({ value: 'educator_percentage', label: 'Educator Percentage (%)' })
            }

            if(productDetails.fees && productDetails.fees.registration_fee ){
                setReg('Registration Fee (CBI)')
                setRegistration({ value: 'registration_fee',  label: 'Registration Fee (CBI)' })
            }else{
                setReg('Registration Percentage (%)')
                setRegistration({ value: 'registration_percentage', label: 'Registration Percentage (%)' })
            }
            setIndicators(productDetails.indicators ? productDetails.indicators : {})
            setPageLoading(false);
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

    async function onChangeFees(value,item) {
        if(item.group === 'fees'){
            let feeTemp = fees;
            feeTemp[item.value] = parseFloat(value);
            setFees(feeTemp)
        }else if(item.group === 'indicators'){
            let indicatorTemp = indicators;
            indicatorTemp[item.value] = parseFloat(value);
            setIndicators(indicatorTemp)
        }
    }

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

          const regOptions = [
            { value: 'registration_fee',  label: 'Registration Fee' },
            { value: 'registration_percentage', label: 'Registration Percentage (%)' }
          ];

          const educatorOptions = [
            { value: 'educator_fee',  label: 'Educator Fee' },
            { value: 'educator_percentage', label: 'Educator Percentage (%)' }
          ];
//====================Update Product===============================

    function onSubmit(data) {
        const {educator, registor} = data;
        setDisabled(true);
        setError('');
            const category = categories.filter(option => option.code === selectedProductType)[0];
            // const title = form.title.value;
            let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
            const prce = data.price;
            if(fees.registration_percentage){
                if(registration.value === 'registration_percentage'){
                    fees.registration_percentage = parseFloat(data.register);
                }else{
                    delete fees['registration_percentage'];
                    fees.registration_fee = parseFloat(data.register);
                }
            }else if(fees.registration_fee){
                if(registration.value === 'registration_fee'){
                    fees.registration_fee = parseFloat(data.register)
                }else{
                    delete fees['registration_fee'];
                    fees.registration_percentage = parseFloat(data.register)
                }
            }

            if(fees.educator_percentage){
                if(registration.value === 'educator_percentage'){
                    fees.educator_percentage = parseFloat(data.educator);
                }else{
                    delete fees['educator_percentage'];
                    fees.educator_fee = parseFloat(data.educator);
                }
            }else if(fees.educator_fee){
                if(registration.value === 'educator_fee'){
                    fees.educator_fee = parseFloat(data.educator)
                }else{
                    delete fees['educator_fee'];
                    fees.educator_percentage = parseFloat(data.educator)
                }
            }

            if(fees.cancellation_fee || data.cancellation_fee){
                    fees.cancellation_fee = data.cancellation_fee
            }
            if(indicators.investment_period || data.investment_period){
                indicators.investment_period = data.investment_period
             }
        let productDate = {
                body: currentContentAsHTML,
                status: selectedStatus,
                title: data.title,
                price: prce ? parseFloat(prce) : 0,
                fees: fees,
                indicators: indicators
            }
            setDisabled(false);
            update(productDate)
    }

    const update = (data) =>{
        ProductService.updateProduct(id, data).then((response) =>{
            if (response.success) {
                return confirmAlert({
                    title: 'Succcess',
                    message: 'Product was successfully updated',
                    buttons: [
                    {
                        label: 'Ok',
                        onClick: () => {
                            window.location = `/products/${id}`;
                        }
                    }
                    ]
                });
            }else{
                setError(response.message ? response.message : 'Something went wrong when while updating product!')
            }
             setDisabled(false);
         })
    }

    const getValue = (data) =>{
        let defualtValue = '';
        if(data.group === 'fees'){
            const arr = []
            if(product.fees && data.value){
                Object.keys(product.fees).forEach(key => arr.push({name: key, value: product.fees[key]}))
                const result = arr.filter(option => option.name === data.value)[0];
                arr.map((item)=>{
                    if(item.name === 'registration_fee' || item.name === 'registration_percentage'){
                        console.log(item.name);
                    }
                    
                });
                defualtValue = result ? result.value : '';
            }
        } else if(data.group === 'indicators' && data.value){
            const arr = []
            if(product.indicators){
                Object.keys(product.indicators).forEach(key => arr.push({name: key, value: product.indicators[key]}))
                const result = arr.filter(option => option.name === data.value)[0];
                defualtValue = result ? result.value : '';
            }
        }else{
            defualtValue = product ? product[data.value] : '';
        }
        return defualtValue
    }
    return (
        <Row>
                    <Col md={12} lg={12}>
                    <form
                        noValidate
                        id="update-product-form"
                        role="form"
                        autoComplete="off"
                        className="text-start"
                        onSubmit={handleSubmit(onSubmit)}
                    >
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
                                            setAllowCancellation(item.allow_cancellations)
                                        }}
                                        className={`basic-multi-select form-control-m`}
                                        classNamePrefix="select"
                                        required
                                        />
                                </Col>
                                <Col md={6}>
                                        <label htmlFor="name">product Title</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            defaultValue={ product ? product.title: ''}
                                            className={`form-control form-control-m ${errors.title ? 'is-invalid' : ''}`}
                                            isDisabled={true}
                                            ref={register({ required: true })}
                                        />
                                         {errors.title && <span className="help-block invalid-feedback">Please enter product title</span>}
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

                                <Col md={6}>
                                        <label htmlFor="currency">Select Educator</label>
                                        <Select
                                            id="select"
                                            name="select"
                                            value={product ? educatorOptions.filter(option => option.value === educator.value): ''}
                                            options={educatorOptions}
                                            onChange={e => {
                                                    setEducator(e)
                                                    if(e.value === 'educator_fee'){
                                                        setEduc('Educator Fee (CBI)')
                                                    }else{
                                                        setEduc('Educator Percentage (%)')
                                                    }
                                                }
                                            }
                                            className={`basic-multi-select form-control-m`}
                                            classNamePrefix="select"
                                            />
                                </Col>
                                <Col md={6}>
                                    <label htmlFor="name">{educ ? educ : 'Educator'}</label>
                                    <input
                                        type="text"
                                        id="educator"
                                        name="educator"
                                        defaultValue={ fees.educator_fee ?  fees.educator_fee : fees.educator_percentage ? fees.educator_percentage :''}
                                        className={`form-control form-control-m ${errors.value ? 'is-invalid' : ''}`}
                                        ref={register({ required: true })}
                                    />
                                    {errors.educator && <span className="help-block invalid-feedback">Please enter educator</span>}

                                </Col>
                                <Col md={6}>
                                        <label htmlFor="currency">Select Registration</label>
                                        <Select
                                            id="select"
                                            name="select"
                                            value={product ? regOptions.filter(option => option.value === registration.value): ''}
                                            options={regOptions}
                                            onChange={e => {
                                                    setRegistration(e)
                                                    if(e.value === 'registration_fee'){
                                                        setReg('Registration Fee (CBI)')
                                                    }else{
                                                        setReg('Registration Percentage (%)')
                                                    }
                                                }
                                            }
                                            className={`basic-multi-select form-control-m`}
                                            classNamePrefix="select"
                                            />
                                </Col>
                                <Col md={6}>
                                    <label htmlFor="name">{ reg ? reg : 'Registration'}</label>
                                    <input
                                        type="text"
                                        id="register"
                                        name="register"
                                        defaultValue={fees.registration_fee ?  fees.registration_fee : fees.registration_percentage ? fees.registration_percentage :''}
                                        className={`form-control form-control-m ${errors.register ? 'is-invalid' : ''}`}
                                        ref={register({ required: true })}
                                    />
                                    {errors.register && <span className="help-block invalid-feedback">Please enter registration</span>}
    

                                </Col>
                                {inputs.map((item)=>{
                                        let value = item.value;

                                            return(
                                                <Col md={6}>
                                                <label htmlFor="name">{item.name}</label>
                                                <input
                                                    type="text"
                                                    id={value}
                                                    name={value}
                                                    defaultValue={getValue(item)}
                                                    className={`form-control form-control-m ${errors.value ? 'is-invalid' : ''}`}
                                                    onChange={event => {
                                                        onChangeFees(event.target.value, item) 
                                                    }}
                                                    ref={register({ required: true })}
                                                />
                                                 {errors.value && <span className="help-block invalid-feedback">Please enter {item.name}</span>}
                                            </Col>);
                                        })
                                    }

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
                                            ref={register({ required: false })}
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
                                </Row>
                                </form>
                                <Col md={6}>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        form="update-product-form"
                                        disabled={disabled}
                                    >
                                        {processing ? 'Processing...' : 'Update Product'}
                                    </button>
                                </Col>
                    </Col>
        </Row>

    );
}