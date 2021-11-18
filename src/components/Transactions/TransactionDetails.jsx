import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Form } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import { FeatherIcon } from 'components';
import Select from 'react-select';
import { TransactionService, UserService } from '../../providers';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import defaultImage from '../../assets/img/default.png'
import Config from '../../config';

const imageWidth = {
    width: '60%'
}
const TransactionDetails = props => {
    const { show, setShow, transaction, pop} = props;
    const [statuses, setStatuses] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const { title, body, processing,confirmButtonDisabled, confirmButton, cancelButton, showIcon, size,} = props;

    useMemo(() => {

           console.log(transaction);

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



        console.log(transaction)
        console.log(selectedStatus.value);
        const data = { status: selectedStatus.value} ;

        if(selectedStatus){
            setShow(false)
            // return confirmAlert({
            //     title: 'Error',
            //     message: 'Endpoint not provided',
            //     buttons: [
            //       {
            //         label: 'Ok',
            //       }
            //     ]
            //   });
            TransactionService.updateTransactionStatus(transaction.id, data).then((response) =>{
                console.log(response);
                 if(response.data.success){
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
                     setError('Something went wrong while trying to update members status');
                 }
                setDisabled(false);
             })
        }
        setDisabled(false);
      }

    
    const handleClose = () => setShow(false);

    const updateTransactionStatus = (event) => {
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
                        <h3 className="text-success">Transaction Details</h3>
                        <hr />
                        <form onSubmit={onSubmit}>
                            <div className="form-row">
                                <div className="col">
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Transaction ID Test</label>
                                    <input type="text" className="form-control"  value={transaction.txid} disabled={true}/>
                                </div>
                                <div className="col">
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Transaction Type</label>
                                    <input type="text" className="form-control" value={transaction.subtype} disabled={true}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col">
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Amount</label>
                                    <input type="text" className="form-control"  value={transaction.amount} disabled={true}/>
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
                            </div>
                            <div className="form-row">
                                <div className="col">
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Proof of payment</label>
                                <hr />
                                    <img src={ pop ? `${Config.API.BASE_URL_POP}?filename=${pop.file}`: defaultImage} style={imageWidth} className="rounded mx-auto d-block" alt="..." />
                                    </div>
                                    </div>
                                <div className="form-group">
                                    <label htmlFor="reason">Reason</label>
                                    {transaction ?
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

TransactionDetails.propTypes = {
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

TransactionDetails.defaultProps = {
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

export default TransactionDetails;

// https://dev.cbiglobal.io/v1/file-storage/file?filename=pop/deposit/0192c293-fc26-47f0-a764-332b44dd08b1/1636800473170.png
// https://dev.cbiglobal.io/v1/file-storage/file?filename=pop/deposits/e6e95c89-aa91-4b94-bb51-f6fca1737275/20211113-1036.png