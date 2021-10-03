import React, { useState, useMemo } from 'react';
import { Card, CardBody } from 'reactstrap';
import { HashLinkContainer } from 'components';
import DataTable from 'react-data-table-component';
import { Trash, Edit, UserMinus} from 'react-feather';
import { useHistory } from 'react-router-dom';
import Confirm from './ModalChangeUserStatus';
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

export default function UsersRoles(props) {
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showAddNew, setShowAddNew] = useState(false);
    const [roles, setRoles] = useState([]);
    const [filteredRoles, setFilteredRoles] = useState([]);
    const history = useHistory();


    useMemo(() => {
        const rolesList = [{
            roleID: '109977041',
            name: 'SUPER',
            description: 'SUPER Admin has all the access',
            created: 'just now',
            status: 'Active',
        }, {
            roleID: '109977042',
            name: 'Platform Administrator',
            description: 'Platform Administrator',
            created: '2 mins ago',
            status: 'Active',
        }, {
            roleID: '109977043',
            name: 'Training Administrator',
            description: 'SUPER Admin has all the access',
            created: '5 mins ago',
            status: 'Blocked',
        }, {
          roleID: '109977055',
          name: 'EcoSystem Administrator',
          description: 'EcoSystem Administrator',
          created: '5 mins ago',
          status: 'Blocked',
      }];
     setRoles(rolesList);
     setFilteredRoles(rolesList);


      }, []);
    // table headings definition
const columns = [ {
    name: 'Name',
    selector: 'name',
    sortable: true,
    wrap: true,
},{
    name: 'Description',
    selector: 'description',
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
    
        onSubmitDeleteUser(row);
      }}
    >
      <Trash width={16} height={16}/>
    </a></spam>
  </div>
}];

const handleChangePassword = async data => {
}

const handleDeleteUser = async data => {
}

const onSubmitChangeStatus= data => {
  // setShow(true)
  console.log(data);
    return <Confirm show={true} setShow={setShow} />;
  };

  const onSubmitDeleteUser= data => {
    console.log('delete user')
  };

  const onSearchFilter = filterText => {
    const filteredItems = roles.filter(item => (
      (item && item.name && item.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.description && item.description.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredRoles(filteredItems);
  }


    return (
        <Card className="o-hidden mb-4">
          <ModalUpdateAdminUser show={show} setShow={setShow} member={selectedUser} />
          <DeleteAdminUserAlert show={showDelete} setShow={setShowDelete} user={selectedUser} />
          <ModalResendPassword show={showResend} setShow={setShowResend} user={selectedUser} />
          <ModalAddNewUser show={showAddNew} setShow={setShowAddNew} />
            <CardBody className="p-0">
                <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
                    <span>User Roles Users</span>
                    <span className="flex-grow-1" /><input
                        style={inputWith}
                        type="text"
                        name="search"
                        className={`form-control form-control-rounded form-control-m`}
                        placeholder="Search..."
                        onKeyUp={e => onSearchFilter(e.target.value)}
                      />
                    <div>
                        <HashLinkContainer to="/users/add">
                            <button className="btn btn-secondary" type="button">
                                Add Role
                            </button>
                        </HashLinkContainer>
                    </div>
                </div>
            </CardBody>
            <DataTable
                data={filteredRoles}
                columns={columns}
                customStyles={customStyles}
                noHeader
                selectableRowsHighlight
                highlightOnHover
                pagination
            />
        </Card>
    );
}