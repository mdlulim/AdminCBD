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
        selector: 'category_title',
        sortable: true,
    },{
        name: 'Registration Fee',
        selector: 'registration_fee',
        sortable: true,
        cell: (row) => <div>{row.metadata.fees 
            ? row.metadata.fees.registration_fee 
            : row.metadata.registration_fee ?  row.metadata.registration_fee: ''}</div>
    },{
        name: 'Educator Fee',
        selector: 'educator_fee',
        sortable: true,
        cell: (row) => <div>{ row.metadata.fees 
            ? row.metadata.fees.educator_fee 
            : row.metadata.educator_fee ? row.metadata.educator_fee : ''}</div>
    },{
        name: 'Date',
        selector: 'id',
        sortable: true,
        cell: (row) =><div className="small text-muted">
        <span>Start Date: {row.start_date ? <Moment date={row.start_date} format="D MMM YYYY" /> : ''}</span><br />
        <span>End Date: {row.end_date ? <Moment date={row.end_date} format="D MMM YYYY" /> : ''}</span>
      </div>
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