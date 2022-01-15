import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Form } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import { FeatherIcon } from 'components';
import Select from 'react-select';
import { MemberService, ProductService } from '../../providers';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const ModalCancelChangeStatus = props => {
    const { show, setShow, product } = props;
    const [statuses, setStatuses] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const { title, body, processing, confirmButtonDisabled, confirmButton, cancelButton, showIcon, size, } = props;

    useMemo(() => {
        //setSelectedStatus({ value: member.status,  label: member.status });
    }, []);

    const statusOptions = [
        { value: 'Cancellation Complete', label: 'Cancellation Complete' },
        { value: 'Cancellation Rejected', label: 'Cancellation Rejected' },
    ];
    const onSubmit = (event) => {
        event.preventDefault();
        setDisabled(true);
        setError('');

        if (selectedStatus) {
            ProductService.updateCancellationStatus(product.id, selectedStatus.value).then((response) => {
                if (response.data.success) {
                    setShow(false)
                    return confirmAlert({
                        title: 'Succcess',
                        message: 'Product cancellation was successfully updated',
                        buttons: [
                          {
                            label: 'Ok',
                            onClick: () => {
                                window.location = '/products/cancel';
                            }
                          }
                        ]
                    });
                } else {
                    setError('Something went wrong while trying to update product status');
                }
                setDisabled(false);
            })
        }
        setDisabled(false);
    
      }
    const handleClose = () => setShow(false);

    const updateMemberStatus = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const reason = form.reason.value;

    }
    
    return (
        <Modal show={show} onHide={handleClose} centered className="confirm-modal" size={size}>
            {/* <LoadingSpinner loading={loading} messageColor="primary" /> */}
            <Modal.Body>
                <Row>
                    {showIcon &&
                        <Col xs={2} className="text-right mg-t-10 text-warning">
                            <FeatherIcon icon="alert-triangle" width="48" height="48" classes="mg-t-0" />
                        </Col>}
                    <Col xs={showIcon ? 10 : 12}>
                        <h3 className="text-success"> Update CBI Product Cancellation Status</h3>
                        <hr />
                        {/* <form onSubmit={onSubmit}> */}
                                <div className="form-group">
                                    <label htmlFor="fullname">Full Names</label>
                                    {product ?
                                    <input
                                        type="text"
                                        id="fullname"
                                        className="form-control form-control-m"
                                        value={product.user?product.user.first_name + ' ' + product.user.last_name:''}
                                        disabled
                                    />
                                    : ''}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Product</label>
                                {product ?
                                    <input
                                        type="text"
                                        id="email"
                                        className="form-control form-control-m"
                                        value={product.product? product.product.title:''}
                                        disabled
                                    />
                                    : ''}
                            </div>
                            {product ?
                                <div>
                                    <label htmlFor="email">Select Status</label>
                                    <Select
                                        id="status"
                                        name="status"
                                        options={statusOptions}
                                        defaultValue={statusOptions.filter(option => option.value === product.status)}
                                        onChange={item => setSelectedStatus(item)}
                                        className={`basic-multi-select form-control-m`}
                                        classNamePrefix="select"
                                    />

                                </div>
                                : ''}
                            <div className="form-group">
                                <label htmlFor="reason">Reason</label>
                                {product ?
                                    <textarea
                                        type="text"
                                        id="reason"
                                        name="reason"
                                        className="form-control form-control-m"
                                    />
                                    : ''}
                            </div>
                            <hr />
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
                            onClick={onSubmit}
                                        className="btn btn-success float-right"
                                        disabled={disabled}
                                    >
                                        {processing ? 'Processing...' : 'Update'}
                                    </button>
                                </Col>
                            </Row>
                            {/* </form> */}
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

ModalCancelChangeStatus.propTypes = {
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

ModalCancelChangeStatus.defaultProps = {
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

export default ModalCancelChangeStatus;

