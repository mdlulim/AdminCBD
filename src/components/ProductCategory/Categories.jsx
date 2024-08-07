import React, { useState, useMemo } from 'react';
import { Card, CardBody } from 'reactstrap';
import Moment from 'react-moment';
import { HashLinkContainer } from 'components';
import DataTable from 'react-data-table-component';
import { Unlock, Edit, Trash } from 'react-feather';
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

export default function Products(props) {
  const { setPageLoading, pageLoading, permissions } = props;
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [showAddNew, setShowAddNew] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const history = useHistory();

  async function fetchData() {
    const categories = await ProductService.getProductCategories();
    setCategories(categories.results || []);
    setFilteredCategories(categories.results || []);
    setPageLoading(false);
  }

  useMemo(() => {
    fetchData();
  }, []);

  // table headings definition
  const columns = [
    {
      name: 'Title',
      selector: 'title',
      sortable: true,
      width: '200px',
      wrap: true,
    }, {
      name: 'Description',
      selector: 'description',
      sortable: true,
      wrap: true,
    }, {
      name: 'Code',
      selector: 'code',
      sortable: true,
      width: '100px',
    }, {
      name: 'Created Date',
      selector: 'created',
      sortable: true,
      width: '180px',
      cell: row => <div>
        <strong><Moment date={row.created} format="DD MMM, YYYY" /></strong>&nbsp;
        <span className="text-muted"><Moment date={row.created} format="hh:mma" /></span>
      </div>
    }, {
      name: 'Actions',
      sortable: true,
      width: '80px',
      cell: row => (
        <div className="text-right">
          {permissions && permissions.update_access &&
            <span style={iconPadding}>
              <a href={`categories/${row.id}`}
                className="btn btn-light btn-sm btn-icon"

              > <span className="fa fa-pencil" />
              </a>
            </span>
          }
        </div>
      )
    }];

  const onSubmitUpdateCategory = data => {
    setSelectedCategory(data);
    setShow(true);
  };

  const onSearchFilter = filterText => {
    const filteredItems = categories.filter(item => (
      (item && item.title && item.title.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.description && item.description.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.code && item.code.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredCategories(filteredItems);
  }


  return (
    <Card className="o-hidden mb-4">
      <CardBody className="p-0">
        <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
          <span>Product Categories</span>
          <span className="flex-grow-1" /><input
            style={inputWith}
            type="text"
            name="search"
            className={`form-control form-control-m`}
            placeholder="Search..."
            onKeyUp={e => onSearchFilter(e.target.value)}
          />
          {
            permissions && permissions.create_access &&
            <div>
              <a
                href={`categories/add`}
                className="btn btn-secondary">
                Add Category
              </a>
            </div>
          }
        </div >
      </CardBody >
      <DataTable
        data={filteredCategories}
        columns={columns}
        customStyles={customStyles}
        noHeader
        selectableRowsHighlight
        highlightOnHover
        pagination
      />
    </Card >
  );
}