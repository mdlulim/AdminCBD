import React, { useState, useMemo } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Layout } from 'containers';
import { FormsConfig } from 'components';

const FormsConfigurations = props => {
	const [key, setKey] = useState('general');
	const [activeTab, setActiveTab] = useState('referals');
	const breadcrumb = { heading: "Forms Configuration" };
	const [ loginForm, setLoginForm ] = useState({});
    const [ registerForm, setRegisterForm ] = useState({});
    const [ forgotPasswordForm, setForgotPasswordForm ] = useState({});

	const toggleTab = (e, tab) => {
		e.preventDefault();
		setActiveTab(tab);
	};

    useMemo(() => {
        const forms = {
            "login": {
                "type": "form",
                "fields": [{
                    "id": "email",
                    "label": "Your email address",
                    "type": "text",
                    "name": "email",
                    "placeholder": "Your email address",
                    "icon": "flaticon-mail-2",
                    "required": true,
                    "input_group": true,
                    "errors": {
                        "required": "Email Address is required",
                        "invalid": "Please enter a valid email address"
                    }
                }, {
                    "id": "password",
                    "label": "Password",
                    "type": "password",
                    "name": "password",
                    "placeholder": "Password",
                    "icon": "flaticon-password",
                    "required": true,
                    "input_group": true,
                    "input_group_suffix": "mdi mdi-eye-outline",
                    "errors": {
                        "required": "Password is required",
                        "invalid": ""
                    }
                }]
            },
            "register": {
                "type": "wizard",
                "fieldset": [
                    [{
                        "id": "first_name",
                        "label": "Your first name",
                        "type": "text",
                        "name": "first_name",
                        "placeholder": "Your first name",
                        "icon": "flaticon-user",
                        "required": true,
                        "input_group": true,
                        "errors": {
                            "required": "First name is required",
                            "invalid": "Please enter a valid first name"
                        }
                    }, {
                        "id": "last_name",
                        "label": "Your last name",
                        "type": "text",
                        "name": "last_name",
                        "placeholder": "Your last name",
                        "icon": "flaticon-user",
                        "required": true,
                        "input_group": true,
                        "errors": {
                            "required": "Last name is required",
                            "invalid": "Please enter a valid last name"
                        }
                    }, {
                        "id": "email",
                        "label": "Your email address",
                        "type": "text",
                        "name": "email",
                        "placeholder": "Your email address",
                        "icon": "flaticon-mail-2",
                        "required": true,
                        "input_group": true,
                        "errors": {
                            "required": "Email Address is required",
                            "invalid": "Please enter a valid email address"
                        }
                    }, {
                        "id": "mobile",
                        "label": "Your mobile number",
                        "type": "text",
                        "name": "mobile",
                        "placeholder": "Your mobile number",
                        "icon": "bx bx-phone",
                        "required": true,
                        "input_group": true,
                        "errors": {
                            "required": "Mobile number is required",
                            "invalid": "Please enter a valid mobile number"
                        }
                    }],
                    [{
                        "id": "password",
                        "label": "Create Password",
                        "type": "password",
                        "name": "password",
                        "placeholder": "Password",
                        "icon": "flaticon-password",
                        "required": true,
                        "input_group": true,
                        "input_group_suffix": "mdi mdi-eye-outline",
                        "errors": {
                            "required": "Password is required"
                        }
                    }, {
                        "id": "marketing",
                        "label": "I authorize CBI to send me marketing and communication",
                        "type": "checkbox",
                        "name": "marketing",
                        "placeholder": null,
                        "icon": "flaticon-user",
                        "required": true,
                        "input_group": true,
                        "errors": {
                            "required": "Please accept terms and conditions"
                        }
                    }, {
                        "id": "terms_agree",
                        "label": "I have read and agree to CBI terms & conditions",
                        "type": "checkbox",
                        "name": "terms_agree",
                        "placeholder": null,
                        "icon": "flaticon-user",
                        "required": true,
                        "input_group": true,
                        "errors": {
                            "required": "Please accept terms and conditions"
                        }
                    }]
                ],
                "button": [
                    "Continue",
                    "Finish"
                ]
            },
            "forgotPassword": {
                "type": "form",
                "fields": [{
                    "id": "email",
                    "label": "Your registered email address",
                    "type": "text",
                    "name": "email",
                    "placeholder": "Your email address",
                    "icon": "flaticon-mail-2",
                    "required": true,
                    "input_group": true,
                    "errors": {
                        "required": "Email Address is required",
                        "invalid": "Please enter a valid email address"
                    }
                }]
            }
        }
        setLoginForm(forms.login);
        setRegisterForm(forms.register);
        setForgotPasswordForm(forms.forgotPassword)
        console.log(forms);
      }, []);


	return (
		<Layout {...props} breadcrumb={breadcrumb}>
			<Row className="mt-4">
                        <Col md={12} lg={12}>
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
                                                Login
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className={`nav-link show ${activeTab === 'products' ? 'active' : ''}`}
                                                onClick={e => toggleTab(e, 'products')}
                                                data-toggle="tab"
                                                href="/"
                                            >
                                                Registration
                                            </a>
                                        </li>
										<li className="nav-item">
                                            <a
                                                className={`nav-link show ${activeTab === 'transactions' ? 'active' : ''}`}
                                                onClick={e => toggleTab(e, 'transactions')}
                                                data-toggle="tab"
                                                href="/"
                                            >
                                                Forgot Password
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div role="tabpanel" className={`tab-pane show ${activeTab === 'referals' ? 'active' : ''}`}>
                                            <CardBody className="pl-0 pr-0 pb-0">
												<FormsConfig.ConfigLogin loginForm={loginForm} />
                                            </CardBody>
                                        </div>
                                        <div role="tabpanel" className={`tab-pane show ${activeTab === 'products' ? 'active' : ''}`}>
                                            <div className="profile-setting__card">
                                                <CardBody className="pl-0 pr-0 pb-0">
                                                    Tab 2
                                                </CardBody>
                                            </div>
                                        </div>
										<div role="tabpanel" className={`tab-pane show ${activeTab === 'transactions' ? 'active' : ''}`}>
                                            <div className="profile-setting__card">
                                                <CardBody className="pl-0 pr-0 pb-0">
												 Tab 3
                                                </CardBody>
                                            </div>
                                        </div>
										<div role="tabpanel" className={`tab-pane show ${activeTab === 'banking-details' ? 'active' : ''}`}>
                                            <div className="profile-setting__card">
                                                <CardBody className="pl-0 pr-0 pb-0">
												Tab 4
                                                </CardBody>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
			</Row>
		</Layout>
	);
};

export default FormsConfigurations;