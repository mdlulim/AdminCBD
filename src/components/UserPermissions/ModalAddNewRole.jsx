import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import { FeatherIcon } from 'components';
import { UserRolesService } from 'providers';
import Select from 'react-select';
import { confirmAlert } from 'react-confirm-alert'; // Import

const ModalChangeStatus = props => {
    const { show, setShow} = props;
    const [statuses, setStatuses] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const { title, body, processing,confirmButtonDisabled, confirmButton, cancelButton, showIcon, size,} = props;

    useMemo(() => {
        //setSelectedStatus({ value: member.status,  label: member.status });
    }, []);

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

    

     const onSubmit = (e) =>{
         e.preventDefault();
        const form = e.currentTarget;
        UserRolesService.addUserRoles({
            name:form.role_name.value,
            label:form.role_label.value,
            description:form.role_description.value,
            is_default:false,
            is_public:true,
            settings:null,
            archived:false,
        }).then((response) =>{
             if(response.data.success){
                 setShow(false)
                 return confirmAlert({
                    title: 'Succcess',
                    message: 'Role was successfully added',
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
                        <h3 className="text-info"> Add New User Role</h3>
                        <hr />
                        <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="role-name"
                                        name="role_name"
                                        className="form-control form-control-m"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Label</label>
                                    <input
                                        type="text"
                                        id="label"
                                        name="role_label"
                                        className="form-control form-control-m"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        type="text"
                                        id="description"
                                        name="role_description"
                                        className="form-control form-control-m"
                                    /> 
                                </div>
                                {/* <div>
                                <label htmlFor="email">Select Status</label>
                                <Select
                                    id="status"
                                    name="status"
                                    options={statusOptions}
                                    onChange={item => setSelectedStatus(item)}
                                    className={`basic-multi-select form-control-m`}
                                    classNamePrefix="select"
                                    />
                                </div> */}
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
