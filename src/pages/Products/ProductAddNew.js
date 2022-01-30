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
import RecentProduct from './RecentProduct';
import Moment from 'react-moment';
import useForm from 'react-hook-form';
import { TableBody } from '@material-ui/core';

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
    const [allowCancellation, setAllowCancellation] = useState(false);
    const [postData, setPostData] = useState({});
    const [pageLoading, setPageLoading] = useState(true);
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
            temp.push({ value: item.code, label: item.title, id: item.id })
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

    async function onChangeCategorySelect(data) {
        const sub = subcategories.filter(option => option.category_id === data.id);
        console.log(sub[0].code)
        let temp = [];
        sub.filter(item => (
            temp.push({ value: item.code, label: item.title, id: item.id, allow_cancellations: item.allow_cancellations })
        ))
        setSelectedSubcategory(temp[0])
        setFilteredSubcategories(temp)
        if (sub[0].code === 'FX') {
            setShow(false)
            setShowFixedPlan(true)
            setShowCBIx7(true)
        } else if (sub[0].code === 'FP') {
            setShow(true)
            setShowFixedPlan(false)
            setShowCBIx7(true)
        } else if (sub[0].code === 'CBIX7') {
            setShow(true)
            setShowFixedPlan(true)
            setShowCBIx7(false)
        }
        // const title = form.title.value;
    }
    const onSubmitCBI = (event) => {
        event.preventDefault();
        setDisabled(true);
        setError('');
        const form = event.currentTarget;

        const category = categories.filter(option => option.code === selectedProductType)[0];
        // const title = form.title.value;
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        const productData = {
            body: currentContentAsHTML,
            category_id: category.id,
            category_title: category.title,
            currency_code: selectedCurrency,
            product_code: "KJHYAS",
            status: selectedStatus,
            title: form.title.value,
            type: selectedProductType,
            price: 0,
            fees: {
                educator_percentage: parseFloat(form.educator_persantage_fee.value),
                registration_fee: parseFloat(form.registration_fee.value),
                slippage_percentage_buy: parseFloat(form.slippage_persantage_buy.value),
                slippage_percentage_sell: parseFloat(form.slippage_persantage_sell.value),
            }
        }
        ProductService.addProduct(productData).then((response) => {
            if (response.status) {
                setShow(true);
                confirmAlert({
                    title: 'Confirm submit',
                    message: 'Product was added successfully',
                    buttons: [
                        {
                            label: 'Yes',
                            onClick: () => {
                                window.location = '/products/add';
                            }
                        }
                    ]
                })
            } else {
                setError('Something went wrong please make you submited correct values');
            }
            setDisabled(false);
        })
    }

    const onSubmitProduct = (event) => {
        event.preventDefault();
        setDisabled(true);
        setError('');
        const form = event.currentTarget;

        const category = categories.filter(option => option.code === selectedProductType)[0];
        // const title = form.title.value;
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        const productData = {
            body: currentContentAsHTML,
            category_id: category.id,
            category_title: category.title,
            currency_code: selectedCurrency,
            educator_percentage: 4,
            product_code: "JGJHGDSD",
            fees: {
                educator_percentage: parseFloat(form.registration_persantage.value),
                registration_percentage: parseFloat(form.educator_persantage.value),
            },
            status: selectedStatus,
            title: form.title.value,
            type: selectedProductType,
            price: parseFloat(form.price.value),
        }
        console.log(productData);
        ProductService.addProduct(productData).then((response) => {
            if (response.status) {
                setShow(true);
                confirmAlert({
                    title: 'Confirm submit',
                    message: 'Product was added successfully',
                    buttons: [
                        {
                            label: 'Yes',
                            onClick: () => {
                                window.location = '/products/add';
                            }
                        }
                    ]
                })
            } else {
                setError('error message');
            }
            setDisabled(false);
        })
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
        console.log("=============================TEST SUBMIT================================")
        console.log(data)
        setDisabled(true);
        setError('');
        const category = categories.filter(option => option.code === selectedProductType)[0];
        // const title = form.title.value;
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        const productCode = generateUniqueCode(5);
        if (selectedProductType === 'CBIX7') {
            const {title, educator_persantage_fee, registration_fee, slippage_persantage_buy, slippage_persantage_sell, cancellation_fee} = data;
            const data2 = {
                body: currentContentAsHTML,
                category_id: category.id,
                subcategory_id: selectedSubcategory.id,
                category_title: category.title,
                currency_code: selectedCurrency,
                product_code: productCode,
                status: selectedStatus,
                title: title,
                type: selectedProductType,
                price: 0,
                fees: {
                    educator_percentage: parseFloat(educator_persantage_fee),
                    registration_fee: parseFloat(registration_fee),
                    slippage_percentage_buy: parseFloat(slippage_persantage_buy),
                    slippage_percentage_sell: parseFloat(slippage_persantage_sell),
                    cancellation_fee: parseFloat(cancellation_fee),
                }
            }
            create(data2)

        } else if (selectedProductType === 'FX') {
            const {title, price, educator_percentage, registration_percentage, cancellation_fee} = data;
            const data2 = {
                body: currentContentAsHTML,
                category_id: category.id,
                subcategory_id: selectedSubcategory.id,
                category_title: category.title,
                currency_code: selectedCurrency,
                educator_percentage: 4,
                product_code: productCode,
                fees: {
                    educator_percentage: parseFloat(educator_percentage),
                    registration_percentage: parseFloat(registration_percentage),
                    cancellation_fee: allowCancellation ? parseFloat(cancellation_fee) : null,
                },
                status: selectedStatus,
                title: title,
                type: selectedProductType,
                price: parseFloat(price),
            }
            create(data2)

        } else if (selectedProductType === 'FP') {
            const {title, price, investment_period, minimum_investment, estimated_daily_interest, minimum_gross_return, cancellation_fee} = data;
            const data2 = {
                body: currentContentAsHTML,
                category_id: category.id,
                subcategory_id: selectedSubcategory.id,
                category_title: category.title,
                currency_code: selectedCurrency,
                investment_period: parseFloat(investment_period),
                minimum_investment: parseFloat(minimum_investment),
                price: parseFloat(price),
                product_code: productCode,
                type: selectedProductType,
                status: selectedStatus,
                fees: {
                    daily_interest: parseFloat(estimated_daily_interest),
                    gross_return: parseFloat(minimum_gross_return),
                    cancellation_fee: allowCancellation ? parseFloat(cancellation_fee) : null,
                },
                title: title
            }
            create(data2)
        }

    }

    const create = (data) => {
        const title = data.title;
        let permakey = title.split(' ').join('-').trim().toLowerCase();
        let productExist = products.filter(product => product.permakey === permakey);
        if (!productExist.length) {
            ProductService.addProduct(data).then((response) => {
                if (response.status) {
                    setShow(true);
                    confirmAlert({
                        title: 'Confirm submit',
                        message: 'Product was added successfully',
                        buttons: [
                            {
                                label: 'Yes',
                                onClick: () => {
                                    window.location = '/products/add';
                                }
                            }
                        ]
                    })
                } else {
                    setError('Something went wrong please make you submited correct values');
                }
                setDisabled(false);
            })

        } else {
            setError('This product is already exist')
        }

    }
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
                                    <Col md={12}>
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
                                    {selectedProductType === "CBIX7" ?
                                        '' :
                                        <Col md={6}>
                                            <label htmlFor="name">Product Amount (CBI)</label>
                                            <input
                                                type="text"
                                                id="price"
                                                name="price"
                                                onChange={event => {
                                                    if (!isNaN(+event.target.value)) {
                                                        setErrorAmount(true)
                                                    } else {
                                                        setErrorAmount(false)
                                                    }
                                                }}
                                                className={`form-control form-control-m ${errors.price ? 'is-invalid' : ''}`}
                                                ref={register({ required: true })}
                                            />
                                             {errors.price && <span className="help-block invalid-feedback">Please enter product title</span>}
                                         </Col>}
                                    <Col md={6} hidden={show}>
                                        <label htmlFor="name">Registration Percentage Fee (%) </label>
                                        <input
                                            type="text"
                                            id="registration_percentage"
                                            name="registration_percentage"
                                            onChange={event => {
                                                if (!isNaN(+event.target.value)) {
                                                    setErrorReg(true)
                                                } else {
                                                    setErrorReg(false)
                                                }
                                            }}
                                            className={`form-control form-control-m ${errors.registration_percentage ? 'is-invalid' : ''}`}
                                            ref={register({ required: true })}
                                        />
                                         {errors.registration_percentage && <span className="help-block invalid-feedback">Please enter registration fee</span>}
                                    
                                    </Col>
                                    <Col md={6} hidden={show}>
                                        <label htmlFor="educator_percentage">Educator Percentage Fee (%) </label>
                                        <input
                                            type="text"
                                            id="educator_percentage"
                                            name="educator_percentage"
                                            onChange={event => {
                                                if (!isNaN(+event.target.value)) {
                                                    setErrorEducator(true)
                                                } else {
                                                    setErrorEducator(false)
                                                }
                                            }}
                                            className={`form-control form-control-m ${errors.educator_percentage ? 'is-invalid' : ''}`}
                                            ref={register({ required: true })}
                                        />
                                         {errors.educator_percentage && <span className="help-block invalid-feedback">Please enter educator percentage fee</span>}
                                       </Col>
                                    {/** =========================================================CBIX7================================================ */}
                                    <Col md={6} hidden={showCBIx7}>
                                        <label htmlFor="name">Registration Fee </label>
                                        <input
                                            type="text"
                                            id="registration_fee"
                                            name="registration_fee"
                                            onChange={event => {
                                                if (!isNaN(+event.target.value)) {
                                                    let value = event.target.value / 100 * amountFee
                                                    setRegistrationFee(value)
                                                    setErrorReg(true)
                                                } else {
                                                    setErrorReg(false)
                                                    setRegistrationFee(0)
                                                }
                                            }}
                                            className={`form-control form-control-m ${errors.registration_fee ? 'is-invalid' : ''}`}
                                            ref={register({ required: true })}
                                        />
                                         {errors.registration_fee && <span className="help-block invalid-feedback">Please enter registration fee</span>}
                                       
                                    </Col>
                                    <Col md={6} hidden={showCBIx7}>
                                        <label htmlFor="educator_persantage">Educator Percentage Fee (%) {educatorFee ? <NumberFormat thousandSeparator={true} displayType={'text'} prefix={'CBI '} value={educatorFee} /> : ''}</label>
                                        <input
                                            type="text"
                                            id="educator_persantage_fee"
                                            name="educator_persantage_fee"
                                            onChange={event => {
                                                if (!isNaN(+event.target.value)) {
                                                    let value = event.target.value / 100 * amountFee
                                                    setEducatorFee(value)
                                                    setErrorEducator(true)
                                                } else {
                                                    setErrorEducator(false)
                                                    setEducatorFee(0)
                                                }
                                            }}
                                            className={`form-control form-control-m ${errors.educator_persantage_fee ? 'is-invalid' : ''}`}
                                            ref={register({ required: true })}
                                        />
                                         {errors.educator_persantage_fee && <span className="help-block invalid-feedback">Please enter educator persantage fee</span>}
                                       </Col>
                                    <Col md={6} hidden={showCBIx7}>
                                        <label htmlFor="educator_persantage">Slippage Percentage Sell (%) {educatorFee ? <NumberFormat thousandSeparator={true} displayType={'text'} prefix={'CBI '} value={sleppageFee} /> : ''}</label>
                                        <input
                                            type="text"
                                            id="slippage_persantage_sell"
                                            name="slippage_persantage_sell"
                                            onChange={event => {
                                                if (!isNaN(+event.target.value)) {
                                                    setErrorSlippage(true)
                                                } else {
                                                    setErrorSlippage(false)
                                                }
                                            }}
                                            className={`form-control form-control-m ${errors.slippage_persantage_sell ? 'is-invalid' : ''}`}
                                            ref={register({ required: true })}
                                        />
                                         {errors.slippage_persantage_sell && <span className="help-block invalid-feedback">Please enter slippage persantage sell</span>}
                                        </Col>
                                    <Col md={6} hidden={showCBIx7}>
                                        <label htmlFor="educator_persantage">Slippage Percentage Buy (%) {educatorFee ? <NumberFormat thousandSeparator={true} displayType={'text'} prefix={'CBI '} value={sleppageFee} /> : ''}</label>
                                        <input
                                            type="text"
                                            id="slippage_persantage_buy"
                                            name="slippage_persantage_buy"
                                            onChange={event => {
                                                if (!isNaN(+event.target.value)) {

                                                    setErrorSlippage(true)
                                                } else {
                                                    setErrorSlippage(false)
                                                }
                                            }}
                                            className={`form-control form-control-m ${errors.slippage_persantage_buy ? 'is-invalid' : ''}`}
                                            ref={register({ required: true })}
                                        />
                                         {errors.slippage_persantage_buy && <span className="help-block invalid-feedback">Please enter slippage persantage buy</span>}
                                       </Col>
                                    {/** =========================================================Fixed Plan================================================ */}
                                    <Col md={6} hidden={showFixedPlan}>
                                        <label htmlFor="name">Estimated daily Interest (%)</label>
                                        <input
                                            type="text"
                                            id="registration_persantage"
                                            name="estimated_daily_interest"
                                            onChange={event => {
                                                if (!isNaN(+event.target.value)) {
                                                    let value = event.target.value / 100 * amountFee
                                                    setRegistrationFee(parseFloat(value).toFixed(2))
                                                    setErrorReg(true)
                                                } else {
                                                    setErrorReg(false)
                                                    setRegistrationFee(0)
                                                }
                                            }}
                                            className={`form-control form-control-m ${errors.registration_persantage ? 'is-invalid' : ''}`}
                                            ref={register({ required: true })}
                                        />
                                         {errors.registration_persantage && <span className="help-block invalid-feedback">Please enter registration persantage</span>}
                                       
                                    </Col>
                                    <Col md={6} hidden={showFixedPlan}>
                                        <label htmlFor="name">Minimum Gross Return (%) </label>
                                        <input
                                            type="text"
                                            id="registration_persantage"
                                            name="minimum_gross_return"
                                            onChange={event => {
                                                if (!isNaN(+event.target.value)) {
                                                    let value = event.target.value / 100 * amountFee
                                                    setRegistrationFee(parseFloat(value).toFixed(2))
                                                    setErrorReg(true)
                                                } else {
                                                    setErrorReg(false)
                                                    setRegistrationFee(0)
                                                }
                                            }}
                                            className={`form-control form-control-m ${errors.registration_persantage ? 'is-invalid' : ''}`}
                                            ref={register({ required: true })}
                                        />
                                         {errors.registration_persantage && <span className="help-block invalid-feedback">Please enter registration persantage</span>}
                                       
                                    </Col>
                                    <Col md={6} hidden={showFixedPlan}>
                                        <label htmlFor="name">Investment Period (Weeks)</label>
                                        <input
                                            type="text"
                                            id="investment_period"
                                            name="investment_period"
                                            onChange={event => {
                                                if (!isNaN(+event.target.value)) {
                                                    let value = event.target.value / 100 * amountFee
                                                    setRegistrationFee(parseFloat(value).toFixed(2))
                                                    setErrorReg(true)
                                                } else {
                                                    setErrorReg(false)
                                                    setRegistrationFee(0)
                                                }
                                            }}
                                            className={`form-control form-control-m ${errors.investment_period ? 'is-invalid' : ''}`}
                                            ref={register({ required: true })}
                                        />
                                         {errors.investment_period && <span className="help-block invalid-feedback">Please enter investment period</span>}
                                       
                                    </Col>
                                    <Col md={6} hidden={showFixedPlan}>
                                        <label htmlFor="name">Minimum Investment (CBI)</label>
                                        <input
                                            type="text"
                                            id="minimum_investment"
                                            name="minimum_investment"
                                            onChange={event => {
                                                if (!isNaN(+event.target.value)) {
                                                    setErrorReg(true)
                                                } else {
                                                    setErrorReg(false)
                                                }
                                            }}
                                            className={`form-control form-control-m ${errors.minimum_investment ? 'is-invalid' : ''}`}
                                            ref={register({ required: true })}
                                        />
                                         {errors.minimum_investment && <span className="help-block invalid-feedback">Please enter educator minimum investment</span>}
                                       
                                    </Col>
                                    {
                                        allowCancellation ?
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
                                                    ref={register({ required: true })}
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
                                          />
                                         {/* {errors.status && <span className="help-block invalid-feedback">Please select status</span>} */}
                                       
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
                            disabled={confirmButtonDisabled || processing}
                        >
                            {processing ? 'Processing...' : 'Add Product'}
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
