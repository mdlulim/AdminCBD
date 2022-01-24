import React, { useEffect, useState, useRef } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { Common, Reports } from 'components';
import { AuthLayout } from 'containers';
import { ReportService } from 'providers';
import CsvDownloader from 'react-csv-downloader';
import Moment from 'react-moment';

export default function ReportDetails(props) {
    const { match } = props;
    const { params } = match;
    const { id } = params;
    const [report, setReport] = useState([]);
    const [results, setResults] = useState([]);
    const [pageLoading, setPageLoading] = useState(false);
    const csvDownloaderClick = useRef(null)

    async function fetchData() {
        const report = await ReportService.getReport(id);
        console.log(report)
        setReport(report);

        const reports = await ReportService.generateReports(report.id);
        console.log(reports.results)
        setResults(reports.results)

    }

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [{
        name: 'Full Names',
        selector: 'first_name',
        sortable: true,
        cell: row => <div>{row.first_name} {row.last_name}</div>
    }, {
        name: 'Username',
        selector: 'username',
        sortable: true,
    }, {
        name: 'Frequency',
        selector: 'frequency',
        sortable: true,
    },{
        name: 'Status',
        selector: 'status',
        sortable: true,
    }, {
        name: 'Last Payment Date',
        selector: 'last_payment_date',
        sortable: true,
        cell: row => <div>
          <strong> { row.last_payment_date ? <Moment date={row.last_payment_date} format="D MMM YYYY" />: ''}</strong><br />
          <span className="text-muted">{ row.last_payment_date ? <Moment date={row.last_payment_date} format="hh:mm:ss" />: ''}</span>
        </div>
      }];

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
                title: `${report.name ? `${report.name} ` : 'View '}Report`,
                caption: 'EXPLORE REPORTS FOR CRYPTO BASED INNOVATION',
            }}
        >
            {!pageLoading &&
            <Card id="reports">
                <Common.Widget
                    icon="li-chart-growth"
                    title={`Manage ${report.name} Report`}
                    subtitle={report.description}
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
                <Reports.DetailsTable
                    data={results}
                />
            </Card>}
        </AuthLayout>
    );
}
