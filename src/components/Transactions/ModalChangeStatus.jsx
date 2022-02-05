import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Form } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import { FeatherIcon } from 'components';
import Select from 'react-select';
import Loader from "react-js-loader";
import spinningLoader from '../../assets/img/loading-buffering.gif'
import { TransactionService, UserService } from '../../providers';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const loaderCSS ={
    width: '20px'
}
const ModalChangeStatus = props => {
    const { show, setShow, transaction } = props;
    const [statuses, setStatuses] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);
    const [pageLoading, setPageLoading] = useState(true)
    const [selectedStatus, setSelectedStatus] = useState('');
    const { confirmButtonDisabled, confirmButton, cancelButton, showIcon, size,} = props;

    useEffect(() => {
        //setSelectedStatus({ value: member.status,  label: member.status });
        setPageLoading(false)
    }, []);

    const statusOptions = [
        { value: 'Rejected',  label: 'Reject' },
        { value: 'Completed', label: 'Complete' }
      ];

    const onSubmit = (event) => {
        event.preventDefault();
        setDisabled(true);
        setError('');
        setProcessing(true);
        setPageLoading(true);
        const form = event.currentTarget;

        const data = { 
                status: selectedStatus.value,
                transaction: transaction, 
            } ;

        if(selectedStatus){

            TransactionService.updateTransactionStatus(transaction.id, data).then((response) =>{
                if(response.data.success){
                     setProcessing(false)
                     setShow(false)
                     return confirmAlert({
                        title: 'Succcess',
                        message: 'Transaction was successfully updated',
                        buttons: [
                          {
                            label: 'Ok',
                          }
                        ]
                      });
                 }else{
                     setError(response.data.message);
                     setPageLoading(false);
                 }
                setDisabled(false);
                setPageLoading(false);
             })
        }else{
            setDisabled(false);
            setError('Please select transacrion status');
            setProcessing(false);
            setPageLoading(false);
        }
        setDisabled(false);
        setPageLoading(false);
      }

    const handleClose = () => setShow(false);

    const updateTransactionStatus = (event) => {
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
                        <h3 className="text-success"> Update Transaction Status</h3>
                        <hr />
                        { error ?
                        <div className="alert alert-warning" role="alert">
                        {error}
                        </div> : ''}
                        <form onSubmit={onSubmit}>
                        <div className="form-row">
                                <div className="col">
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Transaction ID</label>
                                    <input type="text" id="transactionId" className="form-control" value={transaction.txid} disabled={true} />
                                </div>
                                <div className="col">
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Transaction Type</label>
                                    <input type="text" id="subtype" className="form-control" value={transaction.subtype} disabled={true} />
                                </div>
                                <div className="col">
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">amount</label>
                                    <input type="text" id="amount" className="form-control" value={transaction.amount} disabled={true} />
                               </div>
                                <div className="col">
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Status</label>
                                <Select
                                    id="status"
                                    name="status"
                                    options={statusOptions}
                                    defaultValue={statusOptions.filter(option => option.value === transaction.status)}
                                    onChange={item => setSelectedStatus(item)}
                                    className={`basic-multi-select form-control-m`}
                                    classNamePrefix="select"
                                    />

                                </div>
                                <div className="col">
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Reason</label>
                                  <textarea
                                        type="text"
                                        id="reason"
                                        name="reason"
                                        className="form-control form-control-m"
                                        required={true}
                                    />
                                </div>
                                </div>
                                <hr />
                                <Row>
                        <Col md={4}>
                        <button
                                        className="btn btn-dark"
                                        onClick={handleClose}
                                        disabled={processing}
                                    >
                                    {'Cancel'}
                                </button>
                            </Col>
                            <Col md={4}>
                               {disabled ? <Loader type="spinner-cub" bgColor={"#323c47"} color={'#FFFFFF'} size={30} /> : ''}
                            </Col>
                            <Col md={4} >
                            <button
                                type="submit"
                                className="btn btn-success float-right"
                                disabled={processing}
                                    >
                                    { processing ? <img src={spinningLoader} style={loaderCSS} /> : ''} {' Update'}
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
