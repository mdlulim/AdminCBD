import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { HashLinkContainer } from 'components/Settings/node_modules/components';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import ModalUpdateLead from './ModalUpdateLead';
import DeleteAlert from './DeleteLeadAlert';
//import FeatherIcon from '../FeatherIcon';
import { Eye,  Edit,UserMinus} from 'react-feather';
import { Icon } from '@material-ui/core';
import PropTypes from 'prop-types';
import { LeadService } from '../../providers';
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
      <span className={`badge badge-${badge}`}>{status}</span>
    );
  };

export default function Leads(props) {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
    const [leads, setLeads] = useState([]);
    const [filteredLeads, setFilteredLeads] = useState([]);
    const [selectedLead, setSelectedLead] = useState({});
    const history = useHistory();

    useMemo(() => {
      LeadService.getLeads().then((res) => {
        const leadslist = res.data.data.results;
        setLeads(leadslist);
        setFilteredLeads(leadslist);
      });

        const leadsList = [{
            leadId: '109977041',
            first_name: 'Sam',
            last_name: 'Mthembu',
            username: 'JSmith',
            email: 'example1@demo.com',
            id_number: '9103025869089',
            country: 'South Africa',
            level: 'General',
            created: 'just now',
            status: 'Active',
        }, {
            leadId: '109977042',
            first_name: 'Siya',
            last_name: 'Ndaba',
            username: 'MsiziM',
            email: 'example2@demo.com',
            id_number: '9103025869084',
            country: 'Namibia',
            level: 'Wealth Creator',
            created: '2 mins ago',
            status: 'Pending',
        }, {
            leadId: '109977043',
            first_name: 'Alex',
            last_name: 'Zungu',
            username: 'McCallJ',
            id_number: '9103025869085',
            email: 'example3@demo.com',
            country: 'South Africa',
            level: 'General',
            created: '5 mins ago',
            status: 'Blocked',
        }];
     setLeads(leadsList);
     setFilteredLeads(leadsList);


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
}, {
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
      href={`#`}
      className="btn btn-lg btn-info btn-sm"
      onClick={e => {
        e.preventDefault();
        onSubmitChangeStatus(row);
      }}
    ><Edit width={16} height={16}/>
    </a></spam>
    <spam style={iconPadding}><a
      href={`#`}
      className="btn btn-lg btn-danger btn-sm"
      onClick={e => {
        e.preventDefault();
    
        onSubmitDeleteLead(row);
      }}
    >
      <UserMinus width={16} height={16}/>
    </a></spam>
  </div>
}];

const handleChangePassword = async data => {
}

const handleDeleteLead = async data => {
}

const onSubmitChangeStatus= data => {
  setSelectedLead(data);
  setShow(true);
    //return <Confirm show={show} setShow={setShow} />;
  };

  const onSubmitDeleteLead= data => {
    setSelectedLead(data);
    setShowDelete(true);
  };

  const countLeads = (type) =>{
    const countTypes = this.props.movies.filter(movie => movie.media_type === type);
    return countTypes.length;
};

  const onSearchFilter = filterText => {
    const filteredItems = leads.filter(item => (
      (item && item.first_name && item.first_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.last_name && item.last_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.username && item.username.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.email && item.email.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.id_number && item.id_number.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredLeads(filteredItems);
  }


    return (
        <Card className="o-hidden mb-4">
          <ModalUpdateLead show={show} setShow={setShow} lead={selectedLead} />
          <DeleteAlert show={showDelete} setShow={setShowDelete} lead={selectedLead} />
            <CardBody className="p-0">
                <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
                    <span>CBI Leads</span>
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
                data={filteredLeads}
                columns={columns}
                customStyles={customStyles}
                noHeader
                selectableRowsHighlight
                highlightOnHover
                pagination
            />
            <CardBody className="text-center border-top">
                <HashLinkContainer to="/leads">
                    <a className="card-link font-weight-bold" href="/leads">
                        More Users...
                    </a>
                </HashLinkContainer>
            </CardBody>
        </Card>
    );
}