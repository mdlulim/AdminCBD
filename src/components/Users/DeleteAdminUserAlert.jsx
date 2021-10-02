import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import { FeatherIcon } from 'components';

const AlertModal = props => {
    const {
        title,
        user,
        show,
        type,
        setShow,
        callback,
        processing,
        confirmButtonDisabled, confirmButton,
        closeButtonText,
    } = props;

    let icon = 'alert-triangle';
    let iconClass = type;

    if (type === 'error') {
        icon = 'slash';
        iconClass = 'danger';
    }
    if (type === 'success') {
        icon = 'check';
    }

    const handleClose = () => {
        setShow(false);
        if (callback) callback();
    };

    return (
        <Modal show={show} onHide={handleClose} centered className="confirm-modal">
            <Modal.Body>
                <Row>
                    <Col xs={2} className={`text-right mg-t-10 text-danger text-${iconClass}`}>
                        <FeatherIcon icon={icon} width="48" height="48" classes="mg-t-0" />
                    </Col>
                    <Col xs={10}>
                        <h3 className="text-danger">Delete Admin User</h3>
                        {user ? 
                             <div className="form-group">
                                    <label htmlFor="fullname">Full Names</label>
                                    <input
                                        type="text"
                                        id="fullname"
                                        className="form-control form-control-m"
                                        value={user.first_name+' '+user.last_name}
                                        disabled
                                    />
                                </div>
                                 : ''}
                                 {user ? 
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="form-control form-control-m"
                                        value={user.username}
                                        disabled
                                    />
                                </div>
                                 : ''}
                                {user ? 
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="text"
                                        id="email"
                                        className="form-control form-control-m"
                                        value={user.email}
                                        disabled
                                    />
                                </div>
                                 : ''}
                        <h5 className="text-danger">Are you sure you want to delete this member?</h5>
                        {''}
                        <Row>
                        <Col md={6}>
                        <button
                                        className="btn btn-dark btn-rounded"
                                        onClick={handleClose}
                                        disabled={processing}
                                    >
                                    {'Cancel'}
                                </button>
                            </Col>
                            <Col md={6} >
                            <button
                                        className="btn btn-danger btn-rounded float-right"
                                        onClick={''}
                                        disabled={confirmButtonDisabled || processing}
                                    >
                                    {processing ? 'Processing...' : 'Update'}
                                </button>
                            </Col>
                            </Row>
                    
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

AlertModal.propTypes = {
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
    title: PropTypes.string,
    body: PropTypes.any,
    type: PropTypes.string,
    callback: PropTypes.func,
    confirmButton: PropTypes.shape({}),
    cancelButton: PropTypes.shape({}),
    closeButtonText: PropTypes.string,
};

AlertModal.defaultProps = {
    title: 'Alert',
    body: <p />,
    type: 'warning',
    callback: null,
    closeButtonText: 'OK',
};

export default AlertModal;
