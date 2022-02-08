import React from 'react';
import { CardBody, Col, Row } from 'reactstrap';
import useForm from 'react-hook-form';

export default function AddUser(props) {
    const { roles } = props;
    const { register, handleSubmit, reset, errors } = useForm();

    return (
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
                                    className="form-control"
                                >
                                    <option value="">Select Role</option>
                                    {roles.map(item => (
                                        <option key={item.id} value={item.id}>
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
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
    );
}