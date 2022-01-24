import React, { useEffect, useState } from 'react';
import { Card } from 'reactstrap';
import { Common, Users } from 'components';
import { AuthLayout } from 'containers';
import { UserService } from 'providers';
import queryString from 'query-string';

export default function AddRolesPage(props) {
    const [roles, setRoles] = useState([]);
    const [parentRole, setParentRole] = useState(null);
    const [pageLoading, setPageLoading] = useState(true);

    async function fetchData() {
        const { location } = props;
        const { search } = location;
        const parsed = queryString.parse(search);
        const roles = await UserService.getRoles();

        setRoles(roles.results || []);
        if (parsed.parent) {
            const role = await UserService.getRole(parsed.parent);
            setParentRole((role && role.id) ? role : null);
        }

        setPageLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    function handleParentChange(id) {
        const [parent] = roles.filter(item => item.id === id);
        setParentRole(parent);
    }

    return (
        <AuthLayout
            {...props}
            breadcrumb={{
                active: "Add",
                items: [{
                    title: 'Dashboard', link: '/dashboard'
                }, {
                    title: 'Users', link: '/users'
                }, {
                    title: 'Roles', link: '/users/roles'
                }],
            }}
            pageHeading={{
                title: 'Add New Role',
                caption: 'EXPLORE USER ROLES FOR CRYPTO BASED INNOVATION'
            }}
        >
            {!pageLoading &&
            <div id="users">
                <Card className="margin-bottom-15">
                    <Common.Widget
                        icon="li-pencil5"
                        title="Add Role"
                        subtitle="Use form below to capture new role"
                        wrapperClass="widget--items-middle"
                    />
                    <Users.AddRole
                        roles={roles}
                        parent={parentRole}
                        handleParentChange={handleParentChange}
                        pageLoading={pageLoading}
                        setPageLoading={setPageLoading}
                    />
                </Card>
            </div>}
        </AuthLayout>
    );
} 
