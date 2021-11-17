import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import Moment from 'react-moment';
import { HashLinkContainer } from 'components';
import { Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { Unlock,  Edit, Trash} from 'react-feather';
import { useParams, useHistory } from 'react-router-dom';
import DeleteProductAlert from './DeleteProductAlert';
import { ProductService } from '../../providers';
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
  width: '30%',
  marginRight: '20px'
}
const inputWithDate={
  width: '25%'
}

const Status = ({ status }) => {
    let badge = 'primary';
    if (status === 'Pending') {
      badge = 'warning';
    }
    if (status === 'Active' || status === 'Published') {
      badge = 'success';
    }
    if (status === 'Blocked') {
        badge = 'danger';
      }
    return (
      <div className={`btn btn-outline-${badge} btn-block disabled btn-sm`}>{status}</div>
    );
  };

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

export default function Products(props) {
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showResend, setShowResend] = useState(false);
    const [showAddNew, setShowAddNew] = useState(false);
    const [products, setProducts] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [checkCreatedDate, setCheckCreatedDate] = useState(true);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const handleClose = () => setShow(false);
    const history = useHistory();
    const params = useParams();
    const { id } = params;


    useMemo(() => {
      ProductService.getProductByMemberId(id).then((res) => {
        //console.log('Product By Member '+res.data.data.results)
        //console.log(res.data.data.results)
        const productlist = res.data.data.results;
        setProducts(productlist);
        setFilteredProducts(productlist);
      });

      }, []);
    // table headings definition
const columns = [{
    name: 'Product Name',
    selector: 'title',
    sortable: true
},{
    name: 'Category',
    selector: 'category_title',
    sortable: true,
},
{
    name: 'Educator Fees',
    selector: 'rebalancing_frequency',
    sortable: true,
    cell: row => <div><div>{row.currency_code} {row.educator_fee}</div>
    <div className="small text-muted">
      <span>{row.educator_percentage}</span>
    </div></div>
},{
  name: 'Registration Fees',
  selector: 'rebalancing_frequency',
  sortable: true,
  cell: row => <div><div>{row.currency_code} {row.registration_fee}</div>
  <div className="small text-muted">
    <span>{row.registration_percentage}</span>
  </div></div>
}, {
    name: 'Price',
    selector: 'price',
    sortable: true,
    cell: row => <div><div>{row.currency_code} {row.price}</div></div>
},{
  name: 'Total',
  selector: 'total',
  sortable: true,
  cell: row => <div><div>{row.currency_code} {parseFloat(row.price)+parseFloat(row.registration_fee)+parseFloat(row.educator_fee)}</div></div>
},{name: 'Created',
 selector: 'created',
 sortable: true,
  cell: row => <div>
                <strong><Moment date={row.user_product.created} format="D MMM YYYY" /></strong><br />
                <span className="text-muted"><Moment date={row.user_product.created} format="hh:mm:ss" /></span>
             </div>
},{
    name: 'Status',
    selector: 'status',
    sortable: true,
    cell: row => <Status {...row.user_product} />
}];

const onSubmitUpdateProduct= data => {
  setSelectedProduct(data);
  setShow(true);
  };

  const onSubmitResendPassword= data => {
    setSelectedProduct(data);
    setShowResend(true);
    };

  const onSubmitDeleteProduct= data => {
    setSelectedProduct(data);
    setShowDelete(true)
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
      (item && item.full_names && item.full_names.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.productname && item.productname.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.email && item.email.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredProducts(filteredItems);
  }


    return (
        <Card className="o-hidden mb-4">
          <DeleteProductAlert show={showDelete} setShow={setShowDelete} product={selectedProduct} />
          
            <CardBody className="p-0">
                <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
                    <span className="text-primary">Products</span>
                    <span className="flex-grow-1" /><input
                        style={inputWith}
                        type="text"
                        name="search"
                        className={`form-control form-control-m`}
                        placeholder="Search..."
                        onKeyUp={e => onSearchFilter(e.target.value)}
                      />
                            <button 
                            className="btn btn-secondary" 
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
            <CardBody className="text-center border-top">
                <HashLinkContainer to="/products">
                    <a className="card-link font-weight-bold" href="/products">
                        More Products...
                    </a>
                </HashLinkContainer>
            </CardBody>
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