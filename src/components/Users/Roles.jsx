import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import DataTable from 'react-data-table-component';
import Moment from 'react-moment';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { UserService } from 'providers';

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

export default function UsersRoles(props) {
    const { data, permissions } = props;
    const columns = [{
        name: 'Name',
        selector: 'label',
        sortable: true,
        wrap: true,
    }, {
        name: 'Description',
        selector: 'description',
        sortable: true,
    }, {
        name: 'Type',
        selector: 'type',
        sortable: true,
    }, {
        name: 'Date Created',
        selector: 'created',
        sortable: true,
        cell: row => <div><Moment format="MMM D, YYYY">{row.created}</Moment></div>
    }, {
        name: 'Creted By',
        sortable: false,
        cell: row => <>{row.creator ? <>{row.creator.first_name} {row.creator.last_name}</> : '-'}</>
    }, {
        name: 'Date Modified',
        selector: 'updated',
        sortable: true,
        cell: row => <>{row.updated ? <Moment format="MMM D, YYYY">{row.updated}</Moment> : '-'}</>
    }, {
        name: 'Updated By',
        sortable: false,
        cell: row => <>{row.updator ? <>{row.updator.first_name} {row.updator.last_name}</> : '-'}</>
    }, {
        name: 'Actions',
        sortable: true,
        width: '120px',
        cell: row => (
            <div>
                {permissions && permissions.update_access &&
                    <a
                        href={`/users/roles/${row.id}`}
                        className="btn btn-secondary btn-icon btn-sm margin-right-10"
                    >
                        <span className="fa fa-pencil" />
                    </a>
                }
                {permissions && permissions.delete_access &&
                    <button
                        type="button"
                        className="btn btn-danger btn-icon btn-sm"
                        onClick={() => handleDeleteRole(row)}
                    >
                        <span className="fa fa-trash-o" />
                    </button>
                }
            </div>
        )
    }];

    async function handleDeleteRole(data) {
        const { label } = data;
        return confirmAlert({
            title: 'Confirm Delete',
            message: <div>Are you sure you want to delete <strong>{label}</strong>?</div>,
            buttons: [
                {
                    label: 'Confirm and continue',
                    onClick: async () => {
                        const res = await UserService.archiveRole(data.id)
                        console.log(res)
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