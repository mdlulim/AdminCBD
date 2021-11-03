import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { HashLinkContainer } from 'components';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import Confirm from './ModalChangeStatus';
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
const inputWith={
  width: '30%'
}

const Status = ({ status }) => {
    let badge = 'primary';
    let myStatus ='Defualt'
    if (status === 'Pending') {
      badge = 'warning';
      myStatus ='Not Defualt';
    }
    if (status === 'Active') {
      badge = 'success';
      myStatus ='Defualt';
    }

    return (
      <div className={`btn btn-outline-${badge} btn-block disabled btn-sm`}>{status}</div>
    );
  };

export default function Referals(props) {
  const [show, setShow] = useState(false);
    const [bankingDetails, setBankingDetails] = useState([]);
    const [filteredBankingDetails, setFilteredBankingDetails] = useState([]);
    const history = useHistory();

    useMemo(() => {
        const bankingDetailsList = [{
            bankingDetailId: '109977041',
            account_holder: 'Mduduzi Mdluli',
            bank_name: 'Standard Bank',
            account_type: 'Current',
            account_no: '10787098554',
            branch_code: '50987',
            status: 'Active',
        }, {
            bankingDetailId: '109977042',
            account_holder: 'Mduduzi Mdluli',
            bank_name: 'ABSA',
            account_type: 'Savings',
            account_no: '20787098587',
            branch_code: '40987',
            status: 'Pending',
        }, {
          bankingDetailId: '109977054',
          account_holder: 'Mduduzi Mdluli',
          bank_name: 'FNB',
          account_type: 'Savings',
          account_no: '20787099898',
          branch_code: '30980',
          status: 'Pending',
        }];
     setBankingDetails(bankingDetailsList);
     setFilteredBankingDetails([]);


      }, []);
    // table headings definition
const columns = [{
    name: 'Account Holder',
    selector: 'account_holder',
    sortable: true,
    wrap: true,
},{
    name: 'Bank Name',
    selector: 'bank_name',
    sortable: true,
},
{
    name: 'Account Type',
    selector: 'account_type',
    sortable: true,
},{
    name: 'Account No',
    selector: 'account_no',
    sortable: true,
}, {
  name: 'Branch Code',
  selector: 'branch_code',
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
    <spam style={iconPadding}><a
      href={`members/${row.bankingDetailId}`}
      className="btn btn-lg btn-primary btn-sm"
    >
        <Eye width={16} height={16}/>
    </a></spam>
  </div>
}];

const handleChangePassword = async data => {
}

const handleDeleteMember = async data => {
}

const onSubmitChangeStatus= data => {
  setShow(true)
  console.log(data);
    //return <Confirm show={show} setShow={setShow} />;
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
    const filteredItems = bankingDetails.filter(item => (
      (item && item.bank_name && item.bank_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.account_type && item.account_type.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.account_no && item.account_no.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.branch_code && item.branch_code.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredBankingDetails(filteredItems);
  }


    return (
        <Card className="o-hidden mb-4">
          <Confirm show={show} setShow={setShow} />
            <CardBody className="p-0">
                <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
                    <span className="text-primary">Banking Details</span>
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
                data={filteredBankingDetails}
                columns={columns}
                customStyles={customStyles}
                noHeader
                selectableRowsHighlight
                highlightOnHover
                pagination
            />
            <CardBody className="text-center border-top">
                <HashLinkContainer to="/bankingDetails">
                    <a className="card-link font-weight-bold" href="/bankingDetails">
                        More Users...
                    </a>
                </HashLinkContainer>
            </CardBody>
          
        </Card>
    );
}