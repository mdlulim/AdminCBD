import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { Col, Row } from 'reactstrap';
import { Form } from 'components';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * Bulk Actions Component
 *  Handles bulk actions, where user is able to select action/value pair
 *  and apply changes to the pre-selected items.
 *  If action type is "date", a datepicker component is displayed
 *  to user instead of the select component, by default select is
 *  used.
 *  On apply button click, a callback (prop) is called.
 * 
 * @param {object} props 
 */
const BulkActions = props => {
    const {
        callback,
        actions,
        values,
        processing,
        setAction,
        setValue,
        disabled,
        value,
    } = props;
    const [ startDate, setStartDate ] = useState(new Date());
    const [ actionType, setActionType ] = useState('select');
    const [ isMultiSelect, setIsMultiSelect ] = useState(false);
    const [ selectedValue, setSelectedValue ] = useState([]);

    return (
        <div className="bulk-actions">
            <label>Bulk Actions</label>
            <Row>
                <Col sm={12} className="inputs">
                    <Row>
                        <Col sm={6}>
                            <Select
                                name="action"
                                placeholder="Choose action..."
                                options={actions}
                                isDisabled={processing || actions.length === 0}
                                onChange={item => {
                                    setValue('');
                                    setSelectedValue([]);
                                    setAction(item.value);
                                    setIsMultiSelect(item.isMulti);
                                    if (item.isDatePicker) {
                                        setValue(startDate);
                                        return setActionType('datepicker');
                                    }
                                    return setActionType('select');
                                }}
                            />
                        </Col>
                        <Col sm={6}>
                            {actionType === 'select' &&
                            <Select
                                name="values"
                                placeholder="Choose value..."
                                options={values}
                                isDisabled={processing || values.length === 0}
                                isMulti={isMultiSelect}
                                value={selectedValue}
                                onChange={item => {
                                    if (isMultiSelect) {
                                        setValue(item);
                                    } else {
                                        setValue(item.value);
                                    }
                                    setSelectedValue(item);
                                }}
                            />}
                            {actionType === 'datepicker' &&
                            <DatePicker
                                selected={startDate}
                                className="form-control"
                                dateFormat="yyyy-MM-dd"
                                onChange={date => {
                                    setStartDate(date);
                                    setValue(date);
                                }}
                            />}
                        </Col>
                    </Row>
                </Col>
                <Col sm={12}>
                    <div className="mg-t-15">
                        <Form.Button
                            text="APPLY"
                            classes="btn btn-primary pd-x-60"
                            disabled={disabled || (!value || value.length === 0)}
                            processing={processing}
                            onClick={() => callback()}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default BulkActions;
