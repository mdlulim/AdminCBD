import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { Common, Reports } from 'components';
import { AuthLayout } from 'containers';
import { ReportService } from 'providers';

export default function ReportDetails(props) {
    const { match } = props;
    const { params } = match;
    const { id } = params;
    const [report, setReport] = useState([]);
    const [results, setResults] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);

    async function fetchData() {
        const report = await ReportService.getReport(id);
        setReport(report);
        setPageLoading(false);
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
                            <button className="btn btn-outline-secondary btn-block">
                                Download CSV
                            </button>
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
