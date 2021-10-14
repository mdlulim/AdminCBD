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

export default function ConfigRegistration(props) {
    const { loginForm } = props;
    const [activeTab, setActiveTab] = useState('referals');
    const [checked, setChecked] = useState(false);
    const { processing,confirmButtonDisabled, confirmButton,} = props;
	const toggleTab = (e, tab) => {
		e.preventDefault();
		setActiveTab(tab);
    };
    
    // {
    //     "id": "email",
    //     "label": "Your email address",
    //     "type": "text",
    //     "name": "email",
    //     "placeholder": "Your email address",
    //     "icon": "flaticon-mail-2",
    //     "required": true,
    //     "input_group": true,
    //     "errors": {
    //         "required": "Email Address is required",
    //         "invalid": "Please enter a valid email address"
    //     }
    // }

    const columns = [{
        name: 'ID',
        selector: 'id',
        sortable: true,
        cell: row => <div><input
        type="text"
        id="target_weight"
        className="form-control form-control-m"
        value={row.id}
    /></div>
    },{
        name: 'Name',
        selector: 'name',
        sortable: true,
        cell: row => <div><input
        type="text"
        id="target_weight"
        className="form-control form-control-m"
        value={row.name}
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
    const columnsError = [{
        name: 'Id',
        selector: 'id',
        sortable: true
    },{
        name: 'Required Error Message',
        selector: 'required',
        sortable: true,
        cell: row => <input
        type="text"
        id="target_weight"
        className="form-control form-control-m"
        value={row.errors.required}
    />
    },{
        name: 'Invalid Error Message',
        selector: 'invalid',
        sortable: true,
        cell: row => <input
        type="text"
        id="target_weight"
        className="form-control form-control-m"
        value={row.errors.invalid}
    />
    }];

    return (
            <Col md={12} lg={12} xl={12}>
                <h3 className="text-primary" >Login Custom Fields</h3>
                <DataTable
                        data={loginForm.fields}
                        columns={columns}
                        customStyles={customStyles}
                        noHeader
                        selectableRowsHighlight
                        highlightOnHover
                    />
                    <hr />
                    <h3 className="text-primary" >Login Custom Error Messages</h3>
                    <DataTable
                        data={loginForm.fields}
                        columns={columnsError}
                        customStyles={customStyles}
                        noHeader
                        selectableRowsHighlight
                        highlightOnHover
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