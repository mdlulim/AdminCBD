import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Form } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import { FeatherIcon } from 'components';
import Select from 'react-select';
import { MemberService } from '../../providers';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const ModalChangeStatus = props => {
    const { show, setShow, member } = props;
    const [statuses, setStatuses] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const { title, body, processing, confirmButtonDisabled, confirmButton, cancelButton, showIcon, size, } = props;

    useMemo(() => {
        //setSelectedStatus({ value: member.status,  label: member.status });
        // console.log(member)
    }, []);

    const statusOptions = [
        { value: 'Active', label: 'Active' },
        { value: 'Blocked', label: 'Blocked' },
        { value: 'Archive', label: 'Archive' },
    ];
    const onSubmit = (event) => {
        event.preventDefault();
        setDisabled(true);
        setError('');

        const form = event.currentTarget;

        console.log(selectedStatus)
        console.log(selectedStatus);
        if (selectedStatus) {
            MemberService.updateStatus(member.id, selectedStatus.value).then((response) => {
                console.log(response);
                if (response.data.success) {
                    setShow(false)
                    return confirmAlert({
                        title: 'Succcess',
                        message: 'Member was successfully updated',
                        buttons: [
                          {
                            label: 'Ok',
                            onClick: () => {
                                window.location = '/members/members';
                            }
                          }
                        ]
                    });
                } else {
                    setError('Something went wrong while trying to update members status');
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
        console.log(reason);

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
                        <h3 className="text-success"> Update CBI Member Status</h3>
                        <hr />
                        {/* <form onSubmit={onSubmit}> */}
                                <div className="form-group">
                                    <label htmlFor="fullname">Full Names</label>
                                    {member ?
                                    <input
                                        type="text"
                                        id="fullname"
                                        className="form-control form-control-m"
                                        value={member.first_name + ' ' + member.last_name}
                                        disabled
                                    />
                                    : ''}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                {member ?
                                    <input
                                        type="text"
                                        id="email"
                                        className="form-control form-control-m"
                                        value={member.email}
                                        disabled
                                    />
                                    : ''}
                            </div>
                            {member ?
                                <div>
                                    <label htmlFor="email">Select Status</label>
                                    <Select
                                        id="status"
                                        name="status"
                                        options={statusOptions}
                                        defaultValue={statusOptions.filter(option => option.value === member.status)}
                                        onChange={item => setSelectedStatus(item)}
                                        className={`basic-multi-select form-control-m`}
                                        classNamePrefix="select"
                                    />

                                </div>
                                : ''}
                            <div className="form-group">
                                <label htmlFor="reason">Reason</label>
                                {member ?
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
