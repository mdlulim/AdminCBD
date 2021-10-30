import React, { useState, useMemo } from 'react';
import { Card, CardBody } from 'reactstrap';
import Moment from 'react-moment';
import { HashLinkContainer } from 'components';
import DataTable from 'react-data-table-component';
import { Unlock,  Edit, UserMinus} from 'react-feather';
import { useHistory } from 'react-router-dom';
import ModalUpdateAdminUser from './ModalUpdateAdminUser';
import DeleteAdminUserAlert from './DeleteAdminUserAlert';
import ModalResendPassword from './ModalResendPassword';
import ModalAddNewUser from './ModalAddNewUser';
import { UserService } from '../../providers';
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
    float: 'Left'
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
      <div className={`btn btn-outline-${badge} btn-block disabled btn-sm`}>{status}</div>
    );
  };

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

export default function Users(props) {
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showResend, setShowResend] = useState(false);
    const [showAddNew, setShowAddNew] = useState(false);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const history = useHistory();


    useMemo(() => {
      UserService.getUsers().then((res) => {
        console.log(res.data.data);
        const userslist = res.data.data.results;
        setUsers(userslist);
        setFilteredUsers(userslist);
      });
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
    cell: row => <div><div>{row.first_name} {row.last_name}</div>
        <div className="small text-muted">
          <span>{row.id_number}</span>
        </div></div>
},{
    name: 'Username',
    selector: 'username',
    sortable: true,
},{
  name: 'User Role',
  selector: 'group',
  sortable: true,
cell: row => <div>{row.group.label}</div>
},
{
    name: 'Email Address',
    selector: 'email',
    sortable: true,
},{
    name: 'Date Created',
    selector: 'created',
    sortable: true,
    cell: row => <div>
                <strong><Moment date={row.created} format="D MMM YYYY" /></strong><br />
                <span className="text-muted"><Moment date={row.created} format="hh:mm:ss" /></span>
             </div>
},{
  name: 'Updated',
  selector: 'updated',
  sortable: true,
  cell: row => <div>
              <strong><Moment date={row.ModalUpdateAdminUser} format="D MMM YYYY" /></strong><br />
              <span className="text-muted"><Moment date={row.updated} format="hh:mm:ss" /></span>
           </div>
}, {
    name: 'Status',
    selector: 'status',
    sortable: true,
    cell: row => <Status {...row} />
}, {
    name: 'Actions',
    sortable: true,
    cell: row => <div>
    <div style={iconPadding}>
      <button
      href={`#`}
      className="btn btn-success btn-sm btn-icon"
      onClick={e => {
        e.preventDefault();
        onSubmitResendPassword(row);
      }}
    ><span className="fa fa-unlock" />
    </button></div>
    <div style={iconPadding}>
      <button
      className="btn btn-secondary btn-sm btn-icon"
      onClick={e => {
        e.preventDefault();
        onSubmitUpdateUser(row);
      }}
    ><span className="fa fa-pencil" />
    </button></div>
    <div style={iconPadding}><button
      className="btn btn-danger btn-sm btn-icon"
      onClick={e => {
        e.preventDefault();
    
        onSubmitDeleteUser(row);
      }}
    >
      <span className="fa fa-trash" />
    </button></div>
  </div>
}];

const handleChangePassword = async data => {
}

const handleDeleteUser = async data => {
}

const onSubmitUpdateUser= data => {
  setSelectedUser(data);
  setShow(true);
  };

  const onSubmitResendPassword= data => {
    setSelectedUser(data);
    setShowResend(true);
    };

  const onSubmitDeleteUser= data => {
    setSelectedUser(data);
    setShowDelete(true)
  };

  const onSearchFilter = filterText => {
    const filteredItems = users.filter(item => (
      (item && item.full_names && item.full_names.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.username && item.username.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.email && item.email.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredUsers(filteredItems);
  }


    return (
        <Card className="o-hidden mb-4">
          <ModalUpdateAdminUser show={show} setShow={setShow} member={selectedUser} />
          <DeleteAdminUserAlert show={showDelete} setShow={setShowDelete} user={selectedUser} />
          <ModalResendPassword show={showResend} setShow={setShowResend} user={selectedUser} />
          <ModalAddNewUser show={showAddNew} setShow={setShowAddNew} />
          
            <CardBody className="p-0">
                <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
                    <span>Admin Users</span>
                    <span className="flex-grow-1" /><input
                        style={inputWith}
                        type="text"
                        name="search"
                        className={`form-control form-control-m`}
                        placeholder="Search..."
                        onKeyUp={e => onSearchFilter(e.target.value)}
                      />
                    <div>
                            <button 
                            className="btn btn-secondary" 
                            type="button"
                            onClick={e => {
                              e.preventDefault();
                              setShowAddNew(true);
                            }}>
                                Add User
                            </button>
                    </div>
                </div>
            </CardBody>
            <DataTable
                data={filteredUsers}
                columns={columns}
                customStyles={customStyles}
                noHeader
                selectableRowsHighlight
                highlightOnHover
                pagination
            />
            <CardBody className="text-center border-top">
                <HashLinkContainer to="/users">
                    <a className="card-link font-weight-bold" href="/users">
                        More Users...
                    </a>
                </HashLinkContainer>
            </CardBody>
        </Card>
    );
}