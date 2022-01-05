import React, { useState, useMemo } from 'react';
import { Card, CardBody } from 'reactstrap';
import Moment from 'react-moment';
import { HashLinkContainer } from 'components';
import DataTable from 'react-data-table-component';
import { Unlock,  Edit, Trash} from 'react-feather';
import { useHistory } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { KYCService, SessionProvider } from '../../providers';
import { confirmAlert } from 'react-confirm-alert';
import AddCompanyBankDetails from './AddCompanyBankDetails';
import UpdateKYCLimit from './UpdateKYCLimit';
// styles AddCompanyBankDetails
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
    if (status === 'Active') {
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
    const [show, setShow] = useState(false);
    const [showKYCLimit, setShowKYCLimit] = useState(false);
    const [kycLimits, setKYCLimits] = useState([]);
    const [adminLevel, setAdminLevel]     = useState(0);
    const [filteredKYCLimits, setFilteredKYCLimits] = useState([]);
    const [selectedKYCLimit, setSelectedKYCLimit] = useState({});
    const history = useHistory();


    useMemo(() => {

    if (SessionProvider.isValid()) {
        const user = SessionProvider.get();
        setAdminLevel(user.permission_level)
    }
    KYCService.getKYCLimits().then((res) => {
        console.log(res)
          const data = res.results;
          setKYCLimits(data);
          setFilteredKYCLimits(data);
      });

      }, []);
    // table headings definition
const columns = [
  {
    name: 'KYC Level',
    selector: 'level',
    sortable: true,
    wrap: true,
},{
    name: 'Withdrawal Limits',
    selector: 'withdrawal_limit',
    sortable: true,
},{
    name: 'Actions',
    sortable: true,
    cell: row => <div>
     { adminLevel === 5 ?<div style={iconPadding}>
        <a
          href={`#`}
          className="btn btn-light btn-sm btn-icon"
          onClick={e => {
            e.preventDefault();
            setSelectedKYCLimit(row)
            setShowKYCLimit(true)
          }}
        > <span className="fa fa-pencil" />
        </a></div>: ''}
  </div>
}];

  const onSearchFilter = filterText => {
    const filteredItems = kycLimits.filter(item => (
      (item && item.level && item.level.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.withdrawal_limit && item.withdrawal_limit.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredKYCLimits(filteredItems);
  }


    return (
        <Card className="o-hidden mb-4">
            <AddCompanyBankDetails show={show} setShow={setShow} />
            <UpdateKYCLimit show={showKYCLimit} setShow={setShowKYCLimit} kycLimit={selectedKYCLimit} />
            
            <CardBody className="p-0">
                <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
                    <span>KYC Limits</span>
                    <span className="flex-grow-1" /><input
                        style={inputWith}
                        type="text"
                        name="search"
                        className={`form-control form-control-m`}
                        placeholder="Search..."
                        onKeyUp={e => onSearchFilter(e.target.value)}
                      />
                    <div>
                      {/* <button
                      onClick={e => {
                          setShow(true)
                      }}
                      className="btn btn-secondary">
                          Add New
                      </button> */}
              </div>
                </div>
            </CardBody>
            <DataTable
                data={filteredKYCLimits}
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