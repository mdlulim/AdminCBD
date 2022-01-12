import React, { useState, useMemo } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import Moment from 'react-moment';
import { HashLinkContainer, Common } from 'components';
import DataTable from 'react-data-table-component';
import { Unlock,  Edit, Trash} from 'react-feather';
import { useHistory } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { ProductService } from '../../providers';
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
    if (status === 'Published' || status === 'Active') {
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
    const { transactionType, products } = props;
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showResend, setShowResend] = useState(false);
    const [showAddNew, setShowAddNew] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const history = useHistory();


    useMemo(() => {
        setFilteredProducts(products);

      }, []);
    // table headings definition
const columns = [
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
    wrap: true,
},{
    name: 'Type',
    selector: 'type',
    sortable: true,
}, {
  name: 'Purchase By',
  selector: 'first_name',
  sortable: true,
  cell: row => <div><div>{row.first_name} {row.last_name}</div>
      <div className="small text-muted">
        <span>Referral: {row.referral_id}</span>
      </div></div>
},{
  name: 'Tokens',
  selector: 'tokens',
  sortable: true, 
  cell: row => <div>{row.tokens? row.tokens: ''}</div>
},{
  name: 'Income',
  selector: 'income',
  sortable: true,
  cell: row => <div>{row.currency_code}  {row.income}</div>
},{
    name: 'Status',
    selector: 'status',
    sortable: true,
    cell: row => <Status {...row} />
}, {
    name: 'Start Date',
    selector: 'start_date',
    sortable: true,
  cell: row => <div>
                <strong><Moment date={row.start_date} format="D MMM YYYY" /></strong><br />
                <span className="text-muted"><Moment date={row.start_date} format="hh:mm:ss" /></span>
             </div>
},{
  name: 'End Date',
  selector: 'end_date',
  sortable: true,
cell: row => <div>
              { row.end_date ? <><strong><Moment date={row.end_date} format="D MMM YYYY" /></strong><br />
              <span className="text-muted"><Moment date={row.end_date} format="hh:mm:ss" /></span></>: ''}
           </div>
}];

const handleChangePassword = async data => {
}

const handleDeleteProduct = async data => {
}

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

  const onSearchFilter = filterText => {
    const filteredItems = products.filter(item => (
      (item && item.title && item.title.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.type && item.type.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.first_name && item.first_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.last_name && item.last_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.referral_id && item.referral_id.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.status && item.status.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredProducts(filteredItems);
  }


    return (
        <Card className="o-hidden mb-4">
            <div className="form-row margin-bottom-20">
                        <Col xs={12} lg={3}>
                        <a href={``} >
                            <Common.Widget
                                icon="li-receipt"
                                title="CBX7"
                                subtitle="Total Amount"
                                informer={<><span className="text-bold text-success">{0}</span></>}
                                invert={false}
                            /></a>
                        </Col>
                        <Col xs={12} lg={3}>
                        <a href={``} >
                            <Common.Widget
                                icon="li-receipt"
                                title="Fraxions"
                                subtitle="Total Amount"
                                informer={<><span className="text-bold text-warning">{0}</span> </>}
                                invert={false}
                            /></a>
                        </Col>
                        <Col xs={12} lg={3}>
                        <a href={``} >
                            <Common.Widget
                                icon="li-receipt"
                                title="Fixed Plan"
                                subtitle="Total Amount"
                                informer={<><span className="text-bold text-danger">{0}</span> </>}
                                invert={false}
                            /></a>
                        </Col>
                        <Col xs={12} lg={3}>
                        <a href={``} >
                            <Common.Widget
                                icon="li-receipt"
                                title="Other"
                                subtitle="Total Amount"
                                informer={<><span className="text-bold text-danger">{0}</span> </>}
                                invert={false}
                            /></a>
                        </Col>
                    </div>
            <CardBody className="p-0">
                <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
                    <span>Product Overview</span>
                    <span className="flex-grow-1" /><input
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
                data={filteredProducts}
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