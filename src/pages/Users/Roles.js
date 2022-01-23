import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Common, Users } from 'components';
import { AuthLayout } from 'containers';
import { UserService } from 'providers';

const Actions = () => (
    <a
        href="/users/roles/add"
        className="btn btn-primary btn--icon btn--icon-stacked btn--anon d-none d-lg-block"
    >
        <span class="fa fa-plus" /> Add new role
    </a>
);

export default function UserRolesPage(props) {
    const [roles, setRoles] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [filteredRoles, setFilteredRoles] = useState([]);

    async function fetchData() {
        const roles = await UserService.getRoles();
        setFilteredRoles(roles.results || []);
        setRoles(roles.results || []);
        setPageLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

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
                actions: <Actions />
            }}
        >
            {!pageLoading &&
                <Card id="users">
                    <Common.Widget
                        icon="li-cog"
                        title="Roles"
                        subtitle="List of all system user roles"
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
                                    placeholder="Search by name, description or type..."
                                />
                            </Col>
                            <Col xs={6} lg={6} className="d-none d-md-block" />
                            <Col xs={6} lg={2} className="d-none d-md-block text-right">
                                {/* <button
                                disabled
                                className="btn btn-secondary btn--icon btn--icon-stacked btn--anon d-none d-lg-block"
                            >
                                <span class="fa fa-download" /> 
                                Download CSV&nbsp;&nbsp;
                            </button> */}
                            </Col>
                        </div>
                    </CardBody>
                    <hr className="margin-top-0 margin-bottom-0" />
                    <Users.Roles
                        roles={roles}
                        data={filteredRoles}
                    />
                </Card>}
        </AuthLayout>
    );
} 
