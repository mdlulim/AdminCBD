import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import { FeatherIcon } from 'components';

const AlertModal = props => {
    const {
        title,
        role,
        show,
        type,
        setShow,
        callback,
        processing,
        confirmButtonDisabled, confirmButton,
        closeButtonText,
    } = props;

    let icon = 'edit';
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
                    <Col xs={2} className={`text-right mg-t-10 text-info`}>
                        <FeatherIcon icon={icon} width="48" height="48" classes="mg-t-0" />
                    </Col>
                    <Col xs={10}>
                        <h3 className="text-info">Update User Role</h3>
                        {role ? 
                             <div className="form-group">
                                    <label htmlFor="role">Name</label>
                                    <input
                                        type="text"
                                        id="role"
                                        className="form-control form-control-m"
                                        value={role.name}
                                        disabled
                                    />
                                </div>
                                 : ''}
                                 {role ? 
                             <div className="form-group">
                                    <label htmlFor="role">Label</label>
                                    <input
                                        type="text"
                                        id="role"
                                        className="form-control form-control-m"
                                        value={role.label}
                                        
                                    />
                                </div>
                                 : ''}
                                 {role ? 
                             <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        type="text"
                                        id="description"
                                        className="form-control form-control-m"
                                        value={role.description}
                                    />
                                </div>
                                 : ''}
                               
                        
                        <Row>
                        <Col md={6}>
                        <button
                                        className="btn btn-dark"
                                        onClick={handleClose}
                                        disabled={processing}
                                    >
                                    {'Cancel'}
                                </button>
                            </Col>
                            <Col md={6} >
                            <button
                                        className="btn btn-info float-right"
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
