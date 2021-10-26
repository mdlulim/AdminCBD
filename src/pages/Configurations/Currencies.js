import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Common, Pagination, Currencies } from 'components';
import { AuthLayout } from 'containers';


export default function UserRolesPage(props) {
    return (
        <AuthLayout
            {...props}
            breadcrumb={{
                items: [{ title: 'Dashboard', link: '/dashboard' }],
                active: "Currencies"
            }}
            pageHeading={{
                title: 'Manage Currencies',
                caption: 'EXPLORE CURRENCIES FOR CRYPTO BASED INNOVATION',
            }}
        >
            <Card>
                <Common.Widget
                    icon="li-cog"
                    title="Currencies"
                    subtitle="List of all Currencies"
                    wrapperClass="widget--items-middle"
                />
                <CardBody className="padding-botton-0">
                <Currencies.Currencies />
                   
                    
                </CardBody>
            </Card>
        </AuthLayout>
    );
} 
