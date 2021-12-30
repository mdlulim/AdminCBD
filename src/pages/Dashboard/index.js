import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { AuthLayout } from 'containers';
import { Common, Dashboard, Overview, Members, Loader } from 'components';
import { MemberService, ProductService, TransactionService, AccountService, SessionProvider } from '../../providers';
import { VectorMap } from '@south-paw/react-vector-maps';
import world from '../../components/Dashboard/world.json';

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
    const [pageLoading, setPageLoading] = useState(true);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState({});
    const [products, setProducts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [mainAccount, setMainAccount] = useState({});
    const [adminLevel, setAdminLevel] = useState({});
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const history = useHistory();

    async function fetchData(){
        const members = await MemberService.getMembers();
            const memberslist = members.results;
            const temp=  memberslist.slice(Math.max(memberslist.length - 5), 0)
            setMembers(memberslist);
            setFilteredMembers(temp);

        const mainAccount = await AccountService.getMainAccount()
            setMainAccount(mainAccount);

        const poducts = await ProductService.getProducts();
              setProducts(poducts.results);

        const transaList = await TransactionService.getTransactions();
             setTransactions(transaList.results);
             setFilteredTransactions(transaList.results)

        setPageLoading(false);
    }
    useEffect(() => {
        if (SessionProvider.isValid()) {
           const user = SessionProvider.get();
            setAdminLevel(user.permission_level)
        }
        fetchData();

      }, [
        setPageLoading,
      ]);

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
            (item && item.user.first_name && item.user.first_name.toLowerCase().includes(filterText.toLowerCase())) ||
            (item && item.user.last_name && item.user.last_name.toLowerCase().includes(filterText.toLowerCase())) ||
            (item && item.user_id && item.user_id.toLowerCase().includes(filterText.toLowerCase())) ||
          (item && item.type && item.type.toLowerCase().includes(filterText.toLowerCase())) ||
          (item && item.txid && item.txid.toLowerCase().includes(filterText.toLowerCase())) ||
          (item && item.status && item.status.toLowerCase().includes(filterText.toLowerCase()))
        ));

        setFilteredTransactions(filteredItems);
      }
    if (pageLoading) return <Loader.Default />;
    return (
        <AuthLayout
            {...props}
            loading={pageLoading}
            breadcrumb={{ active: "Dashboard" }}
            pageHeading={{
                title: 'CBI Admin Dashboard',
                caption: 'EXPLORE OVERVIEW DASHBOARD FOR CRYPTO BASED INNOVATION',
                actions: <Filter />
            }}
        >
              {!pageLoading &&
              <>
            <div className="form-row">
                <Col xs={12} lg={9}>
                    <div className="form-row margin-bottom-20">
                      { adminLevel === 5 ? <Col xs={12} lg={4}>
                        <a href={`/main-account`} >
                            <Common.Widget
                                icon="li-receipt"
                                title="Main Account Balance"
                                subtitle="Summary amount"
                                informer={<span className="text-bold text-success">{mainAccount ? mainAccount.currency_code+' '+ parseFloat(mainAccount.available_balance).toFixed(4): ''}</span>}
                            /></a>
                        </Col> : ''}
                        <Col xs={12} lg={adminLevel == 5? 4:6}>
                        <a href={`/members/members`} >
                            <Common.Widget
                                icon="li-users2"
                                title="Members"
                                subtitle="Active members"
                                informer={<><span className="text-bold text-success">{countMembers('Active')}</span> / <span className="text-bold text-warning">{countMembers('Pending')}</span></>}
                            /></a>
                        </Col>
                        <Col xs={12} lg={adminLevel == 5? 4:6}>
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
                                title="Achived"
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
                                    labels: ['Deposit', 'Withdrawals', 'Rejected', 'Pending', 'Completed','Transfers', 'Products'],
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
                                                <h4>World</h4>
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
            </>}
        </AuthLayout>
    );
}