import React, { useState, useMemo, useRef } from 'react';
import { Card, CardBody, Row, Col, Input, FormGroup, Label } from 'reactstrap';
import Moment from 'react-moment';
import { useParams, useHistory } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Modal } from 'react-bootstrap';
import { Common } from 'components'
import TransactionDetails from '../Transactions/TransactionDetails';
import { TransactionService, MemberService, SessionProvider, FileStorageProvider } from '../../providers';
import DatePicker from "react-datepicker";
import 'react-data-table-component-extensions/dist/index.css';
import "react-datepicker/dist/react-datepicker.css";
import CsvDownloader from 'react-csv-downloader';
import { Filter } from 'react-feather';
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


const selectPadding = {
  paddingRight: '10px',
}

const inputWith = {
  width: '20%'
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




export default function TransactionFees(props) {
  const { transactionType, transactions, totals } = props;
  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const handleClose = () => setShow(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [activeFilter, setActiveFilter] = useState('all')
  const params = useParams();
  const { id } = params;
  const csvDownloaderClick = useRef(null)


  useMemo(() => {
        setFilteredTransactions(transactions);

  }, []);



  const columns = [{
    name: 'From',
    selector: 'id',
    sortable: true,
    wrap: true,
    cell: (row) => <div><div>{row.user ? row.user.first_name : ''} {row.user ? row.user.last_name : ''}</div>
      <div className="small text-muted">
        <span>{row.user ? 'Referral: '+row.user.referral_id : ''}</span>
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
  }];


  const onSearchFilter = filterText => {
    const filteredItems = transactions.filter(item => (
      (item && item.user.first_name && item.user.first_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.user.last_name && item.user.last_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.user.id_number && item.user.id_number.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.user.referral_id && item.user.referral_id.toLowerCase().includes(filterText.toLowerCase())) ||
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

      const searchByDate = transactions.filter(
        transaction => (Date.parse(transaction.updated)) >= start && (Date.parse(transaction.updated)) <= end);
      setFilteredTransactions(searchByDate);
    setDisabled(false);
    setShow(false)
  }
  const filterChange = (e) => {
    if (e.target.value === 'all') {
      setFilteredTransactions(transactions);
    } else {
      const results = transactions.filter(item => item.status === e.target.value);
      setFilteredTransactions(results);
    }
    setActiveFilter(e.target.value)

  }

  return (
    <Card className="o-hidden mb-4">
         <div className="form-row margin-bottom-20">
                        <Col xs={12} lg={3}>
                        <a href={``} >
                            <Common.Widget
                                icon="li-receipt"
                                title="Deposits"
                                subtitle="Fees"
                                informer={<><span className="text-bold text-success">{totals.deposit} {transactions ? transactions[0].currency.code: 'CBI'}</span></>}
                                invert={false}
                            /></a>
                        </Col>
                        <Col xs={12} lg={3}>
                        <a href={``} >
                            <Common.Widget
                                icon="li-receipt"
                                title="Withdrawal"
                                subtitle="Fees"
                                informer={<><span className="text-bold text-success">{totals.withdraw} {transactions ? transactions[0].currency.code: 'CBI'}</span> </>}
                                invert={false}
                            /></a>
                        </Col>
                        <Col xs={12} lg={3}>
                        <a href={``} >
                            <Common.Widget
                                icon="li-receipt"
                                title="Transfer"
                                subtitle="Fees"
                                informer={<><span className="text-bold text-success">{totals.transfer} {transactions ? transactions[0].currency.code: 'CBI'}</span> </>}
                                invert={false}
                            /></a>
                        </Col>
                        <Col xs={12} lg={3}>
                        <a href={``} >
                            <Common.Widget
                                icon="li-receipt"
                                title="Product"
                                subtitle="Fees"
                                informer={<><span className="text-bold text-success">{totals.product} {transactions ? transactions[0].currency.code: 'CBI'}</span> </>}
                                invert={false}
                            /></a>
                        </Col>
                    </div>
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
            id="txSearch"
          />
        </div>
      </CardBody>

      <DataTable
        columns={columns}
        data={filteredTransactions}
        pagination
      />
      <Modal show={show} onHide={handleClose} centered className="confirm-modal">
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