import React, { useState } from 'react';
import { ProductService } from 'providers';
import CurrencyFormat from 'react-currency-format';
import DataTable from 'react-data-table-component';
import Modals from 'components/Modals';
import Moment from 'react-moment';
import useForm from 'react-hook-form';
import Swal from 'sweetalert2';

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

const Status = ({ cancellation_status }) => {
    let badge = 'primary';

    switch (cancellation_status.toLowerCase()) {
        case 'pending':
            badge = 'warning';
            break;

        case 'complete':
            badge = 'success';
            break;

        case 'rejected':
            badge = 'danger';
            break;

        default: badge = 'primary';
    }
    return (
        <div className={`btn btn-outline-${badge} btn-block disabled btn-sm`}>
            {cancellation_status}
        </div>
    );
};

const isDisabled = ({ cancellation_status }) => {
    let disabled = false;
    switch (cancellation_status.toLowerCase()) {
        case 'complete':
        case 'rejected':
            disabled = true;
            break;

        default: disabled = false;
    }
    return disabled;
}

const Product = props => {
    const { product_subcategory, product_code, title, type } = props;
    const { code, description } = product_subcategory;

    let productTitle = null;

    switch (code) {
        case 'WC':
            productTitle = title;
            break;

        case 'FX':
            productTitle = `${description} - ${title}`;
            break;

        case 'FP':
            productTitle = `${description}: ${type} - ${title}`;
            break;

        case 'CBIX7':
            productTitle = `${description} - ${title}`;
            break;
    }

    return (
        <div>
            <strong>{product_code}</strong><br />
            <span className="text-muted">
                {productTitle}
            </span>
        </div>
    );
}

const getProductTitle = props => {
    const { product_subcategory, product_code, title, type } = props;
    const { code, description } = product_subcategory;

    let productTitle = null;

    switch (code) {
        case 'WC':
            productTitle = title;
            break;

        case 'FX':
            productTitle = `${description} - ${title}`;
            break;

        case 'FP':
            productTitle = `${description}: ${type} - ${title}`;
            break;

        case 'CBIX7':
            productTitle = `${description} - ${title}`;
            break;
    }

    return `${product_code}: ${productTitle}`;
};

