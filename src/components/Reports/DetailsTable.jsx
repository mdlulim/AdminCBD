import React from 'react';
import DataTable from 'react-data-table-component';
import Moment from 'react-moment';
import 'react-confirm-alert/src/react-confirm-alert.css';


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

export default function DetailsTable(props) {
    const { data } = props;
    const columns = [{
        name: 'Full Names',
        selector: 'first_name',
        sortable: true,
        cell: row => <div>{row.first_name} {row.last_name}</div>
    }, {
        name: 'Username',
        selector: 'username',
        sortable: true,
    }, {
        name: 'Frequency',
        selector: 'frequency',
        sortable: true,
    },{
        name: 'Status',
        selector: 'status',
        sortable: true,
    }, {
        name: 'Last Payment Date',
        selector: 'last_payment_date',
        sortable: true,
        cell: row => <div>
          <strong> { row.last_payment_date ? <Moment date={row.last_payment_date} format="D MMM YYYY" />: ''}</strong><br />
          <span className="text-muted">{ row.last_payment_date ? <Moment date={row.last_payment_date} format="hh:mm:ss" />: ''}</span>
        </div>
      }];

    return (
        <DataTable
            data={data}
            columns={columns}
            customStyles={customStyles}
            selectableRowsHighlight
            highlightOnHover
            pagination
            noHeader
        />
    );
}