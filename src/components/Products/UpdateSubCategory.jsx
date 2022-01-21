import React, { useState, useMemo } from 'react';
import { Col, Row, Card, CardBody } from 'reactstrap';
import TimePicker from 'react-time-picker';
import { useParams } from 'react-router-dom';
import { FeatherIcon } from 'components';
import Select from 'react-select';
import { ProductService } from '../../providers';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import 'react-time-picker/dist/TimePicker.css';

const SubCategoryUpdate = props => {
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState([]);

    const [value, onChange] = useState('10:00');
    const [selectedWeek, setSelectedWeek] = useState({});
    const [selectedDate, setSelectedDate] = useState({});
    const [selectedWhen, setSelectedWhen] = useState({});
    const [selectedMonth, setSelectedMonth] = useState({});

    const [valueCal, onChangeCal] = useState('10:00');
    const [selectedWeekCal, setSelectedWeekCal] = useState({});
    const [selectedDateCal, setSelectedDateCal] = useState({});
    const [selectedWhenCal, setSelectedWhenCal] = useState({});
    const [selectedMonthCal, setSelectedMonthCal] = useState({});

    const [payouts, setPayout] = useState({});
    const [calculation, setCalculation] = useState({});

    const [selectedCurrencyCode, setSelectedCurrencyCode] = useState('');
    const { title, body, processing, confirmButtonDisabled, confirmButton, cancelButton, showIcon, size, } = props;
    const [subcategory, setSubcategory] = useState({});
    const params = useParams();
    const { id } = params;

    useMemo(() => {
        //Get member details
        ProductService.getProductSubcategory(id).then((res) => {
            setSubcategory(res);
            setPayout(res.payout_settings)
            setCalculation(res.calculation_settings)

            let when = {}
            let whenCal = {}
            if (res.payout_settings) {
                when = optionsWhen.filter(option => option.value === res.payout_settings.payout_type);
                when = when[0];
                if (res.payout_settings.payout_type === 'Daily') {
                    setSelectedWhen(when)
                    onChange(res.payout_settings.time)
                } else if (res.payout_settings.payout_type === 'Weekly') {
                    setSelectedWhen(when)
                    setSelectedWeek(optionsWeeks.filter(option => option.value === res.payout_settings.day))
                    onChange(res.payout_settings.time)
                } else if (res.payout_settings.payout_type === 'Monthly') {
                    setSelectedWhen(when)
                    setSelectedDate(optionDates.filter(option => option.value === res.payout_settings.date))
                    onChange(res.payout_settings.time)
                } else if (res.payout_settings.payout_type === 'Yearly') {
                    setSelectedWhen(when)
                    setSelectedMonth(optionMonths.filter(option => option.value === res.payout_settings.month)[0])
                    setSelectedDate(optionDates.filter(option => option.value === res.payout_settings.date)[0])
                    onChange(res.payout_settings.time)
                }
            }

            if (res.calculation_settings) {
                whenCal = optionsWhen.filter(option => option.value === res.calculation_settings.payout_type);
                whenCal = whenCal[0];

                if (res.calculation_settings.payout_type === 'Daily') {
                    setSelectedWhenCal(whenCal)
                    onChangeCal(res.calculation_settings.time)
                } else if (res.calculation_settings.payout_type === 'Weekly') {
                    setSelectedWhenCal(whenCal)
                    setSelectedWeekCal(optionsWeeks.filter(option => option.value === res.calculation_settings.day))
                    onChangeCal(res.calculation_settings.time)
                } else if (res.calculation_settings.payout_type === 'Monthly') {
                    setSelectedWhenCal(whenCal)
                    setSelectedDateCal(optionDates.filter(option => option.value === res.calculation_settings.date))
                    onChange(res.calculation_settings.time)
                } else if (res.calculation_settings.payout_type === 'Yearly') {
                    setSelectedWhenCal(whenCal)
                    setSelectedMonthCal(optionMonths.filter(option => option.value === res.calculation_settings.month)[0])
                    setSelectedDateCal(optionDates.filter(option => option.value === res.calculation_settings.date)[0])
                    onChangeCal(res.calculation_settings.time)
                }
            }

        });


    }, []);

    const statusOptions = [
        { value: 'CBI', label: 'CBI' },
    ];

    const optionsWhen = [
        { value: 'Daily', label: 'Daily' },
        { value: 'Weekly', label: 'Weekly' },
        { value: 'Monthly', label: 'Monthly' },
        { value: 'Yearly', label: 'Yearly' },
    ];

    const optionsWeeks = [
        { value: 'Sunday', label: 'Sunday' },
        { value: 'Monday', label: 'Monday' },
        { value: 'Tuesday', label: 'Tuesday' },
        { value: 'Wednesday', label: 'Wednesday' },
        { value: 'Thursday', label: 'Thursday' },
        { value: 'Friday', label: 'Friday' },
        { value: 'Saturday', label: 'Saturday' },
    ];
    const optionMonths = [
        { value: 'January', label: 'January' },
        { value: 'February', label: 'February' },
        { value: 'March', label: 'March' },
        { value: 'April', label: 'April' },
        { value: 'May', label: 'May' },
        { value: 'June', label: 'June' },
        { value: 'July', label: 'July' },
        { value: 'August', label: 'August' },
        { value: 'September', label: 'September' },
        { value: 'October', label: 'October' },
        { value: 'November', label: 'November' },
        { value: 'December', label: 'December' },
    ]

    const optionDates = [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
        { value: 6, label: 6 },
        { value: 7, label: 7 },
        { value: 8, label: 8 },
        { value: 9, label: 9 },
        { value: 10, label: 10 },
        { value: 11, label: 11 },
        { value: 12, label: 12 },
        { value: 13, label: 13 },
        { value: 14, label: 14 },
        { value: 15, label: 15 },
        { value: 16, label: 16 },
        { value: 17, label: 17 },
        { value: 18, label: 18 },
        { value: 19, label: 19 },
        { value: 20, label: 20 },
        { value: 21, label: 21 },
        { value: 22, label: 22 },
        { value: 23, label: 23 },
        { value: 24, label: 24 },
        { value: 25, label: 25 },
        { value: 26, label: 26 },
        { value: 27, label: 27 },
        { value: 28, label: 28 },
    ]

    const onSubmit = (event) => {
        event.preventDefault();
        setDisabled(true);
        setError('');

        console.log(selectedDate)
        const form = event.currentTarget;
        let educatorFee = {}
        if (selectedWhen.value === 'Daily') {
            educatorFee = {
                payout_type: selectedWhen.value,
                time: value,
            }
        } else if (selectedWhen.value === 'Weekly') {
            educatorFee = {
                payout_type: selectedWhen.value,
                day: selectedWeek.value,
                time: value,
            }
        } else if (selectedWhen.value === 'Monthly') {
            educatorFee = {
                payout_type: selectedWhen.value,
                date: selectedDate.value,
                time: value,
            }
        } else if (selectedWhen.value === 'Yearly') {
            educatorFee = {
                payout_type: selectedWhen.value,
                month: selectedMonth.value,
                date: selectedDate.value,
                time: value,
            }
        }

        let calculatorFee = {}
        if (selectedWhenCal.value === 'Daily') {
            calculatorFee = {
                payout_type: selectedWhenCal.value,
                time: valueCal,
            }
        } else if (selectedWhenCal.value === 'Weekly') {
            calculatorFee = {
                payout_type: selectedWhenCal.value,
                day: selectedWeekCal.value,
                time: valueCal,
            }

        } else if (selectedWhenCal.value === 'Monthly') {
            calculatorFee = {
                payout_type: selectedWhenCal.value,
                date: selectedDateCal.value,
                time: valueCal,
            }

        } else if (selectedWhenCal.value === 'Yearly') {
            calculatorFee = {
                payout_type: selectedWhenCal.value,
                month: selectedMonthCal.value,
                date: selectedDateCal.value,
                time: valueCal,
            }

        }

        let data = {};
        if (subcategory.has_payouts) {
            data = {
                title: form.title.value,
                code: subcategory.code,
                description: form.description.value,
                payout_settings: educatorFee,
                calculation_settings: calculatorFee,
            }
        } else {
            data = {
                title: form.title.value,
                code: subcategory.code,
                description: form.description.value,
                calculation_settings: calculatorFee,
            }
        }
        //  console.log(data);
        //  setDisabled(false);
        //  return data;
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
        } else {
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
                                        defaultValue={subcategory.title}
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
                    {subcategory ?
                        <div className="form-group">
                            <label htmlFor="email">Description</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                className="form-control form-control-m"
                                value={subcategory.description}
                            />
                        </div>
                        : ''}
                    {/* ===========================================Calculations======================================= */}

                    <h2>Calculations</h2>
                    {/* defaultValue={statusOptions.filter(option => option.value === transaction.status)} */}
                    {subcategory ?
                        <div>
                            <label htmlFor="email">Select Option </label>
                            <Select
                                id="status"
                                name="status"
                                options={optionsWhen}
                                defaultValue={calculation ? optionsWhen.filter(option => option.value === calculation.payout_type) : ''}
                                onChange={item => setSelectedWhenCal(item)}
                                className={`basic-multi-select form-control-m`}
                                classNamePrefix="select"
                            />

                        </div>
                        : ''}
                    {selectedWhenCal.value === 'Daily' ?
                        <div>
                            <label htmlFor="email">Select Time</label>
                            <TimePicker
                                className="form-control form-control-m"
                                onChange={onChangeCal}
                                value={calculation ? calculation.time : valueCal}
                            />
                        </div>
                        : ''
                    }
                    {selectedWhenCal.value === 'Weekly' ?
                        <Row>
                            <Col>
                                <div>
                                    <label htmlFor="email">Select Day</label>
                                    <Select
                                        id="status"
                                        name="status"
                                        options={optionsWeeks}
                                        defaultValue={calculation ? optionsWeeks.filter(option => option.value === calculation.day) : ''}
                                        onChange={item => setSelectedWeekCal(item)}
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
                                        onChange={onChangeCal}
                                        value={calculation ? calculation.time : valueCal}
                                    />
                                </div>
                            </Col>
                        </Row>
                        : selectedWhenCal.value === 'Weekly' ?
                            <Row>
                                <Col>
                                    <div>
                                        <label htmlFor="email">Select Day</label>
                                        <Select
                                            id="status"
                                            name="status"
                                            options={optionsWeeks}
                                            defaultValue={calculation ? optionsWeeks.filter(option => option.value === calculation.day) : ''}
                                            onChange={item => setSelectedWeekCal(item)}
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
                                            onChange={onChangeCal}
                                            value={calculation ? calculation.time : valueCal}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            : selectedWhenCal.value === 'Monthly' ?
                                <Row>
                                    <Col>
                                        <div>
                                            <label htmlFor="email">Select Date</label>
                                            <Select
                                                id="status"
                                                name="status"
                                                options={optionDates}
                                                defaultValue={calculation ? optionDates.filter(option => option.value === calculation.date) : ''}
                                                onChange={item => setSelectedDateCal(item)}
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
                                                onChange={onChangeCal}
                                                value={calculation ? calculation.time : valueCal}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                : selectedWhenCal.value === 'Yearly' ?
                                    <Row>
                                        <Col>
                                            <div>
                                                <label htmlFor="email">Select Month</label>
                                                <Select
                                                    id="status"
                                                    name="status"
                                                    options={optionMonths}
                                                    defaultValue={calculation ? optionMonths.filter(option => option.value === calculation.month) : ''}
                                                    onChange={item => setSelectedMonthCal(item)}
                                                    className={`basic-multi-select form-control-m`}
                                                    classNamePrefix="select"
                                                />

                                            </div>
                                        </Col>
                                        <Col>
                                            <div>
                                                <label htmlFor="email">Select Date</label>
                                                <Select
                                                    id="status"
                                                    name="status"
                                                    options={optionDates}
                                                    defaultValue={calculation ? optionDates.filter(option => option.value === calculation.payout_type) : ''}
                                                    onChange={item => setSelectedDateCal(item)}
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
                                                    onChange={onChangeCal}
                                                    value={calculation ? calculation.time : valueCal}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    : ''}

                    {/** ===========================================End Of Calculation======================================= */}



                    {/**  ===========================================Payout Settings=========================================== */}
                    {subcategory.has_payouts ?
                        <>
                            <br />
                            <hr />
                            <h2>Payout Settings</h2>
                            <div>
                                <label htmlFor="email">Select Option {payouts.payout_type}</label>
                                <Select
                                    id="status"
                                    name="status"
                                    options={optionsWhen}
                                    defaultValue={payouts ? optionsWhen.filter(option => option.value === payouts.payout_type) : ''}
                                    onChange={item => setSelectedWhen(item)}
                                    className={`basic-multi-select form-control-m`}
                                    classNamePrefix="select"
                                />

                            </div>
                            {selectedWhen.value === 'Daily' ?
                                <div>
                                    <label htmlFor="email">Select Time</label>
                                    <TimePicker
                                        className="form-control form-control-m"
                                        onChange={onChange}
                                        value={payouts ? payouts.time : value}
                                    />
                                </div>
                                : ''
                            }
                            {selectedWhen.value === 'Weekly' ?
                                <Row>
                                    <Col>
                                        <div>
                                            <label htmlFor="email">Select Day</label>
                                            <Select
                                                id="status"
                                                name="status"
                                                options={optionsWeeks}
                                                defaultValue={payouts ? optionsWeeks.filter(option => option.value === payouts.day) : ''}
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
                                                value={payouts ? payouts.time : value}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                : selectedWhen.value === 'Weekly' ?
                                    <Row>
                                        <Col>
                                            <div>
                                                <label htmlFor="email">Select Day</label>
                                                <Select
                                                    id="status"
                                                    name="status"
                                                    options={optionsWeeks}
                                                    defaultValue={payouts ? optionsWeeks.filter(option => option.value === payouts.day) : ''}
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
                                                    value={payouts ? payouts.time : value}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    : selectedWhen.value === 'Monthly' ?
                                        <Row>
                                            <Col>
                                                <div>
                                                    <label htmlFor="email">Select Date</label>
                                                    <Select
                                                        id="status"
                                                        name="status"
                                                        options={optionDates}
                                                        defaultValue={payouts ? optionDates.filter(option => option.value === payouts.date) : ''}
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
                                                        value={payouts ? payouts.time : value}
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
                                                            defaultValue={payouts ? optionMonths.filter(option => option.value === payouts.month) : ''}
                                                            onChange={item => setSelectedMonth(item)}
                                                            className={`basic-multi-select form-control-m`}
                                                            classNamePrefix="select"
                                                        />

                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div>
                                                        <label htmlFor="email">Select Date</label>
                                                        <Select
                                                            id="status"
                                                            name="status"
                                                            options={optionDates}
                                                            defaultValue={payouts ? optionDates.filter(option => option.value === payouts.date) : ''}
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
                                                            value={payouts ? payouts.time : value}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            : ''}
                        </> : ''}
                    {/** ===========================================End of Payout Settings==================================== */}
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
