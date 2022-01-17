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
        <div className={`btn btn-outline-${badge} btn-block disabled btn-sm`}>{status}</div>
    );
};

const isDisabled = item => {
    const { group } = item;
    if (group.name === 'super') return true;
    return false;
}

export default function UsersRoles(props) {
    const { data } = props;
    const columns = [{
        name: 'Full Name',
        selector: 'full_name',
        sortable: true,
        wrap: true,
        cell: row => <strong>{row.full_name}</strong>
    }, {
        name: 'Username',
        selector: 'username',
        sortable: true,
        wrap: true,
    }, {
        name: 'Role',
        sortable: false,
        wrap: true,
        cell: row => <div>{row.group.label}</div>
    }, {
        name: 'Email',
        selector: 'email',
        sortable: true,
        width: '220px',
        wrap: true,
    }, {
        name: 'Date Created',
        selector: 'created',
        sortable: true,
        wrap: true,
        cell: row => (
            <div>
                <strong><Moment format="MMM D, YYYY">{row.created}</Moment></strong><br />
                <span className="text-muted">
                    <Moment format="hh:mm a">{row.created}</Moment>
                </span>
            </div>
        )
    }, {
        name: 'Status',
        selector: 'status',
        sortable: true,
        cell: row => <Status {...row} />
    }, {
        name: 'Actions',
        sortable: true,
        width: '160px',
        cell: row => (
            <div>
                <a
                    href={`/users/${row.id}`}
                    className={`btn btn-secondary btn-icon btn-sm margin-right-10 ${isDisabled(row) ? 'disabled' : ''}`}
                    onClick={e => {
                        if (isDisabled(row)) {
                            e.preventDefault();
                        }
                    }}
                >
                    <span className="fa fa-pencil" />
                </a>
                <button
                    type="button"
                    className="btn btn-primary btn-icon btn-sm margin-right-10"
                    onClick={() => handleResendPassword(row)}
                    disabled={isDisabled(row)}
                >
                    <span className="fa fa-send" />
                </button>
                <button
                    type="button"
                    className="btn btn-danger btn-icon btn-sm"
                    onClick={() => handleDeleteUser(row)}
                    disabled={isDisabled(row)}
                >
                    <span className="fa fa-trash-o" />
                </button>
            </div>
        )
    }];

    async function handleResendPassword(data) {
        const { first_name, last_name } = data;
        return confirmAlert({
            title: 'Confirm Reset/Resend Password',
            message: <div>Are you sure you want to reset and resend password for <strong>{first_name} {last_name}</strong>?</div>,
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

    async function handleDeleteUser(data) {
        const { first_name, last_name } = data;
        return confirmAlert({
            title: 'Confirm Delete',
            message: <div>Are you sure you want to delete <strong>{first_name} {last_name}</strong>?</div>,
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