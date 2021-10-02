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
                <Col lg={4} md={6} sm={6}>
                    <Card className="mb-3">
                        <CardBody>
                        <div className="card-title mb-0"> Transactions</div>
                        <div id="echartBar" style={{ height: 325 }}>
                            <Overview.PieChart
                            chartData={{
                                labels: ['Deposit', 'Withdrawals'],
                                datasets: [
                                {
                                    label: '# of Leads',
                                    data: ['Approva', 'New Leads'],
                                    backgroundColor: [
                                    'rgba(249, 194, 50, 1)',
                                    'rgba(249, 194, 38, 0.44)',
                                    ],
                                    borderColor: [
                                    'rgba(249, 194, 50, 1)',
                                    'rgba(249, 194, 38, 0.44)',
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
                    <Col item lg={8} md={6} sm={6}>
                    <Card className="mb-3">
                        <CardBody>
                        <div className="card-title"> CBI Stats</div>
                        <div id="echartBar" style={{ height: 300 }}></div>
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
