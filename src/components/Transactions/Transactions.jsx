import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import Moment from 'react-moment';
import { useParams, useHistory } from 'react-router-dom';
import { HashLinkContainer } from 'components';
import { CSVLink, CSVDownload } from "react-csv";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { Modal } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import ModalChangeStatus from './ModalChangeStatus';
import ExportToExcel from './ExportToExcel';
import ModalBulkUpdate from './ModalBulkUpdate';
import { TransactionService, MemberService } from '../../providers';
//import FeatherIcon from '../FeatherIcon';
import { Eye,  Edit,UserMinus} from 'react-feather';
import { Icon } from '@material-ui/core';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import 'react-data-table-component-extensions/dist/index.css';
import "react-datepicker/dist/react-datepicker.css";
import { Session } from 'bc-react-session';

const session = Session.get();
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

const selectPadding ={
    paddingRight: '10px',
}

const inputWith={
  width: '20%'
}

const myButtons={
  padding: '2px'
}

const inputWithDate={
  width: '25%'
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
    if(row.subtype === 'withdrawal' || row.subtype === 'Withdrawal' ){
      simbol = '-';
      if(row.status === 'Pending'){
         badge = 'warning';
      }else{
        badge = 'danger'
      }
    }else{
      if(row.status === 'Pending'){
        badge = 'warning';
      }else if(row.status === 'Completed'){
          badge = 'success';
      }else{
        badge = 'danger';
      }
    }
    return <strong className={'text-'+badge}>{simbol+''+row.amount} CBI</strong>
  };

  // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr





