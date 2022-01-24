import React, { useEffect, useState } from 'react';
import { Card } from 'reactstrap';
import { Common, Users } from 'components';
import { AuthLayout } from 'containers';
import { UserService } from 'providers';

const Filter = ({ id, setShowFixedPanel }) => (
    <Common.Dropdown
        actions={[
            { label: 'Add New Role', link: '/users/roles/add' },
            { label: 'Copy Role', link: `/users/roles/add?parent=${id}` },
            { label: 'Permission Summary', onClick: () => setShowFixedPanel(true), closeOnClick: true },
        ]}
    />
);

const PermissionSummary = ({
    label,
    description,
}) => (
    <div className="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside">
        <div className="mCSB_container">
            <h5>{label}</h5>
            <p className="margin-bottom-20">
                {description}
            </p>
        </div>
    </div>
);

export default function EditRolesPage(props) {
    const { match } = props;
    const { params } = match;
    const { id } = params;
    const [role, setRole] = useState({});
    const [pageLoading, setPageLoading] = useState(true);
    const [showFixedPanel, setShowFixedPanel] = useState(false);
    const [fixedPanelContent, setFixedPanelContent] = useState(null);

    async function fetchData() {
        const role = await UserService.getRole(id);
        if (role && role.id) {
            setRole(role);
            setFixedPanelContent(<PermissionSummary {...role} />);
        }

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
                active: "Edit",
                items: [{
                    title: 'Dashboard', link: '/dashboard'
                }, {
                    title: 'Users', link: '/users'
                }, {
                    title: 'Roles', link: '/users/roles'
                }],
            }}
            fixedPanel={{
                title: 'Permission Summary',
                content: fixedPanelContent,
                setShow: setShowFixedPanel,
                show: showFixedPanel,
            }}
            pageHeading={{
                title: `Manage ${role.label || ''} Role`,
                caption: 'EXPLORE USER ROLES FOR CRYPTO BASED INNOVATION',
                actions: <Filter id={id} setShowFixedPanel={setShowFixedPanel} />
            }}
        >
            {
                !pageLoading &&
                <div id="users">
                    <Card className="margin-bottom-15">
                        <Common.Widget
                            icon="li-pencil5"
                            title={role.label}
                            subtitle={role.description}
                            wrapperClass="widget--items-middle"
                        />
                        <Users.EditRole {...role} setPageLoading={setPageLoading} />
                    </Card>
                </div>
            }
        </AuthLayout>
    );
} 
