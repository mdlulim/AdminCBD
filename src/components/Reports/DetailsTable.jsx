import React from 'react';
import DataTable from 'react-data-table-component';
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
        name: 'Column 1',
        selector: 'column_1',
        sortable: true,
    }, {
        name: 'Column 2',
        selector: 'column_2',
        sortable: true,
    }, {
        name: 'Column 3',
        selector: 'column_3',
        sortable: true,
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