import React, { useEffect, useState } from 'react';
import { Card } from 'reactstrap';
import { Common, Users } from 'components';
import { AuthLayout } from 'containers';
import { UserService } from 'providers';

export default function AddUserPage(props) {
    const [roles, setRoles] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);

    async function fetchData() {
        const roles = await UserService.getRoles();
        setRoles(roles.results || []);
        setPageLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <AuthLayout
            {...props}
            breadcrumb={{
                active: "Add",
                items: [{
                    title: 'Dashboard', link: '/dashboard'
                }, {
                    title: 'Users', link: '/users'
                }],
            }}
            pageHeading={{
                title: 'Capture New User',
                caption: 'EXPLORE USER ROLES FOR CRYPTO BASED INNOVATION',
            }}
        >
            {!pageLoading &&
            <div id="users">
                <Card className="margin-bottom-15">
                    <Common.Widget
                        icon="li-pencil5"
                        title="Add User"
                        subtitle="Specify new user information"
                        wrapperClass="widget--items-middle"
                    />
                    <Users.Add roles={roles} />
                </Card>
                <div className="text-right margin-bottom-20">
                    <button className="btn btn-secondary">
                        Save Changes
                    </button>
                </div>
            </div>}
        </AuthLayout>
    );
} 
