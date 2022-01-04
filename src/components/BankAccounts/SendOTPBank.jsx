import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import Moment from 'react-moment';
import { HashLinkContainer } from 'components';
import { FeatherIcon } from 'components';
import DataTable from 'react-data-table-component';
import { Unlock,  Edit, Trash} from 'react-feather';
import { useHistory } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { BankAccountService, SessionProvider } from '../../providers';
import VerifyBankAccount from './VerifyBankAccount';
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
const iconPadding ={
    paddingRight: '3px',
}
const inputWith={
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
    const { bankAccount } = props;
    const [show, setShow] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showResend, setShowResend] = useState(false);
    const [showVerify, setShowVerify] = useState(false);
    const [error, setError] = useState([]);
    const [adminLevel, setAdminLevel]     = useState(0);
    const [filteredBankAccounts, setFilteredBankAccounts] = useState([]);
    const [selectedBankAccount, setSelectedBankAccount] = useState({});
    const history = useHistory();


    useMemo(() => {

    if (SessionProvider.isValid()) {
        const user = SessionProvider.get();
        setAdminLevel(user.permission_level)
    }
    //   BankAccountService.getPendingBankAccounts().then((res) => {
    //     //console.log('BankAccounts '+res.data.data.results)
    //     console.log(res.data.data.data)
    //     if(res.data.success){
    //       const productlist = res.data.data.data.results;
    //       setBankAccounts(productlist);
    //       setFilteredBankAccounts(productlist);
    //     }
    //   });

      }, []);
    // table headings definition
const columns = [
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
    wrap: true,
},{
    name: 'AccountNo',
    selector: 'number',
    sortable: true,
}, {
  name: 'BankName',
  selector: 'bank_name',
  sortable: true,
},{
  name: 'Type',
  selector: 'type',
  sortable: true,
},{
  name: 'Bank Code',
  selector: 'bank_code',
  sortable: true,
},{
    name: 'Mobile',
    selector: 'mobile',
    sortable: true,
    cell: row => <div>
                <strong>{row.user.mobile}</strong>
             </div>
  },{
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
},{
    name: 'Actions',
    sortable: true,
    cell: row => <div>
     { adminLevel === 5 ?<div style={iconPadding}>
        <a
          href={`/bank-accounts/${row.id}`}
          className="btn btn-light btn-sm btn-icon"
        > <span className="fa fa-pencil" />
        </a></div>: ''}
    
  </div>
}];

const onSubmitChangeStatus = data => {
    setSelectedBankAccount(data);
    setShow(true);
    //return <Confirm show={show} setShow={setShow} />;
  };


const onSubmitUpdateBankAccount= data => {
  setSelectedBankAccount(data);
  setShow(true);
  };

  const onSubmitResendPassword= data => {
    setSelectedBankAccount(data);
    setShowResend(true);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setDisabled(true);
        setError('');
        console.log(bankAccount)
        const form = event.currentTarget;
        const data = {
            title: form.title.value,
            category: bankAccount.category,
            value: form.tx_value.value,
            key: bankAccount.key,
            subcategory: bankAccount.subcategory,
        }
        setShowVerify(true)
            BankAccountService.sendOTP(bankAccount.id, bankAccount).then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    setShow(false)
                    setShowVerify(true)
                    // return confirmAlert({
                    //     title: 'Succcess',
                    //     message: 'Setting was successfully updated',
                    //     buttons: [
                    //       {
                    //         label: 'Ok',
                    //         onClick: () => {
                    //             window.location = '/configurations/bankAccounts';
                    //         }
                    //       }
                    //     ]
                    // });
                } else {
                    setError(response.data.message);
                }
                setDisabled(false);
            })
        setDisabled(false);
    
      }


    return (
        <Row>
            <Col md={12} lg={6} xl={6}>
                    <Card className="o-hidden author-box" style={{ minHeight: 300 }}>
          
                <VerifyBankAccount show={showVerify} setShow={setShowVerify}bankAccount={bankAccount} />
                    <Col xs={10}>
                        <h3 className="text-success"> Verify Bank Account</h3>
                        <hr />
                        <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="fullname">Title</label>
                                    {bankAccount ?
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="form-control form-control-m"
                                        defaultValue={bankAccount.name }
                                    />
                                    : ''}
                            </div>
                            <div className="form-group">
                                    <label htmlFor="fullname">Account Number</label>
                                    {bankAccount ?
                                    <input
                                        type="text"
                                        id="tx_type"
                                        name="tx_type"
                                        className="form-control form-control-m"
                                        defaultValue={bankAccount.number }
                                        disabled
                                    />
                                    : ''}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Account Type</label>
                                {bankAccount ?
                                    <input
                                        type="text"
                                        id="percentage"
                                        name="percentage"
                                        className="form-control form-control-m"
                                        defaultValue={bankAccount.type}
                                        disabled
                                    />
                                    : ''}
                            </div>
                            <div className="form-group">
                                <label htmlFor="value">Bank Name</label>
                                {bankAccount ?
                                    <input
                                        type="text"
                                        id="tx_value"
                                        name="tx_value"
                                        className="form-control form-control-m"
                                        defaultValue={bankAccount.bank_name}
                                    />
                                    : ''}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Branc Code</label>
                                {bankAccount ?
                                    <input
                                        type="text"
                                        id="subtype"
                                        name="subtype"
                                        className="form-control form-control-m"
                                        value={bankAccount.branch_code}
                                        disabled
                                    />
                                    : ''}
                            </div>
                            <hr />
                            <Row>
                                <Col md={6}>
                                    <a
                                        className="btn btn-dark"
                                        style={{color: 'white'}}
                                    >
                                    {'Cancel'}
                                </a>
                            </Col>
                            <Col md={6} >
                            <button
                                type="submit"
                                className="btn btn-success float-right"
                            >
                                {'Send OTP'}
                            </button>
                                </Col>
                            </Row>
                             </form> 
                    </Col>
          </Card>
         </Col>
        </Row>
    );
}