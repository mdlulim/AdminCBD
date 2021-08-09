import React from 'react';
import moment from 'moment';
import DataTable from 'react-data-table-component';
import { FeatherIcon } from 'components';

// styles
const customStyles = {
    rows: {
        style: {
            minHeight: '72px', // override the row height
        }
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
        },
    },
};

const UserTable = props => {
    const {
        config,
        users,
        resultsLoading,
        setActiveUser,
        setShowDetailModal,
        handleDeleteUser,
        setShowConfirmModal,
        setShowResetPasswordModal,
        setResetPasswordContent,
        setConfirmModal,
    } = props;
    const { results } = config;
    const { pagination } = results;
    const { perpageOptions } = pagination;

    // table headings definition
    const columns = [{
        name: 'First name',
        selector: 'firstname',
        sortable: true,
    }, {
        name: 'Last name',
        selector: 'lastname',
        sortable: true,
    }, {
        name: 'Username',
        selector: 'username',
        sortable: true,
    }, {
        name: 'Role',
        sortable: true,
        cell: row => <span>{row.user_group.name}</span>
    }, {
        name: 'Email',
        selector: 'email',
        sortable: true,
        allowOverflow: true,
        minWidth: '220px',
    }, {
        name: 'Created',
        selector: 'created',
        sortable: true,
        allowOverflow: true,
        cell: row => <span>{moment(row.created).format('DD MMMM YYYY')}</span>,
    }, {
        name: 'Last Login',
        selector: 'last_login',
        sortable: true,
        allowOverflow: true,
        cell: row => <span>{row.last_login ? moment(row.last_login).fromNow() : ''}</span>,
    }, {
        name: 'Status',
        sortable: true,
        cell: row => <span>{row.active ? 'Active' : 'Inactive'}</span>
    }, {
        name: 'Actions',
        sortable: false,
        cell: row => <div className="text-right">
            <a
                href={`/users/edit/${row.id}`}
                className="mg-r-15"
                onClick={e => {
                    e.preventDefault();
                    setActiveUser(row);
                    setShowDetailModal(true);
                    window.history.pushState({}, null, `/users/edit/${row.id}`);
                }}
            >
                <FeatherIcon icon="edit" width="14" height="14" />
            </a>
            <a
                href="/"
                className="mg-r-15 text-danger"
                onClick={e => {
                    e.preventDefault();
                    setConfirmModal({
                        size: 'sm',
                        title: 'Confirm Delete',
                        body: <p>Are you sure you want to delete {row.firstname}?</p>,
                        confirmButton: {
                            text: 'Yes',
                            onClick: () => handleDeleteUser(row.id),
                        }
                    });
                    setShowConfirmModal(true);
                }}
            >
                <FeatherIcon icon="trash-2" width="14" height="14" />
            </a>
            <a
                href="/"
                className="mg-r-10"
                onClick={e => {
                    e.preventDefault();
                    setResetPasswordContent(row);
                    setShowResetPasswordModal(true);
                }}
            >
                <FeatherIcon icon="refresh-cw" width="14" height="14" />
            </a>
        </div>,
    }];
    
    return (
        <DataTable
            data={users}
            columns={columns}
            customStyles={customStyles}
            noHeader
            selectableRows
            selectableRowsHighlight
            highlightOnHover
            pagination
            progressPending={resultsLoading}
            paginationRowsPerPageOptions={perpageOptions}
        />
    );
};

export default UserTable;
