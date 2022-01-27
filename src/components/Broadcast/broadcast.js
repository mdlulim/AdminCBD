import React, { useState, useMemo } from 'react';
import { Card, CardBody } from 'reactstrap';
import Moment from 'react-moment';
import DataTable from 'react-data-table-component';
// import DeleteProductAlert from './DeleteProductAlert';
import { BroadcastService, SessionProvider } from '../../providers';

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
  if (status === 'Pending') {
    badge = 'warning';
  }
  if (status === 'Published') {
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

export default function Broadcast(props) {
  const { setPageLoading, permissions } = props;
  const [showDelete, setShowDelete] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});

  useMemo(() => {
    BroadcastService.getBroadcasts().then((res) => {
          const productlist = res.results;
          console.log(productlist)
          setProducts(productlist);
          setFilteredProducts(productlist);

          setPageLoading(false)
      });

  }, [setPageLoading]);
  // table headings definition
  const columns = [
    {
      name: 'Title',
      selector: 'title',
      sortable: true,
      wrap: true,
    }, {
      name: 'Type',
      selector: 'type',
      sortable: true,
    }, {
      name: 'Educator Fee',
      selector: 'educator_fee',
      sortable: true,
      cell: row => <div>{row.educator_fee ? row.currency_code + ' ' + row.educator_fee : ''} {row.educator_percentage ? row.educator_percentage + ' %' : ''}</div>
    }, {
      name: 'Registration Fee',
      selector: 'registration_fee',
      sortable: true,
      cell: row => <div>{row.registration_fee ? row.currency_code + ' ' + row.registration_fee : ''} {row.educator_percentage ? row.educator_percentage + ' %' : ''}</div>
    }, {
      name: 'Product Amount',
      selector: 'price',
      sortable: true,
      cell: row => <div>{row.currency_code}  {row.price}</div>
    }, {
      name: 'Status',
      selector: 'status',
      sortable: true,
      cell: row => <Status {...row} />
    }, {
      name: 'Created Date',
      selector: 'created',
      sortable: true,
      cell: row => <div>
        <strong><Moment date={row.created} format="D MMM YYYY" /></strong><br />
        <span className="text-muted"><Moment date={row.created} format="hh:mm:ss" /></span>
      </div>
    }, {
      name: 'Actions',
      sortable: true,
      cell: row => <div>
        { permissions && permissions.update_access &&
          <span style={iconPadding}>
          <a
            href={`products/${row.id}`}
            className="btn btn-secondary btn-sm btn-icon"
          >
            <span className="fa fa-pencil" />
          </a>
        </span>
        }
        {/* <spam style={iconPadding}><a
      href={`#`}
      className="btn btn-secondary btn-sm btn-icon"
      onClick={e => {
        e.preventDefault();
    
        onSubmitDeleteProduct(row);
      }}
    >
      <span className="fa fa-trash" />
    </a></spam> */}
      </div>
    }];

  const onSearchFilter = filterText => {
    const filteredItems = products.filter(item => (
      (item && item.title && item.title.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.type && item.type.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.status && item.status.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredProducts(filteredItems);
  }

  // if (pageLoading) return <Loader.Default />;
  return (
    <Card className="o-hidden mb-4">
      {/* <DeleteProductAlert show={showDelete} setShow={setShowDelete} product={selectedProduct} /> */}

      <CardBody className="p-0">
        <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
          <span>Broadcasts</span>
          <span className="flex-grow-1" /><input
            style={inputWith}
            type="text"
            name="search"
            className={`form-control form-control-m`}
            placeholder="Search..."
            onKeyUp={e => onSearchFilter(e.target.value)}
          />
          {permissions && permissions.create_access &&
            <div>
              <a
                href={`products/add`}
                className="btn btn-secondary">
                Add Broadcast
              </a>
            </div>
          }
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