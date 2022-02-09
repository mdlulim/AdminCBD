import React, { useMemo, useRef, useState } from 'react';
import { Card, CardBody, Col, Row, CarouselItem } from 'reactstrap';
import { useParams, useHistory } from 'react-router-dom';
import { AuthLayout } from 'containers';
import { EditorState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from 'draft-convert';
import Select from 'react-select';
import { confirmAlert } from 'react-confirm-alert';
import { ProductService } from '../../providers';
import RecentProduct from './RecentProduct';
import Moment from 'react-moment';
import useForm from 'react-hook-form';
import Swal from 'sweetalert2';

const ProductAddNew = props => {
    const breadcrumb = { heading: "New Product" };
    const { register, handleSubmit, reset, errors } = useForm();
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
    const [subcategories, setSubcategories] = useState([]);
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);
    const [products, setProducts] = useState([]);
    const { processing, confirmButtonDisabled, confirmButton, } = props;
    const [selectedCurrency, setSelectedCurrency] = useState('CBI');
    const [selectedProductType, setSelectedProductType] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState({});
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [resetProduct, setRecentProduct] = useState({});
    const [inputs, setInputs] = useState([]);
    const [allowCancellation, setAllowCancellation] = useState(false);
    const [postData, setPostData] = useState({});
    const [pageLoading, setPageLoading] = useState(true);
    const [fees, setFees] = useState({})
    const [indicators, setIndicators] = useState({})
    const [educator, setEducator] = useState({ value: 'educator_fee',  label: 'Educator Fee (CBI)' });
    const [registration, setRegistration] = useState({ value: 'registration_fee',  label: 'Registration Fee (CBI)' });
    const [reg, setReg] = useState('Registration Fee (CBI)')
    const [educ, setEduc] = useState('Educator Fee (CBI)')
    const params = useParams();
    const { id } = params;

    async function fetchData() {
        const poductsList = await ProductService.getProducts();
        setProducts(poductsList.results);
        if(poductsList.results){
            setRecentProduct(poductsList.results[0])
        }

        const categoryList = await ProductService.getProductCategories();
        setCategories(categoryList.results);
        let temp = [];
        categoryList.results.filter(item => (
            temp.push({ value: item.code, label: item.title, id: item.id, inputs: item.inputFields })
        ))
        setProductCategories(temp);

        const subcategories = await ProductService.getProductSubCategories();
        setSubcategories(subcategories.results);
        setPageLoading(false);
    }

    useMemo(() => {
        fetchData()
    }, []);

    const toggleTab = (e, tab) => {
        e.preventDefault();
        setActiveTab(tab);
    };

    const onEditorStateChange = editorState => {
        setEditorState(editorState);
    };

    const currencies = [
        { value: 'CBI', label: 'CBI' },
    ];

    const statusOptions = [
        { value: 'Published', label: 'Published' },
        { value: 'Achived', label: 'Achived' }
    ];
    
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

    async function onChangeCategorySelect(data) {
        const sub = subcategories.filter(option => option.category_id === data.id);
        let temp = [];
        sub.filter(item => (
            temp.push({ value: item.code, label: item.title, id: item.id, allow_cancellations: item.allow_cancellations })
        ))
        setSelectedSubcategory(temp[0])
        setFilteredSubcategories(temp)

        if(data.inputs && data.inputs.selectedRows){
        const filteredItems = data.inputs.selectedRows.filter(item => (
                (item.value != 'title' && item.value != 'status' && item.value != 'currency_code' && item.value != 'body' && item.value != 'educator_fee' && item.value != 'educator_percentage' && item.value != 'registration_fee' && item.value != 'registration_percentage')
          ));
        setInputs(filteredItems);
        setDisabled(false)
        setError('')
        }else{
            setError('Does not have inputs fields');
            setDisabled(true)
        }
    }

    const generateUniqueCode = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function onSubmit(data) {
        setDisabled(true);
        setError('');
        const category = categories.filter(option => option.code === selectedProductType)[0];

        if(registration.value === 'registration_percentage'){
            fees.registration_percentage = parseFloat(data.register);
        }else if(registration.value === 'registration_fee'){
            fees.registration_fee = parseFloat(data.register);
        }

        if(educator.value === 'educator_percentage'){
            fees.educator_percentage = parseFloat(data.educator);
        }else if(educator.value === 'educator_fee'){
            fees.educator_fee = parseFloat(data.educator);
        }
        // const title = form.title.value;
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        const productCode = generateUniqueCode(5);
        let productDate = {
            body: currentContentAsHTML,
            category_id: category.id,
            subcategory_id: selectedSubcategory.id,
            category_title: category.title,
            currency_code: selectedCurrency,
            product_code: productCode,
            status: selectedStatus,
            title: data.title,
            type: selectedProductType,
            price: data.price ? parseFloat(data.price) : 0,
            fees: fees,
            indicators: indicators
        }
        create(productDate)
    }

    const create = (data2) => {
        const title = data2.title;
        let permakey = title.split(' ').join('-').trim().toLowerCase();
        let productExist = products.filter(product => product.permakey === permakey);
        if (!productExist.length) {
            ProductService.addProduct(data2).then((response) => {
                setDisabled(false)
                if (response.status) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Product was added successfully',
                        showConfirmButton: false,
                        timer: 3000
                    });
                    return setTimeout(async function () {
                        window.location.href = '/products/add';
                    }, 3000);
                } else {
                    setError(response.message);
                }
            })
            setDisabled(false)
        } else {
            setDisabled(false)
            setError('This product is already exist')
        }

    }

    const regOptions = [
        { value: 'registration_fee',  label: 'Registration Fee (CBI)' },
        { value: 'registration_percentage', label: 'Registration Percentage (%)' }
      ];

      const educatorOptions = [
        { value: 'educator_fee',  label: 'Educator Fee (CBI)' },
        { value: 'educator_percentage', label: 'Educator Percentage (%)' }
      ];
    return (
        <AuthLayout {...props}
            breadcrumb={{ active: "Add New Product" }}
            loading={pageLoading}
            pageHeading={{
                title: 'Add New Product',
                caption: 'EXPLORE OVERVIEW PRODUCT FOR CRYPTO BASED INNOVATION'
            }}>
                {!pageLoading &&
                <>
            <Row className="mt-4">
                <Card>
                    <CardBody>
                    <form
                        noValidate
                        id="create-product-form"
                        role="form"
                        autoComplete="off"
                        className="text-start"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                            {error ?
                                <div className="alert alert-warning" role="alert">
                                    {error}
                                </div> : ''}
                            <Col lg={12}>
                                <Row >
                                    <Col md={6}>
                                        <label htmlFor="product_type">Product Category *</label>
                                        <Select
                                            id="product_type"
                                            name="product_type"
                                            options={productCategories}
                                            onChange={item => {
                                                setSelectedProductType(item.value);
                                                onChangeCategorySelect(item)
                                            }}
                                            className={`basic-multi-select form-control-m`}
                                            classNamePrefix="select"
                                        />
                                        {/* {errors.product_type && <span className="help-block invalid-feedback">Please select product type</span>} */}
                                    </Col>
                                    <Col md={6}>
                                        <label htmlFor="product_type">Subcategory *</label>
                                        <Select
                                            id="product_subcategory"
                                            name="product_subcategory"
                                            options={filteredSubcategories}
                                            defaultValue={selectedSubcategory ? filteredSubcategories.filter(option => option.id === selectedSubcategory.id) : ''}
                                            onChange={item => {
                                                setSelectedSubcategory(item)
                                            }}
                                            className={`basic-multi-select form-control-m`}
                                            classNamePrefix="select"
                                        />
                                        {/* {errors.product_subcategory && <span className="help-block invalid-feedback">Please select subcategory</span>} */}
                                    </Col>
                                    <Col md={6}>
                                        <label htmlFor="name">Product Title *</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            className={`form-control form-control-m ${errors.title ? 'is-invalid' : ''}`}
                                            ref={register({ required: true })}
                                        />
                                         {errors.title && <span className="help-block invalid-feedback">Please enter product title</span>}
                                    </Col>
                                    <Col md={6}>
                                        <label htmlFor="currency">Select Currency *</label>
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
                                        className={`form-control form-control-m ${errors.educator ? 'is-invalid' : ''}`}
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
                                        className={`form-control form-control-m ${errors.register ? 'is-invalid' : ''}`}
                                        ref={register({ required: true })}
                                    />
                                    {errors.register && <span className="help-block invalid-feedback">Please enter registration</span>}
    

                                </Col>
                                    {inputs.map((item)=>{
                                        let value = item.value;
                                        let group = item.group;
                                            return(
                                                <Col md={6}>
                                                <label htmlFor="name">{item.name}</label>
                                                <input
                                                    type="text"
                                                    id={value}
                                                    name={value}
                                                    className={`form-control form-control-m ${errors.value ? 'is-invalid' : ''}`}
                                                    onChange={event => {
                                                        onChangeFees(event.target.value, item) 
                                                        // if(!isNaN(+event.target.value)){
                                                        //     setErrorEducator(true)
                                                        // }else{
                                                        //     setErrorEducator(false)
                                                        // }
                                                    }}
                                                    ref={register({ required: true })}
                                                />
                                                 {errors.value && <span className="help-block invalid-feedback">Please enter {item.name}</span>}
                                            </Col>
                                            );
                                        })
                                    }

                                    { allowCancellation ?
                                            <Col md={6}>
                                                <label htmlFor="name">Cancellation Fee (%) *</label>
                                                <input
                                                    type="text"
                                                    id="cancellation_fee"
                                                    name="cancellation_fee"
                                                    onChange={event => {
                                                        if (!isNaN(+event.target.value)) {
                                                            setErrorReg(true)
                                                        } else {
                                                            setErrorReg(false)
                                                        }
                                                    }}
                                                    required
                                                    className={`form-control form-control-m ${errors.cancellation_fee ? 'is-invalid' : ''}`}
                                                    ref={register({ required: false })}
                                                />
                                                 {errors.cancellation_fee && <span className="help-block invalid-feedback">Please enter cancellation fee</span>}
                                               
                                            </Col> : ''
                                    }
                                    <Col md={6}>
                                        <label htmlFor="status">Status *</label>
                                        <Select
                                            id="status"
                                            name="status"
                                            options={statusOptions}
                                            onChange={item => setSelectedStatus(item.value)}
                                            className={`basic-multi-select form-control-m ${errors.status ? 'is-invalid' : ''}`}
                                            ref={register({ required: true })}
                                          />
                                          {errors.status && <span className="help-block invalid-feedback">Please select status</span>}
                                       
                                    </Col>
                                    <Col md={12}>
                                        <label htmlFor="name">Description </label>
                                        <Editor
                                            editorState={editorState}
                                            toolbarClassName="toolbarClassName"
                                            wrapperClassName="wrapperClassName"
                                            editorClassName="editorClassName"
                                            onEditorStateChange={onEditorStateChange}
                                            defaultContentState={product.body}
                                        />
                                        <hr />
                                    </Col>
                                    {/* <Col md={6}>
                                        <button disabled={disabled}
                                            type="submit"
                                            form="create-product-form"
                                            className="btn btn-primary"
                                            disabled={confirmButtonDisabled || processing}
                                        >
                                            {processing ? 'Processing...' : 'Add Product'}
                                        </button>
                                    </Col> */}
                                </Row >
                            </Col >
                        </form >
                        <button
                            type="submit"
                            form="create-product-form"
                            className="btn btn-primary"
                            disabled={disabled}
                        >
                            {disabled ? 'Processing...' : 'Add Product'}
                        </button>
                    </CardBody >
                </Card >
            </Row >
            <Row>
                <Card>
                    <CardBody>
                        <table className="table-responsive">
                           
                            <tr>
                                <td width="200">
                                    <div className="user user--rounded user--bordered user--lg margin-bottom-0">
                                        <div className="user__name">
                                            <strong>Product: {resetProduct.title}</strong><br />
                                            <span className="text-muted">Type: {resetProduct.type}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                </td>
                                <td width="130">
                                    <div className="btn btn-outline-success btn-block disabled btn-sm">{resetProduct.status}</div>
                                </td>
                                <td width="180"><center>
                                    <strong><Moment date={resetProduct.created} format="D MMM YYYY" /></strong><br />
                                    <span className="text-muted"><Moment date={resetProduct.created} format="hh:mm:ss" /></span>
                                </center>
                                </td>
                                <td width="40">
                                    <a href={'/products/' + resetProduct.id} className="btn btn-secondary btn-sm btn-icon">
                                        <span className="fa fa-eye"></span>
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </CardBody>
                </Card>
            </Row>
            </>}
        </AuthLayout >
    );
};

export default ProductAddNew;
