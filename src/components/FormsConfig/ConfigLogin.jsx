import React, { useState, useMemo } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
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

	const toggleTab = (e, tab) => {
		e.preventDefault();
		setActiveTab(tab);
	};

    return (
            <Col md={12} lg={12} xl={12}>
                <h3 className="text-success" >Login</h3>
                <div>
                    <table striped bordered hover>
                    <thead>
                        <tr><th> Label </th> <th> Actions </th></tr>
                    </thead>
                    <tbody>
                    {loginForm.fields && loginForm.fields.map(field =>
                        <tr key={field.id}>
                        <td>
                          <input
                            type="text"
                            value={field.label}
                            onChange={''}
                          />
                        </td>
                        <td>
                          <button
                            onClick={''}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )}
                    </tbody>
                    </table>
                    <hr/>
                    <input type="text" value={'Message'} onChange={''} />
                    <button onClick={''}  >  Add Item</button>
                </div>
            </Col>
    );
}