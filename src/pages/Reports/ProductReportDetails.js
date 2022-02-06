import React, { useEffect, useState, useRef } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Common, Reports } from 'components';
import { AuthLayout } from 'containers';
import DatePicker from "react-datepicker";
import { Modal } from 'react-bootstrap';
import moment from 'moment';
import { ReportService, ProductService } from 'providers';
import CsvDownloader from 'react-csv-downloader';
import Moment from 'react-moment';

const inputWith = {
    width: '20%'
}
const inputWithDate = {
    width: '25%'
}

export default function ProductReportDetails(props) {
    const { match } = props;
    const { params } = match;
    const { id } = params;
    const [show, setShow] = useState(false);
    const [report, setReport] = useState([]);
    const [results, setResults] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [product, setProduct] = useState({});
    const [totals, setTotals] = useState({});
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [pageLoading, setPageLoading] = useState(false);
    const csvDownloaderClick = useRef(null)

    const handleClose = () => setShow(false);

    async function fetchData() {

        const reports = await ReportService.getProfitsPerProduct(id);
        const product = await ProductService.getProduct(id);
        let registration_fee = 0;
        let educator_fee = 0;
        let educator_percentage = 0;
        let admin_fee = 0;
        await reports.map((report)=>{
            if(report.metadata){
                //let percentage   = report.metadata.product.fees.educator_percentage ? report.metadata.product.fees.educator_percentage: 0;
                registration_fee = registration_fee + (report.metadata.fees ? report.metadata.fees.registration_fee: report.metadata.registration_fee ? report.metadata.registration_fee : 0);
                //educator_fee     = educator_fee + (report.metadata.fees ? report.metadata.fees.educator_fee : report.metadata.educator_fee ? report.metadata.educator_fee : 0);
                admin_fee        = admin_fee + (
                                        (report.metadata.fees && report.metadata.fees.admin_fee ) ?
                                            report.metadata.fees.admin_fee 
                                        : report.metadata.admin_fee ? report.metadata.admin_fee : 0);
            }
        })
        setTotals({
            registration_fee : registration_fee,
            educator_fee : educator_fee,
            educator_percentage : educator_percentage,
            admin_fee : admin_fee
        })
        setProduct(product)
        setResults(reports)

    }

    useEffect(() => {
        fetchData();
    }, []);

    const Filter = () => {
        return (
            <>
                <Common.Dropdown
                    actions={[
                        {
                            label: 'Filter by Date Range',
                            onClick: () => {
                                setShow(true)
                            }
                        },
                    ]}
                />
                <button
                    className="btn btn-light d-none d-md-block float-right margin-right-5"
                    id="dashboard-rp-customrange"
                >
                    <Moment date={startDate} format="D MMMM YYYY" /> - <Moment date={endDate} format="D MMMM YYYY" />
                </button>
            </>
        );
    }

    async function selectDataRange() {
        setDisabled(true);
        setPageLoading(true)

        const dateRange = {
            start_date: startDate * 1000,
            end_date: endDate * 1000
        };

        //const results = results.filter(report => ((new Date(report.created)) * 1000 >= dateRange.startDate && (new Date(report.created) * 1000) <= dateRange.endDate));
        //console.log(new Date(results))

        setDisabled(false);
        setShow(false)
        setPageLoading(false)
    }

	return (
        <AuthLayout
            {...props}
            breadcrumb={{
                active: "Details",
                items: [{
                    title: 'Dashboard', link: '/dashboard'
                }, {
                    title: 'Reports', link: '/reports'
                }],
            }}
            pageHeading={{
                title: `${report.name ? `${report.name} ` : 'View '} Product Report`,
                caption: 'EXPLORE REPORTS FOR CRYPTO BASED INNOVATION',
                actions: <Filter />
            }}
        >
            {!pageLoading &&
            <Card id="reports">
                <div className="form-row margin-bottom-20">
                    <Col xs={12} lg={4}>
                            <Common.Widget
                                icon="li-wallet"
                                title="Total"
                                subtitle="Administration Fees"
                                informer={<span className="text-bold text-success">{totals.admin_fee} {product.currency_code}</span>}
                                invert={true}
                            />
                        </Col>
                        <Col xs={12} lg={4}>
                            <Common.Widget
                                icon="li-wallet"
                                title="Total"
                                subtitle="Registration Fees"
                                informer={<><span className="text-bold text-success">{totals.registration_fee} {product.currency_code}</span></>}
                                invert={true}
                            />
                        </Col>
                        <Col xs={12} lg={4}>
                            <Common.Widget
                                icon="li-wallet"
                                title="Total"
                                subtitle="Educator Fees"
                                informer={<span className="text-bold text-success">{totals.educator_fee} {product.currency_code}</span>}
                                invert={true}
                            />
                        </Col>
                    </div>
                <Common.Widget
                    icon="li-chart-growth"
                    title={`Manage ${product.title} Report`}
                    subtitle={product.type}
                    wrapperClass="widget--items-middle"
                />
                <CardBody>
                    <div className="form-row">
                        <Col xs={6} lg={2}>
                            {/* <a
                                di
                            >
                                Edit Report
                            </a> */}
                        </Col>
                        <Col xs={12} lg={8} className="d-none d-md-block" />
                        <Col xs={6} lg={2} className="d-none d-md-block text-right">
                            {/* <button className="btn btn-outline-secondary btn-block">
                                Download CSV
                            </button> */}
                            <CsvDownloader
                                filename="reportfile"
                                extension=".csv"
                                separator=","
                                wrapColumnChar=""
                                datas={results}
                            >
                                <button className="btn btn-outline-secondary btn-block" ref={csvDownloaderClick}> Download CSV</button>
                            </CsvDownloader>
                        </Col>
                    </div>
                </CardBody>
                <hr className="margin-top-0 margin-bottom-0" />
                <Reports.ProductReportsDetailsTable
                    data={results}
                />
            </Card>}
            <Modal show={show} onHide={handleClose} centered className="confirm-modal">
            <Modal.Body>
                <Row>
                    <Col>
                        <h3 className="text-success">Search by date range </h3>
                        <hr />
                        <div className="form-group">
                            <label htmlFor="from">From</label>
                            <DatePicker style={inputWithDate} className={`form-control form-control-m`} selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">To</label>
                            <DatePicker style={inputWithDate} className={`form-control form-control-m`} selected={endDate} onChange={(date) => setEndDate(date)} />
                        </div>
                        <hr />
                        <Row>
                            <Col md={6}>
                                <button
                                    className="btn btn-dark"
                                    onClick={e => {
                                        e.preventDefault();
                                        setShow(false);
                                    }}
                                >
                                    {'Cancel'}
                                </button>
                            </Col>
                            <Col md={6} >
                                <button
                                    className="btn btn-success float-right"
                                    onClick={selectDataRange}
                                    disabled={disabled}
                                >
                                    {'Search'}
                                </button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
        </AuthLayout>
    );
}