import React, { useState, useMemo } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import { CompanyAccounts, Common } from 'components';
import { CompanyAccountService } from '../../providers';

const CompanyAccountList = props => {
    const breadcrumb = { heading: "CompanyAccounts" };
    const [transactions, setCompanyAccounts] = useState([]);

    useMemo(() => {
        CompanyAccountService.getTransactions().then((res) => {
          const transactionlist = res.data.data.results;
          setCompanyAccounts(transactionlist);
        });
       //setCompanyAccounts(transactionsList);
        }, []);

        const countCompanyAccounts = (type) =>{
            const countTypes = transactions.filter(transaction => transaction.status === type);
            return countTypes.length;
        };

	return (
		<AuthLayout  {...props}
        breadcrumb={{ active: "All CompanyAccounts" }}
        pageHeading={{
            title: 'CBI CompanyAccounts',
            caption: 'EXPLORE OVERVIEW TRANSACTIONS FOR CRYPTO BASED INNOVATION',
        }}>
            <div className="form-row margin-bottom-20">
                <Col xs={12} lg={2}>
                    <Common.Widget
                        icon="li-wallet"
                        title="Deposit"
                        subtitle="CompanyAccounts"
                        informer={<><span className="text-bold text-info">{countCompanyAccounts('deposit')}</span></>}
                        invert={false}
                    />
                </Col>
                <Col xs={12} lg={2}>
                    <Common.Widget
                        icon="li-wallet"
                        title="Widthdrawals"
                        subtitle="CompanyAccounts"
                        informer={<><span className="text-bold text-info">{countCompanyAccounts('Widthdrawals')}</span></>}
                        invert={false}
                    />
                </Col>
                <Col xs={12} lg={2}>
                    <Common.Widget
                        icon="li-wallet"
                        title="Transfers"
                        subtitle="CompanyAccounts"
                        informer={<span className="text-bold text-info">{countCompanyAccounts('Transfers')}</span>}
                        invert={false}
                    />
                </Col>
                <Col xs={12} lg={2}>
                    <Common.Widget
                        icon="li-wallet"
                        title="Pending"
                        subtitle="CompanyAccounts"
                        informer={<><span className="text-bold text-warning">{countCompanyAccounts('Pending')}</span></>}
                        invert={false}
                    />
                </Col>
                <Col xs={12} lg={2}>
                    <Common.Widget
                        icon="li-wallet"
                        title="Canceled"
                        subtitle="CompanyAccounts"
                        informer={<span className="text-bold text-danger">{countCompanyAccounts('Canceled')}</span>}
                        invert={false}
                    />
                </Col>
            </div>
			<Row className="mt-4">
				<Col lg={12} xl={12}>
				<Col md={12}>
                    {/* <CompanyAccounts.CompanyAccounts /> */}
                </Col>
				</Col>
			</Row>
		</AuthLayout>
	);
};

export default CompanyAccountList;
