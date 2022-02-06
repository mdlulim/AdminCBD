import React, { useState, useMemo, useRef } from 'react';
import { Card, CardBody, Row, Col, Input, FormGroup, Label } from 'reactstrap';
import Moment from 'react-moment';
import { useParams, useHistory } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { AccountService ,SessionProvider} from '../../providers';
import 'react-data-table-component-extensions/dist/index.css';

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

const Money = (row) => {
  let badge = 'pending';
  let simbol = '+';
  if (row.subtype === 'admin-credit') {
    simbol = '-';
      badge = 'danger'
  } else {
      badge = 'success';
  }
  return <strong className={'text-' + badge}>{simbol + '' + row.amount} {row.currency.code}</strong>
};

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr





export default function Transactions(props) {
  const { transactionType, setPageLoading, permissions } = props;
  const [show, setShow] = useState(false);
  const [reports, setReports] = useState([]);
  const [filteredReport, setFilteredReport] = useState([]);
  const [temp, setTemp] = useState({});
  const handleClose = () => setShow(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const csvDownloaderClick = useRef(null)


  useMemo(() => {
    if (SessionProvider.isValid()) {
      const user = SessionProvider.get();
    }
    AccountService.debitCreditHistory().then((res) => {
            console.log(res)
            setReports(res);
            setFilteredReport(res);
    });

  }, [setPageLoading]);



  const columns = [
    ,{
      name: 'TransactionID',
      selector: 'txid',
      sortable: true,
    },{
      name: 'Type',
      selector: 'subtype',
      sortable: true,
    },
    {
      name: 'From',
      selector: 'id',
      sortable: true,
      wrap: true,
      cell: (row) => <div>{ row.subtype === 'admin-debit' ? 
      <><div>{row.user ? row.user.first_name : ''} {row.user ? row.user.last_name : ''}</div>
        <div className="small text-muted">
          <span>{row.user ? row.user.referral_id : ''}</span>
        </div> </>: 'Amain Account'}</div>
    },
    {
    name: 'To',
    selector: 'id',
    sortable: true,
    wrap: true,
    cell: (row) => <div>{ row.subtype === 'admin-credit' ? 
      <><div>{row.user ? row.user.first_name : ''} {row.user ? row.user.last_name : ''}</div>
        <div className="small text-muted">
          <span>{row.user ? row.user.referral_id : ''}</span>
        </div> </>: 'Amain Account'}</div>
  },{
    name: 'Amount',
    selector: 'amount',
    sortable: true,
    cell: row => <div> {Money(row)}</div>
  },{
    name: 'Reason',
    selector: 'approval_reason',
    sortable: true,
  },{
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
    const filteredItems = reports.filter(item => (
      (item && item.user.first_name && item.user.first_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.user.last_name && item.user.last_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.user.referral_id && item.user.referral_id.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.type && item.type.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.status && item.status.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.subtype && item.subtype.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.txid && item.txid.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredReport(filteredItems);
  }

  return (
    <Card className="o-hidden mb-4">
      <CardBody className="p-0">
        <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
          <span>Debit/Credit History</span>
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
        data={filteredReport}
        clearSelectedRows={toggleCleared}
        pagination
      />
    </Card>
  );
}