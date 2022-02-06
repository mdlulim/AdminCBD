import React, { useEffect, useState } from 'react';
import { Col } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert';
import { fraxionCalculations } from 'utils';
import CurrencyFormat from 'react-currency-format';
import Swal from 'sweetalert2';
import moment from 'moment';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Headers = () => (
    <div className="description">
        <div>&nbsp;</div>
        <div>Pool</div>
        <div>PrevCrv</div>
        <div><strong>Total</strong></div>
        <div>&nbsp;</div>
        <div>P3Crv Compound</div>
        <div>Difference</div>
        <div>&nbsp;</div>
        <div>Reserve Pool</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>Difference</div>
        <div>&nbsp;</div>
        <div>Daily Profit</div>
        <div><strong>Units</strong></div>
        <div>Profit/Unit</div>
        <div>&nbsp;</div>
        <div>Compound</div>
        <div>Weekly Compound</div>
        <div>&nbsp;</div>
        <div>Reserve</div>
        <div>Sub-Total</div>
        <div>&nbsp;</div>
        <div>Remainder</div>
        <div>&nbsp;</div>
        <div>Edu</div>
        <div>Sub-Total</div>
        <div>&nbsp;</div>
        <div>Weekly</div>
        <div>Pool</div>
        <div>Sub-Total</div>
        <div>&nbsp;</div>
        <div>Unit Value</div>
        <div><strong>Total Expenses</strong></div>
        <div>&nbsp;</div>
        <div><strong>Total Compound</strong></div>
        <div><strong>Total Reserve</strong></div>
        <div>Deposits</div>
        <div>Required</div>
        <div>Real</div>
        <div>Over/Short</div>
    </div>
);

const DayOfWeekName = ({ number }) => {
    switch (number) {
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
        default: return 'Sunday';
    }
};

const MoneyFormat = ({ currency, value }) => {
    return (
        <span className={parseFloat(value) < 0 ? 'text-danger' : ''}>
            <CurrencyFormat
                thousandSeparator=" "
                displayType="text"
                value={value || 0}
                fixedDecimalScale
                decimalScale={currency ? currency.divisibility : 2}
                prefix={`${currency ? currency.symbol : '$'} `}
            />
        </span>
    );
};

const NumberFormat = ({ value }) => {
    return (
        <span className={parseFloat(value) < 0 ? 'text-danger' : ''}>
            <CurrencyFormat
                thousandSeparator=" "
                displayType="text"
                value={value}
            />
        </span>
    );
};

const Column = item => (
    <div className={`column ${item.active ? 'active' : ''}`}>
        <div>
            <strong>{moment(item.date).format('DD MMM')}</strong><br />
            {<DayOfWeekName number={moment(item.date).isoWeekday()} />}
        </div>
        <div><MoneyFormat currency={item.currency} value={item.pool} /></div>
        <div><MoneyFormat currency={item.currency} value={item.prencrv} /></div>
        <div><strong><MoneyFormat currency={item.currency} value={item.pool_prencrv_total} /></strong></div>
        <div>&nbsp;</div>
        <div><MoneyFormat currency={item.currency} value={item.p3crv_compounding} /></div>
        <div><MoneyFormat currency={item.currency} value={item.p3crv_compounding_difference} /></div>
        <div>&nbsp;</div>
        <div><MoneyFormat currency={item.currency} value={item.reserve_pool} /></div>
        <div><MoneyFormat currency={item.currency} value={item.reserve_pool2} /></div>
        <div><MoneyFormat currency={item.currency} value={item.reserve_pool_total} /></div>
        <div>&nbsp;</div>
        <div><MoneyFormat currency={item.currency} value={item.reserve_pool_difference} /></div>
        <div>&nbsp;</div>
        <div><MoneyFormat currency={item.currency} value={item.daily_profit} /></div>
        <div><strong><NumberFormat currency={item.currency} value={item.units} /></strong></div>
        <div><MoneyFormat currency={item.currency} value={item.profit_per_unit} /></div>
        <div>&nbsp;</div>
        <div><MoneyFormat currency={item.currency} value={item.compound} /></div>
        <div><MoneyFormat currency={item.currency} value={item.weekly_compound} /></div>
        <div>&nbsp;</div>
        <div><MoneyFormat currency={item.currency} value={item.reserve} /></div>
        <div><MoneyFormat currency={item.currency} value={item.reserve_subtotal} /></div>
        <div>&nbsp;</div>
        <div><MoneyFormat currency={item.currency} value={item.remainder} /></div>
        <div>&nbsp;</div>
        <div><MoneyFormat currency={item.currency} value={item.educator} /></div>
        <div><MoneyFormat currency={item.currency} value={item.educator_subtotal} /></div>
        <div>&nbsp;</div>
        <div><MoneyFormat currency={item.currency} value={item.remainder_weekly} /></div>
        <div><MoneyFormat currency={item.currency} value={item.remainder_pool} /></div>
        <div><MoneyFormat currency={item.currency} value={item.remainder_subtotal} /></div>
        <div>&nbsp;</div>
        <div><MoneyFormat currency={item.currency} value={item.unit_value} /></div>
        <div><strong><MoneyFormat currency={item.currency} value={item.total_expenses} /></strong></div>
        <div><MoneyFormat currency={item.currency} value={item.total_unit_expenses} /></div>
        <div><strong><MoneyFormat currency={item.currency} value={item.total_compound} /></strong></div>
        <div><strong><MoneyFormat currency={item.currency} value={item.total_reserve} /></strong></div>
        <div><MoneyFormat currency={item.currency} value={item.total_deposits} /></div>
        <div><MoneyFormat currency={item.currency} value={item.total_required} /></div>
        <div><MoneyFormat currency={item.currency} value={item.total_real} /></div>
        <div><MoneyFormat currency={item.currency} value={item.over_short} /></div>
    </div>
);

export default function Calculations(props) {
    const {
        id,
        fees,
        title,
        history,
        currency,
        indicators,
        setPageLoading,
        todayCalculated,
    } = props;
    const {
        ref_id,
        last_payout,
        last_calculation,
    } = indicators;
    const [calculations, setCalculations] = useState({});

    function populateData() {
        const options = {
            ...fees,
            ...indicators,
            units: 54417,
            fraxion_price: 50,
        };
        const calculations = fraxionCalculations(options);
        console.log(calculations)
        setCalculations(calculations);
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
                        setPageLoading(true);
                        const postData = {
                            ...calculations,
                            ref_id,
                        };
                        console.log('data', id, postData)
                        setPageLoading(false);
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
            <div className="fraxion-calculations_wrapper d-flex">
                <Headers />
                {history.map((item, index) => (
                    <Column key={index.toString()} {...item} index={index} />
                ))}
                {!todayCalculated &&
                <Column {...calculations} currency={currency} active />}
            </div>
            <div className="form-row margin-top-20">
                <Col xs={6} lg={2} className="d-none d-md-block">
                    <button
                        disabled={todayCalculated}
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