import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Form } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import { FeatherIcon } from 'components';
import Select from 'react-select';
import { TransactionService, UserService } from '../../providers';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const ModalChangeStatus = props => {
    const { show, setShow, transactions} = props;
    const [statuses, setStatuses] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');

    const { title, body, processing,confirmButtonDisabled, confirmButton, cancelButton, showIcon, size,} = props;

    useMemo(() => {
        //setSelectedStatus({ value: member.status,  label: member.status });
       console.log(transactions)
    }, []);

    const statusOptions = [
        { value: 'Rejected',  label: 'Reject' },
        { value: 'Completed', label: 'Complete' }
      ];



    const onSubmit = (event) => {
        event.preventDefault();
        setDisabled(true);
        setError('');

        const form = event.currentTarget;



        console.log(transactions)
        console.log(selectedStatus.value);
        const data = { status: selectedStatus.value} ;

        if(selectedStatus){
            setShow(false)
            updateTransaction(transactions, data);
            // return confirmAlert({
            //     title: 'Error',
            //     message: 'Endpoint not provided',
            //     buttons: [
            //       {
            //         label: 'Ok',
            //       }
            //     ]
            //   });
        }
        setDisabled(false);
      }
    const handleClose = () => setShow(false);

    const updateTransaction = (transactions, data) => {
        let count = transactions.length;
        let status = false
        transactions.map((transaction,num) =>{
            TransactionService.updateTransactionStatus(transaction.id, data).then((response) =>{
                console.log(response);
                  
                })
            if(num+1 === transactions.length ){
                return confirmAlert({
                    title: 'Succcess',
                    message: 'Transaction was successfully updated',
                    buttons: [
                      {
                        label: 'Ok',
                      }
                    ]
                  });
            }

        });
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
                                <div className="form-group">
                                    <label htmlFor="transactionId">Transaction ID</label>
                                    {transactions.map((transaction,i) =>(
                                    <input
                                        type="text"
                                        id="transactionId"
                                        className="form-control form-control-m"
                                        value={transaction.txid}
                                        disabled={true}
                                    />
                                    ))}
                                </div>
                                <div className="form-group">
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
                                <div className="form-group">
                                    <label htmlFor="reason">Reason</label>
                                    <textarea
                                        type="text"
                                        id="reason"
                                        name="reason"
                                        className="form-control form-control-m"
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