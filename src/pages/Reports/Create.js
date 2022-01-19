import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';

export default function ReportDetails(props) {
	return (
        <AuthLayout
            {...props}
            breadcrumb={{
                active: "Details",
                items: [{
                    title: 'Dashboard', link: '/dashboard'
                }, {
                    title: 'Reports', link: '/reports'
                }],
            }}
            pageHeading={{
                title: 'View Report',
                caption: 'EXPLORE REPORTS FOR CRYPTO BASED INNOVATION',
            }}
        >

        </AuthLayout>
    );
}
