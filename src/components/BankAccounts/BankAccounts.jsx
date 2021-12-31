import React, { useState, useMemo } from 'react';
import { Card, CardBody } from 'reactstrap';
import Moment from 'react-moment';
import { HashLinkContainer } from 'components';
import DataTable from 'react-data-table-component';
import { Unlock, Edit, Trash } from 'react-feather';
import { useHistory } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { BankAccountService, SessionProvider } from '../../providers';
import SendOTPBankAccount from './SendOTPBankAccount';
import { confirmAlert } from 'react-confirm-alert';
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

const Status = ({ status }) => {
  let badge = 'primary';
  if (status === 'Pending') {
    badge = 'warning';
  }
  if (status === 'Verified') {
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
  const { setPageLoading, pageLoading } = props;
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [showAddNew, setShowAddNew] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [adminLevel, setAdminLevel] = useState(0);
  const [filteredBankAccounts, setFilteredBankAccounts] = useState([]);
  const [selectedBankAccount, setSelectedBankAccount] = useState({});
  const history = useHistory();


  useMemo(() => {

    if (SessionProvider.isValid()) {
      const user = SessionProvider.get();
      setAdminLevel(user.permission_level)
    }
    BankAccountService.getPendingBankAccounts().then((res) => {
      //console.log('BankAccounts '+res.data.data.results)
      console.log(res.data)
      if (res.data.success) {
        const productlist = res.data.data.data.results;
        setBankAccounts(productlist);
        setFilteredBankAccounts(productlist);
      }

      setPageLoading(false);
    });

  }, [setPageLoading, pageLoading]);
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
      name: 'Mobile',
      selector: 'mobile',
      sortable: true,
      cell: row => <div>
        <strong>{row.user.mobile}</strong>
      </div>
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
        {adminLevel === 5 ? <div style={iconPadding}>
          <a
            href={`/bank-accounts/${row.id}`}
            className="btn btn-light btn-sm btn-icon"
          > <span className="fa fa-pencil" />
          </a></div> : ''}

      </div>
    }];

  const onSubmitChangeStatus = data => {
    setSelectedBankAccount(data);
    setShow(true);
    //return <Confirm show={show} setShow={setShow} />;
  };

  const handleChangePassword = async data => {
  }
  const onSubmitDeleteSetting = async data => {

  }

  const handleDeleteBankAccount = async data => {
  }

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
      <SendOTPBankAccount show={show} setShow={setShow} bankAccount={selectedBankAccount} />
      <CardBody className="p-0">
        <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
          <span>Bank Accounts</span>
          <span className="flex-grow-1" /><input
            style={inputWith}
            type="text"
            name="search"
            className={`form-control form-control-m`}
            placeholder="Search..."
            onKeyUp={e => onSearchFilter(e.target.value)}
          />
          {/* <div>
                            <a 
                            href={`products/add`}
                            className="btn btn-secondary">
                                Add BankAccount
                            </a>
                    </div> */}
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