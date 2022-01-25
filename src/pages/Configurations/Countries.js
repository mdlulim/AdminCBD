import React, { useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Common, Pagination, Countries } from 'components';
import { AuthLayout } from 'containers';


export default function CountriesPage(props) {
    const [pageLoading, setPageLoading] = useState(true);

    return (
        <AuthLayout
            {...props}
            loading={pageLoading}
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
                 <Countries.Countries setPageLoading={setPageLoading} {...props}/>
              </CardBody>
            </Card>
        </AuthLayout>
    );
} 
