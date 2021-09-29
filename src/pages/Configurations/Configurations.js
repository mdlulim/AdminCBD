import React, { useState, useMemo } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Layout } from 'containers';
import { Configurations } from 'components';

const ConfigurationPage = props => {
	const [key, setKey] = useState('general');
	const breadcrumb = { heading: "Configurations" };
	return (
		<Layout {...props} breadcrumb={breadcrumb}>
			<Row className="mt-4">
				<Col lg={8} xl={8}>
				<Col md={12}>
				<Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
					<Tab eventKey="general" title="General">
					General
					</Tab>
					<Tab eventKey="profile" title="Profile">
						Profile
					</Tab>
					<Tab eventKey="contact" title="Contact">
						Contact
					</Tab>
				</Tabs>
                </Col>
				</Col>
			</Row>
		</Layout>
	);
};

export default ConfigurationPage;
