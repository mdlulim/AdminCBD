import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { HashLinkContainer } from 'components';
import Moment from 'react-moment';
import { Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useParams, useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { ProductService } from '../../providers';
//import FeatherIcon from '../FeatherIcon';
import { Eye,  Edit,UserMinus} from 'react-feather';
import { Icon } from '@material-ui/core';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import 'react-data-table-component-extensions/dist/index.css';
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
const inputWith={
  width: '30%'
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

export default function MemberByProductID(props) {
  const { member } = props;
  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const handleClose = () => setShow(false);
    const history = useHistory();
    const params = useParams();
    const { id } = params;

    useMemo(() => {
      ProductService.getMembersByPoducts(id).then((res) => {
         console.log(res.data)
         if(res.data.success){
          const memberslist = res.data.data.results;
          setProducts(memberslist);
          setFilteredProducts(memberslist);
         }
          
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
  selector: 'first_name',
  sortable: true,
  wrap: true,
cell: row => <div>{row.first_name} {row.last_name}</div>
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
    <div style={iconPadding}><a
      href={`/members/members/${row.id}`}
      className="btn btn-lg btn-primary btn-sm"
    >
        <Eye width={16} height={16}/>
    </a></div>
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

  const selectDataRange = (data) =>{
    setDisabled(true);
    const start = Date.parse(startDate);
    const end = Date.parse(endDate);
            const searchByDate = products.filter(
              product => (Date.parse(product.created)) >= start && (Date.parse(product.created)) <= end);
              //console.log('Created date');
              //console.log(searchByDate);
              setFilteredProducts(searchByDate);
          setDisabled(false);
          setShow(false)
      }


  const onSearchFilter = filterText => {
    const filteredItems = products.filter(item => (
      (item && item.first_name && item.first_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.last_name && item.last_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.username && item.username.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.email && item.email.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.id_number && item.id_number.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredProducts(filteredItems);
  }


    return (
        <Card className="o-hidden mb-4">
          {/* <Confirm show={show} setShow={setShow} /> */}
            <CardBody className="p-0">
                <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
                    <span className="text-primary">Members</span>
                    <span className="flex-grow-1" />
                    <input
                    style={inputWith}
                        type="text"
                        name="search"
                        className={`form-control form-control-sm`}
                        placeholder="Search..."
                        onKeyUp={e => onSearchFilter(e.target.value)}
                      />
                      <button 
                            className="btn btn-secondary form-control-sm" 
                            type="button"
                            onClick={e => {
                              e.preventDefault();
                              setShow(true);
                            }}>
                                Search By Date
                            </button>
                </div>
            </CardBody>
            <DataTable
                data={filteredProducts}
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
                        {/* <div class="row g-3">
                              <div class="col ">
                              <div class="form-check form-switch">
                              <input 
                                class="form-check-input" 
                                type="checkbox"
                                checked={checkCreatedDate}
                                       onChange={() => {
                                         setCheckCreatedDate(!checkCreatedDate)
                                          setCheckActionDate(checkCreatedDate)
                                        }}
                                id="flexSwitchCheckDefault" />
                                <label class="form-check-label" for="flexSwitchCheckDefault">Created Date</label>
                                </div>
                              </div>
                              <div class="col">
                              <div class="form-check form-switch">
                              <input 
                                class="form-check-input" 
                                type="checkbox"
                                checked={checkActionDate}
                                       onChange={() => {
                                         setCheckActionDate(!checkActionDate)
                                           setCheckCreatedDate(checkActionDate)
                                        }}
                                id="flexSwitchCheckDefault" />
                                <label class="form-check-label" for="flexSwitchCheckDefault">Actioned Date</label>
                                </div>
                              </div>
                        </div> */}
                                <div className="form-group">
                                    <label htmlFor="from">From</label>
                                    <DatePicker style={inputWithDate}  className={`form-control form-control-m`} selected={startDate} onChange={(date) => setStartDate(date)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">To</label>
                                    <DatePicker style={inputWithDate}  className={`form-control form-control-m`} selected={endDate} onChange={(date) => setEndDate(date)} />
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