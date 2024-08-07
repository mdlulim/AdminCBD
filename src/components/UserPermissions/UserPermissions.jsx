import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { HashLinkContainer } from 'components';
import DataTable from 'react-data-table-component';
import { Trash, Edit, Settings} from 'react-feather';
import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';
import ModalUpdateUserRole from '../UserRoles/ModalUpdateUserRole';
import ModalAddNewRole from '../UserRoles/ModalAddNewRole';
import DeleteUserRoleAlert from '../UserRoles/DeleteUserRoleAlert';
import { UserRolesService } from '../../providers';
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
    const [selectedRole, setSelectedRole] = useState({});
    const [filteredRoles, setFilteredRoles] = useState([]);
    const [exportDropdownExpanded, setExportDropdownExpanded] = useState(false);
    const history = useHistory();


    useMemo(() => {
      UserRolesService.getUserRoles().then((res) => {
        const userslist = res.data.data.results;
        setRoles(userslist);
        setFilteredRoles(userslist);
      });
      }, []);
    // table headings definition
const columns = [ {
    name: 'Name',
    selector: 'name',
    sortable: true,
    wrap: true,
},{
  name: 'Label',
  selector: 'label',
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
    cell: row => <div><Moment format="MMM D, YYYY">{row.created}</Moment></div>
}, {
    name: 'Actions',
    sortable: true,
    cell: row => <div>
      <spam style={iconPadding}><a
      href={`roles/${row.id}`}
      className="btn btn-lg btn-primary btn-sm"
    >
        <Settings width={16} height={16}/>
    </a></spam>
    <spam style={iconPadding}>
      <a
      href={`#`}
      className="btn btn-lg btn-info btn-sm"
      onClick={e => {
        e.preventDefault();
        onSubmitUpdateRole(row);
      }}
    ><Edit width={16} height={16}/>
    </a></spam>
    {/* <spam style={iconPadding}><a
      href={`#`}
      className="btn btn-lg btn-danger btn-sm"
      onClick={e => {
        e.preventDefault();
        onSubmitDeleteRole(row);
      }}
    >
      <Trash width={16} height={16}/>
    </a></spam> */}
  </div>
}];


const onSubmitUpdateRole= data => {
    setSelectedRole(data);
    setShow(true);
    //console.log(data);
  };

  const onSubmitDeleteRole= data => {
    setShowDelete(true);
    setSelectedRole(data);
  };

  const onSearchFilter = filterText => {
    const filteredItems = roles.filter(item => (
      (item && item.name && item.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.description && item.description.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredRoles(filteredItems);
  }

  const ExpandedComponent = ({ data }) => {
        const row = JSON.stringify(data, null, 2);
        return (
            <div className="row__expandable">
                <Row >
                    {row}
                </Row>
                <hr />
    </div>
    );
    }


    return (
        <Card className="o-hidden mb-4">
          <ModalUpdateUserRole show={show} setShow={setShow} role={selectedRole} />
          <DeleteUserRoleAlert show={showDelete} setShow={setShowDelete} role={selectedRole} />
          <ModalAddNewRole show={showAddNew} setShow={setShowAddNew} />
            <CardBody className="p-0">
                <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
                    <span>User Roles</span>
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
                                Add User Role
                            </button>
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
                expandableRows
                expandableRowsComponent={<ExpandedComponent />}
                pagination
            />
        </Card>
    );
}