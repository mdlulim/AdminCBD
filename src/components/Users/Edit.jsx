import React, { useState } from 'react';
import { CardBody, Col, Row } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert';
import moment from 'moment';
import 'react-confirm-alert/src/react-confirm-alert.css';
import useForm from "react-hook-form";
import { PermissionLevelService, AuthService } from 'providers';


const NavTabLink = ({
    id,
    name,
    title,
    active,
    setActiveTab,
}) => (
    <li className="nav-item">
        <a
            role="tab"
            id={`tab-${id}`}
            data-toggle="tab"
            href={`#tab-${id}`}
            aria-controls={name}
            aria-selected={active}
            className={`nav-link text-bold ${active ? 'active show' : ''}`}
            onClick={e => {
                setActiveTab(id);
                e.preventDefault();
            }}
        >
            {title}
        </a>
    </li>
);

const NavTabContent = props => {
    const { active } = props;
    return (
        <div className={`tab-pane fade ${active ? 'active show' : ''}`}>
            {props.children}
        </div>
    );
}

export default function EditUser(props) {
    const {
        first_name,
        last_name,
        created,
        updated,
        updator,
        group,
        email,
        username,
        mobile,
        last_login,
        status,
        roles,
        group_id,
        permissions,
        id,
        onInfoSubmit
    } = props;
    const [activeTab, setActiveTab] = useState('overview');
    const { register, handleSubmit, errors } = useForm();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    async function handleResendPassword() {
        return confirmAlert({
            title: 'Confirm Reset/Resend Password',
            message: <div>Are you sure you want to reset and resend password for <strong>{first_name} {last_name}</strong>?</div>,
            buttons: [
                {
                    label: 'Confirm and continue',
                    onClick: () => {
                        resetPassword({email: email})
                    }
                },
                {
                    label: 'Cancel',
                }
            ]
        });
    };
    const resetPassword = async (data) =>{
        console.log(data)
        const result = await AuthService.resetPassword(data)
        console.log(result)
        if(result.success){
            setSuccess(result.message)
        }else{
            setError(result.message);
            
        }
    }

    const onSubmit = async (data) => {
        // setPageLoading(true)
        let permissionObject = {}
        Object.keys(permissions).map((key, index) => {
            permissionObject[key] = {
                allow_access: data[permissions[key].title + '_allow_access'],
                childitems: {},
                title: permissions[key].title,
                id: permissions[key].id,
                icon: permissions[key].icon,
                link: permissions[key].link,
                parent: permissions[key].parent,
                description: permissions[key].description,
                type: permissions[key].type
            }
            if (permissions[key].type === 'crud') {

                if (permissions[key].childitems) {
                    Object.keys(permissions[key].childitems).map((child_key, index) => {
                        permissionObject[key]['childitems'][child_key] =
                        {
                            title: permissions[key].childitems[child_key].title,
                            read_access: data[permissions[key].title + permissions[key].childitems[child_key].title + '_read'],
                            create_access: data[permissions[key].title + permissions[key].childitems[child_key].title + '_create'],
                            delete_access: data[permissions[key].title + permissions[key].childitems[child_key].title + '_delete'],
                            update_access: data[permissions[key].title + permissions[key].childitems[child_key].title + '_update'],
                            access: data[permissions[key].title + permissions[key].childitems[child_key].title + '_full'] ? 'full' : 'partial',
                            id: permissions[key].childitems[child_key].id,
                            icon: permissions[key].childitems[child_key].icon,
                            link: permissions[key].childitems[child_key].link
                        }

                    })
                } else {
                    permissionObject[key] = {
                        ...permissionObject[key],
                        read_access: data[permissions[key].title + '_read'],
                        create_access: data[permissions[key].title + '_create'],
                        delete_access: data[permissions[key].title + '_delete'],
                        update_access: data[permissions[key].title + '_update'],
                        access: data[permissions[key].title + '_full'] ? 'full' : 'partial',
                        id: permissions[key].id,
                        icon: permissions[key].icon,
                        link: permissions[key].link,
                        parent: permissions[key].parent,
                        description: permissions[key].description,
                        type: permissions[key].type
                    }
                    delete permissionObject[key].childitems
                }
            } else {
                Object.keys(permissions[key].childitems).map((child_key, index) => {
                    permissionObject[key]['childitems'][child_key] =
                    {
                        title: permissions[key].childitems[child_key].title,
                        allow_access: data[permissions[key].title + permissions[key].childitems[child_key].title + '_allow_access'],
                        id: permissions[key].childitems[child_key].id,
                        icon: permissions[key].childitems[child_key].icon,
                        link: permissions[key].childitems[child_key].link,
                    }
                })
            }
        })

        let finalObject = {
            permissions: permissionObject,
            updated: Date.now(),
        }

        const res = await PermissionLevelService.updateAdminUser(id, finalObject)
    };

    return (
        <div>
            <ul className="nav nav-tabs margin-top-20" id="myTab" role="tablist">
                <NavTabLink
                    id="overview"
                    name="overview"
                    title="Overview"
                    setActiveTab={setActiveTab}
                    active={activeTab === 'overview'}
                />
                <NavTabLink
                    id="information"
                    name="information"
                    title="Information"
                    setActiveTab={setActiveTab}
                    active={activeTab === 'information'}
                />
                <NavTabLink
                    id="permissions"
                    name="permissions"
                    title="Permissions"
                    setActiveTab={setActiveTab}
                    active={activeTab === 'permissions'}
                />
            </ul>
            <CardBody>
           
                <div className="tab-content" id="overview">
                    <NavTabContent
                        id="overview"
                        name="overview"
                        title="Overview"
                        active={activeTab === 'overview'}
                    >
                        <Row>
                            <Col xs={12}>
                            { error ?
                        <div className="alert alert-warning" role="alert">
                        {error}
                        </div> : ''}
                            </Col>
                            <Col xs={12} sm={3}>
                                <p>
                                    <strong>First Name:</strong><br />
                                    <span className="text-muted">{first_name}</span>
                                </p>
                                <p className="margin-top-15">
                                    <strong>Last Name:</strong><br />
                                    <span className="text-muted">{last_name}</span>
                                </p>
                                <p className="margin-top-15">
                                    <strong>Role:</strong><br />
                                    <span className="text-muted">{group.label}</span>
                                </p>
                            </Col>
                            <Col xs={12} sm={3}>
                                <p>
                                    <strong>Email Address:</strong><br />
                                    <span className="text-muted">{email}</span>
                                </p>
                                <p className="margin-top-15">
                                    <strong>Contact Number:</strong><br />
                                    <span className="text-muted">{mobile || '-'}</span>
                                </p>
                                <p className="margin-top-15">
                                    <strong>Username:</strong><br />
                                    <span className="text-muted">{username}</span>
                                </p>
                            </Col>
                            <Col xs={12} sm={3}>
                                <p>
                                    <strong>Created Date:</strong><br />
                                    <span className="text-muted">
                                        {moment(created).format('DD MMM YYYY')}
                                        &nbsp;at&nbsp;
                                        {moment(created).format('hh:mm a')}
                                    </span>
                                </p>
                                <p className="margin-top-15">
                                    <strong>Updated Date:</strong><br />
                                    {updated ?
                                        <span className="text-muted">
                                            {moment(updated).format('DD MMM YYYY')}
                                            &nbsp;at&nbsp;
                                            {moment(updated).format('hh:mm a')}
                                        </span> : '-'}
                                </p>
                                <p className="margin-top-15">
                                    <strong>Last Login:</strong><br />
                                    {last_login ?
                                        <span className="text-muted">
                                            {moment(last_login).format('DD MMM YYYY')}
                                            &nbsp;at&nbsp;
                                            {moment(last_login).format('hh:mm a')}
                                        </span> : '-'}
                                </p>
                            </Col>
                            <Col xs={12} sm={3}>
                                <p>
                                    <strong>Status:</strong><br />
                                    <span className="text-muted">
                                        {status}
                                    </span>
                                </p>
                                <p>
                                    <strong>Created By:</strong><br />
                                    <span className="text-muted">
                                        -
                                    </span>
                                </p>
                                <p className="margin-top-15">
                                    <strong>Updated By:</strong><br />
                                    {updator ?
                                        <span className="text-muted">
                                            -
                                        </span> : '-'}
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} className="margin-top-20">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => handleResendPassword()}
                                >
                                    Reset &amp; Resend Password
                                    <i className="fa fa-send margin-right-10" />
                                </button>
                            </Col>
                        </Row>
                    </NavTabContent>
                    <NavTabContent
                        id="information"
                        name="information"
                        title="Information"
                        active={activeTab === 'information'}
                    >
                        <form onSubmit={onInfoSubmit}>

                            <Row>
                                <Col xs={12} sm={8}>
                                    <Row className="form-group">
                                        <label className="col-sm-2 col-form-label">
                                            First Name
                                            <span className="text-danger">*</span>
                                        </label>
                                        <Col sm={10}>
                                            <input
                                                id="first_name"
                                                type="text"
                                                name="first_name"
                                                className="form-control"
                                                defaultValue={first_name}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <label className="col-sm-2 col-form-label">
                                            Last Name
                                            <span className="text-danger">*</span>
                                        </label>
                                        <Col sm={10}>
                                            <input
                                                id="last_name"
                                                type="text"
                                                name="last_name"
                                                className="form-control"
                                                defaultValue={last_name}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <label className="col-sm-2 col-form-label">
                                            Email Address
                                            <span className="text-danger">*</span>
                                        </label>
                                        <Col sm={10}>
                                            <input
                                                id="email"
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="form-control"
                                                defaultValue={email}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <label className="col-sm-2 col-form-label">
                                            Username
                                            <span className="text-danger">*</span>
                                        </label>
                                        <Col sm={10}>
                                            <input
                                                id="username"
                                                type="text"
                                                id="username"
                                                name="username"
                                                className="form-control"
                                                defaultValue={username}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <label className="col-sm-2 col-form-label">
                                            Contact Number
                                        </label>
                                        <Col sm={10}>
                                            <input
                                                id="mobile"
                                                type="text"
                                                id="mobile"
                                                name="mobile"
                                                className="form-control"
                                                defaultValue={mobile}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <label className="col-sm-2 col-form-label">
                                            Status
                                            <span className="text-danger">*</span>
                                        </label>
                                        <Col sm={10}>
                                            <select
                                                id="status"
                                                type="text"
                                                name="status"
                                                className="form-control"
                                                defaultValue={status}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Active">Active</option>
                                                <option value="Archived">Archived</option>
                                                <option value="Blocked">Blocked</option>
                                            </select>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <div className="divider-text divider-text--xs margin-top-20 margin-bottom-20">
                                &nbsp;
                            </div>
                            <h4>Role Management</h4>
                            <p className="subtitle margin-bottom-15">
                                Make changes to the user role, by selecting role from the dropdown below
                            </p>
                            <Row>
                                <Col xs={12} sm={3}>
                                    <label className="col-form-label">
                                        Role
                                        <span className="text-danger">*</span>
                                    </label>
                                    <div className="form-group">
                                        <select
                                            id="group_id"
                                            type="text"
                                            name="group_id"
                                            className="form-control"
                                            defaultValue={group_id}
                                        >
                                            {roles.map(item => (
                                                <option key={item.id} value={item.id}>
                                                    {item.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </Col>
                                <Col xs={12} sm={3}>
                                    <label className="col-form-label">
                                        Date Assigned
                                    </label>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue="12 Jan 2022 10:00am"
                                            disabled
                                        />
                                    </div>
                                </Col>
                                <Col xs={12} sm={3}>
                                    <label className="col-form-label">
                                        Role Assigned By
                                    </label>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue="Administrator"
                                            disabled
                                        />
                                    </div>
                                </Col>
                                <Col xs={12} sm={3}>
                                    <label className="col-form-label">
                                        &nbsp;
                                    </label>
                                    <div className="form-group">
                                        <a
                                            href={`/users/roles/${group_id}`}
                                            className="btn btn-outline-primary"
                                        >
                                            <i className="fa fa-eye fa-2x" />
                                        </a>
                                    </div>
                                </Col>
                            </Row>
                            <div className="text-right margin-bottom-20">
                                <button type="submit" className="btn btn-secondary">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </NavTabContent>
                    <NavTabContent
                        id="permissions"
                        name="permissions"
                        title="Permissions"
                        active={activeTab === 'permissions'}
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>

                            {permissions &&
                                <>
                                    {Object.keys(permissions).map((key, index) => {
                                        return <>
                                            <h4>{permissions[key].title}</h4>
                                            <p className="subtitle margin-bottom-20">
                                                Use this configurations below to define transactions permissions
                                            </p>
                                            <div className="d-flex">
                                                <div className="margin-right-30">
                                                    <div className="custom-control custom-checkbox">
                                                        <input
                                                            id={permissions[key].title + '_allow_access'}
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            defaultChecked={permissions[key].allow_access}
                                                            name={permissions[key].title + '_allow_access'}
                                                            ref={register}
                                                            onChange={e => console.log(e.target.value)}

                                                        />
                                                        <label className="custom-control-label" htmlFor={permissions[key].title + '_allow_access'}>
                                                            Access {permissions[key].title} Module
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            {permissions[key].type === 'crud' ?
                                                <>
                                                    <div className="table-responsive">
                                                        <table className="table margin-bottom-0">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">&nbsp;</th>
                                                                    <th scope="col" width="12%">None</th>
                                                                    <th scope="col" width="12%">Create</th>
                                                                    <th scope="col" width="12%">Read</th>
                                                                    <th scope="col" width="12%">Update</th>
                                                                    <th scope="col" width="12%">Delete</th>
                                                                    <th scope="col" width="12%">All</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {permissions[key].childitems ?
                                                                    Object.keys(permissions[key].childitems).map((child_key, index) => {
                                                                        return <tr>
                                                                            <th scope="row">{permissions[key].childitems[child_key].title}</th>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox">
                                                                                    <input
                                                                                        id={permissions[key].title + permissions[key].childitems[child_key].title + '_null_access'}
                                                                                        type="checkbox"
                                                                                        className="custom-control-input"
                                                                                        name={permissions[key].title + permissions[key].childitems[child_key].title + '_null_access'}
                                                                                        ref={register}
                                                                                        onChange={() => { permissions[key].childitems[child_key].create_access = false }}
                                                                                        defaultChecked={
                                                                                            !permissions[key].childitems[child_key].create_access &&
                                                                                                !permissions[key].childitems[child_key].read_access &&
                                                                                                !permissions[key].childitems[child_key].update_access &&
                                                                                                !permissions[key].childitems[child_key].delete_access ? true : false
                                                                                        }
                                                                                    />
                                                                                    <label className="custom-control-label" htmlFor={permissions[key].title + permissions[key].childitems[child_key].title + '_null_access'}>
                                                                                        &nbsp;
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox">
                                                                                    <input
                                                                                        id={permissions[key].title + permissions[key].childitems[child_key].title + '_create'}
                                                                                        type="checkbox"
                                                                                        className="custom-control-input"
                                                                                        defaultChecked={permissions[key].childitems[child_key].create_access}
                                                                                        name={permissions[key].title + permissions[key].childitems[child_key].title + '_create'}
                                                                                        ref={register}
                                                                                    />
                                                                                    <label className="custom-control-label" htmlFor={permissions[key].title + permissions[key].childitems[child_key].title + '_create'}>
                                                                                        &nbsp;
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox">
                                                                                    <input
                                                                                        id={permissions[key].title + permissions[key].childitems[child_key].title + '_read'}
                                                                                        type="checkbox"
                                                                                        className="custom-control-input"
                                                                                        defaultChecked={permissions[key].childitems[child_key].read_access}
                                                                                        name={permissions[key].title + permissions[key].childitems[child_key].title + '_read'}
                                                                                        ref={register}
                                                                                    />
                                                                                    <label className="custom-control-label" htmlFor={permissions[key].title + permissions[key].childitems[child_key].title + '_read'}>
                                                                                        &nbsp;
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox">
                                                                                    <input
                                                                                        id={permissions[key].title + permissions[key].childitems[child_key].title + '_update'}
                                                                                        type="checkbox"
                                                                                        className="custom-control-input"
                                                                                        defaultChecked={permissions[key].childitems[child_key].update_access}
                                                                                        name={permissions[key].title + permissions[key].childitems[child_key].title + '_update'}
                                                                                        ref={register}
                                                                                    />
                                                                                    <label className="custom-control-label" htmlFor={permissions[key].title + permissions[key].childitems[child_key].title + '_update'}>
                                                                                        &nbsp;
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox">
                                                                                    <input
                                                                                        id={permissions[key].title + permissions[key].childitems[child_key].title + '_delete'}
                                                                                        type="checkbox"
                                                                                        className="custom-control-input"
                                                                                        defaultChecked={permissions[key].childitems[child_key].delete_access}
                                                                                        name={permissions[key].title + permissions[key].childitems[child_key].title + '_delete'}
                                                                                        ref={register}
                                                                                    />
                                                                                    <label className="custom-control-label" htmlFor={permissions[key].title + permissions[key].childitems[child_key].title + '_delete'}>
                                                                                        &nbsp;
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox">
                                                                                    <input
                                                                                        id={permissions[key].title + permissions[key].childitems[child_key].title + '_full'}
                                                                                        type="checkbox"
                                                                                        className="custom-control-input"
                                                                                        defaultChecked={
                                                                                            permissions[key].childitems[child_key].create_access &&
                                                                                                permissions[key].childitems[child_key].read_access &&
                                                                                                permissions[key].childitems[child_key].update_access &&
                                                                                                permissions[key].childitems[child_key].delete_access ? true : false
                                                                                        } name={permissions[key].title + permissions[key].childitems[child_key].title + '_full'}
                                                                                        ref={register}
                                                                                    />
                                                                                    <label className="custom-control-label" htmlFor={permissions[key].title + permissions[key].childitems[child_key].title + '_full'}>
                                                                                        &nbsp;
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    })
                                                                    :
                                                                    <tr>
                                                                        <td></td>
                                                                        <td>
                                                                            <div className="custom-control custom-checkbox">
                                                                                <input
                                                                                    id={permissions[key].title + '_null_access'}
                                                                                    type="checkbox"
                                                                                    className="custom-control-input"
                                                                                    name={permissions[key].title + '_null_access'}
                                                                                    ref={register}
                                                                                    defaultChecked={
                                                                                        !permissions[key].create_access &&
                                                                                            !permissions[key].read_access &&
                                                                                            !permissions[key].update_access &&
                                                                                            !permissions[key].delete_access ? true : false
                                                                                    }
                                                                                />
                                                                                <label className="custom-control-label" htmlFor={permissions[key].title + '_null_access'}>
                                                                                    &nbsp;
                                                                                </label>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="custom-control custom-checkbox">
                                                                                <input
                                                                                    id={permissions[key].title + '_create'}
                                                                                    type="checkbox"
                                                                                    className="custom-control-input"
                                                                                    defaultChecked={permissions[key].create_access}
                                                                                    name={permissions[key].title + '_create'}
                                                                                    ref={register}
                                                                                />
                                                                                <label className="custom-control-label" htmlFor={permissions[key].title + '_create'}>
                                                                                    &nbsp;
                                                                                </label>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="custom-control custom-checkbox">
                                                                                <input
                                                                                    id={permissions[key].title + '_read'}
                                                                                    type="checkbox"
                                                                                    className="custom-control-input"
                                                                                    defaultChecked={permissions[key].read_access}
                                                                                    name={permissions[key].title + '_read'}
                                                                                    ref={register}
                                                                                />
                                                                                <label className="custom-control-label" htmlFor={permissions[key].title + '_read'}>
                                                                                    &nbsp;
                                                                                </label>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="custom-control custom-checkbox">
                                                                                <input
                                                                                    id={permissions[key].title + '_update'}
                                                                                    type="checkbox"
                                                                                    className="custom-control-input"
                                                                                    defaultChecked={permissions[key].update_access}
                                                                                    name={permissions[key].title + '_update'}
                                                                                    ref={register}
                                                                                />
                                                                                <label className="custom-control-label" htmlFor={permissions[key].title + '_update'}>
                                                                                    &nbsp;
                                                                                </label>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="custom-control custom-checkbox">
                                                                                <input
                                                                                    id={permissions[key].title + '_delete'}
                                                                                    type="checkbox"
                                                                                    className="custom-control-input"
                                                                                    defaultChecked={permissions[key].delete_access}
                                                                                    name={permissions[key].title + '_delete'}
                                                                                    ref={register}
                                                                                />
                                                                                <label className="custom-control-label" htmlFor={permissions[key].title + '_delete'}>
                                                                                    &nbsp;
                                                                                </label>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="custom-control custom-checkbox">
                                                                                <input
                                                                                    id={permissions[key].title + '_full'}
                                                                                    type="checkbox"
                                                                                    className="custom-control-input"
                                                                                    defaultChecked={
                                                                                        !permissions[key].create_access &&
                                                                                            !permissions[key].read_access &&
                                                                                            !permissions[key].update_access &&
                                                                                            !permissions[key].delete_access ? true : false
                                                                                    } name={permissions[key].title + '_full'}
                                                                                    ref={register}
                                                                                />
                                                                                <label className="custom-control-label" htmlFor={permissions[key].title + '_full'}>
                                                                                    &nbsp;
                                                                                </label>
                                                                            </div>
                                                                        </td>
                                                                    </tr>

                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="divider-text divider-text--xs margin-top-20 margin-bottom-20">
                                                        &nbsp;
                                                    </div>
                                                </>

                                                :
                                                <div>
                                                    <div style={{ display: 'flex' }}>
                                                        {Object.keys(permissions[key].childitems).map((child_key, index) => {
                                                            // {permissions[key].childitems[child_key].map((child) => {
                                                            return <>
                                                                <div className="margin-right-30">
                                                                    <div className="custom-control custom-checkbox">
                                                                        <input
                                                                            id={permissions[key].title + permissions[key].childitems[child_key].title + '_allow_access'}
                                                                            type="checkbox"
                                                                            className="custom-control-input"
                                                                            defaultChecked={permissions[key].childitems[child_key].allow_access}
                                                                            name={permissions[key].title + permissions[key].childitems[child_key].title + '_allow_access'}
                                                                            ref={register}

                                                                        />
                                                                        <label className="custom-control-label" htmlFor={permissions[key].title + permissions[key].childitems[child_key].title + '_allow_access'}>
                                                                            {permissions[key].childitems[child_key].title}
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        })}
                                                    </div>
                                                    <div className="divider-text divider-text--xs margin-top-20 margin-bottom-20">
                                                        &nbsp;
                                                    </div>
                                                </div>
                                            }
                                        </>
                                    })}
                                </>
                            }
                            <div className="text-right margin-bottom-20">
                                <button className="btn btn-secondary">
                                    Save Changes
                                </button>
                            </div>

                        </form>

                    </NavTabContent>
                </div>
            </CardBody>
        </div>
    );
}