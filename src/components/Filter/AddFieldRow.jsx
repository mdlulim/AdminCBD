import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import { Form } from 'components/Members/node_modules/pages/Members/node_modules/components';

import filter from '../../static/filter.json';

const AddFieldRow = props => {
    const {
        fields,
        operators,
        count,
        setCount,
        // onSelectChange,
    } = props;
    return (
        <Row className="mg-b-0">
            <Col sm={11}>
                <Row>
                    <Col sm={4}>
                        <Select
                            name="field_name"
                            options={fields}
                            placeholder="Select field..."
                            // onChange={item => onSelectChange(item.value)}
                        />
                    </Col>
                    <Col sm={4}>
                        <Select
                            name="field_operator"
                            options={operators}
                            placeholder="Select operator..."
                        />
                    </Col>
                    <Col sm={4}>
                        <Form.Input
                            id="field_value"
                            name="field_value"
                            classes="form-control"
                        />
                    </Col>
                </Row>
            </Col>
            <Col sm={1}>
                {count > 1 &&
                <div>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setCount(count - 1)}
                    >
                        -
                    </button>
                </div>}
            </Col>
        </Row>
    );
};

AddFieldRow.propTypes = {
    fields: PropTypes.instanceOf(Array).isRequired,
    operators: PropTypes.instanceOf(Array),
};

AddFieldRow.defaultProps = {
    operators: filter.operators,
};

export default AddFieldRow;
