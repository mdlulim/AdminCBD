import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { HashLinkContainer } from 'components';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import Confirm from './ModalChangeStatus';
import { MemberService } from '../../providers';

//import FeatherIcon from '../FeatherIcon';
import { Eye, Edit, UserMinus } from 'react-feather';
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

const iconPadding = {
  paddingRight: '3px',
}
const inputWith = {
  width: '30%'
}

const Status = ({ status }) => {
  let badge = 'primary';
  let myStatus = 'Defualt'
  if (status === 'Pending') {
    badge = 'warning';
    myStatus = 'Not Defualt';
  }
  if (status === 'Active') {
    badge = 'success';
    myStatus = 'Defualt';
  }

  return (
    <div className={`btn btn-outline-${badge} btn-block disabled btn-sm`}>{status}</div>
  );
};

export default function Referals(props) {
  const { member } = props;
  const [show, setShow] = useState(false);
  const [bankingDetails, setBankingDetails] = useState([]);
  const [filteredBankingDetails, setFilteredBankingDetails] = useState([]);
  const history = useHistory();

  useMemo(() => {
    const getBank = async () => {
      //Get member bank details
      const bank = await MemberService.getMemberBankDetails(member.id);
      const bank_results = bank.data.data.results;

      if (bank_results) {
        const data = bankingDetails;
        bank_results.map(item => {
          data.push(item);
        })
        setBankingDetails(data);
      }

      setFilteredBankingDetails([]);
    }

    getBank();

  }, [member]);


  return (
    <Card className="o-hidden mb-4">
      <Confirm show={show} setShow={setShow} />
      <CardBody className="p-0">
        <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
          <span className="text-primary">Banking Details</span>
          <span className="flex-grow-1" />
        </div>
        <ul className="list-group">
          {bankingDetails.map(item => (
            <li key={item.id} className="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
              <div className="d-flex flex-column">
                <h6 className="mb-3 text-sm">{item.type}</h6>
                <span className="mb-2 text-xs">Holder Name: <span className="text-dark font-weight-bold ms-sm-2">{item.name}</span></span>
                <span className="mb-2 text-xs">Bank Name: <span className="text-dark ms-sm-2 font-weight-bold">{item.bank_name}</span></span>
                <span className="mb-2 text-xs">Account Number: <span className="text-dark ms-sm-2 font-weight-bold">{item.number}</span></span>
                <span className="mb-2 text-xs">Branch code: <span className="text-dark ms-sm-2 font-weight-bold">{item.branch_code}</span></span>
                <span className="text-xs">Status: <span className="text-dark ms-sm-2 font-weight-bold">{item.status}</span></span>
              </div>
            </li>))}
        </ul>
      </CardBody>

    </Card>
  );
}