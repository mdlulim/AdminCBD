import React, { useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import { BankAccounts } from 'components';

const BankAccountsList = props => {
	const breadcrumb = { heading: "BankAccounts" };
	const [pageLoading, setPageLoading] = useState(true);

	return (
		<AuthLayout {...props}
		loading={pageLoading}
		breadcrumb={{ active: "Bank Accounts" }}
		pageHeading={{
			title: 'Bank Accounts List',
			caption: 'EXPLORE OVERVIEW BANK ACCOUNTS FOR CRYPTO BASED INNOVATION'
		}}>
			<Row className="mt-4">
				<Col lg={12} xl={12}>
					<Col md={12}>
						<BankAccounts.BankAccounts pageLoading={pageLoading} setPageLoading={setPageLoading}/>
					</Col>
				</Col>
			</Row>
		</AuthLayout>
	);
};

export default BankAccountsList;
