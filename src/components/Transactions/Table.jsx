import React from 'react';
import DataTable from 'react-data-table-component';

// styles
const customStyles = {
    rows: {
        style: {
            minHeight: '72px', // override the row height
        }
    },
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

export default function Table(props) {
    const { data, columns } = props;
    return (
        <DataTable
            data={data}
            columns={columns}
            customStyles={customStyles}
            noHeader
            selectableRowsHighlight
            highlightOnHover
            pagination
        />
    );
}