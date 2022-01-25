import React, { useState, useMemo } from 'react';
import { Card, CardBody } from 'reactstrap';
import Moment from 'react-moment';
import { HashLinkContainer } from 'components';
import DataTable from 'react-data-table-component';
import { Unlock, Edit, Trash } from 'react-feather';
import { useHistory } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { CompanyBankAccountService, SessionProvider } from '../../providers';
import { confirmAlert } from 'react-confirm-alert';
import AddCompanyBankDetails from './AddCompanyBankDetails';
import UpdateCompanyBankDetails from './UpdateCompanyBankDetails';
// styles AddCompanyBankDetails
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

export default function BankAccounts(props) {
  const { setPageLoading, permissions } = props;
  const [show, setShow] = useState(false);
  const [showBank, setShowBank] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [showAddNew, setShowAddNew] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [filteredBankAccounts, setFilteredBankAccounts] = useState([]);
  const [selectedBankAccount, setSelectedBankAccount] = useState({});
  const history = useHistory();


  useMemo(() => {
    CompanyBankAccountService.getCompanyBankAccounts().then((res) => {
      //console.log('BankAccounts '+res.data.data.results)
      const data = res.results;
      setBankAccounts(data);
      setFilteredBankAccounts(data);

      setPageLoading(false)
    });

  }, [setPageLoading]);
  // table headings definition
  const columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      wrap: true,
    }, {
      name: 'AccountNo',
      selector: 'number',
      sortable: true,
    }, {
      name: 'BankName',
      selector: 'bank_name',
      sortable: true,
    }, {
      name: 'Type',
      selector: 'type',
      sortable: true,
    }, {
      name: 'Bank Code',
      selector: 'bank_code',
      sortable: true,
    }, {
      name: 'Status',
      selector: 'status',
      sortable: true,
      cell: row => <Status {...row} />
    }, {
      name: 'Created Date',
      selector: 'created',
      sortable: true,
      cell: row => <div>
        <strong><Moment date={row.created} format="D MMM YYYY" /></strong><br />
        <span className="text-muted"><Moment date={row.created} format="hh:mm:ss" /></span>
      </div>
    }, {
      name: 'Actions',
      sortable: true,
      cell: row => <div>
        {permissions && permissions.update_access &&
          <div style={iconPadding}>
            <a
              href={`#`}
              className="btn btn-light btn-sm btn-icon"
              onClick={e => {
                e.preventDefault();
                setSelectedBankAccount(row)
                setShowBank(true)
              }}
            > <span className="fa fa-pencil" />
            </a>
          </div>
        }

      </div>
    }];

  const onSubmitChangeStatus = data => {
    setSelectedBankAccount(data);
    setShow(true);
    //return <Confirm show={show} setShow={setShow} />;
  };

  const onSubmitUpdateBankAccount = data => {
    setSelectedBankAccount(data);
    setShow(true);
  };

  const onSubmitResendPassword = data => {
    setSelectedBankAccount(data);
    setShowResend(true);
  };

  const onSubmitDeleteBankAccount = data => {
    setSelectedBankAccount(data);
    setShowDelete(true)
  };

  const onSearchFilter = filterText => {
    const filteredItems = bankAccounts.filter(item => (
      (item && item.name && item.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.number && item.number.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.bank_name && item.bank_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.bank_code && item.bank_code.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.branch_code && item.branch_code.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.status && item.status.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.type && item.type.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredBankAccounts(filteredItems);
  }


  return (
    <Card className="o-hidden mb-4">
      <AddCompanyBankDetails show={show} setShow={setShow} bankAccount={selectedBankAccount} />
      <UpdateCompanyBankDetails show={showBank} setShow={setShowBank} bankAccount={selectedBankAccount} />

      <CardBody className="p-0">
        <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
          <span>Bank Details</span>
          <span className="flex-grow-1" /><input
            style={inputWith}
            type="text"
            name="search"
            className={`form-control form-control-m`}
            placeholder="Search..."
            onKeyUp={e => onSearchFilter(e.target.value)}
          />
          {permissions && permissions.create_access &&
            <div>
              <button
                onClick={e => {
                  setShow(true)
                }}
                className="btn btn-secondary">
                Add New
              </button>
            </div>
          }
        </div>
      </CardBody>
      <DataTable
        data={filteredBankAccounts}
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