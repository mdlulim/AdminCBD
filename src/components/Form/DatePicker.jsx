import React from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import { FeatherIcon } from 'components';

const DatePickerInput = props => {
    const { disabled, startDate, setStartDate } = props;
    return (
        <div className={`input-group mg-b-10 datepicker-input-group ${disabled ? 'disabled' : ''}`}>
            <DatePicker
                selected={startDate}
                className="form-control"
                disabled={disabled}
                dateFormat="yyyy-MM-dd"
                onChange={date => setStartDate(date)}
            />
            <div className="input-group-append">
                <span className="input-group-text">
                    <FeatherIcon icon="calendar" width="18" height="18" />
                </span>
            </div>
        </div>
    );
};

DatePickerInput.propTypes = {
    startDate: PropTypes.any,
};

DatePickerInput.defaultProps = {
    startDate: new Date(),
};

export default DatePickerInput;
