import React from 'react';
import Moment from 'react-moment';
import DataTable from 'react-data-table-component';

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
const iconPadding = {
    paddingRight: '3px',
}

const Status = ({ archived }) => {
    let badge = 'success';
    let text = 'Active';
    if (archived) {
        badge = 'danger';
        text = 'Archived';
    }
    return (
        <div className={`btn btn-outline-${badge} btn-block disabled btn-sm`}>
            {text}
        </div>
    );
};

export default function SubCategories(props) {
    const { data } = props;
    const columns = [
        {
            name: 'Description',
            selector: 'description',
            sortable: true,
        }, {
            name: 'Category',
            sortable: false,
            cell: row => <div>{row.product_category ? row.product_category.title : ''}</div>
        }, {
            name: 'Code',
            selector: 'code',
            sortable: true,
            width: '100px',
        }, {
            name: 'Allow Calculations',
            selector: 'allow_cancellations',
            sortable: true,
            width: '170px',
            cell: row => <span>{row.allow_cancellations ? <i className="fa fa-check text-success" /> : <i className="fa fa-times text-danger" />}</span>
        }, {
            name: 'Has Payouts',
            selector: 'has_payouts',
            width: '120px',
            sortable: true,
            cell: row => <span>{row.has_payouts ? <i className="fa fa-check text-success" /> : <i className="fa fa-times text-danger" />}</span>
        }, {
            name: 'Created Date',
            selector: 'created',
            sortable: true,
            width: '180px',
            cell: row =>
                <div>
                    <strong><Moment date={row.created} format="D MMM YYYY" /></strong>&nbsp;
                    <span className="text-muted"><Moment date={row.created} format="hh:mma" /></span>
                </div>
        }, {
            name: 'Status',
            selector: 'archived',
            sortable: true,
            width: '150px',
            cell: row => <Status {...row} />
        }, {
            name: 'Actions',
            sortable: true,
            width: '120px',
            cell: row =>
                <div>
                    <span style={iconPadding}>
                        <a
                            href={`/products/subcategories/${row.id}`}
                            className="btn btn-secondary btn-sm btn-icon"
                        >
                            <span className="fa fa-pencil" />
                        </a>
                        <a
                            href={`/products/subcategories/${row.id}/calculations`}
                            className={`btn btn-outline-light btn-sm btn-icon margin-left-10 ${row.code === 'FX' ? '' : 'disabled'}`}
                            onClick={e => {
                                if (row.code !== 'FX') {
                                    return e.preventDefault();
                                }
                            }}
                        >
                            <span className="fa fa-cog" />
                        </a>
                    </span>
                </div>
        }];


    return (
        <DataTable
            noHeader
            data={data}
            columns={columns}
            customStyles={customStyles}
            selectableRowsHighlight
            highlightOnHover
            pagination
        />
    );
}