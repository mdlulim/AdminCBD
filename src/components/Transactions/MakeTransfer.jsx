import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Form } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import { FeatherIcon } from 'components';
import Select from 'react-select';
import { TransactionService } from '../../providers';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const ModalChangeStatus = props => {
    const { show, setShow, transaction} = props;
    const [statuses, setStatuses] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const { title, body, processing,confirmButtonDisabled, confirmButton, cancelButton, showIcon, size,} = props;

    useMemo(() => {
        //setSelectedStatus({ value: member.status,  label: member.status });
       console.log(transaction)
    }, []);

    const statusOptions = [
        { value: 'Canceled',  label: 'Canceled' },
        { value: 'Completed', label: 'Completed' }
      ];
      const onSubmit = (event) => {
        event.preventDefault();
        setDisabled(true);
        setError('');

        const form = event.currentTarget;


        console.log(selectedStatus);
        if(selectedStatus){
            setShow(false)
            return confirmAlert({
                title: 'Error',
                message: 'Endpoint not provided',
                buttons: [
                  {
                    label: 'Ok',
                  }
                ]
              });
            // TransactionService.updateStatus(transaction.id, selectedStatus.value).then((response) =>{
            //     console.log(response);
            //      if(response.data.success){
            //          setShow(false)
            //          return confirmAlert({
            //             title: 'Succcess',
            //             message: 'Member was successfully updated',
            //             buttons: [
            //               {
            //                 label: 'Ok',
            //               }
            //             ]
            //           });
            //      }else{
            //          setError('Something went wrong while trying to update members status');
            //      }
            //     setDisabled(false);
            //  })
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
                        <h3 className="text-success"> Update Transaction Status</h3>
                        <hr />
                        <form onSubmit={onSubmit}>
                                
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
