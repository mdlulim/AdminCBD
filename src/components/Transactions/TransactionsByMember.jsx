import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import Moment from 'react-moment';
import { HashLinkContainer } from 'components';
import DataTable from 'react-data-table-component';
import { useParams, useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import ModalChangeStatus from './ModalChangeStatus';
import TransactionDetails from './TransactionDetails';
import { TransactionService, AccountService, MemberService} from '../../providers';
//import FeatherIcon from '../FeatherIcon';
import { Eye,  Edit,UserMinus} from 'react-feather';
import { Icon } from '@material-ui/core';
import PropTypes from 'prop-types';
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

export default function TransactionsByMember(props) {
  const { userWallet } = props;
    const [show, setShow] = useState(false);
    const [showTransaction, setShowTransaction] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState([]);
    const [selectedTransPOP, setSelectedTransPOP] = useState('');
    const [userWallet2, setUserWallet] = useState({})
    const [sponsorWallet, setSponsorWallet] = useState({})
    const [mainWallet, setMainWallet] = useState({})
    const [member, setMember] = useState({})
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const history = useHistory();
    const params = useParams();
    const { id } = params;

    useMemo(() => {
       //Get member details
       MemberService.getMember(id).then((res) => {
            const memberDetails = res.data.data;
            //console.log(memberDetails);
            setMember(memberDetails);
        });

      TransactionService.getMemberTransactions(id).then((res) => {
       // console.log('Transaction by member')
       // console.log(res.data.data.results)
        const transaList = res.data.data.results;
        setTransactions(transaList);
        setFilteredTransactions(transaList);
      });

      }, []);
    // table headings definition
const columns = [{
    name: 'Type',
    selector: 'subtype',
    sortable: true,
},{
  name: 'TransactionID',
  selector: 'txid',
  sortable: true,
},{
    name: 'Amount',
    selector: 'amount',
    sortable: true,
    cell: row => <div>{row.currency.code} {row.amount}</div>
},
{
    name: 'Fee',
    selector: 'fee',
    sortable: true,
    cell: row => <div>{row.currency.code} {row.fee}</div>
},{
    name: 'Total Amount',
    selector: 'total_amount',
    sortable: true,
    cell: row => <div>{row.currency.code} {row.total_amount}</div>
},{
    name: 'Balance',
    selector: 'balance',
cell: row => <div>{row.currency.code} {row.balance}</div>
},{
    name: 'Created',
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
      <div style={iconPadding}>
            <button 
            onClick={e => {
              e.preventDefault();
              onSubmitChangeStatus(row);
            }}
            className="btn btn-secondary btn-sm btn-icon">
                        <span className="fa fa-pencil"></span>
                    </button>
                    </div>
                    {row.subtype.toLowerCase() === 'deposit' ?
                    <div style={iconPadding}><button
            onClick={e => {
              e.preventDefault();
              onSubmitTransactionDetails(row);
            }}
            className="btn btn-secondary btn-sm btn-icon">
                        <span className="fa fa-eye"></span>
                    </button></div>: ''}
      </div>
}];

const handleChangePassword = async data => {
}

const handleDeleteMember = async data => {
}

const onSubmitChangeStatus= data => {
  setSelectedTransaction(data);
  setShow(true);
  };
  //=========================================Approve Pending Deposit=========================================================
  const onSubmitTransactionDetails= data => {
    //console.log(userWallet)
   TransactionService.getTransactionPOP(data.txid).then((res) => {
     //console.log(res.data.data.rows[0])
       const pop = res.data.data.rows;
       const url = pop[0].file;
       //setSelectedTransPOP(url);
       
        TransactionService.getTransactionPOPFile(url).then((res) => {
            setSelectedTransPOP(res.data);
           // console.log(url)
        })
     });
    setSelectedTransaction(data);
    setShowTransaction(true);
        // console.log(data);
      //return <Confirm show={show} setShow={setShow} />;
  };


  const onSearchFilter = filterText => {
    const filteredItems = transactions.filter(item => (
      (item && item.txid && item.txid.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.subtype && item.subtype.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.status && item.status.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredTransactions(filteredItems);
  }


    return (
        <Card className="o-hidden mb-4">
           <ModalChangeStatus show={show} setShow={setShow} transaction={selectedTransaction} />
           <TransactionDetails show={showTransaction} setShow={setShowTransaction}
            transaction={selectedTransaction}
            pop={selectedTransPOP}
            member={member}
            userWallet={userWallet}
            sponsorWallet={sponsorWallet}
            mainWallet={mainWallet} />
           
            <CardBody className="p-0">
                <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
                    <span className="text-primary">Transactions</span>
                    <span className="flex-grow-1" />
                    <input
                    style={inputWith}
                        type="text"
                        name="search"
                        className={`form-control form-control-sm`}
                        placeholder="Search..."
                        onKeyUp={e => onSearchFilter(e.target.value)}
                      />
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
        </Card>
    );
}