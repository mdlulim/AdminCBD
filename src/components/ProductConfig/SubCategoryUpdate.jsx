import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Form, Card, CardBody } from 'reactstrap';
import TimePicker from 'react-time-picker';
import { Modal } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import { FeatherIcon } from 'components';
import Select from 'react-select';
import { ProductService } from '../../providers';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import 'react-time-picker/dist/TimePicker.css';


const SubCategoryUpdate = props => {
    const [statuses, setStatuses] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState([]);
    const [value, onChange] = useState('10:00');
    const [selectedWeek, setSelectedWeek] = useState({});
    const [selectedDate, setSelectedDate] = useState({});
    const [selectedWhen, setSelectedWhen] = useState({});
    const [selectedMonth, setSelectedMonth] = useState({});
    const [payouts, setPayout] = useState({});
    const [selectedCurrencyCode, setSelectedCurrencyCode] = useState('');
    const { title, body, processing, confirmButtonDisabled, confirmButton, cancelButton, showIcon, size, } = props;
    const [subcategory, setSubcategory] = useState({});
    const params = useParams();
    const { id } = params;

    useMemo(() => {
        //Get member details
        ProductService.getProductSubcategory(id).then((res) => {
            //console.log(res.payout_settings.payout_type)
           setSubcategory(res);
           setPayout(res.payout_settings)
           if (selectedWhen.value === 'Daily'){
            selectedWhen(res.payout_settings.payout_type)
            onChange(res.payout_settings.time)
        }else if (selectedWhen.value === 'Weekly'){
            selectedWhen(res.payout_settings.payout_type)
            setSelectedWeek(res.payout_settings.day)
            onChange(res.payout_settings.time)
        }else if (selectedWhen.value === 'Monthly'){
            selectedWhen(res.payout_settings.payout_type)
            setSelectedDate(res.payout_settings.date)
            onChange(res.payout_settings.time)
        }else if (selectedWhen.value === 'Yearly'){
            selectedWhen(res.payout_settings.payout_type)
            setSelectedMonth(res.payout_settings.month)
            setSelectedDate(res.payout_settings.date)
            onChange(res.payout_settings.time)
        }
          });

 
      }, []);

    const statusOptions = [
        { value: 'CBI', label: 'CBI' },
    ];

    const optionsWhen = [
        { value: 'Daily',  label: 'Daily' },
        { value: 'Weekly', label: 'Weekly' },
        { value: 'Monthly', label: 'Monthly' },
        { value: 'Yearly', label: 'Yearly' },
      ];

    const optionsWeeks = [
        { value: 'Sunday',  label: 'Sunday' },
        { value: 'Monday', label: 'Monday' },
        { value: 'Tuesday', label: 'Tuesday' },
        { value: 'Wednesday', label: 'Wednesday' },
        { value: 'Thursday', label: 'Thursday' },
        { value: 'Friday', label: 'Friday' },
        { value: 'Saturday', label: 'Saturday' },
      ];
      const optionMonths =[
        { value: 'January', label: 'January'},
        { value: 'February', label: 'February'},
        { value: 'March', label: 'March'},
        { value: 'April', label: 'April'},
        { value: 'May', label: 'May'},
        { value: 'June', label: 'June'},
        { value: 'July', label: 'July'},
        { value: 'August', label: 'August'},
        { value: 'September', label: 'September'},
        { value: 'October', label: 'October'},
        { value: 'November', label: 'November'},
        { value: 'December', label: 'December'},
      ]

      const optionDates =[
        { value: 1, label: 1},
        { value: 2, label: 2},
        { value: 3, label: 3},
        { value: 4, label: 4},
        { value: 5,  label: 5},
        { value: 6, label: 6},
        { value: 7, label: 7},
        { value: 8, label: 8},
        { value: 9, label: 9},
        { value: 10, label: 10},
        { value: 11, label: 11},
        { value: 12, label: 12},
        { value: 13, label: 13},
        { value: 14, label: 14},
        { value: 15, label: 15},
        { value: 16, label: 16},
        { value: 17, label: 17},
        { value: 18, label: 18},
        { value: 19, label: 19},
        { value: 20, label: 20},
        { value: 21, label: 21},
        { value: 22, label: 22},
        { value: 23, label: 23},
        { value: 24, label: 24},
        { value: 25, label: 25},
        { value: 26, label: 26},
        { value: 27, label: 27},
        { value: 28, label: 28},
      ]

    const onSubmit = (event) => {
        event.preventDefault();
        setDisabled(true);
        setError('');

        const form = event.currentTarget;
        let educatorFee = {}
        if (selectedWhen.value === 'Daily'){
            educatorFee = {
                payout_type: selectedWhen.value,
                time: value,
            }
        }else if (selectedWhen.value === 'Weekly'){
            educatorFee = {
                payout_type: selectedWhen.value,
                day: selectedWeek.value,
                time: value,
            }

        }else if (selectedWhen.value === 'Monthly'){
            educatorFee = {
                payout_type: selectedWhen.value,
                date: selectedDate.value,
                time: value,
            }

        }else if (selectedWhen.value === 'Yearly'){
            educatorFee = {
                payout_type: selectedWhen.value,
                month: selectedMonth.value,
                date: selectedDate.value,
                time: value,
            }

        }

        const data = {
            title: form.title.value,
            code: subcategory.code,
            description: form.description.value,
            payout_settings: educatorFee
        }
        // console.log(data);
        // setDisabled(false);
        // return data;
        if (form.title.value && subcategory.code && form.description.value) {
            ProductService.updateProductSubcategory(subcategory.id, data).then((response) => {
                console.log(response);
                if (response.success) {
                    return confirmAlert({
                        title: 'Succcess',
                        message: response.message,
                        buttons: [
                          {
                            label: 'Ok',
                            onClick: () => {
                                window.location = '/configurations/product';
                            }
                          }
                        ]
                    });
                } else {
                    setError(response.message);
                }
                setDisabled(false);
            })
        }else{
            setError('All imput fields are required');
        }
        setDisabled(false);
    
      }

    const updateFeeStatus = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const reason = form.reason.value;

    }
    return (
        <Card>
            {/* <LoadingSpinner loading={loading} messageColor="primary" /> */}
            <CardBody>
                    {showIcon &&
                        <Col xs={2} className="text-right mg-t-10 text-warning">
                            <FeatherIcon icon="alert-triangle" width="48" height="48" classes="mg-t-0" />
                        </Col>}
                    
                        <form onSubmit={onSubmit}>
                            <Row>
                                <Col>
                                <div className="form-group">
                                    <label htmlFor="fullname">Title</label>
                                    {subcategory ?
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="form-control form-control-m"
                                        defaultValue={subcategory.title }
                                        
                                    />
                                    : ''}
                            </div>
                                </Col>
                                <Col>
                                <div className="form-group">
                                <label htmlFor="value">Code</label>
                                {subcategory ?
                                    <input
                                        type="text"
                                        id="code"
                                        name="code"
                                        className="form-control form-control-m"
                                        defaultValue={subcategory.code}
                                        disabled
                                    />
                                    : ''}
                            </div>
                                </Col>
                            </Row>
                            <div className="form-group">
                                <label htmlFor="email">Description</label>
                                {subcategory ?
                                    <input
                                        type="text"
                                        id="description"
                                        name="description"
                                        className="form-control form-control-m"
                                        value={subcategory.description}
                                    />
                                    : ''}
                            </div>
                            {/* defaultValue={statusOptions.filter(option => option.value === transaction.status)} */}
                            {payouts.payout_type ?
                                <div>
                                <label htmlFor="email">Select Option {payouts['payout_type']}</label>
                                <Select
                                    id="status"
                                    name="status"
                                    options={optionsWhen}
                                    defaultValue={optionsWhen.filter(option => option.value === payouts['payout_type'])}
                                    onChange={item => setSelectedWhen(item)}
                                    className={`basic-multi-select form-control-m`}
                                    classNamePrefix="select"
                                    />

                                </div>
                                : ''}
                                {subcategory.payout_settings.payout_type === 'Daily' ?
                                <div>
                                <label htmlFor="email">Select Status</label>
                                    <TimePicker
                                    className="form-control form-control-m"
                                    onChange={onChange}
                                    value={subcategory.payout_settings.time}
                                  />
                                  </div>
                                : ''
                            }
                        {payouts.payout_type === 'Weekly' ?   
                            <Row>
                                <Col>
                                <div>
                                <label htmlFor="email">Select Day</label>
                                <Select
                                    id="status"
                                    name="status"
                                    options={optionsWeeks}
                                    onChange={item => setSelectedWeek(item)}
                                    className={`basic-multi-select form-control-m`}
                                    classNamePrefix="select"
                                    />

                                </div>
                                </Col>
                                <Col>
                                    <div>
                                        <label htmlFor="email">Select Time</label>
                                            <TimePicker
                                            className="form-control form-control-m"
                                            onChange={onChange}
                                            value={subcategory.payout_settings.time}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            : subcategory.payout_settings.payout_type === 'Weekly' ?   
                            <Row>
                                <Col>
                                <div>
                                <label htmlFor="email">Select Day</label>
                                <Select
                                    id="status"
                                    name="status"
                                    options={optionsWeeks}
                                    onChange={item => setSelectedWeek(item)}
                                    className={`basic-multi-select form-control-m`}
                                    classNamePrefix="select"
                                    />

                                </div>
                                </Col>
                                <Col>
                                    <div>
                                        <label htmlFor="email">Select Time</label>
                                            <TimePicker
                                            className="form-control form-control-m"
                                            onChange={onChange}
                                            value={subcategory.payout_settings.time}
                                        />
                                    </div>
                                </Col>
                            </Row>
                             : subcategory.payout_settings.payout_type === 'Monthly' ?   
                             <Row>
                                 <Col>
                                 <div>
                                 <label htmlFor="email">Select Date</label>
                                 <Select
                                     id="status"
                                     name="status"
                                     options={optionDates}
                                     onChange={item => setSelectedDate(item)}
                                     className={`basic-multi-select form-control-m`}
                                     classNamePrefix="select"
                                     />
 
                                 </div>
                                 </Col>
                                 <Col>
                                     <div>
                                         <label htmlFor="email">Select Time</label>
                                             <TimePicker
                                             className="form-control form-control-m"
                                             onChange={onChange}
                                            value={subcategory.payout_settings.time}
                                         />
                                     </div>
                                 </Col>
                             </Row>
                            : selectedWhen.value === 'Yearly' ?   
                            <Row>
                                <Col>
                                <div>
                                <label htmlFor="email">Select Month</label>
                                <Select
                                    id="status"
                                    name="status"
                                    options={optionMonths}
                                    onChange={item => setSelectedMonth(item)}
                                    className={`basic-multi-select form-control-m`}
                                    classNamePrefix="select"
                                    />

                                </div>
                                </Col>
                                <Col>
                                <div>
                                <label htmlFor="email">Select Day Of The Week</label>
                                <Select
                                    id="status"
                                    name="status"
                                    options={optionDates}
                                    onChange={item => setSelectedDate(item)}
                                    className={`basic-multi-select form-control-m`}
                                    classNamePrefix="select"
                                    />

                                </div>
                                </Col>
                                <Col>
                                    <div>
                                        <label htmlFor="email">Select Time</label>
                                            <TimePicker
                                            className="form-control form-control-m"
                                            onChange={onChange}
                                            value={value}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            :''}
                            <hr />
                            <Row>
                                <Col md={6}>
                                    <button
                                        className="btn btn-dark"
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
            </CardBody>
        </Card>
    );
};

export default SubCategoryUpdate;
