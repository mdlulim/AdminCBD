import React, { useState, useMemo } from 'react';
import { Card, CardBody, Col, Row, Container } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { HashLinkContainer } from 'components';
import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { AlignCenter } from 'react-feather';
// styles
const customStyles = {

    headCells: {
        style: {
            color: 'rgba(0,0,0,.54)',
            paddingLeft: '18px', // override the cell padding for head cells
            paddingRight: '18px',
        },
    },
    cells: {
        style: {
            paddingLeft: '18px', // override the cell padding for data cells
            paddingRight: '18px',
        },
    },
};
const iconPadding = {
    paddingRight: '3px',
}
const inputWith = {
    width: '30%',
    marginRight: '20px'
}

export default function ConfigLogin(props) {
    const { loginForm, setPageLoading, permissions } = props;
    const [activeTab, setActiveTab] = useState('referals');
    const [checked, setChecked] = useState(false);
    const [fields, setFields] = useState([]);
    const [selectedInputType, setSelectedInputType] = useState('');
    const [exportDropdownExpanded, setExportDropdownExpanded] = useState(false);
    const { processing, confirmButtonDisabled, confirmButton, } = props;
    const toggleTab = (e, tab) => {
        e.preventDefault();
        setActiveTab(tab);
    };

    const inputTypeOptions = [
        { value: 'text', label: 'Text' },
        { value: 'email', label: 'Email' },
        { value: 'password', label: 'Password' }
    ];

    // A super simple expandable component.
    useMemo(() => {
        setFields(loginForm.fields);
        setPageLoading(false)
    }, [setPageLoading]);
    const columns = [{
        name: 'ID',
        selector: 'id',
        sortable: true,
        cell: row => <div><input
            type="text"
            name={row.name}
            id="target_weight"
            className="form-control form-control-m"
            value={row.id}
            disabled
        /></div>
    }, {
        name: 'Name',
        selector: 'name',
        sortable: true,
        cell: row => <div><input
            type="text"
            id="target_weight"
            name={row.name}
            className="form-control form-control-m"
            defaultValue={row.name}
            disabled
        /></div>
    }, {
        name: 'Label',
        selector: 'label',
        sortable: true,
        cell: row => <div><input
            type="text"
            id="target_weight"
            className="form-control form-control-m"
            defaultValue={row.label}
        /></div>
    }, {
        name: 'Type',
        selector: 'type',
        sortable: true,
        cell: row => <div>
            <select class="form-control" id={row.name + '-type'}>
                <option value={row.type}>text</option>
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="password">Password</option>
            </select>
        </div>
    }, {
        name: 'Placeholder',
        selector: 'placeholder',
        sortable: true,
        cell: row => <div><input
            type="text"
            id="target_weight"
            className="form-control form-control-m"
            defaultValue={row.placeholder}
        /></div>
    }, {
        name: 'Icon',
        selector: 'icon',
        sortable: true,
        cell: row => <div><input
            type="text"
            id="target_weight"
            className="form-control form-control-m"
            defaultValue={row.icon}
        /></div>
    }, {
        name: 'required',
        selector: 'required',
        sortable: true,
        cell: row => <div><label><input
            type="checkbox"
            id="target_weight"
            className="form-check-input form-control-m"
            defaultChecked={row.required}
            onChange={() => setChecked(!row.required)}
        />Required</label></div>
    }];



    const ExpandedComponent = ({ data }) => {
        const row = JSON.stringify(data, null, 2);
        return (
            <div className="row__expandable">
                <Row >
                    <Col md={5} xs="auto">
                        <div className="form-group">
                            <label htmlFor="next_rebalance">Invalid Error Message</label><input
                                type="text"
                                id="target_weight"
                                className="form-control form-control-m"
                                defaultValue={data.errors.invalid}
                            />
                        </div>
                    </Col>
                    <Col md={5} xs="auto">
                        <div className="form-group">
                            <label htmlFor="next_rebalance">Required Error Message</label>
                            <input
                                type="text"
                                id="target_weight"
                                className="form-control form-control-m"
                                defaultValue={data.errors.required}
                            />
                        </div>
                    </Col>
                </Row>
                <hr />
            </div>
        );
    }

    return (
        <Col md={12} lg={12} xl={12}>
            <h3 className="text-primary" >Login Fields</h3>
            <DataTable
                data={fields}
                columns={columns}
                customStyles={customStyles}
                noHeader
                selectableRowsHighlight
                highlightOnHover
                expandableRows
                expandableRowsComponent={<ExpandedComponent />}
            />
            <hr />
            {permissions && permissions.update_access &&
                <Col md={12} >
                    <button
                        className="btn btn-primary float-right"
                        onClick={''}
                        disabled={confirmButtonDisabled || processing}
                    >
                        {processing ? 'Processing...' : 'Update'}
                    </button>
                </Col>
            }
        </Col>
    );
}