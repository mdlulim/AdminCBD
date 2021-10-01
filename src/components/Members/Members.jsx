import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { HashLinkContainer } from 'components';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import ModalChangeStatus from './ModalChangeStatus';
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
const inputWith={
  width: '30%'
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

export default function Customers(props) {
  const [show, setShow] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const history = useHistory();

    useMemo(() => {
        const customersList = [{
            customerId: '109977041',
            full_names: 'Mduduzi Mdluli',
            username: 'JSmith',
            email: 'example1@demo.com',
            id_number: '9103025869089',
            country: 'South Africa',
            level: 'General',
            created: 'just now',
            status: 'Active',
        }, {
            customerId: '109977042',
            full_names: 'Msizi Mpanza',
            username: 'MsiziM',
            email: 'example2@demo.com',
            id_number: '9103025869084',
            country: 'Namibia',
            level: 'Wealth Creator',
            created: '2 mins ago',
            status: 'Pending',
        }, {
            customerId: '109977043',
            full_names: 'Amanda Zungu',
            last_name: 'ZunguAmanda',
            username: 'McCallJ',
            id_number: '9103025869085',
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
},{
    name: 'Id Number',
    selector: 'id_number',
    sortable: true,
},{
    name: 'Username',
    selector: 'username',
    sortable: true,
},
{
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
      href={`members/${row.customerId}`}
      className="btn btn-lg btn-primary btn-sm"
    >
        <Eye width={16} height={16}/>
    </a></spam>
    <spam style={iconPadding}>
      <a
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
    
        onSubmitDeleteMember(row);
      }}
    >
      <UserMinus width={16} height={16}/>
    </a></spam>
  </div>
}];

const handleChangePassword = async data => {
}

const handleDeleteMember = async data => {
}

const onSubmitChangeStatus= data => {
  setShow(true)
  console.log(data);
    //return <Confirm show={show} setShow={setShow} />;
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
      (item && item.full_names && item.full_names.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.username && item.username.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.email && item.email.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.id_number && item.id_number.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredCustomers(filteredItems);
  }


    return (
        <Card className="o-hidden mb-4">
          <ModalChangeStatus show={show} setShow={setShow} />
            <CardBody className="p-0">
                <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
                    <span>CBI Members</span>
                    <span className="flex-grow-1" />
                    <input
                    style={inputWith}
                        type="text"
                        name="search"
                        className={`form-control form-control-rounded form-control-m`}
                        placeholder="Search..."
                        onKeyUp={e => onSearchFilter(e.target.value)}
                      />
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