import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import { FeatherIcon } from 'components/Members/node_modules/pages/Members/node_modules/components';

const AlertModal = props => {
    const {
        title,
        body,
        show,
        type,
        setShow,
        callback,
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
                    <Col xs={2} className={`text-right mg-t-10 text-${iconClass}`}>
                        <FeatherIcon icon={icon} width="48" height="48" classes="mg-t-0" />
                    </Col>
                    <Col xs={10}>
                        <h3>{title}</h3>
                        <div>{body}</div>
                        <button
                            className="btn btn-dark"
                            onClick={handleClose}
                        >
                            {closeButtonText}
                        </button>
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
