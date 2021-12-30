import React, {useState, useMemo} from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import { BankAccounts } from 'components';
import { useParams, useHistory } from 'react-router-dom';
import { BankAccountService, SessionProvider } from '../../providers';

const BankAccount = props => {
    const breadcrumb = { heading: "BankAccounts" };
    const [bankAccount, setBankAccount] = useState({});
    const params = useParams();
    const { id } = params;

    useMemo(() => {

          BankAccountService.getBankAccount(id).then((res) => {
            //console.log('BankAccounts '+res.data.data.results)
            console.log(res.data.data)
            if(res.data.success){
              const bank = res.data.data;
              console.log(bank)
              setBankAccount(bank);
            }
          });
    
    }, []);

	return (
		<AuthLayout {...props}
		breadcrumb={{ active: "Bank Account" }}
		pageHeading={{
			title: 'Bank Account',
			caption: 'EXPLORE OVERVIEW BANK ACCOUNT FOR CRYPTO BASED INNOVATION'
		}}>
			<Row className="mt-4">
				<Col lg={12} xl={12}>
					<Col md={12}>
						<BankAccounts.SendOTPBank bankAccount={bankAccount}/>
					</Col>
				</Col>
			</Row>
		</AuthLayout>
	);
};

export default BankAccount;
