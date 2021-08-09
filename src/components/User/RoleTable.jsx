import React from 'react';
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

const RoleTable = props => {
    const {
        config,
        roles,
        resultsLoading,
        setActiveRole,
        setShowDetailModal,
        setConfirmModal,
        setShowConfirmModal,
        handleDeleteUserRole,
    } = props;
    const { results } = config;
    const { pagination } = results;
    const { perpageOptions } = pagination;

    // table headings definition
    const columns = [{
        name: 'Role',
        selector: 'name',
        sortable: true,
        allowOverflow: true,
        minWidth: '150px',
    }, {
        name: 'Status',
        selector: 'status',
        sortable: true,
        cell: row => <span>{row.status ? 'Active' : 'Inactive'}</span>
    }, {
        name: 'Actions',
        sortable: false,
        maxWidth: '150px',
        cell: row => <div className="text-right">
            <a
                href={`/users/roles/edit/${row.id}`}
                className="mg-r-15"
                onClick={e => {
                    e.preventDefault();
                    setActiveRole(row);
                    setShowDetailModal(true);
                    window.history.pushState({}, null, `/users/roles/edit/${row.id}`);
                }}
            >
                <FeatherIcon icon="edit" width="14" height="14" />
            </a>
            <a
                href="/"
                className="mg-r-10 text-danger"
                onClick={e => {
                    e.preventDefault();
                    setConfirmModal({
                        size: 'sm',
                        title: 'Confirm Delete',
                        body: <p>Are you sure you want to delete {row.name} group?</p>,
                        confirmButton: {
                            text: 'Yes',
                            onClick: () => handleDeleteUserRole(row),
                        }
                    });
                    setShowConfirmModal(true);
                }}
            >
                <FeatherIcon icon="trash-2" width="14" height="14" />
            </a>
        </div>,
    }];

    return (
        <DataTable
            data={roles}
            columns={columns}
            customStyles={customStyles}
            noHeader
            selectableRowsHighlight
            highlightOnHover
            pagination
            progressPending={resultsLoading}
            paginationRowsPerPageOptions={perpageOptions}
        />
    );
};

export default RoleTable;
