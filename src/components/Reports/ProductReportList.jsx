import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
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

export default function ReportList(props) {
    const { data } = props;
    const columns = [{
        name: 'Product Title',
        selector: 'product_title',
        sortable: true,
        wrap: true,
    },{
        name: 'Category',
        selector: 'category_title',
        sortable: true,
        wrap: true,
    },{
        name: 'Actions',
        sortable: true,
        width: '120px',
        cell: row => (
            <div>
                <a
                    href={`/reports/product-reports/${row.id}`}
                    className="btn btn-secondary btn-icon btn-sm margin-right-10"
                >
                    <span className="fa fa-eye" />
                </a>
            </div>
        )
    }];

    async function handleDeleteReport(data) {
        const { name } = data;
        return confirmAlert({
            title: 'Confirm Delete',
            message: <div>Are you sure you want to delete <strong>{name}</strong>?</div>,
            buttons: [
                {
                    label: 'Confirm and continue',
                    onClick: () => {
                        console.log(data)
                    }
                },
                {
                    label: 'Cancel',
                }
            ]
        });
    };

    return (
        <DataTable
            data={data}
            columns={columns}
            customStyles={customStyles}
            selectableRowsHighlight
            highlightOnHover
            // selectableRows
            pagination
            noHeader
        />
    );
}