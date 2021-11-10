import React, { useMemo, useRef, useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { useParams, useHistory } from 'react-router-dom';
import { AuthLayout } from 'containers';
import { Products } from 'components';
import { EditorState, ContentState} from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from 'draft-convert';
import { MemberService, ProductService } from '../../providers';
import { confirmAlert } from 'react-confirm-alert'; // Import
import Select from 'react-select';
import NumberFormat from 'react-number-format';

const ProductDetails = props => {
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
           console.log(res.data);
           
            const productDetails = res.data.data;
            if(productDetails){
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
            }
            return 'Mdu';
            //setEditorState(ContentState.convertToHTML(productDetails.body));
           // setEditorState(EditorState.createWithContent(ContentState.createFromText(productDetails.body)));
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
		<AuthLayout {...props}
        breadcrumb={{ active: "Products Details" }}
        pageHeading={{
            title: 'Products Details',
            caption: 'EXPLORE OVERVIEW PRODUCTS DETAILS FOR CRYPTO BASED INNOVATION'
        }}>
                    <Row>
                        <Col md={12}>
                            <Card>
                                <CardBody>
                                <ul className="nav nav-tabs nav-tabs__round mt-0">
                                        <li className="nav-item">
                                            <a
                                                className={`nav-link show ${activeTab === 'referals' ? 'active' : ''}`}
                                                onClick={e => toggleTab(e, 'referals')}
                                                data-toggle="tab"
                                                href="/"
                                            >
                                                Product Details
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className={`nav-link show ${activeTab === 'products' ? 'active' : ''}`}
                                                onClick={e => toggleTab(e, 'products')}
                                                data-toggle="tab"
                                                href="/"
                                            >
                                                Members
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div role="tabpanel" className={`tab-pane show ${activeTab === 'referals' ? 'active' : ''}`}>
                                            <CardBody className="pl-0 pr-0 pb-0">
                                                <Products.UpdateProductDetails />
                                            </CardBody>
                                        </div>
                                        <div role="tabpanel" className={`tab-pane show ${activeTab === 'products' ? 'active' : ''}`}>
                                            <div className="profile-setting__card">
                                                <CardBody className="pl-0 pr-0 pb-0">
                                                    <Products.MembersByProductID />
                                                </CardBody>
                                            </div>
                                        </div>
										<div role="tabpanel" className={`tab-pane show ${activeTab === 'transactions' ? 'active' : ''}`}>
                                            <div className="profile-setting__card">
                                                <CardBody className="pl-0 pr-0 pb-0">
                                                </CardBody>
                                            </div>
                                        </div>
										<div role="tabpanel" className={`tab-pane show ${activeTab === 'banking-details' ? 'active' : ''}`}>
                                            <div className="profile-setting__card">
                                                <CardBody className="pl-0 pr-0 pb-0">
                                                </CardBody>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        
                    </Row>
			
		</AuthLayout>
	);
};

export default ProductDetails;
