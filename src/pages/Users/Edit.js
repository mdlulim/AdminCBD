import React, { useEffect, useState } from 'react';
import { Card } from 'reactstrap';
import { Common, Users } from 'components';
import { AuthLayout } from 'containers';
import { UserService } from 'providers';
import { confirmAlert } from 'react-confirm-alert';
import Swal from 'sweetalert2';

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
    const [error, setError] = useState('');
    const [dissbled, setDisabled] = useState(false);
    const [processing, setProcessing] = useState(false);
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

    const onSubmit = (form) => {
        const role = roles.filter(option => option.id === form.group_id)[0];
        // console.log(form, ' ', user.permissions ? user.permissions : role.permissions)
        const data = {
                first_name  : form.first_name,
                last_name   : form.last_name,
                email       : form.email,
                username    : form.username,
                mobile      : form.mobile,
                status      : form.status,
                group_id    : form.group_id,
                permissions : user.permissions ? user.permissions : role.permissions,
            };

            UserService.updateUser(user.id, data).then((response) => {
                console.log(response)
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'User was successfully updated',
                        showConfirmButton: false,
                        timer: 3000
                    });
                    return setTimeout(async function () {
                        window.location.href = `/users/${id}`;
                    }, 3000);

                    
                } else {
                    setError(response.message);
                }
                setDisabled(false);
                setProcessing(false);
            })
    }

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
                        <Users.Edit {...user} roles={roles} onInfoSubmit={onSubmit} />
                    </Card>
                </div>
            }
        </AuthLayout>
    );
}
