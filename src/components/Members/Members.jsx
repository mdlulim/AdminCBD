import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col, Input } from 'reactstrap';
import Moment from 'react-moment';
import moment from 'moment';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import ModalChangeStatus from './ModalChangeStatus';
import TransactionDetails from '../Transactions/TransactionDetails';
import { MemberService, TransactionService } from '../../providers';
import DatePicker from "react-datepicker";
import 'react-data-table-component-extensions/dist/index.css';
import "react-datepicker/dist/react-datepicker.css";
//import FeatherIcon from '../FeatherIcon';
// styles

const inputWithDate = {
  width: '25%'
}
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

const myButtons = {
  padding: '2px',
  display: 'flex'
}

const iconPadding = {
  paddingRight: '3px',
  float: 'Left'
}
const inputWith = {
  width: '20%'
}

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
    // <span className={`badge badge-${badge}`}>{status}</span>
    <div className={`btn btn-outline-${badge} btn-block disabled btn-sm`}>{status}</div>
  );
};

export default function Members(props) {
  const { setPageLoading, permissions } = props;
  const [show, setShow] = useState(false);
  const [showTransaction, setShowTransaction] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [members, setMembers] = useState([]);
  const [selectedTransPOP, setSelectedTransPOP] = useState('');
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState({});
  const [transaction, setTransaction] = useState({});
  const [page, setPage] = useState(1);
  const [totalMembers, setTotalMembers] = useState(0)
  const [countPerPage, setCountPerPage] = useState(10);
  const [pending, setPending] = React.useState(true);
  const [status, setStatus] = useState('all');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [disabled, setDisabled] = useState(false);
  const [showDateRange, setShowDateRange] = useState(false);
  const handleClose = () => setShow(false);

  async function fetch(offset, limit, status) {
      const memberslist = await MemberService.getMembers(offset, limit, status);
      console.log(memberslist)
      setTotalMembers(memberslist.count);
      setMembers(memberslist.results);
      setFilteredMembers(memberslist.results);
      setPending(false)
      setPageLoading(false);
  }

  useMemo(() => {
    var date = new Date();
    date.setDate(date.getDate() - 30);
    var dateString = date.toISOString().split('T')[0]; // "2016-06-08"

    const d = new Date();
    let text = d.toString();

    const start_date = moment().add(-30, 'days')._d;
    const end_date = moment(text)._d;
    setStartDate(start_date)
    setEndDate(end_date)
    fetch(page - 1, countPerPage, status)

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
  }, {
    name: 'Username',
    selector: 'username',
    sortable: true,
  }, {
    name: 'Referral',
    selector: 'referral_id',
    sortable: true,
  }, {
    name: 'Mobile',
    selector: 'mobile',
    sortable: true,
  },
  {
    name: 'Email Address',
    selector: 'email',
    sortable: true,
  }, {
    name: 'Date Created',
    selector: 'created',
    sortable: true,
    cell: row => <div>
      <strong><Moment date={row.created} format="D MMM YYYY" /></strong><br />
      <span className="text-muted"><Moment date={row.created} format="hh:mm:ss" /></span>
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
      <div style={iconPadding}><a
        href={`members/${row.id}`}
        className="btn btn-secondary btn-sm btn-icon ml-2"
      >
        <span className="fa fa-eye" />
      </a></div>
      {permissions && permissions.update_access &&
        <div style={iconPadding}>
          {row.status === 'Pending' ?
            <a
              href={`#`}
              className="btn btn-light btn-sm btn-icon"
              onClick={e => {
                e.preventDefault();
                onSubmitApproveMember(row);
              }}
            > <span className="fa fa-pencil" />
            </a> : <a
              href={`#`}
              className="btn btn-light btn-sm btn-icon"
              onClick={e => {
                e.preventDefault();
                setSelectedMember(row);
                setShow(true)
                //onSubmitChangeStatus(row);
              }}
            > <span className="fa fa-pencil" />
            </a>}
        </div>
      }
    </div>
  }];

  // const onSubmitChangeStatus = data => {
  //   setSelectedMember(data);
  //   setShow(true);
  //   //return <Confirm show={show} setShow={setShow} />;
  // };

  const onSubmitDeleteMember = data => {
    setSelectedMember(data);
    setShowDelete(true);
  };
  const selectDataRange = (data) => {
    setDisabled(true);
    fetch((page - 1) * countPerPage, countPerPage, status, startDate, endDate);
    setDisabled(false);
    setShow(false)
  }

  const onSubmitApproveMember = data => {
    TransactionService.getMemberTransactions(data.id).then((res) => {
      const transaList = res.data.data.results;
      if (transaList.length) {
        TransactionService.getTransactionPOP(transaList[0].txid).then((res) => {
          if (res.data) {
            const pop = res.data.data.rows;
            const url = pop[0].file;
            TransactionService.getTransactionPOPFile(url).then((res) => {
              setSelectedTransPOP(res.data);
            })
          }
        });

        setTransaction(transaList[0])
        setShowTransaction(true)
      } else {
        return confirmAlert({
          title: 'Transaction ',
          message: 'There is no pending transaction for ' + data.first_name + ' ' + data.last_name + '!',
          buttons: [
            {
              label: 'Ok',
            }
          ]
        });
      }
      // setTransactions(transaList);
      // setFilteredTransactions(transaList);
    });
    setSelectedMember(data);
    setShowDelete(true);
  };

  const countMembers = (type) => {
    const countTypes = this.props.movies.filter(movie => movie.media_type === type);
    return countTypes.length;
  };

  const filterChange = (e) => {
    setStatus(e.target.value)
    fetch((page-1)*countPerPage, countPerPage, e.target.value)
  }

  const onSearchFilter = filterText => {
    const filteredItems = members.filter(item => (
      (item && item.first_name && item.first_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.last_name && item.last_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.referral_id && item.referral_id.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.mobile && item.mobile.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.username && item.username.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.email && item.email.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.status && item.status.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.id_number && item.id_number.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredMembers(filteredItems);
  }


  return (
    <Card className="o-hidden mb-4">
      <ModalChangeStatus show={show} setShow={setShow} member={selectedMember} />
      <TransactionDetails
        show={showTransaction}
        setShow={setShowTransaction}
        transaction={transaction}
        pop={selectedTransPOP}
      />
      {/* <DeleteAlert show={showDelete} setShow={setShowDelete} member={selectedMember} /> */}
      <CardBody className="p-0">
        <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
          <span>CBI Members</span>
          <span className="flex-grow-1" />
          <input
                style={inputWith}
                type="text"
                name="search"
                className={`form-control form-control-m`}
                placeholder="Search..."
                onKeyUp={e => onSearchFilter(e.target.value)}
          />
          <Input  style={inputWith}
                className="m-2"
                type="select" onChange={filterChange.bind(this)} >
                <option value="all">All</option>
                <option value="Pending">Pending</option>
                <option value="Active">Active</option>
                <option value="Blocked">Blocked</option>
                <option value="Archived">Archived</option>
          </Input>
              <div style={myButtons}>
              <button
                className="btn btn-secondary m-2"
                type="button"
                onClick={e => {
                  e.preventDefault();
                  setShowDateRange(true);
                }}>
                Search By Date
              </button>
              </div>
        </div>
      </CardBody>
      <DataTable
        data={filteredMembers}
        columns={columns}
        customStyles={customStyles}
        noHeader
        selectableRowsHighlight
        highlightOnHover
        pagination
        paginationServer
        paginationPerPage={countPerPage}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        onChangePage={page => { console.log((page - 1) * countPerPage, ' ----- ', countPerPage); setPage(page); fetch((page - 1) * countPerPage, countPerPage, status) }}
        onChangeRowsPerPage={(rows) => { setCountPerPage(rows); fetch((page - 1) * rows, rows, status) }}
        paginationTotalRows={totalMembers}
        progressPending={pending}
      />
      <Modal show={showDateRange} onHide={handleClose} centered className="confirm-modal">
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
                      setShowDateRange(false);
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