import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Layout } from 'containers';
import { Overview } from 'components';

export default function OverviewPage(props) {
    const breadcrumb = { heading: "Overview" };
    return (
        <Layout {...props} breadcrumb={breadcrumb}>
            <Row>
                <Col lg={4} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-primary o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Money" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Transactions</p>
                                <p className="text-primary text-24 line-height-1 mb-2">29</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={4} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-primary o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Business-ManWoman" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Members</p>
                                <p className="text-primary text-24 line-height-1 mb-2">48</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={4} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-primary o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Shopping-Bag" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Products</p>
                                <p className="text-primary text-24 line-height-1 mb-2">54</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={6} md={6} sm={6}>
                    <Card className="mb-3">
                        <CardBody>
                        <div className="card-title mb-0">CBI Members</div>
                        <div id="echartBar">
                            <Overview.DoughnutChart
                            chartData={{
                                labels: ['Active', 'Pending', 'Blocked'],
                                datasets: [
                                {
                                    label: '# of CBI Members',
                                    data: [209, 37, 10],
                                    backgroundColor: [
                                    '#4CAF50',
                                    'rgba(249, 194, 50, 1)',
                                    '#d22346',
                                    ],
                                    borderColor: [
                                        '#4CAF50',
                                        'rgba(249, 194, 50, 1)',
                                        '#d22346',
                                    ],
                                    borderWidth: 1,
                                },
                                ],
                            }}
                            options={{
                                plugins: {
                                legend: {
                                    display: false
                                }
                                }
                            }}
                            />
                        </div>
                        </CardBody>
                    </Card>
                    </Col>
                    <Col item lg={6} md={6} sm={6}>
                    <Card className="mb-3">
                        <CardBody>
                        <div className="card-title mb-0">Transactions</div>
                        <Overview.BarChart
                         chartData={{
                            labels: ['Deposit', 'Withdrawals', 'Rejected', 'Pending', 'Completed'],
                            datasets: [
                            {
                                label: '# of Leads',
                                data: [12, 19, 10, 5, 9],
                                backgroundColor: [
                                '#86abc9',
                                '#2196f3',
                                '#d22346',
                                'rgba(249, 194, 50, 1)',
                                '#4CAF50',
                                ],
                                borderColor: [
                                'rgba(249, 194, 50, 1)',
                                '#f8f9fa',
                                '#d22346',
                                'rgba(249, 194, 38, 0.44)',
                                '#4CAF50',
                                ],
                                borderWidth: 1,
                            },
                            ],
                        }}
                        options={{
                            plugins: {
                            legend: {
                                display: false
                            }
                            }
                        }}
                        />
                        </CardBody>
                    </Card>
                    </Col>
                <Col lg={6} md={6} sm={6}>
                    <Overview.Transactions />
                </Col>

                <Col lg={6} md={6} sm={6}>
                    <Overview.Users />
                </Col>

            </Row>
        </Layout>
    );
}
