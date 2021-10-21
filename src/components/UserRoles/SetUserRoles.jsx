import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { HashLinkContainer } from 'components';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import Switch from "react-switch";
//import FeatherIcon from '../FeatherIcon';
import { Eye,  Edit,UserMinus} from 'react-feather';
import { Icon } from '@material-ui/core';
import PropTypes from 'prop-types';
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

const selectPadding ={
    paddingRight: '10px',
}

const inputWith={
  width: '25%'
}
const tableColumnWith={
    width: '10px'
  }
  

const Image = () => {
    return (
        <img
            alt=""
            height="32px"
            style={{ borderRadius: 4 }}
            width="32px"
            src={require("images/1.jpeg")}
        />
    );
};

const Status = ({ status }) => {
    let badge = 'primary';
    if (status === 'Pending') {
      badge = 'warning';
    }
    if (status === 'Completed') {
      badge = 'success';
    }
    if (status === 'Rejected') {
        badge = 'danger';
      }
    return (
      <span className={`badge badge-${badge}`}>{status}</span>
    );
  };

export default function Customers(props) {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [checked, setChecked] = useState(false);
    const history = useHistory();

    useMemo(() => {
        const customersList = [{
            config_id: '109977041',
            name:'Members',
            create: true,
            update: true,
            delete: false,
        }, {
            config_id: '109977042',
            name:'Worlth Creaters',
            create: false,
            update: true,
            delete: false,
        }, {
            config_id: '109977043',
            name:'Users',
            create: true,
            update: true,
            delete: false,
        }];
     setCustomers(customersList);
     setFilteredCustomers(customersList);


      }, []);
    // table headings definition
const columns = [ {
    style: {tableColumnWith},
    name: '',
    selector: 'members',
    sortable: true,
    wrap: true,
    cell: row => <div>{row.name}</div>
},{
    name: 'View',
    selector: 'view',
    sortable: true,
    cell: row => <div>
        <Switch checked={row.view} onChange={(checked) => setChecked(checked)} /></div>
},{
    name: 'Create New',
    selector: 'create',
    sortable: true,
    cell: row => <div><Switch checked={row.create} onChange={(checked) => setChecked(checked)}/></div>
},{
    name: 'Update',
    selector: 'update',
    sortable: true,
    cell: row => <div><Switch checked={row.update} onChange={(checked) => setChecked(checked)}/></div>
},
{
    name: 'Delete',
    selector: 'delete',
    sortable: true,
    cell: row => <div><Switch checked={row.delete} onChange={(checked) => setChecked(checked)}/></div>
}, {
    name: 'Actions',
    sortable: true,
    cell: row => <div>
    <spam style={iconPadding}>
      <a
      href={`#`}
      className="btn btn-lg btn-info btn-sm"
      onClick={e => {
        e.preventDefault();
        //onSubmitUpdateRole(row);
      }}
    ><Edit width={16} height={16}/>
    </a></spam>
  </div>
}];

const handleChangePassword = async data => {
}

const handleDeleteMember = async data => {
}

const onSubmitChangeStatus= data => {
    return confirmAlert({
      title: 'Change Customer Status',
      message: 'Are you sure you want to resend password for ' + data.full_names + '?',
      buttons: [{
        label: 'Yes',
        onClick: () => handleChangePassword(data),
      }, {
        label: 'Cancel',
      }]
    });
  };

  const onSubmitDeleteMember= data => {
    return confirmAlert({
      title: 'Delete Member',
      message: 'Are you sure you want to delete ' + data.full_names + '?',
      buttons: [{
        label: 'Yes',
        onClick: () => handleDeleteMember(data),
      }, {
        label: 'Cancel',
      }]
    });
  };

  const onSearchFilter = filterText => {
    const filteredItems = customers.filter(item => (
      (item && item.user.full_names && item.user.full_names.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.type && item.type.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.status && item.status.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.user.id_number && item.user.id_number.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredCustomers(filteredItems);
  }


    return (
        <Card className="o-hidden mb-4">
            <CardBody className="p-0">
                <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
                    <span>System administrator</span>
                    <span className="flex-grow-1" />
                    </div>
            </CardBody>
            <DataTable
                data={filteredCustomers}
                columns={columns}
                customStyles={customStyles}
                noHeader
                selectableRowsHighlight
                highlightOnHover
                pagination
            />
            <CardBody className="text-center border-top">
                <HashLinkContainer to="/customers">
                    <a className="card-link font-weight-bold" href="/customers">
                        More Users...
                    </a>
                </HashLinkContainer>
            </CardBody>
        </Card>
    );
}