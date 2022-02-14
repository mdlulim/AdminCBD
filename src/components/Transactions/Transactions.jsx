import React, { useState, useMemo, useRef } from 'react';
import { Card, CardBody, Row, Col, Input } from 'reactstrap';
import Moment from 'react-moment';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Modal } from 'react-bootstrap';
import ModalChangeStatus from './ModalChangeStatus';
import TransactionDetails from '../Transactions/TransactionDetails';
import ModalBulkUpdate from './ModalBulkUpdate';
import { TransactionService, SessionProvider, FileStorageProvider } from '../../providers';
import DatePicker from "react-datepicker";
import 'react-data-table-component-extensions/dist/index.css';
import "react-datepicker/dist/react-datepicker.css";
import CsvDownloader from 'react-csv-downloader';

const inputWith = {
  width: '20%'
}
const inputWith2 = {
  width: '23%'
}

const myButtons = {
  padding: '2px',
  display: 'flex'
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
  return <strong className={'text-' + badge}>{simbol + '' + row.amount} {row.currency.code}</strong>
};

export default function Transactions(props) {
  const { transactionType, setPageLoading, permissions } = props;
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [csvTransactions, setCsvTransactions] = useState([])
  const handleClose = () => setShow(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [checkCreatedDate, setCheckCreatedDate] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(false);
  const [adminLevel, setAdminLevel] = useState({});
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [selectedTransPOP, setSelectedTransPOP] = useState('');
  const [showApproveMember, setShowApproveMember] = useState(false);
  const [forBank, setForBank] = useState(false)
  const params = useParams();
  const { id } = params;
  const csvDownloaderClick = useRef(null)
  const [page, setPage] = useState(1);
  const [totalTransactions, setTotalTransactions] = useState(0)
  const [countPerPage, setCountPerPage] = useState(10);
  const [pending, setPending] = React.useState(true);
  const [status, setStatus] = useState('all');


  const fetch = (offset, limit, status, startDate, endDate) => {
    setPending(true)
    TransactionService.getTransactions(offset, limit, transactionType, status, startDate, endDate).then((res) => {
      setTotalTransactions(res.count)
      const transaList = res.results;

      console.log(res)
      if (id != null && id.length > 15) {
        const results = transaList.filter(item => item.id === id);
        setTransactions(results);
        setFilteredTransactions(results);
      } else {
        setTransactions(res.results);
        setFilteredTransactions(res.results);
      }

      setPending(false)
      setPageLoading(false);
    })
  }

  useMemo(() => {
    if (SessionProvider.isValid()) {
      const user = SessionProvider.get();
      setAdminLevel(user.permission_level)
    }

    var date = new Date();
    date.setDate(date.getDate() - 30);
    var dateString = date.toISOString().split('T')[0]; // "2016-06-08"

    const d = new Date();
    let text = d.toString();

    const start_date = moment().add(-30, 'days')._d;
    const end_date = moment(text)._d;
    setStartDate(start_date)
    setEndDate(end_date)
    console.log(start_date)
    fetch(page - 1, countPerPage, status, start_date, end_date)
  }, []);



  const columns = [{
    name: 'Full Names',
    selector: 'id',
    sortable: true,
    wrap: true,
    cell: (row) => <div><div>{row.user ? row.user.first_name : ''} {row.user ? row.user.last_name : ''}</div>
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
      {permissions && permissions.update_access &&
        <button
          className="btn btn-secondary btn-sm btn-icon"
          disabled={adminLevel != 5 ? row.status == "Completed" ? true : '' : false}
          onClick={e => {
            e.preventDefault();
            onUpdateDeposit(row)
          }}
        > <span className="fa fa-pencil" />
        </button>
      }
    </div>
  }];


  const onSearchFilter = filterText => {
    const filteredItems = transactions.filter(item => (
      (item && item.user.first_name && item.user.first_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.user.last_name && item.user.last_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.user.id_number && item.user.id_number.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.type && item.type.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.status && item.status.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.subtype && item.subtype.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.txid && item.txid.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredTransactions(filteredItems);
  }

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }

  const onUpdateDeposit = (data) => {

    if (data.user.status === 'Pending') {
      TransactionService.getTransactionPOP(data.txid).then((res) => {
        const pop = res.data.data.rows;
        const url = pop[0].file;
        TransactionService.getTransactionPOPFile(url).then((res) => {
          setSelectedTransPOP(res.data);
        })
      });

      setSelectedTransaction(data)
      setShowApproveMember(true)
    } else {
      if (data.subtype === 'deposit') {
        TransactionService.getTransactionPOP(data.txid).then((res) => {
          console.log(res.count)
          const pop = res.rows;
          const url = pop[0].file;
          TransactionService.getTransactionPOPFile(url).then((res) => {
            setSelectedTransPOP(res.data);
          })
        });
      }
      setSelectedTransaction(data)
      setShowUpdate(true)
    }

  }

  const selectDataRange = (data) => {
    setDisabled(true);
    fetch((page - 1) * countPerPage, countPerPage, status, startDate, endDate)
    console.log(startDate, endDate)
    // if (checkCreatedDate === true) {
    //   const searchByDate = transactions.filter(
    //     transaction => (Date.parse(transaction.created)) >= start && (Date.parse(transaction.created)) <= end);
    //   setFilteredTransactions(searchByDate);
    // } else {
    //   const searchByDate = transactions.filter(
    //     transaction => (Date.parse(transaction.updated)) >= start && (Date.parse(transaction.updated)) <= end);
    //   setFilteredTransactions(searchByDate);
    // }
    setDisabled(false);
    setShow(false)
  }

  const filterChange = (e) => {
    setStatus(e.target.value)
    fetch((page - 1) * countPerPage, countPerPage, e.target.value, startDate, endDate)
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
      <ModalChangeStatus
        show={showUpdate}
        setShow={setShowUpdate}
        transaction={selectedTransaction}
        pop={selectedTransPOP}
      />

      <TransactionDetails
        show={showApproveMember}
        setShow={setShowApproveMember}
        transaction={selectedTransaction}
        pop={selectedTransPOP} />

      <CardBody className="p-0">
        <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
          <button
            style={inputWith2}
            className="btn btn-light d-none d-md-block float-right margin-right-5"
            id="dashboard-rp-customrange"
            onClick={e => {
              e.preventDefault();
              setShow(true);
            }}
          >
            <Moment date={startDate} format="D MMMM YYYY" /> - <Moment date={endDate} format="D MMMM YYYY" />
          </button>
          <span className="flex-grow-1" />
          <input
            style={inputWith}
            type="text"
            name="search"
            className={`form-control form-control-m`}
            placeholder="Search..."
            onKeyUp={e => onSearchFilter(e.target.value)}
            id="txSearch"
          />
          <div>
            <div style={myButtons}>
              <button
                className="btn btn-secondary m-2"
                type="button"
                onClick={e => {
                  e.preventDefault();
                  setShow(true);
                }}>
                Search By Date
              </button>
              {permissions && permissions.update_access &&
                <button
                  className={`btn ${forBank ? 'btn-secondary' : 'btn-light'} m-2`}
                  type="button"
                  disabled={status === 'Pending' ? false : true}
                  onClick={() => { setForBank(!forBank) }}>
                  For Processing
                </button>
              }


              <Input
                className="m-2"
                type="select"
                onChange={filterChange.bind(this)}

              >
                <option value="all">All</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Rejected">Rejected</option>
                <option value="InProgress">Processing</option>
              </Input>

              <button
                className="btn btn-secondary"
                type="button"
                disabled={filteredTransactions ? filteredTransactions.length < 1 : 0}
                onClick={
                  async () => {
                    var data = []
                    var csvData = []
                    if (forBank) {
                      filteredTransactions.forEach(row => {
                        data.push({ status: 'InProgress', txid: row.txid })
                        csvData.push({ TX_ID: row.txid, REFERRAL: row.user.referral_id, TYPE: row.subtype, AMOUNT: row.amount, STATUS: row.status })
                      })
                      const res = await FileStorageProvider.update_status(data)
                      if (res.success) {
                        setCsvTransactions(csvData)
                        csvDownloaderClick.current.click()
                      } else {
                        alert('Failed create csv!')
                      }

                    } else {
                      setCsvTransactions(filteredTransactions)
                      setForBank(false)

                      csvDownloaderClick.current.click()
                    }
                  }}
              >Export CSV</button>
              <CsvDownloader

                filename="myfile"
                extension=".csv"
                separator=","
                wrapColumnChar=""
                // columns={columns}
                datas={csvTransactions}
              >
                <button style={{ display: 'none' }} ref={csvDownloaderClick}></button>
              </CsvDownloader>
              {/* <ExportToExcel data={filteredTransactions} /> */}
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
        paginationServer
        paginationPerPage={countPerPage}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        onChangePage={page => { setPage(page); fetch((page - 1) * countPerPage, countPerPage, status, startDate, endDate) }}
        onChangeRowsPerPage={(rows) => { setCountPerPage(rows); fetch((page - 1) * rows, rows, status, startDate, endDate) }}
        paginationTotalRows={totalTransactions}
        progressPending={pending}
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