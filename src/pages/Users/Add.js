import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Row  } from 'reactstrap';
import { Common, Users } from 'components';
import { AuthLayout } from 'containers';
import { UserService } from 'providers';
import { confirmAlert } from 'react-confirm-alert';
import useForm from 'react-hook-form';

export default function AddUserPage(props) {
    const [roles, setRoles] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [error, setError] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState('');
    const { register, handleSubmit, reset, errors } = useForm();

    async function fetchData() {
        const roles = await UserService.getRoles();
        setRoles(roles.results || []);
        setPageLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const onSubmit = async (data) => {
        setDisabled(true)
        setProcessing(true)
       
        const role = roles.filter(option => option.id === data.group_id)[0];
        const data2 = {
                first_name  : data.first_name,
                last_name   : data.last_name,
                email       : data.email,
                username    : data.username,
                mobile      : data.mobile,
                status      : data.status,
                group_id    : data.group_id,
                verified    : true,
                permissions : role.permissions,
            };
            console.log(data2)
            const response = await UserService.createUser(data);
            console.log(response);
                if (response.success) {
                    setDisabled(false)
                    setProcessing(false)
                    setError('')
                    return confirmAlert({
                        title: 'Succcess',
                        message: 'User was successfully added',
                        buttons: [
                            {
                                label: 'Ok',
                                onClick: () => {
                                    window.location = `/users/add`;
                                }
                            }
                        ]
                    });
                } else {
                    setDisabled(false)
                    setProcessing(false)
                    setError(response.message);
                }
                setDisabled(false);
                setProcessing(false);
    }

    return (
        <AuthLayout
            {...props}
            breadcrumb={{
                active: "Add",
                items: [{
                    title: 'Dashboard', link: '/dashboard'
                }, {
                    title: 'Users', link: '/users'
                }],
            }}
            pageHeading={{
                title: 'Capture New User',
                caption: 'EXPLORE USER ROLES FOR CRYPTO BASED INNOVATION',
            }}
        >
            {!pageLoading &&
            <div id="users">
                <form
                    noValidate
                    id="add-user-form"
                    role="form"
                    autoComplete="off"
                    className="text-start"
                    onSubmit={handleSubmit(onSubmit)}
                >
                { error ? 
				<div className="alert alert-warning" role="alert">
				{error}
				</div> : ''}
                <Card className="margin-bottom-15">
                    <Common.Widget
                        icon="li-pencil5"
                        title="Add User"
                        subtitle="Specify new user information"
                        wrapperClass="widget--items-middle"
                    />
                    <CardBody>
                <Row>
                    <Col xs={12} sm={8}>
                        <Row className="form-group">
                            <label className="col-sm-2 col-form-label">
                                Role
                                <span className="text-danger">*</span>
                            </label>
                            <Col sm={10}>
                                <select
                                    id="group_id"
                                    type="text"
                                    name="group_id"
                                    className={`form-control ${errors.group_id ? 'is-invalid' : ''}`}
                                    ref={register({ required: true })}
                                >
                                    <option value="">Select User Role</option>
                                    {roles.map(item => (
                                        <option key={item.id} value={item.id}>
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.group_id && <span className="help-block invalid-feedback">Please select user role</span>}
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <label className="col-sm-2 col-form-label">
                                First Name
                                <span className="text-danger">*</span>
                            </label>
                            <Col sm={10}>
                                <input
                                    id="first_name"
                                    type="text"
                                    name="first_name"
                                    className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
                                    placeholder="Enter first name"
                                    ref={register({ required: true })}
                                />
                                {errors.first_name && <span className="help-block invalid-feedback">Please enter first name</span>}
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <label className="col-sm-2 col-form-label">
                                Last Name
                                <span className="text-danger">*</span>
                            </label>
                            <Col sm={10}>
                                <input
                                    id="last_name"
                                    type="text"
                                    name="last_name"
                                    className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
                                    placeholder="Enter last name"
                                    ref={register({ required: true })}
                                />
                                {errors.last_name && <span className="help-block invalid-feedback">Please enter last name</span>}
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <label className="col-sm-2 col-form-label">
                                Email Address
                                <span className="text-danger">*</span>
                            </label>
                            <Col sm={10}>
                                <input
                                    id="email"
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    placeholder="Enter email"
                                    ref={register({ required: true })}
                                />
                                {errors.email && <span className="help-block invalid-feedback">Please enter email</span>}
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <label className="col-sm-2 col-form-label">
                                Username
                                <span className="text-danger">*</span>
                            </label>
                            <Col sm={10}>
                                <input
                                    id="username"
                                    type="text"
                                    id="username"
                                    name="username"
                                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                    placeholder="Enter  username"
                                    ref={register({ required: true })}
                                />
                                {errors.username && <span className="help-block invalid-feedback">Please enter username</span>}
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <label className="col-sm-2 col-form-label">
                                Contact Number
                            </label>
                            <Col sm={10}>
                                <input
                                    id="mobile"
                                    type="text"
                                    id="mobile"
                                    name="mobile"
                                    className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                                    placeholder="Enter mobile number"
                                    ref={register({ required: true })}
                                />
                                {errors.mobile && <span className="help-block invalid-feedback">Please enter mobile</span>}
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <label className="col-sm-2 col-form-label">
                                Status
                                <span className="text-danger">*</span>
                            </label>
                            <Col sm={10}>
                                <select
                                    id="type"
                                    type="text"
                                    name="status"
                                    defaultValue="Active"
                                    className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                                    ref={register({ required: true })}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Active">Active</option>
                                    <option value="Archived">Archived</option>
                                    <option value="Bloacked">Bloacked</option>
                                </select>
                                {errors.status && <span className="help-block invalid-feedback">Please select status</span>}
                            </Col>
                        </Row>
                    </Col>
                </Row>
        </CardBody>
                    {/* <Users.Add roles={roles} /> */}
                </Card>
             </form>
             <div className="text-right margin-bottom-20">
             <button 
                type="submit" 
                form="add-user-form"
                className="btn btn-secondary"
                disabled={disabled}>
                    { disabled ? 'Preocessing...' : 'Save Changes'} 
                </button>
                </div>
            </div>}
        </AuthLayout>
    );
} 
