import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Form } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import { FeatherIcon } from 'components';
import Select from 'react-select';
import { KYCService, CompanyService } from '../../providers';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const UpdateKYCLimit = props => {
    const { show, setShow, kycLimit } = props;
    const [ statuses, setStatuses ] = useState([]);
    const [ selectedStatus, setSelectedStatus ] = useState([]);
    const [ disabled, setDisabled ] = useState(false);
    const [ error, setError ] = useState('');
    const [ types, setTypes ] = useState([]);
    const { title, body, processing, confirmButtonDisabled, confirmButton, cancelButton, showIcon, size, } = props;

    useMemo(() => {
        
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        setDisabled(true);
        setError('');


        const form = event.currentTarget;
        const data = {
            level              : kycLimit.level,
            withdrawal_limit   : form.withdrawal_limit.value,
        }


        if (form.withdrawal_limit.value && kycLimit.level) {
            KYCService.updateKYCLimit(kycLimit.id, data).then((response) => {
                if (response.data.success) {
                    setShow(false)
                    return confirmAlert({
                        title: 'Succcess',
                        message: response.data.message,
                        buttons: [
                          {
                            label: 'Ok',
                            onClick: () => {
                                window.location = '/configurations/settings';
                            }
                          }
                        ]
                    });
                } else {
                    setError(response.data.message);
                }
                setDisabled(false);
            })
        }else{
            setError('All imput fields are required');
        }
        setDisabled(false);
      }
    const handleClose = () => setShow(false);

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
                    {showIcon &&
                        <Col xs={2} className="text-right mg-t-10 text-warning">
                            <FeatherIcon icon="alert-triangle" width="48" height="48" classes="mg-t-0" />
                        </Col>}
                    <Col xs={showIcon ? 10 : 12}>
                        <h3 className="text-success"> Update KYC Withdrawal Limit</h3>
                        <hr />
                        { error ?
                        <div className="alert alert-warning" role="alert">
                        {error}
                        </div> : ''}
                        <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="fullname">KYC Level</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control form-control-m"
                                        defaultValue={kycLimit.level}
                                        disabled
                                    />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bank_code">Withdrawal Limit</label>
                                    <input
                                        type="text"
                                        id="withdrawal_limit"
                                        name="withdrawal_limit"
                                        className="form-control form-control-m"
                                        defaultValue={kycLimit.withdrawal_limit}
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

UpdateKYCLimit.propTypes = {
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

UpdateKYCLimit.defaultProps = {
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

export default UpdateKYCLimit;