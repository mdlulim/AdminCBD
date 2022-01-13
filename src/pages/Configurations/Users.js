import React, { useState, useMemo } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Common, Pagination, Users } from 'components';
import { AuthLayout } from 'containers';
import { UserService } from '../../providers';

export default function UsersPage(props) {
    const [users, setUsers] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);

    useMemo(() => {
        UserService.getUsers().then((res) => {
          const userslist = res.data.data.results;
          setUsers(userslist);
        });
        }, []);

    const countUsers = (type) =>{
        const countTypes = users.filter(user => user.status === type);
        return countTypes.length;
    };

    return (
        <AuthLayout
            {...props}
            loading={pageLoading}
            breadcrumb={{
                items: [{ title: 'Dashboard', link: '/dashboard' }],
                active: "Users"
            }}
            pageHeading={{
                title: 'Manage Admin Users', 
                caption: 'EXPLORE MEMBERS DASHBOARD FOR CRYPTO BASED INNOVATION',
            }}
        >
            <div className="form-row margin-bottom-20">
                <Col xs={12} lg={3}>
                    <Common.Widget
                        icon="li-user"
                        title="All Users"
                        subtitle="All users"
                        informer={<span className="text-bold">{users.length}</span>}
                        invert={false}
                    />
                </Col>
                <Col xs={12} lg={3}>
                    <Common.Widget
                        icon="li-user-lock"
                        title="Active"
                        subtitle="Active users"
                        informer={<><span className="text-bold text-success">{countUsers('Active')}</span></>}
                        invert={false}
                    />
                </Col>
                <Col xs={12} lg={3}>
                    <Common.Widget
                        icon="li-user-lock"
                        title="Blocked"
                        subtitle="Blocked users"
                        informer={<><span className="text-bold text-warning">{countUsers('Blocked')}</span></>}
                        invert={false}
                    />
                </Col>
                <Col xs={12} lg={3}>
                    <Common.Widget
                        icon="li-user-minus"
                        title="Archived"
                        subtitle="Archived users"
                        informer={<span className="text-bold text-danger">{countUsers('Archived')}</span>}
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
                <Users.Users setPageLoading={setPageLoading}/>
                </CardBody>
            </Card>
        </AuthLayout>
    );
}
