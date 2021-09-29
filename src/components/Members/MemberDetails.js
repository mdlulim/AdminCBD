import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row } from 'reactstrap';
import { HashLinkContainer } from 'components';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { Modal } from '../../components'
//import FeatherIcon from '../FeatherIcon';
import { Eye,  Edit,UserMinus} from 'react-feather';
import { Icon } from '@material-ui/core';
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
    paddingRight: '4px',
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

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const history = useHistory();

    useMemo(() => {
        const customersList = [{
            customerId: '109977041',
            full_names: 'Mduduzi Mdluli',
            username: 'JSmith',
            email: 'example1@demo.com',
            country: 'South Africa',
            level: 'General',
            created: 'just now',
            status: 'Active',
        }, {
            customerId: '109977042',
            full_names: 'Msizi Mpanza',
            username: 'MsiziM',
            email: 'example2@demo.com',
            country: 'Namibia',
            level: 'Wealth Creator',
            created: '2 mins ago',
            status: 'Pending',
        }, {
            customerId: '109977043',
            full_names: 'Amanda Zungu',
            last_name: 'ZunguAmanda',
            username: 'McCallJ',
            email: 'example3@demo.com',
            country: 'South Africa',
            level: 'General',
            created: '5 mins ago',
            status: 'Blocked',
        }];
     setCustomers(customersList);
     setFilteredCustomers(customersList);


      }, []);
    // table headings definition
const columns = [{
    name: '',
    sortable: false,
    width: '80px',
    cell: () => <Image />
}, {
    name: 'Full Names',
    selector: 'full_names',
    sortable: true,
    wrap: true,
}, {
    name: 'Username',
    selector: 'username',
    sortable: true,
},{
    name: 'Email Address',
    selector: 'email',
    sortable: true,
},{
    name: 'Date Created',
    selector: 'created',
    sortable: true,
}, {
    name: 'Status',
    selector: 'status',
    sortable: true,
    cell: row => <Status {...row} />
}, {
    name: 'Actions',
    sortable: true,
    cell: row => <div>
    <spam style={iconPadding}><a
      href={`/admin/customers/profile/${row.customerId}`}
      className="btn btn-lg btn-primary btn-sm"
      onClick={e => {
        e.preventDefault();
        history.push(`customers/profile/${row.customerId}`);
      }}
    >
        <Eye width={16} height={16}/>
    </a></spam>
    <spam style={iconPadding}><a
      href={`#`}
      className="btn btn-lg btn-info btn-sm"
      onClick={e => {
        e.preventDefault();
        onSubmitChangeStatus(row);
      }}
    ><Edit width={16} height={16}/>
    </a></spam>
    <spam style={iconPadding}><a
      href={`#`}
      className="btn btn-lg btn-danger btn-sm"
      onClick={e => {
        e.preventDefault();
        onSubmitChangeStatus(row);
      }}
    >
      <UserMinus width={16} height={16}/>
    </a></spam>
  </div>
}];
const handleChangePassword = async data => {
}

const onSubmitChangeStatus= data => {
    return confirmAlert({
      title: 'Change Customer Status',
      message: 'Are you sure you want to resend password for ' + data.firstName + ' ' + data.lastName + '?',
      buttons: [{
        label: 'Yes',
        onClick: () => handleChangePassword(data),
      }, {
        label: 'Cancel',
      }]
    });
  };


    return (
        <Card className="o-hidden mb-4">
            <CardBody className="p-0">
                <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
                    <span>Customer</span>
                    <span className="flex-grow-1" />
                    <div>
                        <HashLinkContainer to="/customers/customers/43543366">
                            <button className="btn btn-secondary" type="button">
                                Add User
                            </button>
                        </HashLinkContainer>
                    </div>
                </div>
            </CardBody>
         

        </Card>
    );
}