import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import Moment from 'react-moment';
import { useParams, useHistory } from 'react-router-dom';
import { CSVLink } from "react-csv";
import DataTable from 'react-data-table-component';
import { Modal } from 'react-bootstrap';
import ModalChangeStatus from './ModalChangeStatus';
import ExportToExcel from './ExportToExcel';
import ModalBulkUpdate from './ModalBulkUpdate';
import { TransactionService, MemberService, SessionProvider } from '../../providers';
import DatePicker from "react-datepicker";
import 'react-data-table-component-extensions/dist/index.css';
import "react-datepicker/dist/react-datepicker.css";
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

const selectPadding = {
  paddingRight: '10px',
}

const inputWith = {
  width: '20%'
}

const myButtons = {
  padding: '2px'
}

const inputWithDate = {
  width: '25%'
}

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
    <div className={`btn btn-outline-${badge} btn-block disabled btn-sm`}>{status}</div>
  );
};

const Money = (row) => {
  let badge = 'pending';
  let simbol = '+';
  if (row.subtype === 'withdrawal' || row.subtype === 'Withdrawal') {
    simbol = '-';
    if (row.status === 'Pending') {
      badge = 'warning';
    } else {
      badge = 'danger'
    }
  } else {
    if (row.status === 'Pending') {
      badge = 'warning';
    } else if (row.status === 'Completed') {
      badge = 'success';
    } else {
      badge = 'danger';
    }
  }
  return <strong className={'text-' + badge}>{simbol + '' + row.amount} CBI</strong>
};

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr





