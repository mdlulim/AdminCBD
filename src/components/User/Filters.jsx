import React from 'react';
import Select from 'react-select';
import { Col, Row } from 'reactstrap';
import { Form } from 'components';

const statuses = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
]

const Filters = props => {
    const { roles, onFilterChange, processing, onApplyFilters } = props;
    return (
        <div className="filters">
            <Row>
                <Col sm={4}>
                    <div className="form-group">
                        <label>Filter by Role</label>
                        <Select
                            isLoading={roles.length === 0}
                            options={roles}
                            onChange={item => onFilterChange('role', item.value)}
                        />
                    </div>
                </Col>
                <Col sm={4}>
                    <div className="form-group">
                        <label>Filter by Status</label>
                        <Select
                            isLoading={statuses.length === 0}
                            options={statuses}
                            onChange={item => onFilterChange('status', item.value)}
                        />
                    </div>
                </Col>
                <Col sm={4} className="buttons">
                    <label>&nbsp;</label>
                    <Row>
                        <Col xs={6}>
                            <Form.Button
                                text="APPLY"
                                classes="btn btn-primary btn-block"
                                processing={processing}
                                onClick={() => onApplyFilters()}
                            />
                        </Col>
                        <Col xs={6}>
                            <Form.Button
                                text="CLEAR FILTERS"
                                classes="btn btn-dark btn-block"
                                disabled={processing}
                                onClick={() => window.location = '/users'}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Filters;
