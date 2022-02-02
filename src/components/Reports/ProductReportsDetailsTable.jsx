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
        selector: 'id',
        sortable: true,
        cell: (row) => <div><div>{row ? row.first_name : ''} {row ? row.last_name : ''}</div>
      <div className="small text-muted">
        <span>{row ? row.referral_id : ''}</span>
      </div></div>
    }, {
        name: 'Product Title',
        selector: 'product_title',
        sortable: true,
    }, {
        name: 'Category',
        selector: 'category',
        sortable: true,
    },{
        name: 'income',
        selector: 'income',
        sortable: true,
    },{
        name: 'Invested Amount',
        selector: 'invested_amount',
        sortable: true,
    }, {
        name: 'Created',
        selector: 'created',
        sortable: true,
        cell: row => <div>
          <strong> { row.created ? <Moment date={row.created} format="D MMM YYYY" />: ''}</strong><br />
          <span className="text-muted">{ row.created ? <Moment date={row.created} format="hh:mm:ss" />: ''}</span>
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