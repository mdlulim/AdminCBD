import React, { useState, useMemo } from 'react';
import { Card, CardBody } from 'reactstrap';
import { HashLinkContainer } from 'components';
import DataTable from 'react-data-table-component';
import { Trash, Edit, UserMinus } from 'react-feather';
import { useHistory } from 'react-router-dom';
import ModalUpdateCountry from '../Countries/ModalUpdateCountry';
import ModalBlackListCountry from '../Countries/ModalBlackListCountry';
import ModalAddCountry from '../Countries/ModalAddCountry';
// import DeleteUserRoleAlert from '../UserCountries/DeleteUserRoleAlert';
import { CountryService } from '../../providers';
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
const iconPadding = {
  paddingRight: '3px',
}
const inputWith = {
  width: '30%',
  marginRight: '20px'
}

const Status = ({ blacklisted }) => {
  let badge = 'success';
  let myStatus = 'Active';
  if (blacklisted === false) {
    badge = 'success';
    myStatus = 'Active';
  }
  if (blacklisted === true) {
    badge = 'danger';
    myStatus = 'Blacklisted';
  }
  return (
    <div className={`btn btn-outline-${badge} btn-block disabled btn-sm`}>{myStatus}</div>
  );
};

export default function Countries(props) {
  const { setPageLoading, permissions } = props;
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAddNew, setShowAddNew] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [filteredCountries, setFilteredCountries] = useState([]);
  const history = useHistory();


  useMemo(() => {
    CountryService.getCountries().then((res) => {
      const userslist = res.data.data.results;
      setCountries(userslist);
      setFilteredCountries(userslist);

      setPageLoading(false)
    });


  }, [setPageLoading]);
  // table headings definition
  const columns = [{
    name: 'Name',
    selector: 'nicename',
    sortable: true,
    wrap: true,
  }, {
    name: 'Phone Code',
    selector: 'phone_code',
    sortable: true,
  }, {
    name: 'Country Code',
    selector: 'num_code',
    sortable: true,
  }, {
    name: 'Status',
    selector: 'blacklisted',
    sortable: true,
    cell: row => <Status {...row} />
  }, {
    name: 'Actions',
    sortable: true,
    cell: row => <div>
      {permissions && permissions.update_access &&
        <span style={iconPadding}>
          <a
            href={`#`}
            className="btn btn-lg btn-info btn-sm"
            onClick={e => {
              e.preventDefault();
              onSubmitUnblacklist(row);
            }}
          ><Edit width={16} height={16} />
          </a>
        </span>
      }
      {permissions && permissions.delete_access &&
        <span style={iconPadding}>
          <a
            href={`#`}
            className="btn btn-lg btn-danger btn-sm"
            onClick={e => {
              e.preventDefault();
              onSubmitblacklist(row);
            }}
          >
            <Trash width={16} height={16} />
          </a>
        </span>
      }
    </div>
  }];


  const onSubmitUnblacklist = data => {
    setShow(true)
    setSelectedCountry(data);
  };

  const onSubmitblacklist = data => {
    setShowAddNew(true)
    setSelectedCountry(data);
  };

  const onSubmitDeleteRole = data => {
    setShowDelete(true);
    setSelectedCountry(data);
  };

  const onSearchFilter = filterText => {
    const filteredItems = countries.filter(item => (
      (item && item.name && item.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.description && item.description.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredCountries(filteredItems);
  }


  return (
    <Card className="o-hidden mb-4">
      <ModalUpdateCountry show={show} setShow={setShow} country={selectedCountry} />
      <ModalBlackListCountry show={showAddNew} setShow={setShowAddNew} country={selectedCountry} />
      {/* <DeleteUserRoleAlert show={showDelete} setShow={setShowDelete} role={selectedCountry} /> */}
      {/* <ModalAddCountry show={showAddNew} setShow={setShowAddNew} /> */}
      <CardBody className="p-0">
        <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
          <span>Countries</span>
          <span className="flex-grow-1" /><input
            style={inputWith}
            type="text"
            name="search"
            className={`form-control form-control-m`}
            placeholder="Search..."
            onKeyUp={e => onSearchFilter(e.target.value)}
          />
          <div>
            {/* <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={e => {
                              e.preventDefault();
                              setShowAddNew(true);
                            }}>
                                Add Country
                            </button> */}
          </div>
        </div>
      </CardBody>
      <DataTable
        data={filteredCountries}
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