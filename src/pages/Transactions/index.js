import React, { useState, useMemo } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Layout } from 'containers';
import { Transactions } from 'components';
import { TransactionService } from '../../providers';

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

	return (
		<Layout {...props} breadcrumb={breadcrumb}>
			<Row>
                <Col lg={2} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-success o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Money" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Completed</p>
                                <p className="text-success text-24 line-height-1 mb-2">{countTransactions('Completed')}</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={2} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-success o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Money" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Deposits</p>
                                <p className="text-success text-24 line-height-1 mb-2">{countTransactions('Deposit')}</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={2} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-success o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Money" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">withdrawals</p>
                                <p className="text-success text-24 line-height-1 mb-2">{countTransactions('Withdrawal')}</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={2} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-warning o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Money" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Pending</p>
                                <p className="text-warning text-24 line-height-1 mb-2">{countTransactions('Pending')}</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={2} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-danger o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Money" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Failed</p>
                                <p className="text-danger text-24 line-height-1 mb-2">{countTransactions('Failed')}</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={2} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-danger o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Money" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Rejected</p>
                                <p className="text-danger text-24 line-height-1 mb-2">{countTransactions('Rejected')}</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
			<Row className="mt-4">
				<Col lg={12} xl={12}>
				<Col md={12}>
                    <Transactions.Transactions />
                </Col>
				</Col>
			</Row>
		</Layout>
	);
};

export default TransactionList;
