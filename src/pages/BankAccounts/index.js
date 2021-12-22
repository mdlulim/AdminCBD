import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import { BankAccounts } from 'components';

const BankAccountsList = props => {
	const breadcrumb = { heading: "BankAccounts" };
	return (
		<AuthLayout {...props}
		breadcrumb={{ active: "Bank Accounts" }}
		pageHeading={{
			title: 'Bank Accounts List',
			caption: 'EXPLORE OVERVIEW BANK ACCOUNTS FOR CRYPTO BASED INNOVATION'
		}}>
			<Row className="mt-4">
				<Col lg={12} xl={12}>
					<Col md={12}>
						<BankAccounts.BankAccounts />
					</Col>
				</Col>
			</Row>
		</AuthLayout>
	);
};

export default BankAccountsList;
