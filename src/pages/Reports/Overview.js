import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Layout } from 'containers';

export default function Overview(props) {
    const breadcrumb = { heading: "Information" };
	return (
		<Layout {...props} breadcrumb={breadcrumb}>

        </Layout>
    );
}
