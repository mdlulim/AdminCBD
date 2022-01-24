import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { Common, Users } from 'components';
import { AuthLayout } from 'containers';
import { UserService } from 'providers';

const Actions = (props) => {
    const { permissions } = props;
    return <>
        {permissions && permissions.update_access &&
            <a
                href="/users/add"
                className="btn btn-primary btn--icon btn--icon-stacked btn--anon d-none d-lg-block"
            >
                <span class="fa fa-plus" /> Add new user
            </a>
        }
    </>
};

export default function UsersPage(props) {
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [filteredUsers, setFilteredUsers] = useState([]);

    async function fetchData() {
        const users = await UserService.getUsers();
        const roles = await UserService.getRoles();
        if (users.results) {
            const data = users.results.map(item => ({
                ...item,
                group_name: `${item.group.label} ${item.last_name}`,
                full_name: `${item.first_name} ${item.last_name}`,
            }));
            setFilteredUsers(data);
            setUsers(data);
        }
        setRoles(roles.results || []);
        setPageLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const countUsers = (type) => {
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
                actions: <Actions {...props}/>
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
                        <CardBody>
                            <div className="form-row">
                                <Col xs={6} lg={4}>
                                    <input
                                        type="text"
                                        id="search"
                                        name="search"
                                        className="form-control form-control-m"
                                        placeholder="Search by name, username or email..."
                                    />
                                </Col>
                                <Col xs={6} lg={2}>
                                    <select
                                        id="group_id"
                                        type="text"
                                        name="group_id"
                                        className="form-control"
                                    >
                                        <option value="">Filter by Role</option>
                                        {roles.map(item => (
                                            <option key={item.id} value={item.id}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </Col>
                                <Col xs={6} lg={2}>
                                    <select
                                        id="status"
                                        type="text"
                                        name="status"
                                        className="form-control"
                                    >
                                        <option value="">Filter by Status</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Active">Active</option>
                                        <option value="Archived">Archived</option>
                                        <option value="Bloacked">Bloacked</option>
                                    </select>
                                </Col>
                                {/* <Col xs={6} lg={4} className="d-none d-md-block text-right">
                                <button
                                    disabled
                                    className="btn btn-secondary btn--icon btn--icon-stacked btn--anon d-none d-lg-block"
                                >
                                    <span class="fa fa-search" /> 
                                    Search
                                </button>
                            </Col> */}
                            </div>
                        </CardBody>
                        <hr className="margin-top-0 margin-bottom-0" />
                        <Users.List
                            users={users}
                            data={filteredUsers}
                            {...props}
                        />
                    </Card>
                </div>}
        </AuthLayout>
    );
}
