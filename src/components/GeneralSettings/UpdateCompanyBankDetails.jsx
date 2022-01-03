import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Form } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import { FeatherIcon } from 'components';
import Select from 'react-select';
import { CompanyBankAccountService, CompanyService } from '../../providers';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const AddCompanyBankDetails = props => {
    const { show, setShow, bankAccount } = props;
    const [ statuses, setStatuses ] = useState([]);
    const [ selectedStatus, setSelectedStatus ] = useState([]);
    const [ disabled, setDisabled ] = useState(false);
    const [ error, setError ] = useState('');
    const [ companies, setCompanies ] = useState([]);
    const [ selectedCompany, setSelectedCompany ] = useState('');
    const [ selectedType, setSelectedType ] = useState('');
    const [ types, setTypes ] = useState([]);
    const { title, body, processing, confirmButtonDisabled, confirmButton, cancelButton, showIcon, size, } = props;

    useMemo(() => {
        CompanyService.getCompanies().then((res) => {
            const list = res.data.data.results;
            let temp = [];
            list.filter(item => (
                    temp.push({ value: item.id, label: item.name})
                    //setProductCategories(productCategories => [{value:item.code, label:item.title}])
                ))
            setCompanies(temp);
            setSelectedCompany(temp[0])
          });

          setTypes([
            { value: 'Cheque Account', label: 'Cheque Account' },
            { value: 'Business Cheque Account', label: 'Business Cheque Account' },
        ]);

        setStatuses([
            { value: 'Active', label: 'Active' },
            { value: 'Blocked', label: 'Block' },
            { value: 'Archived', label: 'Archive' },
        ]);
    }, []);

    const categoryOptions = [
        { value: 'system', label: 'System' },
    ];
    const onSubmit = (event) => {
        event.preventDefault();
        setDisabled(true);
        setError('');

        console.log(selectedCompany);

        const form = event.currentTarget;
        const data = {
            name        : form.name.value,
            bank_name   : form.bank_name.value,
            number      : form.number.value,
            bank_code   : form.bank_code.value,
            type        : selectedType ? selectedType.value: bankAccount.type,
            branch_code : form.branch_code.value,
            user_id     : selectedCompany ? selectedCompany.value : bankAccount.user_id,
            status      : selectedStatus ? selectedStatus.value: bankAccount.status,
        }

    //    console.log(data)
    //    return data;
        if (form.name.value && form.number.value) {
            CompanyBankAccountService.updateCompanyBankAccount(bankAccount.id, data).then((response) => {
                console.log(response)
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
                        <h3 className="text-success"> Update Company Bank Details</h3>
                        <hr />
                        { error ?
                        <div className="alert alert-warning" role="alert">
                        {error}
                        </div> : ''}
                        <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="fullname">Account Holder Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control form-control-m"
                                        defaultValue={bankAccount.name}
                                    />
                            </div>
                            <Row>
                                <Col md={6}>
                                <div className="form-group">
                                <label htmlFor="value">Bank Name</label>
                                    <input
                                        type="text"
                                        id="bank_name"
                                        name="bank_name"
                                        className="form-control form-control-m"
                                        defaultValue={bankAccount.bank_name}
                                    />
                            </div>
                            </Col>
                            <Col md={6} >
                            <div className="form-group">
                                <label htmlFor="email">Account Number</label>
                                    <input
                                        type="text"
                                        id="number"
                                        name="number"
                                        className="form-control form-control-m"
                                        defaultValue={bankAccount.number}
                                    />
                            </div>
                                </Col>
                            </Row>
                            <div className="form-group">
                                <label htmlFor="bank_code">Bank Code</label>
                                    <input
                                        type="text"
                                        id="bank_code"
                                        name="bank_code"
                                        className="form-control form-control-m"
                                        defaultValue={bankAccount.bank_code}
                                    />
                            </div>
                            <Row>
                            <Col md={6}>
                            <div className="form-group">
                                <label htmlFor="branch_code">Branch Code</label>
                                    <input
                                        type="text"
                                        id="branch_code"
                                        name="branch_code"
                                        className="form-control form-control-m"
                                        defaultValue={bankAccount.branch_code}
                                    />
                            </div>
                            </Col>
                            <Col md={6}>
                            <div className="form-group">
                                    <label htmlFor="fullname">Status</label>
                                    <Select
                                     id="status"
                                     name="status"
                                     value={bankAccount ? statuses.filter(option => option.value === bankAccount.status): ''}
                                     options={statuses}
                                     onChange={item => setSelectedStatus(item)}
                                     className={`basic-multi-select form-control-m`}
                                     classNamePrefix="select"
                                     />
                            </div>
                            </Col>
                            </Row>

                            <Row>
                            <Col md={6}>
                            <div className="form-group">
                                    <label htmlFor="fullname">Bank Type</label>
                                    <Select
                                     id="bank_type"
                                     name="bank_type"
                                     value={bankAccount ? types.filter(option => option.value === bankAccount.type): ''}
                                     options={types}
                                     onChange={item => setSelectedType(item)}
                                     className={`basic-multi-select form-control-m`}
                                     classNamePrefix="select"
                                     />
                            </div>
                            </Col>
                            <Col md={6} >
                             <div className="form-group">
                                <label htmlFor="email">Select Company</label>
                                   <Select
                                     id="company"
                                     name="company"
                                     value={bankAccount ? companies.filter(option => option.value === bankAccount.company_id): ''}
                                     options={companies}
                                     onChange={item => setSelectedCompany(item)}
                                     className={`basic-multi-select form-control-m`}
                                     classNamePrefix="select"
                                     />
                            </div>
                            </Col>
                            </Row>
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

AddCompanyBankDetails.propTypes = {
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

AddCompanyBankDetails.defaultProps = {
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

export default AddCompanyBankDetails;