import React, { useState, useMemo } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { AuthLayout } from 'containers';
import { Common, Dashboard, Overview, Members } from 'components';
import { MemberService, ProductService, TransactionService } from '../../providers';
import { VectorMap } from '@south-paw/react-vector-maps';
import world from '../../components/Dashboard/africa.json';
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

const inputWith={
    width: '20%'
  }

export default function DashboardPage(props) {
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState({});
    const [products, setProducts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const history = useHistory();

    useMemo(() => {
        MemberService.getMembers().then((res) => {
          console.log(res.data.data)
          //if(res.data.success){
          const memberslist = res.data.data.results;
        const temp=  memberslist.slice(Math.max(memberslist.length - 5), 0)
        console.log(temp)
          setMembers(temp);
          setFilteredMembers(temp);
          //}
        });

        ProductService.getProducts().then((res) => {
            console.log(res.data)
            if(res.data.success){
              const productlist = res.data.data.results;
              setProducts(productlist);
            }
          });

          TransactionService.getTransactions().then((res) => {
            console.log(res.data.data)
            if(res.data.success){
            const transaList = res.data.data.results;
            setTransactions(transaList);
            setFilteredTransactions(transaList)
            }
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

    const onSearchFilter = filterText => {
        const filteredItems = transactions.filter(item => (
            (item && item.user_id && item.user_id.toLowerCase().includes(filterText.toLowerCase())) ||
          (item && item.type && item.type.toLowerCase().includes(filterText.toLowerCase())) ||
          (item && item.txid && item.txid.toLowerCase().includes(filterText.toLowerCase())) ||
          (item && item.status && item.status.toLowerCase().includes(filterText.toLowerCase()))
        ));

        console.log(filteredItems)
        setFilteredTransactions(filteredItems);
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
                        <a href={`/main-account`} >
                            <Common.Widget
                                icon="li-receipt"
                                title="Main Account Balance"
                                subtitle="Summary amount"
                                informer={<span className="text-bold">CBI 89000</span>}
                            /></a>
                        </Col>
                        <Col xs={12} lg={4}>
                        <a href={`/members/members`} >
                            <Common.Widget
                                icon="li-users2"
                                title="Members"
                                subtitle="Active members"
                                informer={<><span className="text-bold text-success">{countMembers('Active')}</span> / <span className="text-bold text-warning">{countMembers('Pending')}</span></>}
                            /></a>
                        </Col>
                        <Col xs={12} lg={4}>
                        <a href={`/products`} >
                            <Common.Widget
                                icon="li-layers"
                                title="Products"
                                subtitle="CBI products"
                                informer={<span className="text-bold">{products.length}</span>}
                            /></a>
                        </Col>
                    </div>
                    <div className="form-row margin-bottom-20">
                        <Col xs={12} lg={3}>
                        <a href={`/members/members`} >
                            <Common.Widget
                                icon="li-users2"
                                title="Active"
                                subtitle="Members"
                                informer={<><span className="text-bold text-success">{countMembers('Active')}</span></>}
                            /></a>
                        </Col>
                        <Col xs={12} lg={3}>
                        <a href={`/members/members`} >
                            <Common.Widget
                                icon="li-users2"
                                title="Pending"
                                subtitle="Members"
                                informer={<><span className="text-bold text-warning">{countMembers('Pending')}</span> </>}
                            /></a>
                        </Col>
                        <Col xs={12} lg={3}>
                        <a href={`/members/members`} >
                            <Common.Widget
                                icon="li-users2"
                                title="Blocked"
                                subtitle="Members"
                                informer={<><span className="text-bold text-danger">{countMembers('Blocked')}</span> </>}
                            /></a>
                        </Col>
                        <Col xs={12} lg={3}>
                        <a href={`/members/members`} >
                            <Common.Widget
                                icon="li-users2"
                                title="Achieved"
                                subtitle="Members"
                                informer={<><span className="text-bold text-danger">{countMembers('Achieved')}</span> </>}
                            /></a>
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col xs={12} xl={6}>
                            <Card className="card-inner-container--up margin-bottom-20" id="dashboard-orders-card">
                                <CardBody className="card-body">
                                    <div className="card-inner-container card-inner-container card-inner-container--light">
                                        <div className="form-row">
                                            <Col xs={8} md={6}>
                                                <h4>Transactions</h4>
                                                <p className="subtitle">Transactions</p>
                                            </Col>
                                        </div>
                                    </div>
                                    <div id="dashboard-ec-line" data-zr-dom-id="zr_0" height="300">
                                    <Overview.BarChart
                                chartData={{
                                    labels: ['Deposit', 'Withdrawals', 'Canceled', 'Pending', 'Completed','Transfers', 'Products'],
                                    datasets: [
                                    {
                                        label: '# Transactions',
                                        data: [2000, 0, 5500, 0, 2000, 0, 550],
                                        backgroundColor: [
                                        '#86abc9',
                                        '#2196f3',
                                        '#d22346',
                                        'rgba(249, 194, 50, 1)',
                                        '#4CAF50',
                                        '#4CAF50',
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
                                {/* <canvas data-zr-dom-id="zr_0" height="50" /> */}
                                        {/* <canvas data-zr-dom-id="zr_0" width="555" height="350" /> */}
                                        <span />
                                        Product Sales: 1<br />
                                        <span />
                                        Completed Transactions: 1
                                    </div>
                                    <canvas data-zr-dom-id="zr_0" height="190" /> 
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs={12} xl={6} height="350">
                            <Card className="card-inner-container--up margin-bottom-20" id="dashboard-orders-card">
                                <CardBody className="card-body">
                                    <div className="card-inner-container card-inner-container card-inner-container--light" >
                                        <div className="form-row">
                                            <Col xs={8} md={6}>
                                                <h4>Africa</h4>
                                            </Col>
                                            <Col xs={4} md={6}>
                                            </Col>
                                        </div>
                                    </div>
                                    <div id="dashboard-ec-radar" data-zr-dom-id="zr_0" height="300">
                                    <VectorMap  {...world}/>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </div>
                   
                    {/* <Card className="margin-bottom-0">
                        <CardBody className="padding-top-10 padding-bottom-10">
                             <Dashboard.ResentMembers />
                        </CardBody>
                        <CardBody className="padding-top-10">
                            <div className="form-row margin-top-0">
                                <Col xs={12} className="text-center">
                                    <a href="/members/members" className="btn btn-secondary">
                                        View all members
                                    </a>
                                </Col>
                            </div>
                        </CardBody>
                    </Card> */}
                </Col>
                <Col xs={12} lg={3}>
                    <Card>
                    <a href={`/transactions`} >
                        <Common.Widget
                            icon="li-bag"
                            title="Transactions"
                            subtitle="Latest transctions"
                            informer={<><span className="text-bold text-success">{countTransaction('Completed')}</span> / <span className="text-bold text-warning">{countTransaction('Pending')}</span></>}
                        /></a>
                        <div className="form-group" style={{'padding': 10}}>
                        <input
                                type={inputWith}
                                type="text"
                                name="search"
                                className={`form-control form-control-m`}
                                placeholder="Search by User ID, Trans ID, Trans Type"
                                onKeyUp={e => onSearchFilter(e.target.value)}
                            />
                            </div>
                        <CardBody className="padding-left-0">
                        
                            <Common.Timeline
                                items={filteredTransactions.slice(0, 5)}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </div>
        </AuthLayout>
    );
}