import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import { FeatherIcon } from 'components';
import Select from 'react-select';
import { UserService } from 'providers';
import { confirmAlert } from 'react-confirm-alert';

const ModalChangeStatus = props => {
    const { show, setShow, member} = props;
    const [statuses, setStatuses] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const { title, body, processing,confirmButtonDisabled, confirmButton, cancelButton, showIcon, size,} = props;

    useMemo(() => {
        //setSelectedStatus({ value: member.status,  label: member.status });
    }, []);

    //====================Add User===============================
const onSubmit = (e) =>{
    // e.preventDefault();
    const form = e.currentTarget;
    const userData = {
        first_name: form.first_name.value,
        last_name: form.last_name.value,
        group_id: "0eea4708-83ad-4e17-9b4f-de9fd535be09",
        username: form.username.value,
        email: form.email.value,
        status: form.status.value,
    }
    console.log(userData);

    UserService.addAdminUser(userData).then((response) =>{
        console.log(response);
         if(response.data.success){
            //  setShow(false)
             return confirmAlert({
                title: 'Succcess',
                message: 'User was successfully updated',
                buttons: [
                  {
                    label: 'Ok',
                  }
                ]
              });
         }else{
            //  setError('Something went wrong while trying to update members status');
         }
        // setDisabled(false);
     })
}
//

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
                        <h3 className="text-info"> Update Admin User</h3>
                        <hr />
                        <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="first_name">First Name</label>
                                    {member ? 
                                    <input
                                        type="text"
                                        id="first_name"
                                        className="form-control form-control-m"
                                        defaultValue={member.first_name}
                                    /> 
                                    : ''}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="last_name">Last Name</label>
                                    {member ? 
                                    <input
                                        type="text"
                                        id="last_name"
                                        className="form-control form-control-m"
                                        defaultValue={member.last_name}
                                    /> 
                                    : ''}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    {member ? 
                                    <input
                                        type="text"
                                        id="username"
                                        className="form-control form-control-m"
                                        defaultValue={member.username}
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
                                        defaultValue={member.email}
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
