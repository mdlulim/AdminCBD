import React, { useState, useMemo } from 'react';
import { Card, CardBody } from 'reactstrap';
import Moment from 'react-moment';
import { HashLinkContainer } from 'components';
import DataTable from 'react-data-table-component';
import { Unlock,  Edit, Trash} from 'react-feather';
import { useHistory } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import DeleteProductAlert from './DeleteProductAlert';
import ModalUpdateCategories from './ModalUpdateCategories';
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
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showResend, setShowResend] = useState(false);
    const [showAddNew, setShowAddNew] = useState(false);
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({});
    const history = useHistory();


    useMemo(() => {

        ProductService.getProductCategories().then((res) => {
                if(res.data.success){
                    const productlist = res.data.data.results;
                    setCategories(productlist);
                    setFilteredCategories(productlist);
                }
           });

      }, []);
    // table headings definition
const columns = [
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
    wrap: true,
},{
    name: 'Description',
    selector: 'description',
    sortable: true,
},{
    name: 'Code',
    selector: 'code',
    sortable: true,
}, {
    name: 'Created Date',
    selector: 'created',
    sortable: true,
  cell: row => <div>
                <strong><Moment date={row.created} format="D MMM YYYY" /></strong><br />
                <span className="text-muted"><Moment date={row.created} format="hh:mm:ss" /></span>
             </div>
},{
    name: 'Actions',
    sortable: true,
    cell: row => <div>
    <spam style={iconPadding}>
    <a
      href={`#`}
      className="btn btn-light btn-sm btn-icon"
      onClick={e => {
        e.preventDefault();
        onSubmitUpdateCategory(row);
      }}
    > <span className="fa fa-pencil" />
    </a></spam>
  </div>
}];

const onSubmitUpdateCategory= data => {
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
          <ModalUpdateCategories show={show} setShow={setShow} category={selectedCategory} />
          
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
                    <div>
                            <a 
                            href={`categories/add`}
                            className="btn btn-secondary">
                              Add Category
                            </a>
                    </div>
                </div>
            </CardBody>
            <DataTable
                data={filteredCategories}
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