import React, { useEffect, useState } from 'react';
import { Card, Col } from 'reactstrap';
import { Common, Users } from 'components';
import { AuthLayout } from 'containers';
import { UserService } from 'providers';

const Actions = () => (
    <a
        href="/users/add"
        className="btn btn-primary btn--icon btn--icon-stacked btn--anon d-none d-lg-block"
    >
        <span class="fa fa-plus" /> Add new user
    </a>
);

export default function UsersPage(props) {
    const [users, setUsers] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [filteredUsers, setFilteredUsers] = useState([]);

    async function fetchData() {
        const users = await UserService.getUsers();
        if (users.results) {
            const data = users.results.map(item => ({
                ...item,
                group_name: `${item.group.label} ${item.last_name}`,
                full_name: `${item.first_name} ${item.last_name}`,
            }));
            setFilteredUsers(data);
            setUsers(data);
        }
        setPageLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const countUsers = (type) =>{
        const countTypes = users.filter(user => user.status === type);
        return countTypes.length;
    };

    return (
        <AuthLayout
            {...props}
            breadcrumb={{
                items: [{ title: 'Dashboard', link: '/dashboard' }],
                active: "Users"
            }}
            loading={pageLoading}
            pageHeading={{
                title: 'Manage Users', 
                caption: 'EXPLORE MEMBERS DASHBOARD FOR CRYPTO BASED INNOVATION',
                actions: <Actions />
            }}
        >
            {!pageLoading &&
            <div id="users">
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
                        title="System Users"
                        subtitle="List of all system users"
                        wrapperClass="widget--items-middle"
                    />
                    <Users.List
                        users={users}
                        data={filteredUsers}
                    />
                </Card>
            </div>}
        </AuthLayout>
    );
}
