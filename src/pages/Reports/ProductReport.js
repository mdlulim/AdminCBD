import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { Common, Reports } from 'components';
import { AuthLayout } from 'containers';
import { ReportService } from 'providers';

// const Actions = () => (
//     <a
//         href="/reports/add"
//         className="btn btn-primary btn--icon btn--icon-stacked btn--anon d-none d-lg-block"
//     >
//         <span class="fa fa-plus" /> Create new report
//     </a>
// );

export default function ProductReport(props) {
    const [reports, setReports] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [filteredReports, setFilteredReports] = useState([]);

    async function fetchData() {
        const reports = await ReportService.getProductProfits();
        console.log(reports)
        setFilteredReports(reports || []);
        setReports(reports || []);
        setPageLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <AuthLayout
            {...props}
            loading={pageLoading}
            breadcrumb={{
                items: [{ title: 'Dashboard', link: '/dashboard' }],
                active: "Product Reports"
            }}
            pageHeading={{
                title: 'Manage Product Reports',
                caption: 'EXPLORE REPORTS FOR CRYPTO BASED INNOVATION',
                // actions: <Actions />
            }}
        >
          
            {!pageLoading &&
            <Card id="reports">
                <Common.Widget
                    icon="li-chart-growth"
                    title="Reports"
                    subtitle="List of all reports"
                    wrapperClass="widget--items-middle"
                />
                <CardBody>
                    <div className="form-row">
                        <Col xs={6} lg={4}>
                            <input
                                type="text"
                                id="search"
                                name="search"
                                className="form-control form-control-m"
                                placeholder="Search by name, description or type..."
                            />
                        </Col>
                        <Col xs={6} lg={6} className="d-none d-md-block" />
                        <Col xs={6} lg={2} className="d-none d-md-block text-right" />
                    </div>
                </CardBody>
                <hr className="margin-top-0 margin-bottom-0" />
                <Reports.ProductReportList
                    roles={reports}
                    data={filteredReports}
                />
            </Card>}
        </AuthLayout>
    );
} 