export default function ProductCancellations(props) {
    const { register, handleSubmit, errors, reset } = useForm();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [selected, setSelected] = useState(null);
    const [type, setType] = useState(null);
    const { data } = props;
    const columns = [{
        name: 'Member',
        sortable: false,
        wrap: true,
        width: '180px',
        cell: row => (
            <div>
                <strong>{row.user.referral_id}</strong><br />
                <span className="text-muted">
                    {row.user.first_name} {row.user.last_name}
                </span>
            </div>
        )
    }, {
        name: 'Product',
        sortable: true,
        wrap: true,
        width: '250px',
        cell: row => <Product {...row.product} />
    }, {
        name: 'Income Amount',
        selector: 'income',
        sortable: false,
        cell: row => (
            <CurrencyFormat
                thousandSeparator=" "
                displayType="text"
                value={row.income || 0}
                fixedDecimalScale
                decimalScale={4}
                renderText={value => (
                <span>
                    {value} {row.product.currency_code}
                </span>)}
            />
        )
    }, {
        name: 'Date Created',
        selector: 'created',
        sortable: true,
        cell: row => (
            <div>
                <strong>
                    <Moment format="MMM D, YYYY">{row.created}</Moment>
                </strong>
                <br />
                <span className="text-muted">
                    <Moment format="hh:mma">{row.created}</Moment>
                </span>
            </div>
        )
    }, {
        name: 'Date Cancelled',
        selector: 'updated',
        sortable: true,
        cell: row => (
            <div>
                {row.cancellation_date ?
                    <div>
                        <strong>
                            <Moment format="MMM D, YYYY">{row.cancellation_date}</Moment>
                        </strong>
                        <br />
                        <span className="text-muted">
                            <Moment format="hh:mma">{row.cancellation_date}</Moment>
                        </span>
                    </div> : '-'}
            </div>
        )
    }, {
        name: 'Status',
        selector: 'status',
        sortable: true,
        width: '120px',
        cell: row => <Status {...row} />
    }, {
        name: 'Actions',
        sortable: false,
        width: '150px',
        cell: row => (
            <div>
                <button
                    href={`/users/roles/${row.id}`}
                    className="btn btn-secondary btn-icon btn-sm margin-right-10"
                    disabled={isDisabled(row)}
                    onClick={() => {
                        setSelected(row);
                        setType('approve');
                        setShowConfirmModal(true);
                    }}
                >
                    <span className="fa fa-check" />
                </button>
                <button
                    type="button"
                    className="btn btn-danger btn-icon btn-sm margin-right-10"
                    disabled={isDisabled(row)}
                    onClick={() => {
                        setSelected(row);
                        setType('reject');
                        setShowConfirmModal(true);
                    }}
                >
                    <span className="fa fa-times" />
                </button>
                <button
                    type="button"
                    className="btn btn-outline-light btn-icon btn-sm"
                    onClick={() => {
                        setSelected(row);
                        setShowInfoModal(true);
                    }}
                >
                    <span className="fa fa-eye" />
                </button>
            </div>
        )
    }];

    async function handleApprove(data) {
        setProcessing(true);
        const response = await ProductService.updateCancellationRequest(type, data);
        setProcessing(false);
        setShowConfirmModal(false);
        const { success } = response;
        if (success) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Request processed successfully!',
                showConfirmButton: false,
                timer: 4000
            });
            return setTimeout(async function () {
                window.location.href = '/products/cancellations';
            }, 4000);
        }
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Failed to process request, please try again!',
            showConfirmButton: false,
            timer: 4000
        });
    };

    async function handleReject(data) {
        setProcessing(true);
        const response = await ProductService.updateCancellationRequest(type, data);
        setProcessing(false);
        setShowConfirmModal(false);
        const { success } = response;
        if (success) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Request processed successfully!',
                showConfirmButton: false,
                timer: 4000
            });
            return setTimeout(async function () {
                window.location.href = '/products/cancellations';
            }, 4000);
        }
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Failed to process request, please try again!',
            showConfirmButton: false,
            timer: 4000
        });
    };

    async function onSubmit(data) {
        if (type === 'approve') {
            return handleApprove(data);
        }
        return handleReject(data);
    }

    return (
        <>
            <Modals.Confirm
                show={showConfirmModal}
                setShow={setShowConfirmModal}
            >
                <form
                    noValidate
                    role="form"
                    autoComplete="off"
                    className="text-start"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h3 style={{ textTransform: 'capitalize' }}>Confirm {type} Cancellation</h3>
                    <p className="subtitle margin-bottom-20">
                        Are you sure you want to {type} this request?
                    </p>
                    {selected &&
                        <>
                            <input type="hidden" name="user_product_id" defaultValue={selected.id} ref={register({ required: true })} />
                            <input type="hidden" name="product_id" defaultValue={selected.product.id} ref={register({ required: true })} />
                            <input type="hidden" name="member_id" defaultValue={selected.user.id} ref={register({ required: true })} />
                            <div className="form-group">
                                <label>Member</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={`${selected.user.referral_id}: ${selected.user.first_name} ${selected.user.last_name}`}
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <label>Product</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={getProductTitle(selected.product)}
                                    disabled
                                />
                            </div>
                        </>}
                    <div className="form-group">
                        <p className="subtitle margin-top-15 margin-bottom-5">
                            Please prodive reason for rejecting product cancellation
                        </p>
                        <textarea
                            id="reason"
                            name="reason"
                            className={`form-control ${errors.reason ? 'is-invalid' : ''}`}
                            ref={register({ required: type === 'reject' })}
                            disabled={processing}
                            rows={4}
                        />
                        {errors.reason &&
                            <span className="help-block invalid-feedback">
                                Please make sure you provide reason for rejecting product cancellation
                            </span>}
                    </div>
                    <button
                        type="submit"
                        className={`btn btn-${type === 'reject' ? 'danger' : 'secondary'}`}
                        disabled={processing}
                    >
                        {processing ? 'Processing' : 'Confirm and continue'}
                    </button>
                    <button
                        className="btn btn-link margin-left-5 text-muted"
                        disabled={processing}
                        onClick={() => {
                            reset();
                            setType(null);
                            setSelected(null);
                            setShowConfirmModal(false);
                        }}
                    >
                        Cancel
                    </button>
                </form>
            </Modals.Confirm>
            {selected &&
            <Modals.ProductCancellation
                setShow={setShowInfoModal}
                show={showInfoModal}
                {...selected}
            />}
            <DataTable
                register
                data={data}
                columns={columns}
                customStyles={customStyles}
                selectableRowsHighlight
                highlightOnHover
                pagination
                noHeader
            />
        </>
    );
}