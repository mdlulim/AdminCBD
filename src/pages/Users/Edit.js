import React, { useEffect, useState } from 'react';
import { Card } from 'reactstrap';
import { Common, Users } from 'components';
import { AuthLayout } from 'containers';
import { UserService } from 'providers';

const Filter = ({ id, setShowFixedPanel }) => (
    <Common.Dropdown
        actions={[
            { label: 'Add New User', link: '/users/add' },
            { label: 'Permission Summary', onClick: () => setShowFixedPanel(true), closeOnClick: true },
        ]}
    />
);

const PermissionSummary = ({
    first_name,
    last_name,
    group,
}) => (
    <div className="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside">
        <div className="mCSB_container">
            <h5>{first_name} {last_name}</h5>
            <p className="margin-bottom-20">
                {group.description}
            </p>
        </div>
    </div>
);

export default function EditUserPage(props) {
    const { match } = props;
    const { params } = match;
    const { id } = params;
    const [user, setUser] = useState({});
    const [roles, setRoles] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [showFixedPanel, setShowFixedPanel] = useState(false);
    const [fixedPanelContent, setFixedPanelContent] = useState(null);

    async function fetchData() {
        const user = await UserService.getUser(id);
        const roles = await UserService.getRoles();

        setRoles(roles.results || []);
        if (user && user.id) {
            setUser(user);
            setFixedPanelContent(<PermissionSummary {...user} />);
        }
        setPageLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <AuthLayout
            {...props}
            breadcrumb={{
                active: "Edit",
                items: [{
                    title: 'Dashboard', link: '/dashboard'
                }, {
                    title: 'Users', link: '/users'
                }],
            }}
            fixedPanel={{
                title: 'Permission Summary',
                content: fixedPanelContent,
                setShow: setShowFixedPanel,
                show: showFixedPanel,
            }}
            pageHeading={{
                title: `Update ${user.first_name || ''}`,
                caption: 'EXPLORE USER ROLES FOR CRYPTO BASED INNOVATION',
                actions: <Filter id={id} setShowFixedPanel={setShowFixedPanel} />
            }}
        >
            {!pageLoading &&
            <div id="users">
                <Card className="margin-bottom-15">
                    <Common.Widget
                        icon="li-pencil5"
                        title={`${user.first_name} ${user.last_name}`}
                        subtitle={user.group.label}
                        wrapperClass="widget--items-middle"
                    />
                    <Users.Edit {...user} roles={roles} />
                </Card>
                {/* <div className="text-right margin-bottom-20">
                    <button className="btn btn-secondary">
                        Save Changes
                    </button>
                </div> */}
            </div>}
        </AuthLayout>
    );
} 