export default function Transactions(props) {
  const { transactionType } = props;
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [temp, setTemp] = useState({});
  const handleClose = () => setShow(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [checkCreatedDate, setCheckCreatedDate] = useState(true);
  const [checkActionDate, setCheckActionDate] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(false);
  const [editStatus, setEditStatus] = useState(true);
  const [members, setMembers] = useState([]);
  const [adminLevel, setAdminLevel] = useState({});
  const [wealthCreaters, setWealthCreaters] = useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const params = useParams();
  const { id } = params;
  const history = useHistory();


  useMemo(() => {
    if (SessionProvider.isValid()) {
      const user = SessionProvider.get();
       setAdminLevel(user.permission_level)
   }
   
    TransactionService.getTransactions().then((res) => {
      const transaList = res.data.data.results;

      if (id != null && id.length > 15) {
        const results = transaList.filter(item => item.id === id);
        setTransactions(results);
        setFilteredTransactions(results);
      } else {
        if (transactionType === 'all') {
          setTransactions(transaList);
          setFilteredTransactions(transaList);
        } else if (transactionType === 'pending') {
          const results = transaList.filter(item => item.status === "Pending");
          setTransactions(results);
          setFilteredTransactions(results);
        }
        else if (transactionType === 'cancelled') {
          const results = transaList.filter(item => item.status === "Rejected");
          setTransactions(results);
          setFilteredTransactions(results);
        } else if (transactionType === 'completed') {
          const results = transaList.filter(item => item.status === "Completed");
          setTransactions(results);
          setFilteredTransactions(results);
        } else if (transactionType === 'deposit') {
          const results = transaList.filter(item => item.subtype.toLowerCase() === "deposit");
          setTransactions(results);
          setFilteredTransactions(results);
        } else if (transactionType === 'withdrawals') {
          const results = transaList.filter(item => item.subtype.toLowerCase() === "withdrawal");
          setTransactions(results);
          setFilteredTransactions(results);
        } else if (transactionType === 'transfars') {
          const results = transaList.filter(item => item.subtype.toLowerCase() === "transfer");
          setTransactions(results);
          setFilteredTransactions(results);
        }
      }
    });

  }, []);

  const columns = [{
    name: 'Full Names',
    selector: 'id',
    sortable: true,
    wrap: true,
    cell: (row) => <div><div>{row.user ? row.user.first_name :''} {row.user ? row.user.last_name : ''}</div>
      <div className="small text-muted">
        <span>{row.user ? row.user.id_number : ''}</span>
      </div></div>
  }, {
    name: 'TransactionID',
    selector: 'txid',
    sortable: true,
  }, {
    name: 'Type',
    selector: 'subtype',
    sortable: true,
  }, {
    name: 'Fees',
    selector: 'fee',
    sortable: true,
  }, {
    name: 'Amount',
    selector: 'amount',
    sortable: true,
    cell: row => <div> {Money(row)}<br />
      <span className="text-muted">{row.balance} CBI</span></div>
  }, {
    name: 'Status',
    selector: 'status',
    sortable: true,
    cell: row => <Status {...row} />
  }, {
    name: 'Date Actioned',
    selector: 'updated',
    sortable: true,
    cell: row => <div>
      <strong><Moment date={row.updated} format="D MMM YYYY" /></strong><br />
      <span className="text-muted"><Moment date={row.updated} format="hh:mm:ss" /></span>
    </div>
  }, {
    name: 'Actions',
    sortable: true,
    cell: row => <div>
      <button
        className="btn btn-secondary btn-sm btn-icon"
        disabled={adminLevel != 5 ? row.status == "Completed" ? true : '' : false}
        onClick={e => {
          e.preventDefault();
          setSelectedTransaction(row)
          setShowUpdate(true)
        }}
      > <span className="fa fa-pencil" />
      </button>
    </div>
  }];


  const onSearchFilter = filterText => {
    const filteredItems = transactions.filter(item => (
      (item && item.user.first_name && item.user.first_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.user.last_name && item.user.last_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.user.id_number && item.user.id_number.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.type && item.type.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.subtype && item.subtype.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.txid && item.txid.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.status && item.status.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredTransactions(filteredItems);
  }

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }

  const selectDataRange = (data) => {
    setDisabled(true);
    const start = Date.parse(startDate);
    const end = Date.parse(endDate);

    if (checkCreatedDate === true) {
      const searchByDate = transactions.filter(
        transaction => (Date.parse(transaction.created)) >= start && (Date.parse(transaction.created)) <= end);
      setFilteredTransactions(searchByDate);
    } else {
      const searchByDate = transactions.filter(
        transaction => (Date.parse(transaction.updated)) >= start && (Date.parse(transaction.updated)) <= end);
      setFilteredTransactions(searchByDate);
    }
    setDisabled(false);
    setShow(false)
  }

  const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
    //console.log(state.selectedRows)
  }, []);

  const contextActions = React.useMemo(() => {
    const handleBulkUpdate = () => {
      setShowBulk(true)
    };

    return (
      <button
        className="btn btn-secondary"
        type="button"
        onClick={handleBulkUpdate}>
        <span className="fa fa-pencil" /> Bulk Update
      </button>
    );
  }, [filteredTransactions, selectedRows, toggleCleared]);

  return (
    <Card className="o-hidden mb-4">
      <ModalBulkUpdate show={showBulk} setShow={setShowBulk} transactions={selectedRows} />
      <ModalChangeStatus show={showUpdate} setShow={setShowUpdate} transaction={selectedTransaction} />
      <CardBody className="p-0">
        <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
          <span>Transactions</span>
          <span className="flex-grow-1" />
          <input
            style={inputWith}
            type="text"
            name="search"
            className={`form-control form-control-m`}
            placeholder="Search..."
            onKeyUp={e => onSearchFilter(e.target.value)}
          />
          <div>
            <div style={myButtons}>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={e => {
                  e.preventDefault();
                  setShow(true);
                }}>
                Search By Date
              </button>
              <CSVLink className="btn btn-info btn-icon" data={filteredTransactions}>Export CSV</CSVLink>
              <ExportToExcel data={filteredTransactions} />
            </div>
          </div>
        </div>
      </CardBody>

      <DataTable
        columns={columns}
        data={filteredTransactions}
        selectableRows
        contextActions={contextActions}
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleCleared}
        pagination
      />
      <Modal show={show} onHide={handleClose} centered className="confirm-modal">
        {/* <LoadingSpinner loading={loading} messageColor="primary" /> */}
        <Modal.Body>
          <Row>
            <Col>
              <h3 className="text-success">Search by date range </h3>
              <hr />
              <div className="form-group">
                <label htmlFor="from">From</label>
                <DatePicker style={inputWithDate} className={`form-control form-control-m`} selected={startDate} onChange={(date) => setStartDate(date)} />
              </div>
              <div className="form-group">
                <label htmlFor="email">To</label>
                <DatePicker style={inputWithDate} className={`form-control form-control-m`} selected={endDate} onChange={(date) => setEndDate(date)} />
              </div>
              <hr />
              <Row>
                <Col md={6}>
                  <button
                    className="btn btn-dark"
                    onClick={e => {
                      e.preventDefault();
                      setShow(false);
                    }}
                  >
                    {'Cancel'}
                  </button>
                </Col>
                <Col md={6} >
                  <button
                    className="btn btn-success float-right"
                    onClick={selectDataRange}
                    disabled={disabled}
                  >
                    {'Search'}
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </Card>
  );
}