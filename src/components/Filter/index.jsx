import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import { FeatherIcon, Form } from 'components';

import FieldRows from './FieldRows';

/**
 * Filter Component
 *  Handles one or more filtering options.
 *  Allows user to select one or more Field > Operator > Value pairs.
 *  User can Add or remove filter options [rows].
 *  On remoeve row click event: the last row is deleted/removed
 *  Callback function is called on form submit, otherwise the user
 *  can choose to clear, which reloads the current page.
 * 
 * @param {object} props
 */
const Filter = props => {
    const { applyCallback, disabled, resetCallback, processing, isMultiFilter } = props;
    const [ rowCount, setRowCount ] = useState(1);
    return (
        <div className="filters">
            <form onSubmit={applyCallback}>
                <Row>
                    <Col sm={12}>
                        <Row>
                            <Col sm={11}>
                                <Row>
                                    <Col sm={4}>
                                        <label>Select a field</label>
                                    </Col>
                                    <Col sm={4}>
                                        <label>Select operator</label>
                                    </Col>
                                    <Col sm={4}>
                                        <label>Enter value</label>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        {/* <AddFieldRow {...props} /> */}
                        <FieldRows
                            count={rowCount}
                            setCount={setRowCount}
                            {...props}
                        />
                    </Col>
                    <Col sm={12} className="buttons">
                        <div>
                            <Form.Button
                                type="submit"
                                text="APPLY"
                                classes="btn btn-primary mg-r-10 pd-x-60"
                                processing={processing}
                                disabled={disabled}
                            />
                            <Form.Button
                                text="CLEAR FILTERS"
                                classes="btn btn-dark pd-x-30"
                                disabled={processing}
                                disabled={disabled}
                                onClick={() => resetCallback()}
                            />
                            {isMultiFilter && rowCount < 5 &&
                            <a
                                role="button"
                                href="/"
                                className="mg-l-15"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setRowCount(rowCount + 1);
                                }}
                            >
                                <FeatherIcon icon="plus" classes="mg-r-5" />
                                Add Filter
                            </a>}
                        </div>
                    </Col>
                </Row>
            </form>
        </div>
    );
};

export default Filter;
