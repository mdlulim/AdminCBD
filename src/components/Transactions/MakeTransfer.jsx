import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import Moment from 'react-moment';
import { HashLinkContainer, Common } from 'components';
import DataTable from 'react-data-table-component';
import { Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { TransactionService, MemberService, UserService } from '../../providers';
//import FeatherIcon from '../FeatherIcon';
import { Eye,  Edit,UserMinus} from 'react-feather';
import { Icon } from '@material-ui/core';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import Select from 'react-select';

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

export default function MakeTransfer(props) {
    const [show, setShow] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [temp, setTemp] = useState({});
    const handleClose = () => setShow(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedFromAccount, setSelectedFromAccount] = useState({});
    const [selectedToAccount, setSelectedToAccount] = useState({});
    const [members, setMembers] = useState([]);
    const [membersOptions, setMembersOptions] = useState([]);
    const [walletSender, setWalletSender] = useState(null);
    const [walletReciever, setWalletReciever] = useState(null);
    const [fees, setFees] = useState(null);
    const [userType, setUserType] = useState(null);
    const [processing, setProcessing] =useState(false);
    const [totalAmount, setTotalAmount] = useState(null);
    const history = useHistory();

    useMemo(() => {
      UserService.getUsersall().then((res) => {
          console.log(res.data.data.results);
          const membersList = res.data.data.results;
          let temp = [];
          membersList.filter(item => (
                    temp.push({ value: item.id, label: item.first_name+' '+item.last_name+' ('+item.referral_id+')', first_name: item.first_name , last_name: item.last_name, referral_id: item.referral_id, group: item.group})
                   // console.log(item)
                    //setProductCategories(productCategories => [{value:item.code, label:item.title}])
                ))
               console.log(temp)
          setMembersOptions(temp);
          setMembers(membersList);
        });

        const fees = [
            { name: 'member',  label: 'Member',fee: 1 },
            { name: 'wealth-creator', label: 'Wealth Creator' ,fee: 0.5 },
            { name: 'admin', label: 'Administrator' ,fee: 0 }
          ];
          setFees(fees);


      }, []);

const onSubmit= data => {
    return confirmAlert({
      title: 'Change Customer Status',
      message: 'Are you sure you want to resend password for ' + data.full_names + '?',
      buttons: [{
        label: 'Yes',
        onClick: () => makeTransfer(data),
      }, {
        label: 'Cancel',
      }]
    });
  };

  const makeTransfer = (data) =>{
      console.log(data)
  }


const recieverWallet = (item) =>{
    //Get member details
    MemberService.getMemberWallet(item.value).then((res) => {
         console.log(res.data.data)
       const walletDetails = res.data.data;
       setWalletSender(walletDetails);
     });
     console.log(fees)
     const userFee = fees.filter(fee => fee.name === item.group.name)[0];
     //console.log(userFee);
     setUserType(userFee);
}

  const onSearchFilter = filterText => {
    const filteredItems = transactions.filter(item => (
      (item && item.type && item.type.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.status && item.status.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredTransactions(filteredItems);
  }

    return (
        <Card className="o-hidden mb-4">
            <CardBody className="p-0">
                <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
                    <span className="flex-grow-1" />
                    
                      <div>
                      {/* <button 
                            className="btn btn-secondary"
                            type="button"
                            onClick={e => {
                              e.preventDefault();
                            }}>
                                + Add Funds
                            </button> */}
                            <button 
                            className="btn btn-secondary"
                            type="button"
                            onClick={e => {
                              e.preventDefault();
                            }}>
                                Buddy Tranfer
                            </button>
                    </div>
                </div>
            </CardBody>
            <CardBody>
            <Row>
                 <Col>
            <h1>Transfer CBI Tokens</h1>
            <span>Please use form below to specify details about your  transfer, and press submit button</span>
            <hr />
                <div className="row g-3">
                    <div className="col">
                    <label for="inputEmail4" class="form-label">Specify reciepent by name or user code</label>
                    <Select
                                    id="status"
                                    name="status"
                                    options={membersOptions}
                                    onChange={item => {
                                        setSelectedFromAccount(item);
                                        recieverWallet(item)}}
                                    className={`basic-multi-select form-control-m`}
                                    classNamePrefix="select"
                                    />
                                    <br />
                   { walletSender ? 
                    <Col lg={12}>
                    <Common.Widget
                        icon="li-wallet"
                        title={selectedFromAccount.first_name+' '+selectedFromAccount.last_name}
                        subtitle={walletSender.label+' | '+selectedFromAccount.referral_id}
                        informer={<span className="text-bold text-success">{walletSender.available_balance +' '+walletSender.currency_code}</span>}
                        invert={false}
                    />
                </Col>: ''}
                    </div>
                    <div className="col">
                    <label for="inputEmail4" className="form-label">Enter amount to transfer </label>
                    <div className="input-group">
                        <div className="input-group-text">CBI</div>
                        <input type="text" 
                        className="form-control" 
                        id="autoSizingInputGroup" 
                        placeholder="Amount" onChange={event => {
                            if(!isNaN(+event.target.value)){
                                setTotalAmount(event.target.value)
                                //setErrorAmount(true)
                            }else{
                               // setErrorAmount(false)
                            }
                        }}
                    />
                    {/* <label hidden={errorAmount} className="text-danger" htmlFor="name">Please enter a valid amount</label> */}
                        <br />
                        { userType? 
                    <Col lg={12}>
                        <br />
                    <Common.Widget
                        icon="li-wallet"
                        title={userType.label}
                        subtitle={'Transaction Fee: 00.000'}
                        informer={<span className="text-bold text-success">{totalAmount}</span>}
                        invert={false}
                    />
                </Col>: ''}
                    </div>
                    </div>
                </div>
                <hr/>
                <div className="row align-items-center m-0 g-3">
                <button disabled={disabled}
                            className="btn btn-primary"
                            disabled={disabled}
                            onClick={event => {
                                confirmAlert({
                                    title: 'Confirm submit',
                                    message: 'Are you sure you want to process this transactions',
                                    buttons: [
                                      {
                                        label: 'Yes',
                                        onClick: () => {
                                           console.log('Submitted')
                                        }
                                      }
                                    ]
                                  })
                            }}
                        >
                            {processing ? 'Processing...' : 'SUBMIT QUEST'}
                        </button>
                </div>
            </Col>
            </Row>
            </CardBody>
        </Card>
    );
}