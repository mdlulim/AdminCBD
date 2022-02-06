import React, { useEffect, useState } from 'react';
import { ExcelRenderer } from 'react-excel-renderer';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert';
import { ProductService } from 'providers';
import { AuthLayout } from 'containers';
import { Common } from 'components';
import CsvDownloader from 'react-csv-downloader';
import CurrencyFormat from 'react-currency-format';
import ReactHtmlParser from 'react-html-parser';
import Swal from 'sweetalert2';
import formatter from 'currency-formatter';
import moment from 'moment';

const educatorRow = 29;
const payoutRow   = 34;
const dayOfweek   = moment().weekday();
const difference  = (dayOfweek === 0) ? 2 : dayOfweek - 5; // 7 - 5 = 2
let startDate     = moment().format('YYYY-MM-DD');

if (difference > 0) {
    startDate = moment().subtract(difference, 'days').format('YYYY-MM-DD');
}
if (difference < 0) {
    startDate = moment().subtract((6 - difference + 2), 'days').format('YYYY-MM-DD');
}
const endDate = moment(startDate).add(6, 'days').format('YYYY-MM-DD');

const ExcelTableHead = params => {
    const { columns } = params;
    return (
        <tr>
            <th>&nbsp;</th>
            {columns.map(item => (
                <th key={item.key.toString()}>
                    {item.name}
                </th>
            ))}
        </tr>
    );
};

const isCurrencyRow = index => {
    const arr = [17];
    return !arr.includes(index);
};

