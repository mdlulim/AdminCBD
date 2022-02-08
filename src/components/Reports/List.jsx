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
        name: 'Name',
        selector: 'name',
        sortable: true,
        wrap: true,
    }, {
        name: 'Description',
        selector: 'description',
        sortable: true,
    }, {
        name: 'Type',
        selector: 'type',
        width: '170px',
        sortable: true,
        wrap: true,
    }, {
        name: 'Date Created',
        selector: 'created',
        sortable: true,
        width: '170px',
        cell: row => (
            <div>
                <strong><Moment format="MMM D, YYYY">{row.created}</Moment></strong>&nbsp;
                <span className="text-muted">
                    <Moment format="hh:mm a">{row.created}</Moment>
                </span>
            </div>
        )
    }, {
        name: 'Creted By',
        sortable: false,
        wrap: true,
        cell: row => <>{row.report_creator ? <>{row.report_creator.first_name} {row.report_creator.last_name}</> : '-'}</>
    }, {
        name: 'Actions',
        sortable: true,
        width: '120px',
        cell: row => (
            <div>
                <a
                    href={`/reports/reports/${row.id}`}
                    className="btn btn-secondary btn-icon btn-sm margin-right-10"
                >
                    <span className="fa fa-eye" />
                </a>
                {/* <a
                    href={`/users/roles/${row.id}`}
                    className="btn btn-outline-secondary btn-icon btn-sm margin-right-10"
                >
                    <span className="fa fa-pencil" />
                </a> */}
                <button
                    type="button"
                    className="btn btn-danger btn-icon btn-sm"
                    onClick={() => handleDeleteReport(row)}
                >
                    <span className="fa fa-trash-o" />
                </button>
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
                        //console.log(data)
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