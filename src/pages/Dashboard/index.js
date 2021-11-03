import React, { useState, useMemo } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { AuthLayout } from 'containers';
import { Common, Dashboard, Overview, Members } from 'components';
import { MemberService, ProductService, TransactionService } from '../../providers';
const Filter = () => {
    return (
        <>
            <Common.Dropdown
                actions={[
                    { label: 'Filter by Date Range' },
                    { label: 'Filter by Date' },
                    { label: 'Filter Month' },
                    { label: 'Filter Year' }
                ]}
            />
            <button
                className="btn btn-light d-none d-md-block float-right margin-right-5"
                id="dashboard-rp-customrange"
            >
                September 22, 2021 - October 21, 2021
            </button>
        </>
    );
}

export default function DashboardPage(props) {
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState({});
    const [products, setProducts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const history = useHistory();

    useMemo(() => {
        MemberService.getMembers().then((res) => {
          console.log(res.data.data)
          const memberslist = res.data.data.results;
          setMembers(memberslist);
          setFilteredMembers(memberslist);
        });

        ProductService.getProducts().then((res) => {
            //console.log('Products '+res.data.data.results)
            console.log(res.data)
            if(res.data.success){
              const productlist = res.data.data.results;
              setProducts(productlist);
            }
          });
          TransactionService.getTransactions().then((res) => {
            console.log(res.data.data)
            const transaList = res.data.data.results;
            setTransactions(transaList);
          });

      }, []);

      const countMembers = (type) =>{
        const countTypes = members.filter(member => member.status === type);
        return countTypes.length;
    }
        const countTransaction = (type) =>{
        const countTypes = transactions.filter(transaction => transaction.status === type);
        return countTypes.length;
    }
    return (
        <AuthLayout
            {...props}
            breadcrumb={{ active: "Dashboard" }}
            pageHeading={{
                title: 'CBI Admin Dashboard',
                caption: 'EXPLORE OVERVIEW DASHBOARD FOR CRYPTO BASED INNOVATION',
                actions: <Filter />
            }}
        >
            <div className="form-row">
                <Col xs={12} lg={9}>
                    <div className="form-row margin-bottom-20">
                        <Col xs={12} lg={4}>
                            <Common.Widget
                                icon="li-receipt"
                                title="Opened payments"
                                subtitle="Summary amount"
                                informer={<span className="text-bold">R1,723,500.46</span>}
                            />
                        </Col>
                        <Col xs={12} lg={4}>
                            <Common.Widget
                                icon="li-users2"
                                title="Members"
                                subtitle="Active members"
                                informer={<><span className="text-bold">{countMembers('Active')}</span>/{countMembers('Pending')}</>}
                            />
                        </Col>
                        <Col xs={12} lg={4}>
                            <Common.Widget
                                icon="li-layers"
                                title="Products"
                                subtitle="CBI products"
                                informer={<span className="text-bold">{products.length}</span>}
                            />
                        </Col>
                    </div>
                    <Card className="margin-bottom-0">
                        <CardBody>
                            <Row>
                                <Col xs={9}>
                                    <h4>Latest transactions</h4>
                                    <p className="subtitle margin-bottom-0">
                                        List of recent orders 01/05/2018 - 02/05/2018
                                    </p>
                                </Col>
                                <Col xs={3}>
                                    <Common.Dropdown
                                        actions={[
                                            { label: 'Update' }
                                        ]}
                                    />
                                </Col>
                            </Row>
                        </CardBody>
                        <div className="divider-text divider-text--xs">Recent</div>
                        <CardBody className="padding-top-10 padding-bottom-10">
                            <Dashboard.RecentTransactions />
                            {/* <Members.Members /> */}
                            
                        </CardBody>
                        {/* <div className="divider-text divider-text--xs">Canceled</div>
                        <CardBody className="padding-top-10 padding-bottom-0">
                            <Dashboard.RecentTransactions />
                            <Dashboard.RecentTransactions />
                        </CardBody> */}
                        <CardBody className="padding-top-10">
                            <div className="form-row margin-top-0">
                                <Col xs={12} className="text-center">
                                    <a href="/transactions" className="btn btn-secondary">
                                        View all transactions
                                    </a>
                                </Col>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={12} lg={3}>
                    <Card>
                        <Common.Widget
                            icon="li-bag"
                            title="Transactions"
                            subtitle="Latest transctions"
                            informer={<><span className="text-bold">{countTransaction('Completed')}</span>/{countTransaction('Pending')}</>}
                        />
                        <CardBody className="padding-left-0">
                            <Common.Timeline
                                items={transactions}
                            />
                        </CardBody>
                    </Card>
                </Col>
                <div className="form-row">
                <Col xs={12} xl={8}>
                    <Card className="card-inner-container--up margin-bottom-20" id="dashboard-orders-card">
                        <CardBody className="card-body">
                            <div className="card-inner-container card-inner-container card-inner-container--light">
                                <div className="form-row">
                                    <Col xs={8} md={6}>
                                        <h4>Product performance</h4>
                                        <p className="subtitle">Monthly by transactions</p>
                                    </Col>
                                    <Col xs={4} md={6}>
                                        <div className="dropdown float-right">
                                            <div className="rw-btn rw-btn--card rw-btn--lg" data-toggle="dropdown">
                                                <div>
                                                </div>
                                            </div>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a href="/" className="dropdown-item" data-demo-action="update">Update</a>
                                                <a href="/" className="dropdown-item" data-demo-action="expand">Expand</a>
                                                <a href="/" className="dropdown-item" data-demo-action="invert">Invert style</a>
                                                <div className="dropdown-divider"></div>
                                                <a href="/" className="dropdown-item" data-demo-action="remove">Remove card</a>
                                            </div>
                                        </div>
                                        <button className="btn btn-light d-none d-md-block float-right margin-right-5" id="dashboard-rp-customrange">
                                            September 22, 2021 - October 21, 2021
                                        </button>
                                    </Col>
                                </div>
                            </div>
                            <div id="dashboard-ec-line">
                            <Overview.BarChart
                         chartData={{
                            labels: ['Deposit', 'Withdrawals', 'Rejected', 'Pending', 'Completed'],
                            datasets: [
                            {
                                label: '# of Leads',
                                data: [89000, 58000, 27500, 48000, 128000],
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
                                {/* <canvas data-zr-dom-id="zr_0" width="555" height="350" /> */}
                                05/18<br />
                                <span />
                                Sales: 58<br />
                                <span />
                                Processed orders: 52
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={12} xl={4}>
                    <Card className="card-inner-container--up margin-bottom-20" id="dashboard-orders-card">
                        <CardBody className="card-body">
                            <div className="card-inner-container card-inner-container card-inner-container--light">
                                <div className="form-row">
                                    <Col xs={8} md={6}>
                                        <h4>Budget allocation</h4>
                                        <p className="subtitle">Actual for 01/18 - 05/18</p>
                                    </Col>
                                    <Col xs={4} md={6}>
                                        <Common.Dropdown
                                            actions={[
                                                { label: 'Update' }
                                            ]}
                                        />
                                    </Col>
                                </div>
                            </div>
                            <div id="dashboard-ec-radar">
                                <canvas data-zr-dom-id="zr_0" width="555" height="330" />
                                05/18<br />
                                <span />
                                Sales: 58<br />
                                <span />
                                Processed orders: 52
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </div>
            </div>
        </AuthLayout>
    );
}