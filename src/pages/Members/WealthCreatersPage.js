import React, { useState, useMemo } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Layout } from 'containers';
import { Members } from 'components';
import { MemberService } from '../../providers';

const WealthCreatersPage = props => {
    const breadcrumb = { heading: "Wealth Creaters" };
    const [members, setMembers] = useState([]);

    useMemo(() => {
        MemberService.getMembers().then((res) => {
          console.log(res.data.data.results)
          const memberslist = res.data.data.results;
          setMembers(memberslist);
        });
  
          const membersList = [{
              memberId: '109977041',
              first_name: 'Mduduzi',
              last_name: 'Mdluli',
              username: 'JSmith',
              email: 'example1@demo.com',
              id_number: '9103025869089',
              country: 'South Africa',
              level: 'General',
              created: 'just now',
              status: 'Active',
          }, {
              memberId: '109977042',
              first_name: 'Msizi',
              last_name: 'Mpanza',
              username: 'MsiziM',
              email: 'example2@demo.com',
              id_number: '9103025869084',
              country: 'Namibia',
              level: 'Wealth Creator',
              created: '2 mins ago',
              status: 'Pending',
          }, {
              memberId: '109977043',
              first_name: 'Zungu',
              last_name: 'Zungu',
              last_name: 'ZunguAmanda',
              username: 'McCallJ',
              id_number: '9103025869085',
              email: 'example3@demo.com',
              country: 'South Africa',
              level: 'General',
              created: '5 mins ago',
              status: 'Blocked',
          }];
       setMembers(membersList);
  
  
        }, []);

    const countMembers = (type) =>{
        const countTypes = members.filter(member => member.status === type);
        return countTypes.length;
    };

	return (
		<Layout {...props} breadcrumb={breadcrumb}>
			<Row>
                <Col lg={3} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-primary o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Business-ManWoman" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">All Wealth Creaters</p>
                                <p className="text-primary text-24 line-height-1 mb-2">{members.length}</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={3} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-success o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Business-ManWoman" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Active  Wealth Creaters</p>
                                <p className="text-success text-24 line-height-1 mb-2">{countMembers('Active')}</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={3} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-warning o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Business-ManWoman" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Panding  Wealth Creaters</p>
                                <p className="text-warning text-24 line-height-1 mb-2">{countMembers('Pending')}</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={3} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-danger o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Business-ManWoman" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Blocked Wealth Creaters</p>
                                <p className="text-danger text-24 line-height-1 mb-2">{countMembers('Blocked')}</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
			<Row className="mt-4">
				<Col lg={12} xl={12}>
				<Col md={12}>
                    <Members.WealthCreaters />
                </Col>
				</Col>
			</Row>
		</Layout>
	);
};

export default WealthCreatersPage;
