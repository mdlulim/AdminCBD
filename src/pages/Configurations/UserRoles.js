import React, { useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Common, Pagination, UserRoles } from 'components';
import { AuthLayout } from 'containers';


export default function UserRolesPage(props) {
    const [pageLoading, setPageLoading] = useState(true);

    return (
        <AuthLayout
            {...props}
            loading={pageLoading}
            breadcrumb={{
                items: [{ title: 'Dashboard', link: '/dashboard' }],
                active: "Users"
            }}
            pageHeading={{
                title: 'Manage User Roles',
                caption: 'EXPLORE USER ROLES FOR CRYPTO BASED INNOVATION',
            }}
        >
            <Card>
                <Common.Widget
                    icon="li-cog"
                    title="User Roles"
                    subtitle="List of all User Roles"
                    wrapperClass="widget--items-middle"
                />
                <CardBody className="padding-botton-0">
                <UserRoles.UserRoles setPageLoading={setPageLoading}/>
                   
                    
                </CardBody>
            </Card>
        </AuthLayout>
    );
} 
