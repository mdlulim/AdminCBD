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
    const { show, setShow, category} = props;
    const [statuses, setStatuses] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const { title, body, processing,confirmButtonDisabled, confirmButton, cancelButton, showIcon, size,} = props;

    useMemo(() => {
        //setSelectedStatus({ value: member.status,  label: member.status });
       // console.log(member)
    }, []);

    const statusOptions = [
        { value: 'Active',  label: 'Active' },
        { value: 'Blocked', label: 'Blocked' },
        { value: 'Archive', label: 'Archive' },
      ];
      const onSubmit = (event) => {
        event.preventDefault();
        setDisabled(true);
        setError('');

        const form = event.currentTarget;


        console.log(selectedStatus);
        if(selectedStatus){
            MemberService.updateStatus(category.id, selectedStatus.value).then((response) =>{
                console.log(response);
                 if(response.data.success){
                     setShow(false)
                     return confirmAlert({
                        title: 'Succcess',
                        message: 'Member was successfully updated',
                        buttons: [
                          {
                            label: 'Ok',
                          }
                        ]
                      });
                 }else{
                     setError('Something went wrong while trying to update members status');
                 }
                setDisabled(false);
             })
        }
    
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
                        <h3 className="text-success"> Update Category</h3>
                        <hr />
                        <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    {category ?
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="form-control form-control-m"
                                        defaultValue={category.title}
                                    />
                                    : ''}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    {category ?
                                    <input
                                        type="text"
                                        id="description"
                                        className="form-control form-control-m"
                                        defaultValue={category.description}
                                    />
                                    : ''}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Category Code</label>
                                    {category ?
                                    <input
                                        type="text"
                                        id="text"
                                        name="code"
                                        className="form-control form-control-m"
                                        defaultValue={category.code}
                                        disabled
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
                                        type="submit"
                                        className="btn btn-success float-right"
                                        disabled={disabled}
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