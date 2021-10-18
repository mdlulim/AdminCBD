import React, { useState, useMemo } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Layout } from 'containers';
import { Leads } from 'components';
import { LeadService } from '../../providers';

const LeadsList = props => {
    const breadcrumb = { heading: "Leads" };
    const [leads, setLeads] = useState([]);

    useMemo(() => {
        LeadService.getLeads().then((res) => {
          console.log(res.data.data.results)
          const leadslist = res.data.data.results;
          setLeads(leadslist);
        });
  
          const leadsList = [{
              leadId: '109977041',
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
              leadId: '109977042',
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
              leadId: '109977043',
              first_name: 'Zungu',
              last_name: 'Zungu',
              username: 'McCallJ',
              id_number: '9103025869085',
              email: 'example3@demo.com',
              country: 'South Africa',
              level: 'General',
              created: '5 mins ago',
              status: 'Blocked',
          }];
       setLeads(leadsList);
  
  
        }, []);

    const countLeads = (type) =>{
        const countTypes = leads.filter(lead => lead.status === type);
        return countTypes.length;
    };

	return (
		<Layout {...props} breadcrumb={breadcrumb}>
			<Row className="mt-4">
				<Col lg={12} xl={12}>
				<Col md={12}>
                    <Leads.Leads />
                </Col>
				</Col>
			</Row>
		</Layout>
	);
};

export default LeadsList;
