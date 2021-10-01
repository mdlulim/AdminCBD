import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import { FeatherIcon } from 'components';

const ModalChangeStatus = props => {
    const { show, setShow, } = props;
    const { title, body, processing,confirmButtonDisabled, confirmButton, cancelButton, showIcon, size,} = props;

    const handleClose = () => setShow(false);
    return (
        <Modal show={show} onHide={handleClose} centered className="confirm-modal" size={size}>
            <Modal.Body>
                <Row>
                    {showIcon &&
                    <Col xs={2} className="text-right mg-t-10 text-warning">
                        <FeatherIcon icon="alert-triangle" width="48" height="48" classes="mg-t-0" />
                    </Col>}
                    <Col xs={showIcon ? 10 : 12}>
                        <h3>Update CBI Member Status</h3>
                        <div className="mg-b-15">Test</div>
                        <button
                            className="btn btn-primary"
                            onClick={confirmButton.onClick}
                            disabled={confirmButtonDisabled || processing}
                        >
                            {processing ? 'Processing...' : confirmButton.text}
                        </button>
                        <button
                            className="btn btn-dark"
                            onClick={handleClose}
                            disabled={processing}
                        >
                            {cancelButton.text}
                        </button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

ModalChangeStatus.propTypes = {
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
    title: PropTypes.string,
    body: PropTypes.any,
    processing: PropTypes.bool,
    confirmButtonDisabled: PropTypes.bool,
    confirmButton: PropTypes.shape({}),
    cancelButton: PropTypes.shape({}),
    showIcon: PropTypes.bool,
    size: PropTypes.string,
};

ModalChangeStatus.defaultProps = {
    title: 'Confirm',
    body: <p />,
    processing: false,
    confirmButtonDisabled: false,
    cancelButton: { text: 'No' },
    showIcon: false,
    size: 'md',
    confirmButton: {
        text: 'Yes',
        onClick: e => e.preventDefault(),
    },
};

export default ModalChangeStatus;
