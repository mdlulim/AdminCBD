import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { HashLinkContainer } from 'components';
import DataTable from 'react-data-table-component';
import { useParams, useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { TransactionService } from '../../providers';
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

export default function Transactions(props) {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const history = useHistory();

    useMemo(() => {
      TransactionService.getTransactions().then((res) => {
        console.log(res.data.data)
        const transaList = res.data.data.results;
        setTransactions(transaList);
        setFilteredTransactions(transaList);
      });

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
    cell: row => <div><div>{row.user.full_names}</div>
    <div className="small text-muted">
      <span>{row.user.id_number}</span>
    </div></div>
},{
    name: 'Transaction Type',
    selector: 'type',
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
    name: 'Date Created',
    selector: 'created',
    sortable: true,
}, {
    name: 'Status',
    selector: 'status',
    sortable: true,
    cell: row => <Status {...row} />
}, {
    name: 'Actions',
    sortable: true,
    cell: row => <div>
        <select class="form-control form-control-sm">
            <option>Update Status</option>
            <option>Completed</option>
            <option>Rejected</option>
        </select>
  </div>
}];

const handleChangePassword = async data => {
}

const handleDeleteMember = async data => {
}

const onSubmitChangeStatus= data => {
    return confirmAlert({
      title: 'Change Transaction Status',
      message: 'Are you sure you want to resend password for ' + data.full_names + '?',
      buttons: [{
        label: 'Yes',
        onClick: () => handleChangePassword(data),
      }, {
        label: 'Cancel',
      }]
    });
  };

  const onSubmitDeleteMember= data => {
    return confirmAlert({
      title: 'Delete Member',
      message: 'Are you sure you want to delete ' + data.full_names + '?',
      buttons: [{
        label: 'Yes',
        onClick: () => handleDeleteMember(data),
      }, {
        label: 'Cancel',
      }]
    });
  };

  const onSearchFilter = filterText => {
    const filteredItems = transactions.filter(item => (
      (item && item.user.full_names && item.user.full_names.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.type && item.type.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.status && item.status.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.user.id_number && item.user.id_number.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredTransactions(filteredItems);
  }


    return (
        <Card className="o-hidden mb-4">
            <CardBody className="p-0">
                <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
                    <span>Transactions</span>
                    <span className="flex-grow-1" />
                    <div style={selectPadding}>
                            <select class="form-control form-control-m">
                                <option>All Transactions</option>
                                <option>Pending</option>
                                <option>Failed</option>
                                <option>Transfers</option>
                                <option>Deposits</option>
                                <option>Withdrawals</option>
                                <option>Completed</option>
                            </select>
                    </div>
                    <input
                    style={inputWith}
                        type="text"
                        name="search"
                        className={`form-control form-control-m`}
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
            <CardBody className="text-center border-top">
                <HashLinkContainer to="/transactions">
                    <a className="card-link font-weight-bold" href="/transactions">
                        More Users...
                    </a>
                </HashLinkContainer>
            </CardBody>
        </Card>
    );
}