import React from 'react';
import { Col, Row } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert';
import { ProductService } from 'providers';
import useForm from 'react-hook-form';
import moment from 'moment';
import Swal from 'sweetalert2';
import 'react-confirm-alert/src/react-confirm-alert.css';

const getBalance = props => {
    const {
        last_updated,
        balance_previous,
        balance_current,
    } = props;
    const lastUpdated = moment(last_updated).format('YYYY-MM-DD');
    const today = moment().format('YYYY-MM-DD');
    const yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD');
    if (lastUpdated === today) {
        return {
            balance_current,
            balance_previous,
        };
    }
    if (lastUpdated === yesterday) {
        return {
            balance_current: 0,
            balance_previous: balance_current,
        };
    }
    return {
        balance_current: 0,
        balance_previous: 0,
    };
}

export default function Indicators(props) {
    const { id, title, indicators, setPageLoading } = props;
    const { register, handleSubmit, errors } = useForm();
    const { main_pool, compound_pool, reserve_pool, last_updated } = indicators;
    const mainPool = getBalance({ ...main_pool, last_updated });
    const compoundPool = getBalance({ ...compound_pool, last_updated });
    const reservePool = getBalance({ ...reserve_pool, last_updated });

    async function onSubmit(data) {
        console.log(data);
        confirmAlert({
            title: 'Confirm',
            message: <div>Are you sure you want to capture these configurations? <strong>Please Note: This action will affect {title} calculations.</strong></div>,
            buttons: [
                {
                    label: 'Yes, continue',
                    onClick: async () => {
                        const today = moment().format('YYYY-MM-DD');
                        const {
                            main_pool_balance_today,
                            reserve_pool_balance_today,
                            main_pool_balance_yesterday,
                            compound_pool_balance_today,
                            compound_pool_balance_yesterday,
                            reserve_pool_balance_yesterday,
                        } = data;
                        const postData = {
                            last_updated: today,
                            main_pool: {
                                balance_current: parseFloat(main_pool_balance_today),
                                balance_previous: parseFloat(main_pool_balance_yesterday),
                            },
                            compound_pool: {
                                balance_current: parseFloat(compound_pool_balance_today),
                                balance_previous: parseFloat(compound_pool_balance_yesterday),
                            },
                            reserve_pool: {
                                balance_current: parseFloat(reserve_pool_balance_today),
                                balance_previous: parseFloat(reserve_pool_balance_yesterday),
                            }
                        };
                        setPageLoading(true);
                        const response = await ProductService.updateProductSubcategory(id, {
                            indicators: postData,
                        });
                        const { success } = response;
                        setPageLoading(false);
                        if (success) {
                            return Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Configurations updated successfully!',
                                showConfirmButton: false,
                                timer: 4000
                            });
                        }
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Failed to process request, please try again!',
                            showConfirmButton: false,
                            timer: 4000
                        });
                    }
                },
                {
                    label: 'Cancel',
                }
            ]
        });
    };

    return (
        <form className="has-validation-callback" autoComplete="off" onSubmit={handleSubmit(onSubmit)} noValidate>
            <p className="subtitle margin-top-10 margin-bottom-20">
                Last updated date: <strong>{moment(last_updated).format('DD MMMM YYYY')}</strong>.
            </p>
            <div className="card-inner-container card-inner-container--light text-left">
                <h4 id="rw-fe-basic">Main Pool</h4>
                <p className="subtitle margin-bottom-20">
                    Please use the form below to specify main pool details for {title.toLowerCase()} calculations.
                    Make sure all required (<span className="text-danger">*</span>) fields are completed
                    accordingly.
                </p>
                <Row className="row-xs">
                    <Col xs={12} sm={6}>
                        <div className="form-group">
                            <label
                                className="col-form-label"
                                htmlFor="agent_id"
                            >
                                Balance Yesterday ({moment().subtract(1, 'day').format('DD MMMM YYYY')})
                                <span className="text-danger">*</span>
                            </label>
                            <input
                                type="number"
                                id="main_pool_balance_yesterday"
                                name="main_pool_balance_yesterday"
                                className={`form-control ${errors.main_pool_balance_yesterday ? 'is-invalid' : ''}`}
                                defaultValue={mainPool.balance_previous}
                                ref={register({ required: true })}
                            />
                        </div>
                    </Col>
                    <Col xs={12} sm={6}>
                        <div className="form-group">
                            <label
                                className="col-form-label"
                                htmlFor="agent_id"
                            >
                                Balance Today ({moment().format('DD MMMM YYYY')})
                                <span className="text-danger">*</span>
                            </label>
                            <input
                                type="number"
                                id="main_pool_balance_today"
                                name="main_pool_balance_today"
                                className={`form-control ${errors.main_pool_balance_today ? 'is-invalid' : ''}`}
                                defaultValue={mainPool.balance_current}
                                ref={register({ required: true })}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="card-inner-container card-inner-container--light text-left">
                <h4 id="rw-fe-basic">Compound Pool</h4>
                <p className="subtitle margin-bottom-20">
                    Please use the form below to specify compound pool details for {title.toLowerCase()} calculations.
                    Make sure all required (<span className="text-danger">*</span>) fields are completed
                    accordingly.
                </p>
                <Row className="row-xs">
                    <Col xs={12} sm={6}>
                        <div className="form-group">
                            <label
                                className="col-form-label"
                                htmlFor="agent_id"
                            >
                                Balance Yesterday ({moment().subtract(1, 'day').format('DD MMMM YYYY')})
                                <span className="text-danger">*</span>
                            </label>
                            <input
                                type="number"
                                id="compound_pool_balance_yesterday"
                                name="compound_pool_balance_yesterday"
                                className={`form-control ${errors.compound_pool_balance_yesterday ? 'is-invalid' : ''}`}
                                defaultValue={compoundPool.balance_previous}
                                ref={register({ required: true })}
                            />
                        </div>
                    </Col>
                    <Col xs={12} sm={6}>
                        <div className="form-group">
                            <label
                                className="col-form-label"
                                htmlFor="agent_id"
                            >
                                Balance Today ({moment().format('DD MMMM YYYY')})
                                <span className="text-danger">*</span>
                            </label>
                            <input
                                type="number"
                                id="compound_pool_balance_today"
                                name="compound_pool_balance_today"
                                className={`form-control ${errors.compound_pool_balance_today ? 'is-invalid' : ''}`}
                                defaultValue={compoundPool.balance_current}
                                ref={register({ required: true })}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="card-inner-container card-inner-container--light text-left">
                <h4 id="rw-fe-basic">Reserve Pool</h4>
                <p className="subtitle margin-bottom-20">
                    Please use the form below to specify reserve pool details for {title.toLowerCase()} calculations.
                    Make sure all required (<span className="text-danger">*</span>) fields are completed
                    accordingly.
                </p>
                <Row className="row-xs">
                    <Col xs={12} sm={6}>
                        <div className="form-group">
                            <label
                                className="col-form-label"
                                htmlFor="agent_id"
                            >
                                Balance Yesterday ({moment().subtract(1, 'day').format('DD MMMM YYYY')})
                                <span className="text-danger">*</span>
                            </label>
                            <input
                                type="number"
                                id="reserve_pool_balance_yesterday"
                                name="reserve_pool_balance_yesterday"
                                className={`form-control ${errors.reserve_pool_balance_yesterday ? 'is-invalid' : ''}`}
                                defaultValue={reservePool.balance_previous}
                                ref={register({ required: true })}
                            />
                        </div>
                    </Col>
                    <Col xs={12} sm={6}>
                        <div className="form-group">
                            <label
                                className="col-form-label"
                                htmlFor="agent_id"
                            >
                                Balance Today ({moment().format('DD MMMM YYYY')})
                                <span className="text-danger">*</span>
                            </label>
                            <input
                                type="number"
                                id="reserve_pool_balance_today"
                                name="reserve_pool_balance_today"
                                className={`form-control ${errors.reserve_pool_balance_today ? 'is-invalid' : ''}`}
                                defaultValue={reservePool.balance_current}
                                ref={register({ required: true })}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
            <button
                type="submit"
                className="btn btn-secondary"
            >
                Save Configurations
            </button>
        </form>
    );
}