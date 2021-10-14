import React, { useState, useMemo } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { HashLinkContainer } from 'components';
import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';

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
const iconPadding ={
    paddingRight: '3px',
}
const inputWith={
  width: '30%',
  marginRight: '20px'
}

export default function ConfigLogin(props) {
    const { loginForm } = props;
    const [activeTab, setActiveTab] = useState('referals');
    const [checked, setChecked] = useState(false);
    const [fields, setFields] = useState([]);
    const [exportDropdownExpanded, setExportDropdownExpanded] = useState(false);
    const { processing,confirmButtonDisabled, confirmButton,} = props;
	const toggleTab = (e, tab) => {
		e.preventDefault();
		setActiveTab(tab);
    };

    // A super simple expandable component.
    useMemo(() => {
        setFields(loginForm.fields);
    },[]);
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
    },{
        name: 'Name',
        selector: 'name',
        sortable: true,
        cell: row => <div><input
        type="text"
        id="target_weight"
        name={row.name}
        className="form-control form-control-m"
        value={row.name}
        disabled
    /></div>
    },{
        name: 'Label',
        selector: 'label',
        sortable: true,
        cell: row => <div><input
        type="text"
        id="target_weight"
        className="form-control form-control-m"
        value={row.label}
    /></div>
    },{
        name: 'Type',
        selector: 'type',
        sortable: true,
        cell: row => <div><input
        type="text"
        id="target_weight"
        className="form-control form-control-m"
        value={row.type}
    /></div>
    },{
        name: 'Placeholder',
        selector: 'placeholder',
        sortable: true,
        cell: row => <div><input
        type="text"
        id="target_weight"
        className="form-control form-control-m"
        value={row.placeholder}
    /></div>
    },{
        name: 'Icon',
        selector: 'icon',
        sortable: true,
        cell: row => <div><input
        type="text"
        id="target_weight"
        className="form-control form-control-m"
        value={row.icon}
    /></div>
    },{
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
                <pre>{row.label}</pre>
                <Col md={6} >
                <div className="form-group">
                    <label htmlFor="next_rebalance">Invalid Error Message</label><input
                        type="text"
                        id="target_weight"
                        className="form-control form-control-m"
                        value={data.errors.invalid}
                    />
                </div>
                <div className="form-group">
                <label htmlFor="next_rebalance">Required Error Message</label>
                    <input
                        type="text"
                        id="target_weight"
                        className="form-control form-control-m"
                        value={data.errors.required}
                    />
                    </div>
            </Col>
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
                    <hr/>
                    <Col md={12} >
                            <button
                                        className="btn btn-primary float-right"
                                        onClick={''}
                                        disabled={confirmButtonDisabled || processing}
                                    >
                                    {processing ? 'Processing...' : 'Update'}
                                </button>
                            </Col>
            </Col>
    );
}