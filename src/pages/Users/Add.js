import React, { useEffect, useState } from 'react';
import { Card } from 'reactstrap';
import { Common, Users } from 'components';
import { AuthLayout } from 'containers';
import { UserService } from 'providers';
import { confirmAlert } from 'react-confirm-alert';

export default function AddUserPage(props) {
    const [roles, setRoles] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [error, setError] = useState('');
    const [dissbled, setDisabled] = useState(false);
    const [processing, setProcessing] = useState(false);

    async function fetchData() {
        const roles = await UserService.getRoles();
        setRoles(roles.results || []);
        setPageLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if(!form.group_id.value){
            setError('Validation error. Please select admin user role!')
            setDisabled(false)
            return 'Validation error. Please select admin user role'
        }

        
        if(form.first_name.value === '' || form.last_name.value === '' || form.email.value === '' || form.username.value === '' || form.status.value === ''){
            setError('Validation error. All field are required!')
            setDisabled(false)
            return 'All field are required!'
        }
        const role = roles.filter(option => option.id === form.group_id.value)[0];
        const data = {
                first_name  : form.first_name.value,
                last_name   : form.last_name.value,
                email       : form.email.value,
                username    : form.username.value,
                mobile      : form.mobile.value,
                status      : form.status.value,
                group_id    : form.group_id.value,
                permissions : role.permissions,
            };

            UserService.createUser(data).then((response) => {
                if (response.success) {
                    return confirmAlert({
                        title: 'Succcess',
                        message: response.message,
                        buttons: [
                            {
                                label: 'Ok',
                            }
                        ]
                    });
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
                <form onSubmit={onSubmit}>
                { error ? 
				<div className="alert alert-warning" role="alert">
				{error}
				</div> : ''}
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
             </form>
            </div>}
        </AuthLayout>
    );
} 
