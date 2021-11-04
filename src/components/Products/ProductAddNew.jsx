import React, { useMemo, useRef, useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { EditorState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Select from 'react-select';
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

const Status = ({ status }) => {
    let badge = 'primary';
    if (status === 'Pending') {
      badge = 'warning';
    }
    if (status === 'Active') {
      badge = 'success';
    }
    if (status === 'Blocked') {
        badge = 'danger';
      }
    return (
      <span className={`badge badge-${badge}`}>{status}</span>
    );
  };



export default function ProductAddNew(props) {
    const breadcrumb = { heading: "Product Details" };
    const [activeTab, setActiveTab] = useState('referals');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedRebalancingFrequency, setSelectedRebalancingFrequency] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const { processing,confirmButtonDisabled, confirmButton,} = props;


    useMemo(() => {
       
      }, []);
    // table headings definition

		const toggleTab = (e, tab) => {
			e.preventDefault();
			setActiveTab(tab);
        };
        
        const onEditorStateChange = editorState => {
            setEditorState(editorState);
            };

        const groupsOptions = [
            { value: '7563285', label: 'Crypto Bundle' },
            { value: '2345624', label: 'Bitcoin' },
            { value: '9843444', label: 'Payment Bundle' },
            { value: '3645364', label: 'Top 10 Bundle' }
            ];
        const balancingOptions = [
            { value: 'Monthly',  label: 'Monthly' },
            { value: 'Annually', label: 'Annually' }
            ];

        const statusOptions = [
            { value: 'Active',  label: 'Active' },
            { value: 'In-Active', label: 'In-Active' }
            ];


    return (
        <Row>
        <Col md={12} lg={12} xl={12}>
            <Card>
                <CardBody>
                <Row>
                <Col sm={6}>
                <div className="form-group">
                        <label htmlFor="name">product Name</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control form-control-m"
                        />
                </div>
                <div className="form-group">
                        <label htmlFor="rebalancing_frequency">Rebalancing Frequency</label>
                        <Select
                            id="rebalancing_frequency"
                            name="rebalancing_frequency"
                            options={balancingOptions}
                            onChange={item => setSelectedRebalancingFrequency(item)}
                            className={`basic-multi-select form-control-m`}
                            classNamePrefix="select"
                            />
                </div>
                <div className="form-group">
                        <label htmlFor="next_rebalance">Next Rebalance</label>
                        <input
                            type="text"
                            id="next_rebalance"
                            className="form-control form-control-m"
                        /> 
                </div>
                <div className="form-group">
                        <label htmlFor="name">Price</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control form-control-m"
                        /> 
                </div>
                <div className="form-group">
                        <label htmlFor="target_weight">Target Weight</label>
                        <input
                            type="text"
                            id="target_weight"
                            className="form-control form-control-m"
                        /> 
                </div>
                <div className="form-group">
                        <label htmlFor="constituents_no">Number Of Constituents</label>
                        <input
                            type="text"
                            id="constituents_no"
                            className="form-control form-control-m"
                        /> 
                </div>
            </Col>
            <Col sm={6}>
                <div className="form-group">
                        <label htmlFor="name">Product Group</label>
                        <Select
                            id="group"
                            name="group"
                            options={groupsOptions}
                            onChange={item => setSelectedGroup(item)}
                            className={`basic-multi-select form-control-m`}
                            classNamePrefix="select"
                            />
                </div>
                <div className="form-group">
                        <label htmlFor="name">Status</label>
                        <Select
                            id="status"
                            name="status"
                            options={statusOptions}
                            onChange={item => setSelectedStatus(item)}
                            className={`basic-multi-select form-control-m`}
                            classNamePrefix="select"
                            />
                </div>
                <div className="form-group">
                <label htmlFor="name">Description</label>
                <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={onEditorStateChange}
                    />
                    </div>
                    <div className="form-group">
                    <button
                            className="btn btn-primary"
                            disabled={confirmButtonDisabled || processing}
                        >
                            {processing ? 'Processing...' : 'Create'}
                        </button>
                        </div>
            </Col>
            </Row>
                </CardBody>
            </Card>
        </Col>
    </Row>
    );
}