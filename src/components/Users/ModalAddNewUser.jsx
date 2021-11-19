import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import { FeatherIcon } from 'components';
import Select from 'react-select';
import { UserService ,PermissionLevelService} from 'providers';
import { confirmAlert } from 'react-confirm-alert';

const ModalChangeStatus = props => {
    const { show, setShow} = props;
    const [statuses, setStatuses] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const { title, body, processing,confirmButtonDisabled, confirmButton, cancelButton, showIcon, size,} = props;

    useMemo(() => {
        //setSelectedStatus({ value: member.status,  label: member.status });
    }, []);

    //====================Add User===============================
const onSubmit = (e) =>{
    e.preventDefault();
    // setShow(false);
    const form = e.currentTarget;
    const userData = {
        first_name: form.first_name.value,
        last_name: form.last_name.value,
        group_id: "ec2f5ee4-ea3a-4f68-a684-cddd37808978",
        username: form.username.value,
        email: form.email.value,
        status: form.status.value,
        permission_level: form.perm_level.value,
    }
    console.log(userData);

    UserService.addAdminUser(userData).then((response) =>{
        console.log(response);
         if(response.data.success){
             setShow(false)
             return confirmAlert({
                title: 'Succcess',
                message: 'User Role was successfully updated',
                buttons: [
                  {
                    label: 'Ok',
                    onClick:window.location.reload(false)
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

    // const levelOptions = PermissionLevelService.getLevels().then((response) =>{
        // console.log(response);
        //  if(response.data.success){
        //      setShow(false)
        //      return confirmAlert({
        //         title: 'Succcess',
        //         message: 'User Role was successfully updated',
        //         buttons: [
        //           {
        //             label: 'Ok',
        //             onClick:window.location.reload(false)
        //           }
        //         ]
        //       });
        //  }else{
        //     //  setError('Something went wrong while trying to update members status');
        //  }
    //  });

     const levelOptions = [
        { value: '1', label: 'Low' },
        { value: '2', label: 'Basic' },
        { value: '3', label: 'Medium' },
        { value: '4', label: 'High' },
        { value: '5', label: 'Very High' }
      ];

    const rolessOptions = [
        { value: '7563285', label: 'Platform Administrator' },
        { value: '2345624', label: 'Training Administrator' },
        { value: '9843444', label: 'EcoSystem Administrator' },
        { value: '3645364', label: 'Super Administrator' }
      ];
      const statusOptions = [
        { value: 'Active',  label: 'Active' },
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
                        <h3 className="text-info"> Add New Admin User</h3>
                        <hr />
                        <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="first_name">First Name</label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        className="form-control form-control-m"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="last_name">Last Name</label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        className="form-control form-control-m"
                                    /> 
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        className="form-control form-control-m"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        className="form-control form-control-m"
                                    />
                                </div>
                                {/* <div>
                                <label htmlFor="email">Select User Role</label>
                                <Select
                                    id="role"
                                    name="role"
                                    options={rolessOptions}
                                    onChange={item => setSelectedRole(item)}
                                    className={`basic-multi-select form-control-m`}
                                    classNamePrefix="select"
                                    />
                                </div> */}
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
                                    <br/>
                                <div>
                                <label htmlFor="perm_level">Permission Level</label>
                                <Select
                                    id="perm_level"
                                    name="perm_level"
                                    options={levelOptions}
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
                                        type="submit"
                                        disabled={confirmButtonDisabled || processing}
                                    >
                                    {processing ? 'Processing...' : 'Add New'}
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
