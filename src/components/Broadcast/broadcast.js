import React, { useState, useMemo } from 'react';
import { Card, CardBody } from 'reactstrap';
import Moment from 'react-moment';
import DataTable from 'react-data-table-component';
import { BroadcastService } from '../../providers';
import { confirmAlert } from 'react-confirm-alert';
import Swal from 'sweetalert2';

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
  if (status === 'Draft') {
    badge = 'warning';
  }
  if (status === 'Published') {
    badge = 'success';
  }
  if (status === 'Archived') {
    badge = 'danger';
  }
  return (
    <div className={`btn btn-outline-${badge} btn-block disabled btn-sm`}>{status}</div>
  );
};


export default function Broadcast(props) {
  const { setPageLoading, permissions } = props;
  const [showModal, setShowModal] = useState(false);
  const [broadcast, setBroadcasts] = useState([]);
  const [filteredBroadcast, setFilteredBroadcasts] = useState([]);
  const [selectedBroadcast, setSelectedBroadcast] = useState({});

  useMemo(() => {
    BroadcastService.get()
      .then((res) => {
        setBroadcasts(res.results);
        setFilteredBroadcasts(res.results);
        setPageLoading(false)
      })

  }, [setPageLoading]);
  // table headings definition
  const columns = [
    {
      name: 'Title',
      selector: 'title',
      sortable: true,
      wrap: true,
    }, {
      name: 'Summary',
      selector: 'summary',
      sortable: true,
    }, {
      name: 'Created Date',
      selector: 'created',
      sortable: true,
      cell: row => <div>
        <strong><Moment date={row.created} format="D MMM YYYY" /></strong><br />
        <span className="text-muted"><Moment date={row.created} format="hh:mm:ss" /></span>
      </div>
    }, {
      name: 'Published Date',
      selector: 'created',
      sortable: true,
      cell: row => <div>
        <strong><Moment date={row.published} format="D MMM YYYY" /></strong><br />
        <span className="text-muted"><Moment date={row.created} format="hh:mm:ss" /></span>
      </div>
    }, {
      name: 'Expiry Date',
      selector: 'created',
      sortable: true,
      cell: row => <div>
        <strong><Moment date={row.expiry} format="D MMM YYYY" /></strong><br />
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
        {permissions && permissions.update_access &&
          <span style={iconPadding}>
            <a href={`broadcast/edit/${row.id}`}
              className="btn btn-secondary btn-sm btn-icon"
            >
              <span className="fa fa-pencil" onClick={() => { setSelectedBroadcast(row); setShowModal(true) }} />
            </a>
          </span>
        }
        <span style={iconPadding}>
          <span
            className="btn btn-danger btn-sm btn-icon"
            onClick={() => {
              return confirmAlert({
                title: 'Confirm',
                message: 'Are you sure you want to archive this record?',
                buttons: [
                  {
                    label: 'Cancel'
                  },
                  {
                    label: 'Confirm',
                    onClick: async () => {
                      const { success } = await BroadcastService.update(row.id, { status: 'Archived' })
                      if (success) {
                        Swal.fire({
                          position: 'center',
                          icon: 'success',
                          title: 'Request processed successfully!',
                          showConfirmButton: false,
                          timer: 4000
                        });
                        return setTimeout(() => { window.location.reload() }, 4000);
                      }
                      Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Failed to process request, please try again!',
                        showConfirmButton: false,
                        timer: 4000
                      });
                    }
                  }
                ]
              });
            }}
          >
            <span className="fa fa-trash" />
          </span>
        </span>
      </div>
    }];

  const onSearchFilter = filterText => {
    const filteredItems = broadcast.filter(item => (
      (item && item.title && item.title.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.summary && item.summary.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.status && item.status.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredBroadcasts(filteredItems);
  }

  return (
    <Card className="o-hidden mb-4">
      {/* <BroadcastModal show={showModal} setShow={setShowModal} broadcast={selectedBroadcast} audience={audience}/> */}

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
              <a href={`broadcast/add`}
                className="btn btn-secondary" onClick={() => { setSelectedBroadcast({}); setShowModal(true) }}>
                Add Broadcast
              </a>
            </div>
          }
        </div>
      </CardBody>
      <DataTable
        data={filteredBroadcast}
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