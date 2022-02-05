import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Form } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import { FeatherIcon } from 'components';
import Select from 'react-select';
import { BankAccountService } from '../../providers';
import VerifyBankAccount from './VerifyBankAccount';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const ModalChangeStatus = props => {
    const { show, setShow, bankAccount } = props;
    const [statuses, setStatuses] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [showVerify, setShowVerify] = useState(false);
    const [error, setError] = useState([]);
    const [selectedCurrencyCode, setSelectedCurrencyCode] = useState('');
    const { title, body, processing, confirmButtonDisabled, confirmButton, cancelButton, showIcon, size, } = props;

    useState(() => {
        //
    }, []);

    const statusOptions = [
        { value: 'CBI', label: 'CBI' },
    ];
    const onSubmit = (event) => {
        event.preventDefault();
        setDisabled(true);
        setError('');
        const form = event.currentTarget;
        const data = {
            title: form.title.value,
            category: bankAccount.category,
            value: form.tx_value.value,
            key: bankAccount.key,
            subcategory: bankAccount.subcategory,
        }
            BankAccountService.sendOTP(bankAccount.id, bankAccount).then((response) => {
                if (response.data.success) {
                    setShow(false)
                    setShowVerify(true)
                    // return confirmAlert({
                    //     title: 'Succcess',
                    //     message: 'Setting was successfully updated',
                    //     buttons: [
                    //       {
                    //         label: 'Ok',
                    //         onClick: () => {
                    //             window.location = '/configurations/bankAccounts';
                    //         }
                    //       }
                    //     ]
                    // });
                } else {
                    setError(response.data.message);
                }
                setDisabled(false);
            })
        setDisabled(false);
    
      }
    const handleClose = () => {

        setShow(false)
    }

    const updateSettingStatus = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const reason = form.reason.value;

    }
    return (
        <Modal show={show} onHide={handleClose} centered className="confirm-modal" size={size}>
            {/* <LoadingSpinner loading={loading} messageColor="primary" /> */}
            <Modal.Body>
            
                <Row>
                <VerifyBankAccount show={showVerify} setShow={setShowVerify} bankAccount={bankAccount} />
                    {showIcon &&
                        <Col xs={2} className="text-right mg-t-10 text-warning">
                            <FeatherIcon icon="alert-triangle" width="48" height="48" classes="mg-t-0" />
                        </Col>}
                    <Col xs={showIcon ? 10 : 12}>
                        <h3 className="text-success"> Verify Bank Account</h3>
                        <hr />
                        <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="fullname">Title</label>
                                    {bankAccount ?
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="form-control form-control-m"
                                        defaultValue={bankAccount.name }
                                    />
                                    : ''}
                            </div>
                            <div className="form-group">
                                    <label htmlFor="fullname">Account Number</label>
                                    {bankAccount ?
                                    <input
                                        type="text"
                                        id="tx_type"
                                        name="tx_type"
                                        className="form-control form-control-m"
                                        defaultValue={bankAccount.number }
                                        disabled
                                    />
                                    : ''}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Account Type</label>
                                {bankAccount ?
                                    <input
                                        type="text"
                                        id="percentage"
                                        name="percentage"
                                        className="form-control form-control-m"
                                        defaultValue={bankAccount.type}
                                        disabled
                                    />
                                    : ''}
                            </div>
                            <div className="form-group">
                                <label htmlFor="value">Bank Name</label>
                                {bankAccount ?
                                    <input
                                        type="text"
                                        id="tx_value"
                                        name="tx_value"
                                        className="form-control form-control-m"
                                        defaultValue={bankAccount.bank_name}
                                    />
                                    : ''}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Branc Code</label>
                                {bankAccount ?
                                    <input
                                        type="text"
                                        id="subtype"
                                        name="subtype"
                                        className="form-control form-control-m"
                                        value={bankAccount.branch_code}
                                        disabled
                                    />
                                    : ''}
                            </div>
                            <hr />
                            <Row>
                                <Col md={6}>
                                    <a
                                        className="btn btn-dark"
                                        onClick={handleClose}
                                        disabled={processing}
                                        style={{color: 'white'}}
                                    >
                                    {'Cancel'}
                                </a>
                            </Col>
                            <Col md={6} >
                            <button
                                type="submit"
                                className="btn btn-success float-right"
                                disabled={disabled}
                            >
                                {processing ? 'Processing...' : 'Send OTP'}
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
