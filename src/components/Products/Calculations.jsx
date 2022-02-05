import React, { useEffect, useState } from 'react';
import { Col } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert';
import { calcTotal, difference, quotient, fraxionCalculations } from 'utils';
import CurrencyFormat from 'react-currency-format';
import Swal from 'sweetalert2';
import moment from 'moment';
import 'react-confirm-alert/src/react-confirm-alert.css';

const TRowEmpty = () => (
    <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
    </tr>
);

const TBodyRow = props => {
    const { data } = props;
    return (
        <tr>
            <td>{data[0]}</td>
            <td className="text-right">
                {/* <CurrencyFormat
                    thousandSeparator=" "
                    displayType="text"
                    fixedDecimalScale
                    decimalScale={4}
                /> */}
            </td>
            <td className="text-right">$ 1,784,807.00</td>
            <td className="text-right">-</td>
            <td className="text-right">-</td>
            <td className="text-right">-</td>
            <td className="text-right">-</td>
            <td className="text-right">-</td>
            <td className="text-right">-</td>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
        </tr>
    );
};

export default function Calculations(props) {
    const { title, indicators, fees } = props;
    const {
        main_pool,
        last_payout,
        last_updated,
        reserve_pool,
        compound_pool,
        last_calculation,
    } = indicators;
    const [calculations, setCalculations] = useState({});
    const [lockCalculations, setLockCalculations] = useState(true);
    const [prenCrv] = useState(0);

    function populateData() {
        const currentDay = moment().format('YYYY-MM-DD');
        const lastUpdated = moment(last_updated).format('YYYY-MM-DD');
        const previousDay = moment().subtract(1, 'day').format('YYYY-MM-DD');
        const lastCalculation = moment(last_calculation).format('YYYY-MM-DD');

        if (lastUpdated === currentDay) {
            // console.log('today', main_pool)
        }
        if (lastUpdated === previousDay) {
            // console.log('yesterday', main_pool)
        }
        const options = {
            ...fees,
            ...indicators,
            units: 54417,
            fraxion_price: 50,
        };
        const calculations = fraxionCalculations(options);
        setCalculations(calculations);
        setLockCalculations(lastCalculation === currentDay);
    }

    useEffect(() => {
        populateData();
    }, []);

    async function handleProcessCalcuations() {
        confirmAlert({
            title: 'Confirm',
            message: <div>Are you sure you want to process these {title} calculations? <strong>Please Note: This action cannot be undone.</strong></div>,
            buttons: [
                {
                    label: 'Yes, continue',
                    onClick: async () => {
                        //console.log('data')
                    }
                },
                {
                    label: 'Cancel',
                }
            ]
        });
    }
    
    async function handleProcessPayouts() {
        confirmAlert({
            title: 'Confirm',
            message: <div>Are you sure you want to process {title} payouts? <strong>Please Note: This action cannot be undone.</strong></div>,
            buttons: [
                {
                    label: 'Yes, continue',
                    onClick: async () => {
                      //  console.log('data')
                    }
                },
                {
                    label: 'Cancel',
                }
            ]
        });
    }

    return (
        <div>
            <div className="form-row">
                <Col xs={5} lg={2}>
                    <div className="form-group text-right margin-bottom-0">
                        <label className="margin-top-10">Last Calculated</label>
                    </div>
                </Col>
                <Col xs={7} lg={2}>
                    <input
                        type="text"
                        className="form-control"
                        defaultValue={moment(last_calculation).format('DD MMMM YYYY')}
                        disabled
                    />
                </Col>
                <Col xs={5} lg={2}>
                    <div className="form-group text-right margin-bottom-0">
                        <label className="margin-top-10">Last Paid Out</label>
                    </div>
                </Col>
                <Col xs={7} lg={2}>
                    <input
                        type="text"
                        className="form-control"
                        defaultValue={moment(last_payout).format('DD MMMM YYYY')}
                        disabled
                    />
                </Col>
                <Col xs={6} lg={2} className="d-none d-md-block"></Col>
                <Col xs={6} lg={2}>
                    <button
                        className="btn btn-outline-light btn-block"
                    >
                        Export to CSV
                    </button>
                </Col>
            </div>
            <div className="table-responsive">
                <table className="table table-condensed table-striped table-bordered margin-top-20 margin-bottom-20">
                    <thead>
                        <tr>
                            <td>&nbsp;</td>
                            <td className="text-right">&nbsp;</td>
                            <td className="text-right"><strong>21 Jan</strong><br/>Fri</td>
                            <td className="text-right"><strong>22 Jan</strong><br/>Sat</td>
                            <td className="text-right"><strong>23 Jan</strong><br/>Sun</td>
                            <td className="text-right"><strong>24 Jan</strong><br/>Mon</td>
                            <td className="text-right"><strong>25 Jan</strong><br/>Tue</td>
                            <td className="text-right"><strong>26 Jan</strong><br/>Wed</td>
                            <td className="text-right"><strong>27 Jan</strong><br/>Thu</td>
                            <td className="text-right" width="100">&nbsp;</td>
                            <td className="text-right" width="100"><br /><strong>Declared</strong></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Pool</td>
                            <td className="text-right">
                                <CurrencyFormat
                                    thousandSeparator=" "
                                    displayType="text"
                                    value={main_pool.balance_previous}
                                    fixedDecimalScale
                                    decimalScale={2}
                                    prefix={'$ '}
                                />
                            </td>
                            <td className="text-right">
                                <CurrencyFormat
                                    thousandSeparator=" "
                                    displayType="text"
                                    value={main_pool.balance_current}
                                    fixedDecimalScale
                                    decimalScale={2}
                                    prefix={'$ '}
                                />
                            </td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                        <tr>
                            <td>prenCrv</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <th>&nbsp;</th>
                            <th className="text-right">-</th>
                        </tr>
                        <tr>
                            <th>Total</th>
                            <th className="text-right">
                                <CurrencyFormat
                                    thousandSeparator=" "
                                    displayType="text"
                                    value={main_pool.balance_previous}
                                    fixedDecimalScale
                                    decimalScale={2}
                                    prefix={'$ '}
                                />
                            </th>
                            <th className="text-right">
                                <CurrencyFormat
                                    thousandSeparator=" "
                                    displayType="text"
                                    value={calcTotal(main_pool.balance_current, prenCrv)}
                                    fixedDecimalScale
                                    decimalScale={2}
                                    prefix={'$ '}
                                />
                            </th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                        </tr>
                        <TRowEmpty />
                        <tr>
                            <td>p3Crv</td>
                            <th className="text-right">
                                <CurrencyFormat
                                    thousandSeparator=" "
                                    displayType="text"
                                    value={compound_pool.balance_previous}
                                    fixedDecimalScale
                                    decimalScale={2}
                                    prefix={'$ '}
                                />
                            </th>
                            <th className="text-right">
                                <CurrencyFormat
                                    thousandSeparator=" "
                                    displayType="text"
                                    value={compound_pool.balance_current}
                                    fixedDecimalScale
                                    decimalScale={2}
                                    prefix={'$ '}
                                />
                            </th>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                        </tr>
                        <tr>
                            <td>Compounding</td>
                            <td className="text-right">&nbsp;</td>
                            <td className="text-right">&nbsp;</td>
                            <td className="text-right">&nbsp;</td>
                            <td className="text-right">&nbsp;</td>
                            <td className="text-right">&nbsp;</td>
                            <td className="text-right">&nbsp;</td>
                            <td className="text-right">&nbsp;</td>
                            <td className="text-right">&nbsp;</td>
                            <td className="text-right">&nbsp;</td>
                            <td className="text-right">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Difference</td>
                            <td className="text-right">$ -</td>
                            <th className="text-right">
                                <CurrencyFormat
                                    thousandSeparator=" "
                                    displayType="text"
                                    value={difference(compound_pool.balance_current, compound_pool.balance_previous)}
                                    fixedDecimalScale
                                    decimalScale={2}
                                    prefix={'$ '}
                                />
                            </th>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                        </tr>
                        <TRowEmpty />
                        <tr>
                            <td>Reserve Pool</td>
                            <th className="text-right">
                                <CurrencyFormat
                                    thousandSeparator=" "
                                    displayType="text"
                                    value={reserve_pool.balance_previous}
                                    fixedDecimalScale
                                    decimalScale={2}
                                    prefix={'$ '}
                                />
                            </th>
                            <th className="text-right">
                                <CurrencyFormat
                                    thousandSeparator=" "
                                    displayType="text"
                                    value={reserve_pool.balance_current}
                                    fixedDecimalScale
                                    decimalScale={2}
                                    prefix={'$ '}
                                />
                            </th>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td className="text-right">$ 17,123.93</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td className="text-right">
                                <CurrencyFormat
                                    thousandSeparator=" "
                                    displayType="text"
                                    value={calcTotal(reserve_pool.balance_current, 17123.93)}
                                    fixedDecimalScale
                                    decimalScale={2}
                                    prefix={'$ '}
                                />
                            </td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                        </tr>
                        <TRowEmpty />
                        <tr>
                            <td>Difference</td>
                            <th className="text-right">
                                <CurrencyFormat
                                    thousandSeparator=" "
                                    displayType="text"
                                    value={reserve_pool.balance_previous}
                                    fixedDecimalScale
                                    decimalScale={2}
                                    prefix={'$ '}
                                />
                            </th>
                            <th className="text-danger text-right">
                                <CurrencyFormat
                                    thousandSeparator=" "
                                    displayType="text"
                                    value={difference(calcTotal(reserve_pool.balance_current, 17123.93), reserve_pool.balance_previous)}
                                    fixedDecimalScale
                                    decimalScale={2}
                                    prefix={'$ '}
                                />
                            </th>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                        </tr>
                        {/* start */}
                        <TRowEmpty />
                        <tr>
                            <td>Daily Profit</td>
                            <td className="text-right">&nbsp;</td>
                            <th className="text-right">
                                <CurrencyFormat
                                    thousandSeparator=" "
                                    displayType="text"
                                    value={difference(calcTotal(main_pool.balance_current, prenCrv), main_pool.balance_previous)}
                                    fixedDecimalScale
                                    decimalScale={2}
                                    prefix={'$ '}
                                />
                            </th>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                        </tr>
                        <tr>
                            <th>Units</th>
                            <th>&nbsp;</th>
                            <th className="text-right">54,417</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                        </tr>
                        <tr>
                            <td>Profit/Unit</td>
                            <td>&nbsp;</td>
                            <td className="text-right">
                                <CurrencyFormat
                                    thousandSeparator=" "
                                    displayType="text"
                                    value={quotient(difference(calcTotal(main_pool.balance_current, prenCrv), main_pool.balance_previous), 54417)}
                                    fixedDecimalScale
                                    decimalScale={2}
                                    prefix={'$ '}
                                />
                            </td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                        </tr>
                        <TRowEmpty />
                        <tr>
                            <td>Compound</td>
                            <td>&nbsp;</td>
                            <td className="text-right">$ 0.21</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                        </tr>
                        <tr>
                            <td>Weekly Compound</td>
                            <td>&nbsp;</td>
                            <td className="text-right">$ 11,323.25</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                        </tr>
                        <TRowEmpty />
                        <tr>
                            <td>Reserve</td>
                            <td>&nbsp;</td>
                            <td className="text-right">$ 0.08</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                        </tr>
                        <tr>
                            <td>Sub-Total</td>
                            <td>&nbsp;</td>
                            <td className="text-right">$ 4,529.30</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                        </tr>
                        <TRowEmpty />
                        <tr>
                            <td>Remainder</td>
                            <td>&nbsp;</td>
                            <td className="text-right">$ 0.83</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                        </tr>
                        <TRowEmpty />
                        <tr>
                            <td>Edu</td>
                            <td>&nbsp;</td>
                            <td className="text-right">$ 0.08</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                        </tr>
                        <tr>
                            <td>Sub-Total</td>
                            <td>&nbsp;</td>
                            <td className="text-right">$ 4,529.30</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                        </tr>
                        <TRowEmpty />
                        <tr>
                            <td>Weekly</td>
                            <td>&nbsp;</td>
                            <td className="text-right">$ 0.08</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                        </tr>
                        <tr>
                            <td>Pool</td>
                            <td>&nbsp;</td>
                            <td className="text-right">$ 4,529.30</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                        </tr>
                        <tr>
                            <td>Sub-Total</td>
                            <td>&nbsp;</td>
                            <td className="text-right">$ 4,529.30</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                        </tr>
                        <TRowEmpty />
                        <tr>
                            <td>Unit Value</td>
                            <td>&nbsp;</td>
                            <td className="text-right">$ 0.08</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                        </tr>
                        <tr>
                            <th>Total Expenses</th>
                            <th>&nbsp;</th>
                            <th className="text-right">$ 54,417</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td className="text-right">$ 0.08</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Total Compound</th>
                            <th className="text-right">$ 1,736,379.33</th>
                            <th className="text-right">$ 1,747,702.58</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                        </tr>
                        <tr>
                            <th>Total Reserve</th>
                            <th>&nbsp;</th>
                            <th className="text-right">$ 1,747,702.58</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                            <th className="text-right">-</th>
                        </tr>
                        <tr>
                            <td>Deposits</td>
                            <td>&nbsp;</td>
                            <td className="text-right">$ 1,747,702.58</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                        </tr>
                        <tr>
                            <td>Compound</td>
                            <td>&nbsp;</td>
                            <td className="text-right">$ 1,747,702.58</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                        </tr>
                        <tr>
                            <td>Required</td>
                            <td>&nbsp;</td>
                            <td className="text-right">$ 1,747,702.58</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                        </tr>
                        <tr>
                            <td>Real</td>
                            <td>&nbsp;</td>
                            <td className="text-right">$ 1,747,702.58</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                        </tr>
                        <tr>
                            <td>Over/Short</td>
                            <td>&nbsp;</td>
                            <td className="text-right">$ 1,747,702.58</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                            <td className="text-right">-</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className="form-row">
                <Col xs={6} lg={2} className="d-none d-md-block">
                    <button
                        disabled={lockCalculations}
                        className="btn btn-secondary"
                        onClick={() => handleProcessCalcuations()}
                    >
                        Process Calculations
                    </button>
                </Col>
                <Col xs={6} lg={8} className="d-none d-md-block" />
                <Col xs={6} lg={2} className="d-none d-md-block text-right">
                    <button
                        className="btn btn-outline-light"
                        onClick={() => handleProcessPayouts()}
                        disabled
                    >
                        Process Weekly Payout
                    </button>
                </Col>
            </div>
        </div>
    );
}