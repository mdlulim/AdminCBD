import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Form } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import { FeatherIcon } from 'components';
import Select from 'react-select';
import { SettingService } from '../../providers';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const ModalChangeStatus = props => {
    const { show, setShow, setting } = props;
    const [statuses, setStatuses] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState([]);
    const [selectedCurrencyCode, setSelectedCurrencyCode] = useState('');
    const { title, body, processing, confirmButtonDisabled, confirmButton, cancelButton, showIcon, size, } = props;

    useMemo(() => {
        //setSelectedStatus({ value: setting.status,  label: setting.status });
        // console.log(setting)
    }, []);

    const statusOptions = [
        { value: 'CBI', label: 'CBI' },
    ];
    const onSubmit = (event) => {
        event.preventDefault();
        setDisabled(true);
        setError('');

        const form = event.currentTarget;
        console.log(form)
        const data = {
            title: form.title.value,
            category: setting.category,
            value: form.tx_value.value,
            key: setting.key,
            subcategory: setting.subcategory,
        }
       console.log(data)
        if (form.tx_value.value && form.title.value) {
            SettingService.updateSetting(setting.id, data).then((response) => {
                console.log(response);
                if (response.data.success) {
                    setShow(false)
                    return confirmAlert({
                        title: 'Succcess',
                        message: 'Setting was successfully updated',
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
                        <h3 className="text-success"> Update Setting</h3>
                        <hr />
                        <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="fullname">Title</label>
                                    {setting ?
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="form-control form-control-m"
                                        defaultValue={setting.title }
                                    />
                                    : ''}
                            </div>
                            <div className="form-group">
                                    <label htmlFor="fullname">Category Type</label>
                                    {setting ?
                                    <input
                                        type="text"
                                        id="tx_type"
                                        name="tx_type"
                                        className="form-control form-control-m"
                                        defaultValue={setting.category }
                                        disabled
                                    />
                                    : ''}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Key</label>
                                {setting ?
                                    <input
                                        type="text"
                                        id="percentage"
                                        name="percentage"
                                        className="form-control form-control-m"
                                        defaultValue={setting.key}
                                        disabled
                                    />
                                    : ''}
                            </div>
                            <div className="form-group">
                                <label htmlFor="value">Value</label>
                                {setting ?
                                    <input
                                        type="text"
                                        id="tx_value"
                                        name="tx_value"
                                        className="form-control form-control-m"
                                        defaultValue={setting.value}
                                    />
                                    : ''}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Sub Category</label>
                                {setting ?
                                    <input
                                        type="text"
                                        id="subtype"
                                        name="subtype"
                                        className="form-control form-control-m"
                                        value={setting.subcategory}
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
