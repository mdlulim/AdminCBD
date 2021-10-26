import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Common, Pagination, Users } from 'components';
import { AuthLayout } from 'containers';


export default function UsersPage(props) {
    return (
        <AuthLayout
            {...props}
            breadcrumb={{
                items: [{ title: 'Dashboard', link: '/dashboard' }],
                active: "Users"
            }}
            pageHeading={{
                title: 'Manage Users',
                caption: 'EXPLORE MEMBERS DASHBOARD FOR CRYPTO BASED INNOVATION',
            }}
        >
            <div className="form-row margin-bottom-20">
                <Col xs={12} lg={4}>
                    <Common.Widget
                        icon="li-user"
                        title="Active"
                        subtitle="All active users"
                        informer={<span className="text-bold text-success">10</span>}
                        invert={false}
                    />
                </Col>
                <Col xs={12} lg={4}>
                    <Common.Widget
                        icon="li-user-lock"
                        title="In-Active"
                        subtitle="In-Active users"
                        informer={<><span className="text-bold">4</span></>}
                        invert={false}
                    />
                </Col>
                <Col xs={12} lg={4}>
                    <Common.Widget
                        icon="li-user-minus"
                        title="Archived"
                        subtitle="Archived users"
                        informer={<span className="text-bold text-danger">3</span>}
                        invert={false}
                    />
                </Col>
            </div>
            <Card>
                <Common.Widget
                    icon="li-users"
                    title="Users"
                    subtitle="List of all members"
                    wrapperClass="widget--items-middle"
                />
                <CardBody className="padding-botton-0">
                <Users.Users />
                   
                    
                </CardBody>
            </Card>
        </AuthLayout>
    );
} 
