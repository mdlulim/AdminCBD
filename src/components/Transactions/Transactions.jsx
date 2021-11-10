import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import Moment from 'react-moment';
import { HashLinkContainer } from 'components';
import DataTable from 'react-data-table-component';
import { Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import ModalChangeStatus from './ModalChangeStatus';
import { TransactionService, MemberService } from '../../providers';
//import FeatherIcon from '../FeatherIcon';
import { Eye,  Edit,UserMinus} from 'react-feather';
import { Icon } from '@material-ui/core';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";

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

const iconPadding ={
    paddingRight: '3px',
}

const selectPadding ={
    paddingRight: '10px',
}

const inputWith={
  width: '20%'
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

export default function Transactions(props) {
  const { transactionType} = props;
    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
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
    const [wealthCreaters, setWealthCreaters] = useState([]);
    const history = useHistory();


    useMemo(() => {

            TransactionService.getTransactions().then((res) => {
              //let id = res.data.data.results[0].user_id;
              console.log(res.data.data.results);
              const transaList = res.data.data.results;
              if(transactionType === 'all'){
                setTransactions(transaList);
                setFilteredTransactions(transaList);
              }else if(transactionType === 'pending'){
                const results = transaList.filter(item => item.status === "Pending");
                setTransactions(results);
                setFilteredTransactions(results);
              }
              else if(transactionType === 'cancelled'){
                const results = transaList.filter(item => item.status === "Cancelled");
                setTransactions(results);
                setFilteredTransactions(results);
              }else if(transactionType === 'completed'){
                const results = transaList.filter(item => item.status === "Completed");
                setTransactions(results);
                setFilteredTransactions(results);
              }else if(transactionType === 'deposit'){
                const results = transaList.filter(item => item.subtype === "deposit");
                setTransactions(results);
                setFilteredTransactions(results);
              }else if(transactionType === 'withdrawals'){
                const results = transaList.filter(item => item.subtype === "withdrawal");
                setTransactions(results);
                setFilteredTransactions(results);
              }else if(transactionType === 'transfars'){
                const results = transaList.filter(item => item.subtype === "transfer");
                setTransactions(results);
                setFilteredTransactions(results);
              }
              
            });
        //getUserById('0192c293-fc26-47f0-a764-332b44dd08b1');

        MemberService.getMembers().then((res) => {
          //console.log(res.data.data)
          const memberslist = res.data.data.results;
          setMembers(memberslist);
        });

        MemberService.getWealthCreaters().then((res) => {
          console.log(res.data.data.results)
          const wealthCreaterslist = res.data.data.results;
          setWealthCreaters(wealthCreaterslist);
        });
  

      }, []);

      const GetUserById = (user_id) => {
        console.log(user_id)
        let member = members.filter(member => member.id === user_id)[0];
        let member2 = wealthCreaters.filter(wealthCreater => wealthCreater.id === user_id)[0];
        
        
        if(member){
          return member;
        }else{
          return member2;
        }
        

      }
      const columns = [{
        name: '',
        sortable: false,
        width: '80px',
        cell: () => <Image />
    }, {
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
        name: 'Amount',
        selector: 'amount',
        sortable: true,
    cell: row => <div> <strong className="text-success">+{row.amount} CBI</strong><br />
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
      disabled={row.status == "Completed" ? true: ''}
      onClick={e => {
        e.preventDefault();
        setSelectedTransaction(row)
        setShowUpdate(true)
      }}
    > <span className="fa fa-pencil" />
    </button>
      </div>
    }];

const handleChangePassword = async data => {
}

const handleDeleteMember = async data => {
}

const onSubmitChangeStatus= data => {
    return confirmAlert({
      title: 'Change Customer Status',
      message: 'Are you sure you want to resend password for ' + data.full_names + '?',
      buttons: [{
        label: 'Yes',
        onClick: () => handleChangePassword(data),
      }, {
        label: 'Cancel',
      }]
    });
  };

  const onSearchFilter = filterText => {
    const filteredItems = transactions.filter(item => (
      (item && item.type && item.type.toLowerCase().includes(filterText.toLowerCase())) ||
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
              console.log('Created date');
              console.log(searchByDate);
              setFilteredTransactions(searchByDate);
          }else{
            const searchByDate = transactions.filter(
              transaction => (Date.parse(transaction.updated)) >= start && (Date.parse(transaction.updated)) <= end);
              console.log('Actioned date');
              console.log(searchByDate);
              setFilteredTransactions(searchByDate);
          }

          setDisabled(false);
          setShow(false)
      }
    return (
        <Card className="o-hidden mb-4">
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
                            <button 
                            className="btn btn-secondary" 
                            type="button"
                            onClick={e => {
                              e.preventDefault();
                              setShow(true);
                            }}>
                                Search By DateRange
                            </button>
                    </div>
                </div>
            </CardBody>
            <DataTable
                data={filteredTransactions}
                columns={columns}
                customStyles={customStyles}
                noHeader
                selectableRowsHighlight
                highlightOnHover
                pagination
            />
            <Modal show={show} onHide={handleClose} centered className="confirm-modal">
            {/* <LoadingSpinner loading={loading} messageColor="primary" /> */}
            <Modal.Body>
                <Row>
                    <Col>
                        <h3 className="text-success">Search by date range </h3>
                        <hr />
                        <div class="row g-3">
                              <div class="col ">
                              <div class="form-control">
                                <label class="form-check-label" for="flexSwitchCheckDefault">Created Date</label>
                                </div>
                              </div>
                              <div class="col">
                              <div class="form-control">
                                <label class="form-check-label" for="flexSwitchCheckDefault">Actioned Date</label>
                                </div>
                              </div>
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