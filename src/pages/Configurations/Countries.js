import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Common, Pagination, Countries } from 'components';
import { AuthLayout } from 'containers';


export default function CountriesPage(props) {
    return (
        <AuthLayout
            {...props}
            breadcrumb={{
                items: [{ title: 'Dashboard', link: '/dashboard' }],
                active: "Countries"
            }}
            pageHeading={{
                title: 'Manage Countries',
                caption: 'EXPLORE MEMBERS DASHBOARD FOR CRYPTO BASED INNOVATION',
            }}
        >
            <Card>
                <Common.Widget
                    icon="li-cog"
                    title="Countries"
                    subtitle="List of all Countries"
                    wrapperClass="widget--items-middle"
                />
                <CardBody className="padding-botton-0">
                 <Countries.Countries />
              </CardBody>
            </Card>
        </AuthLayout>
    );
} 
