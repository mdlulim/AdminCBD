import React, { useEffect, useState, useRef } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { Common, Reports } from 'components';
import { AuthLayout } from 'containers';
import { ReportService, ProductService } from 'providers';
import CsvDownloader from 'react-csv-downloader';
import Moment from 'react-moment';

export default function ProductReportDetails(props) {
    const { match } = props;
    const { params } = match;
    const { id } = params;
    const [report, setReport] = useState([]);
    const [results, setResults] = useState([]);
    const [product, setProduct] = useState({});
    const [pageLoading, setPageLoading] = useState(false);
    const csvDownloaderClick = useRef(null)

    async function fetchData() {

        const reports = await ReportService.getProfitsPerProduct(id);
        const product = await ProductService.getProduct(id);
        setProduct(product)
        setResults(reports)

    }

    useEffect(() => {
        fetchData();
    }, []);

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
            }}
        >
            {!pageLoading &&
            <Card id="reports">
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
        </AuthLayout>
    );
}