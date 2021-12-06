import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import Moment from 'react-moment';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router-dom';
import ModalUpdateFee from './ModalUpdateFee';
import { FeeService } from '../../providers';
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

export default function TransactionFees(props) {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [fees, setFees] = useState([]);
  const [filteredFees, setFilteredFees] = useState([]);
  const [selectedFee, setSelectedFee] = useState({});
  const history = useHistory();

    useMemo(() => {
        FeeService.getFees().then((res) => {
          console.log(res.data.data)
          const feeslist = res.data.data.results;
          setFees(feeslist);
          setFilteredFees(feeslist);
        });
 
      }, []);
    // table headings definition
const columns = [ {
    name: 'Type',
    selector: 'tx_type',
    sortable: true,
}, {
    name: 'Value',
    selector: 'value',
    sortable: true,
  }, {
    name: 'Percentage',
    selector: 'percentage',
    sortable: true,
  },{
    name: 'Subtype',
    selector: 'subtype',
    sortable: true,
  },
  {
    name: 'Currency Code',
    selector: 'currency_code',
    sortable: true,
  }, {
    name: 'Date Updated',
    selector: 'updated',
    sortable: true,
    cell: row => <div>
      <strong><Moment date={row.created} format="D MMM YYYY" /></strong><br />
      <span className="text-muted"><Moment date={row.created} format="hh:mm:ss" /></span>
    </div>
  }, {
    name: 'Actions',
    sortable: true,
    cell: row => <div>
      <div style={iconPadding}>
        <a
          href={`#`}
          className="btn btn-light btn-sm btn-icon"
          onClick={e => {
            e.preventDefault();
            onSubmitChangeStatus(row);
          }}
        > <span className="fa fa-pencil" />
        </a></div>
    </div>
  }];

  const onSubmitChangeStatus = data => {
    setSelectedFee(data);
    setShow(true);
    console.log(data);
    //return <Confirm show={show} setShow={setShow} />;
  };

  const onSubmitDeleteFee = data => {
    setSelectedFee(data);
    setShowDelete(true);
  };

  const countFees = (type) => {
    const countTypes = this.props.movies.filter(movie => movie.media_type === type);
    return countTypes.length;
  };

  const onSearchFilter = filterText => {
    const filteredItems = fees.filter(item => (
      (item && item.tx_type && item.tx_type.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.value && item.value.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.percentage && item.percentage.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.subtype && item.subtype.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.currency_code && item.currency_code.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredFees(filteredItems);
  }


  return (
    <Card className="o-hidden mb-4">
      <ModalUpdateFee show={show} setShow={setShow} fee={selectedFee} />
      <CardBody className="p-0">
        <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
          <span>CBI Fees</span>
          <span className="flex-grow-1" />
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
        data={filteredFees}
        columns={columns}
        customStyles={customStyles}
        noHeader
        selectableRowsHighlight
        highlightOnHover
        pagination />

    </Card>
  );
}