import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import Moment from 'react-moment';
import { HashLinkContainer } from 'components';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import ModalChangeStatus from './ModalChangeStatus';
import { MemberService } from '../../providers';
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
      <div className={`btn btn-outline-${badge} btn-block disabled btn-sm`}>{status}</div>
    );
  };

export default function WealthCreaters(props) {
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [wealthCreaters, setWealthCreaters] = useState([]);
    const [filteredWealthCreaters, setFilteredWealthCreaters] = useState([]);
    const [selectedWealthCreater, setSelectedWealthCreater] = useState({});
    const history = useHistory();

    useMemo(() => {
      console.log('wealthCreaters')
      MemberService.getWealthCreaters().then((res) => {
        console.log(res.data.data.results)
        const wealthCreaterslist = res.data.data.results;
        setWealthCreaters(wealthCreaterslist);
        setFilteredWealthCreaters(wealthCreaterslist);
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
cell: row => <div><div>{row.first_name} {row.last_name}</div>
<div className="small text-muted">
  <span>{row.id_number}</span>
</div></div>
},{
    name: 'Username',
    selector: 'username',
    sortable: true,
},
{
    name: 'Email Address',
    selector: 'email',
    sortable: true,
},{
    name: 'Date Created',
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
    <spam style={iconPadding}><a
      href={`wealthCreaters/${row.wealthCreaterId}`}
      className="btn btn-secondary btn-sm btn-icon ml-2"
    >
         <span className="fa fa-eye" />
    </a></spam>
    <spam style={iconPadding}>
      <a
      href={`#`}
      className="btn btn-light btn-sm btn-icon"
      onClick={e => {
        e.preventDefault();
        onSubmitChangeStatus(row);
      }}
    > <span className="fa fa-pencil" />
    </a></spam>
  </div>
}];

const handleChangePassword = async data => {
}

const handleDeleteWealthCreater = async data => {
}

const onSubmitChangeStatus= data => {
  setSelectedWealthCreater(data);
  setShow(true);
  console.log(data);
    //return <Confirm show={show} setShow={setShow} />;
  };

  const onSubmitDeleteWealthCreater= data => {
    setSelectedWealthCreater(data);
    setShowDelete(true);
  };

  const onSearchFilter = filterText => {
    const filteredItems = wealthCreaters.filter(item => (
      (item && item.first_name && item.first_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.last_name && item.last_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.username && item.username.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.email && item.email.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.id_number && item.id_number.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredWealthCreaters(filteredItems);
  }


    return (
        <Card className="o-hidden mb-4">
          <ModalChangeStatus show={show} setShow={setShow} wealthCreater={selectedWealthCreater} />
            <CardBody className="p-0">
                <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
                    <span>CBI WealthCreaters</span>
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
                data={filteredWealthCreaters}
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