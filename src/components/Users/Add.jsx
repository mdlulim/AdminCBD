import React from 'react';
import { CardBody, Col, Row } from 'reactstrap';

export default function AddUser(props) {
    const { roles } = props;
    return (
        <CardBody>
            <form>
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
                                    className="form-control"
                                />
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
                                    className="form-control"
                                />
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
                                    className="form-control"
                                />
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
                                    className="form-control"
                                />
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
                                    className="form-control"
                                />
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
                                    name="type"
                                    className="form-control"
                                    defaultValue="Active"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Active">Active</option>
                                    <option value="Archived">Archived</option>
                                    <option value="Bloacked">Bloacked</option>
                                </select>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </form>
        </CardBody>
    );
}