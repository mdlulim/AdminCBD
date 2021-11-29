import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import Moment from 'react-moment';
import { HashLinkContainer } from 'components';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router-dom';

import { KYCService } from '../../providers';

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
    float: 'Left'
}
const inputWith = {
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
        // <span className={`badge badge-${badge}`}>{status}</span>
        <div className={`btn btn-outline-${badge} btn-block disabled btn-sm`}>{status}</div>
    );
};

export default function KYCList(props) {
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState({});
    const history = useHistory();

    useMemo(() => {
        KYCService.getKYCApplicants().then((res) => {
       //   //  console.log(res)
            // const memberslist = res.data.data.results;
            // setMembers(memberslist);
            // setFilteredMembers(memberslist);
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
        selector: 'full_names',
        sortable: true,
        wrap: true,
        cell: row => <div><div>{row.first_name} {row.last_name}</div>
            <div className="small text-muted">
                <span>{row.id_number}</span>
            </div></div>
    }, {
        name: 'Username',
        selector: 'username',
        sortable: true,
    }, {
        name: 'KYC Level',
        selector: 'mobile',
        sortable: true,
        cell: row => <div>{row.kyc?1:"UnAssigned"}</div>
    },
    {
        name: 'Level Applied',
        selector: 'email',
        sortable: true,
    }, {
        name: 'Application Date',
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
                href={`members/members/${row.id}`}
                className="btn btn-secondary btn-sm btn-icon ml-2"
            >
                <span className="fa fa-eye" />
            </a></div>
        </div>
    }];

    const onSubmitChangeStatus = data => {
        setSelectedMember(data);
        setShow(true);
       // console.log(data);
        //return <Confirm show={show} setShow={setShow} />;
    };

    const onSubmitDeleteMember = data => {
        setSelectedMember(data);
        setShowDelete(true);
    };

    const countMembers = (type) => {
        const countTypes = this.props.movies.filter(movie => movie.media_type === type);
        return countTypes.length;
    };

    const onSearchFilter = filterText => {
        const filteredItems = members.filter(item => (
            (item && item.first_name && item.first_name.toLowerCase().includes(filterText.toLowerCase())) ||
            (item && item.last_name && item.last_name.toLowerCase().includes(filterText.toLowerCase())) ||
            (item && item.username && item.username.toLowerCase().includes(filterText.toLowerCase())) ||
            (item && item.email && item.email.toLowerCase().includes(filterText.toLowerCase())) ||
            (item && item.id_number && item.id_number.toLowerCase().includes(filterText.toLowerCase()))
        ));
        setFilteredMembers(filteredItems);
    }


    return (
        <Card className="o-hidden mb-4">
            <CardBody className="p-0">
                <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
                    <span>KYC Applicants</span>
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
                data={filteredMembers}
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