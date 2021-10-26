import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import { FeatherIcon } from 'components';
import Select from 'react-select';

const ModalUpdateCountry = props => {
    const { show, setShow, role} = props;
    const [statuses, setStatuses] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const { title, body, processing,confirmButtonDisabled, confirmButton, cancelButton, showIcon, size,} = props;

    useMemo(() => {
        //setSelectedStatus({ value: member.status,  label: member.status });
    }, []);

    const statusOptions = [
        { value: 'Active',  label: 'Active' },
        { value: 'Pending', label: 'Pending' },
        { value: 'Blocked', label: 'Blocked' }
      ];
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
                        <h3 className="text-info"> Update Country</h3>
                        <hr />
                        <form>
                                <div className="form-group">
                                    <label htmlFor="name">Role Name</label>
                                    {role ? 
                                    <text
                                        type="text"
                                        id="name"
                                        className="form-control form-control-m"
                                        value={role.name}
                                    /> 
                                    : ''}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="last_name">Description</label>
                                    {role ? 
                                    <textarea
                                        type="text"
                                        id="last_name"
                                        className="form-control form-control-m"
                                        value={role.description}
                                    /> 
                                    : ''}
                                </div>
                                <div>
                                <label htmlFor="email">Select Status</label>
                                <Select
                                    id="status"
                                    name="status"
                                    options={statusOptions}
                                    onChange={item => setSelectedStatus(item)}
                                    className={`basic-multi-select form-control-m`}
                                    classNamePrefix="select"
                                    />
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
                                        className="btn btn-info float-right"
                                        onClick={confirmButton.onClick}
                                        disabled={confirmButtonDisabled || processing}
                                    >
                                    {processing ? 'Processing...' : 'Update'}
                                </button>
                            </Col>
                            </Row>
                            </form>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

ModalUpdateCountry.propTypes = {
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

ModalUpdateCountry.defaultProps = {
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

export default ModalUpdateCountry;