export default function SubCategoryCalculations(props) {
    const { match } = props;
    const { params } = match;
    const { id } = params;
    const [file, setFile] = useState(null);
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [subcategory, setSubcategory] = useState(null);
    const [pageLoading, setPageLoading] = useState(true);
    const [declaredColumn, setDeclaredColumn] = useState(null);
    const [educatorAmount, setEducatorAmount] = useState(null);
    const [payoutAmount, setPayoutAmount] = useState(null);
    const [payoutRecords, setPayoutRecords] = useState([]);
    const [payoutReport, setPayoutReport] = useState({});
    const [unitsColumn, setUnitsColumn] = useState(null);
    const [startDayColumn, setStartDayColumn] = useState(null);
    const [allowPayout, setAllowPayout] = useState(true);
    const [payoutPrevious, setPayoutPrevious] = useState({});

    async function fetchData() {
        const subcategory = await ProductService.getProductSubcategory(id);
        const { indicators } = subcategory;
        const { payout } = indicators;
        setSubcategory(subcategory);
        setAllowPayout(startDate !== moment(payout.start_date).format('YYYY-MM-DD'));
        setPayoutPrevious(payout);
        setPageLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    function handleFileChange(input) {
        setPageLoading(true);
        const file = input.files[0];
        setFile(input.files[0]);
        ExcelRenderer(file, (err, resp) => {
            if (err) return console.log(err);

            setRows(resp.rows);
            setColumns(resp.cols);
            setPageLoading(false);
        });
    }

    const formatNumber = (value, prec = 2) => (
        formatter.format(value, {
            decimal: '.',
            thousand: ',',
            precision: prec,
        })
    );

    const centerBoldCell = ['mon','tue','wed','thu','fri','sat','sun', 'declared','withdrawals','dep'];
    const leftBoldCell = ['bonus','reconciliation:','reconciliation'];

    async function handleConfirmPayout() {
        return confirmAlert({
            title: 'Confirm Payout',
            message: 'Are you sure you want to process the payout as per the spreadsheet?',
            buttons: [
                {
                    label: 'Yes, continue',
                    onClick: async () => {
                        setPageLoading(true);
                        const postData = {
                            educator_amount: educatorAmount,
                            payout_amount: payoutAmount,
                            start_date: startDate,
                            end_date: endDate,
                            extract: {
                                rows,
                                columns,
                            }
                        };
                        const response = await ProductService.getSubcategoryPayouts(id, postData);
                        const { success, data } = response;
                        setPageLoading(false);

                        if (success) {
                            setColumns([]);
                            setFile(null);
                            setRows([]);
                            setPayoutReport(data);
                            setPayoutRecords(data.results || []);
                            return Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Request processed successfully!',
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
    }

    const formatColumnValue = (value, currency = true, column, rowIndex, date) => {
        if (typeof value === 'number') {
            if (rowIndex === 0 && column >= 2 && column <= 8) {
                return `<td class="text-center">${date}</td>`;
            }
            const classes = (parseFloat(value) < 0) ? 'text-danger' : '';
            if (currency) {
                return `<td class="text-right ${classes}">$ ${formatNumber(parseFloat(value))}</td>`;
            }
            return `<td class="text-right">${formatNumber(parseInt(value), 0)}</td>`;
        }
        if (value.toLowerCase() === 'declared') {
            setDeclaredColumn(column);
        }
        if (value.toLowerCase() === 'units') {
            setUnitsColumn(column);
        }
        if (value.toLowerCase() === 'fri') {
            setStartDayColumn(column);
        }
        if (centerBoldCell.includes(value.toLowerCase())) {
            return `<td class="text-center text-bold">${value}</td>`;
        }
        if (leftBoldCell.includes(value.toLowerCase())) {
            return `<td class="text-left text-bold">${value}</td>`;
        }
        return `<td class="text-left">${value}</td>`;
    };

    const ExcelTable = params => {
        const { columns, rows } = params;
        const tableRows = [];
        rows.map((item, index) => {
            let trow = '';
            const currency = isCurrencyRow(index);
            let count = 0;
            for (let i = -1; i < columns.length; i++) {
                let date = '';
                if (item[i]) {
                    if (index === 0) date = moment(startDate).add(count, 'days').format('DD-MMM');
                    else date = '';
                    if (educatorRow === index + 1 && declaredColumn === i) {
                        setEducatorAmount(item[i]);
                    }
                    if (payoutRow === index + 1 && declaredColumn === i) {
                        setPayoutAmount(item[i]);
                    }

                    if (!unitsColumn && unitsColumn === i) {
                        console.log('units', item[i]);
                    }
                    trow += formatColumnValue(item[i], currency, i, index, date);

                    count++;
                } else {
                    trow += `<td class="text-center">${i === -1 ? index + 1 : '&nbsp;'}</td>`;
                }
            }
            tableRows.push(`<tr>${trow}</tr>`);
        });

        return (
            <div className="table-responsive">
                <table className="custom-table">
                    <tbody>
                        <ExcelTableHead {...params} />
                        {tableRows.map((item, index) => <React.Fragment key={index.toString()}>{ReactHtmlParser(item)}</React.Fragment>)}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <AuthLayout
            {...props}
            breadcrumb={{
                items: [
                    { title: 'Dashboard', link: '/dashboard' },
                    { title: 'Products', link: '/products' },
                    { title: 'Sub-Categories', link: '/products/subcategories' }
                ],
                active: subcategory ? subcategory.title : 'Calculations'
            }}
            loading={pageLoading}
            pageHeading={{
                title: `${subcategory ? subcategory.title : ''} Calculations`,
                caption: 'EXPLORE SUBCATEGORY CALCULATIONS FOR CRYPTO BASED INNOVATION',
            }}
        >
            {!pageLoading &&
            <Card>
                <Common.Widget
                    icon="li-cog"
                    title={`${subcategory.title} Calculations`}
                    subtitle={`Use the form below for the ${subcategory.title} calculations and payouts`}
                    containerClass="padding-top-30"
                />
                {(payoutRecords.length === 0 && allowPayout) &&
                <CardBody>
                    <div className="stepContainer margin-top-0">
                        <form>
                            <Row>
                                <Col xs={12} sm={4}>
                                    <div className="form-group margin-bottom-0">
                                        <label>Upload</label>
                                        <label className="custom-file">
                                            <input
                                                id="file"
                                                type="file"
                                                className="custom-file-input"
                                                data-validation="required extension"
                                                data-validation-allowing="txt"
                                                onChange={e => handleFileChange(e.target)}
                                            />
                                            <span className="custom-file-label">
                                                {file ? file.name : 'Choose file'}
                                            </span>
                                        </label>
                                        <span className="form-text margin-top-0">
                                            {file ? `Selected file: ${parseInt(file.size / 1024)}KB` : 'Format: Excel/CSV'}
                                        </span>
                                    </div>
                                </Col>
                                <Col xs={12} sm={4}>
                                    <div className="form-group margin-bottom-0">
                                        <label>From date</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue={moment(startDate).format('dddd, DD MMMM YYYY')}
                                            disabled
                                        />
                                        <span className="form-text margin-top-5">
                                            Current week start date
                                        </span>
                                    </div>
                                </Col>
                                <Col xs={12} sm={4}>
                                    <div className="form-group margin-bottom-0">
                                        <label>To date</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue={moment(endDate).format('dddd, DD MMMM YYYY')}
                                            disabled
                                        />
                                        <span className="form-text margin-top-5">
                                            Current week end date
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                        </form>
                    </div>
                    {file &&
                    <div className="fraxion-calculations-table__wrapper margin-top-15">
                        <ExcelTable
                            rows={rows}
                            columns={columns}
                        />
                    </div>}
                    {file &&
                    <div className="margin-top-20">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => handleConfirmPayout()}
                        >
                            Confirm &amp; Process Payout
                        </button>
                    </div>}
                </CardBody>}
                {payoutRecords.length > 0 &&
                <div className="wizard margin-bottom-0">
                    <CardBody>
                        <Row>
                            <Col xs={12} sm={10}>
                                <h4>Payout Report</h4>
                                <p className="subtitle margin-bottom-20">
                                    Report for the recent {subcategory.title.toLowerCase()} payout to
                                    qualifying members {moment(payoutReport.start_date).format('DD MMM YYYY')} - {moment(payoutReport.end_date).format('DD MMM YYYY')}
                                </p>
                            </Col>
                            <Col xs={12} sm={2}>
                                <CsvDownloader
                                    filename={`${moment(payoutReport.start_date).format('YYYYMMDD')}-${subcategory.code.toUpperCase()}-PAYOUT-REPORT`}
                                    extension=".csv"
                                    separator=","
                                    wrapColumnChar=""
                                    datas={payoutRecords}
                                >
                                    <button
                                        className="btn btn-light btn-block"
                                    >
                                        <i className="fa fa-download margin-right-5" />
                                        Download Report
                                    </button>
                                </CsvDownloader>
                            </Col>
                        </Row>
                        <div>
                            <Row>
                                <Col xs={12} sm={4}>
                                    <Common.Widget
                                        invert={false}
                                        icon="li-wallet"
                                        title="Total Payout"
                                        subtitle="Amount paid in total"
                                        informer={
                                            <CurrencyFormat
                                                thousandSeparator=" "
                                                displayType="text"
                                                value={payoutReport.payout_total || 0}
                                                fixedDecimalScale
                                                decimalScale={4}
                                                renderText={value => (
                                                    <span className="font-weight-bold mb-2 mt-2">
                                                        {value} CBI
                                                    </span>
                                                )}
                                            />
                                        }
                                    />
                                </Col>
                                <Col xs={12} sm={4}>
                                    <Common.Widget
                                        invert={false}
                                        icon="li-cash-dollar"
                                        title="Educator Fees"
                                        subtitle="Total educator fees paid"
                                        informer={
                                            <CurrencyFormat
                                                thousandSeparator=" "
                                                displayType="text"
                                                value={payoutReport.educator_fees || 0}
                                                fixedDecimalScale
                                                decimalScale={4}
                                                renderText={value => (
                                                    <span className="font-weight-bold mb-2 mt-2">
                                                        {value} CBI
                                                    </span>
                                                )}
                                            />
                                        }
                                    />
                                </Col>
                                <Col xs={12} sm={4}>
                                    <Common.Widget
                                        invert={false}
                                        icon="li-users2"
                                        title="Members Paid"
                                        subtitle="Total number of members paid"
                                        informer={
                                            <CurrencyFormat
                                                thousandSeparator=" "
                                                displayType="text"
                                                value={payoutRecords.length}
                                                fixedDecimalScale
                                                decimalScale={0}
                                                renderText={value => (
                                                    <span className="font-weight-bold mb-2 mt-2">
                                                        {value}
                                                    </span>
                                                )}
                                            />
                                        }
                                    />
                                </Col>
                            </Row>
                        </div>
                        <div className="table-responsive margin-top-20">
                            <table className="table table-striped table-bordered margin-bottom-0">
                                <thead>
                                    <tr>
                                        <th>Referral #</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        <th>Fraxions</th>
                                        <th className="text-right">Unit Amount</th>
                                        <th className="text-right">Paid Upline</th>
                                        <th className="text-right">Amount Paid</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payoutRecords.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.referral_id}</td>
                                            <td>{item.first_name} {item.last_name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.mobile}</td>
                                            <td>{parseInt(item.fraxions)}</td>
                                            <td className="text-right">
                                                <CurrencyFormat
                                                    thousandSeparator=" "
                                                    displayType="text"
                                                    value={item.unit_amount}
                                                    fixedDecimalScale
                                                    decimalScale={4}
                                                    renderText={value => (
                                                        <span className="mb-2 mt-2">
                                                            {value} CBI
                                                        </span>
                                                    )}
                                                />
                                            </td>
                                            <td className="text-right">
                                                {item.uplines.length}
                                            </td>
                                            <td className="text-right">
                                                <CurrencyFormat
                                                    thousandSeparator=" "
                                                    displayType="text"
                                                    value={item.amount_paid}
                                                    fixedDecimalScale
                                                    decimalScale={4}
                                                    renderText={value => (
                                                        <span className="mb-2 mt-2">
                                                            {value} CBI
                                                        </span>
                                                    )}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                </div>}
                {!allowPayout &&
                <div className="margin-bottom-30 margin-top-30 text-center">
                    <h4 className="text-uppercase margin-bottom-15">Payout already processed for the current week</h4>
                    <p className="subtitle margin-bottom-20">
                        The payout for the current week {moment(startDate).format('DD MMM YYYY')} - {moment(endDate).format('DD MMM YYYY')}
                        &nbsp;has already been processed.
                    </p>
                    <a
                        href="/dashboard"
                        className="btn btn-light"
                    >
                        &nbsp;&nbsp;Go to dashboard&nbsp;&nbsp;
                    </a>
                </div>}
            </Card>}
        </AuthLayout>
    );
} 
