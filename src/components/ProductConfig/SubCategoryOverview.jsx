import React, { useState, useMemo } from 'react';
import Moment from 'react-moment';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router-dom';
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

export default function SubCategoryOverview(props) {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [showAddNew, setShowAddNew] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState({});
  const history = useHistory();


  useMemo(() => {
    ProductService.getProductSubCategories().then((res) => {
      const productlist = res.results;
      setCategories(productlist);
      setFilteredCategories(productlist);
    });
  }, []);
  // table headings definition

  const columns = [
    {
      name: 'Description',
      selector: 'description',
      sortable: true,
    }, {
      name: 'Category',
      sortable: false,
      cell: row => <div>{row.product_category ? row.product_category.title : ''}</div>
    }, {
      name: 'Code',
      selector: 'code',
      sortable: true,
      width: '150px',
    }, {
      name: 'Allow Calculations',
      selector: 'allow_cancellations',
      sortable: true,
      cell: row => <span>{row.allow_cancellations ? <i className="fa fa-check text-success" /> : <i className="fa fa-times text-danger" />}</span>
    }, {
      name: 'Has Payouts',
      selector: 'has_payouts',
      sortable: true,
      cell: row => <span>{row.has_payouts ? <i className="fa fa-check text-success" /> : <i className="fa fa-times text-danger" />}</span>
    }, {
      name: 'Created Date',
      selector: 'created',
      sortable: true,
      width: '180px',
      cell: row =>
        <div>
          <strong><Moment date={row.created} format="D MMM YYYY" /></strong>&nbsp;
          <span className="text-muted"><Moment date={row.created} format="hh:mma" /></span>
        </div>
    }, {
      name: 'Actions',
      sortable: true,
      width: '80px',
      cell: row =>
        <div>
          <span style={iconPadding}>
            <a
              href={`/configurations/product/${row.id}`}
              className="btn btn-secondary btn-sm btn-icon"
            >
              <span className="li-cog" />
            </a>
          </span>
        </div>
    }];

  const onSubmitUpdateCategory = data => {
    setSelectedSubcategory(data);
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
    <div>
      <div className="card-title border-bottom d-flex align-items-center m-0 padding-bottom-20">
        <div>&nbsp;</div>
        <span className="flex-grow-1" /><input
          style={inputWith}
          type="text"
          name="search"
          className={`form-control form-control-m`}
          placeholder="Search..."
          onKeyUp={e => onSearchFilter(e.target.value)}
        />
      </div>
      <DataTable
        data={filteredCategories}
        columns={columns}
        customStyles={customStyles}
        noHeader
        selectableRowsHighlight
        highlightOnHover
        pagination
      />
    </div>
  );
}