export default function Transactions(props) {
  const { transactionType} = props;
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
      setAdminLevel(session.name.payload.user.permission_level)
            TransactionService.getTransactions().then((res) => {
              //let id = res.data.data.results[0].user_id;
              //.log(res.data.data.results);
              const transaList = res.data.data.results;
              let transTemp =[];
              transactions.map((transaction,num) =>{

              });
              console.log(id)
            if(id != null && id.length > 15){
              const results = transaList.filter(item => item.id === id);
              setTransactions(results);
              setFilteredTransactions(results);
            }else{
              if(transactionType === 'all'){
                setTransactions(transaList);
                setFilteredTransactions(transaList);
              }else if(transactionType === 'pending'){
                const results = transaList.filter(item => item.status === "Pending");
                setTransactions(results);
                setFilteredTransactions(results);
              }
              else if(transactionType === 'cancelled'){
                const results = transaList.filter(item => item.status === "Rejected");
                setTransactions(results);
                setFilteredTransactions(results);
              }else if(transactionType === 'completed'){
                const results = transaList.filter(item => item.status === "Completed");
                setTransactions(results);
                setFilteredTransactions(results);
              }else if(transactionType === 'deposit'){
                const results = transaList.filter(item => item.subtype.toLowerCase() === "deposit");
                setTransactions(results);
                setFilteredTransactions(results);
              }else if(transactionType === 'withdrawals'){
                const results = transaList.filter(item => item.subtype.toLowerCase() === "withdrawal");
                setTransactions(results);
                setFilteredTransactions(results);
              }else if(transactionType === 'transfars'){
                const results = transaList.filter(item => item.subtype.toLowerCase() === "transfer");
                setTransactions(results);
                setFilteredTransactions(results);
              }
            }
            });
        //getUserById('0192c293-fc26-47f0-a764-332b44dd08b1');

        MemberService.getMembers().then((res) => {
          const memberslist = res.data.data.results;
          setMembers(memberslist);
          setUsers(memberslist);
        });

        MemberService.getWealthCreaters().then((res) => {
          //.log(res.data.data.results)
          const wealthCreaterslist = res.data.data.results;
          setWealthCreaters(wealthCreaterslist);
        });




      }, []);

      const GetUserById = (user_id) => {
        let member = members.filter(member => member.id === user_id)[0];
        let member2 = wealthCreaters.filter(wealthCreater => wealthCreater.id === user_id)[0];

        if(member){
          return member;
        }else{
          return member2;
        }

      }
      const columns = [{
        name: 'Full Names',
        selector: 'id',
        sortable: true,
        wrap: true,
        cell: (row) => <div><div>{GetUserById(row.user_id)? GetUserById(row.user_id).first_name: ''} {GetUserById(row.user_id)? GetUserById(row.user_id).last_name: ''}</div>
        <div className="small text-muted">
        <span>{GetUserById(row.user_id)? GetUserById(row.user_id).id_number: ''}</span>
        </div></div>
    },{
        name: 'TransactionID',
        selector: 'txid',
        sortable: true,
    },{
        name: 'Type',
        selector: 'subtype',
        sortable: true,
    },{
      name: 'Fees',
      selector: 'fee',
      sortable: true,
  },{
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
    },{
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
      disabled={adminLevel != 5? row.status == "Completed" ? true: '':false}
      onClick={e => {
        e.preventDefault();
        setSelectedTransaction(row)
        setShowUpdate(true)
      }}
    > <span className="fa fa-pencil" />
    </button>
      </div>
    }];

    // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
    const downloadCSV = (filteredTransactions) =>{
      const link = document.createElement('a');
      let csv = convertArrayOfObjectsToCSV(filteredTransactions);
      if (csv == null) return;

      const filename = 'export.csv';

      if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
      }

      link.setAttribute('href', encodeURI(csv));
      link.setAttribute('download', filename);
      link.click();
    }


    const convertArrayOfObjectsToCSV = (filteredTransactions) =>{

      let result;

      const columnDelimiter = ',';
      const lineDelimiter = '\n';
      const keys = Object.keys(filteredTransactions[0]);

      result = '';
      result += keys.join(columnDelimiter);
      result += lineDelimiter;

      filteredTransactions.forEach(item => {
        let ctr = 0;
        keys.forEach(key => {
          if (ctr > 0) result += columnDelimiter;

          result += item[key];
          ctr++;
        });
        result += lineDelimiter;
      });
      return result;
    }



  const onSearchFilter = filterText => {
    const filteredItems = transactions.filter(item => (
      (item && item.type && item.type.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.subtype && item.subtype.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.txid && item.txid.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.status && item.status.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredTransactions(filteredItems);
  }

  const handleSelectDateRange = (data) =>{
    console.log(data);
  }

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }

  const selectDataRange = (data) =>{
    setDisabled(true);
    const start = Date.parse(startDate);
    const end = Date.parse(endDate);
    
          if(checkCreatedDate === true){
            const searchByDate = transactions.filter(
              transaction => (Date.parse(transaction.created)) >= start && (Date.parse(transaction.created)) <= end);
              //console.log('Created date');
              //console.log(searchByDate);
              setFilteredTransactions(searchByDate);
          }else{
            const searchByDate = transactions.filter(
              transaction => (Date.parse(transaction.updated)) >= start && (Date.parse(transaction.updated)) <= end);
              //console.log('Actioned date');
              //console.log(searchByDate);
              setFilteredTransactions(searchByDate);
          }
          setDisabled(false);
          setShow(false)
      }

      const rowSelectCritera = row => row.fat > 6;

      const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
        //console.log(state.selectedRows)
      }, []);

      const contextActions = React.useMemo(() => {
        const handleBulkUpdate = () => {
               console.log(selectedRows)
                    setShowBulk(true)
              //  return confirmAlert({
              //   title: 'Update Transaction',
              //   message: 'Are you sure you want to update bulk transactions?',
              //   buttons: [{
              //     label: 'Yes',
              //     onClick: () => {
              //       setSelectedTransaction(row)
              //       setShowUpdate(true)
              //     },
              //   }, {
              //     label: 'Cancel',
              //   }]
              // });
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

    // const Export = ({ onExport }) => <button onClick={e => onExport(e.target.value)}>Export</button>;
    // const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(filteredTransactions)} />, []);
    return (
        <Card className="o-hidden mb-4">
          <ModalBulkUpdate show={showBulk} setShow={setShowBulk} transactions={selectedRows}/>
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
                            {/* <span className="fa fa-download" /> */}
                            <CSVLink className="btn btn-info btn-icon" data={filteredTransactions}>Export CSV</CSVLink>
                            <ExportToExcel data={filteredTransactions}/>
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
                        {/* <div class="row g-3">
                              <div class="col ">
                              <div class="form-check form-switch">
                              <input 
                                class="form-check-input" 
                                type="checkbox"
                                checked={checkCreatedDate}
                                       onChange={() => {
                                         setCheckCreatedDate(!checkCreatedDate)
                                          setCheckActionDate(checkCreatedDate)
                                        }}
                                id="flexSwitchCheckDefault" />
                                <label class="form-check-label" for="flexSwitchCheckDefault">Created Date</label>
                                </div>
                              </div>
                              <div class="col">
                              <div class="form-check form-switch">
                              <input 
                                class="form-check-input" 
                                type="checkbox"
                                checked={checkActionDate}
                                       onChange={() => {
                                         setCheckActionDate(!checkActionDate)
                                           setCheckCreatedDate(checkActionDate)
                                        }}
                                id="flexSwitchCheckDefault" />
                                <label class="form-check-label" for="flexSwitchCheckDefault">Actioned Date</label>
                                </div>
                              </div>
                        </div> */}
                                <div className="form-group">
                                    <label htmlFor="from">From</label>
                                    <DatePicker style={inputWithDate}  className={`form-control form-control-m`} selected={startDate} onChange={(date) => setStartDate(date)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">To</label>
                                    <DatePicker style={inputWithDate}  className={`form-control form-control-m`} selected={endDate} onChange={(date) => setEndDate(date)} />
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