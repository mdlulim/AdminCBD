import React from 'react';
import { Col, Row } from 'reactstrap';
import { Modal } from 'react-bootstrap';

export default function EditProfile(props) {
    const {
        show,
        setShow,
        first_name,
        last_name,
        mobile,
        email,
    } = props;

    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose} centered className="confirm-modal" size="lg">
            <Modal.Header closeButton>
                <h4 className="modal-title">
                    Edit your profile
                </h4>
            </Modal.Header>
            <Modal.Body>
                <form id="change-password-form">
                    <Row>
                        <Col xs={9}>
                            <p className="text-muted margin-bottom-20">
                                Use form below to update your profile. The email address and username are used
                                for your login access, and should you need to update please contact your
                                system administrator.
                            </p>
                            <div className="form-group">
                                <label>First name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your first name"
                                    defaultValue={first_name}
                                />
                            </div>
                            <div className="form-group">
                                <label>Last name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your last name"
                                    defaultValue={last_name}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    defaultValue={email}
                                    readOnly
                                /> 
                            </div>
                            <div className="form-group">
                                <label>Phone number</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    placeholder="Enter your mobile number (optional)"
                                    defaultValue={mobile}
                                /> 
                            </div>
                        </Col> 
                        <Col xs={3}>
                            <h5>Profile Photo</h5>
                            <div className="user user--huge">
                                <a href="#" className="user__button w-100 h-120px lh-120px">
                                    <span className="fa fa-plus" />
                                </a>
                            </div>
                            <button
                                type="button"
                                className="btn btn-light btn-block margin-top-10"
                            >
                                Upload Photo
                            </button>
                        </Col>
                    </Row>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-light" onClick={handleClose}>Close</button>
                <button
                    type="submit"
                    className="btn btn-secondary"
                    form="change-password-form"
                >
                    Save Changes
                </button>
            </Modal.Footer>
        </Modal>
    );
}
