import React, { useState, useMemo } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import { Transactions, Common } from 'components';
import { TransactionService } from '../../providers';
import { Session } from 'bc-react-session';

let baseURL = window.location.origin;
const session = Session.get();
let page = (window.location.pathname.split('/').pop()).toLowerCase();
    
// if(page === ''){
//     let mi = session.payload.vlist;
//     if(!mi.includes("All Transactions")){
//         window.location.replace(baseURL+"/dashboard");
//     }   
// }
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
                className="btn d-none d-md-block float-right margin-right-5"
                id="dashboard-rp-customrange"
                onClick={e => {
                    e.preventDefault();
                    window.location = '/transactions/import';
                  }}
            >
                Import Transactions
            </button>
        </>
    );
}

const TransactionList = props => {
    const breadcrumb = { heading: "Transactions" };
    const [transactions, setTransactions] = useState([]);

    useMemo(() => {
        TransactionService.getTransactions().then((res) => {
          console.log(res.data.data.results)
          const transactionlist = res.data.data.results;
          setTransactions(transactionlist);
        });
          const transactionsList = [{
              transactionId: '109977041',
              type:'Withdrawals',
              amount: 3000,
              fee: 150,
              total_amount: 3150,
              balance: 300000,
              currency: {code: 'ZAR'},
              user:{
              full_names: 'Mduduzi Mdluli',
              username: 'JSmith',
              email: 'example1@demo.com',
              id_number: '8503025869089',
              country: 'South Africa',
              level: 'General',},
              created: 'just now',
              status: 'Completed',
          }, {
              transactionId: '109977042',
              type:'Deposit',
              amount: 3000,
              fee: 150,
              total_amount: 3150,
              balance: 300000,
              currency: {code: 'ZAR'},
              user:{
              full_names: 'Msizi Mpanza',
              username: 'MsiziM',
              email: 'example2@demo.com',
              id_number: '9103025869084',
              country: 'Namibia',
              level: 'Wealth Creator',},
              created: '2 mins ago',
              status: 'Pending',
          }, {
              transactionId: '109977043',
              type:'Transfer',
              amount: 5000,
              fee: 150,
              total_amount: 5150,
              balance: 450000,
              currency: {code: 'ZAR'},
              user:{
              full_names: 'Amanda Zungu',
              last_name: 'ZunguAmanda',
              username: 'McCallJ',
              id_number: '9803025869085',
              email: 'example3@demo.com',
              country: 'South Africa',
              level: 'General',},
              created: '5 mins ago',
              status: 'Rejected',
          }];
       setTransactions(transactionsList);
        }, []);

        const countTransactions = (type) =>{
            const countTypes = transactions.filter(transaction => transaction.status === type);
            return countTypes.length;
        };

        const countTransType = (type) =>{
            const countTypes = transactions.filter(item => ((item && item.subtype && item.subtype.toLowerCase().includes(type.toLowerCase())) ));
            return countTypes.length;
        };
        const countWithdrawal = () =>{
            const countTypes = transactions.filter(transaction => transaction.subtype === 'withdrawal' || transaction.subtype === 'Withdrawal');
            return countTypes.length;
        };
        const countTransactionType = (type) =>{
            const countTypes = transactions.filter(transaction => transaction.subtype === type);
            return countTypes.length;
        };

	return (
		<AuthLayout  {...props}
        breadcrumb={{ active: "All Transactions" }}
        pageHeading={{
            title: 'CBI Transactions',
            caption: 'EXPLORE OVERVIEW TRANSACTIONS FOR CRYPTO BASED INNOVATION',
            actions: <Filter />
        }}>
            <div className="form-row margin-bottom-20">
            <Col xs={12} lg={2}>
                    <Common.Widget
                        icon="li-wallet"
                        title="Completed"
                        subtitle="Transactions"
                        informer={<span className="text-bold text-success">{countTransactions('Completed')}</span>}
                        invert={false}
                    />
                </Col>
                <Col xs={12} lg={2}>
                    <Common.Widget
                        icon="li-wallet"
                        title="Deposit"
                        subtitle="Transactions"
                        informer={<><span className="text-bold text-info">{countTransType('deposit')}</span></>}
                        invert={false}
                    />
                </Col>
                <Col xs={12} lg={2}>
                    <Common.Widget
                        icon="li-wallet"
                        title="Widthdrawals"
                        subtitle="Transactions"
                        informer={<><span className="text-bold text-info">{countTransType('withdrawal')}</span></>}
                        invert={false}
                    />
                </Col>
                <Col xs={12} lg={2}>
                    <Common.Widget
                        icon="li-wallet"
                        title="Transfers"
                        subtitle="Transactions"
                        informer={<span className="text-bold text-info">{countTransType('Transfer')}</span>}
                        invert={false}
                    />
                </Col>
                <Col xs={12} lg={2}>
                    <Common.Widget
                        icon="li-wallet"
                        title="Pending"
                        subtitle="Transactions"
                        informer={<><span className="text-bold text-warning">{countTransactions('Pending')}</span></>}
                        invert={false}
                    />
                </Col>
                <Col xs={12} lg={2}>
                    <Common.Widget
                        icon="li-wallet"
                        title="Canceled"
                        subtitle="Transactions"
                        informer={<span className="text-bold text-danger">{countTransactions('Canceled')}</span>}
                        invert={false}
                    />
                </Col>
            </div>
			<Row className="mt-4">
				<Col lg={12} xl={12}>
				<Col md={12}>
                    <Transactions.Transactions transactionType={'all'} />
                </Col>
				</Col>
			</Row>
		</AuthLayout>
	);
};

export default TransactionList;
