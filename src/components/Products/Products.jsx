import React, { useState, useMemo } from 'react';
import { Card, CardBody } from 'reactstrap';
import { HashLinkContainer } from 'components';
import DataTable from 'react-data-table-component';
import { Unlock,  Edit, Trash} from 'react-feather';
import { useHistory } from 'react-router-dom';
import DeleteProductAlert from './DeleteProductAlert';
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
    if (status === 'Active') {
      badge = 'success';
    }
    if (status === 'Blocked') {
        badge = 'danger';
      }
    return (
      <span className={`badge badge-${badge}`}>{status}</span>
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
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const history = useHistory();


    useMemo(() => {
      ProductService.getProducts().then((res) => {
        console.log(res.data.data.results)
        const productlist = res.data.data.results;
        setProducts(productlist);
        setFilteredProducts(productlist);
      });

        const productsList = [{
            productId: '109977001',
            name: 'Smart Contract Bundle',
            description: 'This is a theme-based Bundle that tracks the cryptocurrencies that aim to revolutionise how supply chains and trading networks operate through smart contracts. If you believe in a future that’s interconnected, automated and decentralised then this Bundle is for you.',
            no_of_onstituents: 5,
            rebalancing_frequency: 'Monthly',
            target_weight: 'Equal',
            last_rebalance: '1 Oct 2021',
            next_rebalance: '1 Oct 2022',
            status: 'Active',
            group: 'Crypto Bundle',
            price: 'ZAR 680',
        }, {
            productId: '109977041',
            name: 'Top 10 Bundle',
            description: 'This Bundle is ideal for anyone wanting to effortlessly diversify across the leading cryptocurrencies with just a single investment. The Bundle covers more than 85% of the total crypto market, enabling you to closely track the overall performance of the crypto asset class.',
            no_of_onstituents: 9,
            rebalancing_frequency: 'Monthly',
            target_weight: 'Equal',
            last_rebalance: '1 Oct 2021',
            next_rebalance: '1 Oct 2022',
            status: 'Active',
            group: 'Crypto Bundle',
            price: 'ZAR 580',
        }, {
            productId: '109977042',
            name: 'Payment Bundle',
            description: 'This Bundle is ideal for anyone wanting to effortlessly diversify across the leading cryptocurrencies with just a single investment. The Bundle covers more than 85% of the total crypto market, enabling you to closely track the overall performance of the crypto asset class.',
            no_of_onstituents: 9,
            rebalancing_frequency: 'Monthly',
            target_weight: 'Equal',
            last_rebalance: '1 Oct 2021',
            next_rebalance: '1 Oct 2022',
            status: 'Active',
            group: 'Crypto Bundle',
            price: 'ZAR 580',
        },{
            productId: '109977043',
            name: 'Bitcoin',
            description: 'This Bundle is ideal for anyone wanting to effortlessly diversify across the leading cryptocurrencies with just a single investment. The Bundle covers more than 85% of the total crypto market, enabling you to closely track the overall performance of the crypto asset class.',
            no_of_onstituents: 9,
            rebalancing_frequency: 'Monthly',
            target_weight: 'Equal',
            last_rebalance: '1 Oct 2021',
            next_rebalance: '1 Oct 2022',
            status: 'Active',
            group: 'Cryptocurrancy',
            price: 'ZAR 731 793.00',
        },{
            productId: '109977045',
            name: 'Ethereum ',
            description: 'Ethereum is a decentralised open-source blockchain system that features its own cryptocurrency, Ether (ETH). ETH works as a platform for numerous other cryptocurrencies, as well as for the execution of decentralised smart contracts. Ethereum’s goal is to become a global platform for decentralised applications, allowing users from all over the world to write and run software that is resistant to censorship, downtime and fraud. ETH is ideal for crypto beginners and veterans alike as it’s one of the largest, most tested and reputable cryptocurrencies around.',
            no_of_onstituents: 9,
            rebalancing_frequency: 'Monthly',
            target_weight: 'Equal',
            last_rebalance: '1 Oct 2021',
            next_rebalance: '1 Oct 2022',
            status: 'Active',
            group: 'Crypto Bundle',
            price: 'ZAR 580',
        }
    ];
     setProducts(productsList);
     setFilteredProducts(productsList);


      }, []);
    // table headings definition
const columns = [{
    name: 'Product Name',
    selector: 'name',
    sortable: true,
    wrap: true,
},{
    name: 'Number Of Constituents',
    selector: 'no_of_onstituents',
    sortable: true,
},
{
    name: 'Rebalancing Frequency',
    selector: 'rebalancing_frequency',
    sortable: true,
},{
    name: 'Target Weight',
    selector: 'target_weight',
    sortable: true,
}, {
    name: 'Last Rebalance',
    selector: 'last_rebalance',
    sortable: true,
}, {
    name: 'Next Rebalance',
    selector: 'next_rebalance',
    sortable: true,
}, {
    name: 'Group',
    selector: 'group',
    sortable: true,
}, {
    name: 'Price',
    selector: 'price',
    sortable: true,
},{
    name: 'Status',
    selector: 'status',
    sortable: true,
    cell: row => <Status {...row} />
}, {
    name: 'Actions',
    sortable: true,
    cell: row => <div>
    <spam style={iconPadding}>
      <a
      href={`products/${row.productId}`}
      className="btn btn-lg btn-info btn-sm"
    ><Edit width={16} height={16}/>
    </a></spam>
    <spam style={iconPadding}><a
      href={`#`}
      className="btn btn-lg btn-danger btn-sm"
      onClick={e => {
        e.preventDefault();
    
        onSubmitDeleteProduct(row);
      }}
    >
      <Trash width={16} height={16}/>
    </a></spam>
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
                    <span>Products</span>
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
                            href={`add`}
                            className="btn btn-secondary">
                                Add Product
                            </a>
                    </div>
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
        </Card>
    );
}