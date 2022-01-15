import React, { useState, useMemo } from 'react';
import { Card, CardBody } from 'reactstrap';
import Moment from 'react-moment';
import DataTable from 'react-data-table-component';
import DeleteProductAlert from './DeleteProductAlert';
import { ProductService } from '../../providers';
import ModalCancelChangeStatus from './ModalCancelChangeStatus'

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
  width: '30%',
  marginRight: '20px'
}

const Status = ({ status }) => {
  let badge = 'primary';
  if (status === 'Pending Cancellation') {
    badge = 'warning';
  }
  if (status === 'Cancellation Complete') {
    badge = 'success';
  }
  if (status === 'Cancellation Rejected') {
    badge = 'danger';
  }
  return (
    <div className={`btn btn-outline-${badge} btn-block disabled btn-sm`}>{status}</div>
  );
};


export default function Cancel(props) {
  const { setPageLoading } = props;
  const [showDelete, setShowDelete] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [showCancel, setShowCancel] = useState(false)

  useMemo(() => {
    ProductService.getCancelledProcucts().then((res) => {
      const productlist = res.data.data.results;
      setProducts(productlist);
      setFilteredProducts(productlist);

      setPageLoading(false)
    });

  }, [setPageLoading]);
  // table headings definition
  const columns = [
    {
      name: 'User',
      selector: 'user',
      sortable: true,
      wrap: true,
      cell: row => <div>{row.user.first_name} {row.user.last_name}</div>
    },
    {
      name: 'Product',
      selector: 'product',
      sortable: true,
      cell: row => <div>{row.product.title}</div>
    }, {
      name: 'Status',
      selector: 'status',
      sortable: true,
      cell: row => <Status {...row} />
    }, {
      name: 'Cancelled Date',
      selector: 'cancelled',
      sortable: true,
      cell: row => <div>
        <strong><Moment date={row.created} format="D MMM YYYY" /></strong><br />
        <span className="text-muted"><Moment date={row.created} format="hh:mm:ss" /></span>
      </div>
    }, {
      name: 'Actions',
      sortable: true,
      cell: row => <div>
        <span style={iconPadding} >
          <span className="btn btn-secondary btn-sm btn-icon " onClick={()=>{ setSelectedProduct(row); setShowCancel(true)}}>
            <span className="fa fa-pencil" />
          </span>
        </span>
      </div>
    }];

  const onSearchFilter = filterText => {
    const filteredItems = products.filter(item => (
      (item && item.product && item.product.title.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.user && item.user.first_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.user && item.user.last_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.status && item.status.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredProducts(filteredItems);
  }

  // if (pageLoading) return <Loader.Default />;
  return (
    <Card className="o-hidden mb-4">
      <ModalCancelChangeStatus show={showCancel} setShow={setShowCancel} product={selectedProduct} />
      <DeleteProductAlert show={showDelete} setShow={setShowDelete} product={selectedProduct} />

      <CardBody className="p-0">
        <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
          <span>Products</span>
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